import { request } from '../../http.js';
/**
* @summary 列出备份
*/
export const listBackups = (params, options) => {
    return request({ url: `/api/v1/backups`, method: 'GET',
        params
    }, options);
};
/**
 * 备份是云硬盘在独立存储中的一份完整副本：**源云硬盘删除后仍可恢复，且可恢复到本地区的其他可用区。**快照不具备这两项能力，它与源云硬盘位于同一存储，且源云硬盘存在快照时无法删除。

运行中云服务器上挂载的云硬盘、以及系统盘，均可创建备份。

备份耗时取决于数据量。接口返回时尚未完成，请轮询查看接口。
 * @summary 创建备份
 */
export const createBackup = (createBackupRequestBody, options) => {
    return request({ url: `/api/v1/backups`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createBackupRequestBody
    }, options);
};
/**
 * 与源云硬盘无关，源云硬盘是否存在都不影响删除。
 * @summary 删除备份
 */
export const deleteBackup = (backupId, options) => {
    return request({ url: `/api/v1/backups/${backupId}`, method: 'DELETE'
    }, options);
};
/**
 * 会实时查询备份的当前状态，因此比列表接口慢但更准确。轮询创建进度请使用本接口。
 * @summary 查看备份
 */
export const getBackup = (backupId, options) => {
    return request({ url: `/api/v1/backups/${backupId}`, method: 'GET'
    }, options);
};
/**
 * @summary 重命名备份
 */
export const renameBackup = (backupId, renameBackupRequestBody, options) => {
    return request({ url: `/api/v1/backups/${backupId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renameBackupRequestBody
    }, options);
};
/**
 * 恢复到一块**新建的**云硬盘上，源云硬盘不受影响，也不要求它仍然存在。

目标硬盘类型可位于本地区的其他可用区，容量不能小于备份。恢复完成前该云硬盘不可挂载，请轮询云硬盘查看接口。
 * @summary 由备份恢复
 */
export const restoreBackup = (backupId, restoreBackupRequestBody, options) => {
    return request({ url: `/api/v1/backups/${backupId}/restore`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: restoreBackupRequestBody
    }, options);
};
/**
 * @summary 列出在售硬盘类型
 */
export const listDiskTypes = (params, options) => {
    return request({ url: `/api/v1/disk-types`, method: 'GET',
        params
    }, options);
};
/**
 * 同时提供 region_code 与 availability_zone 时，只返回可挂载到该位置云服务器的云硬盘。
 * @summary 列出云硬盘
 */
export const listDisks = (params, options) => {
    return request({ url: `/api/v1/disks`, method: 'GET',
        params
    }, options);
};
/**
 * 云硬盘创建在所选硬盘类型所属的可用区，云服务器必须位于同一可用区才能挂载。因此选定硬盘类型即确定了可用区。
 * @summary 创建云硬盘
 */
export const createDisk = (createDiskRequestBody, options) => {
    return request({ url: `/api/v1/disks`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createDiskRequestBody
    }, options);
};
/**
 * 云硬盘处于挂载状态，或仍存在基于它创建的快照时，删除会被拒绝。
 * @summary 删除云硬盘
 */
export const deleteDisk = (diskId, options) => {
    return request({ url: `/api/v1/disks/${diskId}`, method: 'DELETE'
    }, options);
};
/**
 * 会实时查询云硬盘的当前状态，因此比列表接口慢但更准确。
 * @summary 查看云硬盘
 */
export const getDisk = (diskId, options) => {
    return request({ url: `/api/v1/disks/${diskId}`, method: 'GET'
    }, options);
};
/**
 * 仅可修改名称。容量请使用扩容接口，类型与可用区不可修改。
 * @summary 重命名云硬盘
 */
export const renameDisk = (diskId, renameDiskRequestBody, options) => {
    return request({ url: `/api/v1/disks/${diskId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renameDiskRequestBody
    }, options);
};
/**
 * 容量只能增加，不支持缩容。扩容完成后需在云服务器内自行扩展文件系统。
 * @summary 扩容
 */
export const resizeDisk = (diskId, resizeDiskRequestBody, options) => {
    return request({ url: `/api/v1/disks/${diskId}/resize`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: resizeDiskRequestBody
    }, options);
};
/**
 * 将云硬盘的内容恢复到创建该快照的时刻。**该时刻之后写入的数据全部丢失，且无法撤销。**

三项限制：只能回滚到该云硬盘最新的一个快照；云硬盘必须先从云服务器上卸载；创建快照后扩容过的云硬盘不能回滚。需要回到更早的时刻，或需要保留现有云硬盘时，请改用由快照创建一块新的云硬盘。

接口返回时回滚尚未完成，请轮询查看接口。
 * @summary 回滚到快照
 */
export const revertDisk = (diskId, revertDiskRequestBody, options) => {
    return request({ url: `/api/v1/disks/${diskId}/revert`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: revertDiskRequestBody
    }, options);
};
/**
 * @summary 列出公网 IP
 */
export const listFloatingIps = (options) => {
    return request({ url: `/api/v1/floating-ips`, method: 'GET'
    }, options);
};
/**
 * 若该私有网络尚未连通外网，会一并为其接入外网。

IPv6 不通过本接口申请。IPv6 地址由私有网络自动下发至云服务器，在私有网络上启用即可。
 * @summary 申领公网 IP
 */
export const allocateFloatingIp = (allocateFloatingIPRequestBody, options) => {
    return request({ url: `/api/v1/floating-ips`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: allocateFloatingIPRequestBody
    }, options);
};
/**
 * 地址释放后进入冷却期才会重新分配，以免仍指向它的 DNS 记录和访问白名单立即失效。因此释放后的短时间内**无法重新申领同一个地址**，请谨慎操作。
 * @summary 释放公网 IP
 */
export const releaseFloatingIp = (floatingIpId, options) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 查看公网 IP
 */
export const getFloatingIp = (floatingIpId, options) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}`, method: 'GET'
    }, options);
};
/**
 * 出入两个方向同时限速。仅限制出方向无法防止入方向流量打满上联带宽。
 * @summary 设带宽上限
 */
export const setFloatingIpBandwidth = (floatingIpId, setBandwidthRequestBody, options) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}/bandwidth`, method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        data: setBandwidthRequestBody
    }, options);
};
/**
 * 地址仍归本项目持有，只是不再指向任何网卡。
 * @summary 解绑公网 IP
 */
export const unbindFloatingIp = (floatingIpId, options) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}/binding`, method: 'DELETE'
    }, options);
};
/**
 * @summary 将公网 IP 绑定到网卡
 */
export const bindFloatingIp = (floatingIpId, bindFloatingIPRequestBody, options) => {
    return request({ url: `/api/v1/floating-ips/${floatingIpId}/binding`, method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        data: bindFloatingIPRequestBody
    }, options);
};
/**
 * min_ram_mb 超过所选机型内存的镜像无法启动，请据此过滤可选项。
 * @summary 列出在售镜像
 */
export const listImages = (params, options) => {
    return request({ url: `/api/v1/images`, method: 'GET',
        params
    }, options);
};
/**
 * @summary 列出在售机型
 */
export const listInstanceTypes = (params, options) => {
    return request({ url: `/api/v1/instance-types`, method: 'GET',
        params
    }, options);
};
/**
 * @summary 列出云服务器
 */
export const listInstances = (options) => {
    return request({ url: `/api/v1/instances`, method: 'GET'
    }, options);
};
/**
 * **必须在请求中设置密码**：不设置时请求会被拒绝，否则创建出的云服务器将无法登录。密码可由平台生成，此时仅在本次响应中返回一次。

`count` 可一次创建多台（最多 20 台），名称自动加 `-1`、`-2` 编号，所有云服务器共用同一个密码。**响应中的 `instances` 始终是数组**，单台创建时也是。

批量创建按顺序逐台进行。若中途失败（例如配额不足），**已创建的云服务器会保留**，响应中的 `failure` 给出中止原因；第一台就失败时视为整次请求失败，不会创建任何云服务器。

镜像二选一：`image_id` 使用平台提供的镜像，`private_image_id` 使用自制镜像。两者都给或都不给都会被拒绝。

云服务器创建在机型所属的可用区。后续要挂载的云硬盘必须位于同一可用区。

接口返回时创建尚未完成（status 为 provisioning），请轮询 GET 确认结果。
 * @summary 创建云服务器
 */
export const launchInstance = (launchInstanceRequestBody, options) => {
    return request({ url: `/api/v1/instances`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: launchInstanceRequestBody
    }, options);
};
/**
 * 系统盘随云服务器一并删除，**基于系统盘创建的快照也会一并删除**。数据盘会被卸载并保留，其快照与备份不受影响。主网卡随云服务器一并释放。

正在制作镜像的云服务器无法释放，请等待制作完成或先删除该镜像。
 * @summary 释放云服务器
 */
export const deleteInstance = (instanceId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}`, method: 'DELETE'
    }, options);
};
/**
 * 会实时查询云服务器的当前状态，因此比列表接口慢但更准确。轮询创建进度请使用本接口。
 * @summary 查看云服务器
 */
export const getInstance = (instanceId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}`, method: 'GET'
    }, options);
};
/**
 * 仅修改显示名称。云服务器内的主机名不变，它等于云服务器 id。
 * @summary 重命名云服务器
 */
export const renameInstance = (instanceId, renameInstanceRequestBody, options) => {
    return request({ url: `/api/v1/instances/${instanceId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renameInstanceRequestBody
    }, options);
};
/**
 * 重启默认为软重启，由操作系统正常关闭后重新启动。

系统已无响应时软重启不会生效，此时可设置 `force` 强制重启。强制重启不等待操作系统关闭，**未落盘的数据会丢失**。`force` 仅适用于 reboot。

已被平台停服的云服务器需先解除停服。
 * @summary 开机、关机、重启
 */
export const actOnInstance = (instanceId, actOnInstanceRequestBody, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/actions`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: actOnInstanceRequestBody
    }, options);
};
/**
 * 在浏览器中直接操作云服务器，无需网络可达，适用于网络配置失误导致无法登录的情况。

返回的地址一次性使用，数分钟后失效。**请勿缓存**，每次使用前重新获取。
 * @summary 打开远程控制台
 */
export const openInstanceConsole = (instanceId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/console`, method: 'POST'
    }, options);
};
/**
 * 云服务器启动过程与内核输出的原始文本。无法登录或远程控制台无输出时，应首先查看本接口。其中可查看启动停止于哪一步、系统盘是否正常挂载、初始化过程是否报错。

处于错误状态或已被平台停服的云服务器同样可以读取。
 * @summary 读取串口输出
 */
export const getInstanceConsoleOutput = (instanceId, params, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/console-output`, method: 'GET',
        params
    }, options);
};
/**
 * @summary 列出云服务器已挂载的云硬盘
 */
export const listInstanceDisks = (instanceId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/disks`, method: 'GET'
    }, options);
};
/**
 * 云硬盘必须与云服务器位于同一地区和可用区。挂载后需在云服务器内自行分区并挂载文件系统。
 * @summary 挂载云硬盘
 */
export const attachDisk = (instanceId, attachDiskRequestBody, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/disks`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: attachDiskRequestBody
    }, options);
};
/**
 * 请先在云服务器内卸载（umount）该设备再调用本接口，正在写入的文件系统被强制卸载会损坏数据。
 * @summary 卸载云硬盘
 */
export const detachDisk = (instanceId, diskId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/disks/${diskId}`, method: 'DELETE'
    }, options);
};
/**
 * 公网 IP 绑定在云服务器的主网卡上。
 * @summary 为云服务器绑定公网 IP
 */
export const attachInstanceFloatingIp = (instanceId, attachFloatingIPRequestBody, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/floating-ips`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: attachFloatingIPRequestBody
    }, options);
};
/**
 * @summary 解绑云服务器的公网 IP
 */
export const detachInstanceFloatingIp = (instanceId, floatingIpId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/floating-ips/${floatingIpId}`, method: 'DELETE'
    }, options);
};
/**
 * 在不重启的情况下改掉 root 的密码，云服务器必须处于运行中。

**并非所有镜像都支持**：镜像列表中 `supports_password_reset` 为 false 的镜像做不到，此时只能通过重装系统设置新密码，而重装会清除系统盘上的全部数据。

镜像标记为支持、但云服务器内相应组件已被卸载或停止时，本接口同样会被拒绝。
 * @summary 重置登录密码
 */
export const resetInstancePassword = (instanceId, resetPasswordRequestBody, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/password`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: resetPasswordRequestBody
    }, options);
};
/**
 * @summary 列出云服务器的网卡
 */
export const listInstancePorts = (instanceId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/ports`, method: 'GET'
    }, options);
};
/**
 * @summary 挂载网卡
 */
export const attachPort = (instanceId, attachPortRequestBody, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/ports`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: attachPortRequestBody
    }, options);
};
/**
 * 主网卡不可卸载，卸载后云服务器将失去网络地址。
 * @summary 卸载网卡
 */
export const detachPort = (instanceId, portId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/ports/${portId}`, method: 'DELETE'
    }, options);
};
/**
 * **系统盘数据将被清除且无法恢复。** 已挂载的数据盘不受影响。
 * @summary 重装系统
 */
export const rebuildInstance = (instanceId, rebuildInstanceRequestBody, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/rebuild`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: rebuildInstanceRequestBody
    }, options);
};
/**
 * 只能变更为同一地区、同一可用区的机型，否则已挂载的云硬盘无法随之迁移。

变配分两步：本接口下发后云服务器会在新规格上重新启动，状态变为 `resize_verifying`，此时**必须**调用确认或回滚接口。目标机型在确认前记在 `pending_instance_type_id` 上，`instance_type_id` 仍为当前生效并计费的机型。

**未确认期间新旧两份规格同时占用资源。** 请在状态变为 `resize_verifying` 后尽快确认。
 * @summary 变配
 */
export const resizeInstance = (instanceId, resizeInstanceRequestBody, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/resize`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: resizeInstanceRequestBody
    }, options);
};
/**
 * 释放原规格占用的资源，`pending_instance_type_id` 成为生效机型并从此按它计费。
 * @summary 确认变配
 */
export const confirmInstanceResize = (instanceId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/resize/confirm`, method: 'POST'
    }, options);
};
/**
 * 云服务器回到原规格，`pending_instance_type_id` 被丢弃，计费不受本次变配影响。
 * @summary 回滚变配
 */
export const revertInstanceResize = (instanceId, options) => {
    return request({ url: `/api/v1/instances/${instanceId}/resize/revert`, method: 'POST'
    }, options);
};
/**
 * 记录本项目内的每一次写操作：谁、在什么时候、对什么做了什么、成功还是失败。读取操作不记录。

**平台代为执行的操作也在其中，但不显示具体执行人**，`by_platform` 为 true。例如欠费停机、违规封禁：需要知道机器何时被平台停止，但执行人属于平台内部信息。

密码一类的字段在写入时即被替换为占位符，不会出现在 `payload` 中。
 * @summary 列出本项目的操作记录
 */
export const listOperationLogs = (params, options) => {
    return request({ url: `/api/v1/operation-logs`, method: 'GET',
        params
    }, options);
};
/**
 * @summary 列出网卡
 */
export const listPorts = (options) => {
    return request({ url: `/api/v1/ports`, method: 'GET'
    }, options);
};
/**
 * 创建出的网卡尚未挂载到任何云服务器。主网卡不由本接口创建，它随云服务器一并创建。
 * @summary 创建网卡
 */
export const createPort = (createPortRequestBody, options) => {
    return request({ url: `/api/v1/ports`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createPortRequestBody
    }, options);
};
/**
 * 主网卡不可单独删除，它随云服务器一并释放。仍挂载在云服务器上的网卡也无法删除。
 * @summary 删除网卡
 */
export const deletePort = (portId, options) => {
    return request({ url: `/api/v1/ports/${portId}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 列出自制镜像
 */
export const listPrivateImages = (params, options) => {
    return request({ url: `/api/v1/private-images`, method: 'GET',
        params
    }, options);
};
/**
 * 依据云服务器的系统盘制作，数据盘不包含在内。制作出的镜像可用于创建云服务器或重装系统，并在源云服务器释放后继续可用。

**镜像内容取自开始制作的那一刻，此后对云服务器的改动不会包含在内。**

制作分两个阶段，请轮询查看接口：

- `provisioning` 正在读取系统盘，通常数十秒。此阶段云服务器可以继续使用，但为保证一致性建议先关机。
- `uploading` 已与系统盘无关，**此时即可开机，无需等待制作完成**。该阶段耗时与系统盘容量成正比，20 GB 约需 3 分钟。

运行中的云服务器其文件系统可能处于写入中间状态，制作出的镜像等同于一次断电后的磁盘内容。对一致性有要求时，请在开始制作前关机，并在状态变为 `uploading` 后开机。

制作期间该云服务器可以正常启停与使用，但无法释放。
 * @summary 将云服务器制作为镜像
 */
export const createPrivateImage = (createPrivateImageRequestBody, options) => {
    return request({ url: `/api/v1/private-images`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createPrivateImageRequestBody
    }, options);
};
/**
 * 仍有云服务器由该镜像创建时，删除会被拒绝：这些云服务器需要它才能重装系统。

制作尚未完成的镜像也可以删除，制作会被终止。
 * @summary 删除自制镜像
 */
export const deletePrivateImage = (privateImageId, options) => {
    return request({ url: `/api/v1/private-images/${privateImageId}`, method: 'DELETE'
    }, options);
};
/**
 * 轮询制作进度请使用本接口。status 为 error 时，failure 给出失败原因。
 * @summary 查看自制镜像
 */
export const getPrivateImage = (privateImageId, options) => {
    return request({ url: `/api/v1/private-images/${privateImageId}`, method: 'GET'
    }, options);
};
/**
 * @summary 重命名自制镜像
 */
export const renamePrivateImage = (privateImageId, renamePrivateImageRequestBody, options) => {
    return request({ url: `/api/v1/private-images/${privateImageId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renamePrivateImageRequestBody
    }, options);
};
/**
 * @summary 列出私有网络
 */
export const listPrivateNetworks = (params, options) => {
    return request({ url: `/api/v1/private-networks`, method: 'GET',
        params
    }, options);
};
/**
 * 同时创建一张网络、一台路由器和一个默认安全组。默认安全组拒绝全部入站流量、放行全部出站流量。
 * @summary 创建私有网络
 */
export const createPrivateNetwork = (createPrivateNetworkRequestBody, options) => {
    return request({ url: `/api/v1/private-networks`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createPrivateNetworkRequestBody
    }, options);
};
/**
 * 其中仍有云服务器或网卡时，释放会被拒绝。IPv6、路由器与安全组随之一并释放。
 * @summary 释放私有网络
 */
export const deletePrivateNetwork = (privateNetworkId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 查看私有网络
 */
export const getPrivateNetwork = (privateNetworkId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}`, method: 'GET'
    }, options);
};
/**
 * 仅修改显示名称。网段、路由与外网网关均不可修改。
 * @summary 重命名私有网络
 */
export const renamePrivateNetwork = (privateNetworkId, renamePrivateNetworkRequestBody, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renamePrivateNetworkRequestBody
    }, options);
};
/**
 * 释放的前缀不会立即重新分配。
 * @summary 关闭私有网络的 IPv6
 */
export const disablePrivateNetworkIpv6 = (privateNetworkId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/ipv6`, method: 'DELETE'
    }, options);
};
/**
 * @summary 查看私有网络的 IPv6
 */
export const getPrivateNetworkIpv6 = (privateNetworkId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/ipv6`, method: 'GET'
    }, options);
};
/**
 * 为该私有网络分配一段 IPv6 地址。地址由私有网络自动下发至云服务器，无需也无法单独申领，也不占用公网 IPv4。

该私有网络尚未接入外网时会自动接入，无需单独操作。
 * @summary 为私有网络启用 IPv6
 */
export const enablePrivateNetworkIpv6 = (privateNetworkId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/ipv6`, method: 'POST'
    }, options);
};
/**
 * @summary 列出静态路由
 */
export const listRoutes = (privateNetworkId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/routes`, method: 'GET'
    }, options);
};
/**
 * 以下三种会导致网络中断的写法会被拒绝：目的网段为 0.0.0.0/0（覆盖默认路由，所有公网 IP 立即失效）、目的网段为某个子网自身（覆盖直连路由）、下一跳为某个子网的网关（指回路由器自身）。
 * @summary 创建静态路由
 */
export const createRoute = (privateNetworkId, createRouteRequestBody, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/routes`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createRouteRequestBody
    }, options);
};
/**
 * @summary 删除静态路由
 */
export const deleteRoute = (privateNetworkId, routeId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/routes/${routeId}`, method: 'DELETE'
    }, options);
};
/**
 * IPv6 子网也在返回结果中，ip_version 为 6。它在启用 IPv6 时自动创建，不可单独删除。
 * @summary 列出子网
 */
export const listSubnets = (privateNetworkId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/subnets`, method: 'GET'
    }, options);
};
/**
 * @summary 创建子网
 */
export const createSubnet = (privateNetworkId, createSubnetRequestBody, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/subnets`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createSubnetRequestBody
    }, options);
};
/**
 * 返回的只是建议值，创建子网时仍会重新校验。用于避免手工计算下一个空闲网段时出错。
 * @summary 推荐下一个空闲网段
 */
export const suggestSubnetCidr = (privateNetworkId, params, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/subnets/next-free-cidr`, method: 'GET',
        params
    }, options);
};
/**
 * 该子网中仍有网卡，或仍有静态路由的下一跳落在该网段内时，删除会被拒绝。
 * @summary 删除子网
 */
export const deleteSubnet = (privateNetworkId, subnetId, options) => {
    return request({ url: `/api/v1/private-networks/${privateNetworkId}/subnets/${subnetId}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 列出可用的地区
 */
export const listRegions = (options) => {
    return request({ url: `/api/v1/regions`, method: 'GET'
    }, options);
};
/**
 * 云硬盘与云服务器必须位于同一可用区才能挂载，创建前请确认所选可用区。
 * @summary 列出一个地区的可用区
 */
export const listAvailabilityZones = (regionCode, options) => {
    return request({ url: `/api/v1/regions/${regionCode}/availability-zones`, method: 'GET'
    }, options);
};
/**
 * @summary 列出安全组
 */
export const listSecurityGroups = (params, options) => {
    return request({ url: `/api/v1/security-groups`, method: 'GET',
        params
    }, options);
};
/**
 * 新建的安全组带有一条规则：放行 ICMP 需要分片（type 3 code 4）。缺少该规则会导致路径 MTU 发现失败，表现为连接建立后传输大数据包时卡住。
 * @summary 创建安全组
 */
export const createSecurityGroup = (createSecurityGroupRequestBody, options) => {
    return request({ url: `/api/v1/security-groups`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createSecurityGroupRequestBody
    }, options);
};
/**
 * 默认安全组不可删除，它随私有网络一并释放。仍被网卡引用的安全组也无法删除。
 * @summary 删除安全组
 */
export const deleteSecurityGroup = (securityGroupId, options) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 查看安全组
 */
export const getSecurityGroup = (securityGroupId, options) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}`, method: 'GET'
    }, options);
};
/**
 * @summary 列出安全组规则
 */
export const listSecurityGroupRules = (securityGroupId, options) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}/rules`, method: 'GET'
    }, options);
};
/**
 * 重复添加同一条规则会被拒绝。判重时 `0.0.0.0/0`、`::/0` 与留空视为等同。
 * @summary 创建安全组规则
 */
export const createSecurityGroupRule = (securityGroupId, createSecurityRuleRequestBody, options) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}/rules`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createSecurityRuleRequestBody
    }, options);
};
/**
 * @summary 删除安全组规则
 */
export const deleteSecurityGroupRule = (securityGroupId, ruleId, options) => {
    return request({ url: `/api/v1/security-groups/${securityGroupId}/rules/${ruleId}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 列出快照
 */
export const listSnapshots = (params, options) => {
    return request({ url: `/api/v1/snapshots`, method: 'GET',
        params
    }, options);
};
/**
 * 运行中云服务器上挂载的云硬盘同样可以创建快照。快照记录的是某一时刻的块设备状态，文件系统层面可能不一致，重要数据建议先在云服务器内执行 sync。

**系统盘的快照不能用于回滚该系统盘**：回滚要求先从云服务器上卸载，而系统盘不可卸载。它可用于创建一块新的数据盘。需要保留并恢复整个系统时，请使用自制镜像；需要可跨可用区、且在云硬盘删除后仍可恢复的副本时，请使用备份。
 * @summary 创建快照
 */
export const createSnapshot = (createSnapshotRequestBody, options) => {
    return request({ url: `/api/v1/snapshots`, method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        data: createSnapshotRequestBody
    }, options);
};
/**
 * @summary 删除快照
 */
export const deleteSnapshot = (snapshotId, options) => {
    return request({ url: `/api/v1/snapshots/${snapshotId}`, method: 'DELETE'
    }, options);
};
/**
 * @summary 查看快照
 */
export const getSnapshot = (snapshotId, options) => {
    return request({ url: `/api/v1/snapshots/${snapshotId}`, method: 'GET'
    }, options);
};
/**
 * @summary 重命名快照
 */
export const renameSnapshot = (snapshotId, renameSnapshotRequestBody, options) => {
    return request({ url: `/api/v1/snapshots/${snapshotId}`, method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        data: renameSnapshotRequestBody
    }, options);
};
