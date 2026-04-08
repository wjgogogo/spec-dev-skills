---
name: wj-xhs-images
description: 生成小红书图文系列或独立专业信息图。XHS 模式生成 1-10 张卡通风格图片系列；Infographic 模式生成单张高密度信息图。当用户提到"小红书图片""XHS""RedNote""信息图""infographic""做套图""图文笔记""知识卡片""高密度信息大图""可视化笔记""做张信息图""make an infographic"时使用。即使用户只说"做几张小红书的图"或"把这篇文章做成信息图"也应触发。
dependencies:
  - wj-imagine
---

# 视觉内容生成器

支持两种模式：XHS 多图系列和独立信息图。

## 用法

```bash
# XHS 模式（默认）
/wj-xhs-images posts/article.md
/wj-xhs-images posts/article.md --style notion --layout dense
/wj-xhs-images posts/article.md --preset knowledge-card
/wj-xhs-images posts/article.md --yes

# Infographic 模式
/wj-xhs-images posts/article.md --mode infographic
/wj-xhs-images posts/article.md --mode infographic --layout bento-grid --style craft-handmade
/wj-xhs-images posts/article.md --mode infographic --aspect portrait

# 直接输入内容
/wj-xhs-images --style bold --layout comparison
[粘贴内容]
```

## 选项

| 选项 | 说明 |
|------|------|
| `--mode <xhs\|infographic>` | 生成模式（默认: xhs） |
| `--style <name>` | 视觉风格（见下方画廊） |
| `--layout <name>` | 信息布局（见下方画廊） |
| `--preset <name>` | 风格 + 布局快捷方式（XHS 模式，见 [Style Presets](references/style-presets.md)） |
| `--aspect <ratio>` | 宽高比（infographic 模式: landscape/portrait/square 或 W:H） |
| `--lang <code>` | 内容语言（en, zh, ja 等） |
| `--yes` | 非交互模式: 跳过确认，使用自动推荐方案 |

---

## XHS 模式（默认）

将内容拆分为 1-10 张卡通风格图片，适用于小红书平台发布。

### XHS 风格画廊

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

详细风格定义: `references/presets/<style>.md`

### XHS 布局画廊

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

### XHS 预设

24 个快捷预设，覆盖 5 大场景。使用 `--preset <name>`。

| 场景 | 代表性预设 |
|------|-----------|
| 知识学习 | `knowledge-card`, `study-notes`, `how-to-guide` |
| 生活分享 | `daily-life`, `food-diary`, `travel-log` |
| 观点输出 | `hot-take`, `deep-dive`, `myth-busting` |
| 潮流娱乐 | `trend-alert`, `meme-style`, `fan-culture` |
| 海报编辑 | `event-poster`, `quote-card`, `product-showcase` |

完整列表和定义: [references/style-presets.md](references/style-presets.md)

### XHS 自动选择与兼容性

根据内容信号自动推荐 style + layout 组合。包含自动选择规则、11x8 兼容性矩阵和 3 种大纲策略（故事驱动 / 信息密集 / 视觉优先）。

详见: [references/xhs-selection-guide.md](references/xhs-selection-guide.md)

### XHS 文件结构

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

---

## Infographic 模式

生成单张专业信息图，支持 21 种布局 x 20 种风格。

### Infographic 风格画廊

| 风格 | 说明 |
|------|------|
| `craft-handmade` | 手绘剪纸风格（默认） |
| `claymation` | 3D 粘土定格动画 |
| `kawaii` | 日系可爱，柔和配色 |
| `storybook-watercolor` | 水彩故事书风格 |
| `chalkboard` | 黑板粉笔画 |
| `cyberpunk-neon` | 霓虹灯光，未来感 |
| `bold-graphic` | 漫画风，半调纹理 |
| `aged-academia` | 复古科学，棕褐色调 |
| `corporate-memphis` | 扁平矢量，鲜艳色彩 |
| `technical-schematic` | 蓝图工程风格 |
| `origami` | 折纸几何风格 |
| `pixel-art` | 复古 8-bit 像素风 |
| `ui-wireframe` | 灰度界面线框图 |
| `subway-map` | 地铁线路图风格 |
| `ikea-manual` | 极简线条插画 |
| `knolling` | 整齐俯拍排列 |
| `lego-brick` | 乐高积木风格 |
| `pop-laboratory` | 蓝图网格，实验室精密感 |
| `morandi-journal` | 手绘涂鸦，莫兰迪暖色调 |
| `retro-pop-grid` | 1970s 复古波普，瑞士网格 |

完整定义: `references/infographic-styles/<style>.md`

### Infographic 布局画廊

| 布局 | 适用场景 |
|------|----------|
| `linear-progression` | 时间线、流程、教程 |
| `binary-comparison` | A vs B、前后对比、优劣对比 |
| `comparison-matrix` | 多因素对比 |
| `hierarchical-layers` | 金字塔、优先级层级 |
| `tree-branching` | 分类、分类学 |
| `hub-spoke` | 中心概念与关联要素 |
| `structural-breakdown` | 爆炸视图、剖面图 |
| `bento-grid` | 多主题概览（默认） |
| `iceberg` | 表面与隐藏层面 |
| `bridge` | 问题-解决方案 |
| `funnel` | 转化漏斗、过滤 |
| `isometric-map` | 空间关系 |
| `dashboard` | 指标、KPI |
| `periodic-table` | 分类集合 |
| `comic-strip` | 叙事、序列 |
| `story-mountain` | 情节结构、张力弧线 |
| `jigsaw` | 互相关联的部分 |
| `venn-diagram` | 重叠概念 |
| `winding-roadmap` | 旅程、里程碑 |
| `circular-flow` | 循环、周期性流程 |
| `dense-modules` | 高密度模块、数据密集指南 |

完整定义: `references/infographic-layouts/<layout>.md`

### Infographic 选择指南

推荐组合（按内容类型匹配 layout + style）和关键词快捷方式。默认: `bento-grid` + `craft-handmade`。

详见: [references/infographic-guide.md](references/infographic-guide.md)

### Infographic 文件结构

```
infographic/{topic-slug}/
+-- source-{slug}.{ext}
+-- analysis.md
+-- structured-content.md
+-- prompts/infographic.md
+-- infographic.png
```

---

## 统一工作流

### 进度清单

```
视觉内容进度:
- [ ] Step 0: 检查偏好配置 (EXTEND.md)
- [ ] Step 1: 分析内容 -> analysis.md
- [ ] Step 2: 确认选项
- [ ] Step 3: 生成图片
- [ ] Step 4: 完成报告
```

### Step 0: 环境检查 + 加载偏好

**前置检查**: 确认 wj-imagine skill 可用（它是生图的底层引擎）。如果不可用，提示用户安装后再继续。

偏好配置影响默认风格、水印、语言等，需要在生图前完成加载。

查找顺序（后者被前者覆盖）:
1. `$HOME/.wj-skills/global/EXTEND.md`（全局共享，API key、默认画质等）
2. `$HOME/.wj-skills/xhs-images/EXTEND.md`（用户级）
3. `.wj-skills/xhs-images/EXTEND.md`（项目级，最高优先）

- 找到 -> 加载并显示摘要
- 未找到（交互模式）-> 运行首次设置 ([first-time-setup.md](references/config/first-time-setup.md))
- 未找到（`--yes`）-> 使用内置默认值

Schema: [references/config/preferences-schema.md](references/config/preferences-schema.md)

### Step 1: 分析内容 -> `analysis.md`

**两种模式通用**:
1. 保存源内容（文件路径或粘贴 -> `source.md`）
2. 分析: 主题、数据类型、复杂度、语气、受众
3. 检测源语言和用户语言
4. 保存分析结果到 `analysis.md`

**XHS 模式附加分析**:
- 内容类型分类
- Hook 分析
- 互动潜力评估
- 视觉机会映射
- 自动推荐策略 + 风格 + 布局 + 图片数量

详见 `references/workflows/analysis-framework.md`。

**Infographic 模式附加分析**:
- 学习目标
- 数据结构分类
- 复杂度评估

详见 `references/infographic-analysis-framework.md`。

### Step 2: 确认选项

**XHS 模式** - 智能确认（使用 AskUserQuestion）:

| 选项 | 说明 |
|------|------|
| 快速（推荐） | 信任自动推荐，立即执行 |
| 自定义 | 调整策略/风格/布局/数量 |
| 详细 | 生成 3 套大纲（A/B/C 策略），然后选择。token 消耗较高，适合重要内容 |

- **快速**: 生成大纲 -> `outline.md` -> Step 3
- **自定义**: 调整选项 -> 生成大纲 -> Step 3
- **详细**: 生成 3 套大纲变体 (strategy-a/b/c) -> 二次确认 -> 合并到 `outline.md` -> Step 3

策略详情见 [references/xhs-selection-guide.md](references/xhs-selection-guide.md)。

**Infographic 模式** - 单次 AskUserQuestion:

| 问题 | 选项 |
|------|------|
| 组合 | 3-5 个 layout x style 组合及理由 |
| 宽高比 | landscape/portrait/square 或自定义 W:H |
| 语言 | 仅在源语言与用户语言不同时询问 |

确认后生成结构化内容 -> `structured-content.md`

### Step 3: 生成图片

**XHS 模式** - 带参考图链式顺序生成:
1. 生成图片 1（封面）不带 `--ref`（建立视觉锚点）
2. 生成图片 2-N 带 `--ref <path-to-image-01.png>` 保持一致性
3. 保存 prompt 到 `prompts/NN-{type}-[slug].md`
4. 使用 wj-imagine skill 生成
5. 单张失败时自动重试一次；重试仍失败则跳过该张并继续后续图片，最终报告中标注失败项

**Infographic 模式** - 单张图片:
1. 生成 prompt -> `prompts/infographic.md`
2. 组合: 布局定义 + 风格定义 + 基础模板 + 结构化内容
3. 使用 wj-imagine skill 生成
4. 失败时自动重试一次

**水印**（如在偏好中启用）:
按 `references/config/watermark-guide.md` 将水印指令添加到 prompt。

### Step 4: 完成报告

**XHS 模式**:
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

**Infographic 模式**:
```
信息图完成!

主题: [topic]
布局: [layout] | 风格: [style]
宽高比: [ratio] | 语言: [lang]
位置: [directory path]

文件:
- analysis.md
- structured-content.md
- prompts/infographic.md
- infographic.png
```

## 图片修改

| 操作 | 步骤 |
|------|------|
| **编辑** | 先更新 prompt 文件 -> 重新生成 |
| **添加**（XHS） | 创建 prompt -> 生成 -> 重新编号文件 |
| **删除**（XHS） | 删除文件 -> 重新编号 |

## 内容拆分原则（XHS 模式）

1. **封面（图片 1）**: Hook + 视觉冲击力 -> `sparse` 布局
2. **正文（中间）**: 每张图一个核心价值点 -> `balanced`/`dense`/`list`/`comparison`/`flow`
3. **结尾（最后一张）**: CTA / 总结 -> `sparse` 或 `balanced`

## 核心原则（Infographic 模式）

- 忠实保留源数据 -- 不做摘要或改写
- 输出前剔除任何凭证、API 密钥、token 或敏感信息
- 先定义学习目标，再组织内容结构
- 按视觉传达要求组织（标题、标签、视觉元素）

## 参考资料

**XHS 选择**: [xhs-selection-guide.md](references/xhs-selection-guide.md)（自动选择、兼容性矩阵、大纲策略）
**XHS 元素**: [canvas.md](references/elements/canvas.md) | [image-effects.md](references/elements/image-effects.md) | [typography.md](references/elements/typography.md) | [decorations.md](references/elements/decorations.md)
**XHS 预设**: [style-presets.md](references/style-presets.md) | [references/presets/](references/presets/)
**XHS 工作流**: [analysis-framework.md](references/workflows/analysis-framework.md) | [outline-template.md](references/workflows/outline-template.md) | [prompt-assembly.md](references/workflows/prompt-assembly.md)
**Infographic 指南**: [infographic-guide.md](references/infographic-guide.md)（推荐组合、关键词快捷方式）
**Infographic 风格**: [references/infographic-styles/](references/infographic-styles/)
**Infographic 布局**: [references/infographic-layouts/](references/infographic-layouts/)
**Infographic 模板**: [infographic-base-prompt.md](references/infographic-base-prompt.md) | [structured-content-template.md](references/structured-content-template.md) | [infographic-analysis-framework.md](references/infographic-analysis-framework.md)
**配置**: [preferences-schema.md](references/config/preferences-schema.md) | [first-time-setup.md](references/config/first-time-setup.md) | [watermark-guide.md](references/config/watermark-guide.md)

## 扩展支持

通过 EXTEND.md 自定义配置。详见 **Step 0** 中的路径和支持选项。
