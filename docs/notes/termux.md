## 报错
- - sudo apt-get install build-essential —— Ubuntu/linux中编译c/c++程序,只需要安装该软件包就可以了。 

## 安装(Ubuntu 或 Debian)
`$ sudo apt-get install tmux`

- 唤起快捷键 ctrl+b
    - w 查看窗口
    - d 挂起 （或者输入tmux detach）
    - $ 重命名会话
- 关闭并删除窗口 ctrl+d
- 新建会话 tmux new -s `<session-name>`
-   杀死会话  tmux kill-session -t `<session-name-or-number>`
-   接入会话  tmux attach -t `<session-name-or-number>`
-   重命名会话 tmux rename-session -t 0 `<new-name>`

