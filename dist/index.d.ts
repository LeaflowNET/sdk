import type { Bound, ClientOptions } from './http.js';
import * as assistantOperations from './generated/assistant/index.js';
import * as computeOperations from './generated/compute/index.js';
import * as iamOperations from './generated/iam/index.js';
import * as monitoringOperations from './generated/monitoring/index.js';
export { createClient } from './http.js';
export type { Client, ClientOptions, TokenProvider } from './http.js';
export * as assistant from './generated/assistant/index.js';
export * as compute from './generated/compute/index.js';
export * as iam from './generated/iam/index.js';
export * as monitoring from './generated/monitoring/index.js';
/** Every assistant operation, bound to one address and one token. */
export type AssistantClient = Bound<typeof assistantOperations>;
/**
 * A client for assistant.
 *
 *     const assistant = createAssistantClient({ baseURL, getToken });
 *
 * Hold one per address, and — where the token belongs to the request
 * rather than to the process — one per request. There is no
 * process-wide alternative; see `createClient`.
 */
export declare function createAssistantClient(options: ClientOptions): AssistantClient;
/** Every compute operation, bound to one address and one token. */
export type ComputeClient = Bound<typeof computeOperations>;
/**
 * A client for compute.
 *
 *     const compute = createComputeClient({ baseURL, getToken });
 *
 * Hold one per address, and — where the token belongs to the request
 * rather than to the process — one per request. There is no
 * process-wide alternative; see `createClient`.
 */
export declare function createComputeClient(options: ClientOptions): ComputeClient;
/** Every iam operation, bound to one address and one token. */
export type IamClient = Bound<typeof iamOperations>;
/**
 * A client for iam.
 *
 *     const iam = createIamClient({ baseURL, getToken });
 *
 * Hold one per address, and — where the token belongs to the request
 * rather than to the process — one per request. There is no
 * process-wide alternative; see `createClient`.
 */
export declare function createIamClient(options: ClientOptions): IamClient;
/** Every monitoring operation, bound to one address and one token. */
export type MonitoringClient = Bound<typeof monitoringOperations>;
/**
 * A client for monitoring.
 *
 *     const monitoring = createMonitoringClient({ baseURL, getToken });
 *
 * Hold one per address, and — where the token belongs to the request
 * rather than to the process — one per request. There is no
 * process-wide alternative; see `createClient`.
 */
export declare function createMonitoringClient(options: ClientOptions): MonitoringClient;
/** Service versions the bundled specs were generated from. */
export declare const SERVICE_VERSIONS: Record<string, string>;
