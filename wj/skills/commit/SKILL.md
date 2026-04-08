---
name: wj-commit
description: 当用户显式调用 /commit 或说"提交代码""commit 一下""暂存并提交""git commit""提交一下代码""帮我提交"时使用。标准化本地 Git 提交流程，生成 Conventional Commits 格式的提交信息。仅在用户明确要求提交时触发，不在随口提到"提交"时自动执行。
---

# Commit

标准化本地 Git 提交流程，使用 Conventional Commits 格式。

## 提交格式

使用 Conventional Commits：

`<type>(<scope>): <简短中文描述>`

- scope 可选，用于标识影响的模块或领域，如 `feat(auth): 添加登录验证`
- breaking change 用 `!` 标记，如 `feat!: 移除旧版认证接口`
- 可选类型：`feat` `fix` `docs` `style` `refactor` `perf` `test` `chore`

## 执行步骤

1. 检查暂存区：`git diff --cached --stat`
2. 判断变更来源：
   - 若暂存区有内容，以暂存区为准，直接进入步骤 4
   - 若暂存区为空，执行 `git diff --stat` 查看工作区变更，提示用户确认要提交的文件后暂存
3. 暂存文件：根据用户确认，使用 `git add <file>` 逐个添加（避免 `git add .`）
4. 查看最终暂存内容：`git diff --cached` 理解变更语义
5. 生成提交信息（中文，动词开头，不超过 50 字）
6. 提交：`git commit -m "<type>: <描述>"`

## 约束

- 不自动提交与当前任务无关的文件
- 未经明确要求，不执行推送和合并
- 发现工作区存在冲突改动时，先说明影响范围再继续
