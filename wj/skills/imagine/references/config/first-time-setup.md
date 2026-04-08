---
name: first-time-setup
description: wj-imagine skill 首次设置流程
---

# 首次设置

## 概述

触发条件: 未找到 EXTEND.md -> 完整设置（画质 + 保存位置）

## 设置流程

```
未找到 EXTEND.md
        |
        v
+---------------------+
| AskUserQuestion     |
| (画质 + 保存位置)    |
+---------------------+
        |
        v
+---------------------+
| 创建 EXTEND.md      |
+---------------------+
        |
        v
      继续
```

## 设置详情

**语言**: 使用用户输入语言或已保存的语言偏好。

使用 AskUserQuestion 在一次调用中询问所有问题:

### 问题 1: 默认画质

```yaml
header: "Quality"
question: "默认图片画质?"
options:
  - label: "2k (推荐)"
    description: "2048px - 封面、插画、信息图"
  - label: "normal"
    description: "1024px - 快速预览、草稿"
```

### 问题 2: 保存位置

```yaml
header: "Save"
question: "偏好设置保存到哪里?"
options:
  - label: "项目 (推荐)"
    description: ".wj-skills/ (仅当前项目)"
  - label: "用户"
    description: "~/.wj-skills/ (所有项目)"
```

### 保存路径

| 选择 | 路径 | 作用范围 |
|------|------|----------|
| 项目 | `.wj-skills/imagine/EXTEND.md` | 当前项目 |
| 用户 | `$HOME/.wj-skills/imagine/EXTEND.md` | 所有项目 |

### EXTEND.md 模板

```yaml
---
version: 1
default_quality: [选择的画质]
default_aspect_ratio: null
---
```

## 设置完成后

1. 按需创建目录
2. 写入 EXTEND.md（frontmatter 格式）
3. 确认: "偏好设置已保存到 [路径]"
4. 继续图片生成
