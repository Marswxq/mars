import{_ as n,c as a,d as e,o as i}from"./app-CaR4wR_N.js";const l={};function d(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="飞牛nas" tabindex="-1"><a class="header-anchor" href="#飞牛nas"><span>飞牛NAS</span></a></h1><h2 id="创建目录" tabindex="-1"><a class="header-anchor" href="#创建目录"><span>创建目录</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ./<span class="token punctuation">{</span>disk1,disk2<span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="创建-docker-compose-yml-文件" tabindex="-1"><a class="header-anchor" href="#创建-docker-compose-yml-文件"><span>创建 docker-compose.yml 文件</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> ./docker-compose.yml <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;</span>
<span class="line">services:</span>
<span class="line">  fnos:</span>
<span class="line">    image: ghcr.io/qemus/qemu:7.12 # 使用包含QEMU的镜像</span>
<span class="line">    container_name: fnos # 容器名称</span>
<span class="line">    environment:</span>
<span class="line">      BOOT: &quot;https://iso.liveupdate.fnnas.com/x86_64/trim/fnos-0.9.37-1311.iso?sign=29d1cd860f6bf34510221aa3b3af4db5&amp;t=1763450082&quot; # 飞牛os安装镜像地址，请替换为最新稳定版本或系统盘镜像路径；</span>
<span class="line">      # BOOT: &quot;/iso/fnos-0.9.37-1311.iso&quot;  # 使用容器内的ISO路径</span>
<span class="line">      RAM_SIZE: &quot;2G&quot; # qemu虚拟机设定的内存大小</span>
<span class="line">      CPU_CORES: &quot;4&quot; # qemu虚拟机设定的CPU核心数</span>
<span class="line">      DISK_SIZE: &quot;16G&quot; # 飞牛系统盘大小</span>
<span class="line">      DISK2_SIZE: &quot;20G&quot; # 数据盘大小，可以添加更多 DISK_SIZE=... 参数创建更多数据盘</span>
<span class="line">    devices:</span>
<span class="line">      - /dev/kvm # 映射 KVM 设备文件，用于启用硬件加速（如果宿主机支持）</span>
<span class="line">      - /dev/net/tun # 映射 TUN/TAP 设备文件，用于网络连接</span>
<span class="line">    cap_add:</span>
<span class="line">      - NET_ADMIN # 添加网络管理权限，允许容器配置网络接口</span>
<span class="line">    ports:</span>
<span class="line">      # 将容器内部的 fnOS 端口映射到宿主机端口</span>
<span class="line">      - 8006:8006 # QEMU Web管理界面默认端口映射</span>
<span class="line">      - 5666:5666 # fnOS Web管理界面默认端口映射</span>
<span class="line">      #- 5005:5005 # fnOS 相关WebDAV服务端口映射（可自行选择是否开启）</span>
<span class="line">      #- 5006:5006 # fnOS 相关WebDAV服务端口映射（可自行选择是否开启）</span>
<span class="line">      #- 445:445 # fnOS 相关SMB服务端口映射（可自行选择是否开启）</span>
<span class="line">      #- 21:21 # fnOS 相关FTP服务端口映射（可自行选择是否开启）</span>
<span class="line">    volumes:</span>
<span class="line">      # 将宿主机目录映射到 fnOS 虚拟机内部作为数据盘，请替换 /dir1 和 /dir2 为实际路径</span>
<span class="line">      - ./disk1:/storage # 映射到 fnOS 内部的第一个数据盘目录</span>
<span class="line">      - ./disk2:/storage2 # 映射到 fnOS 内部的第二个数据盘目录</span>
<span class="line">      # 你可以将 fnOS 的系统盘镜像也通过 volume 映射出来，以便持久化系统状态</span>
<span class="line">      # - ./fnos_system.qcow2:/drive/fnos_system.qcow2 # 示例：将系统盘镜像文件映射出来</span>
<span class="line">    restart: unless-stopped # Docker容器退出后总是重启（除非手动停止）</span>
<span class="line">    stop_grace_period: 2m # 优雅停止的等待时间</span>
<span class="line">    # networks: # 如需设置飞牛系统本地固定IP等，可在此配置网络，可能需要 macvlan 等模式</span>
<span class="line">    #   default:</span>
<span class="line">    #     ipv4_address: 192.168.1.100 # 示例固定IP (需配合 macvlan 网络配置)</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动" tabindex="-1"><a class="header-anchor" href="#启动"><span>启动</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2><p>登录 qemu ：http://[你的ip]:8006 完成 fnOS 安装，教程参考<a href="https://help.fnnas.com/articles/fnosV1/start/install-os.md" target="_blank" rel="noopener noreferrer">如何安装和初始化飞牛 fnOS ?</a></p><p>最后，完成 fnOS 安装后，登录 http://[你的ip]:5666 开启 fnOS 之旅。</p>`,10)]))}const r=n(l,[["render",d],["__file","11-飞牛nas.html.vue"]]),t=JSON.parse('{"path":"/docs/docker/11-%E9%A3%9E%E7%89%9BNAS.html","title":"飞牛NAS","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"创建目录","slug":"创建目录","link":"#创建目录","children":[]},{"level":2,"title":"创建 docker-compose.yml 文件","slug":"创建-docker-compose-yml-文件","link":"#创建-docker-compose-yml-文件","children":[]},{"level":2,"title":"启动","slug":"启动","link":"#启动","children":[]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[]}],"git":{"updatedTime":1763969074000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":1}]},"filePathRelative":"docs/docker/11-飞牛NAS.md"}');export{r as comp,t as data};
