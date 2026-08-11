// Adds .js extensions to relative imports in the generated sources.
//
// This package is ESM. Node's ESM resolver does not try './http.js' for './http',
// so extensionless imports work under a bundler but fail at runtime under Node.
// orval emits them without extensions and tsc does not add them.
import {
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = './src/generated';

/** walk lists every .ts file under a directory. */
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

// Relative paths only: bare specifiers resolve through node_modules. Already
// suffixed paths are skipped so repeated runs stay idempotent.
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

            // Directories become /index.js: './models' means models/index.ts.
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

console.log(`extensions added: ${touched} files`);
