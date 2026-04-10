---
title: sass
slug: 73a119
date: '2022-05-15T14:14:16.000Z'
categories:
  - 学习笔记
  - 其他
tags:
  - sass
author:
  name: 夏天夏
  link: 'https://github.com/qq919006380'
draft: false
sortOrder: 16
---
# sass

sass支持两种语法
- **Sass**,一种缩进语法
- **SCSS**,一种 CSS-like 语法

## scss
- 变量用$表示如`$border-color:pink;`,
- 嵌套选择器
- 支持@mixin,@include

```
@mixin box {
  border: 1px solid $boder-color;
  height: 10px;
  margin: 10px
}
.box{
  @include box()
}
```
