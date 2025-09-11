# 树莓派

## 关机

```shell
sudo shutdown -h 
sudo halt
sudo poweroff
sudo init 0
```

## 重启

```shell
sudo reboot
shutdown -r now
```

## 配置

```shell
sudo raspi-config
```

## 中文输入法

安装 fcitx 框架，支持 Google 拼音输入法

```shell
# 更新 apt 源
sudo apt update 
# 安装 fcitx 框架
sudo apt install -y fcitx-googlepinyin
# 重启
sudo reboot
```

使用 Ctrl + Space 切换输入法

## 查看型号

```shell
cat /sys/firmware/devicetree/base/model
```

或者通过 `sudo raspi-config` 进入配置页面，观察左上角输出的系统型号

## 查看电压

```shell
vcgencmd measure_volts
```

## 查看 cpu 温度

```shell
vcgencmd measure_temp
```

## 防火墙

* Raspberry Pi 10（基于 Debian 10 Buster）和更新版本默认使用 `nftables`
* Raspberry Pi 9（基于 Debian 9 Stretch）及更早版本默认使用 `iptables`
* 也可以通过 `ufw` 替代系统默认防火墙

### Raspberry Pi 10 `nftables`

#### 查看防火墙状态

```shell
sudo systemctl status nftables.service
```

#### 启动防火墙

```shell
sudo systemctl start nftables.service
```

#### 关闭防火墙

```shell
sudo systemctl stop nftables.service
```

#### 将 nftables 防火墙配置为在系统启动时默认启动

```shell
sudo systemctl enable nftables.service
```

#### 将 nftables 防火墙配置为在系统启动时默认关闭

```shell
sudo systemctl disable nftables.service
```

#### 检查当前配置的 nftables 防火墙规则

```shell
sudo nft list ruleset
```

#### 刷新（删除）所有当前配置的 nftables 防火墙规则

```shell
sudo nft flush ruleset
```

### Raspberry Pi 9 `iptables`

使用参考 [centos6](../linux/01-Linux常用命令#centos6)

### 自定义 `ufw`

使用参考 [ubuntu](../linux/01-Linux常用命令#ubuntu)

## 挂载移动硬盘

安装工具

```shell
sudo apt update
sudo apt install ntfs-3g exfat-fuse exfat-utils -y
```

1. 查看硬盘信息

```shell
sudo blkid
```
输出信息

```txt
/dev/mmcblk0p2: LABEL="rootfs" UUID="c5583856-6226-4aa4-b8ce-3dc9b364c82d" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="8f71891c-02"
/dev/mmcblk0p1: LABEL_FATBOOT="bootfs" LABEL="bootfs" UUID="F781-C387" BLOCK_SIZE="512" TYPE="vfat" PARTUUID="8f71891c-01"
/dev/sda4: LABEL="Bakup" BLOCK_SIZE="512" UUID="6220F16E20F14A15" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="9090e239-b0cd-4f9a-81a6-f74fe94b42b6"
/dev/sda2: LABEL="SYSTEM" UUID="F077-CB57" BLOCK_SIZE="512" TYPE="vfat" PARTLABEL="EFI system partition" PARTUUID="e1c7a92e-6360-4bfe-8cf5-23c92817351f"
/dev/sda3: PARTLABEL="Microsoft reserved partition" PARTUUID="345da52f-95ce-4931-8442-2973e78bdaa4"
/dev/sda1: LABEL="Windows RE tools" BLOCK_SIZE="512" UUID="D06275DA6275C62E" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="95f50e92-8c7a-4d62-bd63-e656c527b6ed"
```

* 记下你的硬盘分区标识（例如 /dev/sda1）
* 记下它的 UUID（非常重要！比设备名更稳定）
* 记下它的 TYPE（如 ext4, ntfs, exfat, vfat）

2. 创建挂载点

```shell
# 创建一个目录，名字可以自定义，如 'myhdd'
sudo mkdir /mnt/myhdd

# 更改挂载点的所有者为你常用的用户（例如 pi），方便读写
sudo chown pi:pi /mnt/myhdd
```

3. 编辑 /etc/fstab 文件

```shell
sudo vim /etc/fstab
```
添加开机自动挂载
```txt
# <file system>         <mount point>   <type>  <options>           <dump>  <pass>
UUID=d4c5b8a2...1d2e3f  /mnt/myhdd      ext4    defaults,noatime,nofail  0  2
# 如果是 NTFS
# UUID=5C1A-8A7B        /mnt/myhdd      ntfs    defaults,uid=1000,gid=1000,umask=000,nofail 0 0
# 如果是 exFAT
# UUID=5C1A-8A7B        /mnt/myhdd      exfat   defaults,uid=1000,gid=1000,umask=000,nofail 0 0
```

4. 验证

```shell
sudo systemctl daemon-reload
sudo mount -a
df -h
```

6. 重启

```shell
reboot
```

重启后验证

```shell
df -h 
```