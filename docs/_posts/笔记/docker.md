# 1. 管理 Docker 镜像

## 列出镜像：

`docker images`

## 拉取镜像：

`docker pull [image_name]`

## 构建镜像：

`docker build -t [image_name]:[tag] .`

## 删除镜像：

`docker rmi [image_name]`

# 2. 管理 Docker 容器

## 运行容器：

`docker run [options] [image_name]`

## 列出运行中的容器：

`docker ps`

## 列出所有容器（包括停止的）：

`docker ps -a`

## 停止容器：

`docker stop [container_id]`

## 启动容器：

`docker start [container_id]`

## 重启容器：

`docker restart [container_id]`

## 删除容器：

`docker rm [container_id]`

## 进入正在运行的容器：

`docker exec -it [container_id或name] bash`

# 3. 管理 Docker 网络

## 列出网络：

`docker network ls`

## 创建网络：

`docker network create [network_name]`

## 删除网络：

`docker network rm [network_name]`

# 4. 管理 Docker 存储卷

## 列出卷：

`docker volume ls`

## 创建卷：

`docker volume create [volume_name]`

## 删除卷：

`docker volume rm [volume_name]`

# 5. Docker 系统命令

## 查看 Docker 信息：

`docker info`

## 查看 Docker 版本：

`docker version`

## 清理未使用的资源：

`docker system prune`
