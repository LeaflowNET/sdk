// Every generated client issues its requests through this module.
//
// Credentials are handled in one place: the project token expires and changes when
// the active project changes, so setting the Authorization header at each call site
// would scatter the refresh logic and surface as intermittent 401s.
import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios';

/** TokenProvider returns the current project token; an empty string sends no token. */
export type TokenProvider = () => string | Promise<string>;

export interface ClientOptions {
    /** baseURL is one service's address, for example https://compute.leaflow.cloud. */
    baseURL: string;
    /**
     * getToken is called before every request.
     *
     * Called each time rather than read once at construction: the project token
     * expires, it is replaced when the active project changes, and in a server it
     * belongs to whoever is making the current request rather than to the process.
     */
    getToken?: TokenProvider;
    /** timeout in milliseconds. */
    timeout?: number;
}

/** A configured connection to one service. */
export interface Client {
    request<T>(config: AxiosRequestConfig): Promise<T>;
}

/**
 * The last argument of every generated operation: which client to go through.
 *
 * Callers of this package do not construct it. `createIamClient` and its siblings
 * hand back operations with this parameter already bound and gone from the
 * signature — see `bindClient`.
 */
export interface RequestOptions {
    client?: Client;
}

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
export function createClient(options: ClientOptions): Client {
    const instance: AxiosInstance = axios.create({
        baseURL: options.baseURL,
        timeout: options.timeout ?? 30_000,
    });

    return {
        async request<T>(config: AxiosRequestConfig): Promise<T> {
            const token = options.getToken ? await options.getToken() : '';

            const response = await instance.request<T>({
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
export async function request<T>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
): Promise<T> {
    const client = options?.client;

    if (!client) {
        throw new Error(
            'this operation was called without a client: get one from createIamClient / createComputeClient / createMonitoringClient / createAssistantClient',
        );
    }

    return client.request<T>(config);
}

/**
 * One service's operations, with the client bound and no longer in the signature.
 *
 * The mapped type is the point: `getAccount()` on a bound namespace has no
 * `options` parameter at all, so there is no way to reach the transport by hand,
 * and no way for one service's client to be handed to another service's
 * operation. What is left is what the caller of an SDK should see — the operation
 * and its arguments.
 */
export type Bound<T> = {
    [K in keyof T]: T[K] extends (
        ...args: [...infer Head, (RequestOptions | undefined)?]
    ) => infer Result
        ? (...args: Head) => Result
        : T[K];
};

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
 *
 * # Why this builds an object instead of returning a Proxy
 *
 * It used to be a `Proxy` over the namespace, which is smaller and binds lazily.
 * It also threw, in production only:
 *
 *     'get' on proxy: property 'getAccount' is a read-only and non-configurable
 *     data property on the proxy target but the proxy did not return its actual
 *     value
 *
 * That is a Proxy invariant, not a bug in the trap. `api` is an ES module
 * namespace object, and a bundler is free to emit its exports as non-writable and
 * non-configurable — Next's production build does, its dev server does not. When
 * a target property is a read-only non-configurable data property, `get` **must**
 * return that exact value, so a trap whose entire purpose is to return a wrapper
 * cannot be correct. The old code was not wrong about the bundler; it was wrong
 * about Proxy.
 *
 * It failed the worst possible way: every local check passes, `pnpm dev` passes,
 * the production bundle throws on the first call. In the console that first call
 * is `getAccount` during sign-in, so the symptom was "nobody can log in" with an
 * error naming IAM — a service that was fine.
 *
 * Copying costs one pass over a few dozen keys per client. Clients are made per
 * request here, which sounds like a lot until you notice the request that follows
 * goes over a network.
 */
export function bindClient<T extends object>(api: T, client: Client): Bound<T> {
    const bound: Record<string, unknown> = {};

    /*
     * `for...in` rather than `Object.keys`: a namespace object's exports are its
     * own enumerable properties either way, but re-exported members can arrive on
     * the prototype chain depending on how the bundler emitted them, and an
     * operation that is silently missing is worse than one that is bound twice.
     */
    for (const property in api) {
        const value: unknown = (api as Record<string, unknown>)[property];

        if (typeof value !== 'function') {
            bound[property] = value;
            continue;
        }

        const operation = value as ((...args: unknown[]) => unknown) & {
            length: number;
        };

        bound[property] = (...args: unknown[]): unknown => {
            const slot = Math.max(operation.length - 1, 0);
            const head = args.slice(0, slot);

            while (head.length < slot) {
                head.push(undefined);
            }

            return operation(...head, { client });
        };
    }

    return bound as Bound<T>;
}
