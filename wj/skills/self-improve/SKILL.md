---
name: wj-self-improve
description: 当用户要求将规则写入项目配置文件（CLAUDE.md / AGENTS.md）时使用。适用于"写进 CLAUDE.md""更新规则""加条规范""项目里加个约束"等明确指向项目级持久化规则的场景。与 auto memory 的区别：memory 存个人偏好和跨项目经验，self-improve 写当前项目的团队规范。如果用户只说"记住这个"而没指定写入 CLAUDE.md，优先使用 auto memory 而非此 skill。
---

# Self Improve

将可泛化的**项目级规范**沉淀到 CLAUDE.md / AGENTS.md，供团队所有成员和 agent 共同遵守。

与 auto memory 的分工：
- **auto memory**: 个人偏好、跨项目经验、用户画像（存 memory 目录）
- **self-improve**: 项目级约束、团队规范、代码风格规则（写 CLAUDE.md / AGENTS.md）

判断依据：如果这条规则只对"我"有用 -> memory；如果切换到别的 agent 也该遵守 -> self-improve。

## 触发时机

- 用户明确要求写入 CLAUDE.md / AGENTS.md
- 用户对同一类**项目级**问题纠正 2 次及以上，且该规则适用于所有协作者
- 用户说"项目里加个约束""团队规范里补一条"

## 执行步骤

1. 回顾当前会话，识别以下信号：
   - 用户重复纠正的行为（如格式、流程、命名等）
   - 明确的偏好指令（"不要...""总是..."）
   - 导致返工的错误模式
2. 将每条经验提炼为一条可执行的规则，格式：`- <做什么/不做什么> — 原因`
3. 判断写入目标文件：
   - Claude Code 项目 → `CLAUDE.md`
   - Codex 项目 → `AGENTS.md`
   - 若两者都存在，写入与当前工具链匹配的文件
   - 若都不存在，创建 `CLAUDE.md`
4. 写入前先读取目标文件，检查是否已有相同或冲突的规则
   - 已有相同规则 → 跳过
   - 已有冲突规则 → 提示用户确认后更新
   - 无相关规则 → 追加到合适的分类下
5. 向用户确认写入内容

## 规则格式

写入目标文件时，归类到对应区块下：

```md
## <分类名称>
- <规则描述> — <原因/来源>
```

分类参考：Communication Guidelines / Code Philosophy / Workflow / Constraints

## 约束

- 只记录可泛化的行为规则，不记录一次性的任务细节
- 每条规则必须附带原因，便于后续判断是否仍然适用
- 不重复写入已存在的规则
- 不擅自删除或修改已有规则，仅追加
