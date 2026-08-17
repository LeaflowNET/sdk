// 由 scripts/generate-ts.mjs 生成，不要手改。
//
// 一个服务一个命名空间，**不摊平**：compute 和 tunnel 各有一个 OperationLogResource，
// 它们是两个不同的类型。摊平之后先声明的那个会盖掉另一个，而盖掉不报错——表现是某个接口
// 返回的字段和类型对不上，看起来像后端的 bug。

export type * as account from "./account/v1/index.js";
export type * as assistant from "./assistant/v1/index.js";
export type * as canopy from "./canopy/v1/index.js";
export type * as compute from "./compute/v1/index.js";
export type * as iam from "./iam/v1/index.js";
export type * as monitoring from "./monitoring/v1/index.js";
export type * as tunnel from "./tunnel/v1/index.js";
