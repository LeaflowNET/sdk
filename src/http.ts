// 生成的客户端统一经由此处发起请求。
//
// 集中处理凭据：项目令牌有有效期，且切换项目时会更换。若由各调用点自行设置 Authorization
// 头，令牌更新逻辑将分散在各处，遗漏之处会表现为间歇性的 401。
import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios';

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

let instance: AxiosInstance | undefined;
let provider: TokenProvider | undefined;

/** configure 初始化 SDK，使用前必须调用一次。 */
export function configure(options: ClientOptions): void {
    provider = options.getToken;
    instance = axios.create({
        baseURL: options.baseURL,
        timeout: options.timeout ?? 30_000,
    });
}

/** request 是生成代码统一使用的请求入口。 */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
    if (!instance) {
        throw new Error('SDK 未初始化：请先调用 configure({ baseURL })');
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
