# Stack

**目录**

[[toc]]

## 概述

* 应用定义：Docker Stack 是用于定义、部署和管理应用程序的工具。它使用 YAML 文件（通常命名为 docker-compose.yml）来描述应用程序的服务、网络和卷等配置。

* Swarm 集群部署：Docker Stack 是基于 Docker Swarm 构建的，用户可以使用 Docker Stack 将定义好的应用程序部署到 Swarm 集群中。

* 服务定义：与 Docker Compose 相似，Docker Stack 允许用户使用 YAML 文件定义多个服务，并指定它们之间的依赖关系、网络连接等。

* 自动伸缩：通过 Docker Stack，用户可以轻松地扩展应用程序的规模，根据需要增加或减少服务的副本数量。

* 更新管理：Docker Stack 提供了方便的更新管理功能，用户可以定义更新策略，实现无缝地更新应用程序版本。

## Docker Stack 和 Docker Compose 区别

Docker stack会忽略了“构建”指令，无法使用stack命令构建新镜像，它是需要镜像是预先已经构建好的。 所以docker-compose更适合于开发场景；
Docker Compose是一个Python项目，在内部，它使用Docker API规范来操作容器。所以需要安装Docker
-compose，以便与Docker一起在您的计算机上使用；Docker Stack功能包含在Docker引擎中。你不需要安装额外的包来使用它，docker
stacks 只是swarm mode的一部分。
Docker stack不支持基于第2版写的docker-compose.yml ，也就是version版本至少为3。然而Docker Compose对版本为2和3的 文件仍然可以处理；
docker stack把docker compose的所有工作都做完了，因此docker stack将占主导地位。同时，对于大多数用户来说，切换到使用
单机模式（Docker Compose）是一台主机上运行多个容器，每个容器单独提供服务；集群模式（swarm + stack）是多台机器组成一个集群，多个容器一起提供同一个服务；

## compose.yml deploy 配置说明

docker-compose.yaml文件中deploy参数下的各种配置主要对应了swarm中的运维需求。

docker stack deploy不支持的参数：

（这些参数，就算yaml中包含，在stack的时候也会被忽略，当然也可以为了docker-compose up留着这些配置）

```yaml
build
cgroup_parent
container_name
devices
tmpfs
external_links
links
network_mode
restart
security_opt
userns_mode
```

deploy：指定与服务的部署和运行有关的配置。注：只在 swarm 模式和 stack 部署下才会有用。且仅支持 V3.4 及更高版本。

可以选参数：

- endpoint_mode：访问集群服务的方式。3.2版本开始引入的配置。用于指定服务发现，以方便外部的客户端连接到swarm

    - vip：默认的方案。即通过 Docker 集群服务一个对外的虚拟 ip对外暴露服务，所有的请求都会通过这个虚拟 ip
      到达集群服务内部的机器，客户端无法察觉有多少个节点提供服务，也不知道实际提供服务的IP和端口。

    - dnsrr：DNS的轮询调度。所有的请求会自动轮询获取到集群 ip 列表中的一个 ip
      地址。客户端访问的时候，Docker集群会通过DNS列表返回对应的服务一系列IP地址，客户连接其中的一个。这种方式通常用于使用自己的负载均衡器，或者window和linux的混合应用。

- labels：在服务上设置标签，并非附加在service中的容器上。如果在容器上设置标签，则在deploy之外定义labels。可以用容器上的
  labels（跟 deploy 同级的配置） 覆盖 deploy 下的 labels。
- mode：用于指定是以副本模式（默认）启动还是全局模式

    - replicated：副本模式，复制指定服务到集群的机器上。默认。

    - global：全局模式，服务将部署至集群的每个节点。类似于k8s中的DaemonSet，会在每个节点上启动且只启动一个服务。

- replicas：用于指定副本数，只有mode为副本模式的时候生效。

- placement：主要用于指定约束和偏好。这个参数在运维的时候尤为关键

    - constraints(约束)：表示服务可以部署在符合约束条件的节点上，包含了：

| node attribute	    | matches            | 	example                                       |
|--------------------|--------------------|------------------------------------------------|
| node.id            | 	节点id              | node.id == 2ivku8v2gvtg4                       |
| node.hostname      | 	节点主机名             | 	node.hostname  != node-2                      |
| node.role          | 	节点角色              | (manager/worker)                               |	node.role == manager|
| node.platform.os   | 	节点操作系统            | 	node.platform.os== windows                    |
| node.platform.arch | 	节点架构              | 	node.platform.arch== x86_64                   |
| node.labels        | 	用户定义的labels       | 	node.labels.security == high                  |                      
| engine.labels      | 	Docker 引擎的 labels | 	engine.labels.operatingsystem == ubuntu-14.04 |

- preferences(偏好)：表示服务可以均匀分布在指定的标签下。

- preferences 只有一个参数，就是spread，其参数值为节点的属性，即约束表中的内容

  例如：node.labels.zone这个标签在集群中有三个值，分别为west、east、north，那么服务中的副本将会等分为三份，分布到带有三个标签的节点上。

    - max_replicas_per_node：3.8版本中开始引入的配置。控制每个节点上最多的副本数。
      注意：当 最大副本数*集群中可部署服务的节点数<副本数，会报错

- resources：用于限制服务的资源，这个参数在运维的时候尤为关键。

示例：配置 redis 集群运行需要的 cpu 的百分比 和 内存的占用。避免占用资源过高出现异常。

- limit：用于限制最大的资源使用数量

    - cpus：cpu占比，值的格式为百分比的小数格式

    - memory：内存的大小。示例：512M

- reservation：为最低的资源占用量。

    - cpus

    - memory

- restart_policy：容器的重启策略

    - condition：重启的条件。可选 none，on-failure 或者 any。默认值：any

    - delay：尝试重启的时间间隔（默认值：5s）。

    - max_attempts：最大尝试重启容器的次数，超出次数，则不再尝试（默认值：一直重试）.

    - window：判断重启是否成功之前的等待时间（一个总的时间，如果超过这个时间还没有成功，则不再重启）。

- rollback_config：更新失败时的回滚服务的策略。3.7版本加入。和升级策略相关参数基本一致。

- update_config：配置应如何更新服务，对于配置滚动更新很有用。

    - parallelism：同时升级[回滚]的容器数

    - delay：升级[回滚]一组容器的时间间隔

    - failure_action：若更新[回滚]失败之后的策略：continue、 pause、rollback(仅在update_config中有) 。默认 pause

    - monitor：容器升级[回滚]之后，检测失败的时间检测 (支持的单位：ns|us|ms|s|m|h)。默认为 5s

    - max_failure_ratio：最大失败率

    - order：升级[回滚]期间的操作顺序。可选：stop-first（串行回滚，先停止旧的）、start-first（并行回滚，先启动新的）。默认
      stop-first 。注意：只支持v3.4及更高版本

## compose.yml 文件示例

```yaml
version: "3"        # 版本号，deploy功能是3版本及以上才有的
services: # 服务，每个服务对应配置相同的一个或者多个docker容器
  redis: # 服务名，自取
    image: redis:alpine        # 创建该服务所基于的镜像。使用stack部署，只能基于镜像
    ports: # 容器内外的端口映射情况
      - "1883:1883"
      - "9001:9001"
    networks: # 替代了命令行模式的--link选项
      - fiware
    volumes: # 容器内外数据传输的对应地址
      - "/srv/mqtt/config:/mqtt/config:ro"
      - "/srv/mqtt/log:/mqtt/log"
      - "/srv/mqtt/data/:/mqtt/data/"
    command: -dbhost stack_mongo # 命令行模式中跟在最后的参数，此条没有固定的格式，建议参照所部署的docker镜像的说明文档来确定是否需要该项、需要写什么
    deploy:
      mode: replicated
      replicas: 6            # replicas模式， 副本数目为1
      endpoint_mode: vip
      labels:
        description: "This redis service label"
      resources:
        limits:
          cpus: '0.50'
          memory: 50M
        reservations:
          cpus: '0.25'
          memory: 20M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
      placement:
        constraints:
          - "node.role==worker"        # 部署位置，只在工作节点部署
          - "engine.labels.operatingsystem==ubuntu 18.04"
        preferences:
          - spread: node.labels.zone
      update_config:
        parallelism: 2
        delay: 10s
        order: stop-first

networks: # 定义部署该项目所需要的网络
  fiware:
```

## stack 常用命令

### 部署

部署一个新的stack(堆栈)或更新现有的stack。别名：deploy, up

```shell
docker stack deploy [options] 自定义STACK名称
```

options:
* `-c, --compose-file strings`，Compose文件的路径，或从标准输入中读取的“-”
* `--orchestrator string`，指定编排模式 (swarm|kubernetes|all)
* `--prune`，表示削减不再引用的服务。可以把一些down掉的service进行自动清理。
* `resolve-image string`，请求仓库来重新解析镜像的摘要和支持的平台。("always"|"changed"|"never") (默认 "always")
* `--with-registry-auth`，发送仓库的授权详情到Swarm代理
* `--orchestrator`，使用的容器编排服务

#### 通过 compose.yml 文件指令部署

```shell
docker stack deploy -c 文件名.yml 自定义STACK名称
```

### 查看

#### 查看 stack 信息

```shell
docker stack ls 
```

#### 查看 stack 中的任务

```shell
docker stack ps STACK
```

#### 查看 stack 中的服务

```shell
docker stack services STACK
```

### 删除

删除一个或多个堆栈。别名：rm, remove, down

```shell
docker stack rm [options] STACK [STACK...]
```
options:

* `--orchestrator string`，指定适配器 (swarm|kubernetes|all)
