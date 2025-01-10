# Docker常用汇总

## 安装字体库

### 使用 DockerFile 

#### Alpine Linux

```dockerfile
# 安装中文字体
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories  \
    && apk add --update ttf-dejavu fontconfig  \
    && rm -rf /var/cache/apk/*  \
    && mkfontscale  \
    && mkfontdir  \
    && fc-cache
# 添加宋体
COPY ./script/simsun.ttc /usr/share/fonts/ttf-dejavu
```

#### Debian Linux

```dockerfile
RUN sed -i 's/http:\/\/deb.debian.org/http:\/\/mirrors.aliyun.com/g' /etc/apt/sources.list
RUN apt update && apt install -y fontconfig && fc-cache -fv
```