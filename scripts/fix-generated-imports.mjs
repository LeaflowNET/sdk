// 给生成代码里的相对 import 补上 .js 后缀。
//
// 这个包是 ESM（package.json 的 "type": "module"），而 ESM 的解析里 './http' 就是
// './http'，不会去试 './http.js'——Node 直接 ERR_MODULE_NOT_FOUND。orval 生成的
// import 一律不带后缀，tsc 也不会替你加，所以构建产物在打包器里能用、在 Node 里一跑就
// 炸，而两者的差别通常要到部署之后才被发现。
//
// 手写的 src/index.ts 里后缀是写死的（见 build-index.mjs），这里补的是生成出来的那部分。
import {
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = './src/generated';

/** walk 列出目录下所有 .ts 文件。 */
function walk(dir) {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);

        return statSync(path).isDirectory()
            ? walk(path)
            : path.endsWith('.ts')
              ? [path]
              : [];
    });
}

// 只动相对路径：包名（axios 之类）由 node_modules 解析，加后缀反而会找不到。已经带后缀的
// 也跳过，避免重复执行时变成 .js.js。
const RELATIVE = /(from\s+|import\s+)(['"])(\.[^'"]*?)(['"])/g;

let touched = 0;

for (const file of walk(ROOT)) {
    const before = readFileSync(file, 'utf8');
    const after = before.replace(
        RELATIVE,
        (match, keyword, open, target, close) => {
            if (/\.[cm]?js$/.test(target)) {
                return match;
            }

            // 目录要补成 /index.js。`export * from './models'` 在打包器里指的是
            // models/index.ts，加成 './models.js' 就指向了一个不存在的文件。
            const isDirectory = existsSync(join(dirname(file), target))
                && statSync(join(dirname(file), target)).isDirectory();

            const suffix = isDirectory ? '/index.js' : '.js';

            return `${keyword}${open}${target}${suffix}${close}`;
        },
    );

    if (after !== before) {
        writeFileSync(file, after);
        touched += 1;
    }
}

console.log(`补后缀：${touched} 个文件`);
