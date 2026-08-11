// 从 openapi/ 里有哪些服务，拼出 src/index.ts 和一份版本清单。
//
// 拼出来而不是手写：手写的那份和 openapi/ 目录会分头漂，而漂的表现是"服务推上来了，SDK 里
// 却 import 不到"——文件在、代码也生成了，只是没有从入口导出去，没有任何东西报错。
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const services = readdirSync('./openapi')
    .filter((name) => name.endsWith('.yaml'))
    .map((name) => name.replace(/\.yaml$/, ''))
    .sort();

// 每个服务一个命名空间，不平铺。两个服务里有同名类型是迟早的事（Project、User、Page……），
// 平铺之后 import 写错一个词不报错——拿到的是另一个服务的类型，编译照过，跑起来才发现
// 字段对不上。
const lines = [
    '// 这个文件由 scripts/build-index.mjs 生成，不要手改。',
    "export { configure, request } from './http.js';",
    "export type { ClientOptions, TokenProvider } from './http.js';",
    '',
    ...services.map((s) => `export * as ${s} from './generated/${s}/index.js';`),
    '',
    '/** SERVICE_VERSIONS 记着每份文档来自服务的哪个 tag。',
    ' *',
    ' * 排查“SDK 说有这个字段而服务端没有”时第一个要看的就是它——只看生成出来的代码',
    ' * 答不出这份 SDK 是照着服务的哪一版生成的。',
    ' */',
    'export const SERVICE_VERSIONS: Record<string, string> = {',
    ...services.map((s) => {
        const version = readFileSync(`./openapi/${s}.version`, 'utf8').trim();
        return `    ${s}: ${JSON.stringify(version)},`;
    }),
    '};',
    '',
];

writeFileSync('./src/index.ts', lines.join('\n'));
console.log(`src/index.ts: ${services.length} 个服务 -> ${services.join(', ')}`);
