---
name: sd-workflow
description: Spec 驱动开发工作流参考手册，说明 sd-write-spec、sd-dev、sd-review、sd-proof 四个 skills 的职责与衔接方式
---

# Spec 驱动开发（spec-dev）工作流

你是一名熟悉 spec-dev 插件工作流的开发助手。当用户询问如何使用 spec-dev、如何进行规格驱动开发，或需要了解各个 skills 的用法时，参考本文档给出准确的指导。

## 核心理念

> 先写规格，再写代码。先达成共识，再动手实现。

## 四个核心技能

### 1. `sd-write-spec`（制定规格）
生成基于 EARS 方法论的需求规格文档。

```
请使用 sd-write-spec skill，为“用户 OAuth 认证（支持 Google 和 GitHub）”编写规格文档
```

**执行流程**：
1. 通过针对性提问澄清需求，确保不存在模糊状态。
2. 生成包含环境、参与者、功能、非功能需求及验收标准的完整 EARS 规格文档。
3. 给用户查阅后再修缮，并存入 `.claude/specs/[功能名称].md`。

---

### 2. `sd-dev`（执行开发）
对照已有规格文档推进结构化开发，生成任务并编写代码。

```bash
请使用 sd-dev skill 实现 user-auth
请使用 sd-dev skill 以 worktree 模式实现 user-auth
```

**两种开发模式**：
- **普通模式**：`git checkout -b feature/[功能名称]`，会在当前工作区直接切换分支开发。
- **Worktree 模式**：通过 `git worktree add ../[功能名称]` 在项目外部隔离目录开发，避免改错主工作区代码。

**执行流程**：
1. 检测规格文档，读取功能需求和验收标准。
2. 探索代码库，理解现有模式和架构。
3. 生成包含详细拆分任务的 `.claude/tasks/[功能名称].md` 实施计划。
4. 向用户高亮开放问题列表并得到回复，然后等待用户明确确认任务详情无误。
5. 用户确认后，建立对应特性分支或工作树，隔离开发环境。
6. 通过分阶段顺序执行，每完成一环就打钩，完成具体特性的代码落地。

---

### 3. `sd-review`（安全核对与审查）
检查改动是否符合事前设定的规格与任务，以及代码本身的健壮性。

```
请使用 sd-review skill 审查当前改动
请使用 sd-review skill 审查 user-auth
```

**执行流程**：
1. 提取当前分支或功能名，获取对应的规格文档、任务计划以及 git diff 差异。
2. 进行规格合规检查、任务执行一致性检查、代码基本面审查。
3. 使用工具或引导用户测试及查阅 UI 反馈。

---

### 4. `sd-proof`（文档润色）
对指定文档进行中文写作、排版与 Markdown 格式润色。

```
请使用 sd-proof skill 润色 README.md
```

**执行流程**：
1. 读取目标文档并检查 Markdown 结构。
2. 修正中英文排版、标点和冗余表述。
3. 先向用户展示修改，再在确认后落盘。

---

## 完整工作流示例

```
请使用 sd-write-spec skill，为“添加暗黑模式”写规格
      ↓ 生成 .claude/specs/add-dark-mode.md
请使用 sd-dev skill，以 worktree 模式实现 add-dark-mode
      ↓ 探索代码库，理解现有模式
      ↓ 生成实施任务列表 .claude/tasks/add-dark-mode.md
      ↓ 澄清开放问题 → 等待用户确认任务详情
      ↓ 用户确认后，隔离进入 ../add-dark-mode/
      ↓ 代码实现
请使用 sd-review skill 审查 add-dark-mode
      ↓ 验证所有的 FR-xxx 的验收标准，检查任务执行情况
→ 一切稳妥，可以合并回主分支！
```
