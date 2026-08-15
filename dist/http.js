// Every generated client issues its requests through this module.
//
// Credentials are handled in one place: the project token expires and changes when
// the active project changes, so setting the Authorization header at each call site
// would scatter the refresh logic and surface as intermittent 401s.
import axios from 'axios';
/**
 * A connection to one service.
 *
 * # There is no process-wide client, deliberately
 *
 * An earlier version of this package had `configure()`, which set a module-level
 * axios instance and a module-level token provider. That is state an SDK has no
 * business owning, and it ruled out two things this package is otherwise well
 * suited to:
 *
 *   - **More than one service.** The documents bundled here are separate
 *     deployments on separate addresses — one host per service through the
 *     gateway (`iam.leaflow.cloud`, `compute.leaflow.cloud`, …) — and their paths
 *     are bare `/api/v1/...` with no service prefix: `iam` and `monitoring` both
 *     own `/api/v1/projects/{id}/...`. One `baseURL` per process therefore meant
 *     one service per process.
 *   - **More than one caller.** A server handles requests concurrently, and a
 *     single module-level `getToken` is read at await points interleaved across
 *     them. Two people signed in at once is enough for one to make a call with
 *     the other's project token — intermittently, under load, which is the worst
 *     possible way to find out.
 *
 * So a client is an ordinary value: constructed per service, and — where the
 * token belongs to a request rather than to the process — per request. This is
 * the shape the major cloud SDKs converged on: `new InstancesClient({...})` in
 * Google Cloud, `new EC2Client({...})` in AWS v3, whose predecessor's global
 * `AWS.config` was removed for these same two reasons.
 */
export function createClient(options) {
    const instance = axios.create({
        baseURL: options.baseURL,
        timeout: options.timeout ?? 30_000,
    });
    return {
        async request(config) {
            const token = options.getToken ? await options.getToken() : '';
            const response = await instance.request({
                ...config,
                headers: {
                    ...config.headers,
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });
            return response.data;
        },
    };
}
/**
 * request is the entry point used by the generated code.
 *
 * The `options` argument is orval's mutator hook: every generated operation takes
 * it as its last parameter and passes it straight through, which is what lets a
 * caller say which client a call belongs to without this module holding any
 * per-call state.
 *
 * A call with no client throws rather than falling back to something. There used
 * to be a fallback, and a fallback is worse than an error exactly when it works:
 * in a process that talks to four services, the call that forgot its client
 * *succeeds*, against whichever service happened to be configured last.
 */
export async function request(config, options) {
    const client = options?.client;
    if (!client) {
        throw new Error('this operation was called without a client: get one from createIamClient / createComputeClient / createMonitoringClient / createAssistantClient');
    }
    return client.request(config);
}
/**
 * Attach a client to a whole generated namespace.
 *
 * The binding is by position: orval emits `options` as the last declared
 * parameter of every operation, so `fn.length - 1` is the slot. Arguments the
 * caller omitted are filled with `undefined` to reach it.
 *
 * `fn.length` stops counting at the first parameter that has a default, so that
 * assumption holds only while the generated code has none. It has none today, and
 * `scripts/check-generated-arity.mjs` fails the build if that changes: a slot
 * that silently shifts by one would pass the client as somebody's request body,
 * and no amount of type checking on generated code would catch it.
 */
export function bindClient(api, client) {
    return new Proxy(api, {
        get(target, property, receiver) {
            const value = Reflect.get(target, property, receiver);
            if (typeof value !== 'function') {
                return value;
            }
            const operation = value;
            return (...args) => {
                const slot = Math.max(operation.length - 1, 0);
                const head = args.slice(0, slot);
                while (head.length < slot) {
                    head.push(undefined);
                }
                return operation(...head, { client });
            };
        },
    });
}
