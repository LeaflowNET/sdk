import { type AxiosRequestConfig } from 'axios';
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
/** configure initialises the SDK. Call it once before use. */
export declare function configure(options: ClientOptions): void;
/** request is the entry point used by the generated code. */
export declare function request<T>(config: AxiosRequestConfig): Promise<T>;
