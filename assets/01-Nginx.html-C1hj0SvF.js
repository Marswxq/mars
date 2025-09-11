import{_ as n,c as a,d as e,o as l}from"./app-CKtXyHQO.js";const p={};function i(c,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="ningx" tabindex="-1"><a class="header-anchor" href="#ningx"><span>Ningx</span></a></h1><h2 id="nginx-conf-配置" tabindex="-1"><a class="header-anchor" href="#nginx-conf-配置"><span>nginx.conf 配置</span></a></h2><p>首先看下 nginx 的默认配置，比较直观的可以发现 nginx 配置分为三部分：全局（events{}、http{}之外的部分）、events{}、http{}，又叫做全局块、events块和http块。</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局块" tabindex="-1"><a class="header-anchor" href="#全局块"><span>全局块</span></a></h3><blockquote><p>全局块是默认配置文件从开始到 events 块之间的一部分内容，主要设置一些影响 Nginx 服务器全局参数。通常包括配置运行 Nginx 服务器的用户（组）、允许生成的 worker process 数、Nginx 进程 PID 存放路径、日志的存放路径和类型以及配置文件引入等。</p></blockquote><p><strong>配置参数</strong></p><ul><li>worker_processes：指定工作线程数，使用<code>[number | auto]</code>格式，auto 为自动模式</li><li>pid：pid文件存放的路径，如<code>logs/nginx.pid</code>，默认为<code>/usr/local/nginx/logs/nginx.pid</code></li><li>error_log：日志的路径和日志级别，使用<code>[path] [debug | info | notice | warn | error | crit | alert | emerg]</code> 格式，默认为<code>error_log logs/error.log error;</code></li></ul><h3 id="events-块" tabindex="-1"><a class="header-anchor" href="#events-块"><span>events 块</span></a></h3><blockquote><p>events 块涉及的指令主要影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 work process 下的网络连接进行序列化，是否 允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 word process 可以同时支持的最大连接数等。</p></blockquote><p><strong>配置参数</strong></p><ul><li>accept_mutex：默认是开启状态，支持<code>[on | off]</code> ，主要解决“惊群问题”——当一个新连接到达时，如果激活了accept_mutex，那么多个Worker将以串行方式来处理，其中有一个Worker会被唤醒，其他的Worker继续保持休眠状态；如果没有激活accept_mutex，那么所有的Worker都会被唤醒，不过只有一个Worker能获取新连接，其它的Worker会重新进入休眠状态</li><li>multi_accept：默认是关闭状态，支持<code>[on | off]</code>，关闭状态下 nginx 一个工作进程只能同时接受一个新的连接。否则，一个工作进程可以同时接受所有的新连接</li><li>worker_connections：最大连接数，默认1024</li></ul><h3 id="http-块" tabindex="-1"><a class="header-anchor" href="#http-块"><span>http 块</span></a></h3><blockquote><p>http 块是 Nginx 服务器配置中的重要部分，代理、缓存和日志定义等绝大多数的功能和第三方模块的配置都可以放在这个模块中。</p><p>http 块中又包含自己的全局块和 server 块，server 块（server 块可以是多个）中又可以进一步包含 location 块</p></blockquote><p><strong>配置参数</strong></p><ul><li><p>include：引用其他的配置文件</p></li><li><p>default_type：默认类型，默认值为<code>text/plain</code>，可以配置在 http 块下的全局块、server 块，也可以配置在 server 块下的 location 块内</p></li><li><p>access_log：nginx 应答日志（我理解就是请求转发日志）。格式<code>access_log path [format [buffer=size]]</code>，path 为日志路径，format 为日志格式配置，通过<code>log_format</code>参数配置，如果关闭日志使用<code>access_log off</code></p></li><li><p>log_format：日志格式，只能在http块中进行配置。配置示例如下：</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">log_format</span>  main <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span></span>
<span class="line">                 <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span></span>
<span class="line">                 <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结合<code>log_format</code>完成的<code>access_log</code>示例如下：</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">access_log</span>  logs/access.log  main</span><span class="token punctuation">;</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>sendfile：开启/关闭sendfile方式传输文件，格式<code>sendfile on | off;</code>。</p></li><li><p>sendfile_max_chunk：sendfile 最大配置，如<code>sendfile_max_chunk 128k;</code>。</p></li><li><p>timeout：连接超时时间，默认75s。</p></li><li><p>charset：编码，一般设置为<code>utf-8</code>。</p></li></ul><h4 id="server-块" tabindex="-1"><a class="header-anchor" href="#server-块"><span>server 块</span></a></h4><blockquote><p>server块和“虚拟主机”的概念有密切联系。</p></blockquote><p>虚拟主机，又称虚拟服务器、主机空间或是网页空间，它是一种技术。该技术是为了节省互联网服务器硬件成本而出现的。这里的“主机”或“空间”是由实体的服务器延伸而来，硬件系统可以基于服务器群，或者单个服务器等。虚拟主机技术主要应用于HTTP、FTP及EMAIL等多项服务，将一台服务器的某项或者全部服务内容逻辑划分为多个服务单位，对外表现为多个服务器，从而充分利用服务器硬件资源。从用户角度来看，一台虚拟主机和一台独立的硬件主机是完全一样的。</p><blockquote></blockquote><p>在使用Nginx服务器提供Web服务时，利用虚拟主机的技术就可以避免为每一个要运行的网站提供单独的Nginx服务器，也无需为每个网站对应运行一组Nginx进程。虚拟主机技术使得Nginx服务器可以在同一台服务器上只运行一组Nginx进程，就可以运行多个网站。</p><blockquote><p>在前面提到过，每一个http块都可以包含多个server块，而每个server块就相当于一台虚拟主机，它内部可有多台主机联合提供服务，一起对外提供在逻辑上关系密切的一组服务（或网站）。</p><p>和http块相同，server块也可以包含自己的全局块，同时可以包含多个location块。在server全局块中，最常见的两个配置项是本虚拟主机的监听配置和本虚拟主机的名称或IP配置</p></blockquote><h5 id="listen" tabindex="-1"><a class="header-anchor" href="#listen"><span>listen</span></a></h5><blockquote><p>server块中最重要的指令就是listen指令，这个指令有三种配置语法。这个指令默认的配置值是：listen *:80 | *: 8000；只能在server块种配置这个指令。</p></blockquote><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token comment"># 第一种</span></span>
<span class="line"><span class="token directive"><span class="token keyword">listen</span> address[:port] [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 第二种</span></span>
<span class="line"><span class="token directive"><span class="token keyword">listen</span> port [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 第三种（可以不用重点关注）</span></span>
<span class="line"><span class="token directive"><span class="token keyword">listen</span> unix:path [default_server] [ssl] [http2 | spdy] [proxy_protocol] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>listen 指令参数说明</strong></p><ul><li>address：监听的 IP 地址（请求来源的 IP 地址），如果是IPv6的地址，需要使用中括号“[]”括起来，比如<code>[fe80::1]</code>等。</li><li>port：端口号，如果只定义了IP地址没有定义端口号，就使用80端口。如果未配置 listen 指令，那么 nginx 以超级用户权限运行，使用*: 80，否则使用*:8000。多个虚拟主机可以同时监听同一个端口,但是 server_name 需要设置为不同的；</li><li>default_server：如果通过 Host 没匹配到对应的虚拟主机，则通过这台虚拟主机处理。</li><li>backlog=number：设置监听函数 listen() 最多允许多少网络连接同时处于挂起状态，在 FreeBSD 中默认为-1，其他平台默认为511。</li><li>accept_filter=filter，设置监听端口对请求的过滤，被过滤的内容不能被接收和处理。本指令只在 FreeBSD 和 NetBSD 5.0+平台下有效。filter 可以设置为 dataready 或 httpready。</li><li>bind：标识符，使用独立的 bind() 处理此 address:port；一般情况下，对于端口相同而IP地址不同的多个连接，Nginx服务器将只使用一个监听命令，并使用 bind() 处理端口相同的所有连接。</li><li>ssl：标识符，设置会话连接使用 SSL 模式进行，此标识符和 Nginx 服务器提供的 HTTPS 服务有关。</li></ul><p>一些 listen 配置例子</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token comment"># 只监听来自127.0.0.1这个IP，请求80端口的请求（不指定端口，默认80）</span></span>
<span class="line"><span class="token directive"><span class="token keyword">listen</span> 127.0.0.1</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment"># 只监听来自127.0.0.1这个IP，请求8000端口的请求</span></span>
<span class="line"><span class="token directive"><span class="token keyword">listen</span> 127.0.0.1:8000</span><span class="token punctuation">;</span>  </span>
<span class="line"><span class="token comment"># 和上面效果一致</span></span>
<span class="line"><span class="token directive"><span class="token keyword">listen</span> localhost:8000</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token comment"># 监听来自所有IP，请求8000端口的请求</span></span>
<span class="line"><span class="token directive"><span class="token keyword">listen</span> <span class="token number">8000</span></span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token comment"># 和上面效果一样</span></span>
<span class="line"><span class="token directive"><span class="token keyword">listen</span> *:8000</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="server-name" tabindex="-1"><a class="header-anchor" href="#server-name"><span>server_name</span></a></h5><blockquote><p>用于配置虚拟主机的名称。</p></blockquote><p>server_name 可以配置多个域名，多域名用空格分隔，如果 listen 配置了 ip，server_name 域名就会失去意义，如：</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line">server_name abc.com www.baidu.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>server_name 也支持通配符<code>*</code>和正则表达式，如：</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line">server_name *.com www.*.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h5 id="location块" tabindex="-1"><a class="header-anchor" href="#location块"><span>location块</span></a></h5><blockquote><p>一个 server 块下可以包含多个 location 块</p><p>location块的主要作用是，地址定向、数据缓存和应答控制等</p></blockquote><p><strong>配置格式</strong></p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">location</span> [ = | ~ | ~* | ^~ ] uri</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><table><thead><tr><th>匹配符</th><th>说明</th></tr></thead><tbody><tr><td><code>uri</code></td><td>地址</td></tr><tr><td><code>=</code></td><td>请求字符串与 uri 严格匹配。如果已经匹配成功，就停止继续向下搜索并立即处理此请求。</td></tr><tr><td><code>~</code></td><td>表示 uri 包含正则表达式，并且区分大小写。</td></tr><tr><td><code>^~</code></td><td>找到标识 uri 和请求字符串匹配度最高的 location 后，立即使用此location处理请求，而不再使用 location 块中的正则 uri和请求字符串做匹配。</td></tr><tr><td><code>~*</code></td><td>用于表示 uri 包含正则表达式，并且不区分大小写。注意如果 uri 包含正则表达式，就必须要使用<code>~</code>或者<code>~*</code>标识。</td></tr></tbody></table><h2 id="nginx-命令" tabindex="-1"><a class="header-anchor" href="#nginx-命令"><span>nginx 命令</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">root@product-nginx:/<span class="token comment"># nginx -?</span></span>
<span class="line">Usage: nginx <span class="token punctuation">[</span>-?hvVtTq<span class="token punctuation">]</span> <span class="token punctuation">[</span>-s signal<span class="token punctuation">]</span> <span class="token punctuation">[</span>-c filename<span class="token punctuation">]</span> <span class="token punctuation">[</span>-p prefix<span class="token punctuation">]</span> <span class="token punctuation">[</span>-g directives<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">Options:</span>
<span class="line">  -?,-h         <span class="token builtin class-name">:</span> this <span class="token builtin class-name">help</span> <span class="token comment"># 帮助</span></span>
<span class="line">  <span class="token parameter variable">-v</span>            <span class="token builtin class-name">:</span> show version and <span class="token builtin class-name">exit</span> <span class="token comment"># 查看版本</span></span>
<span class="line">  <span class="token parameter variable">-V</span>            <span class="token builtin class-name">:</span> show version and configure options <span class="token keyword">then</span> <span class="token builtin class-name">exit</span> <span class="token comment"># 查看版本和安装的插件</span></span>
<span class="line">  <span class="token parameter variable">-t</span>            <span class="token builtin class-name">:</span> <span class="token builtin class-name">test</span> configuration and <span class="token builtin class-name">exit</span> <span class="token comment"># 测试配置文件</span></span>
<span class="line">  <span class="token parameter variable">-T</span>            <span class="token builtin class-name">:</span> <span class="token builtin class-name">test</span> configuration, dump it and <span class="token builtin class-name">exit</span> <span class="token comment"># 测试配置文件并转存</span></span>
<span class="line">  <span class="token parameter variable">-q</span>            <span class="token builtin class-name">:</span> suppress non-error messages during configuration testing <span class="token comment"># 在配置测试期间禁止显示非错误消息</span></span>
<span class="line">  <span class="token parameter variable">-s</span> signal     <span class="token builtin class-name">:</span> send signal to a master process: stop, quit, reopen, reload <span class="token comment"># 向主进程发送信号：停止(直接关闭)、退出(等待工作进程处理完成后关闭)、重新打开、重新加载（热加载，重新加载配置文件）</span></span>
<span class="line">  <span class="token parameter variable">-p</span> prefix     <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> prefix path <span class="token punctuation">(</span>default: /etc/nginx/<span class="token punctuation">)</span>  <span class="token comment"># 指定nginx的安装目录</span></span>
<span class="line">  <span class="token parameter variable">-c</span> filename   <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> configuration <span class="token function">file</span> <span class="token punctuation">(</span>default: /etc/nginx/nginx.conf<span class="token punctuation">)</span> <span class="token comment"># 指定配置文件</span></span>
<span class="line">  <span class="token parameter variable">-g</span> directives <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> global directives out of configuration <span class="token function">file</span> <span class="token comment"># 配置文件意外的全局指令，如 nginx -g &quot;pid /var/run/nginx.pid; worker_processes \`sysctl -n hw.ncpu\`;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用配置" tabindex="-1"><a class="header-anchor" href="#常用配置"><span>常用配置</span></a></h2><h3 id="https" tabindex="-1"><a class="header-anchor" href="#https"><span>https</span></a></h3><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">443</span> ssl</span><span class="token punctuation">;</span> <span class="token comment"># https端口，支持自定义。ssl用于告诉Nginx在指定的端口上启用SSL/TLS加密</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span>  example.com</span><span class="token punctuation">;</span> <span class="token comment"># 域名</span></span>
<span class="line">        </span>
<span class="line">        <span class="token comment"># 下面输入证书和私钥的地址</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">ssl_certificate</span>      certs/my_cert.crt</span><span class="token punctuation">;</span> <span class="token comment"># 证书</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">ssl_certificate_key</span>  certs/my_cert.key</span><span class="token punctuation">;</span> <span class="token comment"># 证书对应的私钥文件</span></span>
<span class="line">        </span>
<span class="line">        <span class="token directive"><span class="token keyword">ssl_session_cache</span>    shared:SSL:1m</span><span class="token punctuation">;</span> <span class="token comment"># 可选配置，设置了 SSL 会话缓存的类型和大小。shared 表示在所有工作进程之间共享缓存。SSL 是缓存的名称。1m 表示缓存的最大大小为 1 兆字节。</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">ssl_session_timeout</span>  <span class="token number">5m</span></span><span class="token punctuation">;</span> <span class="token comment"># 可选配置，设置了 SSL 会话缓存的超时时间为 5 分钟。</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">ssl_ciphers</span> ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4</span><span class="token punctuation">;</span> <span class="token comment"># 可选配置， 指定了 SSL/TLS 握手过程中允许使用的加密算法的优先级顺序。</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">ssl_protocols</span> TLSv1.1 TLSv1.2 TLSv1.3</span><span class="token punctuation">;</span> <span class="token comment"># 可选配置，指定了允许使用的 SSL/TLS 协议版本。建议只启用安全的协议版本，如 TLSv1.1、TLSv1.2 和 TLSv1.3，禁用不安全的 SSL v2 和 SSL v3。</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span>  <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment"># 可选配置</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token comment"># 将请求转成https</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span> example.com</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">rewrite</span> ^(.*)$ https://<span class="token variable">$host</span><span class="token variable">$1</span> permanent</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面配置中有一段“将请求转成https”的方式，也可以使用如下方式</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> example.com</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="autoindex-文件下载" tabindex="-1"><a class="header-anchor" href="#autoindex-文件下载"><span>autoindex （文件下载）</span></a></h3><p><a href="https://nginx.org/en/docs/http/ngx_http_autoindex_module.html" target="_blank" rel="noopener noreferrer">ngx_http_autoindex_module 官方文档</a></p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">location</span> /download</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">alias</span> /opt/share</span><span class="token punctuation">;</span> <span class="token comment"># 文件存储路径</span></span>
<span class="line">    <span class="token comment"># 开启或禁用目录浏览功能，默认是禁用</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">autoindex</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment"># 显示出文件的确切大小，单位是bytes。一般会改为off，显示出文件的大概大小，单位自动匹配为 kB 、MB 、GB。默认为开启</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">autoindex_exact_size</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment"># 设置目录列表的格式。默认是 html；可选格式：html | xml | json | jsonp</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">autoindex_format</span> html</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment"># on显示文件的本地时间;否则显示文件的GMT时间。默认是off</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">autoindex_localtime</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">charset</span> utf-8</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="auth-basic-http-认证" tabindex="-1"><a class="header-anchor" href="#auth-basic-http-认证"><span>auth_basic （HTTP 认证）</span></a></h3><p>auth_basic 依赖 htpasswd 等外部密码工具</p><ol><li>安装 htpasswd</li></ol><ul><li>debian 系</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">apt-get</span> <span class="token function">install</span> apache2-utils</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>redhat 系</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">yum <span class="token function">install</span> httpd-tools</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>生成密码</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">htpasswd <span class="token parameter variable">-c</span> /usr/local/nginx/conf/htpasswd username</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>/usr/local/nginx/conf/htpasswd</code>是密码文件，<code>username</code>是登录时候用的用户名</p><ol start="3"><li>nginx 配置</li></ol><p>可以在 http 块、server 块、location 块中配置权限，具体根据个人需求</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">auth_basic</span> <span class="token string">&quot;请输入账号密码&quot;</span></span><span class="token punctuation">;</span>   <span class="token comment"># 登录框的提示信息</span></span>
<span class="line"><span class="token directive"><span class="token keyword">auth_basic_user_file</span> /usr/local/nginx/conf/htpasswd</span><span class="token punctuation">;</span> <span class="token comment"># 步骤2中配置的密码文件</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="proxy-pass-反向代理" tabindex="-1"><a class="header-anchor" href="#proxy-pass-反向代理"><span>proxy_pass（反向代理）</span></a></h3><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span>  <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> http://172.1.2.10:8080</span><span class="token punctuation">;</span> <span class="token comment"># 代理ip，客户端能看到的，使用的ip</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">index</span> index.html index.htm index.php</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">access_log</span> /var/log/nginx/99cdtop.access.log  main</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">access_log</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_redirect</span> <span class="token boolean">off</span></span> <span class="token punctuation">;</span> <span class="token comment"># 指定修改被代理服务器返回的响应头中的 location 头域或 refresh 头域数值 ，语法是proxy_redirect [default|off|redirect replacement]，用于重定向地址使用</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span> <span class="token comment"># 确保了请求头中的 Host 字段被正确传递，避免了请求中的 Host 头被 Nginx 默认值覆盖。如果是地址和端口一起转发使用 $host:$proxy_port 配置</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span> <span class="token comment"># 用于存储客户端的真实 IP 地址</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> REMOTE-HOST <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span> </span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span> <span class="token comment"># HTTP的请求端真实的IP</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">600</span></span><span class="token punctuation">;</span> <span class="token comment"># 连接超时，proxy_connect_timeout timeout_in_seconds 单位是秒，默认60s</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_send_timeout</span> <span class="token number">600</span></span><span class="token punctuation">;</span> <span class="token comment"># 发送请求给 upstream 服务器的超时时间。超时设置不是为了整个发送期间，而是在两次write操作期间。如果超时后，upstream没有收到新的数据，nginx会关闭连接</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_read_timeout</span> <span class="token number">600</span></span><span class="token punctuation">;</span>  <span class="token comment"># 代理服务器的读超时时间，决定 nginx 会等待多长时间来获得请求的响应。这个时间不是获得整个response 的时间，而是两次 reading 操作的时间。默认60s</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_buffer_size</span> <span class="token number">1600k</span></span><span class="token punctuation">;</span> <span class="token comment"># 缓冲区大小,从被代理的后端服务器取得的响应内容,会先读取放置到这里</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_buffers</span> <span class="token number">4</span> <span class="token number">3200k</span></span><span class="token punctuation">;</span> <span class="token comment"># 缓冲区的大小和数量，从被代理的后端服务器取得的响应内容,会放置到这里. 默认情况下,一个缓冲区的大小等于页面大小,可能是4K也可能是8K,这取决于平台</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_busy_buffers_size</span> <span class="token number">6400k</span></span><span class="token punctuation">;</span> </span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_temp_file_write_size</span> <span class="token number">6400k</span></span><span class="token punctuation">;</span> </span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_max_temp_file_size</span> <span class="token number">128m</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_pass</span>  http://127.0.0.10:8080</span><span class="token punctuation">;</span> <span class="token comment"># 真实的ip，一般多是服务端ip</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="upstream-负载均衡" tabindex="-1"><a class="header-anchor" href="#upstream-负载均衡"><span>upstream（负载均衡）</span></a></h3><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token comment">#定义Nginx运行的用户和用户组</span></span>
<span class="line"><span class="token directive"><span class="token keyword">user</span> www www</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#nginx进程数，建议设置为等于CPU总核心数。</span></span>
<span class="line"><span class="token directive"><span class="token keyword">worker_processes</span> <span class="token number">8</span></span><span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line"><span class="token comment">#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]</span></span>
<span class="line"><span class="token directive"><span class="token keyword">error_log</span> /usr/local/nginx/logs/error.log info</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#进程pid文件</span></span>
<span class="line"><span class="token directive"><span class="token keyword">pid</span> /usr/local/nginx/logs/nginx.pid</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#指定进程可以打开的最大描述符：数目</span></span>
<span class="line"><span class="token comment">#工作模式与连接数上限</span></span>
<span class="line"><span class="token comment">#这个指令是指当一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，所以最好与ulimit -n 的值保持一致。</span></span>
<span class="line"><span class="token comment">#现在在linux 2.6内核下开启文件打开数为65535，worker_rlimit_nofile就相应应该填写65535。</span></span>
<span class="line"><span class="token comment">#这是因为nginx调度时分配请求到进程并不是那么的均衡，所以假如填写10240，总并发量达到3-4万时就有进程可能超过10240了，这时会返回502错误。</span></span>
<span class="line"><span class="token directive"><span class="token keyword">worker_rlimit_nofile</span> <span class="token number">65535</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">events</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">#参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型</span></span>
<span class="line">    <span class="token comment">#是Linux 2.6以上版本内核中的高性能网络I/O模型，linux建议epoll，如果跑在FreeBSD上面，就用kqueue模型。</span></span>
<span class="line">    <span class="token comment">#补充说明：</span></span>
<span class="line">    <span class="token comment">#与apache相类，nginx针对不同的操作系统，有不同的事件模型</span></span>
<span class="line">    <span class="token comment">#A）标准事件模型</span></span>
<span class="line">    <span class="token comment">#Select、poll属于标准事件模型，如果当前系统不存在更有效的方法，nginx会选择select或poll</span></span>
<span class="line">    <span class="token comment">#B）高效事件模型</span></span>
<span class="line">    <span class="token comment">#Kqueue：使用于FreeBSD 4.1+, OpenBSD 2.9+, NetBSD 2.0 和 MacOS X.使用双处理器的MacOS X系统使用kqueue可能会造成内核崩溃。</span></span>
<span class="line">    <span class="token comment">#Epoll：使用于Linux内核2.6版本及以后的系统。</span></span>
<span class="line">    <span class="token comment">#/dev/poll：使用于Solaris 7 11/99+，HP/UX 11.22+ (eventport)，IRIX 6.5.15+ 和 Tru64 UNIX 5.1A+。</span></span>
<span class="line">    <span class="token comment">#Eventport：使用于Solaris 10。 为了防止出现内核崩溃的问题， 有必要安装安全补丁。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#单个进程最大连接数（最大连接数=连接数*进程数）</span></span>
<span class="line">    <span class="token comment">#根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cpu跑到100%就行。每个进程允许的最多连接数，理论上每台nginx服务器的最大连接数为。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">65535</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#keepalive超时时间。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">60</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求头的大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。</span></span>
<span class="line">    <span class="token comment">#分页大小可以用命令getconf PAGESIZE 取得。</span></span>
<span class="line">    <span class="token comment">#[root@web001 ~]# getconf PAGESIZE</span></span>
<span class="line">    <span class="token comment">#4096</span></span>
<span class="line">    <span class="token comment">#但也有client_header_buffer_size超过4k的情况，但是client_header_buffer_size该值必须设置为“系统分页大小”的整倍数。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">client_header_buffer_size</span> <span class="token number">4k</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#这个将为打开文件指定缓存，默认是没有启用的，max指定缓存数量，建议和打开文件数一致，inactive是指经过多长时间文件没被请求后删除缓存。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">open_file_cache</span> max=65535 inactive=60s</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#这个是指多长时间检查一次缓存的有效信息。</span></span>
<span class="line">    <span class="token comment">#语法:open_file_cache_valid time 默认值:open_file_cache_valid 60 使用字段:http, server, location 这个指令指定了何时需要检查open_file_cache中缓存项目的有效信息.</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">open_file_cache_valid</span> <span class="token number">80s</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#open_file_cache指令中的inactive参数时间内文件的最少使用次数，如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive时间内一次没被使用，它将被移除。</span></span>
<span class="line">    <span class="token comment">#语法:open_file_cache_min_uses number 默认值:open_file_cache_min_uses 1 使用字段:http, server, location  这个指令指定了在open_file_cache指令无效的参数中一定的时间范围内可以使用的最小文件数,如果使用更大的值,文件描述符在cache中总是打开状态.</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">open_file_cache_min_uses</span> <span class="token number">1</span></span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">#语法:open_file_cache_errors on | off 默认值:open_file_cache_errors off 使用字段:http, server, location 这个指令指定是否在搜索一个文件时记录cache错误.</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">open_file_cache_errors</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"><span class="token comment">#设定http服务器，利用它的反向代理功能提供负载均衡支持</span></span>
<span class="line"><span class="token directive"><span class="token keyword">http</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">#文件扩展名与文件类型映射表</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">include</span> mime.types</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#默认文件类型</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">default_type</span> application/octet-stream</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#默认编码</span></span>
<span class="line">    <span class="token comment">#charset utf-8;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#服务器名字的hash表大小</span></span>
<span class="line">    <span class="token comment">#保存服务器名字的hash表是由指令server_names_hash_max_size 和server_names_hash_bucket_size所控制的。参数hash bucket size总是等于hash表的大小，并且是一路处理器缓存大小的倍数。在减少了在内存中的存取次数后，使在处理器中加速查找hash表键值成为可能。如果hash bucket size等于一路处理器缓存的大小，那么在查找键的时候，最坏的情况下在内存中查找的次数为2。第一次是确定存储单元的地址，第二次是在存储单元中查找键 值。因此，如果Nginx给出需要增大hash max size 或 hash bucket size的提示，那么首要的是增大前一个参数的大小.</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_names_hash_bucket_size</span> <span class="token number">128</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求的头部大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。分页大小可以用命令getconf PAGESIZE取得。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">client_header_buffer_size</span> <span class="token number">32k</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#客户请求头缓冲大小。nginx默认会用client_header_buffer_size这个buffer来读取header值，如果header过大，它会使用large_client_header_buffers来读取。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">large_client_header_buffers</span> <span class="token number">4</span> <span class="token number">64k</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#设定通过nginx上传文件的大小</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">8m</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。</span></span>
<span class="line">    <span class="token comment">#sendfile指令指定 nginx 是否调用sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为on。如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络IO处理速度，降低系统uptime。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">sendfile</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#开启目录列表访问，合适下载服务器，默认关闭。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">autoindex</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#此选项允许或禁止使用socke的TCP_CORK的选项，此选项仅在使用sendfile的时候使用</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">tcp_nopush</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">     </span>
<span class="line">    <span class="token directive"><span class="token keyword">tcp_nodelay</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#长连接超时时间，单位是秒</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">120</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#FastCGI相关参数是为了改善网站的性能：减少资源占用，提高访问速度。下面参数看字面意思都能理解。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">fastcgi_connect_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">fastcgi_send_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">fastcgi_read_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">fastcgi_buffer_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">fastcgi_buffers</span> <span class="token number">4</span> <span class="token number">64k</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">fastcgi_busy_buffers_size</span> <span class="token number">128k</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">fastcgi_temp_file_write_size</span> <span class="token number">128k</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#gzip模块设置</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment">#开启gzip压缩输出</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">1k</span></span><span class="token punctuation">;</span>    <span class="token comment">#最小压缩文件大小</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_buffers</span> <span class="token number">4</span> <span class="token number">16k</span></span><span class="token punctuation">;</span>    <span class="token comment">#压缩缓冲区</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_http_version</span> 1.0</span><span class="token punctuation">;</span>    <span class="token comment">#压缩版本（默认1.1，前端如果是squid2.5请使用1.0）</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">2</span></span><span class="token punctuation">;</span>    <span class="token comment">#压缩等级</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_types</span> text/plain application/x-javascript text/css application/xml</span><span class="token punctuation">;</span>    <span class="token comment">#压缩类型，默认就已经包含textml，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#开启限制IP连接数的时候需要使用</span></span>
<span class="line">    <span class="token comment">#limit_zone crawler $binary_remote_addr 10m;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#负载均衡配置</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">upstream</span> jh.w3cschool.cn</span> <span class="token punctuation">{</span></span>
<span class="line">     </span>
<span class="line">        <span class="token comment">#upstream的负载均衡，weight是权重，可以根据机器配置定义权重。weigth参数表示权值，权值越高被分配到的几率越大。</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server</span> 192.168.80.121:80 weight=3</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server</span> 192.168.80.122:80 weight=2</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server</span> 192.168.80.123:80 weight=3</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">#nginx的upstream目前支持4种方式的分配</span></span>
<span class="line">        <span class="token comment">#1、轮询（默认）</span></span>
<span class="line">        <span class="token comment">#每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。</span></span>
<span class="line">        <span class="token comment">#2、weight</span></span>
<span class="line">        <span class="token comment">#指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。</span></span>
<span class="line">        <span class="token comment">#例如：</span></span>
<span class="line">        <span class="token comment">#upstream bakend {</span></span>
<span class="line">        <span class="token comment">#    server 192.168.0.14 weight=10;</span></span>
<span class="line">        <span class="token comment">#    server 192.168.0.15 weight=10;</span></span>
<span class="line">        <span class="token comment">#}</span></span>
<span class="line">        <span class="token comment">#2、ip_hash</span></span>
<span class="line">        <span class="token comment">#每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。</span></span>
<span class="line">        <span class="token comment">#例如：</span></span>
<span class="line">        <span class="token comment">#upstream bakend {</span></span>
<span class="line">        <span class="token comment">#    ip_hash;</span></span>
<span class="line">        <span class="token comment">#    server 192.168.0.14:88;</span></span>
<span class="line">        <span class="token comment">#    server 192.168.0.15:80;</span></span>
<span class="line">        <span class="token comment">#}</span></span>
<span class="line">        <span class="token comment">#3、fair（第三方）</span></span>
<span class="line">        <span class="token comment">#按后端服务器的响应时间来分配请求，响应时间短的优先分配。</span></span>
<span class="line">        <span class="token comment">#upstream backend {</span></span>
<span class="line">        <span class="token comment">#    server server1;</span></span>
<span class="line">        <span class="token comment">#    server server2;</span></span>
<span class="line">        <span class="token comment">#    fair;</span></span>
<span class="line">        <span class="token comment">#}</span></span>
<span class="line">        <span class="token comment">#4、url_hash（第三方）</span></span>
<span class="line">        <span class="token comment">#按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存时比较有效。</span></span>
<span class="line">        <span class="token comment">#例：在upstream中加入hash语句，server语句中不能写入weight等其他的参数，hash_method是使用的hash算法</span></span>
<span class="line">        <span class="token comment">#upstream backend {</span></span>
<span class="line">        <span class="token comment">#    server squid1:3128;</span></span>
<span class="line">        <span class="token comment">#    server squid2:3128;</span></span>
<span class="line">        <span class="token comment">#    hash $request_uri;</span></span>
<span class="line">        <span class="token comment">#    hash_method crc32;</span></span>
<span class="line">        <span class="token comment">#}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">#tips:</span></span>
<span class="line">        <span class="token comment">#upstream bakend{#定义负载均衡设备的Ip及设备状态}{</span></span>
<span class="line">        <span class="token comment">#    ip_hash;</span></span>
<span class="line">        <span class="token comment">#    server 127.0.0.1:9090 down;</span></span>
<span class="line">        <span class="token comment">#    server 127.0.0.1:8080 weight=2;</span></span>
<span class="line">        <span class="token comment">#    server 127.0.0.1:6060;</span></span>
<span class="line">        <span class="token comment">#    server 127.0.0.1:7070 backup;</span></span>
<span class="line">        <span class="token comment">#}</span></span>
<span class="line">        <span class="token comment">#在需要使用负载均衡的server中增加 proxy_pass http://bakend/;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">#每个设备的状态设置为:</span></span>
<span class="line">        <span class="token comment">#1.down表示单前的server暂时不参与负载</span></span>
<span class="line">        <span class="token comment">#2.weight为weight越大，负载的权重就越大。</span></span>
<span class="line">        <span class="token comment">#3.max_fails：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream模块定义的错误</span></span>
<span class="line">        <span class="token comment">#4.fail_timeout:max_fails次失败后，暂停的时间。</span></span>
<span class="line">        <span class="token comment">#5.backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">#nginx支持同时设置多组的负载均衡，用来给不用的server来使用。</span></span>
<span class="line">        <span class="token comment">#client_body_in_file_only设置为On 可以讲client post过来的数据记录到文件中用来做debug</span></span>
<span class="line">        <span class="token comment">#client_body_temp_path设置记录文件的目录 可以设置最多3层目录</span></span>
<span class="line">        <span class="token comment">#location对URL进行匹配.可以进行重定向或者进行新的代理 负载均衡</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">     </span>
<span class="line">    <span class="token comment">#虚拟主机的配置</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">#监听端口</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">#域名可以有多个，用空格隔开</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span> www.w3cschool.cn w3cschool.cn</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">index</span> index.html index.htm index.php</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">root</span> /data/www/w3cschool</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">#对******进行负载均衡</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ~ .*.(php|php5)?$</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">fastcgi_pass</span> 127.0.0.1:9000</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">fastcgi_index</span> index.php</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">include</span> fastcgi.conf</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         </span>
<span class="line">        <span class="token comment">#图片缓存时间设置</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ~ .*.(gif|jpg|jpeg|png|bmp|swf)$</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">expires</span> <span class="token number">10d</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         </span>
<span class="line">        <span class="token comment">#JS和CSS缓存时间设置</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ~ .*.(js|css)?$</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">expires</span> <span class="token number">1h</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         </span>
<span class="line">        <span class="token comment">#日志格式设定</span></span>
<span class="line">        <span class="token comment">#$remote_addr与$http_x_forwarded_for用以记录客户端的ip地址；</span></span>
<span class="line">        <span class="token comment">#$remote_user：用来记录客户端用户名称；</span></span>
<span class="line">        <span class="token comment">#$time_local： 用来记录访问时间与时区；</span></span>
<span class="line">        <span class="token comment">#$request： 用来记录请求的url与http协议；</span></span>
<span class="line">        <span class="token comment">#$status： 用来记录请求状态；成功是200，</span></span>
<span class="line">        <span class="token comment">#$body_bytes_sent ：记录发送给客户端文件主体内容大小；</span></span>
<span class="line">        <span class="token comment">#$http_referer：用来记录从那个页面链接访问过来的；</span></span>
<span class="line">        <span class="token comment">#$http_user_agent：记录客户浏览器的相关信息；</span></span>
<span class="line">        <span class="token comment">#通常web服务器放在反向代理的后面，这样就不能获取到客户的IP地址了，通过$remote_add拿到的IP地址是反向代理服务器的iP地址。反向代理服务器在转发请求的http头信息中，可以增加x_forwarded_for信息，用以记录原有客户端的IP地址和原来客户端的请求的服务器地址。</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">log_format</span> access <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span></span>
<span class="line">        <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span></span>
<span class="line">        <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; <span class="token variable">$http_x_forwarded_for</span>&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line">         </span>
<span class="line">        <span class="token comment">#定义本虚拟主机的访问日志</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">access_log</span>  /usr/local/nginx/logs/host.access.log  main</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">access_log</span>  /usr/local/nginx/logs/host.access.404.log  log404</span><span class="token punctuation">;</span></span>
<span class="line">         </span>
<span class="line">        <span class="token comment">#对 &quot;/&quot; 启用反向代理</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:88</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_redirect</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">             </span>
<span class="line">            <span class="token comment">#后端的Web服务器可以通过X-Forwarded-For获取用户真实IP</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span></span>
<span class="line">             </span>
<span class="line">            <span class="token comment">#以下是一些反向代理的配置，可选。</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#允许客户端请求的最大单文件字节数</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">10m</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#缓冲区代理缓冲用户端请求的最大字节数，</span></span>
<span class="line">            <span class="token comment">#如果把它设置为比较大的数值，例如256k，那么，无论使用firefox还是IE浏览器，来提交任意小于256k的图片，都很正常。如果注释该指令，使用默认的client_body_buffer_size设置，也就是操作系统页面大小的两倍，8k或者16k，问题就出现了。</span></span>
<span class="line">            <span class="token comment">#无论使用firefox4.0还是IE8.0，提交一个比较大，200k左右的图片，都返回500 Internal Server Error错误</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">client_body_buffer_size</span> <span class="token number">128k</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#表示使nginx阻止HTTP应答代码为400或者更高的应答。</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_intercept_errors</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#后端服务器连接的超时时间_发起握手等候响应超时时间</span></span>
<span class="line">            <span class="token comment">#nginx跟后端服务器连接超时时间(代理连接超时)</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">90</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#后端服务器数据回传时间(代理发送超时)</span></span>
<span class="line">            <span class="token comment">#后端服务器数据回传时间_就是在规定时间之内后端服务器必须传完所有的数据</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_send_timeout</span> <span class="token number">90</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#连接成功后，后端服务器响应时间(代理接收超时)</span></span>
<span class="line">            <span class="token comment">#连接成功后_等候后端服务器响应时间_其实已经进入后端的排队之中等候处理（也可以说是后端服务器处理请求的时间）</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_read_timeout</span> <span class="token number">90</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#设置代理服务器（nginx）保存用户头信息的缓冲区大小</span></span>
<span class="line">            <span class="token comment">#设置从被代理服务器读取的第一部分应答的缓冲区大小，通常情况下这部分应答中包含一个小的应答头，默认情况下这个值的大小为指令proxy_buffers中指定的一个缓冲区的大小，不过可以将其设置为更小</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_buffer_size</span> <span class="token number">4k</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#proxy_buffers缓冲区，网页平均在32k以下的设置</span></span>
<span class="line">            <span class="token comment">#设置用于读取应答（来自被代理服务器）的缓冲区数目和大小，默认情况也为分页大小，根据操作系统的不同可能是4k或者8k</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_buffers</span> <span class="token number">4</span> <span class="token number">32k</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#高负荷下缓冲大小（proxy_buffers*2）</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_busy_buffers_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">#设置在写入proxy_temp_path时数据的大小，预防一个工作进程在传递文件时阻塞太长</span></span>
<span class="line">            <span class="token comment">#设定缓存文件夹大小，大于这个值，将从upstream服务器传</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_temp_file_write_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         </span>
<span class="line">        <span class="token comment">#设定查看Nginx状态的地址</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /NginxStatus</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">stub_status</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">access_log</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">auth_basic</span> <span class="token string">&quot;NginxStatus&quot;</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">auth_basic_user_file</span> confpasswd</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token comment">#htpasswd文件的内容可以用apache提供的htpasswd工具来产生。</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         </span>
<span class="line">        <span class="token comment">#本地动静分离反向代理配置</span></span>
<span class="line">        <span class="token comment">#所有jsp的页面均交由tomcat或resin处理</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ~ .(jsp|jspx|do)?$</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         </span>
<span class="line">        <span class="token comment"># 所有静态文件由nginx直接读取不经过 tomcat 或 resin</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ~ .*.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)$</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">expires</span> <span class="token number">15d</span></span><span class="token punctuation">;</span> </span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         </span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ~ .*.(js|css)?$</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">expires</span> <span class="token number">1h</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stream-tcp-udp数据流模块" tabindex="-1"><a class="header-anchor" href="#stream-tcp-udp数据流模块"><span>stream (TCP/UDP数据流模块)</span></a></h3><blockquote><p>stream 模块一般用于tcp/UDP数据流的代理和负载均衡，可以通过stream模块代理转发TCP消息。 ngx_stream_core_module模块由1.9.0版提供。</p><p>可以实现负载均衡和 mysql 等 tcp 协议中间件的访问。</p></blockquote><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token comment"># mysql 配置</span></span>
<span class="line"><span class="token directive"><span class="token keyword">stream</span></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># nginx 监听服务</span></span>
<span class="line">  <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">3307</span></span><span class="token punctuation">;</span> </span>
<span class="line">    <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">1s</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">proxy_timeout</span> <span class="token number">3s</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">proxy_pass</span> ip:port</span><span class="token punctuation">;</span>    </span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">stream</span></span>  <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment"># 可以实现负载</span></span>
<span class="line">   <span class="token directive"><span class="token keyword">upstream</span> mysql_socket</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token directive"><span class="token keyword">server</span> ip:port</span><span class="token punctuation">;</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line">   <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token directive"><span class="token keyword">listen</span> <span class="token number">3307</span></span><span class="token punctuation">;</span> </span>
<span class="line">     <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">1s</span></span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token directive"><span class="token keyword">proxy_timeout</span> <span class="token number">3s</span></span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token directive"><span class="token keyword">proxy_pass</span> mysql_socket</span><span class="token punctuation">;</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><h3 id="q1-http状态码413-request-entity-too-large" tabindex="-1"><a class="header-anchor" href="#q1-http状态码413-request-entity-too-large"><span>Q1.Http状态码413（Request Entity Too Large）</span></a></h3><p>检查<code>nginx.conf</code>配置文件中 http{} 或 server{} 或 location{} 下<code>client_max_body_size</code>配置的大小，默认1m</p><p>修改为</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token comment"># 默认1m，根据使用场景据实修改</span></span>
<span class="line">client_max_body_size 10m </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>重新加载 nginx 配置</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">nginx <span class="token parameter variable">-s</span> reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,77)]))}const o=n(p,[["render",i],["__file","01-Nginx.html.vue"]]),r=JSON.parse('{"path":"/docs/nginx/01-Nginx.html","title":"Ningx","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"nginx.conf 配置","slug":"nginx-conf-配置","link":"#nginx-conf-配置","children":[{"level":3,"title":"全局块","slug":"全局块","link":"#全局块","children":[]},{"level":3,"title":"events 块","slug":"events-块","link":"#events-块","children":[]},{"level":3,"title":"http 块","slug":"http-块","link":"#http-块","children":[]}]},{"level":2,"title":"nginx 命令","slug":"nginx-命令","link":"#nginx-命令","children":[]},{"level":2,"title":"常用配置","slug":"常用配置","link":"#常用配置","children":[{"level":3,"title":"https","slug":"https","link":"#https","children":[]},{"level":3,"title":"autoindex （文件下载）","slug":"autoindex-文件下载","link":"#autoindex-文件下载","children":[]},{"level":3,"title":"auth_basic （HTTP 认证）","slug":"auth-basic-http-认证","link":"#auth-basic-http-认证","children":[]},{"level":3,"title":"proxy_pass（反向代理）","slug":"proxy-pass-反向代理","link":"#proxy-pass-反向代理","children":[]},{"level":3,"title":"upstream（负载均衡）","slug":"upstream-负载均衡","link":"#upstream-负载均衡","children":[]},{"level":3,"title":"stream (TCP/UDP数据流模块)","slug":"stream-tcp-udp数据流模块","link":"#stream-tcp-udp数据流模块","children":[]}]},{"level":2,"title":"常见问题","slug":"常见问题","link":"#常见问题","children":[{"level":3,"title":"Q1.Http状态码413（Request Entity Too Large）","slug":"q1-http状态码413-request-entity-too-large","link":"#q1-http状态码413-request-entity-too-large","children":[]}]}],"git":{"updatedTime":1743500763000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":7}]},"filePathRelative":"docs/nginx/01-Nginx.md"}');export{o as comp,r as data};
