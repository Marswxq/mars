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

