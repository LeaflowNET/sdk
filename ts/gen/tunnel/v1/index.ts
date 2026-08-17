// 由 scripts/generate-ts.mjs 生成，不要手改。
//
// 别名把 operations[...] 那串下标换成一个名字。原始的 paths / components / operations 也
// 一并导出：paths 是给 openapi-fetch 的 createClient<paths>() 用的。

export type { paths, components, operations, webhooks } from "./schema.js";

import type { operations } from "./schema.js";

/** `GET /api/v1/operation-logs` 成功时的响应体。 */
export type ListTunnelOperationLogsResult =
  operations["list-tunnel-operation-logs"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/plans` 成功时的响应体。 */
export type ListTunnelPlansResult =
  operations["list-tunnel-plans"]["responses"][200]["content"]["application/json"];

/** `DELETE /api/v1/tunnel` 成功时的响应体。 */
export type CloseTunnelResult =
  operations["close-tunnel"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/tunnel` 成功时的响应体。 */
export type GetTunnelResult =
  operations["get-tunnel"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/tunnel` 成功时的响应体。 */
export type UpdateTunnelProfileResult =
  operations["update-tunnel-profile"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/tunnel` 的请求体。 */
export type UpdateTunnelProfileBody = NonNullable<
  operations["update-tunnel-profile"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/tunnel` 成功时的响应体。 */
export type OpenTunnelResult =
  operations["open-tunnel"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/tunnel` 的请求体。 */
export type OpenTunnelBody = NonNullable<
  operations["open-tunnel"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/tunnel/actions` 成功时的响应体。 */
export type ActOnTunnelResult =
  operations["act-on-tunnel"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/tunnel/actions` 的请求体。 */
export type ActOnTunnelBody = NonNullable<
  operations["act-on-tunnel"]["requestBody"]
>["content"]["application/json"];

/** `PUT /api/v1/tunnel/plan` 成功时的响应体。 */
export type ChangeTunnelPlanResult =
  operations["change-tunnel-plan"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/tunnel/plan` 的请求体。 */
export type ChangeTunnelPlanBody = NonNullable<
  operations["change-tunnel-plan"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/tunnel/subscription` 成功时的响应体。 */
export type GetTunnelSubscriptionResult =
  operations["get-tunnel-subscription"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/tunnel/subscription/rotate` 成功时的响应体。 */
export type RotateTunnelSubscriptionResult =
  operations["rotate-tunnel-subscription"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/tunnel/usage` 成功时的响应体。 */
export type GetTunnelUsageResult =
  operations["get-tunnel-usage"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/tunnel/usage/series` 成功时的响应体。 */
export type ListTunnelUsageSeriesResult =
  operations["list-tunnel-usage-series"]["responses"][200]["content"]["application/json"];
