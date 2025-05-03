# Kasm

> Kasm 可以让用户在浏览器中使用各种（容器化）软件和操作系统。

## Kasm 镜像

[Github 镜像 Dockerfile](https://github.com/kasmtech/workspaces-images)

## ubuntu-jammy-desktop

```yaml
version: '3.9'
services:
  ubuntu-desktop:
    image: 'kasmweb/ubuntu-jammy-desktop:1.16.1-rolling-weekly'
    shm_size: 2048m
    user: root
    volumes:
      - '$PWD/shares:/home/kasm-user/shares'
      - '$PWD/data:/opt/*'
    environment:
      - LC_ALL=zh_CN.UTF-8
      - 'LANGUAGE=zh_CN:zh'
      - LANG=zh_CN.UTF-8
      - VNC_PW=你的密码
      - START_PULSEAUDIO=0
    ports:
      - '1201:6901'
    container_name: desktop
    restart: always
```
