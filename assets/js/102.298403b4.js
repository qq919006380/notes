(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{421:function(a,r,t){"use strict";t.r(r);var e=t(4),s=Object(e.a)({},(function(){var a=this,r=a._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("h1",{attrs:{id:"_1-管理-docker-镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-管理-docker-镜像"}},[a._v("#")]),a._v(" 1. 管理 Docker 镜像")]),a._v(" "),r("h2",{attrs:{id:"列出镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#列出镜像"}},[a._v("#")]),a._v(" 列出镜像：")]),a._v(" "),r("p",[r("code",[a._v("docker images")])]),a._v(" "),r("h2",{attrs:{id:"拉取镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#拉取镜像"}},[a._v("#")]),a._v(" 拉取镜像：")]),a._v(" "),r("p",[r("code",[a._v("docker pull [image_name]")])]),a._v(" "),r("h2",{attrs:{id:"构建镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#构建镜像"}},[a._v("#")]),a._v(" 构建镜像：")]),a._v(" "),r("p",[r("code",[a._v("docker build -t [image_name]:[tag] .")])]),a._v(" "),r("h2",{attrs:{id:"删除镜像"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#删除镜像"}},[a._v("#")]),a._v(" 删除镜像：")]),a._v(" "),r("p",[r("code",[a._v("docker rmi [image_name]")])]),a._v(" "),r("h1",{attrs:{id:"_2-管理-docker-容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-管理-docker-容器"}},[a._v("#")]),a._v(" 2. 管理 Docker 容器")]),a._v(" "),r("h2",{attrs:{id:"运行容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#运行容器"}},[a._v("#")]),a._v(" 运行容器：")]),a._v(" "),r("p",[r("code",[a._v("docker run [options] [image_name]")])]),a._v(" "),r("h2",{attrs:{id:"列出运行中的容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#列出运行中的容器"}},[a._v("#")]),a._v(" 列出运行中的容器：")]),a._v(" "),r("p",[r("code",[a._v("docker ps")])]),a._v(" "),r("h2",{attrs:{id:"列出所有容器-包括停止的"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#列出所有容器-包括停止的"}},[a._v("#")]),a._v(" 列出所有容器（包括停止的）：")]),a._v(" "),r("p",[r("code",[a._v("docker ps -a")])]),a._v(" "),r("h2",{attrs:{id:"停止容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#停止容器"}},[a._v("#")]),a._v(" 停止容器：")]),a._v(" "),r("p",[r("code",[a._v("docker stop [container_id]")])]),a._v(" "),r("h2",{attrs:{id:"启动容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#启动容器"}},[a._v("#")]),a._v(" 启动容器：")]),a._v(" "),r("p",[r("code",[a._v("docker start [container_id]")])]),a._v(" "),r("h2",{attrs:{id:"重启容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#重启容器"}},[a._v("#")]),a._v(" 重启容器：")]),a._v(" "),r("p",[r("code",[a._v("docker restart [container_id]")])]),a._v(" "),r("h2",{attrs:{id:"删除容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#删除容器"}},[a._v("#")]),a._v(" 删除容器：")]),a._v(" "),r("p",[r("code",[a._v("docker rm [container_id]")])]),a._v(" "),r("h2",{attrs:{id:"进入正在运行的容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#进入正在运行的容器"}},[a._v("#")]),a._v(" 进入正在运行的容器：")]),a._v(" "),r("p",[r("code",[a._v("docker exec -it [container_id或name] bash")])]),a._v(" "),r("h1",{attrs:{id:"_3-管理-docker-网络"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-管理-docker-网络"}},[a._v("#")]),a._v(" 3. 管理 Docker 网络")]),a._v(" "),r("h2",{attrs:{id:"列出网络"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#列出网络"}},[a._v("#")]),a._v(" 列出网络：")]),a._v(" "),r("p",[r("code",[a._v("docker network ls")])]),a._v(" "),r("h2",{attrs:{id:"创建网络"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#创建网络"}},[a._v("#")]),a._v(" 创建网络：")]),a._v(" "),r("p",[r("code",[a._v("docker network create [network_name]")])]),a._v(" "),r("h2",{attrs:{id:"删除网络"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#删除网络"}},[a._v("#")]),a._v(" 删除网络：")]),a._v(" "),r("p",[r("code",[a._v("docker network rm [network_name]")])]),a._v(" "),r("h1",{attrs:{id:"_4-管理-docker-存储卷"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-管理-docker-存储卷"}},[a._v("#")]),a._v(" 4. 管理 Docker 存储卷")]),a._v(" "),r("h2",{attrs:{id:"列出卷"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#列出卷"}},[a._v("#")]),a._v(" 列出卷：")]),a._v(" "),r("p",[r("code",[a._v("docker volume ls")])]),a._v(" "),r("h2",{attrs:{id:"创建卷"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#创建卷"}},[a._v("#")]),a._v(" 创建卷：")]),a._v(" "),r("p",[r("code",[a._v("docker volume create [volume_name]")])]),a._v(" "),r("h2",{attrs:{id:"删除卷"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#删除卷"}},[a._v("#")]),a._v(" 删除卷：")]),a._v(" "),r("p",[r("code",[a._v("docker volume rm [volume_name]")])]),a._v(" "),r("h1",{attrs:{id:"_5-docker-系统命令"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-docker-系统命令"}},[a._v("#")]),a._v(" 5. Docker 系统命令")]),a._v(" "),r("h2",{attrs:{id:"查看-docker-信息"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#查看-docker-信息"}},[a._v("#")]),a._v(" 查看 Docker 信息：")]),a._v(" "),r("p",[r("code",[a._v("docker info")])]),a._v(" "),r("h2",{attrs:{id:"查看-docker-版本"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#查看-docker-版本"}},[a._v("#")]),a._v(" 查看 Docker 版本：")]),a._v(" "),r("p",[r("code",[a._v("docker version")])]),a._v(" "),r("h2",{attrs:{id:"清理未使用的资源"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#清理未使用的资源"}},[a._v("#")]),a._v(" 清理未使用的资源：")]),a._v(" "),r("p",[r("code",[a._v("docker system prune")])])])}),[],!1,null,null,null);r.default=s.exports}}]);