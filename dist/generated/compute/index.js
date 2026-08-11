import { request } from '../../http.js';
/**
* @summary 列出在售硬盘类型
*/
export const listDiskTypes = (params) => {
    return request({ url: `/api/v1/disk-types`, method: 'GET',
        params
    });
};
/**
 * 同时提供 region_code 与 availability_zone 时，只返回可挂载到该位置云服务器的云硬盘。
 * @summary 列出云硬盘
 */
export const listDisks = (params) => {
    return request({ url: `/api/v1/disks`, method: 'GET',
        params
    });
};
/**
 * 云硬盘创建在所选硬盘类型所属的可用区，云服务器必须位于同一可用区才能挂载。因此选定硬盘类型即确定了可用区。
 * @summary 创建云硬盘
 */
export const createDisk = (createDiskInputBody) => {
    return request({ url: `/api/v1/disks`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createDiskInputBody
    });
};
/**
 * 云硬盘仍处于挂载状态，或仍存在快照时，删除会被拒绝。
 * @summary 删除云硬盘
 */
export const deleteDisk = (diskId) => {
    return request({ url: `/api/v1/disks/${diskId}`, method: 'DELETE'
    });
};
/**
 * 会同步一次底层的当前状态，因此比列表接口慢但更准确。
 * @summary 查看云硬盘
 */
export const getDisk = (diskId) => {
    return request({ url: `/api/v1/disks/${diskId}`, method: 'GET'
    });
};
/**
 * 仅可修改名称。容量请使用扩容接口，类型与可用区不可修改。
 * @summary 重命名云硬盘
 */
export const renameDisk = (diskId, renameDiskInputBody) => {
    return request({ url: `/api/v1/disks/${diskId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renameDiskInputBody
    });
};
/**
 * 容量只能增加，不支持缩容。扩容完成后需在云服务器内自行扩展文件系统。
 * @summary 扩容
 */
export const resizeDisk = (diskId, resizeDiskInputBody) => {
    return request({ url: `/api/v1/disks/${diskId}/resize`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: resizeDiskInputBody
    });
};
/**
 * @summary 列出公网 IP
 */
export const listFloatingIps = () => {
    return request({ url: `/api/v1/floating-ips`, method: 'GET'
    });
};
/**
 * 若该私有网络尚未连通外网，会一并为其接入外网。

IPv6 不通过本接口申请：IPv6 地址由 SLAAC 下发到网卡，启用 IPv6 是私有网络上的一个开关。
 * @summary 申领公网 IP
 */
export const allocateFloatingIp = (allocateFloatingIPInputBody) => {
    return request({ url: `/api/v1/floating-ips`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: allocateFloatingIPInputBody
    });
};
/**
 * 地址释放后进入冷却期才会重新分配，以免仍指向它的 DNS 记录和访问白名单立即失效。因此释放后的短时间内**无法重新申领同一个地址**，请谨慎操作。
 * @summary 释放公网 IP
 */
export const releaseFloatingIp = (floatingIpId) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}`, method: 'DELETE'
    });
};
/**
 * @summary 查看公网 IP
 */
export const getFloatingIp = (floatingIpId) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}`, method: 'GET'
    });
};
/**
 * 出入两个方向同时限速。仅限制出方向无法防止入方向流量打满上联带宽。
 * @summary 设带宽上限
 */
export const setFloatingIpBandwidth = (floatingIpId, setBandwidthInputBody) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}/bandwidth`, method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        data: setBandwidthInputBody
    });
};
/**
 * 地址仍归本项目持有，只是不再指向任何网卡。
 * @summary 解绑公网 IP
 */
export const unbindFloatingIp = (floatingIpId) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}/binding`, method: 'DELETE'
    });
};
/**
 * @summary 将公网 IP 绑定到网卡
 */
export const bindFloatingIp = (floatingIpId, bindFloatingIPInputBody) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}/binding`, method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        data: bindFloatingIPInputBody
    });
};
/**
 * min_ram_mb 超过所选机型内存的镜像无法启动，请据此过滤可选项。
 * @summary 列出在售镜像
 */
export const listImages = (params) => {
    return request({ url: `/api/v1/images`, method: 'GET',
        params
    });
};
/**
 * @summary 列出在售机型
 */
export const listInstanceTypes = (params) => {
    return request({ url: `/api/v1/instance-types`, method: 'GET',
        params
    });
};
/**
 * @summary 列出云服务器
 */
export const listInstances = () => {
    return request({ url: `/api/v1/instances`, method: 'GET'
    });
};
/**
 * **必须提供一种登录方式**：项目上已有 SSH 公钥，或在请求中设置密码。两者都没有时请求会被拒绝，否则创建出的云服务器将无法登录。

云服务器创建在机型所属的可用区。后续要挂载的云硬盘必须位于同一可用区。

接口返回时创建尚未完成（status 为 provisioning），请轮询 GET 确认结果。
 * @summary 创建云服务器
 */
export const launchInstance = (launchInstanceInputBody) => {
    return request({ url: `/api/v1/instances`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: launchInstanceInputBody
    });
};
/**
 * 系统盘随云服务器一并删除。数据盘会被卸载并保留。主网卡随云服务器一并释放。
 * @summary 释放云服务器
 */
export const deleteInstance = (instanceId) => {
    return request({ url: `/api/v1/instances/${instanceId}`, method: 'DELETE'
    });
};
/**
 * 会同步一次底层的当前状态，因此比列表接口慢但更准确。轮询创建进度请使用本接口。
 * @summary 查看云服务器
 */
export const getInstance = (instanceId) => {
    return request({ url: `/api/v1/instances/${instanceId}`, method: 'GET'
    });
};
/**
 * 仅修改显示名称。云服务器内的主机名不变，它等于云服务器 id。
 * @summary 重命名云服务器
 */
export const renameInstance = (instanceId, renameInstanceInputBody) => {
    return request({ url: `/api/v1/instances/${instanceId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renameInstanceInputBody
    });
};
/**
 * 重启为软重启，由操作系统正常关闭后重新启动。已被平台停服的云服务器需先解除停服。
 * @summary 开机、关机、重启
 */
export const actOnInstance = (instanceId, actOnInstanceInputBody) => {
    return request({ url: `/api/v1/instances/${instanceId}/actions`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: actOnInstanceInputBody
    });
};
/**
 * 返回的地址一次性使用，数分钟后失效。**请勿缓存**，每次使用前重新获取。
 * @summary 打开 VNC 控制台
 */
export const openInstanceConsole = (instanceId) => {
    return request({ url: `/api/v1/instances/${instanceId}/console`, method: 'POST'
    });
};
/**
 * @summary 列出云服务器已挂载的云硬盘
 */
export const listInstanceDisks = (instanceId) => {
    return request({ url: `/api/v1/instances/${instanceId}/disks`, method: 'GET'
    });
};
/**
 * 云硬盘必须与云服务器位于同一地区和可用区。挂载后需在云服务器内自行分区并挂载文件系统。
 * @summary 挂载云硬盘
 */
export const attachDisk = (instanceId, attachDiskInputBody) => {
    return request({ url: `/api/v1/instances/${instanceId}/disks`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: attachDiskInputBody
    });
};
/**
 * 请先在云服务器内卸载（umount）该设备再调用本接口，正在写入的文件系统被强制卸载会损坏数据。
 * @summary 卸载云硬盘
 */
export const detachDisk = (instanceId, diskId) => {
    return request({ url: `/api/v1/instances/${instanceId}/disks/${diskId}`, method: 'DELETE'
    });
};
/**
 * 公网 IP 绑定在云服务器的主网卡上。
 * @summary 为云服务器绑定公网 IP
 */
export const attachInstanceFloatingIp = (instanceId, attachFloatingIPInputBody) => {
    return request({ url: `/api/v1/instances/${instanceId}/floating-ips`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: attachFloatingIPInputBody
    });
};
/**
 * @summary 解绑云服务器的公网 IP
 */
export const detachInstanceFloatingIp = (instanceId, floatingIpId) => {
    return request({ url: `/api/v1/instances/${instanceId}/floating-ips/${floatingIpId}`, method: 'DELETE'
    });
};
/**
 * 创建出的镜像不会自动上架，仅归本项目所有。
 * @summary 将云服务器创建为镜像
 */
export const createInstanceImage = (instanceId, createInstanceImageInputBody) => {
    return request({ url: `/api/v1/instances/${instanceId}/image`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createInstanceImageInputBody
    });
};
/**
 * @summary 列出云服务器的网卡
 */
export const listInstancePorts = (instanceId) => {
    return request({ url: `/api/v1/instances/${instanceId}/ports`, method: 'GET'
    });
};
/**
 * @summary 挂载网卡
 */
export const attachPort = (instanceId, attachPortInputBody) => {
    return request({ url: `/api/v1/instances/${instanceId}/ports`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: attachPortInputBody
    });
};
/**
 * 主网卡不可卸载，卸载后云服务器将失去网络地址。
 * @summary 卸载网卡
 */
export const detachPort = (instanceId, portId) => {
    return request({ url: `/api/v1/instances/${instanceId}/ports/${portId}`, method: 'DELETE'
    });
};
/**
 * **系统盘数据将被清除且无法恢复。** 数据盘不受影响。
 * @summary 重装系统
 */
export const rebuildInstance = (instanceId, rebuildInstanceInputBody) => {
    return request({ url: `/api/v1/instances/${instanceId}/rebuild`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: rebuildInstanceInputBody
    });
};
/**
 * 只能变更为同一地区、同一可用区的机型，否则已挂载的云硬盘无法随之迁移。

变配后需调用确认接口才算完成；未确认时原规格占用的资源不会释放。
 * @summary 变配
 */
export const resizeInstance = (instanceId, resizeInstanceInputBody) => {
    return request({ url: `/api/v1/instances/${instanceId}/resize`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: resizeInstanceInputBody
    });
};
/**
 * @summary 确认变配
 */
export const confirmInstanceResize = (instanceId) => {
    return request({ url: `/api/v1/instances/${instanceId}/resize/confirm`, method: 'POST'
    });
};
/**
 * @summary 回滚变配
 */
export const revertInstanceResize = (instanceId) => {
    return request({ url: `/api/v1/instances/${instanceId}/resize/revert`, method: 'POST'
    });
};
/**
 * @summary 列出网卡
 */
export const listPorts = () => {
    return request({ url: `/api/v1/ports`, method: 'GET'
    });
};
/**
 * 创建出的网卡尚未挂载到任何云服务器。主网卡不由本接口创建，它随云服务器一并创建。
 * @summary 创建网卡
 */
export const createPort = (createPortInputBody) => {
    return request({ url: `/api/v1/ports`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createPortInputBody
    });
};
/**
 * 主网卡不可单独删除，它随云服务器一并释放。仍挂载在云服务器上的网卡也无法删除。
 * @summary 删除网卡
 */
export const deletePort = (portId) => {
    return request({ url: `/api/v1/ports/${portId}`, method: 'DELETE'
    });
};
/**
 * @summary 列出私有网络
 */
export const listPrivateNetworks = (params) => {
    return request({ url: `/api/v1/private-networks`, method: 'GET',
        params
    });
};
/**
 * 同时创建一张网络、一台路由器和一个默认安全组。默认安全组拒绝全部入站流量、放行全部出站流量。
 * @summary 创建私有网络
 */
export const createPrivateNetwork = (createPrivateNetworkInputBody) => {
    return request({ url: `/api/v1/private-networks`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createPrivateNetworkInputBody
    });
};
/**
 * 其中仍有云服务器或网卡时，释放会被拒绝。IPv6、路由器与安全组随之一并释放。
 * @summary 释放私有网络
 */
export const deletePrivateNetwork = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}`, method: 'DELETE'
    });
};
/**
 * @summary 查看私有网络
 */
export const getPrivateNetwork = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}`, method: 'GET'
    });
};
/**
 * 项目中仍有已绑定的公网 IP 时会被拒绝：断开外网接入会使这些地址立即不可达。
 * @summary 断开私有网络的外网接入
 */
export const detachInternetGateway = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/internet-gateway`, method: 'DELETE'
    });
};
/**
 * 申领公网 IP 时会自动完成此步骤，通常无需单独调用。启用 IPv6 前必须先接入外网。
 * @summary 为私有网络接入外网
 */
export const attachInternetGateway = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/internet-gateway`, method: 'POST'
    });
};
/**
 * 释放的前缀不会立即重新分配。
 * @summary 关闭私有网络的 IPv6
 */
export const disablePrivateNetworkIpv6 = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/ipv6`, method: 'DELETE'
    });
};
/**
 * @summary 查看私有网络的 IPv6
 */
export const getPrivateNetworkIpv6 = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/ipv6`, method: 'GET'
    });
};
/**
 * 为该私有网络分配一个 /64 前缀。IPv6 地址由 SLAAC 下发到网卡，无需也无法单独申领。

前提是该私有网络已接入外网。
 * @summary 为私有网络启用 IPv6
 */
export const enablePrivateNetworkIpv6 = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/ipv6`, method: 'POST'
    });
};
/**
 * @summary 列出静态路由
 */
export const listRoutes = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/routes`, method: 'GET'
    });
};
/**
 * 以下三种会导致网络中断的写法会被拒绝：目的网段为 0.0.0.0/0（覆盖默认路由，所有公网 IP 立即失效）、目的网段为某个子网自身（覆盖直连路由）、下一跳为某个子网的网关（指回路由器自身）。
 * @summary 创建静态路由
 */
export const createRoute = (privateNetworkId, createRouteInputBody) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/routes`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createRouteInputBody
    });
};
/**
 * @summary 删除静态路由
 */
export const deleteRoute = (privateNetworkId, routeId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/routes/${routeId}`, method: 'DELETE'
    });
};
/**
 * IPv6 子网也在返回结果中，ip_version 为 6。它在启用 IPv6 时自动创建，不可单独删除。
 * @summary 列出子网
 */
export const listSubnets = (privateNetworkId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/subnets`, method: 'GET'
    });
};
/**
 * @summary 创建子网
 */
export const createSubnet = (privateNetworkId, createSubnetInputBody) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/subnets`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createSubnetInputBody
    });
};
/**
 * 返回的只是建议值，创建子网时仍会重新校验。用于避免手工计算下一个空闲网段时出错。
 * @summary 推荐下一个空闲网段
 */
export const suggestSubnetCidr = (privateNetworkId, params) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/subnets/next-free-cidr`, method: 'GET',
        params
    });
};
/**
 * 该子网中仍有网卡，或仍有静态路由的下一跳落在该网段内时，删除会被拒绝。
 * @summary 删除子网
 */
export const deleteSubnet = (privateNetworkId, subnetId) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/subnets/${subnetId}`, method: 'DELETE'
    });
};
/**
 * @summary 列出可用的地区
 */
export const listRegions = () => {
    return request({ url: `/api/v1/regions`, method: 'GET'
    });
};
/**
 * 云硬盘与云服务器必须位于同一可用区才能挂载，创建前请确认所选可用区。
 * @summary 列出一个地区的可用区
 */
export const listAvailabilityZones = (regionCode) => {
    return request({ url: `/api/v1/regions/${regionCode}/availability-zones`, method: 'GET'
    });
};
/**
 * @summary 列出安全组
 */
export const listSecurityGroups = (params) => {
    return request({ url: `/api/v1/security-groups`, method: 'GET',
        params
    });
};
/**
 * 新建的安全组带有一条规则：放行 ICMP 需要分片（type 3 code 4）。缺少该规则会导致路径 MTU 发现失败，表现为连接建立后传输大数据包时卡住。
 * @summary 创建安全组
 */
export const createSecurityGroup = (createSecurityGroupInputBody) => {
    return request({ url: `/api/v1/security-groups`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createSecurityGroupInputBody
    });
};
/**
 * 默认安全组不可删除，它随私有网络一并释放。仍被网卡引用的安全组也无法删除。
 * @summary 删除安全组
 */
export const deleteSecurityGroup = (securityGroupId) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}`, method: 'DELETE'
    });
};
/**
 * @summary 查看安全组
 */
export const getSecurityGroup = (securityGroupId) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}`, method: 'GET'
    });
};
/**
 * @summary 列出安全组规则
 */
export const listSecurityGroupRules = (securityGroupId) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}/rules`, method: 'GET'
    });
};
/**
 * 重复添加同一条规则会被拒绝。判重时 `0.0.0.0/0`、`::/0` 与留空视为等同。
 * @summary 创建安全组规则
 */
export const createSecurityGroupRule = (securityGroupId, createSecurityRuleInputBody) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}/rules`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createSecurityRuleInputBody
    });
};
/**
 * @summary 删除安全组规则
 */
export const deleteSecurityGroupRule = (securityGroupId, ruleId) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}/rules/${ruleId}`, method: 'DELETE'
    });
};
/**
 * @summary 列出快照
 */
export const listSnapshots = () => {
    return request({ url: `/api/v1/snapshots`, method: 'GET'
    });
};
/**
 * 运行中云服务器上挂载的云硬盘同样可以创建快照。快照记录的是某一时刻的块设备状态，文件系统层面可能不一致，重要数据建议先在云服务器内执行 sync。
 * @summary 创建快照
 */
export const createSnapshot = (createSnapshotInputBody) => {
    return request({ url: `/api/v1/snapshots`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createSnapshotInputBody
    });
};
/**
 * @summary 删除快照
 */
export const deleteSnapshot = (snapshotId) => {
    return request({ url: `/api/v1/snapshots/${snapshotId}`, method: 'DELETE'
    });
};
/**
 * @summary 查看快照
 */
export const getSnapshot = (snapshotId) => {
    return request({ url: `/api/v1/snapshots/${snapshotId}`, method: 'GET'
    });
};
