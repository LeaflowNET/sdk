import { type AxiosRequestConfig } from 'axios';
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
/** configure initialises the SDK. Call it once before use. */
export declare function configure(options: ClientOptions): void;
/** request is the entry point used by the generated code. */
export declare function request<T>(config: AxiosRequestConfig): Promise<T>;
