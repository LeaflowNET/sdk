import { request } from '../../http.js';
/**
* 请求体直接是文件字节，不使用 multipart 封装，一次上传一个文件。类型由内容判定，与 Content-Type 无关。返回的 id 在发送消息时放进 attachmentIds；从未被任何消息引用的附件会被定期清除。
* @summary 上传图片
*/
export const uploadAttachment = (uploadAttachmentBody, options) => {
    return request({ url: `/v1/attachments`, method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream', },
        data: uploadAttachmentBody
    }, options);
};
/**
 * 按附件 id 取回原始字节，可直接作为 <img> 的地址使用。响应带长期缓存头，附件内容不会变化。附件不存在或不属于当前用户时返回 404。
 * @summary 取回图片
 */
export const downloadAttachment = (attachment, options) => {
    return request({ url: `/v1/attachments/${attachment}`, method: 'GET'
    }, options);
};
/**
 * 接入面那张表按通道列出各自绑了谁时用 channelId 过滤。
 * @summary 列出绑定
 */
export const listBindings = (params, options) => {
    return request({ url: `/v1/bindings`, method: 'GET',
        params
    }, options);
};
/**
 * @summary 解除绑定
 */
export const deleteBinding = (binding, options) => {
    return request({ url: `/v1/bindings/${binding}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 查看绑定
 */
export const getBinding = (binding, options) => {
    return request({ url: `/v1/bindings/${binding}`, method: 'GET'
    }, options);
};
/**
 * @summary 列出通道
 */
export const listChannels = (params, options) => {
    return request({ url: `/v1/channels`, method: 'GET',
        params
    }, options);
};
/**
 * @summary 创建通道
 */
export const createChannel = (createChannelRequestBody, options) => {
    return request({ url: `/v1/channels`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createChannelRequestBody
    }, options);
};
/**
 * 删除后该通道不再接收入站消息，其上的绑定一并失效。项目处于停服或清理状态时本接口仍然可用。
 * @summary 删除通道
 */
export const deleteChannel = (channel, options) => {
    return request({ url: `/v1/channels/${channel}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 查看通道
 */
export const getChannel = (channel, options) => {
    return request({ url: `/v1/channels/${channel}`, method: 'GET'
    }, options);
};
/**
 * 只修改传了的字段。senderPolicy 与 allowFrom 是一对，由 senderPolicy 决定是否替换；改动对常驻连接要等连接重建后才生效，回调型平台立即生效。
 * @summary 修改通道
 */
export const updateChannel = (channel, updateChannelRequestBody, options) => {
    return request({ url: `/v1/channels/${channel}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: updateChannelRequestBody
    }, options);
};
/**
 * 生成一个一次性认领码交给待绑定的人，他在该平台上用自己的账号把这个码发给助手即完成绑定。绑定只能由本人以这种方式建立，不能直接指定平台账号。认领码有有效期，过期后需重新签发。
 * @summary 签发认领码
 */
export const createClaimCode = (channel, options) => {
    return request({ url: `/v1/channels/${channel}/claim-codes`, method: 'POST'
    }, options);
};
/**
 * 排查「发了消息但助手没有响应」时使用。按时间倒序返回最近被这条通道拒绝的入站消息及其拒绝原因，最常见的原因是发送方尚未绑定。
 * @summary 查看最近被拒绝的入站消息
 */
export const listChannelRejections = (channel, params, options) => {
    return request({ url: `/v1/channels/${channel}/rejections`, method: 'GET',
        params
    }, options);
};
/**
 * 换一把新的回调密钥，旧的立即失效，通道降回待平台确认状态。密钥归谁定由平台决定，见 list-platforms 的 secretSource：generated 的平台不要传请求体，新密钥仅在本次响应中返回、之后无法再次取回；supplied 的平台必须把平台后台那把新密钥传进来。
 * @summary 轮换回调密钥
 */
export const rotateChannelSecret = (channel, rotateSecretRequestBody, options) => {
    return request({ url: `/v1/channels/${channel}/secret`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: rotateSecretRequestBody
    }, options);
};
/**
 * 改完发件人策略之后用来自查，不发送任何消息、也不改变任何状态：它走的是和真实入站完全相同的那份判定，并说明结论由哪一条规则得出。无法推演认领码那一条——是否是认领码取决于对方发来的内容。
 * @summary 推演一个发件人会不会被放行
 */
export const checkSender = (channel, params, options) => {
    return request({ url: `/v1/channels/${channel}/sender-check`, method: 'GET',
        params
    }, options);
};
/**
 * 微信个人号通道需要本人扫码登录后才能收发消息。本接口返回二维码，之后轮询 `GET /v1/weixin-logins/{login}` 获取进度；状态提示需要验证码时，调用 `POST /v1/weixin-logins/{login}/verify-code` 补交。
 * @summary 发起微信扫码登录
 */
export const beginWeixinLogin = (channel, options) => {
    return request({ url: `/v1/channels/${channel}/weixin-logins`, method: 'POST'
    }, options);
};
/**
 * 返回本平台当前提供的模型及其上下文窗口、推理档位和支持的输入类型。用于填充对话设置里的模型选择。
 * @summary 列出可用模型
 */
export const listModels = (options) => {
    return request({ url: `/v1/models`, method: 'GET'
    }, options);
};
/**
 * 返回本平台当前支持接入的即时通讯平台，以及各自建通道时要走的流程和要填的凭据字段。新建通道表单完全由这份响应驱动：setupMethod 决定展示录入表单还是扫码流程，credentialFields 是要填的字段，secretSource 决定要不要有回调密钥那一栏。
 * @summary 列出可接入的平台
 */
export const listPlatforms = (options) => {
    return request({ url: `/v1/platforms`, method: 'GET'
    }, options);
};
/**
 * 按最近活动排序，只返回当前账号在当前项目里的对话。archived 是一个二选一的开关而不是「包含归档」：归档的对话不出现在默认列表里，要看它们就把这个参数打开。
 * @summary 列出对话
 */
export const listThreads = (params, options) => {
    return request({ url: `/v1/threads`, method: 'GET',
        params
    }, options);
};
/**
 * @summary 创建对话
 */
export const createThread = (createThreadRequestBody, options) => {
    return request({ url: `/v1/threads`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createThreadRequestBody
    }, options);
};
/**
 * 对话的完整当前状态，用于首屏渲染。文档中的 stream 给出实时输出地址和入场票据，流推送的是对这份文档的增量编辑，可直接套用同一套渲染逻辑。
 * @summary 取回对话文档
 */
export const getThread = (thread, options) => {
    return request({ url: `/v1/threads/${thread}`, method: 'GET'
    }, options);
};
/**
 * 可修改模型、推理档位、审批模式和归档状态。改动从下一次 turn 起生效，正在执行的 turn 沿用它启动时的设置。reasoningEffort 仅在同时提供 model 时生效。
 * @summary 修改对话设置
 */
export const updateThread = (thread, updateThreadRequestBody, options) => {
    return request({ url: `/v1/threads/${thread}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: updateThreadRequestBody
    }, options);
};
/**
 * 批次 id 来自对话文档的 wait 字段。本接口是幂等的：重复提交同一批次不会改变已经生效的决定，也不会报错。批次不属于该对话时返回 404。
 * @summary 批准或拒绝一批工具调用
 */
export const decideApproval = (thread, batch, decideRequestBody, options) => {
    return request({ url: `/v1/threads/${thread}/approvals/${batch}`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: decideRequestBody
    }, options);
};
/**
 * 首屏只给对话最新的那一段，再往上的内容用本接口按需取回，一次一段。before 用文档里的 earlier.before，响应里的 earlier 是再往上那一段的游标，为 null 表示已经到顶。返回的条目和文档里的 items 是同一种形状，顺序也一样（由旧到新），直接接在现有内容前面即可。
 * @summary 取回更早的对话内容
 */
export const listEarlierItems = (thread, params, options) => {
    return request({ url: `/v1/threads/${thread}/earlier`, method: 'GET',
        params
    }, options);
};
/**
 * 对没有正在执行的 turn 的对话调用同样返回 204，不视为错误——用户点击停止与 turn 自然结束之间存在竞争，两种结果一致。项目处于停服或清理状态时本接口仍然可用。
 * @summary 中断正在执行的 turn
 */
export const interruptThread = (thread, options) => {
    return request({ url: `/v1/threads/${thread}/interrupt`, method: 'POST'
    }, options);
};
/**
 * 立即返回 turnId，不等待执行完成——一次 turn 可能持续数十分钟。执行进度通过对话文档中 stream 指向的实时流获取，不在本响应里。
 * @summary 发送消息并触发一次 turn
 */
export const sendMessage = (thread, sendMessageRequestBody, options) => {
    return request({ url: `/v1/threads/${thread}/messages`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: sendMessageRequestBody
    }, options);
};
/**
 * 问题 id 来自对话文档的 wait 字段。已被回答过的问题同样返回 204——可能是另一个页面提交在先，也可能是自动应答窗口已到期，两种情况下 turn 都已带着答案继续执行。
 * @summary 回答助手提出的问题
 */
export const answerQuestion = (thread, item, answerRequestBody, options) => {
    return request({ url: `/v1/threads/${thread}/questions/${item}`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: answerRequestBody
    }, options);
};
/**
 * @summary 标记对话已读
 */
export const markThreadRead = (thread, options) => {
    return request({ url: `/v1/threads/${thread}/read`, method: 'POST'
    }, options);
};
/**
 * 撤回 ordinal 及其之后的全部条目。被撤回的条目仍留在逐字稿中并标记 reverted，序号不会重排。返回实际撤回的条目数。
 * @summary 从指定位置起撤回
 */
export const revertThread = (thread, revertRequestBody, options) => {
    return request({ url: `/v1/threads/${thread}/revert`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: revertRequestBody
    }, options);
};
/**
 * 轮询本接口直到状态变为成功或失败。状态提示需要验证码时，调用补交验证码接口。
 * @summary 查询扫码登录状态
 */
export const getWeixinLogin = (login, options) => {
    return request({ url: `/v1/weixin-logins/${login}`, method: 'GET'
    }, options);
};
/**
 * 微信在扫码后要求短信或设备验证码时使用。验证码由登录发起人在自己手机上获取。
 * @summary 补交登录验证码
 */
export const submitWeixinVerifyCode = (login, verifyCodeRequestBody, options) => {
    return request({ url: `/v1/weixin-logins/${login}/verify-code`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: verifyCodeRequestBody
    }, options);
};
