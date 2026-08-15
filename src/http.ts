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
     * Called each time rather than read once at setup: the project token expires,
     * it is replaced when the active project changes, and in a server it belongs
     * to whoever is making the current request rather than to the process.
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
 * The second argument every generated operation accepts.
 *
 * `client` is what makes it possible to talk to more than one service, or to more
 * than one caller's credentials, from a single process.
 */
export interface RequestOptions {
    client?: Client;
}

/**
 * A connection to one service.
 *
 * # Why this exists rather than only `configure`
 *
 * `configure` sets module-level state, which quietly rules out two things this SDK
 * is otherwise well suited to:
 *
 *   - **More than one service.** The documents bundled here are separate
 *     deployments on separate addresses — one host per service through the
 *     gateway (`iam.leaflow.cloud`, `compute.leaflow.cloud`, …) — and their paths
 *     are bare `/api/v1/...` with no service prefix: `iam` and `monitoring` both
 *     own `/api/v1/projects/{id}/...`. One `baseURL` per process therefore means
 *     one service per process.
 *   - **More than one caller.** A server handles requests concurrently, and a
 *     single module-level `getToken` is read at await points interleaved across
 *     them. Two people signed in at once is enough for one to make a call with
 *     the other's project token — intermittently, under load, which is the worst
 *     possible way to find out.
 *
 * A client is an ordinary value, so both problems become "hold the right one".
 *
 * # Why there is no `getBaseURL` any more
 *
 * There was one, and it existed to let the single module-level instance point
 * somewhere different per call — which is to say, to work around being a
 * singleton. A client per service answers the same question by construction, and
 * a resolver that runs before every request is one more place for the address to
 * be wrong.
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
 * The client used when a call does not name one.
 *
 * Kept for single-service consumers — a browser talking to one service, a script
 * — for whom threading a client through every call is ceremony with no payoff. It
 * is a fallback and not the default anyone should reach for in a server: see
 * `createClient` for why.
 */
let fallback: Client | undefined;

/** configure initialises the process-wide fallback client. Call it once. */
export function configure(options: ClientOptions): void {
    fallback = createClient(options);
}

/**
 * request is the entry point used by the generated code.
 *
 * The `options` argument is orval's mutator hook: every generated operation takes
 * it as its last parameter and passes it straight through, which is what lets a
 * caller say which client a call belongs to without this module holding any
 * per-call state.
 */
export async function request<T>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
): Promise<T> {
    const client = options?.client ?? fallback;

    if (!client) {
        throw new Error(
            'SDK not initialised: pass { client } from createClient(), or call configure({ baseURL }) once for a single-service process',
        );
    }

    return client.request<T>(config);
}

/**
 * A generated namespace with a client already attached.
 *
 * `compute.listInstances(params, { client })` at every call site is correct and
 * tiring, and the tiring part is what makes somebody eventually forget one — at
 * which point the call silently falls through to the process-wide fallback,
 * which in a multi-service process points at the wrong service.
 *
 *     const compute = withClient(sdk.compute, createClient({ baseURL, getToken }));
 *     await compute.listInstances({});
 *
 * The binding is by position: orval emits `options` as the last declared
 * parameter of every operation, so `fn.length - 1` is the slot. Arguments the
 * caller omitted are filled with `undefined` to reach it, and an options object
 * the caller did pass is merged rather than replaced.
 */
export function withClient<T extends object>(api: T, client: Client): T {
    return new Proxy(api, {
        get(target, property, receiver): unknown {
            const value: unknown = Reflect.get(target, property, receiver);

            if (typeof value !== 'function') {
                return value;
            }

            const operation = value as ((...args: unknown[]) => unknown) & {
                length: number;
            };

            return (...args: unknown[]): unknown => {
                const slot = Math.max(operation.length - 1, 0);
                const head = args.slice(0, slot);

                while (head.length < slot) {
                    head.push(undefined);
                }

                const passed = args[slot] as RequestOptions | undefined;

                return operation(...head, { ...passed, client });
            };
        },
    }) as T;
}
