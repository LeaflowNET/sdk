import type { paths as AccountPaths } from "../gen/account/v1/schema.js";
import type { paths as AssistantPaths } from "../gen/assistant/v1/schema.js";
import type { paths as CanopyPaths } from "../gen/canopy/v1/schema.js";
import type { paths as ComputePaths } from "../gen/compute/v1/schema.js";
import type { paths as IamPaths } from "../gen/iam/v1/schema.js";
import type { paths as MonitoringPaths } from "../gen/monitoring/v1/schema.js";
import type { paths as TunnelPaths } from "../gen/tunnel/v1/schema.js";
/**
 * 令牌怎么拿到。
 *
 * 是个函数而不是一个字符串：项目令牌会过期，而它没有刷新接口——过期之后要拿账号令牌重新换一张
 * （见 account.exchangeProjectToken）。传字符串的话，那次续期要调用方自己想起来重建整个
 * 客户端，而忘了的表现是「用着用着就全是 401」。
 */
export type TokenSource = string | (() => string | Promise<string>);
export interface ClientOptions {
    /** 网关地址，比如 https://api.leaflow.net */
    baseUrl: string;
    /**
     * 项目令牌。它同时说明当前用户和当前项目，所以**这里不传 projectId**——
     * 当前项目由令牌断言，接口路径上也没有这个参数。要换项目就换一张令牌。
     */
    token: TokenSource;
    fetch?: typeof globalThis.fetch;
}
/**
 * 账号 API 用的是**另一张令牌**，所以它有自己的入口。
 *
 * 账号令牌来自 auth.leaflow.net 的登录，只说明你是谁、不带任何项目；项目令牌是拿它去 IAM
 * 换的。两者混用的表现是 401，而错误信息说不清是哪一张不对——分成两个入口之后，调用方在写
 * 代码那一刻就得选对。
 */
export interface AccountClientOptions {
    baseUrl: string;
    /** 账号令牌 */
    token: TokenSource;
    fetch?: typeof globalThis.fetch;
}
/**
 * 一个项目令牌，七个服务。
 *
 * 每个服务是一个独立的客户端，各自认自己那份 schema —— 类型不跨服务共享。这不是为了整齐：
 * compute 和 tunnel 各有一个 OperationLogResource，它们是两个不同的类型，合进一个命名空间
 * 之后先声明的那个会盖掉另一个，而盖掉不报错。
 */
export declare function createClient(options: ClientOptions): {
    assistant: import("openapi-fetch").Client<AssistantPaths, `${string}/${string}`>;
    canopy: import("openapi-fetch").Client<CanopyPaths, `${string}/${string}`>;
    compute: import("openapi-fetch").Client<ComputePaths, `${string}/${string}`>;
    iam: import("openapi-fetch").Client<IamPaths, `${string}/${string}`>;
    monitoring: import("openapi-fetch").Client<MonitoringPaths, `${string}/${string}`>;
    tunnel: import("openapi-fetch").Client<TunnelPaths, `${string}/${string}`>;
};
/** 账号 API：注册、账号本身、我参与了哪些项目、换取项目令牌。 */
export declare function createAccountClient(options: AccountClientOptions): import("openapi-fetch").Client<AccountPaths, `${string}/${string}`>;
export type LeaflowClient = ReturnType<typeof createClient>;
export type AccountClient = ReturnType<typeof createAccountClient>;
