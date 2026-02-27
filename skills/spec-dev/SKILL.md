---
description: Spec 驱动开发工作流参考手册 —— 覆盖 /spec、/dev、/review 三条命令的完整使用指南
---

# Spec 驱动开发（spec-dev）工作流

你是一名熟悉 spec-dev 插件工作流的开发助手。当用户询问如何使用 spec-dev、如何进行规格驱动开发，或需要了解三个命令的用法时，参考本文档给出准确的指导。

## 核心理念

> 先写规格，再写代码。先达成共识，再动手实现。

## 三条核心命令

### `/spec [功能描述]`
生成基于 EARS 方法论的需求规格文档。

```
/spec 用户 OAuth 认证（支持 Google 和 GitHub）
```

**执行流程**：
1. 通过针对性提问澄清需求
2. 调用 `spec-writer` 生成完整 EARS 格式规格文档
3. 与用户确认并修订
4. 保存到 `.claude/specs/[功能名称].md`

**输出文档含**：环境分析、参与者分析、EARS 格式功能需求、非功能需求、Given/When/Then 验收标准

---

### `/dev [功能名称] [--worktree]`
从规格文档开始实现功能。

```bash
/dev user-auth              # 标准分支模式
/dev user-auth --worktree   # 独立 worktree 模式
```

**两种模式**：
- **普通模式**：`git checkout -b feature/[功能名称]`，在当前工作区开发
- **Worktree 模式**：`git worktree add ../[功能名称] -b feature/[功能名称]`，在独立目录中开发，支持并行多功能开发

**执行流程**：
1. 读取 `.claude/specs/[功能名称].md`（不存在则提示先运行 `/spec`）
2. 创建分支或 worktree，将分支信息写入规格文档
3. 通过 `code-explorer` 探索代码库
4. 通过 `dev-planner` 制定实现计划（将每条 FR 映射为具体任务）
5. 向用户提问并等待答复，解决所有歧义
6. 按计划实现功能
7. 更新规格文档的完成状态

---

### `/review [功能名称]`
对照规格审查代码，运行测试，可选浏览器验证。

```
/review
/review user-auth
```

**执行流程**：
1. 检测当前分支，自动匹配规格文档
2. **规格合规检查**：逐条验证 EARS 需求是否满足
3. **代码质量审查**：并行启动 3 个 `code-reviewer`（质量/缺陷/规范）
4. **测试执行**：运行项目测试套件
5. **浏览器验证**：使用 `mcp__chrome-devtools` 等 MCP（如可用）
6. 汇总所有发现，询问用户决策

---

## 完整工作流示例

```
/spec 添加暗黑模式
      ↓ 生成 .claude/specs/add-dark-mode.md
/dev add-dark-mode --worktree
      ↓ 创建 feature/add-dark-mode 分支 + ../add-dark-mode/ worktree
      ↓ 探索代码库 → 制定计划 → 实现功能
/review add-dark-mode
      ↓
✅ 5/5 条规格需求已验证
✅ 所有测试通过
✅ 浏览器无控制台报错
可以合并！
```

## EARS 需求模式速查

| 模式 | 格式 | 适用场景 |
|------|------|----------|
| 通用型 | `<系统> 应 <响应>` | 始终生效的需求 |
| 状态驱动 | `当处于 <状态> 时，<系统> 应 <响应>` | 特定状态下的行为 |
| 事件驱动 | `当 <事件> 发生时，<系统> 应 <响应>` | 由事件触发的行为 |
| 可选功能 | `若 <功能存在>，<系统> 应 <响应>` | 可选能力 |
| 不良行为 | `若 <条件>，则 <系统> 应 <响应>` | 错误处理 |

## 规格文档结构

保存路径：`.claude/specs/[功能名称].md`

```markdown
# 功能规格：[功能名称]

## 概述
## 环境分析
## 参与者分析
## 功能需求

### FR-AUTH-001：用户登录
**EARS**：当用户输入有效凭证并点击登录时，系统应验证身份并跳转到仪表板。

**验收标准**：
- Given 用户在登录页面
- When 输入正确的邮箱和密码
- Then 跳转到仪表板
- And 创建会话（2小时过期）

## 非功能需求

## 开发信息  ← 由 /dev 写入
- 分支：feature/[功能名称]
- 开始时间：[日期]
- 状态：进行中 → 已完成 → 已审查
```

## Agent 职责

| Agent | 职责 |
|-------|------|
| `spec-writer` | 将功能描述转化为 EARS 格式规格文档 |
| `dev-planner` | 将规格需求转化为详细实现任务计划 |
| `code-explorer` | 追踪代码库执行路径，理解现有模式 |
| `code-reviewer` | 审查代码质量、缺陷、规范及规格合规性 |

## 安装

```bash
# 通过 Marketplace
/plugin marketplace add github:xuwenjun/spec-dev
/plugin install spec-dev@spec-dev-marketplace

# 本地测试
claude --plugin-dir ./spec-dev
```
