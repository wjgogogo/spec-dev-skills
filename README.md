# spec-dev-skills

基于 EARS 方法论的 Spec 驱动开发 (SDD) Claude Code 插件。
> 先写规格，再写代码。先达成共识，再动手实现。

## 理念

由 AI 直接编写复杂功能时，很容易因为缺失全局视野或没有充分对齐目标，导致反复修改或南辕北辙。
本插件强制引入一条轻量级的规范链条：
**沟通需求 (`/spec`) → 制定实施任务 (`/dev`) → 隔离按阶段开发 → 对照规格审查校验 (`/review`)**

## 核心命令

- `/spec [新功能描述]`：通过提问交流，生成严谨的 EARS 需求文档并存入 `.claude/specs/`。
- `/dev [功能名称] [--worktree]`：严格根据需求文档，生成可执行的任务册 `.claude/tasks/`，向用户确认后完成开发。（支持独立工作树特性）。
- `/review [功能名称]`：对照需求文件和任务文件，多维度对当前实现排查逻辑/规范/Bug。

更详细和内部的机制参考：`skills/spec-dev/SKILL.md`。

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
