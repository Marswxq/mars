# Docker 常用命令

**目录**

[[toc]]

## 登录/登出harbor

### 语法

```shell
docker login -u 用户名 -p 密码 仓库名称
```

### 示例

1. 登录harbor

   ```shell
   docker login -u service xxx.com:port 
   ```

2. 登出harbor

   ```shell
   docker logout
   ```

## 镜像

### 语法

```shell
docker images [OPTIONS] [REPOSITORY[:TAG]]
```

OPTIONS说明：

- -a :列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）；

- --digests :显示镜像的摘要信息；

- -f :显示满足条件的镜像；

- --format :指定返回值的模板文件；

- --no-trunc :显示完整的镜像信息；

- -q :只显示镜像ID。

#### 示例

```shell
# 查看xxx-server格式的服务，并且过滤掉xxxx-server
docekr images | grep xxx-server | grep -v xxxx-server
```

## 删除镜像

### 语法

```shell
docker rmi [OPTIONS] IMAGE [IMAGE...]
```

OPTIONS说明：

* -f :强制删除；

* --no-prune :不移除该镜像的过程镜像，默认移除；

### 示例

```shell
# 强制删除本地镜像 runoob/ubuntu:v4
docker rmi -f runoob/ubuntu:v4
```

## 归档

### 语法

```shell
docker save [OPTIONS] IMAGE [IMAGE...]
```

OPTIONS 说明：

* -o :输出到的文件。

### 示例

```shell
# 将镜像 runoob/ubuntu:v3 生成 my_ubuntu_v3.tar 文档 
docker save -o my_ubuntu_v3.tar runoob/ubuntu:v3
```

## 导入归档

### 语法

```shell
docker load [OPTIONS]
```

OPTIONS 说明：

* --input , -i : 指定导入的文件，代替 STDIN。

* --quiet , -q : 精简输出信息。

### 示例

```shell
docker load -i fedora.tar
```

## 拉取镜像

### 语法

```shell
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

OPTIONS说明：

* -a :拉取所有 tagged 镜像

* --disable-content-trust :忽略镜像的校验,默认开启

### 示例

```shell
docker pull java:1.8.0
```

## 查看容器

默认情况下，docker ps 命令只显示运行中的容器，但也可以通过指定选项来显示所有容器，包括停止的容器。

### 语法

```shell
docker ps [OPTIONS]
```

OPTIONS说明：

* -a :显示所有的容器，包括未运行的。

* -f :根据条件过滤显示的内容。

* --format :指定返回值的模板文件。

* -l :显示最近创建的容器。

* -n :列出最近创建的n个容器。

* --no-trunc :不截断输出。

* -q :静默模式，只显示容器编号。

* -s :显示总的文件大小。

### 示例

```bash
docker ps
CONTAINER ID   IMAGE          COMMAND                ...  PORTS                    NAMES
09b93464c2f7   nginx:latest   "nginx -g 'daemon off" ...  80/tcp, 443/tcp          myrunoob
96f7f14e99ab   mysql:5.6      "docker-entrypoint.sh" ...  0.0.0.0:3306->3306/tcp   mymysql
```

**输出详情介**

* CONTAINER ID: 容器 ID。

* IMAGE: 使用的镜像。

* COMMAND: 启动容器时运行的命令。

* CREATED: 容器的创建时间。

* STATUS: 容器状态。7种状态如下：

    - created（已创建）
    - restarting（重启中）
    - running（运行中）
    - removing（迁移中）
    - paused（暂停）
    - exited（停止）
    - dead（死亡）

* PORTS: 容器的端口信息和使用的连接类型（tcp\udp）。

* NAMES: 自动分配的容器名称。

## 删除容器

### 语法

```shell
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

* -f :通过 SIGKILL 信号强制删除一个运行中的容器。

* -l :移除容器间的网络连接，而非容器本身。

* -v :删除与容器关联的卷。

### 示例

    # 强制删除容器 db01、db02
    docker rm -f db01 db02
    
    # 移除容器 nginx01 对容器 db01 的连接，连接名 db
    docker rm -l db 
    
    # 删除容器 nginx01, 并删除容器挂载的数据卷
    docker rm -v nginx01
    
    # 删除所有已经停止的容器：
    docker rm $(docker ps -a -q)

## 进入容器

### 语法

```shell
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

OPTIONS说明：

* -d :分离模式，在后台运行

* -i :即使没有附加也保持STDIN 打开

* -t :分配一个伪终端

**注意：禁止使用-d进入容器**

### 示例

```shell
# 在容器 mynginx 中以交互模式执行容器内 /root/runoob.sh 脚本
docker exec -it mynginx /bin/sh /root/runoob.sh

# 在容器 mynginx 中开启一个交互模式的终端:
docker exec -it mynginx /bin/bash

# 也可以通过 docker ps -a 命令查看已经在运行的容器，然后使用容器 ID 进入容器。
docker exec -it 9df70f9a0714 /bin/bash
```

## 容器状态

显示容器资源的使用情况，包括：CPU、内存、网络 I/O 等。

### 语法

```shell
docker stats [OPTIONS] [CONTAINER...]
```

OPTIONS 说明：

- --all , -a :显示所有的容器，包括未运行的。

- --format :指定返回值的模板文件。

- --no-stream :展示当前状态就直接退出了，不再实时更新。

- --no-trunc :不截断输出。

### 示例

```shell
# 不持续监控容器，只输出一次
docker stats --no-stream

# 指定目标容器的名称或ID
docker stats registry 
docker stats 1493
# 查看多个容器资源使用情况
docker stats xxx xxx

# 使用容器的名称替代默认输出中的容器 ID
docker stats $(docker ps --format={{.Names}})

# 带标题显示
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

## 标签

### 语法

```shell
docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
```

### 示例

```shell
# 将镜像ubuntu:15.10标记为 runoob/ubuntu:v3 镜像。
docker tag ubuntu:15.10 runoob/ubuntu:v3
# 显示结果
root@runoob:~# docker images runoob/ubuntu:v3
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
runoob/ubuntu       v3                  4e3b13c8a266        3 months ago        136.3 MB
```

## 复制

### 语法

```shell
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
```

OPTIONS说明：

* -L :保持源目标中的链接

### 示例

```shell
# 将主机/www/runoob目录拷贝到容器96f7f14e99ab的/www目录下。
docker cp /www/runoob 96f7f14e99ab:/www/

# 将主机/www/runoob目录拷贝到容器96f7f14e99ab中，目录重命名为www。
docker cp /www/runoob 96f7f14e99ab:/www

# 将容器96f7f14e99ab的/www目录拷贝到主机的/tmp目录中。
docker cp  96f7f14e99ab:/www /tmp/
```

## docker 空间清理

### 清理未使用的容器

删除所有未运行的容器

```shell
docker rm $(docker ps -a -q)
```

### 清理未使用的镜像

删除所有未使用的镜像

```shell
docker image prune
```

### 清理临时文件

删除所有未使用的容器、镜像和临时文件

```shell
docker system prune -a
```

### 清理未使用的容器

删除所有未运行的容器，但保留未使用的镜像和临时文件。

```shell
docker container prune
```

### 清理 docker build 缓存

```shell
docker builder prune
```

## 推送 image

### 语法

```shell
docker push [OPTIONS] NAME[:TAG]
```

### 示例

```shell
# 1.登陆harbor 注意harbor用户权限
docker login 10.253.127.122:8080

# 2. 将要上传的镜像打tag，使其知道要上传的地址，/test/ubuntu是harbor上image路径
docker tag ubuntu:16.04 10.253.127.122:8080/test/ubuntu:16.04

# 3.push
docker push 10.253.127.122:8080/test/ubuntu:16.04
```

## 获取 docker 对象（容器、镜像、卷、网络等）信息

```bash 
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```

OPTIONS说明：

* -f, --format: 使用 Go 模板语法格式化输出。

* --type: * 返回指定类型的对象信息（可选类型：container、image、network、volume）。
