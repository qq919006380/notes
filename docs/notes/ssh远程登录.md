## 免密登录

1.生成公钥`ssh-keygen`
2.将公钥传送到远程主机host上面`ssh-copy-id user@host`

##  secure copy(scp)
本地复制到远程
```
scp local_file user@remote:remote_folder
或者
scp -r local_folder remote_ip:remote_folder 
```

远程复制到本地
```
scp user@remote:/home/root/others/music /home/space/music/1.mp3 
或者
scp -r user@remote:/home/root/others/ /home/space/music/
```