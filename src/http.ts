// Every generated client issues its requests through this module.
//
// Credentials are handled in one place: the project token expires and changes when
// the active project changes, so setting the Authorization header at each call site
// would scatter the refresh logic and surface as intermittent 401s.
import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios';

/** TokenProvider returns the current project token; an empty string sends no token. */
export type TokenProvider = () => string | Promise<string>;

/** BaseURLProvider returns the address the current request should go to. */
export type BaseURLProvider = () => string | Promise<string>;

export interface ClientOptions {
    /**
     * baseURL is the API address, for example https://api.leaflow.net.
     *
     * Optional only because getBaseURL may supply it instead; one of the two is
     * required.
     */
    baseURL?: string;
    /**
     * getBaseURL is called before every request, and takes precedence over baseURL.
     *
     * This package bundles several services, and they do not have to live behind one
     * address: in development each runs on its own port. A caller that knows which
     * service it is about to call resolves the address here rather than configuring
     * one client per service.
     */
    getBaseURL?: BaseURLProvider;
    /**
     * getToken is called before every request.
     *
     * Called each time rather than read once at setup: the project token expires and
     * is replaced when the active project changes.
     */
    getToken?: TokenProvider;
    /** timeout in milliseconds. */
    timeout?: number;
}

let instance: AxiosInstance | undefined;
let provider: TokenProvider | undefined;
let baseURLProvider: BaseURLProvider | undefined;

/** configure initialises the SDK. Call it once before use. */
export function configure(options: ClientOptions): void {
    if (!options.baseURL && !options.getBaseURL) {
        throw new Error('configure requires baseURL or getBaseURL');
    }
    provider = options.getToken;
    baseURLProvider = options.getBaseURL;
    instance = axios.create({
        baseURL: options.baseURL,
        timeout: options.timeout ?? 30_000,
    });
}

/** request is the entry point used by the generated code. */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
    if (!instance) {
        throw new Error('SDK not initialised: call configure({ baseURL }) first');
    }
    const token = provider ? await provider() : '';
    const baseURL = baseURLProvider ? await baseURLProvider() : undefined;
    const response = await instance.request<T>({
        ...config,
        ...(baseURL ? { baseURL } : {}),
        headers: {
            ...config.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return response.data;
}
