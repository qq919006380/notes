---
title: TON调试指南
date: 2024-06-22 09:58:29
permalink: /pages/ad8a96/
sidebar: auto
categories:
  - 随笔
tags:
  - 
author: 
  name: 夏天夏
  link: https://github.com/qq919006380
---
# TON

本文主要总结了 Telegram 小程序的调试方法和小程序 URL 只支持 HTTPS 协议的问题。
<!-- more -->

## 一、调试

在 Telegram 小程序中调试主要有以下几种方法：

- 使用 vConsole 与 eruda。
- 打开 Telegram 客户端的 debug 模式 [文档](https://core.telegram.org/bots/webapps#debug-mode-for-mini-apps)。
- 在 [Telegram Web 版本](https://web.telegram.org/) 中调试，可以看到小程序实际上是一个 iframe，可以清楚看到 token 和用户信息等都在 URL 参数上。不过，将 iframe 的 URL 单独复制到一个新窗口中执行会脱离 Telegram 的 Provider，从而失去部分功能。

## 二、HTTPS SSL 问题

解决 @BotFather 添加小程序 URL 只能是 HTTPS 协议的问题：

### 自建 SSL

启用 Next.js 的实验性 `--experimental-https` HTTPS 支持。  
缺点：自建 SSL 证书需要注意修改 host 文件，可能存在防火墙和代理冲突问题。  
[参考](https://github.com/Telegram-Mini-Apps/nextjs-template)

### Ngrok

直接使用 Ngrok 内网穿透。  
缺点：每次重启都会换一个新的域名，而且有流量限额，需要支付 $10/月。

### Telegram 开发环境

进入测试环境可以使用测试版本的 @BotFather，在其中 mini app 的 URL 可以直接使用 127.0.0.1 进行调试。首先需要准备以下两项：

- 客户端：下载 Telegram beta 版本[下载](https://core.telegram.org/bots/webapps#testing-mini-apps)。
- 新建测试账号（以下二选一）： 
  - [创建新的测试账号](https://core.telegram.org/bots/webapps#testing-mini-apps)
  - [使用官方自带的测试账号](https://core.telegram.org/api/auth#test-accounts)

缺点：需要新建一个测试账号。

### 应用内打开游戏浏览器

可以绕过 HTTPS 限制，URL 可以直接写 127.0.0.1。  注意是http不是https
参考文档：  
- [示例代码](https://github.com/yagop/node-telegram-bot-api/blob/master/examples/game/game.js)
- [发送游戏 API](https://core.telegram.org/bots/api#sendgame)
- [游戏 API 文档](https://core.telegram.org/bots/games)

缺点：需要game模式，可能会与 Telegram 小程序的 Provider 略有差异。

## 总结

如果不想折腾最好用类似Ngrok的内网穿透，或者自建 SSL,最后再考虑`创建新的 Telegram 账号并使用 Telegram 测试环境`



 