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