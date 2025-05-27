# Rustdesk

> [github 官方文档](https://github.com/rustdesk/rustdesk/blob/master/docs/README-ZH.md)

## 服务端

使用`docker-compose`方式部署 Rustdesk 服务端

1. 创建 docker-compose.yml

```shell
cat > docker-compose.yml << 'EOF'
version: '3'

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:1.1.14
    command: hbbs -r [中继服务器公网ip] -k [key]
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:1.1.14
    command: hbbr -k [key]
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
EOF
```

**注意：** [中继服务器公网ip] 和 [key] 在而客户端配置时会用到，只有填写了中继服务器和 key 才能使用自己服务器作为服务端

2. 启动服务

```shell
docker compose up -d 
```

## 客户端

[Rustdesk客户端下载](https://github.com/rustdesk/rustdesk/releases/tag/1.4.0)

1. 中继服务器

![中继服务配置](/images/rustdesk/rustdesk-client.png)

2. ID/中继服务器

![ID/中继服务器](/images/rustdesk/rustdesk-client-property.png)

3. 登录

![登录](/images/rustdesk/rustdesk-client-login.png)