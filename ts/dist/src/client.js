import createFetchClient, {} from "openapi-fetch";
async function resolveToken(source) {
    return typeof source === "string" ? source : await source();
}
function authorization(source) {
    return {
        async onRequest({ request }) {
            request.headers.set("Authorization", `Bearer ${await resolveToken(source)}`);
            return request;
        },
    };
}
function build(options) {
    const client = createFetchClient({
        baseUrl: options.baseUrl,
        fetch: options.fetch,
    });
    client.use(authorization(options.token));
    return client;
}
/**
 * 一个项目令牌，七个服务。
 *
 * 每个服务是一个独立的客户端，各自认自己那份 schema —— 类型不跨服务共享。这不是为了整齐：
 * compute 和 tunnel 各有一个 OperationLogResource，它们是两个不同的类型，合进一个命名空间
 * 之后先声明的那个会盖掉另一个，而盖掉不报错。
 */
export function createClient(options) {
    return {
        assistant: build(options),
        canopy: build(options),
        compute: build(options),
        iam: build(options),
        monitoring: build(options),
        tunnel: build(options),
    };
}
/** 账号 API：注册、账号本身、我参与了哪些项目、换取项目令牌。 */
export function createAccountClient(options) {
    return build(options);
}
