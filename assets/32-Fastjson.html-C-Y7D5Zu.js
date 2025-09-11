import{_ as n,c as a,d as e,o as l}from"./app-CKtXyHQO.js";const p={};function i(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="fastjson" tabindex="-1"><a class="header-anchor" href="#fastjson"><span>Fastjson</span></a></h1><h2 id="序列化配置" tabindex="-1"><a class="header-anchor" href="#序列化配置"><span>序列化配置</span></a></h2><p>首先，看看<code>SerializerFeature</code>源码。</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>fastjson<span class="token punctuation">.</span>serializer</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * <span class="token keyword">@author</span> wenshao[szujobs@hotmail.com]</span>
<span class="line"> */</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">SerializerFeature</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">QuoteFieldNames</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     *</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">UseSingleQuotes</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     *</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteMapNullValue</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * 用枚举toString()值输出</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteEnumUsingToString</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * 用枚举name()输出</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteEnumUsingName</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     *</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">UseISO8601DateFormat</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteNullListAsEmpty</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteNullStringAsEmpty</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteNullNumberAsZero</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteNullBooleanAsFalse</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">SkipTransientField</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">SortField</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.1</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token annotation punctuation">@Deprecated</span></span>
<span class="line">    <span class="token class-name">WriteTabAsSpecial</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.2</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">PrettyFormat</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.2</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteClassName</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.6</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">DisableCircularReferenceDetect</span><span class="token punctuation">,</span> <span class="token comment">// 32768</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.9</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteSlashAsSpecial</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.10</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">BrowserCompatible</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.14</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteDateUseDateFormat</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.15</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">NotWriteRootClassName</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.19</span>
<span class="line">     * <span class="token keyword">@deprecated</span></span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">DisableCheckSpecialChar</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.35</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">BeanToArray</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.37</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteNonStringKeyAsString</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.1.42</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">NotWriteDefaultValue</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.2.6</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">BrowserSecure</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.2.7</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">IgnoreNonFieldGetter</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.2.9</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteNonStringValueAsString</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.2.11</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">IgnoreErrorGetter</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.2.16</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">WriteBigDecimalAsPlain</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * <span class="token keyword">@since</span> 1.2.27</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token class-name">MapSortField</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">SerializerFeature</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">EMPTY</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SerializerFeature</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">WRITE_MAP_NULL_FEATURES</span></span>
<span class="line">            <span class="token operator">=</span> <span class="token class-name">WriteMapNullValue</span><span class="token punctuation">.</span><span class="token function">getMask</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token operator">|</span> <span class="token class-name">WriteNullBooleanAsFalse</span><span class="token punctuation">.</span><span class="token function">getMask</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token operator">|</span> <span class="token class-name">WriteNullListAsEmpty</span><span class="token punctuation">.</span><span class="token function">getMask</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token operator">|</span> <span class="token class-name">WriteNullNumberAsZero</span><span class="token punctuation">.</span><span class="token function">getMask</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token operator">|</span> <span class="token class-name">WriteNullStringAsEmpty</span><span class="token punctuation">.</span><span class="token function">getMask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> mask<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">SerializerFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        mask <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token function">ordinal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token keyword">int</span> features<span class="token punctuation">,</span> <span class="token class-name">SerializerFeature</span> feature<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">(</span>features <span class="token operator">&amp;</span> feature<span class="token punctuation">.</span>mask<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token keyword">int</span> features<span class="token punctuation">,</span> <span class="token keyword">int</span> fieaturesB<span class="token punctuation">,</span> <span class="token class-name">SerializerFeature</span> feature<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">int</span> mask <span class="token operator">=</span> feature<span class="token punctuation">.</span>mask<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">(</span>features <span class="token operator">&amp;</span> mask<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token punctuation">(</span>fieaturesB <span class="token operator">&amp;</span> mask<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token keyword">int</span> features<span class="token punctuation">,</span> <span class="token class-name">SerializerFeature</span> feature<span class="token punctuation">,</span> <span class="token keyword">boolean</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            features <span class="token operator">|=</span> feature<span class="token punctuation">.</span>mask<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            features <span class="token operator">&amp;=</span> <span class="token operator">~</span>feature<span class="token punctuation">.</span>mask<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> features<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">SerializerFeature</span><span class="token punctuation">[</span><span class="token punctuation">]</span> features<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>features <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">SerializerFeature</span> feature <span class="token operator">:</span> features<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            value <span class="token operator">|=</span> feature<span class="token punctuation">.</span>mask<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> value<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">getMask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> mask<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>源码属性说明</p><table><thead><tr><th>名称</th><th>含义</th></tr></thead><tbody><tr><td>QuoteFieldNames</td><td>输出key时是否使用双引号,默认为true</td></tr><tr><td>UseSingleQuotes</td><td>使用单引号而不是双引号,默认为false</td></tr><tr><td>WriteMapNullValue</td><td>是否输出值为null的字段,默认为false</td></tr><tr><td>WriteEnumUsingToString</td><td>Enum输出name()或者original,默认为false</td></tr><tr><td>UseISO8601DateFormat</td><td>Date使用ISO8601格式输出，默认为false</td></tr><tr><td>WriteNullListAsEmpty</td><td>List字段如果为null,输出为[],而非null</td></tr><tr><td>WriteNullStringAsEmpty</td><td>字符类型字段如果为null,输出为”“,而非null</td></tr><tr><td>WriteNullNumberAsZero</td><td>数值字段如果为null,输出为0,而非null</td></tr><tr><td>WriteNullBooleanAsFalse</td><td>Boolean字段如果为null,输出为false,而非null</td></tr><tr><td>SkipTransientField</td><td>如果是true，类中的Get方法对应的Field是transient，序列化时将会被忽略。默认为true</td></tr><tr><td>SortField</td><td>按字段名称排序后输出。默认为false</td></tr><tr><td>WriteTabAsSpecial</td><td>把\\t做转义输出，默认为false</td></tr><tr><td>PrettyFormat</td><td>结果是否格式化,默认为false</td></tr><tr><td>WriteClassName</td><td>序列化时写入类型信息，默认为false。反序列化是需用到</td></tr><tr><td>DisableCircularReferenceDetect</td><td>消除对同一对象循环引用的问题，默认为false</td></tr><tr><td>WriteSlashAsSpecial</td><td>对斜杠’/’进行转义</td></tr><tr><td>BrowserCompatible</td><td>将中文都会序列化为\\uXXXX格式，字节数会多一些，但是能兼容IE 6，默认为false</td></tr><tr><td>WriteDateUseDateFormat</td><td>全局修改日期格式,默认为false。JSON.DEFFAULT_DATE_FORMAT = “yyyy-MM-dd”;JSON.toJSONString(obj, SerializerFeature.WriteDateUseDateFormat);</td></tr><tr><td>DisableCheckSpecialChar</td><td>一个对象的字符串属性中如果有特殊字符如双引号，将会在转成json时带有反斜杠转移符。如果不需要转义，可以使用这个属性。默认为false</td></tr><tr><td>NotWriteRootClassName</td><td></td></tr><tr><td>BeanToArray</td><td>将对象转为array输出</td></tr><tr><td>WriteNonStringKeyAsString</td><td>不是String的字段写为String</td></tr><tr><td>NotWriteDefaultValue</td><td>不设默认值</td></tr><tr><td>BrowserSecure</td><td></td></tr><tr><td>IgnoreNonFieldGetter</td><td>忽略没有getter方法的属性</td></tr><tr><td>WriteEnumUsingName</td><td>目前版本的fastjson默认对enum对象使用WriteEnumUsingName属性，因此会将enum值序列化为其Name。 使用WriteEnumUsingToString方法可以序列化时将Enum转换为toString()的返回值；同时override toString函数能够将enum值输出需要的形式。但是这样做会带来一个问题，对应的反序列化使用的Enum的静态方法valueof可能无法识别自行生成的toString()，导致反序列化出错。 如果将节省enum序列化后的大小，可以将enum序列化其ordinal值，保存为int类型。fastJson在反序列化时，如果值为int，则能够使用ordinal值匹配，找到合适的对象。 fastjson要将enum序列化为ordinal只需要禁止WriteEnumUsingName feature。 首先根据默认的features排除WriteEnumUsingName,然后使用新的features序列化即可。</td></tr></tbody></table>`,6)]))}const o=n(p,[["render",i],["__file","32-Fastjson.html.vue"]]),d=JSON.parse('{"path":"/docs/java/32-Fastjson.html","title":"Fastjson","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"序列化配置","slug":"序列化配置","link":"#序列化配置","children":[]}],"git":{"updatedTime":1740890627000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":1}]},"filePathRelative":"docs/java/32-Fastjson.md"}');export{o as comp,d as data};
