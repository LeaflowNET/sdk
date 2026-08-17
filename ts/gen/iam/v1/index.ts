// 由 scripts/generate-ts.mjs 生成，不要手改。
//
// 别名把 operations[...] 那串下标换成一个名字。原始的 paths / components / operations 也
// 一并导出：paths 是给 openapi-fetch 的 createClient<paths>() 用的。

export type { paths, components, operations, webhooks } from "./schema.js";

import type { operations } from "./schema.js";

/** `GET /api/v1/permissions` 成功时的响应体。 */
export type ListPermissionsResult =
  operations["list-permissions"]["responses"][200]["content"]["application/json"];

/** `DELETE /api/v1/project` 成功时的响应体。 */
export type DeleteProjectResult =
  operations["delete-project"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/project` 成功时的响应体。 */
export type GetProjectResult =
  operations["get-project"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/project` 成功时的响应体。 */
export type UpdateProjectResult =
  operations["update-project"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/project` 的请求体。 */
export type UpdateProjectBody = NonNullable<
  operations["update-project"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/membership` 成功时的响应体。 */
export type GetProjectMembershipResult =
  operations["get-project-membership"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/invitations` 成功时的响应体。 */
export type ListProjectInvitationsResult =
  operations["list-project-invitations"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/invitations` 成功时的响应体。 */
export type IssueInvitationResult =
  operations["issue-invitation"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/invitations` 的请求体。 */
export type IssueInvitationBody = NonNullable<
  operations["issue-invitation"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/members` 成功时的响应体。 */
export type ListMembersResult =
  operations["list-members"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/members/{userId}/roles` 成功时的响应体。 */
export type SetMemberRolesResult =
  operations["set-member-roles"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/members/{userId}/roles` 的请求体。 */
export type SetMemberRolesBody = NonNullable<
  operations["set-member-roles"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/transfer-ownership` 成功时的响应体。 */
export type TransferProjectOwnershipResult =
  operations["transfer-project-ownership"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/transfer-ownership` 的请求体。 */
export type TransferProjectOwnershipBody = NonNullable<
  operations["transfer-project-ownership"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/roles` 成功时的响应体。 */
export type ListRolesResult =
  operations["list-roles"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/roles` 成功时的响应体。 */
export type CreateRoleResult =
  operations["create-role"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/roles` 的请求体。 */
export type CreateRoleBody = NonNullable<
  operations["create-role"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/roles/{code}` 成功时的响应体。 */
export type GetRoleResult =
  operations["get-role"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/roles/{code}` 成功时的响应体。 */
export type UpdateRoleResult =
  operations["update-role"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/roles/{code}` 的请求体。 */
export type UpdateRoleBody = NonNullable<
  operations["update-role"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/ssh-keys` 成功时的响应体。 */
export type ListSshKeysResult =
  operations["list-ssh-keys"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/ssh-keys` 成功时的响应体。 */
export type CreateSshKeyResult =
  operations["create-ssh-key"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/ssh-keys` 的请求体。 */
export type CreateSshKeyBody = NonNullable<
  operations["create-ssh-key"]["requestBody"]
>["content"]["application/json"];

/** `DELETE /api/v1/ssh-keys/{keyId}` 成功时的响应体。 */
export type RevokeSshKeyResult =
  operations["revoke-ssh-key"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/ssh-keys/{keyId}` 成功时的响应体。 */
export type GetSshKeyResult =
  operations["get-ssh-key"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/ssh-keys/{keyId}` 成功时的响应体。 */
export type RenameSshKeyResult =
  operations["rename-ssh-key"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/ssh-keys/{keyId}` 的请求体。 */
export type RenameSshKeyBody = NonNullable<
  operations["rename-ssh-key"]["requestBody"]
>["content"]["application/json"];
