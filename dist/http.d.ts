import { type AxiosRequestConfig } from 'axios';
/** TokenProvider 返回当前使用的项目令牌；返回空字符串表示本次请求不携带令牌。 */
export type TokenProvider = () => string | Promise<string>;
export interface ClientOptions {
    /** baseURL 是 API 地址，例如 https://api.leaflow.net。 */
    baseURL: string;
    /**
     * getToken 在每次请求前调用。
     *
     * 每次都调用而非初始化时取一次：项目令牌有有效期，切换项目时也会更换。缓存旧值会导致
     * 切换项目后请求仍携带上一个项目的令牌。
     */
    getToken?: TokenProvider;
    /** timeout 单位毫秒。 */
    timeout?: number;
}
/** configure 初始化 SDK，使用前必须调用一次。 */
export declare function configure(options: ClientOptions): void;
/** request 是生成代码统一使用的请求入口。 */
export declare function request<T>(config: AxiosRequestConfig): Promise<T>;
