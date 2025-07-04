# JasperReport 常见问题

## Q1.Handler dispatch failed; nested exception is java.lang.NoClassDefFoundError: Could not initialize class net.sf.jasperreports.engine.util.JRStyledTextParser

### Quession

本地环境预览、打印 Jasper 都没有问题，但是服务器上打印会报错，详细异常堆栈如下

```java
Caused by: org.springframework.web.util.NestedServletException: Handler dispatch failed; nested exception is java.lang.NoClassDefFoundError: Could not initialize class net.sf.jasperreports.engine.util.JRStyledTextParser
    at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:982)
    ... 116 common frames omitted
Caused by: java.lang.NoClassDefFoundError: Could not initialize class net.sf.jasperreports.engine.util.JRStyledTextParser
    at net.sf.jasperreports.engine.fill.JRBaseFiller.<init>(JRBaseFiller.java:116)
    at net.sf.jasperreports.engine.fill.JRVerticalFiller.<init>(JRVerticalFiller.java:79)
    at net.sf.jasperreports.engine.fill.JRFiller.createBandReportFiller(JRFiller.java:251)
    at net.sf.jasperreports.engine.fill.JRFiller.createReportFiller(JRFiller.java:272)
    at net.sf.jasperreports.engine.fill.JRFiller.fill(JRFiller.java:156)
    at net.sf.jasperreports.engine.fill.JRFiller.fill(JRFiller.java:145)
    at net.sf.jasperreports.engine.JasperFillManager.fill(JasperFillManager.java:758)
    at net.sf.jasperreports.engine.JasperFillManager.fillReport(JasperFillManager.java:1074)
       ………………………………
    at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:205)
    at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:133)
    at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:97)
    at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:849)
    at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:760)
    at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:85)
    at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:967)
    ... 116 common frames omitted
```

### Answer

问题原因是因为服务器操作系统（一般是 linux
环境），没有安装中文字体库，具体安装方式可以参考[安装字体库](../docker/07-Docker应用用汇总.md#安装字体库)（如果是非 docker
下安装，去掉 `RUN` 即可）。

## Q2.net.sf.jasperreports.engine.util.JRFontNotFoundException: Font "宋体" is not available to the JVM. See the Javadoc for more details.

### Quession

```java
net.sf.jasperreports.engine.util.JRFontNotFoundException: Font "宋体" is not available to the JVM. See the Javadoc for more details.
	at net.sf.jasperreports.engine.fonts.FontUtil.checkAwtFont(FontUtil.java:603) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.SimpleTextLineWrapper.loadFont(SimpleTextLineWrapper.java:384) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.SimpleTextLineWrapper.getGeneralFontInfo(SimpleTextLineWrapper.java:354) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.SimpleTextLineWrapper.createFontInfo(SimpleTextLineWrapper.java:294) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.SimpleTextLineWrapper.start(SimpleTextLineWrapper.java:256) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.TextMeasurer.measure(TextMeasurer.java:555) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRFillTextElement.chopTextElement(JRFillTextElement.java:654) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRFillStaticText.prepare(JRFillStaticText.java:179) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRFillElementContainer.prepareElements(JRFillElementContainer.java:542) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRFillBand.fill(JRFillBand.java:453) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRFillBand.fill(JRFillBand.java:428) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRVerticalFiller.fillColumnBand(JRVerticalFiller.java:2615) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRVerticalFiller.fillDetail(JRVerticalFiller.java:836) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRVerticalFiller.fillReportStart(JRVerticalFiller.java:275) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRVerticalFiller.fillReport(JRVerticalFiller.java:119) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRBaseFiller.fill(JRBaseFiller.java:622) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.BaseReportFiller.fill(BaseReportFiller.java:414) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRFiller.fill(JRFiller.java:120) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.fill.JRFiller.fill(JRFiller.java:103) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.JasperFillManager.fill(JasperFillManager.java:530) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	at net.sf.jasperreports.engine.JasperFillManager.fillReport(JasperFillManager.java:954) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
	…………………………………………………………
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[?:1.8.0_212]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[?:1.8.0_212]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[?:1.8.0_212]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[?:1.8.0_212]	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:190) ~[spring-web-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:138) ~[spring-web-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:105) ~[spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:878) ~[spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:792) ~[spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1040) [spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:943) [spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006) [spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:909) [spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:652) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883) [spring-webmvc-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:733) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:227) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53) [tomcat-embed-websocket-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) [tomcat-embed-core-9.0.46.jar!/:?]
	at brave.servlet.TracingFilter.doFilter(TracingFilter.java:68) [brave-instrumentation-servlet-5.12.7.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) [spring-web-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119) [spring-web-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) [spring-web-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119) [spring-web-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) [tomcat-embed-core-9.0.46.jar!/:?]
	at brave.servlet.TracingFilter.doFilter(TracingFilter.java:87) [brave-instrumentation-servlet-5.12.7.jar!/:?]
	at org.springframework.cloud.sleuth.instrument.web.LazyTracingFilter.doFilter(TraceWebServletAutoConfiguration.java:141) [spring-cloud-sleuth-core-2.2.8.RELEASE.jar!/:2.2.8.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) [spring-web-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119) [spring-web-5.2.15.RELEASE.jar!/:5.2.15.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:202) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:97) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:542) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:143) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:78) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:357) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:374) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:893) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1707) [tomcat-embed-core-9.0.46.jar!/:?]
	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-embed-core-9.0.46.jar!/:?]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149) [?:1.8.0_212]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624) [?:1.8.0_212]
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-embed-core-9.0.46.jar!/:?]
	at java.lang.Thread.run(Thread.java:748) [?:1.8.0_212]
```

### Answer

> 网上好多说在`jasperreports.properties`中添加`net.sf.jasperreports.awt.ignore.missing.font=true`，个人感觉没有解决问题。

我的问题其实挺简单的，我在工程 resource 下放的字体库是 simsun.ttc ，经过一系列的折腾，我发现 Jasper 不支持 ttc （和 linux
操作系统不一样，感觉操作系统支持 ttc），导致 jvm 没有加载上字体。

解决方案：
在 C:\Windows\Fonts 下找到 simsun.ttc ， 随便找个在线 ttc 转 ttf 的工具，将转换好的 ttc 重新配置在 fronts.xml 中。

Tips:

1. [JasperReport中心显示参考](./02-JasperReport集成.md#中文显示)
2. ttc 感觉是一个 ttf 的集合，apache jasper 需要使用 ttf 字体（这个我没有证据，只是根据折腾的结果感觉是这样）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<fontFamilies>
    <fontFamily name="华文宋体">
        <normal>static/font/STSONG.TTF</normal>
        <bold>static/font/STSONG.TTF</bold>
        <italic>static/font/STSONG.TTF</italic>
        <boldItalic>static/font/STSONG.TTF</boldItalic>
        <pdfEncoding>Identity-H</pdfEncoding>
        <pdfEmbedded>true</pdfEmbedded>
        <exportFonts>
            <export key="net.sf.jasperreports.html">'华文宋体', Arial, Helvetica, sans-serif</export>
            <export key="net.sf.jasperreports.xhtml">'华文宋体', Arial, Helvetica, sans-serif</export>
        </exportFonts>
    </fontFamily>

    <fontFamily name="宋体">
        <normal>static/font/SimSun-01.ttf</normal>
        <bold>static/font/SimSun-01.ttf</bold>
        <italic>static/font/SimSun-01.ttf</italic>
        <boldItalic>static/font/SimSun-01.ttf</boldItalic>
        <pdfEncoding>Identity-H</pdfEncoding>
        <pdfEmbedded>true</pdfEmbedded>
    </fontFamily>

    <fontFamily name="新宋体">
        <normal>static/font/SimSun-01.ttf</normal>
        <bold>static/font/SimSun-01.ttf</bold>
        <italic>static/font/SimSun-01.ttf</italic>
        <boldItalic>static/font/SimSun-01.ttf</boldItalic>
        <pdfEncoding>Identity-H</pdfEncoding>
        <pdfEmbedded>true</pdfEmbedded>
    </fontFamily>

    <fontFamily name="华文中宋">
        <normal>static/font/SimSun-01.ttf</normal>
        <bold>static/font/SimSun-01.ttf</bold>
        <italic>static/font/SimSun-01.ttf</italic>
        <boldItalic>static/font/SimSun-01.ttf</boldItalic>
        <pdfEncoding>Identity-H</pdfEncoding>
        <pdfEmbedded>true</pdfEmbedded>
    </fontFamily>

    <fontFamily name="华文仿宋">
        <normal>static/font/SimSun-01.ttf</normal>
        <bold>static/font/SimSun-01.ttf</bold>
        <italic>static/font/SimSun-01.ttf</italic>
        <boldItalic>static/font/SimSun-01.ttf</boldItalic>
        <pdfEncoding>Identity-H</pdfEncoding>
        <pdfEmbedded>true</pdfEmbedded>
    </fontFamily>

    <fontFamily name="仿宋">
        <normal>static/font/SimSun-01.ttf</normal>
        <bold>static/font/SimSun-01.ttf</bold>
        <italic>static/font/SimSun-01.ttf</italic>
        <boldItalic>static/font/SimSun-01.ttf</boldItalic>
        <pdfEncoding>Identity-H</pdfEncoding>
        <pdfEmbedded>true</pdfEmbedded>
    </fontFamily>

    <fontFamily name="黑体">
        <normal>static/font/msyh.ttf</normal>
        <bold>static/font/msyh.ttf</bold>
        <italic>static/font/msyh.ttf</italic>
        <boldItalic>static/font/msyh.ttf</boldItalic>
        <pdfEncoding>Identity-H</pdfEncoding>
        <pdfEmbedded>true</pdfEmbedded>
    </fontFamily>

    <fontFamily name="微软雅黑">
        <normal>static/font/msyh.ttf</normal>
        <bold>static/font/msyh.ttf</bold>
        <italic>static/font/msyh.ttf</italic>
        <boldItalic>static/font/msyh.ttf</boldItalic>
        <pdfEncoding>Identity-H</pdfEncoding>
        <pdfEmbedded>true</pdfEmbedded>
    </fontFamily>
</fontFamilies>
```


