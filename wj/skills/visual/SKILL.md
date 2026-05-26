---
name: wj-visual
description: 生成单张图片（文章封面、信息图、海报、技术架构图、学术配图、概念插画等所有单图场景）。当用户要求"生成封面图""做个封面""画张信息图""infographic""做张海报""banner""editorial cover""画个架构图""系统架构图""ER 图""时序图""流程图""学术配图""论文配图""pipeline figure""神经网络架构图""graphical abstract""knowledge card""高密度信息大图""可视化笔记""做张图说明 XX""治愈系插画""概念场景图"或任何需要单图输出的场景时使用。即使用户只说"封面""cover""信息图""做张图""画张图"也应触发。多张图系列（小红书图文）请用 wj-xhs-images。
dependencies:
  - wj-imagine
---

# 单图生成器

支持多种单图场景。每个场景有独立的工作流和模板，但共用 skill 级配置与底层生图引擎（wj-imagine）。

## 场景路由

根据用户输入自动选择场景：

| 用户意图 | 场景 | 入口路径 |
|---|---|---|
| 给定文章 → 做封面 | **article-cover** | [references/scenes/article-cover/](references/scenes/article-cover/) |
| 做信息图 / infographic / 知识卡 / 高密度大图 | **infographic** | [references/scenes/infographic/](references/scenes/infographic/) |
| 做海报 / banner / KV / editorial cover | **poster** | [references/scenes/poster/](references/scenes/poster/) |
| 系统架构图 / 流程图 / 时序图 / 状态机 / ER / 思维导图 / 网络拓扑 | **tech-diagram** | [references/scenes/tech-diagram/](references/scenes/tech-diagram/) |
| 论文配图 / pipeline / 神经网络架构 / graphical abstract / 学术海报 | **academic** | [references/scenes/academic/](references/scenes/academic/) |
| 治愈系 / 童书 / 概念场景 / 极简氛围插画 | **illustration** | [references/scenes/illustration/](references/scenes/illustration/) |

不确定时先问用户："要做哪类图？"（列出最相关的 2-3 个场景候选）

## 用法

```bash
# 文章封面（默认场景）
/wj-visual path/to/article.md
/wj-visual article.md --quick --type conceptual --palette warm

# 信息图
/wj-visual article.md --scene infographic
/wj-visual article.md --scene infographic --layout bento-grid --style craft-handmade

# 海报
/wj-visual --scene poster --template editorial-cover

# 技术图
/wj-visual --scene tech-diagram --template system-architecture

# 学术配图
/wj-visual --scene academic --template method-pipeline-overview

# 概念插画
/wj-visual --scene illustration --template healing-scene
```

`--scene` 显式指定场景；`--template` 在 scene 内指定具体模板。不传时按关键词/内容自动判断。

## 通用选项

| 选项 | 说明 |
|------|------|
| `--scene <name>` | 场景：article-cover / infographic / poster / tech-diagram / academic / illustration |
| `--template <name>` | 场景内的具体模板名（见各场景章节） |
| `--aspect <ratio>` | 宽高比（场景默认值不同） |
| `--lang <code>` | 标题/正文语言（en, zh, ja 等） |
| `--quick` / `--yes` | 跳过确认，使用自动推荐 |
| `--ref <files...>` | 参考图片（风格 / 构图 / 配色） |

各场景专属选项见对应章节。

---

## 场景 1：article-cover（文章封面）

为技术文章或博客生成精美封面，支持 5 维定制。

### 专属选项

| 选项 | 说明 |
|------|------|
| `--type <name>` | hero, conceptual, typography, metaphor, scene, minimal |
| `--palette <name>` | warm, elegant, cool, dark, earth, vivid, pastel, mono, retro, duotone |
| `--rendering <name>` | flat-vector, hand-drawn, painterly, digital, pixel, chalk, screen-print |
| `--style <name>` | 预设快捷方式（见 [scenes/article-cover/style-presets.md](references/scenes/article-cover/style-presets.md)） |
| `--text <level>` | none, title-only, title-subtitle, text-rich |
| `--mood <level>` | subtle, balanced, bold |
| `--font <name>` | clean, handwritten, serif, display |
| `--no-title` | `--text none` 的别名 |

默认宽高比：`16:9`

### 五个维度

| 维度 | 可选值 | 默认 |
|------|--------|------|
| **Type** | hero, conceptual, typography, metaphor, scene, minimal | auto |
| **Palette** | warm, elegant, cool, dark, earth, vivid, pastel, mono, retro, duotone | auto |
| **Rendering** | flat-vector, hand-drawn, painterly, digital, pixel, chalk, screen-print | auto |
| **Text** | none, title-only, title-subtitle, text-rich | title-only |
| **Mood** | subtle, balanced, bold | balanced |
| **Font** | clean, handwritten, serif, display | clean |

自动选择规则：[scenes/article-cover/auto-selection.md](references/scenes/article-cover/auto-selection.md)
完整画廊：[types](references/scenes/article-cover/types.md) | [palettes/](references/scenes/article-cover/palettes/) | [renderings/](references/scenes/article-cover/renderings/) | [dimensions/](references/scenes/article-cover/dimensions/) | [style-presets](references/scenes/article-cover/style-presets.md) | [visual-elements](references/scenes/article-cover/visual-elements.md) | [compatibility](references/scenes/article-cover/compatibility.md)

### 工作流

```
封面图片进度:
- [ ] Step 0: 检查偏好配置 (EXTEND.md) BLOCKING
- [ ] Step 1: 分析内容 + 保存参考图 + 确定输出目录
- [ ] Step 2: 确认 6 维度 + aspect（除非 --quick）
- [ ] Step 3: 创建 prompt
- [ ] Step 4: 生成图片
- [ ] Step 5: 完成报告
```

详细工作流：[scenes/article-cover/workflow/](references/scenes/article-cover/workflow/)

- [confirm-options.md](references/scenes/article-cover/workflow/confirm-options.md)
- [prompt-template.md](references/scenes/article-cover/workflow/prompt-template.md)
- [reference-images.md](references/scenes/article-cover/workflow/reference-images.md)

### 输出结构

```
<output-dir>/
+-- source-{slug}.{ext}
+-- refs/ref-NN-{slug}.{ext}
+-- prompts/cover.md
+-- cover.png
```

输出目录由 `default_output_dir` 偏好决定：`same-dir` / `imgs-subdir` / `independent`（默认 `visual/{topic-slug}/`）。

---

## 场景 2：infographic（信息图）

生成单张专业信息图，支持 21 种布局 × 20 种风格。

### 专属选项

| 选项 | 说明 |
|------|------|
| `--layout <name>` | 信息布局（见下方画廊） |
| `--style <name>` | 视觉风格（见下方画廊） |

默认宽高比：`landscape`（4:3 偏宽）；高密度场景推荐 `portrait`

### 风格画廊

`craft-handmade`（默认）, `claymation`, `kawaii`, `storybook-watercolor`, `chalkboard`, `cyberpunk-neon`, `bold-graphic`, `aged-academia`, `corporate-memphis`, `technical-schematic`, `origami`, `pixel-art`, `ui-wireframe`, `subway-map`, `ikea-manual`, `knolling`, `lego-brick`, `pop-laboratory`, `morandi-journal`, `retro-pop-grid`

定义：[scenes/infographic/styles/](references/scenes/infographic/styles/)

### 布局画廊

| 布局 | 适用场景 |
|------|----------|
| `linear-progression` | 时间线、流程、教程 |
| `binary-comparison` | A vs B、前后对比 |
| `comparison-matrix` | 多因素对比 |
| `hierarchical-layers` | 金字塔、优先级层级 |
| `tree-branching` | 分类、分类学 |
| `hub-spoke` | 中心概念 + 关联要素 |
| `structural-breakdown` | 爆炸视图、剖面图 |
| `bento-grid`（默认） | 多主题概览 |
| `iceberg` | 表面 vs 隐藏层 |
| `bridge` | 问题-解决方案 |
| `funnel` | 转化漏斗 |
| `isometric-map` | 空间关系 |
| `dashboard` | 指标 / KPI |
| `periodic-table` | 分类集合 |
| `comic-strip` | 叙事 / 序列 |
| `story-mountain` | 情节弧线 |
| `jigsaw` | 互相关联的部分 |
| `venn-diagram` | 重叠概念 |
| `winding-roadmap` | 旅程 / 里程碑 |
| `circular-flow` | 循环 / 周期性流程 |
| `dense-modules` | 高密度模块、数据密集指南 |

定义：[scenes/infographic/layouts/](references/scenes/infographic/layouts/)

### 选择指南

推荐组合（layout × style）与关键词快捷方式：[scenes/infographic/guide.md](references/scenes/infographic/guide.md)

### 工作流

```
信息图进度:
- [ ] Step 0: 检查偏好配置
- [ ] Step 1: 分析内容 → analysis.md
- [ ] Step 2: 确认 layout × style × aspect
- [ ] Step 3: 生成结构化内容 → structured-content.md
- [ ] Step 4: 生成 prompt → prompts/infographic.md
- [ ] Step 5: 调 wj-imagine 出图
```

分析框架：[scenes/infographic/analysis-framework.md](references/scenes/infographic/analysis-framework.md)
基础模板：[scenes/infographic/base-prompt.md](references/scenes/infographic/base-prompt.md)
结构化内容模板：[scenes/infographic/structured-content-template.md](references/scenes/infographic/structured-content-template.md)

### 输出结构

```
infographic/{topic-slug}/
+-- source-{slug}.{ext}
+-- analysis.md
+-- structured-content.md
+-- prompts/infographic.md
+-- infographic.png
```

---

## 场景 3：poster（海报 / 主视觉）

品牌主海报、Campaign KV、Web banner、Editorial cover、复古信息图海报、产品 lineup 对比海报。

### 模板清单

| 模板 | 说明 |
|------|------|
| `brand-poster` | 品牌主海报（产品 / 人物 / 纯文字主张） |
| `campaign-kv` | Campaign Key Visual + 衍生 layout 系统 |
| `banner-hero` | Web hero / 落地页 / app banner（横向 + CTA） |
| `editorial-cover` | 杂志 / 期刊 / 出版物封面 |
| `biomimetic-concept-poster` | 仿生工业设计概念海报（自然原型 → 演化条 → hero render） |
| `vintage-editorial-infographic` | 复古档案 1940s 编辑式信息图海报（Bell Labs 风） |
| `character-catalog-poster` | 同一角色多版本信息图海报（星座 / 元素 / 朝代系列） |
| `lineup-comparison-poster` | 系列产品 lineup 对比信息图海报（30+ SKU 同图） |

模板详情：[scenes/poster/](references/scenes/poster/)

### 用法

```bash
/wj-visual --scene poster --template editorial-cover
/wj-visual --scene poster --template campaign-kv --aspect 16:9
```

按模板字段提问关键变量（如海报主体、品牌、文案、风格）。

---

## 场景 4：tech-diagram（技术示意图）

系统架构、流程图、时序图、状态机、ER 图、思维导图、网络拓扑。统一暗色 grid 背景 + 等宽字体 + 角色编码配色，每个模板都附 light 变体。

> ⚠️ 输出 **PNG 位图**，**不是可编辑 SVG**。需要可编辑请改用 mermaid / draw.io / excalidraw / Figma。

### 模板清单

| 模板 | 适用场景 |
|------|---------|
| `system-architecture` | 系统架构图（前端 + 后端 + DB + 缓存 + 队列 + 外部） |
| `flowchart-decision` | 流程图 / 决策图（BPMN 形状 + Yes/No 分支） |
| `sequence-diagram` | 时序图（actor + lifeline + 消息箭头 + 激活条） |
| `state-machine` | 状态机 / 生命周期图（state + transition + guard） |
| `er-diagram` | ER 图 / 数据模型（实体 + 字段 + PK/FK + crow's foot） |
| `mind-map-tech` | 技术主题思维导图（中央 + 放射式分支） |
| `network-topology` | 网络拓扑图（设备 glyph + zone / VPC + 协议标） |

模板详情：[scenes/tech-diagram/](references/scenes/tech-diagram/)

### 用法

```bash
/wj-visual --scene tech-diagram --template system-architecture
/wj-visual --scene tech-diagram --template er-diagram --aspect landscape
```

---

## 场景 5：academic（学术配图）

论文 / 顶会投稿 / 学术海报 / 答辩 PPT / 期刊投稿 Graphical Abstract。

**整体风格**：白底 + 出版物字体 + 几何精确 + 低饱和工程色（深蓝 / 灰蓝 / 黑灰，≤3 主色）+ 可单色印刷。

⚠️ **严格禁止虚构定量数据**（数值 / 等值线 / 色标范围 / 公式）。

### 模板清单

| 模板 | 适用方向 |
|------|---------|
| `method-pipeline-overview` | 方法总览图 / pipeline figure（多 stage + 数据流；含工程类左/中/右三段式变体） |
| `neural-network-architecture` | 神经网络架构图（layer 块 + tensor shape + 跳连） |
| `qualitative-comparison-grid` | 多方法 qualitative 对比网格（行 = 样本，列 = 方法） |
| `scientific-schematic` | 概念 / 原理 / 实验装置示意图（自然语言模板） |
| `mechanism-diagram` | 机理图 / 因果链 / 转化路径（含三段式因果链 / 循环 / 多分支竞争变体） |
| `multi-condition-comparison` | 多工况 / 多条件结果对比图（2×2 / 1×N / M×N） |
| `publication-chart` | publication-ready 数据图表（bar / line / scatter / heatmap / box） |
| `graphical-abstract` | 期刊投稿 Graphical Abstract（横向 4 段 / 中心展开 / 方形 / 竖版） |
| `research-overview-poster` | 开题 / 答辩 / 汇报首页研究总览图（含中心辐射 / 左右双栏 / 极简变体） |

模板详情：[scenes/academic/](references/scenes/academic/)

### 选择策略

- **CS/CV/ML 论文**：`method-pipeline-overview` + `qualitative-comparison-grid`
- **工程 / 能源 / 化工 / 材料**：`method-pipeline-overview`（变体 4）+ `mechanism-diagram` + `multi-condition-comparison`
- **期刊投稿摘要图**：`graphical-abstract`
- **答辩 PPT 首页**：`research-overview-poster`

### 用法

```bash
/wj-visual --scene academic --template method-pipeline-overview
/wj-visual --scene academic --template graphical-abstract --aspect landscape
```

---

## 场景 6：illustration（概念插画 / 氛围场景）

"氛围 + 故事 + 情绪"的插画类视觉。

### 模板清单

| 模板 | 说明 |
|------|------|
| `healing-scene` | 治愈系日常 / 季节场景插画 |
| `concept-scene` | 电影感概念大场景 / IP key art |
| `picture-book-scene` | 童书 / 绘本内页 / 节日卡片 |
| `minimalist-mood-scene` | 极简留白氛围图 / 文学性壁纸 |

模板详情：[scenes/illustration/](references/scenes/illustration/)

### 用法

```bash
/wj-visual --scene illustration --template healing-scene
/wj-visual --scene illustration --template concept-scene --aspect 16:9
```

---

## 模板工作方式

所有从 garden-skills 引入的场景（poster / tech-diagram / academic / illustration）共享一套模板工作方式：

1. 在场景目录下找到最贴近任务的具体模板文件
2. 模板使用 **JSON 主模板**（结构化任务）或 **结构化自然语言 + 参数**（高自由度任务，如 `scientific-schematic`）
3. 模板中的 `{argument ...}` 表示可替换参数
4. 用户提供的值直接填入；模板标了 `default` 的可先用默认；关键信息不足时主动询问
5. 用户明确说"你随机生成"时，可在模板允许范围内合理随机化

提示词写作方法论：[scenes/prompt-writing.md](references/scenes/prompt-writing.md)

---

## 通用：Step 0 加载偏好

偏好配置影响默认维度、水印、输出目录、语言等，需要在生图前完成加载。

查找顺序（后者被前者覆盖）：
1. `$HOME/.wj-skills/global/EXTEND.md`（全局共享，API key、默认画质等）
2. `$HOME/.wj-skills/visual/EXTEND.md`（用户级）
3. `.wj-skills/visual/EXTEND.md`（项目级，最高优先）

- 找到 → 加载并显示摘要
- 未找到 → 运行首次设置 [references/config/first-time-setup.md](references/config/first-time-setup.md)

Schema：[references/config/preferences-schema.md](references/config/preferences-schema.md)

支持配置项（按场景分组）：
- 通用：水印、默认宽高比、语言、快速模式
- article-cover：默认 6 维度、自定义调色盘、输出目录
- infographic：默认 layout、默认 style

## 通用：图片修改

| 操作 | 步骤 |
|------|------|
| **重新生成** | 备份现有图 → 更新 prompt → 重新生成 |
| **更改维度 / layout / style** | 备份 → 确认新值 → 更新 prompt → 重新生成 |

## 通用：构图原则

- **留白**：40-60% 呼吸空间
- **视觉锚点**：主元素居中或偏左
- **人物**：简化剪影；禁止写实人物
- **标题**：使用用户/源内容中的原标题；不得自行编造
- **数据**：忠实保留源数据，不做摘要或改写

## 扩展支持

通过 EXTEND.md 自定义配置（路径见 Step 0）。完整 schema：[references/config/preferences-schema.md](references/config/preferences-schema.md)

水印配置：[references/config/watermark-guide.md](references/config/watermark-guide.md)
