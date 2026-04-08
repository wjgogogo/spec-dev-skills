# spec-dev-skills

> 作者自用的 Spec 驱动开发 (SDD) 工具，基于 EARS 方法论。

**先写规格，再写代码。先达成共识，再动手实现。**

## 理念

由 AI 直接编写复杂功能时，很容易因为缺失全局视野或没有充分对齐目标，导致反复修改或南辕北辙。
本工具强制引入一条轻量级的规范链条：
**澄清需求（`sd-brainstorm`）→ 编写规格（`sd-write-spec`）→ 制定可执行任务（`sd-dev`）→ 按任务实现并验证 → 对照规格审查校验（`sd-review`）**

## 核心技能

- `sd-brainstorm`：在正式写规格前，先澄清目标、约束、边界和方案；若范围过大，先拆出当前迭代真正要做的那一块，再形成设计共识。
- `sd-write-spec`：通过提问交流，生成严谨的 EARS 需求文档并存入 `.claude/specs/`，保存前会做占位项、歧义和范围检查。
- `sd-dev`：严格根据需求文档，生成可执行的任务册 `.claude/tasks/`；任务必须写明精确文件、验证命令和验证方式，支持独立 worktree。
- `sd-review`：对照需求文件和任务文件，多维度对当前实现排查逻辑、规范和 Bug。
- `write`：对指定文档文件进行润色优化，统一 Markdown、中文写作与中英文排版。

更详细和内部机制参考 `skills/spec-dev-workflow/SKILL.md`。

## 安装指南

### 方式一：通过 Marketplace 安装 (推荐)
在 Claude Code CLI 中直接执行：
```bash
/plugin marketplace add https://github.com/wjgogogo/spec-dev-skills.git
```

### 方式二：本地安装与测试开发
如果你在本地克隆了本项目，可以加载本地目录作为插件：
```bash
claude --plugin-dir /绝对路径/spec-dev-skills
```
