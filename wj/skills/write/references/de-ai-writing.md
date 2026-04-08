# 去 AI 风格规则

## 目标

删掉统计学平均后的套话，保留作者本来的判断、节奏和技术细节。

## 常见 AI 痕迹

- 空洞拔高：如“革命性”“颠覆性”“显著突破”“全方位”“深度赋能”。
- 空洞展望：把未来愿景写得比当下结论还多。
- 空洞过渡：如“值得注意的是”“需要指出的是”“在这个背景下”“不难发现”“总的来说”。
- 空洞强化：大量使用“非常”“极其”“强大”“高效”“优雅”，但不给机制、条件或例子。
- 机械平行结构：每段都“首先/其次/最后”，或反复出现“它不仅……还……”。
- 假口语和假亲切：如“让我们一起”“相信大家都知道”“其实很简单”。
- 模糊主语：句子只说“系统实现了提升”，却不写清楚谁做了什么。
- 过度抛光：把作者原本有棱角的表达磨成通用企业文案。

## 替换方法

- 把形容词改成机制、条件、数据或例子。
- 把被动句改成主动句，写清楚动作的执行者。
- 把大而空的判断改成具体范围：在哪种场景、解决了什么问题、代价是什么。
- 把冗长引子改成首段结论。
- 如果同一段已经说清结论，删掉后面换一种说法重复抒情的句子。
- 把总结废话改成限制条件、下一步动作或直接收束。
- 打散重复句式，避免连续几段同一节奏。
- 如果作者本来就有稳定的解释支点词，如“本文主要”“关键在于”“本质上”“比如”，不要机械删除；只删滥用和无效重复。

## 编辑检查

1. 删掉不影响意思的空话。
2. 把每个抽象判断补成“结论 + 原因/机制”。
3. 检查是否出现连续多句同样起手。
4. 检查是否把作者自己的用词和节奏洗平。
5. 检查是否保留了具体名词、命令、配置、场景和约束。
6. 检查是否误把作者正常的技术解释词，当成 AI 套话一并删除。

## 外部规范提炼

- [Google Developer Style Guide - Voice and tone](https://developers.google.com/style/tone)：语气自然但直接，避免陈词滥调、重复起手和 `please note`、`simply`、`easy` 这类占位语。
- [Google Developer Style Guide - Active voice](https://developers.google.com/style/voice)：优先主动语态，让读者能立刻看懂“谁做了什么”。
- [Microsoft Style Guide - Top 10 tips for style and voice](https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice)：更少的字表达更大的意思，先把重点说出来，剪掉弱表达。
- [Microsoft Style Guide - Use simple words, concise sentences](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences)：用简单词、具体动词、单义词，删掉不增加信息的副词和短语。
- [AI Suggestions Homogenize Writing Toward Western Styles and Diminish Cultural Nuances](https://arxiv.org/abs/2409.11360)：AI 建议会把写作推向更同质化的主流风格，因此不要把作者的个人和文化表达洗掉。
- [AI Writing Cliches: How to Stop the Generic AI Voice](https://johndeacon.co.za/writing-cognitive-design/ai-writing-cliches-how-to-stop-the-generic-ai-voice/)：AI 腔常见问题是 hype、空洞强化词和模糊 framing；如果一句话没有机制或具体对象，就继续改。
