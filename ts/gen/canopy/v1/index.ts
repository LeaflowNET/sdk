// 由 scripts/generate-ts.mjs 生成，不要手改。
//
// 别名把 operations[...] 那串下标换成一个名字。原始的 paths / components / operations 也
// 一并导出：paths 是给 openapi-fetch 的 createClient<paths>() 用的。

export type { paths, components, operations, webhooks } from "./schema.js";

import type { operations } from "./schema.js";

/** `GET /api/v1/keys` 成功时的响应体。 */
export type ListApiKeysResult =
  operations["list-api-keys"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/keys` 成功时的响应体。 */
export type CreateApiKeyResult =
  operations["create-api-key"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/keys` 的请求体。 */
export type CreateApiKeyBody = NonNullable<
  operations["create-api-key"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/keys/{keyId}` 成功时的响应体。 */
export type GetApiKeyResult =
  operations["get-api-key"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/keys/{keyId}` 成功时的响应体。 */
export type UpdateApiKeyResult =
  operations["update-api-key"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/keys/{keyId}` 的请求体。 */
export type UpdateApiKeyBody = NonNullable<
  operations["update-api-key"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/keys/{keyId}/disable` 成功时的响应体。 */
export type DisableApiKeyResult =
  operations["disable-api-key"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/keys/{keyId}/enable` 成功时的响应体。 */
export type EnableApiKeyResult =
  operations["enable-api-key"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/keys/{keyId}/revoke` 成功时的响应体。 */
export type RevokeApiKeyResult =
  operations["revoke-api-key"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/models` 成功时的响应体。 */
export type ListModelsResult =
  operations["list-models"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/models/{modelId}` 成功时的响应体。 */
export type GetModelResult =
  operations["get-model"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/requests` 成功时的响应体。 */
export type ListRequestsResult =
  operations["list-requests"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/requests/{requestId}` 成功时的响应体。 */
export type GetRequestResult =
  operations["get-request"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/usage/by-api-key` 成功时的响应体。 */
export type ListUsageByApiKeyResult =
  operations["list-usage-by-api-key"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/usage/by-model` 成功时的响应体。 */
export type ListUsageByModelResult =
  operations["list-usage-by-model"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/usage/summary` 成功时的响应体。 */
export type GetUsageSummaryResult =
  operations["get-usage-summary"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/usage/timeline` 成功时的响应体。 */
export type GetUsageTimelineResult =
  operations["get-usage-timeline"]["responses"][200]["content"]["application/json"];
