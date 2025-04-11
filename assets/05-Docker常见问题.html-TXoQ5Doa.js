import{_ as a,c as s,d as n,o as i}from"./app-DJm-wWA8.js";const l={};function r(o,e){return i(),s("div",null,e[0]||(e[0]=[n(`<h1 id="docker-常见问题" tabindex="-1"><a class="header-anchor" href="#docker-常见问题"><span>Docker 常见问题</span></a></h1><h2 id="q1-library-initialization-failed-unable-to-allocate-file-descriptor-table-out-of-memoryaborted-core-dumped" tabindex="-1"><a class="header-anchor" href="#q1-library-initialization-failed-unable-to-allocate-file-descriptor-table-out-of-memoryaborted-core-dumped"><span>Q1. library initialization failed - unable to allocate file descriptor table - out of memoryAborted (core dumped)</span></a></h2><h3 id="quession" tabindex="-1"><a class="header-anchor" href="#quession"><span>Quession</span></a></h3><p>docker 启动报 <code>library initialization failed - unable to allocate file descriptor table - out of memory</code> 或 docker 容器内应用启动报 <code>library initialization failed - unable to allocate file descriptor table - out of memoryAborted (core dumped)</code></p><h3 id="answer" tabindex="-1"><a class="header-anchor" href="#answer"><span>Answer</span></a></h3><h4 id="原因" tabindex="-1"><a class="header-anchor" href="#原因"><span>原因</span></a></h4><ol><li><p><code>LimitNOFILE=infinity</code>虽然是不限制，但是在<code>systemctl</code>版本小于234的时候不生效，查看systemctl版本：systemctl --version</p></li><li><p>docker容器的<code>ulimit</code>太小了</p></li></ol><h4 id="解决" tabindex="-1"><a class="header-anchor" href="#解决"><span>解决</span></a></h4><p>修改 <code>docker.service</code> 配置（配置路径可能不一致，可以通过<code>find / -name docker.service</code>查找）</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">vim</span> /usr/lib/systemd/system/docker.service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>方式1：</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token assign-left variable">LimitCORE</span><span class="token operator">=</span>infinity</span>
<span class="line"><span class="token assign-left variable">LimitNOFILE</span><span class="token operator">=</span>infinity</span>
<span class="line"><span class="token assign-left variable">LimitNPROC</span><span class="token operator">=</span>infinity</span>
<span class="line"></span>
<span class="line">修改为</span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">LimitCORE</span><span class="token operator">=</span><span class="token number">65535</span></span>
<span class="line"><span class="token assign-left variable">LimitNOFILE</span><span class="token operator">=</span><span class="token number">65535</span></span>
<span class="line"><span class="token assign-left variable">LimitNPROC</span><span class="token operator">=</span><span class="token number">65535</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方式2：</li></ul><p>在<code>ExecStart</code>命令后加上创建容器的默认<code>ulimit</code>配置</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/dockerd </span>
<span class="line"></span>
<span class="line">修改为</span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/dockerd --default-ulimit <span class="token assign-left variable">nofile</span><span class="token operator">=</span><span class="token number">65536</span>:65536</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>~~Tips:推荐使用方式2</strong></em></p><h2 id="q2-dokcer-宿主机能够访问局域网内其他ip-但是-docker-容器访问不了" tabindex="-1"><a class="header-anchor" href="#q2-dokcer-宿主机能够访问局域网内其他ip-但是-docker-容器访问不了"><span>Q2. dokcer 宿主机能够访问局域网内其他ip，但是 docker 容器访问不了</span></a></h2><h3 id="quession-1" tabindex="-1"><a class="header-anchor" href="#quession-1"><span>Quession</span></a></h3><p>一个很奇怪的问题，在 docker 宿主机上可以 <code>ping</code>、<code>telnet</code> 同另外一台服务器，但是在 docker 容器内 <code>ping</code>、<code>telnet</code> 均不通。</p><h3 id="answer-1" tabindex="-1"><a class="header-anchor" href="#answer-1"><span>Answer</span></a></h3><h4 id="原因-1" tabindex="-1"><a class="header-anchor" href="#原因-1"><span>原因</span></a></h4><p><code>/usr/lib/systemd/system/docker.service</code> 中配置 <code>ExecStart=/usr/bin/dockerd -H fd:// --iptables=false --containerd=/run/containerd/containerd.sock</code>。 因为 docker 默认使用 <code>iptables</code> 进行网络配置，如果禁用 <code>iptables</code> 会导致 docker 容器内部的网络无法使用宿主机网络转发。</p><h4 id="解决-1" tabindex="-1"><a class="header-anchor" href="#解决-1"><span>解决</span></a></h4><p>删除 <code>--iptables=false</code>，重新启动 docker 。</p>`,24)]))}const d=a(l,[["render",r],["__file","05-Docker常见问题.html.vue"]]),c=JSON.parse('{"path":"/docs/docker/05-Docker%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html","title":"Docker 常见问题","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"Q1. library initialization failed - unable to allocate file descriptor table - out of memoryAborted (core dumped)","slug":"q1-library-initialization-failed-unable-to-allocate-file-descriptor-table-out-of-memoryaborted-core-dumped","link":"#q1-library-initialization-failed-unable-to-allocate-file-descriptor-table-out-of-memoryaborted-core-dumped","children":[{"level":3,"title":"Quession","slug":"quession","link":"#quession","children":[]},{"level":3,"title":"Answer","slug":"answer","link":"#answer","children":[]}]},{"level":2,"title":"Q2. dokcer 宿主机能够访问局域网内其他ip，但是 docker 容器访问不了","slug":"q2-dokcer-宿主机能够访问局域网内其他ip-但是-docker-容器访问不了","link":"#q2-dokcer-宿主机能够访问局域网内其他ip-但是-docker-容器访问不了","children":[{"level":3,"title":"Quession","slug":"quession-1","link":"#quession-1","children":[]},{"level":3,"title":"Answer","slug":"answer-1","link":"#answer-1","children":[]}]}],"git":{"updatedTime":1737104922000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":3}]},"filePathRelative":"docs/docker/05-Docker常见问题.md"}');export{d as comp,c as data};
