import { request } from '../../http';
/**
* 请求体直接是文件字节，不使用 multipart 封装，一次上传一个文件。类型由内容判定，与 Content-Type 无关。返回的 id 在发送消息时放进 attachmentIds；从未被任何消息引用的附件会被定期清除。
* @summary 上传图片
*/
export const uploadAttachment = (uploadAttachmentBody) => {
    return request({ url: `/v1/attachments`, method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream', },
        data: uploadAttachmentBody
    });
};
/**
 * 按附件 id 取回原始字节，可直接作为 <img> 的地址使用。响应带长期缓存头，附件内容不会变化。附件不存在或不属于当前用户时返回 404。
 * @summary 取回图片
 */
export const downloadAttachment = (attachment) => {
    return request({ url: `/v1/attachments/${attachment}`, method: 'GET'
    });
};
/**
 * @summary 列出绑定
 */
export const listBindings = (params) => {
    return request({ url: `/v1/bindings`, method: 'GET',
        params
    });
};
/**
 * @summary 解除绑定
 */
export const deleteBinding = (binding) => {
    return request({ url: `/v1/bindings/${binding}`, method: 'DELETE'
    });
};
/**
 * @summary 列出通道
 */
export const listChannels = (params) => {
    return request({ url: `/v1/channels`, method: 'GET',
        params
    });
};
/**
 * @summary 创建通道
 */
export const createChannel = (createChannelInputBody) => {
    return request({ url: `/v1/channels`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createChannelInputBody
    });
};
/**
 * 删除后该通道不再接收入站消息，其上的绑定一并失效。项目处于停服或清理状态时本接口仍然可用。
 * @summary 删除通道
 */
export const deleteChannel = (channel) => {
    return request({ url: `/v1/channels/${channel}`, method: 'DELETE'
    });
};
/**
 * @summary 查看通道
 */
export const getChannel = (channel) => {
    return request({ url: `/v1/channels/${channel}`, method: 'GET'
    });
};
/**
 * @summary 修改通道
 */
export const updateChannel = (channel, updateChannelInputBody) => {
    return request({ url: `/v1/channels/${channel}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: updateChannelInputBody
    });
};
/**
 * 生成一个一次性认领码交给待绑定的人，他在该平台上用自己的账号把这个码发给助手即完成绑定。绑定只能由本人以这种方式建立，不能直接指定平台账号。认领码有有效期，过期后需重新签发。
 * @summary 签发认领码
 */
export const createClaimCode = (channel) => {
    return request({ url: `/v1/channels/${channel}/claim-codes`, method: 'POST'
    });
};
/**
 * 排查「发了消息但助手没有响应」时使用。按时间倒序返回最近被这条通道拒绝的入站消息及其拒绝原因，最常见的原因是发送方尚未绑定。
 * @summary 查看最近被拒绝的入站消息
 */
export const listChannelRejections = (channel, params) => {
    return request({ url: `/v1/channels/${channel}/rejections`, method: 'GET',
        params
    });
};
/**
 * 生成新的回调密钥并立即使旧密钥失效。新密钥仅在本次响应中返回，之后无法再次取回，请先在平台侧完成配置。
 * @summary 轮换回调密钥
 */
export const rotateChannelSecret = (channel) => {
    return request({ url: `/v1/channels/${channel}/secret`, method: 'POST'
    });
};
/**
 * 微信个人号通道需要本人扫码登录后才能收发消息。本接口返回二维码，之后轮询 `GET /v1/weixin-logins/{login}` 获取进度；状态提示需要验证码时，调用 `POST /v1/weixin-logins/{login}/verify-code` 补交。
 * @summary 发起微信扫码登录
 */
export const beginWeixinLogin = (channel) => {
    return request({ url: `/v1/channels/${channel}/weixin-logins`, method: 'POST'
    });
};
/**
 * 返回本平台当前提供的模型及其上下文窗口、推理档位和支持的输入类型。用于填充对话设置里的模型选择。清单与项目无关，但仍需要有效的项目令牌。
 * @summary 列出可用模型
 */
export const listModels = () => {
    return request({ url: `/v1/models`, method: 'GET'
    });
};
/**
 * 返回本平台当前支持接入的即时通讯平台，以及各自建通道时需要提供的凭据字段。用于填充新建通道表单。
 * @summary 列出可接入的平台
 */
export const listPlatforms = () => {
    return request({ url: `/v1/platforms`, method: 'GET'
    });
};
/**
 * @summary 列出对话
 */
export const listThreads = (params) => {
    return request({ url: `/v1/threads`, method: 'GET',
        params
    });
};
/**
 * @summary 创建对话
 */
export const createThread = (createThreadInputBody) => {
    return request({ url: `/v1/threads`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createThreadInputBody
    });
};
/**
 * 对话的完整当前状态，用于首屏渲染。文档中的 stream 给出实时输出地址和入场票据，流推送的是对这份文档的增量编辑，可直接套用同一套渲染逻辑。
 * @summary 取回对话文档
 */
export const getThread = (thread) => {
    return request({ url: `/v1/threads/${thread}`, method: 'GET'
    });
};
/**
 * 可修改模型、推理档位、审批模式和归档状态。改动从下一次 turn 起生效，正在执行的 turn 沿用它启动时的设置。reasoningEffort 仅在同时提供 model 时生效。
 * @summary 修改对话设置
 */
export const updateThread = (thread, updateThreadInputBody) => {
    return request({ url: `/v1/threads/${thread}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: updateThreadInputBody
    });
};
/**
 * 批次 id 来自对话文档的 wait 字段。本接口是幂等的：重复提交同一批次不会改变已经生效的决定，也不会报错。批次不属于该对话时返回 404。
 * @summary 批准或拒绝一批工具调用
 */
export const decideApproval = (thread, batch, decideInputBody) => {
    return request({ url: `/v1/threads/${thread}/approvals/${batch}`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: decideInputBody
    });
};
/**
 * 对没有正在执行的 turn 的对话调用同样返回 204，不视为错误——用户点击停止与 turn 自然结束之间存在竞争，两种结果一致。项目处于停服或清理状态时本接口仍然可用。
 * @summary 中断正在执行的 turn
 */
export const interruptThread = (thread) => {
    return request({ url: `/v1/threads/${thread}/interrupt`, method: 'POST'
    });
};
/**
 * 立即返回 turnId，不等待执行完成——一次 turn 可能持续数十分钟。执行进度通过对话文档中 stream 指向的实时流获取，不在本响应里。
 * @summary 发送消息并触发一次 turn
 */
export const sendMessage = (thread, sendMessageInputBody) => {
    return request({ url: `/v1/threads/${thread}/messages`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: sendMessageInputBody
    });
};
/**
 * 问题 id 来自对话文档的 wait 字段。已被回答过的问题同样返回 204——可能是另一个页面提交在先，也可能是自动应答窗口已到期，两种情况下 turn 都已带着答案继续执行。
 * @summary 回答助手提出的问题
 */
export const answerQuestion = (thread, item, answerInputBody) => {
    return request({ url: `/v1/threads/${thread}/questions/${item}`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: answerInputBody
    });
};
/**
 * @summary 标记对话已读
 */
export const markThreadRead = (thread) => {
    return request({ url: `/v1/threads/${thread}/read`, method: 'POST'
    });
};
/**
 * 撤回 ordinal 及其之后的全部条目。被撤回的条目仍留在逐字稿中并标记 reverted，序号不会重排。返回实际撤回的条目数。
 * @summary 从指定位置起撤回
 */
export const revertThread = (thread, revertInputBody) => {
    return request({ url: `/v1/threads/${thread}/revert`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: revertInputBody
    });
};
/**
 * 轮询本接口直到状态变为成功或失败。状态提示需要验证码时，调用补交验证码接口。
 * @summary 查询扫码登录状态
 */
export const getWeixinLogin = (login) => {
    return request({ url: `/v1/weixin-logins/${login}`, method: 'GET'
    });
};
/**
 * 微信在扫码后要求短信或设备验证码时使用。验证码由登录发起人在自己手机上获取。
 * @summary 补交登录验证码
 */
export const submitWeixinVerifyCode = (login, verifyCodeInputBody) => {
    return request({ url: `/v1/weixin-logins/${login}/verify-code`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: verifyCodeInputBody
    });
};
