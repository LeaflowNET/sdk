// 把 bundle 出来的契约编译成 TypeScript。
//
//   openapi/<服务>/<版本>/openapi.yaml
//       → ts/gen/<服务>/<版本>/schema.ts   openapi-typescript 的原样产出
//       → ts/gen/<服务>/<版本>/index.ts    好用的别名（<操作>Result / <操作>Body）
//       → ts/gen/index.ts                  按服务分命名空间的桶
//
// # 一个服务一个文件，没有 bundle 这一步
//
// 契约一度按 OpenAPI 的节点类型拆过：paths/<Tag>.yaml 加 schemas/<Name>.yaml，一个 schema
// 一个文件。compute 拆出来 74 个 schema 文件，每个三十来行——形式上模块化了，实际是把「改一个
// 接口」变成了在十几个文件之间跳。
//
// 现在最大的一份 169 KB，一个文件装得下，IDE 搜得动，review 看得完整。哪天某个服务真的长到
// 难受了，再单独给它加拆分和 bundle——那时候是一个服务的事，不是全部十三份的事。
//
// # 这个包里没有手写的运行时，一行都没有
//
// 它一度有一个 src/client.ts：包一层 openapi-fetch、塞 Authorization、把七个服务打包成一个
// createClient({ baseUrl })。那一层是错的，而且是**具体地**错：
//
//   - 每个服务是一个自己的 host（iam.leaflow.cloud、compute.leaflow.cloud），不是一个网关
//     加路径前缀。控制台的 lib/services.ts 写了理由：IAM 和 monitoring 都占着
//     /api/v1/projects/{id}/...，一次调用是给谁的从路径上恢复不出来。一个 baseUrl 配七个
//     服务，等于假设了一件不成立的事。
//   - 客户端是**每次调用现建**的（lib/session/iam.ts 的 call()），因为「令牌属于发问的那个
//     人，不属于这个进程」。而 createClient() 一次造七个，用一个就浪费六个。
//
// 而 openapi-fetch 的 createClient<paths>() 本来就是泛型的——按服务的运行时代码根本不需要
// 存在。所以调用方自己写那三行：
//
//     import createClient from 'openapi-fetch';
//     import type { paths } from '@leaflow/sdk/compute/v1';
//     const api = createClient<paths>({ baseUrl: serviceBaseUrl('compute') });
//     api.use({ onRequest: ({ request }) => { request.headers.set('Authorization', ...); return request; } });
//
// baseUrl 怎么来、令牌怎么拿、错误怎么翻、客户端活多久——四件事调用方本来就各有一套，而且
// 比我们清楚。我们提供类型，不提供关于它们的假设。
//
// # 别名是生成的，不是手写的
//
// 直接用 openapi-typescript 的产出要写
//
//     operations['list-instances']['responses'][200]['content']['application/json']
//
// 而现在这个 SDK 给的是 compute.ListInstancesResult，控制台里到处在用（app/console/*/types.ts）。
// 那层别名有价值，但它是从 operationId 机械推出来的，所以生成它，别手写。
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contracts = join(root, "openapi");
const output = join(root, "ts", "gen");

const METHODS = ["get", "post", "put", "patch", "delete", "options", "head", "trace"];
const JSON_MEDIA = "application/json";

// openapi/<服务>/<版本>/openapi.yaml
const contractList = readdirSync(contracts, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) =>
    readdirSync(join(contracts, entry.name), { withFileTypes: true })
      .filter((version) => version.isDirectory())
      .map((version) => ({
        service: entry.name,
        version: version.name,
        spec: join(contracts, entry.name, version.name, "openapi.yaml"),
      })))
  .sort((a, b) => a.service.localeCompare(b.service) || a.version.localeCompare(b.version));

if (contractList.length === 0) {
  console.error(`${contracts} 下一份契约都没有`);
  process.exit(1);
}

/** list-instances → ListInstances */
function pascal(operationId) {
  return operationId
    .split(/[-_./\s]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

/**
 * 这个操作成功时返回哪个状态码。
 *
 * 取最小的那个 2xx：一个操作只会有一种成功形状，而 200/201/202 是同一件事的不同说法。
 * 都不带 JSON 体的（204、纯 202）返回 null——那时候没有 Result 可以起名字。
 */
function successStatus(operation) {
  const codes = Object.keys(operation.responses ?? {})
    .filter((code) => /^2\d\d$/.test(code))
    .filter((code) => operation.responses[code]?.content?.[JSON_MEDIA])
    .sort();
  return codes[0] ?? null;
}

// 生成前先删干净。
//
// 覆盖式生成留得下垃圾：改一个 schema 的名字，旧那份 .ts 没人删，而它照样编译、照样发布。
// 这不是假想——现在这个 SDK 的 clean-generated.mjs 记着 v0.1.0 → v0.2.0 那次重命名留下了
// **584 个**没人要的文件。
//
// 删掉再生成，同一份契约永远得到同一棵树，跑多少遍都一样。
rmSync(output, { recursive: true, force: true });

const services = [];

for (const { service, version, spec } of contractList) {
  const destination = join(output, service, version);
  mkdirSync(destination, { recursive: true });

  execFileSync(
    "npx",
    ["openapi-typescript", spec, "-o", join(destination, "schema.ts")],
    { stdio: "inherit" },
  );

  // 别名。用 YAML 里的 operationId 而不是解析生成出来的 .ts——那份 .ts 的形状归
  // openapi-typescript 管，跟着它的版本变；operationId 是契约自己的东西。
  //
  // 借 python 解析 YAML：这个仓库里 Go 那侧的生成器也是 python，两处对同一份文件的理解得一样。
  const aliases = [];
  const document = JSON.parse(
    execFileSync("python3", ["-c",
      "import sys,yaml,json;json.dump(yaml.safe_load(open(sys.argv[1])),sys.stdout)",
      spec], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }),
  );

  for (const [path, item] of Object.entries(document.paths)) {
    for (const [method, operation] of Object.entries(item)) {
      if (!METHODS.includes(method) || !operation.operationId) continue;
      const name = pascal(operation.operationId);
      const key = JSON.stringify(operation.operationId);

      const status = successStatus(operation);
      if (status) {
        aliases.push(
          `/** \`${method.toUpperCase()} ${path}\` 成功时的响应体。 */`,
          `export type ${name}Result =`,
          `  operations[${key}]["responses"][${status}]["content"]["application/json"];`,
          "");
      }
      if (operation.requestBody?.content?.[JSON_MEDIA]) {
        aliases.push(
          `/** \`${method.toUpperCase()} ${path}\` 的请求体。 */`,
          `export type ${name}Body = NonNullable<`,
          `  operations[${key}]["requestBody"]`,
          `>["content"]["application/json"];`,
          "");
      }
    }
  }

  writeFileSync(join(destination, "index.ts"), `${[
    "// 由 scripts/generate-ts.mjs 生成，不要手改。",
    "//",
    "// 别名把 operations[...] 那串下标换成一个名字。原始的 paths / components / operations 也",
    "// 一并导出：paths 是给 openapi-fetch 的 createClient<paths>() 用的。",
    "",
    'export type { paths, components, operations, webhooks } from "./schema.js";',
    "",
    'import type { operations } from "./schema.js";',
    "",
    ...aliases,
  ].join("\n").trimEnd()}\n`);

  services.push({ service, version });
  console.log(`${service}/${version} → ts/gen/${service}/${version}  ` +
    `${aliases.filter((line) => line.startsWith("export type")).length} 个别名`);
}

// 桶：import type { compute } from '@leaflow/sdk'，控制台现在就是这么用的。
writeFileSync(join(output, "index.ts"), `${[
  "// 由 scripts/generate-ts.mjs 生成，不要手改。",
  "//",
  "// 一个服务一个命名空间，**不摊平**：compute 和 tunnel 各有一个 OperationLogResource，",
  "// 它们是两个不同的类型。摊平之后先声明的那个会盖掉另一个，而盖掉不报错——表现是某个接口",
  "// 返回的字段和类型对不上，看起来像后端的 bug。",
  "",
  ...services.map(({ service, version }) =>
    `export type * as ${service} from "./${service}/${version}/index.js";`),
].join("\n")}\n`);

console.log(`ts/gen/index.ts → ${services.map((s) => s.service).join(", ")}`);
