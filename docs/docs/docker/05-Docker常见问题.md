# Docker 常见问题

## Q1. library initialization failed - unable to allocate file descriptor table - out of memoryAborted (core dumped)

### Quession

docker 启动报 `library initialization failed - unable to allocate file descriptor table - out of memory`
或 docker
容器内应用启动报 `library initialization failed - unable to allocate file descriptor table - out of memoryAborted (core dumped)`

### Answer

#### 原因

1. `LimitNOFILE=infinity`虽然是不限制，但是在`systemctl`版本小于234的时候不生效，查看systemctl版本：systemctl --version

2. docker容器的`ulimit`太小了

#### 解决

修改 `docker.service` 配置（配置路径可能不一致，可以通过`find / -name docker.service`查找）

```bash 
vim /usr/lib/systemd/system/docker.service
```

* 方式1：

```shell
LimitCORE=infinity
LimitNOFILE=infinity
LimitNPROC=infinity

修改为

LimitCORE=65535
LimitNOFILE=65535
LimitNPROC=65535
```

* 方式2：

在`ExecStart`命令后加上创建容器的默认`ulimit`配置

```shell
ExecStart=/usr/bin/dockerd 

修改为

ExecStart=/usr/bin/dockerd --default-ulimit nofile=65536:65536
```

***~~Tips:推荐使用方式2***

## Q2. dokcer 宿主机能够访问局域网内其他ip，但是 docker 容器访问不了

### Quession
一个很奇怪的问题，在 docker 宿主机上可以 `ping`、`telnet` 同另外一台服务器，但是在 docker 容器内 `ping`、`telnet` 均不通。

### Answer

#### 原因

`/usr/lib/systemd/system/docker.service`中配置 `ExecStart=/usr/bin/dockerd -H fd:// --iptables=false --containerd=/run/containerd/containerd.sock`

#### 解决

删除 `--iptables=false`，重新启动 docker 。