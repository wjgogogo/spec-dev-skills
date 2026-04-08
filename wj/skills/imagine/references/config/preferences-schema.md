---
name: preferences-schema
description: EXTEND.md YAML schema，wj-imagine skill 用户偏好配置
---

# 偏好配置 Schema

## 完整 Schema

```yaml
---
version: 1

default_quality: null       # normal|2k|null (null = 使用默认值: 2k)

default_aspect_ratio: null  # "16:9"|"1:1"|"4:3"|"3:4"|"2.35:1"|null

batch:
  max_workers: 10
  concurrency: 5
  start_interval_ms: 700
---
```

## 字段说明

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `version` | int | 1 | Schema 版本 |
| `default_quality` | string\|null | null | 默认画质 (null = 2k) |
| `default_aspect_ratio` | string\|null | null | 默认宽高比 |
| `batch.max_workers` | int\|null | 10 | 批量 worker 上限 |
| `batch.concurrency` | int\|null | 5 | 最大同时请求数 |
| `batch.start_interval_ms` | int\|null | 700 | 请求启动最小间隔 (ms) |

## 示例

**最简配置**:
```yaml
---
version: 1
default_quality: 2k
---
```

**完整配置**:
```yaml
---
version: 1
default_quality: 2k
default_aspect_ratio: "16:9"
batch:
  max_workers: 10
  concurrency: 5
  start_interval_ms: 700
---
```
