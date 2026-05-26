# wj-visual 场景索引

`wj-visual` 支持 6 个单图场景，每个场景独立目录，共用 skill 级 `config/` 与底层 `wj-imagine`。

| 场景 | 模板数 | 触发关键词 | 典型用法 |
|------|------|----------|--------|
| [article-cover/](article-cover/) | 6 维度组合 | 文章 / 封面 / cover / blog cover / banner 图 | 给定 .md 文章 → 1 张技术博客封面 |
| [infographic/](infographic/) | 20 styles × 21 layouts | 信息图 / infographic / 知识卡 / 高密度大图 / 可视化笔记 | 单张高密度可视化大图 |
| [poster/](poster/) | 8 | 海报 / banner / KV / editorial cover / 杂志封面 | 品牌主视觉 / Campaign / Hero |
| [tech-diagram/](tech-diagram/) | 7 | 架构图 / 流程图 / 时序图 / 状态机 / ER / 思维导图 / 网络拓扑 | 系统设计文档配图（PNG 位图） |
| [academic/](academic/) | 9 | 论文配图 / pipeline / 神经网络架构 / graphical abstract / 答辩 PPT | 学术 / 顶会 / 期刊投稿 |
| [illustration/](illustration/) | 4 | 治愈系 / 概念场景 / 童书 / 极简氛围 | 情绪 / 氛围 / IP key art |

## 用法约定

1. 在场景目录下找到最贴近任务的具体模板文件，**不要一次性读整个 scenes/**
2. 模板使用 **JSON 主模板**（结构化任务）或 **结构化自然语言 + 参数**（高自由度任务）
3. 模板中的 `{argument ...}` 表示可替换参数
4. 用户提供的值直接填入；模板标了 `default` 的可先用默认；关键信息不足时主动询问
5. 用户明确说"你随机生成"时，可在模板允许范围内合理随机化

提示词写作方法论：[prompt-writing.md](prompt-writing.md)

## 模板来源 / Attribution

`poster/`、`tech-diagram/`、`academic/`、`illustration/`、`prompt-writing.md` 引自开源项目：

- 仓库: [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills)
- 路径: `skills/gpt-image-2/references/`
- 协议: MIT License

`article-cover/` 和 `infographic/` 由 wj 系列原创（infographic 早期版本曾内嵌于 `wj-xhs-images`）。

如需追溯原始模板内容，可对照 garden-skills 仓库；wj 后续修改不一定回传上游。
