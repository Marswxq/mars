# Swarm

**目录**

[[toc]]

## 概述

* 容器编排工具：Docker Swarm 是 Docker 官方提供的容器编排工具，用于在多个 Docker 主机上管理和编排容器化应用。

* 集群管理：通过 Docker Swarm，用户可以将多个 Docker 主机组成一个集群，并统一管理这些主机上运行的容器。

* 服务定义：用户可以使用 Docker Swarm 定义服务，将容器组织成一个逻辑单元，包括容器的镜像、端口映射、副本数量等。

* 自动负载均衡：Docker Swarm 自动在集群中的节点之间分配容器，并提供负载均衡功能，确保应用程序的高可用性和性能。

* 扩展性：Docker Swarm 具有良好的扩展性，可以根据需求动态扩展集群的规模，并且可以轻松地与其他 Docker 生态系统集成。

## 查看集群信息

```shell
docker info
```

## docker service

### 查看正在运行的服务

```shell
docker service ls
```

### 查看某个服务运行状态

```shell
docker service ps [servicename]
```

### 删除服务

```shell
docker service rm [servicename]
```

### 增加和删除端口映射

* 增加端口映射

```shell
docker service update --publish-add 宿主机端口:容器端口 [servicename]
```

* 减少端口映射

```shell
docker service update --publish-rm 宿主机端口:容器端口 [servicename]
```

### 查看日志

从日志末尾显示日志，并持续输出

```shell
docker service logs -f --tail 20 [servicename]
```
