# Ubuntu

## ubuntu jammy 22.04.5 LTS 安装 libwebkitgtk-1.0-0

添加 APT 源

```bash
echo "deb http://cz.archive.ubuntu.com/ubuntu bionic main universe" >> /etc/apt/sources.list
```

添加 GPG 公钥

```bash
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32
```

更新 APT 索引

```bash
apt update
```

安装 libwebkitgtk-1.0-0

```bash
apt install libwebkitgtk-1.0-0
```

