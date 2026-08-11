export { configure, request } from './http.js';
export type { ClientOptions, TokenProvider } from './http.js';
export * as assistant from './generated/assistant/index.js';
export * as compute from './generated/compute/index.js';
export * as iam from './generated/iam/index.js';
export * as monitoring from './generated/monitoring/index.js';
/** SERVICE_VERSIONS 记着每份文档来自服务的哪个 tag。
 *
 * 排查“SDK 说有这个字段而服务端没有”时第一个要看的就是它——只看生成出来的代码
 * 答不出这份 SDK 是照着服务的哪一版生成的。
 */
export declare const SERVICE_VERSIONS: Record<string, string>;
