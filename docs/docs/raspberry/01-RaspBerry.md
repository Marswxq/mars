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

使用参考 [centos6](../linux/01-Linux常用#centos6)

### 自定义 `ufw`

使用参考 [ubuntu](../linux/01-Linux常用#ubuntu)