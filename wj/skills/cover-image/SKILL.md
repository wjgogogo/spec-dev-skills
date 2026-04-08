---
name: wj-cover-image
description: 为技术文章或博客生成封面图片，支持 5 维定制（type、palette、rendering、text、mood）。当用户要求"生成封面图""创建文章封面""做个封面""blog cover""文章头图""banner 图""给这篇文章配个图"时使用。即使用户只说"封面"或"cover"也应触发。
dependencies:
  - wj-imagine
---

# 封面图片生成器

为文章生成精美封面图片，支持 5 维定制。

## 用法

```bash
# 根据内容自动选择维度
/wj-cover-image path/to/article.md

# 快速模式: 跳过确认
/wj-cover-image article.md --quick

# 指定维度
/wj-cover-image article.md --type conceptual --palette warm --rendering flat-vector

# 风格预设（palette + rendering 快捷方式）
/wj-cover-image article.md --style blueprint

# 带参考图
/wj-cover-image article.md --ref style-ref.png

# 直接输入内容
/wj-cover-image --palette mono --aspect 1:1 --quick
[粘贴内容]
```

## 选项

| 选项 | 说明 |
|------|------|
| `--type <name>` | hero, conceptual, typography, metaphor, scene, minimal |
| `--palette <name>` | warm, elegant, cool, dark, earth, vivid, pastel, mono, retro, duotone |
| `--rendering <name>` | flat-vector, hand-drawn, painterly, digital, pixel, chalk, screen-print |
| `--style <name>` | 预设快捷方式（见 [Style Presets](references/style-presets.md)） |
| `--text <level>` | none, title-only, title-subtitle, text-rich |
| `--mood <level>` | subtle, balanced, bold |
| `--font <name>` | clean, handwritten, serif, display |
| `--aspect <ratio>` | 16:9（默认）, 2.35:1, 4:3, 3:2, 1:1, 3:4 |
| `--lang <code>` | 标题语言（en, zh, ja 等） |
| `--no-title` | `--text none` 的别名 |
| `--quick` | 跳过确认，使用自动选择 |
| `--ref <files...>` | 参考图片，用于风格/构图参考 |

## 五个维度

| 维度 | 可选值 | 默认值 |
|------|--------|--------|
| **Type** | hero, conceptual, typography, metaphor, scene, minimal | auto |
| **Palette** | warm, elegant, cool, dark, earth, vivid, pastel, mono, retro, duotone | auto |
| **Rendering** | flat-vector, hand-drawn, painterly, digital, pixel, chalk, screen-print | auto |
| **Text** | none, title-only, title-subtitle, text-rich | title-only |
| **Mood** | subtle, balanced, bold | balanced |
| **Font** | clean, handwritten, serif, display | clean |

自动选择规则: [references/auto-selection.md](references/auto-selection.md)

## 画廊

**Types**: hero, conceptual, typography, metaphor, scene, minimal
-> 详情: [references/types.md](references/types.md)

**Palettes**: warm, elegant, cool, dark, earth, vivid, pastel, mono, retro, duotone
-> 详情: [references/palettes/](references/palettes/)

**Renderings**: flat-vector, hand-drawn, painterly, digital, pixel, chalk, screen-print
-> 详情: [references/renderings/](references/renderings/)

**Text Levels**: none（纯视觉） | title-only（默认） | title-subtitle | text-rich（带标签）
-> 详情: [references/dimensions/text.md](references/dimensions/text.md)

**Mood Levels**: subtle（低对比） | balanced（默认） | bold（高对比）
-> 详情: [references/dimensions/mood.md](references/dimensions/mood.md)

**Fonts**: clean（无衬线） | handwritten | serif | display（粗体装饰）
-> 详情: [references/dimensions/font.md](references/dimensions/font.md)

## 文件结构

输出目录取决于 `default_output_dir` 偏好设置:
- `same-dir`: `{article-dir}/`
- `imgs-subdir`: `{article-dir}/imgs/`
- `independent`（默认）: `cover-image/{topic-slug}/`

```
<output-dir>/
+-- source-{slug}.{ext}    # 源文件
+-- refs/                  # 参考图片（如有）
|   +-- ref-01-{slug}.{ext}
|   +-- ref-01-{slug}.md   # 描述文件
+-- prompts/cover.md       # 生成 prompt
+-- cover.png              # 输出图片
```

**Slug**: 2-4 个词，kebab-case。冲突时追加 `-YYYYMMDD-HHMMSS`

## 工作流

### 进度清单

```
封面图片进度:
- [ ] Step 0: 检查偏好配置 (EXTEND.md) BLOCKING
- [ ] Step 1: 分析内容 + 保存参考图 + 确定输出目录
- [ ] Step 2: 确认选项（6 个维度），除非 --quick
- [ ] Step 3: 创建 prompt
- [ ] Step 4: 生成图片
- [ ] Step 5: 完成报告
```

### Step 0: 环境检查 + 加载偏好

**前置检查**: 确认 wj-imagine skill 可用（它是生图的底层引擎）。如果不可用，提示用户安装后再继续。

偏好配置影响默认维度、水印、输出目录等，需要在生图前完成加载。

查找顺序（后者被前者覆盖）:
1. `$HOME/.wj-skills/global/EXTEND.md`（全局共享，API key、默认画质等）
2. `$HOME/.wj-skills/cover-image/EXTEND.md`（用户级）
3. `.wj-skills/cover-image/EXTEND.md`（项目级，最高优先）

- 找到 -> 加载并显示摘要
- 未找到 -> 运行首次设置 ([first-time-setup.md](references/config/first-time-setup.md))，完成后再进入下一步

### Step 1: 分析内容

1. **保存参考图**（如有）-> [references/workflow/reference-images.md](references/workflow/reference-images.md)
2. **保存源内容**（如粘贴，保存到 `source.md`）
3. **分析内容**: 主题、语气、关键词、视觉隐喻
4. **深度分析参考图**: 提取具体、可操作的元素（详见 reference-images.md）
5. **检测语言**: 对比源内容、用户输入、EXTEND.md 偏好
6. **确定输出目录**: 按文件结构规则

**参考图中的人物**:

如参考图中包含需要出现在封面中的**人物**，将图片复制到 `refs/`，在生成时通过 `--ref` 传入。

详见 [reference-images.md](references/workflow/reference-images.md) 完整决策表。

### Step 2: 确认选项

使用 `AskUserQuestion` 工具让用户交互式选择（而非纯文本表格），每次最多 4 个问题，推荐选项排第一并附理由。

- `--quick` 或 `quick_mode: true` -> 跳过 6 维度确认，仅在未指定 `--aspect` 时询问宽高比
- 所有维度 + `--aspect` 都已指定 -> 全部跳过

详细确认流程: [references/workflow/confirm-options.md](references/workflow/confirm-options.md)

### Step 3: 创建 Prompt

保存到 `prompts/cover.md`。模板: [references/workflow/prompt-template.md](references/workflow/prompt-template.md)

参考图处理:
- 文件保存到 `refs/` 的 -> 加入 frontmatter `references` 列表，写入前确认文件存在
- 仅口头描述风格的 -> 省略 `references`，在正文中详细描述
- 正文中引用参考图元素时，用 "MUST"/"REQUIRED" 标记确保生成时遵循

### Step 4: 生成图片

1. **备份现有** `cover.png`（如重新生成）
2. **处理参考图**（来自 prompt frontmatter）:
   - `direct` 用法（人物、具体构图）-> 通过 `--ref` 传入，生成时直接引用
   - `style` 用法（风格参考）-> 提取配色、渲染手法等特征，追加到 prompt 正文
   - `palette` 用法（色彩参考）-> 提取主色调，追加到 prompt 正文
3. **调用 wj-imagine skill 生成**: `--promptfiles prompts/cover.md --image cover.png --ar <ratio>` + 可选 `--ref`
4. 失败时自动重试一次

### Step 5: 完成报告

```
封面图片生成完成!

主题: [topic]
Type: [type] | Palette: [palette] | Rendering: [rendering]
Text: [text] | Mood: [mood] | Font: [font] | Aspect: [ratio]
标题: [title 或 "纯视觉"]
语言: [lang] | 水印: [enabled/disabled]
参考图: [N 张图 或 "提取风格" 或 "无"]
位置: [directory path]

文件:
- source-{slug}.{ext}
- prompts/cover.md
- cover.png
```

## 图片修改

| 操作 | 步骤 |
|------|------|
| **重新生成** | 备份 -> 先更新 prompt 文件 -> 重新生成 |
| **更改维度** | 备份 -> 确认新值 -> 更新 prompt -> 重新生成 |

## 构图原则

- **留白**: 40-60% 呼吸空间
- **视觉锚点**: 主元素居中或偏左
- **人物**: 简化剪影；禁止写实人物
- **标题**: 使用用户/源内容中的原标题；不得自行编造

## 扩展支持

通过 EXTEND.md 自定义配置（路径见 Step 0）。支持: 水印、默认维度、默认宽高比/输出目录、快速模式、自定义调色盘、语言。

Schema: [references/config/preferences-schema.md](references/config/preferences-schema.md)

## 参考资料

**维度**: [text.md](references/dimensions/text.md) | [mood.md](references/dimensions/mood.md) | [font.md](references/dimensions/font.md)
**Palettes**: [references/palettes/](references/palettes/)
**Renderings**: [references/renderings/](references/renderings/)
**Types**: [references/types.md](references/types.md)
**自动选择**: [references/auto-selection.md](references/auto-selection.md)
**Style Presets**: [references/style-presets.md](references/style-presets.md)
**兼容性**: [references/compatibility.md](references/compatibility.md)
**视觉元素**: [references/visual-elements.md](references/visual-elements.md)
**工作流**: [confirm-options.md](references/workflow/confirm-options.md) | [prompt-template.md](references/workflow/prompt-template.md) | [reference-images.md](references/workflow/reference-images.md)
**配置**: [preferences-schema.md](references/config/preferences-schema.md) | [first-time-setup.md](references/config/first-time-setup.md) | [watermark-guide.md](references/config/watermark-guide.md)
