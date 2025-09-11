import{_ as n,c as a,d as e,o as l}from"./app-CKtXyHQO.js";const i={};function p(c,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose"><span>Docker Compose</span></a></h1><h2 id="重启-docker" tabindex="-1"><a class="header-anchor" href="#重启-docker"><span>重启 docker</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function-name function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入要重新启动的容器名：&quot;</span> dname</span>
<span class="line">	</span>
<span class="line">	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$dname</span>&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">then</span> </span>
<span class="line">		<span class="token builtin class-name">echo</span> <span class="token string">&quot;输入非法！请检查！&quot;</span></span>
<span class="line">		<span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line">	<span class="token keyword">fi</span> </span>
<span class="line">	</span>
<span class="line">	<span class="token builtin class-name">echo</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;开始关闭<span class="token variable">$dname</span>..............................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span></span>
<span class="line">	</span>
<span class="line">	<span class="token function">docker-compose</span> stop <span class="token variable">$dname</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">then</span></span>
<span class="line">		<span class="token builtin class-name">echo</span></span>
<span class="line">		<span class="token builtin class-name">echo</span> <span class="token string">&quot;关闭<span class="token variable">$dname</span>完成...............................&quot;</span></span>
<span class="line">		<span class="token builtin class-name">echo</span></span>
<span class="line">	<span class="token keyword">else</span></span>
<span class="line">		<span class="token builtin class-name">echo</span></span>
<span class="line">		<span class="token builtin class-name">echo</span></span>
<span class="line">		<span class="token builtin class-name">echo</span></span>
<span class="line">		<span class="token builtin class-name">echo</span> <span class="token string">&quot;请检查<span class="token variable">$dname</span>容器是否存在！！！&quot;</span></span>
<span class="line">		<span class="token builtin class-name">echo</span> <span class="token string">&quot;请检查<span class="token variable">$dname</span>容器是否存在！！！&quot;</span></span>
<span class="line">		<span class="token builtin class-name">echo</span> <span class="token string">&quot;请检查<span class="token variable">$dname</span>容器是否存在！！！&quot;</span></span>
<span class="line">		<span class="token builtin class-name">echo</span></span>
<span class="line">		<span class="token builtin class-name">echo</span></span>
<span class="line">		<span class="token builtin class-name">echo</span></span>
<span class="line">		<span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line">	<span class="token keyword">fi</span> </span>
<span class="line">	<span class="token function">sleep</span> <span class="token number">1</span></span>
<span class="line">	</span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;开始删除<span class="token variable">$dname</span>..............................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">docker-compose</span> <span class="token function">rm</span> <span class="token variable">$dname</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	</span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;删除<span class="token variable">$dname</span>完成..............................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">sleep</span> <span class="token number">1</span> </span>
<span class="line">	</span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;重新拉取<span class="token variable">$dname</span>容器并启动....................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">docker-compose</span> <span class="token parameter variable">--compatibility</span> up <span class="token parameter variable">-d</span> <span class="token variable">$dname</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;拉取<span class="token variable">$dname</span>容器完成..........................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">sleep</span> <span class="token number">1</span> </span>
<span class="line">	</span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$dname</span>启动日志..............................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">--tail</span> <span class="token number">100</span> <span class="token variable">$dname</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function-name function">restartparam</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$param</span>&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">then</span> </span>
<span class="line">		<span class="token builtin class-name">echo</span> <span class="token string">&quot;参数非法请检查！&quot;</span></span>
<span class="line">		<span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line">	<span class="token keyword">fi</span> </span>
<span class="line"></span>
<span class="line">	<span class="token builtin class-name">echo</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;开始关闭<span class="token variable">$param</span>..............................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span></span>
<span class="line">	<span class="token function">docker-compose</span> stop <span class="token variable">$param</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">then</span></span>
<span class="line">	    <span class="token builtin class-name">echo</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;关闭<span class="token variable">$param</span>完成...............................&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span></span>
<span class="line">	<span class="token keyword">else</span></span>
<span class="line">	    <span class="token builtin class-name">echo</span></span>
<span class="line">	    <span class="token builtin class-name">echo</span></span>
<span class="line">	    <span class="token builtin class-name">echo</span> </span>
<span class="line">	    <span class="token builtin class-name">echo</span> <span class="token string">&quot;请检查<span class="token variable">$param</span>容器是否存在！！！&quot;</span> </span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;请检查<span class="token variable">$param</span>容器是否存在！！！&quot;</span></span>
<span class="line">	    <span class="token builtin class-name">echo</span> <span class="token string">&quot;请检查<span class="token variable">$param</span>容器是否存在！！！&quot;</span></span>
<span class="line">	    <span class="token builtin class-name">echo</span></span>
<span class="line">	    <span class="token builtin class-name">echo</span></span>
<span class="line">  	 <span class="token builtin class-name">echo</span>	    </span>
<span class="line">	    <span class="token builtin class-name">exit</span> <span class="token number">1</span> </span>
<span class="line">	<span class="token keyword">fi</span>	</span>
<span class="line">	<span class="token function">sleep</span> <span class="token number">1</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;开始删除<span class="token variable">$param</span>..............................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">docker-compose</span> <span class="token function">rm</span> <span class="token variable">$param</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;删除<span class="token variable">$param</span>完成..............................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">sleep</span> <span class="token number">1</span> </span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;重新拉取<span class="token variable">$param</span>容器并启动....................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">docker-compose</span> <span class="token parameter variable">--compatibility</span> up <span class="token parameter variable">-d</span> <span class="token variable">$param</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;拉取<span class="token variable">$param</span>容器完成..........................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">sleep</span> <span class="token number">1</span> </span>
<span class="line">	<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$param</span>启动日志..............................&quot;</span></span>
<span class="line">	<span class="token builtin class-name">echo</span> </span>
<span class="line">	<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">--tail</span> <span class="token number">100</span> <span class="token variable">$param</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">param</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$param</span>&quot;</span> <span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">then</span> </span>
<span class="line">	restart</span>
<span class="line"><span class="token keyword">else</span> </span>
<span class="line">	restartparam</span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)]))}const o=n(i,[["render",p],["__file","06-DockerCompose.html.vue"]]),r=JSON.parse('{"path":"/docs/docker/06-DockerCompose.html","title":"Docker Compose","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"重启 docker","slug":"重启-docker","link":"#重启-docker","children":[]}],"git":{"updatedTime":1734338014000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":1}]},"filePathRelative":"docs/docker/06-DockerCompose.md"}');export{o as comp,r as data};
