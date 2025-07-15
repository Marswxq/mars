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

## OpenFeign Get 请求报错，状态码 400

具体报错如下：

```html
<!doctype html>
<html lang="en">
<head><title>HTTP Status 400 – Bad Request</title>
    <style type="text/css">body {
        font-family: Tahoma, Arial, sans-serif;
    }

    h1, h2, h3, b {
        color: white;
        background-color: #525D76;
    }

    h1 {
        font-size: 22px;
    }

    h2 {
        font-size: 16px;
    }

    h3 {
        font-size: 14px;
    }

    p {
        font-size: 12px;
    }

    a {
        color: black;
    }

    .line {
        height: 1px;
        background-color: #525D76;
        border: none;
    }</style>
</head>
<body><h1>HTTP Status 400 – Bad Request</h1></body>
</html>
```

原因是 header 信息过长，可以“简单粗暴”的修改为 Post 请求。