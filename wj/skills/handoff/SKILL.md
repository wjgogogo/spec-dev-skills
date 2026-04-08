---
name: wj-handoff
description: 当会话即将结束、用户说"交接一下""生成 handoff""我要下了""收工""保存上下文""总结一下今天的进度""留个记录给下次""wrap up""明天继续""先到这""下次接着做"时使用。生成结构化的 HANDOFF.md 交接文档，为下一个 agent 或人类留下可继续执行的上下文快照。
---

# Handoff

生成跨会话、跨 agent、跨人的结构化交接文档。记录当前任务的即时状态和下一步操作，用完即弃。与 memory 的区别: memory 存长期偏好，HANDOFF.md 存短期任务快照。

## 默认文件

- 优先写入：`./HANDOFF.md`
- 若不存在则创建该文件

## 执行步骤

1. 收集当前会话所有任务状态（通过 TaskList 获取）
2. 检查 git 工作区状态，记录未提交的变更
3. 将信息写入 `./HANDOFF.md`

## 必填结构

```md
## Session Handoff (YYYY-MM-DD HH:mm)

### Goal
- 本次会话的目标

### Completed
- [x] 已完成的任务及关键产出

### Unfinished
- [ ] 未完成任务 — 当前卡在哪里 / 已完成到哪一步
  - 相关文件: `path/to/file`
  - 上下文: 简要说明已有进展和阻塞原因

### Key Decisions
- [决策内容] — 原因: [为什么这样选择]

### Uncommitted Changes
- `path/to/file` — 变更说明

### Next Action
- 新会话应首先执行的具体操作（含命令或文件路径）
```

## 约束

- 只写事实，不写推测
- Unfinished 每项必须包含：当前进度、阻塞原因、相关文件路径
- Uncommitted Changes 通过 `git status` 和 `git diff --stat` 获取，确保不遗漏
- 若存在失败验证，必须写明失败点与复现命令
- Next Action 必须具体到可直接执行，不写模糊指引
