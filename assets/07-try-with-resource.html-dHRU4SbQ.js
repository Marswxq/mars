import{_ as n,c as a,d as e,o as t}from"./app-BnYMp7-V.js";const p={};function l(o,s){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="try-with-resource" tabindex="-1"><a class="header-anchor" href="#try-with-resource"><span>Try-with-resource</span></a></h1><p>try-with-resources语句是一种声明了一种或多种资源的try语句。资源是指在程序用完了之后必须要关闭的对象。try-with-resources语句保证了每个声明了的资源在语句结束的时候都会被关闭。任何实现了java.lang.AutoCloseable接口的对象，和实现了java.io.Closeable接口的对象，都可以当做资源使用。</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">    <span class="token annotation punctuation">@Test</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">readFirstLineFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> br <span class="token operator">=</span></span>
<span class="line">                     <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token string">&quot;D:\\\\tmp\\\\columnInfo_tmp.xls&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">assert</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等价于</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">    <span class="token annotation punctuation">@Test</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> readFirstLineFromFileWithFinallyBlock	<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token string">&quot;D:\\\\tmp\\\\columnInfo_tmp.xls&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">assert</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span></span>
<span class="line">            br<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)]))}const i=n(p,[["render",l],["__file","07-try-with-resource.html.vue"]]),r=JSON.parse('{"path":"/docs/java/07-try-with-resource.html","title":"Try-with-resource","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1734338014000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":1}]},"filePathRelative":"docs/java/07-try-with-resource.md"}');export{i as comp,r as data};