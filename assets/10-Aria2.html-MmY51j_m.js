import{_ as s,c as a,d as e,o as i}from"./app-CaR4wR_N.js";const l="/mars/images/docker/AriaNg_config.png",c={};function p(r,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="aria2" tabindex="-1"><a class="header-anchor" href="#aria2"><span>Aria2</span></a></h1><h2 id="什么是-aria2" tabindex="-1"><a class="header-anchor" href="#什么是-aria2"><span>什么是 Aria2</span></a></h2><blockquote><p><a href="https://aria2.com.cn/" target="_blank" rel="noopener noreferrer">官方博客：什么是 Aria2</a></p></blockquote><h2 id="docker-compose-部署-aria2" tabindex="-1"><a class="header-anchor" href="#docker-compose-部署-aria2"><span>docker-compose 部署 Aria2</span></a></h2><h3 id="_1-创建目录" tabindex="-1"><a class="header-anchor" href="#_1-创建目录"><span>1. 创建目录</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token punctuation">{</span>./aria2/<span class="token punctuation">{</span>downloads,config<span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-配置文件" tabindex="-1"><a class="header-anchor" href="#_2-配置文件"><span>2. 配置文件</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> ./aria2/config/aria2.conf <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;</span>
<span class="line"># https://github.com/P3TERX/aria2.conf</span>
<span class="line"># File name：aria2.conf</span>
<span class="line"># Description: Awesome Aria2 configuration file</span>
<span class="line"># Version: 2021.09.15</span>
<span class="line">#</span>
<span class="line"># Copyright (c) 2018-2021 P3TERX &lt;https://p3terx.com&gt;</span>
<span class="line">#</span>
<span class="line"># This is free software, licensed under the MIT License.</span>
<span class="line"># See /LICENSE for more information.</span>
<span class="line">#</span>
<span class="line"></span>
<span class="line">## 文件保存设置 ##</span>
<span class="line"></span>
<span class="line"># 下载目录。可使用绝对路径或相对路径, 默认: 当前启动位置</span>
<span class="line">dir=/downloads</span>
<span class="line"></span>
<span class="line"># 磁盘缓存, 0 为禁用缓存，默认:16M</span>
<span class="line"># 磁盘缓存的作用是把下载的数据块临时存储在内存中，然后集中写入硬盘，以减少磁盘 I/O ，提升读写性能，延长硬盘寿命。</span>
<span class="line"># 建议在有足够的内存空闲情况下适当增加，但不要超过剩余可用内存空间大小。</span>
<span class="line"># 此项值仅决定上限，实际对内存的占用取决于网速(带宽)和设备性能等其它因素。</span>
<span class="line">disk-cache=64M</span>
<span class="line"></span>
<span class="line"># 文件预分配方式, 可选：none, prealloc, trunc, falloc, 默认:prealloc</span>
<span class="line"># 预分配对于机械硬盘可有效降低磁盘碎片、提升磁盘读写性能、延长磁盘寿命。</span>
<span class="line"># 机械硬盘使用 ext4（具有扩展支持），btrfs，xfs 或 NTFS（仅 MinGW 编译版本）等文件系统建议设置为 falloc</span>
<span class="line"># 若无法下载，提示 fallocate failed.cause：Operation not supported 则说明不支持，请设置为 none</span>
<span class="line"># prealloc 分配速度慢, trunc 无实际作用，不推荐使用。</span>
<span class="line"># 固态硬盘不需要预分配，只建议设置为 none ，否则可能会导致双倍文件大小的数据写入，从而影响寿命。</span>
<span class="line">file-allocation=prealloc</span>
<span class="line"></span>
<span class="line"># 文件预分配大小限制。小于此选项值大小的文件不预分配空间，单位 K 或 M，默认：5M</span>
<span class="line">no-file-allocation-limit=64M</span>
<span class="line"></span>
<span class="line"># 断点续传</span>
<span class="line">continue=true</span>
<span class="line"></span>
<span class="line"># 始终尝试断点续传，无法断点续传则终止下载，默认：true</span>
<span class="line">always-resume=false</span>
<span class="line"></span>
<span class="line"># 不支持断点续传的 URI 数值，当 always-resume=false 时生效。</span>
<span class="line"># 达到这个数值从将头开始下载，值为 0 时所有 URI 不支持断点续传时才从头开始下载。</span>
<span class="line">max-resume-failure-tries=0</span>
<span class="line"></span>
<span class="line"># 获取服务器文件时间，默认:false</span>
<span class="line">remote-time=true</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## 进度保存设置 ##</span>
<span class="line"></span>
<span class="line"># 从会话文件中读取下载任务</span>
<span class="line">input-file=/config/aria2.session</span>
<span class="line"></span>
<span class="line"># 会话文件保存路径</span>
<span class="line"># Aria2 退出时或指定的时间间隔会保存\`错误/未完成\`的下载任务到会话文件</span>
<span class="line">save-session=/config/aria2.session</span>
<span class="line"></span>
<span class="line"># 任务状态改变后保存会话的间隔时间（秒）, 0 为仅在进程正常退出时保存, 默认:0</span>
<span class="line"># 为了及时保存任务状态、防止任务丢失，此项值只建议设置为 1</span>
<span class="line">save-session-interval=1</span>
<span class="line"></span>
<span class="line"># 自动保存任务进度到控制文件(*.aria2)的间隔时间（秒），0 为仅在进程正常退出时保存，默认：60</span>
<span class="line"># 此项值也会间接影响从内存中把缓存的数据写入磁盘的频率</span>
<span class="line"># 想降低磁盘 IOPS (每秒读写次数)则提高间隔时间</span>
<span class="line"># 想在意外非正常退出时尽量保存更多的下载进度则降低间隔时间</span>
<span class="line"># 非正常退出：进程崩溃、系统崩溃、SIGKILL 信号、设备断电等</span>
<span class="line">auto-save-interval=20</span>
<span class="line"></span>
<span class="line"># 强制保存，即使任务已完成也保存信息到会话文件, 默认:false</span>
<span class="line"># 开启后会在任务完成后保留 .aria2 文件，文件被移除且任务存在的情况下重启后会重新下载。</span>
<span class="line"># 关闭后已完成的任务列表会在重启后清空。</span>
<span class="line">force-save=true</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## 下载连接设置 ##</span>
<span class="line"></span>
<span class="line"># 文件未找到重试次数，默认:0 (禁用)</span>
<span class="line"># 重试时同时会记录重试次数，所以也需要设置 max-tries 这个选项</span>
<span class="line">max-file-not-found=10</span>
<span class="line"></span>
<span class="line"># 最大尝试次数，0 表示无限，默认:5</span>
<span class="line">max-tries=0</span>
<span class="line"></span>
<span class="line"># 重试等待时间（秒）, 默认:0 (禁用)</span>
<span class="line">retry-wait=10</span>
<span class="line"></span>
<span class="line"># 连接超时时间（秒）。默认：60</span>
<span class="line">connect-timeout=10</span>
<span class="line"></span>
<span class="line"># 超时时间（秒）。默认：60</span>
<span class="line">timeout=10</span>
<span class="line"></span>
<span class="line"># 最大同时下载任务数, 运行时可修改, 默认:5</span>
<span class="line">max-concurrent-downloads=5</span>
<span class="line"></span>
<span class="line"># 单服务器最大连接线程数, 任务添加时可指定, 默认:1</span>
<span class="line"># 最大值为 16 (增强版无限制), 且受限于单任务最大连接线程数(split)所设定的值。</span>
<span class="line">max-connection-per-server=16</span>
<span class="line"></span>
<span class="line"># 单任务最大连接线程数, 任务添加时可指定, 默认:5</span>
<span class="line">split=64</span>
<span class="line"></span>
<span class="line"># 文件最小分段大小, 添加时可指定, 取值范围 1M-1024M (增强版最小值为 1K), 默认:20M</span>
<span class="line"># 比如此项值为 10M, 当文件为 20MB 会分成两段并使用两个来源下载, 文件为 15MB 则只使用一个来源下载。</span>
<span class="line"># 理论上值越小使用下载分段就越多，所能获得的实际线程数就越大，下载速度就越快，但受限于所下载文件服务器的策略。</span>
<span class="line">min-split-size=4M</span>
<span class="line"></span>
<span class="line"># HTTP/FTP 下载分片大小，所有分割都必须是此项值的倍数，最小值为 1M (增强版为 1K)，默认：1M</span>
<span class="line">piece-length=1M</span>
<span class="line"></span>
<span class="line"># 允许分片大小变化。默认：false</span>
<span class="line"># false：当分片大小与控制文件中的不同时将会中止下载</span>
<span class="line"># true：丢失部分下载进度继续下载</span>
<span class="line">allow-piece-length-change=true</span>
<span class="line"></span>
<span class="line"># 最低下载速度限制。当下载速度低于或等于此选项的值时关闭连接（增强版本为重连），此选项与 BT 下载无关。单位 K 或 M ，默认：0 (无限制)</span>
<span class="line">lowest-speed-limit=0</span>
<span class="line"></span>
<span class="line"># 全局最大下载速度限制, 运行时可修改, 默认：0 (无限制)</span>
<span class="line">max-overall-download-limit=0</span>
<span class="line"></span>
<span class="line"># 单任务下载速度限制, 默认：0 (无限制)</span>
<span class="line">max-download-limit=0</span>
<span class="line"></span>
<span class="line"># 禁用 IPv6, 默认:false</span>
<span class="line">disable-ipv6=true</span>
<span class="line"></span>
<span class="line"># GZip 支持，默认:false</span>
<span class="line">http-accept-gzip=true</span>
<span class="line"></span>
<span class="line"># URI 复用，默认: true</span>
<span class="line">reuse-uri=false</span>
<span class="line"></span>
<span class="line"># 禁用 netrc 支持，默认:false</span>
<span class="line">no-netrc=true</span>
<span class="line"></span>
<span class="line"># 允许覆盖，当相关控制文件(.aria2)不存在时从头开始重新下载。默认:false</span>
<span class="line">allow-overwrite=false</span>
<span class="line"></span>
<span class="line"># 文件自动重命名，此选项仅在 HTTP(S)/FTP 下载中有效。新文件名在名称之后扩展名之前加上一个点和一个数字（1..9999）。默认:true</span>
<span class="line">auto-file-renaming=true</span>
<span class="line"></span>
<span class="line"># 使用 UTF-8 处理 Content-Disposition ，默认:false</span>
<span class="line">content-disposition-default-utf8=true</span>
<span class="line"></span>
<span class="line"># 最低 TLS 版本，可选：TLSv1.1、TLSv1.2、TLSv1.3 默认:TLSv1.2</span>
<span class="line">#min-tls-version=TLSv1.2</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## BT/PT 下载设置 ##</span>
<span class="line"></span>
<span class="line"># BT 监听端口(TCP), 默认:6881-6999</span>
<span class="line"># 直通外网的设备，比如 VPS ，务必配置防火墙和安全组策略允许此端口入站</span>
<span class="line"># 内网环境的设备，比如 NAS ，除了防火墙设置，还需在路由器设置外网端口转发到此端口</span>
<span class="line">listen-port=6888</span>
<span class="line"></span>
<span class="line"># DHT 网络与 UDP tracker 监听端口(UDP), 默认:6881-6999</span>
<span class="line"># 因协议不同，可以与 BT 监听端口使用相同的端口，方便配置防火墙和端口转发策略。</span>
<span class="line">dht-listen-port=6888</span>
<span class="line"></span>
<span class="line"># 启用 IPv4 DHT 功能, PT 下载(私有种子)会自动禁用, 默认:true</span>
<span class="line">enable-dht=true</span>
<span class="line"></span>
<span class="line"># 启用 IPv6 DHT 功能, PT 下载(私有种子)会自动禁用，默认:false</span>
<span class="line"># 在没有 IPv6 支持的环境开启可能会导致 DHT 功能异常</span>
<span class="line">enable-dht6=false</span>
<span class="line"></span>
<span class="line"># 指定 BT 和 DHT 网络中的 IP 地址</span>
<span class="line"># 使用场景：在家庭宽带没有公网 IP 的情况下可以把 BT 和 DHT 监听端口转发至具有公网 IP 的服务器，在此填写服务器的 IP ，可以提升 BT 下载速率。</span>
<span class="line">#bt-external-ip=</span>
<span class="line"></span>
<span class="line"># IPv4 DHT 文件路径，默认：$HOME/.aria2/dht.dat</span>
<span class="line">dht-file-path=/config/dht.dat</span>
<span class="line"></span>
<span class="line"># IPv6 DHT 文件路径，默认：$HOME/.aria2/dht6.dat</span>
<span class="line">dht-file-path6=/config/dht6.dat</span>
<span class="line"></span>
<span class="line"># IPv4 DHT 网络引导节点</span>
<span class="line">dht-entry-point=dht.transmissionbt.com:6881</span>
<span class="line"></span>
<span class="line"># IPv6 DHT 网络引导节点</span>
<span class="line">dht-entry-point6=dht.transmissionbt.com:6881</span>
<span class="line"></span>
<span class="line"># 本地节点发现, PT 下载(私有种子)会自动禁用 默认:false</span>
<span class="line">bt-enable-lpd=true</span>
<span class="line"></span>
<span class="line"># 指定用于本地节点发现的接口，可能的值：接口，IP地址</span>
<span class="line"># 如果未指定此选项，则选择默认接口。</span>
<span class="line">#bt-lpd-interface=</span>
<span class="line"></span>
<span class="line"># 启用节点交换, PT 下载(私有种子)会自动禁用, 默认:true</span>
<span class="line">enable-peer-exchange=true</span>
<span class="line"></span>
<span class="line"># BT 下载最大连接数（单任务），运行时可修改。0 为不限制，默认:55</span>
<span class="line"># 理想情况下连接数越多下载越快，但在实际情况是只有少部分连接到的做种者上传速度快，其余的上传慢或者不上传。</span>
<span class="line"># 如果不限制，当下载非常热门的种子或任务数非常多时可能会因连接数过多导致进程崩溃或网络阻塞。</span>
<span class="line"># 进程崩溃：如果设备 CPU 性能一般，连接数过多导致 CPU 占用过高，因资源不足 Aria2 进程会强制被终结。</span>
<span class="line"># 网络阻塞：在内网环境下，即使下载没有占满带宽也会导致其它设备无法正常上网。因远古低性能路由器的转发性能瓶颈导致。</span>
<span class="line">bt-max-peers=128</span>
<span class="line"></span>
<span class="line"># BT 下载期望速度值（单任务），运行时可修改。单位 K 或 M 。默认:50K</span>
<span class="line"># BT 下载速度低于此选项值时会临时提高连接数来获得更快的下载速度，不过前提是有更多的做种者可供连接。</span>
<span class="line"># 实测临时提高连接数没有上限，但不会像不做限制一样无限增加，会根据算法进行合理的动态调节。</span>
<span class="line">bt-request-peer-speed-limit=10M</span>
<span class="line"></span>
<span class="line"># 全局最大上传速度限制, 运行时可修改, 默认:0 (无限制)</span>
<span class="line"># 设置过低可能影响 BT 下载速度</span>
<span class="line">max-overall-upload-limit=2M</span>
<span class="line"></span>
<span class="line"># 单任务上传速度限制, 默认:0 (无限制)</span>
<span class="line">max-upload-limit=0</span>
<span class="line"></span>
<span class="line"># 最小分享率。当种子的分享率达到此选项设置的值时停止做种, 0 为一直做种, 默认:1.0</span>
<span class="line"># 强烈建议您将此选项设置为大于等于 1.0</span>
<span class="line">seed-ratio=1.0</span>
<span class="line"></span>
<span class="line"># 最小做种时间（分钟）。设置为 0 时将在 BT 任务下载完成后停止做种。</span>
<span class="line">seed-time=0</span>
<span class="line"></span>
<span class="line"># 做种前检查文件哈希, 默认:true</span>
<span class="line">bt-hash-check-seed=true</span>
<span class="line"></span>
<span class="line"># 继续之前的BT任务时, 无需再次校验, 默认:false</span>
<span class="line">bt-seed-unverified=false</span>
<span class="line"></span>
<span class="line"># BT tracker 服务器连接超时时间（秒）。默认：60</span>
<span class="line"># 建立连接后，此选项无效，将使用 bt-tracker-timeout 选项的值</span>
<span class="line">bt-tracker-connect-timeout=10</span>
<span class="line"></span>
<span class="line"># BT tracker 服务器超时时间（秒）。默认：60</span>
<span class="line">bt-tracker-timeout=10</span>
<span class="line"></span>
<span class="line"># BT 服务器连接间隔时间（秒）。默认：0 (自动)</span>
<span class="line">#bt-tracker-interval=0</span>
<span class="line"></span>
<span class="line"># BT 下载优先下载文件开头或结尾</span>
<span class="line">bt-prioritize-piece=head=32M,tail=32M</span>
<span class="line"></span>
<span class="line"># 保存通过 WebUI(RPC) 上传的种子文件(.torrent)，默认:true</span>
<span class="line"># 所有涉及种子文件保存的选项都建议开启，不保存种子文件有任务丢失的风险。</span>
<span class="line"># 通过 RPC 自定义临时下载目录可能不会保存种子文件。</span>
<span class="line">rpc-save-upload-metadata=true</span>
<span class="line"></span>
<span class="line"># 下载种子文件(.torrent)自动开始下载, 默认:true，可选：false|mem</span>
<span class="line"># true：保存种子文件</span>
<span class="line"># false：仅下载种子文件</span>
<span class="line"># mem：将种子保存在内存中</span>
<span class="line">follow-torrent=true</span>
<span class="line"></span>
<span class="line"># 种子文件下载完后暂停任务，默认：false</span>
<span class="line"># 在开启 follow-torrent 选项后下载种子文件或磁力会自动开始下载任务进行下载，而同时开启当此选项后会建立相关任务并暂停。</span>
<span class="line">pause-metadata=false</span>
<span class="line"></span>
<span class="line"># 保存磁力链接元数据为种子文件(.torrent), 默认:false</span>
<span class="line">bt-save-metadata=true</span>
<span class="line"></span>
<span class="line"># 加载已保存的元数据文件(.torrent)，默认:false</span>
<span class="line">bt-load-saved-metadata=true</span>
<span class="line"></span>
<span class="line"># 删除 BT 下载任务中未选择文件，默认:false</span>
<span class="line">bt-remove-unselected-file=true</span>
<span class="line"></span>
<span class="line"># BT强制加密, 默认: false</span>
<span class="line"># 启用后将拒绝旧的 BT 握手协议并仅使用混淆握手及加密。可以解决部分运营商对 BT 下载的封锁，且有一定的防版权投诉与迅雷吸血效果。</span>
<span class="line"># 此选项相当于后面两个选项(bt-require-crypto=true, bt-min-crypto-level=arc4)的快捷开启方式，但不会修改这两个选项的值。</span>
<span class="line">bt-force-encryption=true</span>
<span class="line"></span>
<span class="line"># BT加密需求，默认：false</span>
<span class="line"># 启用后拒绝与旧的 BitTorrent 握手协议(\\19BitTorrent protocol)建立连接，始终使用混淆处理握手。</span>
<span class="line">#bt-require-crypto=true</span>
<span class="line"></span>
<span class="line"># BT最低加密等级，可选：plain（明文），arc4（加密），默认：plain</span>
<span class="line">#bt-min-crypto-level=arc4</span>
<span class="line"></span>
<span class="line"># 分离仅做种任务，默认：false</span>
<span class="line"># 从正在下载的任务中排除已经下载完成且正在做种的任务，并开始等待列表中的下一个任务。</span>
<span class="line">bt-detach-seed-only=true</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## 客户端伪装 ##</span>
<span class="line"></span>
<span class="line"># 自定义 User Agent</span>
<span class="line">user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36 Edg/93.0.961.47</span>
<span class="line"></span>
<span class="line"># BT 客户端伪装</span>
<span class="line"># PT 下载需要保持 user-agent 和 peer-agent 两个参数一致</span>
<span class="line"># 部分 PT 站对 Aria2 有特殊封禁机制，客户端伪装不一定有效，且有封禁账号的风险。</span>
<span class="line">#user-agent=Deluge 1.3.15</span>
<span class="line">peer-agent=Deluge 1.3.15</span>
<span class="line">peer-id-prefix=-DE13F0-</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## 执行额外命令 ##</span>
<span class="line"></span>
<span class="line"># 下载停止后执行的命令</span>
<span class="line"># 从 正在下载 到 删除、错误、完成 时触发。暂停被标记为未开始下载，故与此项无关。</span>
<span class="line">on-download-stop=/config/script/delete.sh</span>
<span class="line"></span>
<span class="line"># 下载完成后执行的命令</span>
<span class="line"># 此项未定义则执行 下载停止后执行的命令 (on-download-stop)</span>
<span class="line">on-download-complete=/config/script/clean.sh</span>
<span class="line"></span>
<span class="line"># 下载错误后执行的命令</span>
<span class="line"># 此项未定义则执行 下载停止后执行的命令 (on-download-stop)</span>
<span class="line">#on-download-error=</span>
<span class="line"></span>
<span class="line"># 下载暂停后执行的命令</span>
<span class="line">#on-download-pause=</span>
<span class="line"></span>
<span class="line"># 下载开始后执行的命令</span>
<span class="line">#on-download-start=</span>
<span class="line"></span>
<span class="line"># BT 下载完成后执行的命令</span>
<span class="line">#on-bt-download-complete=</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## RPC 设置 ##</span>
<span class="line"></span>
<span class="line"># 启用 JSON-RPC/XML-RPC 服务器, 默认:false</span>
<span class="line">enable-rpc=true</span>
<span class="line"></span>
<span class="line"># 接受所有远程请求, 默认:false</span>
<span class="line">rpc-allow-origin-all=true</span>
<span class="line"></span>
<span class="line"># 允许外部访问, 默认:false</span>
<span class="line">rpc-listen-all=true</span>
<span class="line"></span>
<span class="line"># RPC 监听端口, 默认:6800</span>
<span class="line">rpc-listen-port=6800</span>
<span class="line"></span>
<span class="line"># RPC 密钥</span>
<span class="line">rpc-secret=123456</span>
<span class="line"></span>
<span class="line"># RPC 最大请求大小</span>
<span class="line">rpc-max-request-size=10M</span>
<span class="line"></span>
<span class="line"># RPC 服务 SSL/TLS 加密, 默认：false</span>
<span class="line"># 启用加密后必须使用 https 或者 wss 协议连接</span>
<span class="line"># 不推荐开启，建议使用 web server 反向代理，比如 Nginx、Caddy ，灵活性更强。</span>
<span class="line">#rpc-secure=false</span>
<span class="line"></span>
<span class="line"># 在 RPC 服务中启用 SSL/TLS 加密时的证书文件(.pem/.crt)</span>
<span class="line">#rpc-certificate=/config/xxx.pem</span>
<span class="line"></span>
<span class="line"># 在 RPC 服务中启用 SSL/TLS 加密时的私钥文件(.key)</span>
<span class="line">#rpc-private-key=/config/xxx.key</span>
<span class="line"></span>
<span class="line"># 事件轮询方式, 可选：epoll, kqueue, port, poll, select, 不同系统默认值不同</span>
<span class="line">#event-poll=select</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## 高级选项 ##</span>
<span class="line"></span>
<span class="line"># 启用异步 DNS 功能。默认：true</span>
<span class="line">#async-dns=true</span>
<span class="line"></span>
<span class="line"># 指定异步 DNS 服务器列表，未指定则从 /etc/resolv.conf 中读取。</span>
<span class="line">#async-dns-server=119.29.29.29,223.5.5.5,8.8.8.8,1.1.1.1</span>
<span class="line"></span>
<span class="line"># 指定单个网络接口，可能的值：接口，IP地址，主机名</span>
<span class="line"># 如果接口具有多个 IP 地址，则建议指定 IP 地址。</span>
<span class="line"># 已知指定网络接口会影响依赖本地 RPC 的连接的功能场景，即通过 localhost 和 127.0.0.1 无法与 Aria2 服务端进行讯通。</span>
<span class="line">#interface=</span>
<span class="line"></span>
<span class="line"># 指定多个网络接口，多个值之间使用逗号(,)分隔。</span>
<span class="line"># 使用 interface 选项时会忽略此项。</span>
<span class="line">#multiple-interface=</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## 日志设置 ##</span>
<span class="line"></span>
<span class="line"># 日志文件保存路径，忽略或设置为空为不保存，默认：不保存</span>
<span class="line">log=/config/aria2.log</span>
<span class="line"></span>
<span class="line"># 日志级别，可选 debug, info, notice, warn, error 。默认：debug</span>
<span class="line">log-level=warn</span>
<span class="line"></span>
<span class="line"># 控制台日志级别，可选 debug, info, notice, warn, error ，默认：notice</span>
<span class="line">console-log-level=notice</span>
<span class="line"></span>
<span class="line"># 安静模式，禁止在控制台输出日志，默认：false</span>
<span class="line">quiet=false</span>
<span class="line"></span>
<span class="line"># 下载进度摘要输出间隔时间（秒），0 为禁止输出。默认：60</span>
<span class="line">summary-interval=0</span>
<span class="line"></span>
<span class="line"># 关闭控制台进度条输出，避免日志里面打印大量空行</span>
<span class="line">show-console-readout=false</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## 增强扩展设置(非官方) ##</span>
<span class="line"></span>
<span class="line"># 仅适用于 myfreeer/aria2-build-msys2 (Windows) 和 P3TERX/Aria2-Pro-Core (GNU/Linux) 项目所构建的增强版本</span>
<span class="line"></span>
<span class="line"># 在服务器返回 HTTP 400 Bad Request 时重试，仅当 retry-wait &gt; 0 时有效，默认 false</span>
<span class="line">retry-on-400=true</span>
<span class="line"></span>
<span class="line"># 在服务器返回 HTTP 403 Forbidden 时重试，仅当 retry-wait &gt; 0 时有效，默认 false</span>
<span class="line">retry-on-403=true</span>
<span class="line"></span>
<span class="line"># 在服务器返回 HTTP 406 Not Acceptable 时重试，仅当 retry-wait &gt; 0 时有效，默认 false</span>
<span class="line">retry-on-406=true</span>
<span class="line"></span>
<span class="line"># 在服务器返回未知状态码时重试，仅当 retry-wait &gt; 0 时有效，默认 false</span>
<span class="line">retry-on-unknown=true</span>
<span class="line"></span>
<span class="line"># 是否发送 Want-Digest HTTP 标头。默认：false (不发送)</span>
<span class="line"># 部分网站会把此标头作为特征来检测和屏蔽 Aria2</span>
<span class="line">#http-want-digest=false</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## BitTorrent trackers ##</span>
<span class="line">bt-tracker=http://0123456789nonexistent.com:80/announce,http://0d.kebhana.mx:443/announce,http://1337.abcvg.info:80/announce,http://207.241.226.111:6969/announce,http://207.241.231.226:6969/announce,http://[2a04:ac00:1:3dd8::1:2710]:2710/announce,http://aboutbeautifulgallopinghorsesinthegreenpasture.online:80/announce,http://bittorrent-tracker.e-n-c-r-y-p-t.net:1337/announce,http://bt.okmp3.ru:2710/announce,http://bt.poletracker.org:2710/announce,http://bt.rer.lol:2710/announce,http://bt1.xxxxbt.cc:6969/announce,http://bvarf.tracker.sh:2086/announce,http://echostar.ddnsfree.com:8080/announce,http://extracker.dahrkael.net:6969/announce,http://home.yxgz.club:6969/announce,http://ipv4.rer.lol:2710/announce,http://ipv6.rer.lol:6969/announce,http://lucke.fenesisu.moe:6969/announce,http://nyaa.tracker.wf:7777/announce,http://p4p.arenabg.com:1337/announce,http://retracker.hotplug.ru:2710/announce,http://seeders-paradise.org:80/announce,http://servandroidkino.ru:80/announce,http://share.hkg-fansub.info:80/announce.php,http://shubt.net:2710/announce,http://t-backup.213891.xyz:80/announce,http://tk.greedland.net:80/announce,http://torrent.hificode.in:6969/announce,http://torrentsmd.com:8080/announce,http://tr.highstar.shop:80/announce,http://tracker.23794.top:6969/announce,http://tracker.beeimg.com:6969/announce,http://tracker.bittor.pw:1337/announce,http://tracker.bt-hash.com:80/announce,http://tracker.bt4g.com:2095/announce,http://tracker.bz:80/announce,http://tracker.corpscorp.online:80/announce,http://tracker.cutie.dating:80/announce,http://tracker.darkness.services:6969/announce,http://tracker.dhitechnical.com:6969/announce,http://tracker.dler.com:6969/announce,http://tracker.dler.org:6969/announce,http://tracker.dmcomic.org:2710/announce,http://tracker.ghostchu-services.top:80/announce,http://tracker.ipv6tracker.org:80/announce,http://tracker.ipv6tracker.ru:80/announce,http://tracker.lintk.me:2710/announce,http://tracker.moxing.party:6969/announce,http://tracker.mywaifu.best:6969/announce,http://tracker.qu.ax:6969/announce,http://tracker.renfei.net:8080/announce,http://tracker.sbsub.com:2710/announce,http://tracker.tritan.gg:8080/announce,http://tracker.waaa.moe:6969/announce,http://tracker.xiaoduola.xyz:6969/announce,http://tracker.zhuqiy.com:80/announce,http://tracker.zhuqiy.dgj055.icu:80/announce,http://tracker2.dler.org:80/announce,http://tracker2.itzmx.com:6961/announce,http://www.all4nothin.net:80/announce.php,http://www.genesis-sp.org:2710/announce,http://www.torrentsnipe.info:2701/announce,http://www.wareztorrent.com:80/announce,https://1337.abcvg.info:443/announce,https://cny.fan:443/announce,https://shahidrazi.online:443/announce,https://t.213891.xyz:443/announce,https://threads.canofsocks.com:443/announce,https://torrent.tracker.durukanbal.com:443/announce,https://tr-rh-zhuqiy.dgj055.icu:443/announce,https://tr-zhuqiy-1.dgj055.icu:443/announce,https://tr-zhuqiy-2.dgj055.icu:443/announce,https://tr.abiir.top:443/announce,https://tr.abir.ga:443/announce,https://tr.nyacat.pw:443/announce,https://tr.zukizuki.org:443/announce,https://tracker.alaskantf.com:443/announce,https://tracker.belmult.online:443/announce,https://tracker.bt4g.com:443/announce,https://tracker.cangku.moe:443/announce,https://tracker.cutie.dating:443/announce,https://tracker.foreverpirates.co:443/announce,https://tracker.gcrenwp.top:443/announce,https://tracker.ghostchu-services.top:443/announce,https://tracker.kuroy.me:443/announce,https://tracker.leechshield.link:443/announce,https://tracker.moeblog.cn:443/announce,https://tracker.moeking.me:443/announce,https://tracker.pmman.tech:443/announce,https://tracker.qingwa.pro:443/announce,https://tracker.uraniumhexafluori.de:443/announce,https://tracker.yemekyedim.com:443/announce,https://tracker.zhuqiy.com:443/announce,https://tracker1.520.jp:443/announce,udp://207.241.226.111:6969/announce,udp://207.241.231.226:6969/announce,udp://52.58.128.163:6969/announce,udp://6ahddutb1ucc3cp.ru:6969/announce,udp://89.110.76.229:6969/announce,udp://[2a03:7220:8083:cd00::1]:451/announce,udp://[2a04:ac00:1:3dd8::1:2710]:2710/announce,udp://[2a0f:e586:f:f::81]:6969/announce,udp://anna.bt.bontal.net:6969/announce,udp://bittorrent-tracker.e-n-c-r-y-p-t.net:1337/announce,udp://bt.rer.lol:6969/announce,udp://burmese.app:6969/announce,udp://concen.org:6969/announce,udp://d40969.acod.regrucolo.ru:6969/announce,udp://evan.im:6969/announce,udp://exodus.desync.com:6969/announce,udp://extracker.dahrkael.net:6969/announce,udp://ipv4announce.sktorrent.eu:6969/announce,udp://isk.richardsw.club:6969/announce,udp://martin-gebhardt.eu:25/announce,udp://open.demonii.com:1337/announce,udp://open.demonoid.ch:6969/announce,udp://open.dstud.io:6969/announce,udp://open.stealth.si:80/announce,udp://opentor.org:2710/announce,udp://opentracker.io:6969/announce,udp://p4p.arenabg.com:1337/announce,udp://public.demonoid.ch:6969/announce,udp://retracker.hotplug.ru:2710/announce,udp://retracker.lanta.me:2710/announce,udp://retracker01-msk-virt.corbina.net:80/announce,udp://run.publictracker.xyz:6969/announce,udp://t.overflow.biz:6969/announce,udp://torrentclub.online:54123/announce,udp://tr3.ysagin.top:2715/announce,udp://tracker-de-2.cutie.dating:1337/announce,udp://tracker.1h.is:1337/announce,udp://tracker.bitcoinindia.space:6969/announce,udp://tracker.cloudbase.store:1333/announce,udp://tracker.cyberia.is:6969/announce,udp://tracker.dler.com:6969/announce,udp://tracker.dler.org:6969/announce,udp://tracker.ducks.party:1984/announce,udp://tracker.filemail.com:6969/announce,udp://tracker.fnix.net:6969/announce,udp://tracker.gmi.gd:6969/announce,udp://tracker.hifimarket.in:2710/announce,udp://tracker.hifitechindia.com:6969/announce,udp://tracker.iperson.xyz:6969/announce,udp://tracker.opentrackr.org:1337/announce,udp://tracker.playground.ru:6969/announce,udp://tracker.plx.im:6969/announce,udp://tracker.qu.ax:6969/announce,udp://tracker.skillindia.site:6969/announce,udp://tracker.skyts.net:6969/announce,udp://tracker.srv00.com:6969/announce,udp://tracker.startwork.cv:1337/announce,udp://tracker.t-1.org:6969/announce,udp://tracker.theoks.net:6969/announce,udp://tracker.therarbg.to:6969/announce,udp://tracker.torrent.eu.org:451/announce,udp://tracker.torrust-demo.com:6969/announce,udp://tracker.tryhackx.org:6969/announce,udp://tracker.tvunderground.org.ru:3218/announce,udp://tracker.zupix.online:1333/announce,udp://tracker.zupix.online:6969/announce,udp://tracker1.myporn.club:9337/announce,udp://tracker1.t-1.org:6969/announce,udp://tracker2.dler.org:80/announce,udp://tracker2.itzmx.com:6961/announce,udp://tracker3.itzmx.com:6961/announce,udp://tracker3.t-1.org:6969/announce,udp://tracker4.itzmx.com:2710/announce,udp://ttk2.nbaonlineservice.com:6969/announce,udp://udp.tracker.projectk.org:23333/announce,udp://v74853.hosted-by-vdsina.com:6969/announce,udp://wepzone.net:6969/announce,udp://www.torrent.eu.org:451/announce,wss://tracker.openwebtorrent.com:443/announce</span>
<span class="line"></span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_3-docker-compose-yml"><span>3. docker-compose.yml</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> ./aria2/docker-compose.yml <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;</span>
<span class="line">services:</span>
<span class="line">  aria2-pro:</span>
<span class="line">    container_name: aria2-pro</span>
<span class="line">    image: p3terx/aria2-pro</span>
<span class="line">    environment:</span>
<span class="line">      - PUID=1000</span>
<span class="line">      - PGID=1000</span>
<span class="line">      - UMASK_SET=022</span>
<span class="line">      - RPC_SECRET=123456</span>
<span class="line">      - RPC_PORT=6800</span>
<span class="line">      - LISTEN_PORT=6888</span>
<span class="line">    volumes:</span>
<span class="line">      - ./config:/config</span>
<span class="line">      - ./downloads:/downloads</span>
<span class="line">    ports:</span>
<span class="line">      - &quot;6800:6800&quot;</span>
<span class="line">      - &quot;6888:6888&quot;</span>
<span class="line">      - &quot;6888:6888/udp&quot;</span>
<span class="line">    restart: unless-stopped</span>
<span class="line">    network_mode: bridge</span>
<span class="line"></span>
<span class="line">  ariang:</span>
<span class="line">    container_name: ariang</span>
<span class="line">    image: p3terx/ariang</span>
<span class="line">    ports:</span>
<span class="line">      - &quot;6880:6880&quot;</span>
<span class="line">    restart: unless-stopped</span>
<span class="line">    network_mode: bridge</span>
<span class="line">    </span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-启动服务" tabindex="-1"><a class="header-anchor" href="#_4-启动服务"><span>4. 启动服务</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token builtin class-name">cd</span> ./aria2</span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-ariang" tabindex="-1"><a class="header-anchor" href="#配置-ariang"><span>配置 AriaNg</span></a></h2><h3 id="_1-登录控制台" tabindex="-1"><a class="header-anchor" href="#_1-登录控制台"><span>1. 登录控制台</span></a></h3><p>地址：http://[你的ip]:6880</p><h3 id="_2-配置-aria2" tabindex="-1"><a class="header-anchor" href="#_2-配置-aria2"><span>2. 配置 Aria2</span></a></h3><p>首先，点击 AriaNg 标签，选择需要连接 Aria2 服务；</p><p>然后，点击左侧菜单的 “AriaNg设置”-&gt;点击右侧 “RPC(localhost:6800)”-&gt;填写 “Aria2 RPC 地址”（地址据实填写即可）；</p><p>最后，刷新页面。</p><p><img src="`+l+'" alt="配置 Aria2"></p>',20)]))}const v=s(c,[["render",p],["__file","10-Aria2.html.vue"]]),u=JSON.parse('{"path":"/docs/docker/10-Aria2.html","title":"Aria2","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"什么是 Aria2","slug":"什么是-aria2","link":"#什么是-aria2","children":[]},{"level":2,"title":"docker-compose 部署 Aria2","slug":"docker-compose-部署-aria2","link":"#docker-compose-部署-aria2","children":[{"level":3,"title":"1. 创建目录","slug":"_1-创建目录","link":"#_1-创建目录","children":[]},{"level":3,"title":"2. 配置文件","slug":"_2-配置文件","link":"#_2-配置文件","children":[]},{"level":3,"title":"3. docker-compose.yml","slug":"_3-docker-compose-yml","link":"#_3-docker-compose-yml","children":[]},{"level":3,"title":"4. 启动服务","slug":"_4-启动服务","link":"#_4-启动服务","children":[]}]},{"level":2,"title":"配置 AriaNg","slug":"配置-ariang","link":"#配置-ariang","children":[{"level":3,"title":"1. 登录控制台","slug":"_1-登录控制台","link":"#_1-登录控制台","children":[]},{"level":3,"title":"2. 配置 Aria2","slug":"_2-配置-aria2","link":"#_2-配置-aria2","children":[]}]}],"git":{"updatedTime":1763960597000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":1}]},"filePathRelative":"docs/docker/10-Aria2.md"}');export{v as comp,u as data};
