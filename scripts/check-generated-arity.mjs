// Fails the build if the generated operations stop looking the way bindClient
// assumes they look.
//
// `bindClient` places the client at `fn.length - 1`, which is the `options` slot
// only while two things hold of every generated operation: `options` is the last
// declared parameter, and no parameter has a default value — `Function.length`
// stops counting at the first defaulted one.
//
// Neither is ours to guarantee; both are orval's, and both could change under a
// version bump. The failure if they do is not a type error: the client would be
// passed one slot early, as somebody's path id or request body, and the request
// would go out with no client at all. That is a runtime misroute in generated
// code, which is exactly the kind of thing nobody is reading.
//
// So it is asserted here, once per build, against the source that was just
// generated.
import { readdirSync, readFileSync } from 'node:fs';

const GENERATED = './src/generated';

/** Split a parameter list on commas that are not inside brackets. */
function parameters(list) {
    const found = [];
    let depth = 0;
    let current = '';

    for (const character of list) {
        if ('<([{'.includes(character)) {
            depth += 1;
        } else if ('>)]}'.includes(character)) {
            depth -= 1;
        }

        if (character === ',' && depth === 0) {
            found.push(current);
            current = '';
            continue;
        }

        current += character;
    }

    found.push(current);

    return found.map((one) => one.trim()).filter((one) => one !== '');
}

const services = readdirSync(GENERATED, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

const complaints = [];
let checked = 0;

for (const service of services) {
    const source = readFileSync(`${GENERATED}/${service}/index.ts`, 'utf8');
    const operations = source.matchAll(
        /export const (\w+) = \(([\s\S]*?)\) => \{/g,
    );

    for (const [, name, list] of operations) {
        const declared = parameters(list);
        const last = declared.at(-1) ?? '';
        const where = `${service}.${name}`;

        checked += 1;

        if (!/^options[?:]/.test(last)) {
            complaints.push(
                `${where}: last parameter is \`${last.split(':')[0]}\`, not \`options\``,
            );
        }

        for (const parameter of declared) {
            // A default before the type annotation, i.e. `params = {}`.
            if (/^[^:]+=/.test(parameter)) {
                complaints.push(
                    `${where}: parameter \`${parameter}\` has a default, so Function.length no longer counts it`,
                );
            }
        }
    }
}

if (complaints.length > 0) {
    console.error(
        [
            'generated operations no longer match what bindClient assumes:',
            '',
            ...complaints.map((one) => `  ${one}`),
            '',
            'bindClient puts the client at `fn.length - 1`. Fix the binding before',
            'shipping this — a client in the wrong slot is a silent misroute, not a',
            'type error. See src/http.ts.',
        ].join('\n'),
    );
    process.exit(1);
}

console.log(`arity: ${checked} operations end in \`options\`, none defaulted`);
