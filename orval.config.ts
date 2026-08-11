// 生成配置：openapi/ 下每份文档对应一个客户端。
//
// 服务清单由目录内容决定，不写死。各服务在发版时把 openapi/<服务>.yaml 推入本仓库；
// 若改为维护一份固定清单，新增服务时漏改会导致该服务的客户端不被生成，且不会有任何报错。
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'orval';

const SPEC_DIR = './openapi';

/** listServices 列出 openapi/ 下的服务。 */
function listServices(): string[] {
    return readdirSync(SPEC_DIR)
        .filter((name) => name.endsWith('.yaml'))
        .map((name) => name.replace(/\.yaml$/, ''))
        .sort();
}

/** describeService 返回单个服务的生成配置。 */
function describeService(service: string) {
    return {
        input: {
            target: `${SPEC_DIR}/${service}.yaml`,
        },
        output: {
            target: `./src/generated/${service}/index.ts`,
            schemas: `./src/generated/${service}/models`,
            // 使用 axios-functions 而非 axios：后者将方法包裹在 getXxxAPI() 工厂中，
            // 且工厂名由文档标题推导，标题变更会波及全部调用处。
            client: 'axios-functions' as const,
            // 使用 split 而非 tags-split：后者以文档中的 tag 作为目录名，而 tag 为中文，
            // 会产生包含中文的 import 路径。服务之间的类型重名已由「每个服务一个目录」隔离。
            mode: 'split' as const,
            override: {
                mutator: {
                    path: './src/http.ts',
                    name: 'request',
                },
            },
        },
    };
}

const services = listServices();
if (services.length === 0) {
    throw new Error(
        `${SPEC_DIR} 下没有任何 .yaml。本仓库内容由各服务在发版时推入，为空通常意味着` +
            `服务侧的发布流程未成功执行。`,
    );
}

// 每个服务对应一个 <服务>.version，记录该文档来自服务的哪个版本。生成时输出，便于确认
// 本次生成基于哪些服务版本。
for (const service of services) {
    const version = readFileSync(`${SPEC_DIR}/${service}.version`, 'utf8').trim();
    console.log(`  ${service.padEnd(14)} ${version}`);
}

export default defineConfig(
    Object.fromEntries(services.map((service) => [service, describeService(service)])),
);
