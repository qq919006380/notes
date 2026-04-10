---
title: iview踩坑记
slug: '53e118'
date: '2022-05-15T14:14:16.000Z'
categories:
  - 学习笔记
  - 其他
tags:
  - iview
author:
  name: 夏天夏
  link: 'https://github.com/qq919006380'
draft: false
sortOrder: 15
---
## 定制主题

按官网推荐的定制主题（变量覆盖），less版本需要在3以下`"less": "^2.7.3", "less-loader": "^4.1.0"`
可能造成的原因：webpack4要求less要升级，不能在2.x~

