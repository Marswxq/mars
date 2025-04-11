import{_ as t,c as o,a as s,b as e,w as p,d as i,r as c,o as u,e as l}from"./app-DJm-wWA8.js";const r={},d={class:"table-of-contents"};function k(v,n){const a=c("router-link");return u(),o("div",null,[n[7]||(n[7]=s("h1",{id:"mybatis-plus",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#mybatis-plus"},[s("span",null,"Mybatis-Plus")])],-1)),n[8]||(n[8]=s("p",null,[s("strong",null,"目录")],-1)),s("nav",d,[s("ul",null,[s("li",null,[e(a,{to:"#控制台sql"},{default:p(()=>n[0]||(n[0]=[l("控制台SQL")])),_:1}),s("ul",null,[s("li",null,[e(a,{to:"#开启打印"},{default:p(()=>n[1]||(n[1]=[l("开启打印")])),_:1})]),s("li",null,[e(a,{to:"#关闭打印"},{default:p(()=>n[2]||(n[2]=[l("关闭打印")])),_:1})])])]),s("li",null,[e(a,{to:"#entity类型转换"},{default:p(()=>n[3]||(n[3]=[l("Entity类型转换")])),_:1}),s("ul",null,[s("li",null,[e(a,{to:"#table"},{default:p(()=>n[4]||(n[4]=[l("table")])),_:1})]),s("li",null,[e(a,{to:"#totypehandler"},{default:p(()=>n[5]||(n[5]=[l("ToTypeHandler")])),_:1})]),s("li",null,[e(a,{to:"#entity"},{default:p(()=>n[6]||(n[6]=[l("entity")])),_:1})])])])])]),n[9]||(n[9]=i(`<h2 id="控制台sql" tabindex="-1"><a class="header-anchor" href="#控制台sql"><span>控制台SQL</span></a></h2><h3 id="开启打印" tabindex="-1"><a class="header-anchor" href="#开启打印"><span>开启打印</span></a></h3><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">mybatis-plus</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token key attr-name">  configuration</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token key attr-name">    log-impl</span><span class="token punctuation">:</span> <span class="token value attr-value">org.apache.ibatis.logging.stdout.StdOutImpl</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关闭打印" tabindex="-1"><a class="header-anchor" href="#关闭打印"><span>关闭打印</span></a></h3><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties" data-title="properties"><pre><code><span class="line"><span class="token key attr-name">mybatis-plus</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token key attr-name">  configuration</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token key attr-name">    log-impl</span><span class="token punctuation">:</span> <span class="token value attr-value">org.apache.ibatis.logging.nologging.NoLoggingImpl</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="entity类型转换" tabindex="-1"><a class="header-anchor" href="#entity类型转换"><span>Entity类型转换</span></a></h2><h3 id="table" tabindex="-1"><a class="header-anchor" href="#table"><span>table</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">create</span> <span class="token keyword">table</span> type_handler</span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    id          <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span>  <span class="token operator">not</span> <span class="token boolean">null</span></span>
<span class="line">        <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">,</span></span>
<span class="line">    type_name   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    type_code   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span>  <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    type_arr    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    type_json   json         <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    type_list   <span class="token keyword">longtext</span>     <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    vali_flag   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>   <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    remark      <span class="token keyword">text</span>         <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    create_time <span class="token keyword">datetime</span>     <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    creator     <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    update_time <span class="token keyword">datetime</span>     <span class="token boolean">null</span><span class="token punctuation">,</span></span>
<span class="line">    opreator    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token boolean">null</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="totypehandler" tabindex="-1"><a class="header-anchor" href="#totypehandler"><span>ToTypeHandler</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ToTypeHandler</span> <span class="token keyword">extends</span> <span class="token class-name">JacksonTypeHandler</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">ToTypeHandler</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">super</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">TypeReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">TypeHandlerTo</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JsonProcessingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="entity" tabindex="-1"><a class="header-anchor" href="#entity"><span>entity</span></a></h3><p><strong>注意：</strong></p><ul><li>实体类@TableName注解添加<code>autoResultMap = true</code></li><li>属性 @TableField注解指定<code>typeHandler = ToTypeHandler.class</code> , 默认类型指定<code>typeHandler = JacksonTypeHandler.class</code></li></ul><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Data</span></span>
<span class="line"><span class="token annotation punctuation">@EqualsAndHashCode</span><span class="token punctuation">(</span>callSuper <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation punctuation">@TableName</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;type_handler&quot;</span><span class="token punctuation">,</span> autoResultMap <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TypeHandlerEntity</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractEntity</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">7265137797452149819L</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">IdType</span><span class="token punctuation">.</span><span class="token constant">ASSIGN_ID</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> typeName<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> typeCode<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>typeHandler <span class="token operator">=</span> <span class="token class-name">JacksonTypeHandler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> typeArr<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>typeHandler <span class="token operator">=</span> <span class="token class-name">JacksonTypeHandler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> typeJson<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>typeHandler <span class="token operator">=</span> <span class="token class-name">ToTypeHandler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TypeHandlerTo</span><span class="token punctuation">&gt;</span></span> typeList<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14))])}const b=t(r,[["render",k],["__file","18-MybatisPlus.html.vue"]]),y=JSON.parse('{"path":"/docs/java/18-MybatisPlus.html","title":"Mybatis-Plus","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"控制台SQL","slug":"控制台sql","link":"#控制台sql","children":[{"level":3,"title":"开启打印","slug":"开启打印","link":"#开启打印","children":[]},{"level":3,"title":"关闭打印","slug":"关闭打印","link":"#关闭打印","children":[]}]},{"level":2,"title":"Entity类型转换","slug":"entity类型转换","link":"#entity类型转换","children":[{"level":3,"title":"table","slug":"table","link":"#table","children":[]},{"level":3,"title":"ToTypeHandler","slug":"totypehandler","link":"#totypehandler","children":[]},{"level":3,"title":"entity","slug":"entity","link":"#entity","children":[]}]}],"git":{"updatedTime":1734338014000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":1}]},"filePathRelative":"docs/java/18-MybatisPlus.md"}');export{b as comp,y as data};
