// 由 scripts/generate-ts.mjs 生成，不要手改。
//
// 别名把 operations[...] 那串下标换成一个名字。原始的 paths / components / operations 也
// 一并导出：paths 是给 openapi-fetch 的 createClient<paths>() 用的。

export type { paths, components, operations, webhooks } from "./schema.js";

import type { operations } from "./schema.js";

/** `POST /v1/attachments` 成功时的响应体。 */
export type UploadAttachmentResult =
  operations["upload-attachment"]["responses"][201]["content"]["application/json"];

/** `GET /v1/bindings` 成功时的响应体。 */
export type ListBindingsResult =
  operations["list-bindings"]["responses"][200]["content"]["application/json"];

/** `GET /v1/bindings/{binding}` 成功时的响应体。 */
export type GetBindingResult =
  operations["get-binding"]["responses"][200]["content"]["application/json"];

/** `GET /v1/channels` 成功时的响应体。 */
export type ListChannelsResult =
  operations["list-channels"]["responses"][200]["content"]["application/json"];

/** `POST /v1/channels` 成功时的响应体。 */
export type CreateChannelResult =
  operations["create-channel"]["responses"][201]["content"]["application/json"];

/** `POST /v1/channels` 的请求体。 */
export type CreateChannelBody = NonNullable<
  operations["create-channel"]["requestBody"]
>["content"]["application/json"];

/** `GET /v1/channels/{channel}` 成功时的响应体。 */
export type GetChannelResult =
  operations["get-channel"]["responses"][200]["content"]["application/json"];

/** `PATCH /v1/channels/{channel}` 成功时的响应体。 */
export type UpdateChannelResult =
  operations["update-channel"]["responses"][200]["content"]["application/json"];

/** `PATCH /v1/channels/{channel}` 的请求体。 */
export type UpdateChannelBody = NonNullable<
  operations["update-channel"]["requestBody"]
>["content"]["application/json"];

/** `POST /v1/channels/{channel}/binding-codes` 成功时的响应体。 */
export type CreateBindingCodeResult =
  operations["create-binding-code"]["responses"][201]["content"]["application/json"];

/** `GET /v1/channels/{channel}/rejections` 成功时的响应体。 */
export type ListChannelRejectionsResult =
  operations["list-channel-rejections"]["responses"][200]["content"]["application/json"];

/** `POST /v1/channels/{channel}/secret` 成功时的响应体。 */
export type RotateChannelSecretResult =
  operations["rotate-channel-secret"]["responses"][200]["content"]["application/json"];

/** `POST /v1/channels/{channel}/secret` 的请求体。 */
export type RotateChannelSecretBody = NonNullable<
  operations["rotate-channel-secret"]["requestBody"]
>["content"]["application/json"];

/** `GET /v1/channels/{channel}/sender-check` 成功时的响应体。 */
export type CheckSenderResult =
  operations["check-sender"]["responses"][200]["content"]["application/json"];

/** `POST /v1/channels/{channel}/weixin-logins` 成功时的响应体。 */
export type BeginWeixinLoginResult =
  operations["begin-weixin-login"]["responses"][201]["content"]["application/json"];

/** `GET /v1/platforms` 成功时的响应体。 */
export type ListPlatformsResult =
  operations["list-platforms"]["responses"][200]["content"]["application/json"];

/** `GET /v1/weixin-logins/{login}` 成功时的响应体。 */
export type GetWeixinLoginResult =
  operations["get-weixin-login"]["responses"][200]["content"]["application/json"];

/** `POST /v1/weixin-logins/{login}/verify-code` 成功时的响应体。 */
export type SubmitWeixinVerifyCodeResult =
  operations["submit-weixin-verify-code"]["responses"][200]["content"]["application/json"];

/** `POST /v1/weixin-logins/{login}/verify-code` 的请求体。 */
export type SubmitWeixinVerifyCodeBody = NonNullable<
  operations["submit-weixin-verify-code"]["requestBody"]
>["content"]["application/json"];

/** `GET /v1/models` 成功时的响应体。 */
export type ListModelsResult =
  operations["list-models"]["responses"][200]["content"]["application/json"];

/** `GET /v1/threads` 成功时的响应体。 */
export type ListThreadsResult =
  operations["list-threads"]["responses"][200]["content"]["application/json"];

/** `POST /v1/threads` 成功时的响应体。 */
export type CreateThreadResult =
  operations["create-thread"]["responses"][201]["content"]["application/json"];

/** `POST /v1/threads` 的请求体。 */
export type CreateThreadBody = NonNullable<
  operations["create-thread"]["requestBody"]
>["content"]["application/json"];

/** `GET /v1/threads/{thread}` 成功时的响应体。 */
export type GetThreadResult =
  operations["get-thread"]["responses"][200]["content"]["application/json"];

/** `PATCH /v1/threads/{thread}` 成功时的响应体。 */
export type UpdateThreadResult =
  operations["update-thread"]["responses"][200]["content"]["application/json"];

/** `PATCH /v1/threads/{thread}` 的请求体。 */
export type UpdateThreadBody = NonNullable<
  operations["update-thread"]["requestBody"]
>["content"]["application/json"];

/** `POST /v1/threads/{thread}/approvals/{batch}` 的请求体。 */
export type DecideApprovalBody = NonNullable<
  operations["decide-approval"]["requestBody"]
>["content"]["application/json"];

/** `GET /v1/threads/{thread}/earlier` 成功时的响应体。 */
export type ListEarlierItemsResult =
  operations["list-earlier-items"]["responses"][200]["content"]["application/json"];

/** `POST /v1/threads/{thread}/messages` 成功时的响应体。 */
export type SendMessageResult =
  operations["send-message"]["responses"][202]["content"]["application/json"];

/** `POST /v1/threads/{thread}/messages` 的请求体。 */
export type SendMessageBody = NonNullable<
  operations["send-message"]["requestBody"]
>["content"]["application/json"];

/** `POST /v1/threads/{thread}/questions/{item}` 的请求体。 */
export type AnswerQuestionBody = NonNullable<
  operations["answer-question"]["requestBody"]
>["content"]["application/json"];

/** `POST /v1/threads/{thread}/revert` 成功时的响应体。 */
export type RevertThreadResult =
  operations["revert-thread"]["responses"][200]["content"]["application/json"];

/** `POST /v1/threads/{thread}/revert` 的请求体。 */
export type RevertThreadBody = NonNullable<
  operations["revert-thread"]["requestBody"]
>["content"]["application/json"];
