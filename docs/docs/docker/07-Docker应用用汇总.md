# Docker应用汇总

## 安装字体库

### 使用 DockerFile

#### Alpine Linux

```dockerfile
# 安装中文字体
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories  \
    && apk add --update ttf-dejavu fontconfig  \
    && rm -rf /var/cache/apk/*  \
    && mkfontscale  \
    && mkfontdir  \
    && fc-cache
# 添加宋体
COPY ./script/simsun.ttc /usr/share/fonts/ttf-dejavu
```

#### Debian Linux

```dockerfile
RUN sed -i 's/http:\/\/deb.debian.org/http:\/\/mirrors.aliyun.com/g' /etc/apt/sources.list
RUN apt update && apt install -y fontconfig && fc-cache -fv
```

#### Centos Linux

```dockerfile
RUN yum -y install ttmkfdir
```

## docker.service

> docker.service 是 Docker 守护进程（Docker Daemon）在 Linux 系统上使用 systemd 作为初始化系统时的服务单元文件，它定义了
> Docker 服务启动、停止和管理的方式。

### 配置说明

```Cabal
[Unit]                    # Docker 服务的元数据信息
Description               # 对 Docker 服务的描述
Documentation             # Docker 在线文档链接
After                     # 指定 Docker 服务在哪些服务之后启动
Wants:                    # 指定 Docker 服务启动后，需要启动的服务
Requires                  # 指定 Docker 服务启动前，必须已启动的服务
 
[Service]                 # Docker 守护进程的行为和属性
Type                      # 指定 Docker 服务启动时的行为。notify 表示服务就绪后发送信号给 systemd
ExecStart                 # Docker 服务启动命令
ExecReload                # Docker 服务重载命令
LimitNOFILE               # 指定 Docker 服务最大文件句柄数，默认为 infinity 无限制
LimitNPROC                # 指定 Docker 服务最大进程数，默认为 infinity 无限制
LimitCORE                 # 指定 Docker 服务最大核心转存文件大小，默认为 infinity 无限制
TasksMax                  # 指定 Docker 服务最大任务数，默认为 infinity 无限制
TimeoutStartSec           # 指定启动 Docker 服务时等待的秒数
Delegate                  # 指定为 yes 时，systemd 不会重置容器的 cgroups
KillMode                  # 指定 Systemd 如何杀死 Docker 进程（control-group、process、mixed、none）
Restart                   # 指定 Docker 服务的重启策略，默认
StartLimitInterval        # 指定 Docker 服务启动失败计数的时间窗口
StartLimitBurst           # 指定 StartLimitInterval 时间内，Docker 服务可以启动失败的次数
 
[Install]                 # Docker 服务的安装位置和所属目标
WantedBy                  # 指定启动 Docker 服务的 target，默认为 multi-user.target
```

## Docker Desktop 自定义安装

在 windows cmd 下执行

```shell
start /w "" "Docker Desktop Installer.exe" install -accept-license --installation-dir="D:\develop\DockerDesktop" --wsl-default-data-root="D:\develop\DockerDesktop\data" --windows-containers-default-data-root="D:\\develop\\DockerDesktop"
```

## 部署 opwen-webui

Docker Desktop 部署 open-webui ， 连接本地 ollama ，实现 deepseek 本地部署。

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v D:\develop\deepseek\open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```


