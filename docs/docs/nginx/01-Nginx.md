# Ningx

## nginx.conf 配置

首先看下 nginx 的默认配置，比较直观的可以发现 nginx
配置分为三部分：全局（events{}、http{}之外的部分）、events{}、http{}，又叫做全局块、events块和http块。

```nginx
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
    ```nginx
    log_format  main '$remote_addr - $remote_user [$time_local] "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                     '"$http_user_agent" "$http_x_forwarded_for"';
    ```

  结合`log_format`完成的`access_log`示例如下：
    ```nginx
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

```nginx
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

```nginx
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

```nginx
server_name abc.com www.baidu.com
```

server_name 也支持通配符`*`和正则表达式，如：

```nginx
server_name *.com www.*.com
```

##### location块

> 一个 server 块下可以包含多个 location 块
>
> location块的主要作用是，地址定向、数据缓存和应答控制等

**配置格式**

```nginx
location [ = | ~ | ~* | ^~ ] uri { ... }
```

| 匹配符   | 说明                                                                                    | 
|-------|---------------------------------------------------------------------------------------|
| `uri` | 地址                                                                                    |
| `=`   | 请求字符串与 uri 严格匹配。如果已经匹配成功，就停止继续向下搜索并立即处理此请求。                                           |
| `~`   | 表示 uri 包含正则表达式，并且区分大小写。                                                               |
| `^~`  | 找到标识 uri 和请求字符串匹配度最高的 location 后，立即使用此location处理请求，而不再使用 location 块中的正则 uri和请求字符串做匹配。 |
| `~*`  | 用于表示 uri 包含正则表达式，并且不区分大小写。注意如果 uri 包含正则表达式，就必须要使用`~`或者`~*`标识。                         |

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

```nginx
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

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

### autoindex （文件下载）

[ngx_http_autoindex_module 官方文档](https://nginx.org/en/docs/http/ngx_http_autoindex_module.html)

```nginx
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

```nginx
auth_basic "请输入账号密码";   # 登录框的提示信息
auth_basic_user_file /usr/local/nginx/conf/htpasswd; # 步骤2中配置的密码文件
```

### proxy_pass（反向代理）

```nginx
server {
    listen  80;
    server_name http://172.1.2.10:8080; # 代理ip，客户端能看到的，使用的ip
    index index.html index.htm index.php;
    access_log /var/log/nginx/99cdtop.access.log  main;
    access_log on;
    location / {
        proxy_redirect off ; # 指定修改被代理服务器返回的响应头中的 location 头域或 refresh 头域数值 ，语法是proxy_redirect [default|off|redirect replacement]，用于重定向地址使用
        proxy_set_header Host $host; # 确保了请求头中的 Host 字段被正确传递，避免了请求中的 Host 头被 Nginx 默认值覆盖。如果是地址和端口一起转发使用 $host:$proxy_port 配置
        proxy_set_header X-Real-IP $remote_addr; # 用于存储客户端的真实 IP 地址
        proxy_set_header REMOTE-HOST $remote_addr; 
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # HTTP的请求端真实的IP
        proxy_connect_timeout 600; # 连接超时，proxy_connect_timeout timeout_in_seconds 单位是秒，默认60s
        proxy_send_timeout 600; # 发送请求给 upstream 服务器的超时时间。超时设置不是为了整个发送期间，而是在两次write操作期间。如果超时后，upstream没有收到新的数据，nginx会关闭连接
        proxy_read_timeout 600;  # 代理服务器的读超时时间，决定 nginx 会等待多长时间来获得请求的响应。这个时间不是获得整个response 的时间，而是两次 reading 操作的时间。默认60s
        proxy_buffer_size 1600k; # 缓冲区大小,从被代理的后端服务器取得的响应内容,会先读取放置到这里
        proxy_buffers 4 3200k; # 缓冲区的大小和数量，从被代理的后端服务器取得的响应内容,会放置到这里. 默认情况下,一个缓冲区的大小等于页面大小,可能是4K也可能是8K,这取决于平台
        proxy_busy_buffers_size 6400k; 
        proxy_temp_file_write_size 6400k; 
        proxy_max_temp_file_size 128m;
        proxy_pass  http://127.0.0.10:8080; # 真实的ip，一般多是服务端ip
    }
}
```

### upstream（负载均衡）

```nginx
#定义Nginx运行的用户和用户组
user www www;

#nginx进程数，建议设置为等于CPU总核心数。
worker_processes 8;
 
#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
error_log /usr/local/nginx/logs/error.log info;

#进程pid文件
pid /usr/local/nginx/logs/nginx.pid;

#指定进程可以打开的最大描述符：数目
#工作模式与连接数上限
#这个指令是指当一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，所以最好与ulimit -n 的值保持一致。
#现在在linux 2.6内核下开启文件打开数为65535，worker_rlimit_nofile就相应应该填写65535。
#这是因为nginx调度时分配请求到进程并不是那么的均衡，所以假如填写10240，总并发量达到3-4万时就有进程可能超过10240了，这时会返回502错误。
worker_rlimit_nofile 65535;

events
{
    #参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型
    #是Linux 2.6以上版本内核中的高性能网络I/O模型，linux建议epoll，如果跑在FreeBSD上面，就用kqueue模型。
    #补充说明：
    #与apache相类，nginx针对不同的操作系统，有不同的事件模型
    #A）标准事件模型
    #Select、poll属于标准事件模型，如果当前系统不存在更有效的方法，nginx会选择select或poll
    #B）高效事件模型
    #Kqueue：使用于FreeBSD 4.1+, OpenBSD 2.9+, NetBSD 2.0 和 MacOS X.使用双处理器的MacOS X系统使用kqueue可能会造成内核崩溃。
    #Epoll：使用于Linux内核2.6版本及以后的系统。
    #/dev/poll：使用于Solaris 7 11/99+，HP/UX 11.22+ (eventport)，IRIX 6.5.15+ 和 Tru64 UNIX 5.1A+。
    #Eventport：使用于Solaris 10。 为了防止出现内核崩溃的问题， 有必要安装安全补丁。
    use epoll;

    #单个进程最大连接数（最大连接数=连接数*进程数）
    #根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cpu跑到100%就行。每个进程允许的最多连接数，理论上每台nginx服务器的最大连接数为。
    worker_connections 65535;

    #keepalive超时时间。
    keepalive_timeout 60;

    #客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求头的大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。
    #分页大小可以用命令getconf PAGESIZE 取得。
    #[root@web001 ~]# getconf PAGESIZE
    #4096
    #但也有client_header_buffer_size超过4k的情况，但是client_header_buffer_size该值必须设置为“系统分页大小”的整倍数。
    client_header_buffer_size 4k;

    #这个将为打开文件指定缓存，默认是没有启用的，max指定缓存数量，建议和打开文件数一致，inactive是指经过多长时间文件没被请求后删除缓存。
    open_file_cache max=65535 inactive=60s;

    #这个是指多长时间检查一次缓存的有效信息。
    #语法:open_file_cache_valid time 默认值:open_file_cache_valid 60 使用字段:http, server, location 这个指令指定了何时需要检查open_file_cache中缓存项目的有效信息.
    open_file_cache_valid 80s;

    #open_file_cache指令中的inactive参数时间内文件的最少使用次数，如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive时间内一次没被使用，它将被移除。
    #语法:open_file_cache_min_uses number 默认值:open_file_cache_min_uses 1 使用字段:http, server, location  这个指令指定了在open_file_cache指令无效的参数中一定的时间范围内可以使用的最小文件数,如果使用更大的值,文件描述符在cache中总是打开状态.
    open_file_cache_min_uses 1;
    
    #语法:open_file_cache_errors on | off 默认值:open_file_cache_errors off 使用字段:http, server, location 这个指令指定是否在搜索一个文件时记录cache错误.
    open_file_cache_errors on;
}
 
#设定http服务器，利用它的反向代理功能提供负载均衡支持
http
{
    #文件扩展名与文件类型映射表
    include mime.types;

    #默认文件类型
    default_type application/octet-stream;

    #默认编码
    #charset utf-8;

    #服务器名字的hash表大小
    #保存服务器名字的hash表是由指令server_names_hash_max_size 和server_names_hash_bucket_size所控制的。参数hash bucket size总是等于hash表的大小，并且是一路处理器缓存大小的倍数。在减少了在内存中的存取次数后，使在处理器中加速查找hash表键值成为可能。如果hash bucket size等于一路处理器缓存的大小，那么在查找键的时候，最坏的情况下在内存中查找的次数为2。第一次是确定存储单元的地址，第二次是在存储单元中查找键 值。因此，如果Nginx给出需要增大hash max size 或 hash bucket size的提示，那么首要的是增大前一个参数的大小.
    server_names_hash_bucket_size 128;

    #客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求的头部大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。分页大小可以用命令getconf PAGESIZE取得。
    client_header_buffer_size 32k;

    #客户请求头缓冲大小。nginx默认会用client_header_buffer_size这个buffer来读取header值，如果header过大，它会使用large_client_header_buffers来读取。
    large_client_header_buffers 4 64k;

    #设定通过nginx上传文件的大小
    client_max_body_size 8m;

    #开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
    #sendfile指令指定 nginx 是否调用sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为on。如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络IO处理速度，降低系统uptime。
    sendfile on;

    #开启目录列表访问，合适下载服务器，默认关闭。
    autoindex on;

    #此选项允许或禁止使用socke的TCP_CORK的选项，此选项仅在使用sendfile的时候使用
    tcp_nopush on;
     
    tcp_nodelay on;

    #长连接超时时间，单位是秒
    keepalive_timeout 120;

    #FastCGI相关参数是为了改善网站的性能：减少资源占用，提高访问速度。下面参数看字面意思都能理解。
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 128k;

    #gzip模块设置
    gzip on; #开启gzip压缩输出
    gzip_min_length 1k;    #最小压缩文件大小
    gzip_buffers 4 16k;    #压缩缓冲区
    gzip_http_version 1.0;    #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
    gzip_comp_level 2;    #压缩等级
    gzip_types text/plain application/x-javascript text/css application/xml;    #压缩类型，默认就已经包含textml，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。
    gzip_vary on;

    #开启限制IP连接数的时候需要使用
    #limit_zone crawler $binary_remote_addr 10m;

    #负载均衡配置
    upstream jh.w3cschool.cn {
     
        #upstream的负载均衡，weight是权重，可以根据机器配置定义权重。weigth参数表示权值，权值越高被分配到的几率越大。
        server 192.168.80.121:80 weight=3;
        server 192.168.80.122:80 weight=2;
        server 192.168.80.123:80 weight=3;

        #nginx的upstream目前支持4种方式的分配
        #1、轮询（默认）
        #每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。
        #2、weight
        #指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。
        #例如：
        #upstream bakend {
        #    server 192.168.0.14 weight=10;
        #    server 192.168.0.15 weight=10;
        #}
        #2、ip_hash
        #每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。
        #例如：
        #upstream bakend {
        #    ip_hash;
        #    server 192.168.0.14:88;
        #    server 192.168.0.15:80;
        #}
        #3、fair（第三方）
        #按后端服务器的响应时间来分配请求，响应时间短的优先分配。
        #upstream backend {
        #    server server1;
        #    server server2;
        #    fair;
        #}
        #4、url_hash（第三方）
        #按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存时比较有效。
        #例：在upstream中加入hash语句，server语句中不能写入weight等其他的参数，hash_method是使用的hash算法
        #upstream backend {
        #    server squid1:3128;
        #    server squid2:3128;
        #    hash $request_uri;
        #    hash_method crc32;
        #}

        #tips:
        #upstream bakend{#定义负载均衡设备的Ip及设备状态}{
        #    ip_hash;
        #    server 127.0.0.1:9090 down;
        #    server 127.0.0.1:8080 weight=2;
        #    server 127.0.0.1:6060;
        #    server 127.0.0.1:7070 backup;
        #}
        #在需要使用负载均衡的server中增加 proxy_pass http://bakend/;

        #每个设备的状态设置为:
        #1.down表示单前的server暂时不参与负载
        #2.weight为weight越大，负载的权重就越大。
        #3.max_fails：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream模块定义的错误
        #4.fail_timeout:max_fails次失败后，暂停的时间。
        #5.backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。

        #nginx支持同时设置多组的负载均衡，用来给不用的server来使用。
        #client_body_in_file_only设置为On 可以讲client post过来的数据记录到文件中用来做debug
        #client_body_temp_path设置记录文件的目录 可以设置最多3层目录
        #location对URL进行匹配.可以进行重定向或者进行新的代理 负载均衡
    }
     
    #虚拟主机的配置
    server {
        #监听端口
        listen 80;

        #域名可以有多个，用空格隔开
        server_name www.w3cschool.cn w3cschool.cn;
        index index.html index.htm index.php;
        root /data/www/w3cschool;

        #对******进行负载均衡
        location ~ .*.(php|php5)?$
        {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            include fastcgi.conf;
        }
         
        #图片缓存时间设置
        location ~ .*.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires 10d;
        }
         
        #JS和CSS缓存时间设置
        location ~ .*.(js|css)?$
        {
            expires 1h;
        }
         
        #日志格式设定
        #$remote_addr与$http_x_forwarded_for用以记录客户端的ip地址；
        #$remote_user：用来记录客户端用户名称；
        #$time_local： 用来记录访问时间与时区；
        #$request： 用来记录请求的url与http协议；
        #$status： 用来记录请求状态；成功是200，
        #$body_bytes_sent ：记录发送给客户端文件主体内容大小；
        #$http_referer：用来记录从那个页面链接访问过来的；
        #$http_user_agent：记录客户浏览器的相关信息；
        #通常web服务器放在反向代理的后面，这样就不能获取到客户的IP地址了，通过$remote_add拿到的IP地址是反向代理服务器的iP地址。反向代理服务器在转发请求的http头信息中，可以增加x_forwarded_for信息，用以记录原有客户端的IP地址和原来客户端的请求的服务器地址。
        log_format access '$remote_addr - $remote_user [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" $http_x_forwarded_for';
         
        #定义本虚拟主机的访问日志
        access_log  /usr/local/nginx/logs/host.access.log  main;
        access_log  /usr/local/nginx/logs/host.access.404.log  log404;
         
        #对 "/" 启用反向代理
        location / {
            proxy_pass http://127.0.0.1:88;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
             
            #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             
            #以下是一些反向代理的配置，可选。
            proxy_set_header Host $host;

            #允许客户端请求的最大单文件字节数
            client_max_body_size 10m;

            #缓冲区代理缓冲用户端请求的最大字节数，
            #如果把它设置为比较大的数值，例如256k，那么，无论使用firefox还是IE浏览器，来提交任意小于256k的图片，都很正常。如果注释该指令，使用默认的client_body_buffer_size设置，也就是操作系统页面大小的两倍，8k或者16k，问题就出现了。
            #无论使用firefox4.0还是IE8.0，提交一个比较大，200k左右的图片，都返回500 Internal Server Error错误
            client_body_buffer_size 128k;

            #表示使nginx阻止HTTP应答代码为400或者更高的应答。
            proxy_intercept_errors on;

            #后端服务器连接的超时时间_发起握手等候响应超时时间
            #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_connect_timeout 90;

            #后端服务器数据回传时间(代理发送超时)
            #后端服务器数据回传时间_就是在规定时间之内后端服务器必须传完所有的数据
            proxy_send_timeout 90;

            #连接成功后，后端服务器响应时间(代理接收超时)
            #连接成功后_等候后端服务器响应时间_其实已经进入后端的排队之中等候处理（也可以说是后端服务器处理请求的时间）
            proxy_read_timeout 90;

            #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            #设置从被代理服务器读取的第一部分应答的缓冲区大小，通常情况下这部分应答中包含一个小的应答头，默认情况下这个值的大小为指令proxy_buffers中指定的一个缓冲区的大小，不过可以将其设置为更小
            proxy_buffer_size 4k;

            #proxy_buffers缓冲区，网页平均在32k以下的设置
            #设置用于读取应答（来自被代理服务器）的缓冲区数目和大小，默认情况也为分页大小，根据操作系统的不同可能是4k或者8k
            proxy_buffers 4 32k;

            #高负荷下缓冲大小（proxy_buffers*2）
            proxy_busy_buffers_size 64k;

            #设置在写入proxy_temp_path时数据的大小，预防一个工作进程在传递文件时阻塞太长
            #设定缓存文件夹大小，大于这个值，将从upstream服务器传
            proxy_temp_file_write_size 64k;
        }
         
        #设定查看Nginx状态的地址
        location /NginxStatus {
            stub_status on;
            access_log on;
            auth_basic "NginxStatus";
            auth_basic_user_file confpasswd;
            #htpasswd文件的内容可以用apache提供的htpasswd工具来产生。
        }
         
        #本地动静分离反向代理配置
        #所有jsp的页面均交由tomcat或resin处理
        location ~ .(jsp|jspx|do)?$ {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://127.0.0.1:8080;
        }
         
        # 所有静态文件由nginx直接读取不经过 tomcat 或 resin
        location ~ .*.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)${
            expires 15d; 
        }
         
        location ~ .*.(js|css)?$ {
            expires 1h;
        }
    }
}
```

### stream (TCP/UDP数据流模块)

> stream 模块一般用于tcp/UDP数据流的代理和负载均衡，可以通过stream模块代理转发TCP消息。 ngx_stream_core_module模块由1.9.0版提供。
>
> 可以实现负载均衡和 mysql 等 tcp 协议中间件的访问。

```nginx
# mysql 配置
stream {
  # nginx 监听服务
  server {
    listen 3307; 
    proxy_connect_timeout 1s;
    proxy_timeout 3s;
    proxy_pass ip:port;    
  }
}

# 或

stream  {
   # 可以实现负载
   upstream mysql_socket {
     server ip:port;
   }
   server {
     listen 3307; 
     proxy_connect_timeout 1s;
     proxy_timeout 3s;
     proxy_pass mysql_socket;
   }
}
```

## 常见问题

### Q1.Http状态码413（Request Entity Too Large）

检查`nginx.conf`配置文件中 http{} 或 server{} 或 location{} 下`client_max_body_size`配置的大小，默认1m

修改为

```nginx
# 默认1m，根据使用场景据实修改
client_max_body_size 10m 
```

重新加载 nginx 配置

```shell
nginx -s reload
```
