import { request } from '../../http.js';
/**
* 注册页显示它，用户同意之后把每一项的 `type` 和 `version` 原样回传给 `POST /api/v1/register`。

不需要令牌。还没有任何文件生效时返回空数组，那时注册不需要提交 `consents`。
* @summary 列出注册必须同意的文件
*/
export const listAgreements = () => {
    return request({ url: `/api/v1/agreements`, method: 'GET'
    });
};
/**
 * `pending_agreements` 是还没同意的文件，非空就要先引导用户同意，再调 `POST /api/v1/me/consents`。
 * @summary 查看当前账号
 */
export const getAccount = () => {
    return request({ url: `/api/v1/me`, method: 'GET'
    });
};
/**
 * 全部记录，最新的在前，包括已经不是当前版本的那些。
 * @summary 列出我同意过的文件
 */
export const listConsents = () => {
    return request({ url: `/api/v1/me/consents`, method: 'GET'
    });
};
/**
 * 条款改版之后用它重新同意，`GET /api/v1/me` 的 `pending_agreements` 非空时就该调。

只收当前生效的版本，签旧版答 409。重复提交同一版不报错，第一次那条记录会留着。
 * @summary 同意条款
 */
export const acceptAgreements = (acceptConsentsInputBody) => {
    return request({ url: `/api/v1/me/consents`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: acceptConsentsInputBody
    });
};
/**
 * 没交过材料时答 UNVERIFIED，不是 404。姓名和证件号不会出现在任何响应里。
 * @summary 查看实名核验状态
 */
export const getIdentityVerification = () => {
    return request({ url: `/api/v1/me/identity-verification`, method: 'GET'
    });
};
/**
 * 已经在等人审的和已经核过的都会被拒。被驳回之后可以改了再交。
 * @summary 提交实名核验材料
 */
export const submitIdentityVerification = (submitIdentityVerificationInputBody) => {
    return request({ url: `/api/v1/me/identity-verification`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: submitIdentityVerificationInputBody
    });
};
/**
 * 按当前账号的邮箱查，因为要约是寄给一个地址的——被邀请的人当时可能还没注册。
 * @summary 列出寄给我的要约
 */
export const listMyInvitations = (params) => {
    return request({ url: `/api/v1/me/invitations`, method: 'GET',
        params
    });
};
/**
 * token 对不上和这份要约已经不作数了是同一个回答：持有者对这两种情况能做的事完全一样，分开报会把这个接口变成一个可以拿来试 token 的探针。
 * @summary 顺着邀请链接接受
 */
export const acceptInvitationByToken = (acceptInvitationByTokenInputBody) => {
    return request({ url: `/api/v1/me/invitations/accept`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: acceptInvitationByTokenInputBody
    });
};
/**
 * 不需要 token：token 证明的是「你就是这份要约寄给的那个人」，而当前账号的邮箱对得上这份要约，证明的是同一件事。
 * @summary 接受一份列在我名下的要约
 */
export const acceptInvitation = (invitationId) => {
    return request({ url: `/api/v1/me/invitations/${invitationId}/accept`, method: 'POST'
    });
};
/**
 * @summary 列出我的公钥
 */
export const listMySshKeys = (params) => {
    return request({ url: `/api/v1/me/ssh-keys`, method: 'GET',
        params
    });
};
/**
 * @summary 添加一把我的公钥
 */
export const createMySshKey = (createUserSSHKeyInputBody) => {
    return request({ url: `/api/v1/me/ssh-keys`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createUserSSHKeyInputBody
    });
};
/**
 * 行留着，状态变成 REVOKED。事故之后要问的是当时信任的是哪把钥匙。
 * @summary 吊销我的一把公钥
 */
export const revokeMySshKey = (keyId) => {
    return request({ url: `/api/v1/me/ssh-keys/${keyId}`, method: 'DELETE'
    });
};
/**
 * @summary 查看我的一把公钥
 */
export const getMySshKey = (keyId) => {
    return request({ url: `/api/v1/me/ssh-keys/${keyId}`, method: 'GET'
    });
};
/**
 * 只有名字能改：公钥、类型、指纹是同一样东西的三种说法，改其中一个会让这一行描述一把并不存在的钥匙。
 * @summary 给我的公钥改名
 */
export const renameMySshKey = (keyId, renameUserSSHKeyInputBody) => {
    return request({ url: `/api/v1/me/ssh-keys/${keyId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renameUserSSHKeyInputBody
    });
};
/**
 * **只有 IAM 这一份。** 别的服务的操作不在这里——权限目录是各服务各自声明、由 各个服务自己声明的，IAM 认识它们就等于要跟着每个下游一起发版。
 * @summary 列出 IAM 自己声明的权限
 */
export const listPermissions = () => {
    return request({ url: `/api/v1/permissions`, method: 'GET'
    });
};
/**
 * 默认不含已删除的项目——那些是已经不存在了的东西，要看必须明确用 status=DELETED 点名。
 * @summary 列出我参与的项目
 */
export const listProjects = (params) => {
    return request({ url: `/api/v1/projects`, method: 'GET',
        params
    });
};
/**
 * 建的人就是所有者。项目会连带预置 OWNER、ADMIN 两个内置角色和一个空权限的 member 角色。
 * @summary 建一个项目
 */
export const createProject = (createProjectInputBody) => {
    return request({ url: `/api/v1/projects`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createProjectInputBody
    });
};
/**
 * 只有所有者能做，而且没有回头路：项目进入 DELETING，各服务开始清掉它下面的资源。项目行本身永远留着——查一个删掉的项目查得到，答案是它没了，而不是一个 404。
 * @summary 删除项目
 */
export const deleteProject = (projectId) => {
    return request({ url: `/api/v1/projects/${projectId}`, method: 'DELETE'
    });
};
/**
 * 在项目里就看得到，不需要额外的读权限。
 * @summary 查看一个项目
 */
export const getProject = (projectId) => {
    return request({ url: `/api/v1/projects/${projectId}`, method: 'GET'
    });
};
/**
 * @summary 改项目的名称与描述
 */
export const updateProject = (projectId, updateProjectInputBody) => {
    return request({ url: `/api/v1/projects/${projectId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: updateProjectInputBody
    });
};
/**
 * 在项目里就看得到，和成员列表同一条规则：谁被请了也是「这个项目有谁」的一部分。
 * @summary 列出这个项目还在等的要约
 */
export const listProjectInvitations = (projectId, params) => {
    return request({ url: `/api/v1/projects/${projectId}/invitations`, method: 'GET',
        params
    });
};
/**
 * 要约站 14 天。有上限是因为里面那些角色是按发出那一刻的项目校验的，一份活得比它所依据的安排还久的要约会授出现在没人打算授的权限。
 * @summary 发出一份邀请
 */
export const issueInvitation = (projectId, issueInvitationInputBody) => {
    return request({ url: `/api/v1/projects/${projectId}/invitations`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: issueInvitationInputBody
    });
};
/**
 * @summary 撤回一份还没被兑现的要约
 */
export const revokeInvitation = (projectId, invitationId) => {
    return request({ url: `/api/v1/projects/${projectId}/invitations/${invitationId}`, method: 'DELETE'
    });
};
/**
 * @summary 列出项目成员
 */
export const listMembers = (projectId, params) => {
    return request({ url: `/api/v1/projects/${projectId}/members`, method: 'GET',
        params
    });
};
/**
 * 移除别人要 iam:members.manage；退出只要求自己在这个项目里——任何人都可能被拉进一个项目，那么任何人就得能出去。所有者两条路都不行，先转移所有权。
 * @summary 移除成员，或者自己退出
 */
export const removeMember = (projectId, userId) => {
    return request({ url: `/api/v1/projects/${projectId}/members/${userId}`, method: 'DELETE'
    });
};
/**
 * 整体替换而不是增删：调用方拿到的就是一份完整清单，让它自己算差集只会让「我以为我取消了那个角色」这种事变得可能。所有者身上的 OWNER 不受影响。
 * @summary 设置一个成员持有的角色
 */
export const setMemberRoles = (projectId, userId, setMemberRolesInputBody) => {
    return request({ url: `/api/v1/projects/${projectId}/members/${userId}/roles`, method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        data: setMemberRolesInputBody
    });
};
/**
 * 只给事实，不给结论：这里没有 allowed，因为 IAM 不知道你要做的是哪个操作——哪个操作需要哪条权限那份目录属于各个服务，判断在它们那边。
 * @summary 查看我在这个项目里的身份
 */
export const getProjectMembership = (projectId) => {
    return request({ url: `/api/v1/projects/${projectId}/membership`, method: 'GET'
    });
};
/**
 * @summary 列出项目里的角色
 */
export const listRoles = (projectId) => {
    return request({ url: `/api/v1/projects/${projectId}/roles`, method: 'GET'
    });
};
/**
 * @summary 建一个角色
 */
export const createRole = (projectId, createRoleInputBody) => {
    return request({ url: `/api/v1/projects/${projectId}/roles`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createRoleInputBody
    });
};
/**
 * 还有人持有时会被拒。级联摘掉那些绑定等于把每个持有者悄悄降级——请求里没有一个字说了这件事，事后也查不到。
 * @summary 删一个角色
 */
export const deleteRole = (projectId, code) => {
    return request({ url: `/api/v1/projects/${projectId}/roles/${code}`, method: 'DELETE'
    });
};
/**
 * @summary 查看一个角色
 */
export const getRole = (projectId, code) => {
    return request({ url: `/api/v1/projects/${projectId}/roles/${code}`, method: 'GET'
    });
};
/**
 * 名称、描述和权限整体替换。改完会在同一个事务里重新编译持有它的每一个成员——角色的权限变了，就是那些人的权限变了，而下一次请求是拿编译结果判定的。
 * @summary 改一个角色
 */
export const updateRole = (projectId, code, updateRoleInputBody) => {
    return request({ url: `/api/v1/projects/${projectId}/roles/${code}`, method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        data: updateRoleInputBody
    });
};
/**
 * @summary 列出项目的公钥
 */
export const listProjectSshKeys = (projectId, params) => {
    return request({ url: `/api/v1/projects/${projectId}/ssh-keys`, method: 'GET',
        params
    });
};
/**
 * @summary 给项目添加一把公钥
 */
export const createProjectSshKey = (projectId, createProjectSSHKeyInputBody) => {
    return request({ url: `/api/v1/projects/${projectId}/ssh-keys`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createProjectSSHKeyInputBody
    });
};
/**
 * @summary 吊销项目的一把公钥
 */
export const revokeProjectSshKey = (projectId, keyId) => {
    return request({ url: `/api/v1/projects/${projectId}/ssh-keys/${keyId}`, method: 'DELETE'
    });
};
/**
 * @summary 查看项目的一把公钥
 */
export const getProjectSshKey = (projectId, keyId) => {
    return request({ url: `/api/v1/projects/${projectId}/ssh-keys/${keyId}`, method: 'GET'
    });
};
/**
 * @summary 给项目的公钥改名
 */
export const renameProjectSshKey = (projectId, keyId, renameProjectSSHKeyInputBody) => {
    return request({ url: `/api/v1/projects/${projectId}/ssh-keys/${keyId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renameProjectSSHKeyInputBody
    });
};
/**
 * 选定一个项目后，用账号令牌换取该项目的令牌。

**只接受 auth.leaflow.net 签发的账号令牌，不接受项目令牌。** 项目令牌过期后，先在 auth.leaflow.net 续期账号令牌，再重新调用这个接口。

换取时会确认账号可用、项目存在，且**调用者是该项目的成员**。非成员无法换取。

令牌只表明身份（用户与项目），**不包含权限**：权限在每次请求时实时判定，所以角色调整立即生效，不必等待令牌过期。

项目处于停用、封禁或删除中时**仍可换取令牌**：这些状态限制的是写入，不影响查看项目当前状况。
 * @summary 换一张项目令牌
 */
export const exchangeProjectToken = (projectId) => {
    return request({ url: `/api/v1/projects/${projectId}/token`, method: 'POST'
    });
};
/**
 * OWNER 唯一的移动方式，只有所有者本人能发起——能像普通角色那样授予的话，任何管理员都可以顺手把自己变成所有者。
 * @summary 转移项目所有权
 */
export const transferProjectOwnership = (projectId, transferOwnershipInputBody) => {
    return request({ url: `/api/v1/projects/${projectId}/transfer-ownership`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: transferOwnershipInputBody
    });
};
/**
 * 在 auth.leaflow.net 登录之后调它，带上账号令牌。姓名和邮箱取自登录信息，不从请求体收。

`consents` 要覆盖 `GET /api/v1/agreements` 返回的每一份，版本号也要一致；漏一份答 400，版本对不上答 409（多半是页面开着的时候条款改版了，重新拉一次清单即可）。已经注册过的答 409。
 * @summary 注册账号
 */
export const register = (registerInputBody) => {
    return request({ url: `/api/v1/register`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: registerInputBody
    });
};
