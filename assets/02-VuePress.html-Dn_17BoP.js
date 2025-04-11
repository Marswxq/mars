import{_ as s,c as n,d as t,o as p}from"./app-DJm-wWA8.js";const e={};function l(c,a){return p(),n("div",null,a[0]||(a[0]=[t(`<h1 id="vuepress" tabindex="-1"><a class="header-anchor" href="#vuepress"><span>VuePress</span></a></h1><h2 id="pwd-插件" tabindex="-1"><a class="header-anchor" href="#pwd-插件"><span>PWD 插件</span></a></h2><p>国内连接不上google workbox服务器，改用阿里云代理，修改 service-worker.js 文件</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token function">importScripts</span><span class="token punctuation">(</span><span class="token string">&#39;https://g.alicdn.com/kg/workbox/4.3.1/workbox-sw.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">workbox<span class="token punctuation">.</span><span class="token function">setConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">modulePathPrefix</span><span class="token operator">:</span> <span class="token string">&#39;https://g.alicdn.com/kg/workbox/4.3.1/&#39;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置markdown表格宽度" tabindex="-1"><a class="header-anchor" href="#设置markdown表格宽度"><span>设置markdown表格宽度</span></a></h2><p>通过<code>&lt;div style=&quot;width: 100pt&quot;&gt;&lt;/div&gt;</code>设置宽度</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line"></span>
<span class="line"><span class="token table"><span class="token table-header-row"><span class="token punctuation">|</span><span class="token table-header important"> 参数名称                                            </span><span class="token punctuation">|</span><span class="token table-header important"> 含义                                    </span><span class="token punctuation">|</span><span class="token table-header important"> 默认值             </span><span class="token punctuation">|</span><span class="token table-header important"> 说明                                                                                                                                                                                                                                                                                                              </span><span class="token punctuation">|</span></span>
<span class="line"></span><span class="token table-line"><span class="token punctuation">|</span><span class="token punctuation">-------------------------------------------------</span><span class="token punctuation">|</span><span class="token punctuation">---------------------------------------</span><span class="token punctuation">|</span><span class="token punctuation">-----------------</span><span class="token punctuation">|</span><span class="token punctuation">-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span><span class="token punctuation">|</span></span>
<span class="line"></span><span class="token table-data-rows"><span class="token punctuation">|</span><span class="token table-data"> -Xms                                            </span><span class="token punctuation">|</span><span class="token table-data"> 初始堆大小                                 </span><span class="token punctuation">|</span><span class="token table-data"> 物理内存的1/64(&lt;1GB) </span><span class="token punctuation">|</span><span class="token table-data"> 默认(MinHeapFreeRatio参数可以调整)空余堆内存小于40%时，JVM就会增大堆直到-Xmx的最大限制                                                                                                                                                                                                                                                       </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> -Xmx                                            </span><span class="token punctuation">|</span><span class="token table-data"> 最大堆大小                                 </span><span class="token punctuation">|</span><span class="token table-data"> 物理内存的1/4(&lt;1GB)  </span><span class="token punctuation">|</span><span class="token table-data"> 默认(MaxHeapFreeRatio参数可以调整)空余堆内存大于70%时，JVM会减少堆直到-Xms的最小限制                                                                                                                                                                                                                                                        </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> -Xmn                                            </span><span class="token punctuation">|</span><span class="token table-data"> 年轻代大小(1.4or lator)                    </span><span class="token punctuation">|</span><span class="token table-data"> 整个堆的3/8         </span><span class="token punctuation">|</span><span class="token table-data"> 注意：此处的大小是（eden + 2 survivor space + 2 survivor space）的值。与jmap -heap中显示的New gen是不同的。整个堆大小=年轻代大小 + 年老代大小 + 持久代大小。持久代一般固定大小为64m，所以增大年轻代后，将会减小年老代大小。此值对系统性能影响较大，Sun官方推荐配置为整个堆的3/8                                                                                                                                   </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> -XX:PermSize                                    </span><span class="token punctuation">|</span><span class="token table-data"> 设置持久代(perm gen)初始值                    </span><span class="token punctuation">|</span><span class="token table-data"> 物理内存的1/64       </span><span class="token punctuation">|</span><span class="token table-data"> java8取消该参数                                                                                                                                                                                                                                                                                                      </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 100pt</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>-XX:MaxPermSize<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span> </span><span class="token punctuation">|</span><span class="token table-data"> 设置持久代最大值                              </span><span class="token punctuation">|</span><span class="token table-data"> 物理内存的1/4        </span><span class="token punctuation">|</span><span class="token table-data"> java8取消该参数                                                                                                                                                                                                                                                                                                      </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> -Xss                                            </span><span class="token punctuation">|</span><span class="token table-data"> 每个线程的堆栈大小                             </span><span class="token punctuation">|</span><span class="token table-data">                 </span><span class="token punctuation">|</span><span class="token table-data"> JDK5.0以后每个线程堆栈大小为1M,以前每个线程堆栈大小为256K.更具应用的线程所需内存大小进行 调整.在相同物理内存下,减小这个值能生成更多的线程.但是操作系统对一个进程内的线程数还是有限制的,不能无限生成,经验值在3000~5000左右一般小的应用， 如果栈不是很深， 应该是128k够用的 大的应用建议使用256k。这个选项对性能影响比较大，需要严格的测试。（校长）和threadstacksize选项解释很类似,官方文档似乎没有解释,在论坛中有这样一句话:&quot;”-Xss is translated in a VM flag named ThreadStackSize”一般设置这个值就可以了。 </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> -XX:NewSize                                     </span><span class="token punctuation">|</span><span class="token table-data"> 设置年轻代大小(for 1.3/1.4)                  </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> -XX:MaxNewSize                                  </span><span class="token punctuation">|</span><span class="token table-data"> 年轻代最大值(for 1.3/1.4)                   </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> -XX:NewRatio                                    </span><span class="token punctuation">|</span><span class="token table-data"> 年轻代(包括Eden和两个Survivor区)与年老代的比值(除去持久代) </span><span class="token punctuation">|</span><span class="token table-data">                 </span><span class="token punctuation">|</span><span class="token table-data"> -XX:NewRatio=4表示年轻代与年老代所占比值为1:4,年轻代占整个堆栈的1/5Xms=Xmx并且设置了Xmn的情况下，该参数不需要进行设置。                                                                                                                                                                                                                                     </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> -XX:SurvivorRatio                               </span><span class="token punctuation">|</span><span class="token table-data"> Eden区与Survivor区的大小比值                  </span><span class="token punctuation">|</span><span class="token table-data">                 </span><span class="token punctuation">|</span><span class="token table-data"> 设置为8,则两个Survivor区与一个Eden区的比值为2:8,一个Survivor区占整个年轻代的1/10                                                                                                                                                                                                                                                         </span><span class="token punctuation">|</span></span>
<span class="line"></span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="github-pages" tabindex="-1"><a class="header-anchor" href="#github-pages"><span>GitHub Pages</span></a></h2>`,8)]))}const i=s(e,[["render",l],["__file","02-VuePress.html.vue"]]),u=JSON.parse('{"path":"/docs/javascript/02-VuePress.html","title":"VuePress","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"PWD 插件","slug":"pwd-插件","link":"#pwd-插件","children":[]},{"level":2,"title":"设置markdown表格宽度","slug":"设置markdown表格宽度","link":"#设置markdown表格宽度","children":[]},{"level":2,"title":"GitHub Pages","slug":"github-pages","link":"#github-pages","children":[]}],"git":{"updatedTime":1734508784000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":2}]},"filePathRelative":"docs/javascript/02-VuePress.md"}');export{i as comp,u as data};
