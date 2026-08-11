// 生成的客户端统一经由此处发起请求。
//
// 集中处理凭据：项目令牌有有效期，且切换项目时会更换。若由各调用点自行设置 Authorization
// 头，令牌更新逻辑将分散在各处，遗漏之处会表现为间歇性的 401。
import axios from 'axios';
let instance;
let provider;
/** configure 初始化 SDK，使用前必须调用一次。 */
export function configure(options) {
    provider = options.getToken;
    instance = axios.create({
        baseURL: options.baseURL,
        timeout: options.timeout ?? 30_000,
    });
}
/** request 是生成代码统一使用的请求入口。 */
export async function request(config) {
    if (!instance) {
        throw new Error('SDK 未初始化：请先调用 configure({ baseURL })');
    }
    const token = provider ? await provider() : '';
    const response = await instance.request({
        ...config,
        headers: {
            ...config.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return response.data;
}
