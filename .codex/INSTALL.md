# Installing for Codex

通过原生 skill 发现机制，在 Codex 中启用本项目的全部技能。克隆仓库并创建符号链接即可。

## 前置条件

- OpenAI Codex CLI
- Git

## 安装

1. **克隆仓库:**
   ```bash
   git clone https://github.com/wjgogogo/spec-dev-skills.git ~/.codex/spec-dev
   ```

2. **创建 skills 符号链接:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/spec-dev/spec/skills ~/.agents/skills/spec-dev
   ln -s ~/.codex/spec-dev/wj/skills ~/.agents/skills/wj
   ```

   **Windows (PowerShell):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\spec-dev" "$env:USERPROFILE\.codex\spec-dev\spec\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\wj" "$env:USERPROFILE\.codex\spec-dev\wj\skills"
   ```

3. **配置 MCP Server (可选):**

   项目使用以下 MCP 服务，在 Codex 配置中添加:

   ```json
   {
     "mcpServers": {
       "chrome-devtools": {
         "type": "stdio",
         "command": "npx",
         "args": ["-y", "chrome-devtools-mcp@latest", "--autoConnect", "--no-usage-statistics"]
       },
       "context7": {
         "type": "stdio",
         "command": "npx",
         "args": ["-y", "@upstash/context7-mcp@latest"]
       }
     }
   }
   ```

   - **chrome-devtools** - 通过 Chrome DevTools Protocol 操控浏览器，用于前端调试和测试
   - **context7** - 查询最新的第三方库文档，避免使用过时的 API

4. **重启 Codex** (退出并重新启动 CLI) 以发现技能。

## 包含的技能

### spec-dev -- Spec 驱动开发

- **brainstorm** - 在写规格前澄清目标、约束、边界和方案
- **write-spec** - 通过交互式提问生成 EARS 需求文档
- **dev** - 根据需求文档生成可执行的任务册
- **review** - 对照需求文件多维度审查当前实现
- **debug** - 系统化调试
- **parallel** - 并行任务调度
- **workflow** - 完整的 Spec 驱动开发工作流

### wj -- 通用开发工具

- **commit** - Git 提交消息生成
- **write** - 文档润色与排版优化
- **handoff** - 任务交接
- **excalidraw** - Excalidraw 图表生成
- **imagine** - AI 图片生成
- **cover-image** - 封面图片生成
- **xhs-images** - 小红书图文生成
- **self-improve** - 技能自我改进

## 验证

```bash
ls -la ~/.agents/skills/spec-dev
ls -la ~/.agents/skills/wj
```

应该看到符号链接 (Windows 上为 junction) 分别指向对应的 skills 目录。

## 更新

```bash
cd ~/.codex/spec-dev && git pull
```

两组技能共享同一仓库，通过符号链接即时更新。

## 卸载

移除符号链接:

```bash
rm ~/.agents/skills/spec-dev
rm ~/.agents/skills/wj
```

**Windows (PowerShell):**
```powershell
Remove-Item "$env:USERPROFILE\.agents\skills\spec-dev"
Remove-Item "$env:USERPROFILE\.agents\skills\wj"
```

如需完全清理，同时删除克隆目录:

```bash
rm -rf ~/.codex/spec-dev
```
