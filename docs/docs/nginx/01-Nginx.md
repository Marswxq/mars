# Ningx

## nginx.conf 配置

首先看下 nginx 的默认配置，比较直观的可以发现 nginx
配置分为三部分：全局（events{}、http{}之外的部分）、events{}、http{}，又叫做全局块、events块和http块。

```conf
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

### 全局块

> 全局块是默认配置文件从开始到 events 块之间的一部分内容，主要设置一些影响 Nginx 服务器全局参数。通常包括配置运行 Nginx
> 服务器的用户（组）、允许生成的 worker process 数、Nginx 进程 PID 存放路径、日志的存放路径和类型以及配置文件引入等。

**配置参数**

* worker_processes：指定工作线程数，使用`[number | auto]`格式，auto 为自动模式
* pid：pid文件存放的路径，如`logs/nginx.pid`，默认为`/usr/local/nginx/logs/nginx.pid`
* error_log：日志的路径和日志级别，使用`[path] [debug | info | notice | warn | error | crit | alert | emerg]`
  格式，默认为`error_log logs/error.log error;`

### events 块

> events 块涉及的指令主要影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 work process 下的网络连接进行序列化，是否
> 允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 word process 可以同时支持的最大连接数等。

**配置参数**

* accept_mutex：默认是开启状态，支持`[on | off]`
  ，主要解决“惊群问题”——当一个新连接到达时，如果激活了accept_mutex，那么多个Worker将以串行方式来处理，其中有一个Worker会被唤醒，其他的Worker继续保持休眠状态；如果没有激活accept_mutex，那么所有的Worker都会被唤醒，不过只有一个Worker能获取新连接，其它的Worker会重新进入休眠状态
* multi_accept：默认是关闭状态，支持`[on | off]`，关闭状态下 nginx 一个工作进程只能同时接受一个新的连接。否则，一个工作进程可以同时接受所有的新连接
* worker_connections：最大连接数，默认1024

### http 块

> http 块是 Nginx 服务器配置中的重要部分，代理、缓存和日志定义等绝大多数的功能和第三方模块的配置都可以放在这个模块中。
>
> http 块中又包含自己的全局块和 server 块，server 块（server 块可以是多个）中又可以进一步包含 location 块

**配置参数**

* include：引用其他的配置文件
* default_type：默认类型，默认值为`text/plain`，可以配置在 http 块下的全局块、server 块，也可以配置在 server 块下的 location
  块内
* access_log：nginx 应答日志（我理解就是请求转发日志）。格式`access_log path [format [buffer=size]]`，path 为日志路径，format
  为日志格式配置，通过`log_format`参数配置，如果关闭日志使用`access_log off`
* log_format：日志格式，只能在http块中进行配置。配置示例如下：
    ```
    log_format  main '$remote_addr - $remote_user [$time_local] "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                     '"$http_user_agent" "$http_x_forwarded_for"';
    ```

  结合`log_format`完成的`access_log`示例如下：
    ```
    access_log  logs/access.log  main; 
    ```
* sendfile：开启/关闭sendfile方式传输文件，格式`sendfile  on | off;`。
* sendfile_max_chunk：sendfile 最大配置，如`sendfile_max_chunk 128k;`。
* timeout：连接超时时间，默认75s。
* charset：编码，一般设置为`utf-8`。

#### server 块

> server块和“虚拟主机”的概念有密切联系。
>
>
虚拟主机，又称虚拟服务器、主机空间或是网页空间，它是一种技术。该技术是为了节省互联网服务器硬件成本而出现的。这里的“主机”或“空间”是由实体的服务器延伸而来，硬件系统可以基于服务器群，或者单个服务器等。虚拟主机技术主要应用于HTTP、FTP及EMAIL等多项服务，将一台服务器的某项或者全部服务内容逻辑划分为多个服务单位，对外表现为多个服务器，从而充分利用服务器硬件资源。从用户角度来看，一台虚拟主机和一台独立的硬件主机是完全一样的。
>
>
在使用Nginx服务器提供Web服务时，利用虚拟主机的技术就可以避免为每一个要运行的网站提供单独的Nginx服务器，也无需为每个网站对应运行一组Nginx进程。虚拟主机技术使得Nginx服务器可以在同一台服务器上只运行一组Nginx进程，就可以运行多个网站。
>
>在前面提到过，每一个http块都可以包含多个server块，而每个server块就相当于一台虚拟主机，它内部可有多台主机联合提供服务，一起对外提供在逻辑上关系密切的一组服务（或网站）。
>
> 和http块相同，server块也可以包含自己的全局块，同时可以包含多个location块。在server全局块中，最常见的两个配置项是本虚拟主机的监听配置和本虚拟主机的名称或IP配置

##### listen

> server块中最重要的指令就是listen指令，这个指令有三种配置语法。这个指令默认的配置值是：listen *:80 | *:
> 8000；只能在server块种配置这个指令。

```
# 第一种
listen address[:port] [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];

# 第二种
listen port [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];

# 第三种（可以不用重点关注）
listen unix:path [default_server] [ssl] [http2 | spdy] [proxy_protocol] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];

```

**listen 指令参数说明**

* address：监听的 IP 地址（请求来源的 IP 地址），如果是IPv6的地址，需要使用中括号“[]”括起来，比如`[fe80::1]`等。
* port：端口号，如果只定义了IP地址没有定义端口号，就使用80端口。如果未配置 listen 指令，那么 nginx 以超级用户权限运行，使用*:
  80，否则使用*:8000。多个虚拟主机可以同时监听同一个端口,但是 server_name 需要设置为不同的；
* default_server：如果通过 Host 没匹配到对应的虚拟主机，则通过这台虚拟主机处理。
* backlog=number：设置监听函数 listen() 最多允许多少网络连接同时处于挂起状态，在 FreeBSD 中默认为-1，其他平台默认为511。
* accept_filter=filter，设置监听端口对请求的过滤，被过滤的内容不能被接收和处理。本指令只在 FreeBSD 和 NetBSD
  5.0+平台下有效。filter 可以设置为 dataready 或 httpready。
* bind：标识符，使用独立的 bind() 处理此 address:port；一般情况下，对于端口相同而IP地址不同的多个连接，Nginx服务器将只使用一个监听命令，并使用
  bind() 处理端口相同的所有连接。
* ssl：标识符，设置会话连接使用 SSL 模式进行，此标识符和 Nginx 服务器提供的 HTTPS 服务有关。

一些 listen 配置例子

```
# 只监听来自127.0.0.1这个IP，请求80端口的请求（不指定端口，默认80）
listen 127.0.0.1;
# 只监听来自127.0.0.1这个IP，请求8000端口的请求
listen 127.0.0.1:8000;  
# 和上面效果一致
listen localhost:8000; 
# 监听来自所有IP，请求8000端口的请求
listen 8000; 
# 和上面效果一样
listen *:8000;
```

##### server_name

> 用于配置虚拟主机的名称。

server_name 可以配置多个域名，多域名用空格分隔，如果 listen 配置了 ip，server_name 域名就会失去意义，如：

```
server_name abc.com www.baidu.com
```

server_name 也支持通配符`*`和正则表达式，如：

```
server_name *.com www.*.com
```

##### location块

> 一个 server 块下可以包含多个 location 块
>
> location块的主要作用是，地址定向、数据缓存和应答控制等

**配置格式**

```
location [ = | ~ | ~* | ^~ ] uri { ... }
```

* `uri`：地址
* `=`：请求字符串与 uri 严格匹配。如果已经匹配成功，就停止继续向下搜索并立即处理此请求。
* `~`：表示 uri 包含正则表达式，并且区分大小写。
* `^~`：找到标识 uri 和请求字符串匹配度最高的 location 后，立即使用此location处理请求，而不再使用 location 块中的正则 uri
  和请求字符串做匹配。
* `~*`：用于表示 uri 包含正则表达式，并且不区分大小写。注意如果 uri 包含正则表达式，就必须要使用`~`或者`~*`标识。

## nginx 命令

```bash
root@product-nginx:/# nginx -?
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help # 帮助
  -v            : show version and exit # 查看版本
  -V            : show version and configure options then exit # 查看版本和安装的插件
  -t            : test configuration and exit # 测试配置文件
  -T            : test configuration, dump it and exit # 测试配置文件并转存
  -q            : suppress non-error messages during configuration testing # 在配置测试期间禁止显示非错误消息
  -s signal     : send signal to a master process: stop, quit, reopen, reload # 向主进程发送信号：停止(直接关闭)、退出(等待工作进程处理完成后关闭)、重新打开、重新加载（热加载，重新加载配置文件）
  -p prefix     : set prefix path (default: /etc/nginx/)  # 指定nginx的安装目录
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf) # 指定配置文件
  -g directives : set global directives out of configuration file # 配置文件意外的全局指令，如 nginx -g "pid /var/run/nginx.pid; worker_processes `sysctl -n hw.ncpu`;"
```

## 常用配置

### https

```conf
http {
	server {
        listen       443 ssl; # https端口，支持自定义。ssl用于告诉Nginx在指定的端口上启用SSL/TLS加密
        server_name  example.com; # 域名
        
        # 下面输入证书和私钥的地址
        ssl_certificate      certs/my_cert.crt; # 证书
        ssl_certificate_key  certs/my_cert.key; # 证书对应的私钥文件
        
        ssl_session_cache    shared:SSL:1m; # 可选配置，设置了 SSL 会话缓存的类型和大小。shared 表示在所有工作进程之间共享缓存。SSL 是缓存的名称。1m 表示缓存的最大大小为 1 兆字节。
        ssl_session_timeout  5m; # 可选配置，设置了 SSL 会话缓存的超时时间为 5 分钟。

        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; # 可选配置， 指定了 SSL/TLS 握手过程中允许使用的加密算法的优先级顺序。
        ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; # 可选配置，指定了允许使用的 SSL/TLS 协议版本。建议只启用安全的协议版本，如 TLSv1.1、TLSv1.2 和 TLSv1.3，禁用不安全的 SSL v2 和 SSL v3。
        ssl_prefer_server_ciphers  on; # 可选配置
	}
	# 将请求转成https
	server {
        listen 80;
        server_name example.com;
        rewrite ^(.*)$ https://$host$1 permanent;
    }
}
```

上面配置中有一段“将请求转成https”的方式，也可以使用如下方式

```conf
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

### autoindex （文件下载）

[ngx_http_autoindex_module 官方文档](https://nginx.org/en/docs/http/ngx_http_autoindex_module.html)

```conf
localtion /download {
    alias /opt/share; # 文件存储路径
    # 开启或禁用目录浏览功能，默认是禁用
    autoindex on;
    # 显示出文件的确切大小，单位是bytes。一般会改为off，显示出文件的大概大小，单位自动匹配为 kB 、MB 、GB。默认为开启
    autoindex_exact_size on;
    # 设置目录列表的格式。默认是 html；可选格式：html | xml | json | jsonp
    autoindex_format html;
    # on显示文件的本地时间;否则显示文件的GMT时间。默认是off
    autoindex_localtime on;
    charset utf-8;
}
```

### auth_basic （HTTP 认证）

auth_basic 依赖 htpasswd 等外部密码工具

1. 安装 htpasswd

* debian 系

```bash
apt-get update
apt-get install apache2-utils
```

* redhat 系

```bash
yum install httpd-tools
```

2. 生成密码

```bash 
htpasswd -c /usr/local/nginx/conf/htpasswd username
```

`/usr/local/nginx/conf/htpasswd`是密码文件，`username`是登录时候用的用户名

3. nginx 配置

可以在 http 块、server 块、location 块中配置权限，具体根据个人需求

```text
      auth_basic "请输入账号密码";   # 登录框的提示信息
      auth_basic_user_file /usr/local/nginx/conf/htpasswd; # 步骤2中配置的密码文件
```

### proxy_pass（反向代理）

```conf
server {
    listen  80;
    server_name http://172.1.2.10:8080; # 代理ip，客户端能看到的，使用的ip
    index index.html index.htm index.php;
    access_log /var/log/nginx/99cdtop.access.log  main;
    access_log on;
    location / {
        proxy_redirect off ; # 指定修改被代理服务器返回的响应头中的 location 头域或 refresh 头域数值 ，语法是proxy_redirect [default|off|redirect replacement]，用于重定向地址使用
        proxy_set_header Host $host; # 确保了请求头中的 Host 字段被正确传递，避免了请求中的 Host 头被 Nginx 默认值覆盖
        proxy_set_header X-Real-IP $remote_addr; # 用于存储客户端的真实 IP 地址
        proxy_set_header REMOTE-HOST $remote_addr; 
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        proxy_buffer_size 1600k;
        proxy_buffers 4 3200k;
        proxy_busy_buffers_size 6400k;
        proxy_temp_file_write_size 6400k;
        proxy_max_temp_file_size 128m;
        proxy_pass  http://127.0.0.10:8080; # 真实的ip，一般多是服务端ip
    }
}
```

### upstream（负载均衡）

```conf
upstream	node	{
	server	你的IP:8081;
	server	你的IP:8082;
	server	你的IP:8083;
}
server	{
	server_name	localhost;
	listen	80;
		location	/	{
		proxy_pass	http://node;
		proxy_set_header    Host    $http_host;
		proxy_set_header    X-Real-IP   $remote_addr;
		proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
	}
}
```

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
