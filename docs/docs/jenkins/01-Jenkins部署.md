# Jenkins 部署

> 本文以 docker 部署方式为例

## 拉取镜像

> 因为众说周知的原因，dockerhub 上不去，本文中镜像都以 `https://docker.aityp.com/` 提供的代理镜像为例

```shell
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/jenkins/inbound-agent:latest-jdk17
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/jenkins/inbound-agent:latest-jdk17  docker.io/jenkins/inbound-agent:latest-jdk17
```

## 准备 docker 运行环境

### 创建挂载目录

```shell
mkdir -p /data/jenkins/jenkins_home /data/jenkins/tool
```

### 创建 jenkins 用户

```shell
useradd -g docker jenkins
# 或
usermod -a -G docker jenkins
```

***注意：*** 如果 jenkins 容器运行时没有 jenkins_home 权限，可以暴力的给其他用户个 7 的权限，`chmod 747 /data/jenkins/jenkins_home`

### 下载 maven

按照使用需求下载 [maven](https://maven.apache.org/download.cgi)

### 上传 maven

将下载好的 maven 上传到 `/data/jenkins/tool/` 下，并解压

### 安装 git

在宿主机下载 Git 并安装（网上例子太多，此处省略。。。）

## 部署 docker

### 编写 yml

本文以 stack 脚本为例，如果使用 `docker run`,`docker-compose` 自行转换即可

```shell
cat > /data/jenkins/ds-jenkins.yml << 'EOF'
version: '3.8'
services:
  jenkins:
    hostname: "jenkins"
    environment:
      - TZ=Asia/Shanghai
      - JAVA_OPTS=-server -Xms5000m -Xmx5000m -XX:MaxNewSize=256m -XX:PermSize=128m -XX:MaxPermSize=256m
    volumes:
      - "/data/jenkins/jenkins_home:/var/jenkins_home"
      - "/data/jenkins/tool:/usr/local/maven"
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "/usr/bin/docker:/usr/bin/docker"
    image: "jenkins/jenkins:2.475"
    ports:
      - "9080:8080"
    deploy:
      mode: replicated
      replicas: 1
      resources:
        limits:
          memory: 6144M
EOF
```

### 部署 docker 容器

```shell
docker stack deploy --with-registry-auth -c /data/jenkins/ds-jenkins.yml devops
```

检查服务是否正常，如下内容说明服务启动成功

![jenkins部署](/images/jenkins/jenkins_password.png)

控制台输出了一个 jenkins 的初始密码，用于 jenkins 初始配置（解锁 jenkins）

**Tips:~~** 至此，jenkins docker 容器部署完成。


## Jenkins 安装配置

登录 jenkins 控制台：`http://[服务器ip]:9080`

### 解锁 jenkins

此处使用[部署 docker 容器](#部署 docker 容器)中产生的初始密码。

![初始密码](/images/jenkins/jenkins1.png)

### 安装插件

![安装插件1](/images/jenkins/jenkins2.png)

耐心等待。。。

![安装插件2](/images/jenkins/jenkins3.png)

### 配置管理员

![配置管理员](/images/jenkins/jenkins4.png)

填写管理员账号、密码、邮箱等信息

![管理员信息](/images/jenkins/jenkins5.png)

### 实例配置

默认即可

![实例配置](/images/jenkins/jenkins6.png)

### 完成

![完成配置](/images/jenkins/jenkins7.png)

## Jenkins 使用配置

登录 jenkins 控制台：`http://[服务器ip]:9080`

### 系统配置

进入设置页面

![jenkins 使用配置](/images/jenkins/jenkins_setting.png)

系统配置

![系统配置](/images/jenkins/jenkins_setting_system.png)

git 用户配置

![git 用户配置](/images/jenkins/jenkins_setting_system_git.png)

### 系统插件

![系统插件](/images/jenkins/jenkins_setting_system_plugins.png)

安装 NodeJs

![安装 NodeJs](/images/jenkins/jenkins_setting_system_plugins_node.png)

![安装 NodeJs1](/images/jenkins/jenkins_setting_system_plugins_node1.png)

安装 Maven

![安装 NodeJs1](/images/jenkins/jenkins_setting_system_plugins_maven.png)

***注意：*** 安装完插件需要重启 jenkins ， 推荐勾选 “安装完成后重启 jenkins （空闲时）”

### 全局配置

![全局配置](/images/jenkins/jenkins_setting_tool.png)

maven 配置

![maven 配置](/images/jenkins/jenkins_setting_system_macven1.png)

### setting 配置

![setting 配置](/images/jenkins/jenkins_setting_system_plugins_maven.png)

![setting 配置1](/images/jenkins/jenkins_setting_system_plugins_maven1.png)

### node 配置

![node 配置1](/images/jenkins/jenkins_setting_system_noed.png)

### 登录

![登录](/images/jenkins/jenkins_login.png)

**Tips:~~** 至此，jenkins 安装、配置完成，祝您旅途愉快~~~
