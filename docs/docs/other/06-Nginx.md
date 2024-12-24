# Ningx

## 常见问题

### Q1.Http状态码413（Request Entity Too Large）

检查`nginx.conf`配置文件中 http{} 或 server{} 或 location{} 下`client_max_body_size`配置的大小，默认1m

修改为

```properties
# 默认1m，根据使用场景据实修改
client_max_body_size 10m 
```

重新加载 nginx 配置

```shell
nginx -s reload
```
