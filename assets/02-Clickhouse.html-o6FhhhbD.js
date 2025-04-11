import{_ as l,c as o,a as n,b as s,w as d,d as i,r as p,o as r,e}from"./app-DJm-wWA8.js";const c={},u={class:"table-of-contents"};function g(m,t){const a=p("router-link");return r(),o("div",null,[t[3]||(t[3]=n("h1",{id:"clickhouse",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#clickhouse"},[n("span",null,"Clickhouse")])],-1)),t[4]||(t[4]=n("p",null,[n("strong",null,"目录")],-1)),n("nav",u,[n("ul",null,[n("li",null,[s(a,{to:"#类型对照"},{default:d(()=>t[0]||(t[0]=[e("类型对照")])),_:1})]),n("li",null,[s(a,{to:"#常见问题"},{default:d(()=>t[1]||(t[1]=[e("常见问题")])),_:1}),n("ul",null,[n("li",null,[s(a,{to:"#q1-java-sql-sqlfeaturenotsupportedexception-transactions-are-not-supported"},{default:d(()=>t[2]||(t[2]=[e("Q1.java.sql.SQLFeatureNotSupportedException: Transactions are not supported")])),_:1})])])])])]),t[5]||(t[5]=i(`<h2 id="类型对照" tabindex="-1"><a class="header-anchor" href="#类型对照"><span>类型对照</span></a></h2><table><thead><tr><th><strong>Java</strong></th><th><strong>MySql</strong></th><th><strong>ClickHouse</strong></th><th><strong>Oracle</strong></th><th><strong>Hive</strong></th><th><strong>Flink Sql</strong></th></tr></thead><tbody><tr><td>boolean</td><td>boolean tinyint(1)</td><td>UInt8</td><td>NUMBER(1)</td><td>boolean</td><td>BOOLEAN</td></tr><tr><td>byte</td><td>tinyint</td><td>Int8</td><td>NUMBER(3,0)</td><td>tinyint</td><td>TINYINT</td></tr><tr><td>short</td><td>smallint tinyint unsigned</td><td>Int16 uint8</td><td>NUMBER(5,0)</td><td>smallint</td><td>SMALLINT</td></tr><tr><td>int</td><td>int mediumint smallint unsigned mediumint unsigned</td><td>Int32 uint16</td><td>NUMBER(10,0)</td><td>int</td><td>INT</td></tr><tr><td>long</td><td>bigint int unsigned</td><td>Int64 UInt32 Int128 Int256 uInt64 uInt128 uInt256</td><td>NUMBER(20,0)</td><td>bigint</td><td>BIGINT</td></tr><tr><td>float</td><td>float</td><td>Float32</td><td>BINARY_FLOAT</td><td>float</td><td>FLOAT</td></tr><tr><td>double</td><td>double</td><td>Float64</td><td>BINARY_DOUBLE</td><td>double</td><td>DOUBLE</td></tr><tr><td>String</td><td>varchar char text tinytext mediumtext longtext</td><td>String uuid fixedString</td><td>VARCHAR2 NVARCHAR2 CHAR NCHAR LONG</td><td>string</td><td>STRING VARCHAR</td></tr><tr><td>decimal</td><td>decimal numeric precision</td><td>Decimal</td><td>NUMBER FLOAT</td><td></td><td>DECIMAL</td></tr><tr><td>date</td><td>date year</td><td>Date</td><td></td><td></td><td>DATE</td></tr><tr><td>time</td><td>time</td><td></td><td></td><td></td><td>TIME(0)</td></tr><tr><td>timestamp</td><td>timestamp datetime</td><td>datetime64</td><td>date</td><td>timestamp</td><td>TIMESTAMP</td></tr><tr><td>byte[]</td><td>blob binary varbinary tinyblob mediumblob longblob</td><td></td><td>RAW</td><td></td><td>BYTES</td></tr></tbody></table><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><h3 id="q1-java-sql-sqlfeaturenotsupportedexception-transactions-are-not-supported" tabindex="-1"><a class="header-anchor" href="#q1-java-sql-sqlfeaturenotsupportedexception-transactions-are-not-supported"><span>Q1.java.sql.SQLFeatureNotSupportedException: Transactions are not supported</span></a></h3><p>一般都是clickhouse驱动版本的问题，要么使用版本高了，要么低了</p><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>ru.yandex.clickhouse<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>clickhouse-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>0.2.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6))])}const k=l(c,[["render",g],["__file","02-Clickhouse.html.vue"]]),b=JSON.parse('{"path":"/docs/database/02-Clickhouse.html","title":"Clickhouse","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"类型对照","slug":"类型对照","link":"#类型对照","children":[]},{"level":2,"title":"常见问题","slug":"常见问题","link":"#常见问题","children":[{"level":3,"title":"Q1.java.sql.SQLFeatureNotSupportedException: Transactions are not supported","slug":"q1-java-sql-sqlfeaturenotsupportedexception-transactions-are-not-supported","link":"#q1-java-sql-sqlfeaturenotsupportedexception-transactions-are-not-supported","children":[]}]}],"git":{"updatedTime":1734338014000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":1}]},"filePathRelative":"docs/database/02-Clickhouse.md"}');export{k as comp,b as data};
