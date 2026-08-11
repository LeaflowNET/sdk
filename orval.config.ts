// Generation config: one client per document under openapi/.
//
// The service list comes from the directory contents. Each service pushes its own
// openapi/<service>.yaml on release; a hardcoded list would silently omit a new
// service if someone forgot to update it here.
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'orval';

const SPEC_DIR = './openapi';

/** listServices lists the services present under openapi/. */
function listServices(): string[] {
    return readdirSync(SPEC_DIR)
        .filter((name) => name.endsWith('.yaml'))
        .map((name) => name.replace(/\.yaml$/, ''))
        .sort();
}

/** describeService returns the generation config for one service. */
function describeService(service: string) {
    return {
        input: {
            target: `${SPEC_DIR}/${service}.yaml`,
        },
        output: {
            target: `./src/generated/${service}/index.ts`,
            schemas: `./src/generated/${service}/models`,
            // axios-functions, not axios: the latter wraps everything in a
            // getXxxAPI() factory whose name is derived from the document title.
            client: 'axios-functions' as const,
            // split, not tags-split: one directory per service already isolates
            // types that share a name across services.
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
        `no .yaml found under ${SPEC_DIR}. This directory is populated by each ` +
            `service's release pipeline.`,
    );
}

// Each service has a <service>.version recording which release the document came
// from; printing it makes the inputs of a build visible in the log.
for (const service of services) {
    const version = readFileSync(`${SPEC_DIR}/${service}.version`, 'utf8').trim();
    console.log(`  ${service.padEnd(14)} ${version}`);
}

export default defineConfig(
    Object.fromEntries(services.map((service) => [service, describeService(service)])),
);
