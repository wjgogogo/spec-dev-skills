---
name: wj-xhs-images
description: 生成小红书图文系列（1-10 张卡通风格图片）。当用户提到"小红书图片""XHS""RedNote""做套图""图文笔记""knowledge series"时使用。即使用户只说"做几张小红书的图"也应触发。单张信息图请用 wj-visual。
dependencies:
  - wj-imagine
---

# 小红书系列图生成器

将文章拆为 1-10 张卡通风格图片系列，适用于小红书平台发布。

> **单张信息图请改用 [`wj-visual`](../visual/SKILL.md) 的 infographic 场景**。本 skill 专做"多图叙事"。

## 用法

```bash
# 默认（按内容自动推荐策略）
/wj-xhs-images posts/article.md

# 指定风格 / 布局
/wj-xhs-images posts/article.md --style notion --layout dense

# 使用预设
/wj-xhs-images posts/article.md --preset knowledge-card

# 非交互模式
/wj-xhs-images posts/article.md --yes

# 直接输入内容
/wj-xhs-images --style bold --layout comparison
[粘贴内容]
```

## 选项

| 选项 | 说明 |
|------|------|
| `--style <name>` | 视觉风格（见下方画廊） |
| `--layout <name>` | 信息布局（见下方画廊） |
| `--preset <name>` | 风格 + 布局快捷方式（见 [Style Presets](references/style-presets.md)） |
| `--aspect <ratio>` | 宽高比 |
| `--lang <code>` | 内容语言（en, zh, ja 等） |
| `--yes` | 跳过确认，使用自动推荐方案 |

## 风格画廊

| 风格 | 说明 |
|------|------|
| `cute`（默认） | 甜美可爱 - 经典小红书风格 |
| `fresh` | 清新自然 |
| `warm` | 温馨友好 |
| `bold` | 高冲击力，吸引眼球 |
| `minimal` | 极简精致 |
| `retro` | 复古怀旧 |
| `pop` | 活力四射 |
| `notion` | 极简手绘线条，知性风格 |
| `chalkboard` | 黑板上的彩色粉笔画，教育风 |
| `study-notes` | 真实手写笔记照片风格 |
| `screen-print` | 大胆海报风，半调纹理，有限色彩 |

详细风格定义：`references/presets/<style>.md`

## 布局画廊

| 布局 | 说明 |
|------|------|
| `sparse`（默认） | 最少信息，最大冲击力（1-2 个要点） |
| `balanced` | 标准内容布局（3-4 个要点） |
| `dense` | 高信息密度，知识卡片风格（5-8 个要点） |
| `list` | 列举和排名格式（4-7 项） |
| `comparison` | 并排对比布局 |
| `flow` | 流程和时间线布局（3-6 步） |
| `mindmap` | 中心辐射思维导图布局（4-8 分支） |
| `quadrant` | 四象限 / 圆形分区布局 |

## 预设

24 个快捷预设，覆盖 5 大场景。使用 `--preset <name>`。

| 场景 | 代表性预设 |
|------|-----------|
| 知识学习 | `knowledge-card`, `study-notes`, `how-to-guide` |
| 生活分享 | `daily-life`, `food-diary`, `travel-log` |
| 观点输出 | `hot-take`, `deep-dive`, `myth-busting` |
| 潮流娱乐 | `trend-alert`, `meme-style`, `fan-culture` |
| 海报编辑 | `event-poster`, `quote-card`, `product-showcase` |

完整列表和定义：[references/style-presets.md](references/style-presets.md)

## 自动选择与兼容性

根据内容信号自动推荐 style + layout 组合。包含自动选择规则、11×8 兼容性矩阵和 3 种大纲策略（故事驱动 / 信息密集 / 视觉优先）。

详见：[references/xhs-selection-guide.md](references/xhs-selection-guide.md)

## 文件结构

```
xhs-images/{topic-slug}/
+-- source-{slug}.{ext}
+-- analysis.md
+-- outline-strategy-a.md (详细模式)
+-- outline-strategy-b.md (详细模式)
+-- outline-strategy-c.md (详细模式)
+-- outline.md
+-- prompts/
|   +-- 01-cover-[slug].md
|   +-- 02-content-[slug].md
+-- 01-cover-[slug].png
+-- 02-content-[slug].png
+-- NN-ending-[slug].png
```

## 工作流

### 进度清单

```
小红书系列图进度:
- [ ] Step 0: 检查偏好配置 (EXTEND.md)
- [ ] Step 1: 分析内容 -> analysis.md
- [ ] Step 2: 确认选项（快速 / 自定义 / 详细 3 套大纲）
- [ ] Step 3: 链式生成图片
- [ ] Step 4: 完成报告
```

### Step 0: 环境检查 + 加载偏好

**前置检查**：确认 wj-imagine skill 可用（底层生图引擎）。

偏好配置影响默认风格、水印、语言等：

查找顺序（后者被前者覆盖）：
1. `$HOME/.wj-skills/global/EXTEND.md`（全局共享）
2. `$HOME/.wj-skills/xhs-images/EXTEND.md`（用户级）
3. `.wj-skills/xhs-images/EXTEND.md`（项目级，最高优先）

- 找到 → 加载并显示摘要
- 未找到（交互模式）→ 运行首次设置 [references/config/first-time-setup.md](references/config/first-time-setup.md)
- 未找到（`--yes`）→ 使用内置默认值

Schema：[references/config/preferences-schema.md](references/config/preferences-schema.md)

### Step 1: 分析内容 → `analysis.md`

1. 保存源内容（文件路径或粘贴 → `source.md`）
2. 分析：主题、数据类型、复杂度、语气、受众、内容类型分类、Hook、互动潜力、视觉机会
3. 检测源语言和用户语言
4. 自动推荐策略 + 风格 + 布局 + 图片数量

详见：[references/workflows/analysis-framework.md](references/workflows/analysis-framework.md)

### Step 2: 确认选项

使用 AskUserQuestion：

| 选项 | 说明 |
|------|------|
| 快速（推荐） | 信任自动推荐，立即执行 |
| 自定义 | 调整策略 / 风格 / 布局 / 数量 |
| 详细 | 生成 3 套大纲（A/B/C 策略），二次选择。token 消耗较高，适合重要内容 |

- **快速**：生成大纲 → `outline.md` → Step 3
- **自定义**：调整选项 → 生成大纲 → Step 3
- **详细**：生成 3 套大纲变体（strategy-a/b/c）→ 二次确认 → 合并到 `outline.md` → Step 3

策略详情：[references/xhs-selection-guide.md](references/xhs-selection-guide.md)

### Step 3: 生成图片（链式 ref）

1. 生成图片 1（封面）不带 `--ref`（建立视觉锚点）
2. 生成图片 2-N 带 `--ref <path-to-image-01.png>` 保持一致性
3. 保存 prompt 到 `prompts/NN-{type}-[slug].md`
4. 调用 wj-imagine skill 生成
5. 单张失败时自动重试一次；重试仍失败则跳过并继续后续图片，最终报告中标注失败项

**水印**（如启用）：按 [references/config/watermark-guide.md](references/config/watermark-guide.md) 将水印指令追加到 prompt。

### Step 4: 完成报告

```
小红书图文系列完成!

主题: [topic]
策略: [A/B/C]
风格: [style] | 布局: [layout]
位置: [directory path]
图片: 共 N 张

文件:
- 01-cover-[slug].png
- 02-content-[slug].png
- ...
- NN-ending-[slug].png
```

## 图片修改

| 操作 | 步骤 |
|------|------|
| **编辑** | 先更新 prompt 文件 → 重新生成 |
| **添加** | 创建 prompt → 生成 → 重新编号文件 |
| **删除** | 删除文件 → 重新编号 |

## 内容拆分原则

1. **封面（图片 1）**：Hook + 视觉冲击力 → `sparse` 布局
2. **正文（中间）**：每张图一个核心价值点 → `balanced` / `dense` / `list` / `comparison` / `flow`
3. **结尾（最后一张）**：CTA / 总结 → `sparse` 或 `balanced`

## 参考资料

**选择策略**：[xhs-selection-guide.md](references/xhs-selection-guide.md)（自动选择、兼容性矩阵、大纲策略）
**视觉元素**：[canvas.md](references/elements/canvas.md) | [image-effects.md](references/elements/image-effects.md) | [typography.md](references/elements/typography.md) | [decorations.md](references/elements/decorations.md)
**预设**：[style-presets.md](references/style-presets.md) | [presets/](references/presets/)
**工作流**：[analysis-framework.md](references/workflows/analysis-framework.md) | [outline-template.md](references/workflows/outline-template.md) | [prompt-assembly.md](references/workflows/prompt-assembly.md)
**配置**：[preferences-schema.md](references/config/preferences-schema.md) | [first-time-setup.md](references/config/first-time-setup.md) | [watermark-guide.md](references/config/watermark-guide.md)

## 扩展支持

通过 EXTEND.md 自定义配置。详见 **Step 0** 中的路径和支持选项。
