# Yum 源

**目录**

[[toc]]

## Centos Yum 源

### 创建基础目录

* iso 文件路径

```shell
mkdir -p /opt/centos
```

* yum 源挂载路径

```shell
mkdir -p /mnt/iso
```

### 上传 centoos.iso

将本地下载好的 centos.iso 上传到服务器 `/opt/centos` 下

### 挂载 iso

```shell
mount -o loop /opt/centos/CentOS-7-x86_64-DVD-1810.iso /mnt/iso
```

查看挂载结果

```shell
df -h
```

![iso挂载结果](/images/linux/yum_iso.png)

### 配置 repo

```shell
vi /etc/yum.repos.d/local.repo
```

增加如下内容（填写后输入`:wq`，保存并退出）

```text
name=Local CentOS Repository
baseurl=file:///mnt/iso
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
```

### 清理 yum 缓存

```shell
yum clean all 
```

### 加载 yum 缓存

```shell
yum makecache
```