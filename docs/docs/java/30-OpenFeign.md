# OpenFeign 

## Caused by: java.net.SocketTimeoutException: Read timed out

```yaml
feign:
    client:
        config:
            default:
                # 请求超时时间，默认：1000 毫秒
                connectTimeout: 60000
                # 读取超时时间, 默认：1000 毫秒
                readTimeout: 60000
```
