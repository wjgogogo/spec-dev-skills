---
name: wj-imagine
description: 生成 AI 图片，支持文字描述生成图、参考图片、多种宽高比和批量生成。当用户要求"生成图片""画一张图""生成一张 XX 的图""create an image""generate a picture"、或任何需要 AI 生图的场景时使用。这是通用图片生成能力，wj-cover-image 和 wj-xhs-images 等 skill 在生图时会调用此 skill。
---

# 图片生成 (Gemini)

使用 Google Gemini API 生成图片，默认模型: **gemini-3.1-flash-image-preview**。

## 脚本目录

**Agent 执行**:
1. `{baseDir}` = 本 SKILL.md 文件所在目录
2. 脚本路径 = `{baseDir}/scripts/main.ts`
3. 解析 `${BUN_X}` 运行时: 已安装 `bun` -> `bun`; 有 `npx` -> `npx -y bun`; 否则建议安装 bun

## Step 0: 加载偏好

偏好配置决定默认画质、宽高比等，需要在生图前完成加载。没有偏好文件时会先引导用户完成首次设置，否则生成的图片可能不符合用户期望。

查找顺序（后者被前者覆盖）:
1. `$HOME/.wj-skills/global/EXTEND.md`（全局共享，API key、默认画质等）
2. `$HOME/.wj-skills/imagine/EXTEND.md`（用户级）
3. `.wj-skills/imagine/EXTEND.md`（项目级，最高优先）

- 找到 -> 加载并应用设置
- 未找到 -> 运行首次设置 ([first-time-setup.md](references/config/first-time-setup.md))，通过 AskUserQuestion 收集画质、保存路径，创建 EXTEND.md 后再继续

支持配置项: 默认画质 | 默认宽高比 | 批量并发数 | 批量上限

Schema: [references/config/preferences-schema.md](references/config/preferences-schema.md)

## 用法

```bash
# 基础用法
${BUN_X} {baseDir}/scripts/main.ts --prompt "一只猫" --image cat.png

# 指定宽高比
${BUN_X} {baseDir}/scripts/main.ts --prompt "风景画" --image out.png --ar 16:9

# 高画质
${BUN_X} {baseDir}/scripts/main.ts --prompt "一只猫" --image out.png --quality 2k

# 从 prompt 文件读取
${BUN_X} {baseDir}/scripts/main.ts --promptfiles system.md content.md --image out.png

# 带参考图
${BUN_X} {baseDir}/scripts/main.ts --prompt "改成蓝色" --image out.png --ref source.png

# 批量模式
${BUN_X} {baseDir}/scripts/main.ts --batchfile batch.json

# 批量模式 + 指定并发数
${BUN_X} {baseDir}/scripts/main.ts --batchfile batch.json --jobs 4 --json
```

### 批量文件格式

```json
{
  "jobs": 4,
  "tasks": [
    {
      "id": "hero",
      "promptFiles": ["prompts/hero.md"],
      "image": "out/hero.png",
      "ar": "16:9",
      "quality": "2k"
    },
    {
      "id": "diagram",
      "promptFiles": ["prompts/diagram.md"],
      "image": "out/diagram.png",
      "ref": ["references/original.png"]
    }
  ]
}
```

批量文件中的 `promptFiles`、`image`、`ref` 路径相对于批量文件所在目录解析。`jobs` 可选（CLI `--jobs` 优先）。也支持顶层数组格式（不带 `jobs` 包装）。

## 选项

| 选项 | 说明 |
|------|------|
| `--prompt <text>`, `-p` | 提示词文本 |
| `--promptfiles <files...>` | 从文件读取提示词（多个文件拼接） |
| `--image <path>` | 输出图片路径（单图模式必需） |
| `--batchfile <path>` | 批量生成 JSON 文件 |
| `--jobs <count>` | 批量模式并发数（默认: 自动，上限由配置决定，内置默认 10） |
| `--model <id>`, `-m` | 模型 ID（默认: `gemini-3.1-flash-image-preview`） |
| `--ar <ratio>` | 宽高比（如 `16:9`, `1:1`, `4:3`） |
| `--quality normal\|2k` | 画质预设（默认: `2k`） |
| `--ref <files...>` | 参考图片 |
| `--n <count>` | 生成数量 |
| `--json` | JSON 输出 |

## 环境变量

| 变量 | 说明 |
|------|------|
| `GEMINI_API_KEY` | Google Gemini API 密钥（必需）。获取地址: https://aistudio.google.com/apikey |

**加载优先级**: CLI 参数 > EXTEND.md > 环境变量 > `<cwd>/.wj-skills/.env` > `~/.wj-skills/.env`

## 画质预设

| 预设 | 分辨率 | 适用场景 |
|------|--------|----------|
| `normal` | 1K | 快速预览 |
| `2k` (默认) | 2K | 封面、插画、信息图 |

## 宽高比

支持: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `2.35:1`

带参考图且未指定 `--ar` 时，默认匹配参考图比例。

## 生成模式

**默认**: 顺序生成。

**批量并行生成**: `--batchfile` 包含 2 个及以上任务时自动启用并行。

| 模式 | 适用场景 |
|------|----------|
| 顺序（默认） | 日常使用、单张图片、小批量 |
| 并行批量 | 批量模式，2+ 任务 |

并行行为:

- 默认并发数自动确定，受配置上限约束，内置默认 10
- 仅批量模式启用限速
- 可通过 `--jobs <count>` 覆盖并发数
- 每张图片自动重试最多 3 次
- 最终输出包括成功数、失败数及每张失败原因

## 错误处理

- 缺少 API 密钥 -> 报错并提示设置方法
- 生成失败 -> 自动重试最多 3 次
- 无效宽高比 -> 警告，使用默认值
- 参考图未找到 -> 报错并显示路径

## 扩展支持

通过 EXTEND.md 自定义配置。详见 **Step 0** 中的路径和支持选项。
