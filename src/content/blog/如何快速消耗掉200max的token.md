---
title: 如何快速消耗掉200max的token
slug: 56c10e
date: '2026-05-18T00:00:00.000Z'
categories:
  - 个人博客
  - 技术分享
tags:
  - Claude Code
  - AI
  - 工作流
author:
  name: 夏天夏
  link: 'https://github.com/qq919006380'
draft: false
---

最近订阅了 Claude Code 的 200 Max 套餐，本以为额度够用一个月，结果几天就被烧光。研究了一下，真正能让 token 蒸发得最快的，是两个并行方案：**subagent** 和 **agent team**。

<!-- more -->

## 区别一句话

> teammate 之间需要"说话"才用 team，不需要说话就用普通 subagent。

记住这条，下面展开。

## 方法一：subagent（互不说话的并行）

普通 subagent 是主 agent 派出去的"一次性工兵"：

- 各自拥有**独立的上下文窗口**
- 干完活把结果汇报回主 agent 就结束
- 工兵之间互相看不见、不沟通

适合的活：并行搜索、并行测试、并行探索代码、隔离上下文不污染主对话。

最暴力的 prompt 就一句：

```
Use all your agents
```

主 agent 会自动把任务拆开，扔给一堆 subagent 同时干。token 消耗 ≈ `工兵数量 × 每个工兵的上下文`，再加主对话本身。一次任务下来很容易烧掉几百 K token。

## 方法二：agent team（互相说话的协作）

当多个 agent 之间需要来回交流时，subagent 就不够用了。比如：

- reviewer 看完代码要把意见反馈给 implementer
- implementer 改完代码要让 reviewer 复核
- 多 agent 之间需要协商、讨论、互相打断

这种场景用 `--teammate-mode`，所有 agent 在同一个 tmux 会话里"开会"。

启动命令：

```bash
claude --teammate-mode tmux
```

不过这条命令目前有 bug。临时方案是显式套一层 tmux：

```bash
tmux new-session -s work "claude --teammate-mode tmux"
```

配合 git worktree 一起用，开多个隔离的工作分支：

```bash
claude -w feature-auth --tmux
```

进去之后开 team 也很简单，直接说人话：

```
创建一个 team 来 review 这个项目
```

下一秒你就能看到几个 agent 在 tmux 窗口里互相喊话、来回 review。token 燃烧速度直接翻几倍。

## 怎么选

| 场景 | 用哪个 |
| --- | --- |
| 并行跑独立任务（搜索、测试、探索） | subagent |
| agent 之间要互相对话、协作、迭代 | agent team |

判断标准只有一个：**它们之间需不需要"说话"？**

## 总结

想把 200 Max 的 token 快速烧光，照下面做：

1. 简单任务上来就 `Use all your agents`
2. 复杂任务开 `--teammate-mode tmux` 派一支 team
3. 配合 worktree 多分支并行跑

亲测有效，月初订阅，月中告罄。
