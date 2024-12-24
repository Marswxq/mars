# Ningx

## nginx.conf 配置

首先看下 nginx 的默认配置，比较直观的可以发现 nginx 配置分为三部分：全局（events{}、http{}之外的部分）、events{}、http{}，又叫做全局块、events块和http块。

```txt
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

> 全局块是默认配置文件从开始到 events 块之间的一部分内容，主要设置一些影响 Nginx 服务器全局参数。通常包括配置运行 Nginx 服务器的用户（组）、允许生成的 worker process 数、Nginx 进程 PID 存放路径、日志的存放路径和类型以及配置文件引入等。

**配置参数**

* worker_processes：指定工作线程数，使用`[number | auto]`格式，auto 为自动模式
* pid：pid文件存放的路径，如`logs/nginx.pid`，默认为`/usr/local/nginx/logs/nginx.pid`
* error_log：日志的路径和日志级别，使用`[path] [debug | info | notice | warn | error | crit | alert | emerg]`格式，默认为`error_log logs/error.log error;`

### events 块

> events 块涉及的指令主要影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 work process 下的网络连接进行序列化，是否 允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 word process 可以同时支持的最大连接数等。

**配置参数**

* accept_mutex：默认是开启状态，支持`[on | off]`，主要解决“惊群问题”——当一个新连接到达时，如果激活了accept_mutex，那么多个Worker将以串行方式来处理，其中有一个Worker会被唤醒，其他的Worker继续保持休眠状态；如果没有激活accept_mutex，那么所有的Worker都会被唤醒，不过只有一个Worker能获取新连接，其它的Worker会重新进入休眠状态
* multi_accept：默认是关闭状态，支持`[on | off]`，关闭状态下 nginx 一个工作进程只能同时接受一个新的连接。否则，一个工作进程可以同时接受所有的新连接
* worker_connections：最大连接数，默认1024

### http 块

> http 块是 Nginx 服务器配置中的重要部分，代理、缓存和日志定义等绝大多数的功能和第三方模块的配置都可以放在这个模块中。
> 
> http 块中又包含自己的全局块和 server 块，server 块（server 块可以是多个）中又可以进一步包含 location 块

**配置参数**

* include：引用其他的配置文件
* default_type：默认类型，默认值为`text/plain`，可以配置在 http 块下的全局块、server 块，也可以配置在 server 块下的 location 块内
* access_log：nginx 应答日志（我理解就是请求转发日志）。格式`access_log path [format [buffer=size]]`，path 为日志路径，format 为日志格式配置，通过`log_format`参数配置，如果关闭日志使用`access_log off`
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
> 虚拟主机，又称虚拟服务器、主机空间或是网页空间，它是一种技术。该技术是为了节省互联网服务器硬件成本而出现的。这里的“主机”或“空间”是由实体的服务器延伸而来，硬件系统可以基于服务器群，或者单个服务器等。虚拟主机技术主要应用于HTTP、FTP及EMAIL等多项服务，将一台服务器的某项或者全部服务内容逻辑划分为多个服务单位，对外表现为多个服务器，从而充分利用服务器硬件资源。从用户角度来看，一台虚拟主机和一台独立的硬件主机是完全一样的。
> 
> 在使用Nginx服务器提供Web服务时，利用虚拟主机的技术就可以避免为每一个要运行的网站提供单独的Nginx服务器，也无需为每个网站对应运行一组Nginx进程。虚拟主机技术使得Nginx服务器可以在同一台服务器上只运行一组Nginx进程，就可以运行多个网站。
> 
>在前面提到过，每一个http块都可以包含多个server块，而每个server块就相当于一台虚拟主机，它内部可有多台主机联合提供服务，一起对外提供在逻辑上关系密切的一组服务（或网站）。
> 
> 和http块相同，server块也可以包含自己的全局块，同时可以包含多个location块。在server全局块中，最常见的两个配置项是本虚拟主机的监听配置和本虚拟主机的名称或IP配置

##### listen 

> server块中最重要的指令就是listen指令，这个指令有三种配置语法。这个指令默认的配置值是：listen *:80 | *:8000；只能在server块种配置这个指令。

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
* port：端口号，如果只定义了IP地址没有定义端口号，就使用80端口。如果未配置 listen 指令，那么 nginx 以超级用户权限运行，使用*:80，否则使用*:8000。多个虚拟主机可以同时监听同一个端口,但是 server_name 需要设置为不同的；
* default_server：如果通过 Host 没匹配到对应的虚拟主机，则通过这台虚拟主机处理。
* backlog=number：设置监听函数 listen() 最多允许多少网络连接同时处于挂起状态，在 FreeBSD 中默认为-1，其他平台默认为511。
* accept_filter=filter，设置监听端口对请求的过滤，被过滤的内容不能被接收和处理。本指令只在 FreeBSD 和 NetBSD 5.0+平台下有效。filter 可以设置为 dataready 或 httpready。
* bind：标识符，使用独立的 bind() 处理此 address:port；一般情况下，对于端口相同而IP地址不同的多个连接，Nginx服务器将只使用一个监听命令，并使用 bind() 处理端口相同的所有连接。
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

server_name 可以配置多个域名（也可以是 IP 地址），多域名用空格分隔，如：

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
* `^~`：找到标识 uri 和请求字符串匹配度最高的 location 后，立即使用此location处理请求，而不再使用 location 块中的正则 uri 和请求字符串做匹配。
* `~*`：用于表示 uri 包含正则表达式，并且不区分大小写。注意如果 uri 包含正则表达式，就必须要使用`~`或者`~*`标识。

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
