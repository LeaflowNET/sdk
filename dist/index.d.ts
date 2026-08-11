export { configure, request } from './http.js';
export type { ClientOptions, TokenProvider } from './http.js';
export * as assistant from './generated/assistant/index.js';
export * as compute from './generated/compute/index.js';
export * as iam from './generated/iam/index.js';
export * as monitoring from './generated/monitoring/index.js';
/** Service versions the bundled specs were generated from. */
export declare const SERVICE_VERSIONS: Record<string, string>;
