// 由 scripts/generate-ts.mjs 生成，不要手改。
//
// 别名把 operations[...] 那串下标换成一个名字。原始的 paths / components / operations 也
// 一并导出：paths 是给 openapi-fetch 的 createClient<paths>() 用的。

export type { paths, components, operations, webhooks } from "./schema.js";

import type { operations } from "./schema.js";

/** `GET /account/v1/agreements` 成功时的响应体。 */
export type ListAgreementsResult =
  operations["list-agreements"]["responses"][200]["content"]["application/json"];

/** `GET /account/v1/me/consents` 成功时的响应体。 */
export type ListConsentsResult =
  operations["list-consents"]["responses"][200]["content"]["application/json"];

/** `POST /account/v1/me/consents` 成功时的响应体。 */
export type AcceptAgreementsResult =
  operations["accept-agreements"]["responses"][200]["content"]["application/json"];

/** `POST /account/v1/me/consents` 的请求体。 */
export type AcceptAgreementsBody = NonNullable<
  operations["accept-agreements"]["requestBody"]
>["content"]["application/json"];

/** `POST /account/v1/register` 成功时的响应体。 */
export type RegisterResult =
  operations["register"]["responses"][201]["content"]["application/json"];

/** `POST /account/v1/register` 的请求体。 */
export type RegisterBody = NonNullable<
  operations["register"]["requestBody"]
>["content"]["application/json"];

/** `GET /account/v1/me` 成功时的响应体。 */
export type GetAccountResult =
  operations["get-account"]["responses"][200]["content"]["application/json"];

/** `GET /account/v1/me/identity-verification` 成功时的响应体。 */
export type GetIdentityVerificationResult =
  operations["get-identity-verification"]["responses"][200]["content"]["application/json"];

/** `POST /account/v1/me/identity-verification` 成功时的响应体。 */
export type SubmitIdentityVerificationResult =
  operations["submit-identity-verification"]["responses"][202]["content"]["application/json"];

/** `POST /account/v1/me/identity-verification` 的请求体。 */
export type SubmitIdentityVerificationBody = NonNullable<
  operations["submit-identity-verification"]["requestBody"]
>["content"]["application/json"];

/** `GET /account/v1/me/invitations` 成功时的响应体。 */
export type ListMyInvitationsResult =
  operations["list-my-invitations"]["responses"][200]["content"]["application/json"];

/** `POST /account/v1/me/invitations/accept` 成功时的响应体。 */
export type AcceptInvitationByTokenResult =
  operations["accept-invitation-by-token"]["responses"][200]["content"]["application/json"];

/** `POST /account/v1/me/invitations/accept` 的请求体。 */
export type AcceptInvitationByTokenBody = NonNullable<
  operations["accept-invitation-by-token"]["requestBody"]
>["content"]["application/json"];

/** `POST /account/v1/me/invitations/{invitationId}/accept` 成功时的响应体。 */
export type AcceptInvitationResult =
  operations["accept-invitation"]["responses"][200]["content"]["application/json"];

/** `GET /account/v1/projects` 成功时的响应体。 */
export type ListProjectsResult =
  operations["list-projects"]["responses"][200]["content"]["application/json"];

/** `POST /account/v1/projects` 成功时的响应体。 */
export type CreateProjectResult =
  operations["create-project"]["responses"][201]["content"]["application/json"];

/** `POST /account/v1/projects` 的请求体。 */
export type CreateProjectBody = NonNullable<
  operations["create-project"]["requestBody"]
>["content"]["application/json"];

/** `POST /account/v1/projects/{projectId}/token` 成功时的响应体。 */
export type ExchangeProjectTokenResult =
  operations["exchange-project-token"]["responses"][201]["content"]["application/json"];
