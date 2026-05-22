---
name: sd-workflow
description: 当用户描述一个开发意图但不确定该从脑暴、写规格还是开发开始时使用。简单想法、信息不足、需要思考或脑暴时进入 brainstorm；已有较详细 PRD、技术文档、需求说明或明确规格素材时进入 write-spec；如果已经有 spec 文档并明确要推进实现，可以进入 dev。workflow 不直接进入 review/debug/parallel。
---

# Spec 驱动开发工作流

你是一名熟悉 spec-dev 插件工作流的开发助手。当用户询问如何使用 spec-dev、不确定该从脑暴、写规格还是开发开始，或需要了解工作流时，根据本文档给出准确的指导。

## 核心理念

> 先写规格，再写代码。先达成共识，再动手实现。

## 路由逻辑

根据用户输入的信息密度和是否已有 spec 文档，推荐下一步进入 `sd-brainstorm`、`sd-write-spec` 或 `sd-dev`。workflow 不直接进入 `sd-review`、`sd-debug` 或 `sd-parallel`。

| 用户场景 | 推荐 skill | 原因 |
|----------|------------|------|
| 只有简单想法、零散信息、需要思考或脑暴 | `sd-brainstorm` | 先收敛问题空间、目标、边界和方案 |
| 已提供比较详细的 PRD、技术文档、需求说明、验收标准或明确规格素材 | `sd-write-spec` | 直接整理为 EARS 格式的结构化规格 |
| 已经有 spec 文档，并明确要开始实现 | `sd-dev` | 基于已有规格探索代码库、生成任务计划并推进开发 |

**判断原则**：
- 信息少、目标模糊、边界不清、方案未定、用户说"想一下/脑暴/帮我想想/不知道怎么做" → `sd-brainstorm`
- 信息已经足够成文，包含背景、目标、用户场景、功能点、流程、接口、约束、验收标准中的多项 → `sd-write-spec`
- 即使用户说"开始做/实现"，只要还没有明确规格，也先判断进入 `sd-brainstorm` 或 `sd-write-spec`
- 如果用户提供了已有 spec 文档，或明确指出按某个 spec 开始实现 → `sd-dev`
- review、debug、parallel 属于规格生成之后的后续阶段，不作为 workflow 的直接下一步

## 完整工作流示例

```
sd-brainstorm → 形成设计共识
      ↓
sd-write-spec → 生成 .claude/specs/[功能名称].md
      ↓
sd-dev → 探索代码库 → 生成 .claude/tasks/[功能名称].md → 用户确认 → 实现
      ↓
sd-review → 规格合规检查 → 测试验证 → 合并或创建 PR
```

遇到实现中的 bug 或测试失败，随时使用 `sd-debug` 介入。
任务计划中有多个独立任务时，可用 `sd-parallel` 并行分发。

## 中途切换

开发过程中可能需要在 skill 之间切换，以下是常见场景：

| 触发条件 | 从 | 到 | 说明 |
|---------|----|----|------|
| 实现中遇到 bug 或测试失败 | `sd-dev` | `sd-debug` | 暂停实现，定位根因后恢复开发 |
| review 发现严重设计问题 | `sd-review` | `sd-brainstorm` | 需要重新讨论设计方向 |
| debug 三振出局 | `sd-debug` | 用户决策 | 可能是架构问题，需要人工判断 |
| 需求发生变更 | `sd-dev` | `sd-write-spec` | 先更新 spec 再继续实现 |
| review 发现需求遗漏 | `sd-review` | `sd-write-spec` | 补充 spec 后重新实现和审查 |
