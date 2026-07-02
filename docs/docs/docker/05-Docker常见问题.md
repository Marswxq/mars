# Docker 常见问题

## Q1. library initialization failed - unable to allocate file descriptor table - out of memoryAborted (core dumped)

### Quession

docker 启动报错：

```text
library initialization failed - unable to allocate file descriptor table - out of memory
```

或 docker 容器内应用启动报错：

```text
library initialization failed - unable to allocate file descriptor table - out of memoryAborted (core dumped)
```

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

`/usr/lib/systemd/system/docker.service`
中配置 `ExecStart=/usr/bin/dockerd -H fd:// --iptables=false --containerd=/run/containerd/containerd.sock`。
因为 docker 默认使用 `iptables` 进行网络配置，如果禁用 `iptables` 会导致 docker 容器内部的网络无法使用宿主机网络转发。

#### 解决

删除 `--iptables=false`，重新启动 docker 。

## Q3. Swarm TLS CA 证书过期

### Quession

docker 报错：
```text
Error grabbing logs: rpc error: code = Unknown desc = warning: incomplete log stream. some logs could not be retrieved for the following reasons: node tureas8p7he0j921fyeve5l2t is not available
```

### Answer

#### 原因

Swarm 默认证书有效期 90 天，过期节点间通信直接中断

#### 解决

Manager 执行

```shell
# 查看证书有效期
docker system info | grep -A5 "CA Configuration"

# 延长证书有效期（推荐设10年）
docker swarm update --cert-expiry 87600h

# 轮换证书，所有节点自动同步
docker swarm ca --rotate

# 再次查看证书有效期，验证结果
docker system info | grep -A5 "CA Configuration"
```

轮换后重启所有节点 docker 生效。