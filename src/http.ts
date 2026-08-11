// Every generated client issues its requests through this module.
//
// Credentials are handled in one place: the project token expires and changes when
// the active project changes, so setting the Authorization header at each call site
// would scatter the refresh logic and surface as intermittent 401s.
import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios';

/** TokenProvider returns the current project token; an empty string sends no token. */
export type TokenProvider = () => string | Promise<string>;

export interface ClientOptions {
    /** baseURL is the API address, for example https://api.leaflow.net. */
    baseURL: string;
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

/** configure initialises the SDK. Call it once before use. */
export function configure(options: ClientOptions): void {
    provider = options.getToken;
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
    const response = await instance.request<T>({
        ...config,
        headers: {
            ...config.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return response.data;
}
