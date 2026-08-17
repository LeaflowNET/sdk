// 由 scripts/generate-ts.mjs 生成，不要手改。
//
// 别名把 operations[...] 那串下标换成一个名字。原始的 paths / components / operations 也
// 一并导出：paths 是给 openapi-fetch 的 createClient<paths>() 用的。

export type { paths, components, operations, webhooks } from "./schema.js";

import type { operations } from "./schema.js";

/** `GET /api/v1/backups` 成功时的响应体。 */
export type ListBackupsResult =
  operations["list-backups"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/backups` 成功时的响应体。 */
export type CreateBackupResult =
  operations["create-backup"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/backups` 的请求体。 */
export type CreateBackupBody = NonNullable<
  operations["create-backup"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/backups/{backupId}` 成功时的响应体。 */
export type GetBackupResult =
  operations["get-backup"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/backups/{backupId}` 成功时的响应体。 */
export type RenameBackupResult =
  operations["rename-backup"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/backups/{backupId}` 的请求体。 */
export type RenameBackupBody = NonNullable<
  operations["rename-backup"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/backups/{backupId}/restore` 成功时的响应体。 */
export type RestoreBackupResult =
  operations["restore-backup"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/backups/{backupId}/restore` 的请求体。 */
export type RestoreBackupBody = NonNullable<
  operations["restore-backup"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/disk-types` 成功时的响应体。 */
export type ListDiskTypesResult =
  operations["list-disk-types"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/images` 成功时的响应体。 */
export type ListImagesResult =
  operations["list-images"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/instance-types` 成功时的响应体。 */
export type ListInstanceTypesResult =
  operations["list-instance-types"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/regions` 成功时的响应体。 */
export type ListRegionsResult =
  operations["list-regions"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/regions/{regionCode}/availability-zones` 成功时的响应体。 */
export type ListAvailabilityZonesResult =
  operations["list-availability-zones"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/disks` 成功时的响应体。 */
export type ListDisksResult =
  operations["list-disks"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/disks` 成功时的响应体。 */
export type CreateDiskResult =
  operations["create-disk"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/disks` 的请求体。 */
export type CreateDiskBody = NonNullable<
  operations["create-disk"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/disks/{diskId}` 成功时的响应体。 */
export type GetDiskResult =
  operations["get-disk"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/disks/{diskId}` 成功时的响应体。 */
export type RenameDiskResult =
  operations["rename-disk"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/disks/{diskId}` 的请求体。 */
export type RenameDiskBody = NonNullable<
  operations["rename-disk"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/disks/{diskId}/resize` 成功时的响应体。 */
export type ResizeDiskResult =
  operations["resize-disk"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/disks/{diskId}/resize` 的请求体。 */
export type ResizeDiskBody = NonNullable<
  operations["resize-disk"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/disks/{diskId}/revert` 成功时的响应体。 */
export type RevertDiskResult =
  operations["revert-disk"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/disks/{diskId}/revert` 的请求体。 */
export type RevertDiskBody = NonNullable<
  operations["revert-disk"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/floating-ips` 成功时的响应体。 */
export type ListFloatingIpsResult =
  operations["list-floating-ips"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/floating-ips` 成功时的响应体。 */
export type AllocateFloatingIpResult =
  operations["allocate-floating-ip"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/floating-ips` 的请求体。 */
export type AllocateFloatingIpBody = NonNullable<
  operations["allocate-floating-ip"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/floating-ips/{floatingIpId}` 成功时的响应体。 */
export type GetFloatingIpResult =
  operations["get-floating-ip"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/floating-ips/{floatingIpId}/bandwidth` 成功时的响应体。 */
export type SetFloatingIpBandwidthResult =
  operations["set-floating-ip-bandwidth"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/floating-ips/{floatingIpId}/bandwidth` 的请求体。 */
export type SetFloatingIpBandwidthBody = NonNullable<
  operations["set-floating-ip-bandwidth"]["requestBody"]
>["content"]["application/json"];

/** `DELETE /api/v1/floating-ips/{floatingIpId}/binding` 成功时的响应体。 */
export type UnbindFloatingIpResult =
  operations["unbind-floating-ip"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/floating-ips/{floatingIpId}/binding` 成功时的响应体。 */
export type BindFloatingIpResult =
  operations["bind-floating-ip"]["responses"][200]["content"]["application/json"];

/** `PUT /api/v1/floating-ips/{floatingIpId}/binding` 的请求体。 */
export type BindFloatingIpBody = NonNullable<
  operations["bind-floating-ip"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/instances` 成功时的响应体。 */
export type ListInstancesResult =
  operations["list-instances"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances` 成功时的响应体。 */
export type LaunchInstanceResult =
  operations["launch-instance"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/instances` 的请求体。 */
export type LaunchInstanceBody = NonNullable<
  operations["launch-instance"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/instances/{instanceId}` 成功时的响应体。 */
export type GetInstanceResult =
  operations["get-instance"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/instances/{instanceId}` 成功时的响应体。 */
export type RenameInstanceResult =
  operations["rename-instance"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/instances/{instanceId}` 的请求体。 */
export type RenameInstanceBody = NonNullable<
  operations["rename-instance"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/actions` 成功时的响应体。 */
export type ActOnInstanceResult =
  operations["act-on-instance"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/actions` 的请求体。 */
export type ActOnInstanceBody = NonNullable<
  operations["act-on-instance"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/console` 成功时的响应体。 */
export type OpenInstanceConsoleResult =
  operations["open-instance-console"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/instances/{instanceId}/console-output` 成功时的响应体。 */
export type GetInstanceConsoleOutputResult =
  operations["get-instance-console-output"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/password` 成功时的响应体。 */
export type ResetInstancePasswordResult =
  operations["reset-instance-password"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/password` 的请求体。 */
export type ResetInstancePasswordBody = NonNullable<
  operations["reset-instance-password"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/rebuild` 成功时的响应体。 */
export type RebuildInstanceResult =
  operations["rebuild-instance"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/rebuild` 的请求体。 */
export type RebuildInstanceBody = NonNullable<
  operations["rebuild-instance"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/resize` 成功时的响应体。 */
export type ResizeInstanceResult =
  operations["resize-instance"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/resize` 的请求体。 */
export type ResizeInstanceBody = NonNullable<
  operations["resize-instance"]["requestBody"]
>["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/resize/confirm` 成功时的响应体。 */
export type ConfirmInstanceResizeResult =
  operations["confirm-instance-resize"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/resize/revert` 成功时的响应体。 */
export type RevertInstanceResizeResult =
  operations["revert-instance-resize"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/instances/{instanceId}/disks` 成功时的响应体。 */
export type ListInstanceDisksResult =
  operations["list-instance-disks"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/disks` 成功时的响应体。 */
export type AttachDiskResult =
  operations["attach-disk"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/disks` 的请求体。 */
export type AttachDiskBody = NonNullable<
  operations["attach-disk"]["requestBody"]
>["content"]["application/json"];

/** `DELETE /api/v1/instances/{instanceId}/disks/{diskId}` 成功时的响应体。 */
export type DetachDiskResult =
  operations["detach-disk"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/floating-ips` 成功时的响应体。 */
export type AttachInstanceFloatingIpResult =
  operations["attach-instance-floating-ip"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/floating-ips` 的请求体。 */
export type AttachInstanceFloatingIpBody = NonNullable<
  operations["attach-instance-floating-ip"]["requestBody"]
>["content"]["application/json"];

/** `DELETE /api/v1/instances/{instanceId}/floating-ips/{floatingIpId}` 成功时的响应体。 */
export type DetachInstanceFloatingIpResult =
  operations["detach-instance-floating-ip"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/instances/{instanceId}/ports` 成功时的响应体。 */
export type ListInstancePortsResult =
  operations["list-instance-ports"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/ports` 成功时的响应体。 */
export type AttachPortResult =
  operations["attach-port"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/instances/{instanceId}/ports` 的请求体。 */
export type AttachPortBody = NonNullable<
  operations["attach-port"]["requestBody"]
>["content"]["application/json"];

/** `DELETE /api/v1/instances/{instanceId}/ports/{portId}` 成功时的响应体。 */
export type DetachPortResult =
  operations["detach-port"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/operation-logs` 成功时的响应体。 */
export type ListOperationLogsResult =
  operations["list-operation-logs"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/ports` 成功时的响应体。 */
export type ListPortsResult =
  operations["list-ports"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/ports` 成功时的响应体。 */
export type CreatePortResult =
  operations["create-port"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/ports` 的请求体。 */
export type CreatePortBody = NonNullable<
  operations["create-port"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/private-images` 成功时的响应体。 */
export type ListPrivateImagesResult =
  operations["list-private-images"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/private-images` 成功时的响应体。 */
export type CreatePrivateImageResult =
  operations["create-private-image"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/private-images` 的请求体。 */
export type CreatePrivateImageBody = NonNullable<
  operations["create-private-image"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/private-images/{privateImageId}` 成功时的响应体。 */
export type GetPrivateImageResult =
  operations["get-private-image"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/private-images/{privateImageId}` 成功时的响应体。 */
export type RenamePrivateImageResult =
  operations["rename-private-image"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/private-images/{privateImageId}` 的请求体。 */
export type RenamePrivateImageBody = NonNullable<
  operations["rename-private-image"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/private-networks` 成功时的响应体。 */
export type ListPrivateNetworksResult =
  operations["list-private-networks"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/private-networks` 成功时的响应体。 */
export type CreatePrivateNetworkResult =
  operations["create-private-network"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/private-networks` 的请求体。 */
export type CreatePrivateNetworkBody = NonNullable<
  operations["create-private-network"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/private-networks/{privateNetworkId}` 成功时的响应体。 */
export type GetPrivateNetworkResult =
  operations["get-private-network"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/private-networks/{privateNetworkId}` 成功时的响应体。 */
export type RenamePrivateNetworkResult =
  operations["rename-private-network"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/private-networks/{privateNetworkId}` 的请求体。 */
export type RenamePrivateNetworkBody = NonNullable<
  operations["rename-private-network"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/private-networks/{privateNetworkId}/ipv6` 成功时的响应体。 */
export type GetPrivateNetworkIpv6Result =
  operations["get-private-network-ipv6"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/private-networks/{privateNetworkId}/ipv6` 成功时的响应体。 */
export type EnablePrivateNetworkIpv6Result =
  operations["enable-private-network-ipv6"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/private-networks/{privateNetworkId}/routes` 成功时的响应体。 */
export type ListRoutesResult =
  operations["list-routes"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/private-networks/{privateNetworkId}/routes` 成功时的响应体。 */
export type CreateRouteResult =
  operations["create-route"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/private-networks/{privateNetworkId}/routes` 的请求体。 */
export type CreateRouteBody = NonNullable<
  operations["create-route"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/private-networks/{privateNetworkId}/subnets` 成功时的响应体。 */
export type ListSubnetsResult =
  operations["list-subnets"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/private-networks/{privateNetworkId}/subnets` 成功时的响应体。 */
export type CreateSubnetResult =
  operations["create-subnet"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/private-networks/{privateNetworkId}/subnets` 的请求体。 */
export type CreateSubnetBody = NonNullable<
  operations["create-subnet"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/private-networks/{privateNetworkId}/subnets/next-free-cidr` 成功时的响应体。 */
export type SuggestSubnetCidrResult =
  operations["suggest-subnet-cidr"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/security-groups` 成功时的响应体。 */
export type ListSecurityGroupsResult =
  operations["list-security-groups"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/security-groups` 成功时的响应体。 */
export type CreateSecurityGroupResult =
  operations["create-security-group"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/security-groups` 的请求体。 */
export type CreateSecurityGroupBody = NonNullable<
  operations["create-security-group"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/security-groups/{securityGroupId}` 成功时的响应体。 */
export type GetSecurityGroupResult =
  operations["get-security-group"]["responses"][200]["content"]["application/json"];

/** `GET /api/v1/security-groups/{securityGroupId}/rules` 成功时的响应体。 */
export type ListSecurityGroupRulesResult =
  operations["list-security-group-rules"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/security-groups/{securityGroupId}/rules` 成功时的响应体。 */
export type CreateSecurityGroupRuleResult =
  operations["create-security-group-rule"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/security-groups/{securityGroupId}/rules` 的请求体。 */
export type CreateSecurityGroupRuleBody = NonNullable<
  operations["create-security-group-rule"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/snapshots` 成功时的响应体。 */
export type ListSnapshotsResult =
  operations["list-snapshots"]["responses"][200]["content"]["application/json"];

/** `POST /api/v1/snapshots` 成功时的响应体。 */
export type CreateSnapshotResult =
  operations["create-snapshot"]["responses"][201]["content"]["application/json"];

/** `POST /api/v1/snapshots` 的请求体。 */
export type CreateSnapshotBody = NonNullable<
  operations["create-snapshot"]["requestBody"]
>["content"]["application/json"];

/** `GET /api/v1/snapshots/{snapshotId}` 成功时的响应体。 */
export type GetSnapshotResult =
  operations["get-snapshot"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/snapshots/{snapshotId}` 成功时的响应体。 */
export type RenameSnapshotResult =
  operations["rename-snapshot"]["responses"][200]["content"]["application/json"];

/** `PATCH /api/v1/snapshots/{snapshotId}` 的请求体。 */
export type RenameSnapshotBody = NonNullable<
  operations["rename-snapshot"]["requestBody"]
>["content"]["application/json"];
