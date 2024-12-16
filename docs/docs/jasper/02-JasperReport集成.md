# JasperReport 集成

**目录**

[[toc]]

## 依赖

版本根据springboot版本决定

```xml

<dependency>
    <groupId>net.sf.jasperreports</groupId>
    <artifactId>jasperreports</artifactId>
</dependency>
```

## 配置类

```java
@Slf4j
@Configuration
public class JasperReportConfig {

    @Value("${mars.report.pdf.path:}")
    private String pdfPath;

    public static String PDF_PATH;

    public static DataSource DATA_SOURCE;

    public JasperReportConfig(DataSource dataSource) {
        if (StrUtil.isBlank(pdfPath)) {
            this.pdfPath = System.getProperty("user.home");
        }
        PDF_PATH = pdfPath;
        DATA_SOURCE = dataSource;
        log.info(">>>>>> 加载报表pdfPath: {}", pdfPath);
    }

}
```

## 工具类

```java
@Slf4j
public class JasperReportUtil {

    private static final String PDF_EXPORT_PATH = "%s/%s.pdf";

    /**
     * 生成pdf报表
     *
     * @param reportInputStream 报表（.jrxml）
     * @param parameters        报表参数
     * @return pdf路径
     */
    public static String generatePdf(InputStream reportInputStream, Map<String, Object> parameters) {
        if (reportInputStream == null) {
            throw new BusinessException("报表模板不能为空");
        }
        try(Connection connection = getConnection()) {
            JasperReport jasperReport = JasperCompileManager.compileReport(reportInputStream);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, connection);
            String filePath = String.format(PDF_EXPORT_PATH, JasperReportConfig.PDF_PATH, JasperReportUtil.buildFileName(jasperReport.getName()));
            JasperExportManager.exportReportToPdfFile(jasperPrint, filePath);
            return filePath;
        } catch (JRException | SQLException e) {
            log.error("生成pdf报表失败", e);
            throw new BusinessException(e.getMessage());
        }
    }

    public static void printPdf(InputStream reportInputStream, Map<String, Object> parameters, HttpServletResponse response) {
        if (reportInputStream == null) {
            throw new BusinessException("报表模板不能为空");
        }
        OutputStream out = null;
        try (Connection connection = getConnection()){
            JasperReport jasperReport = JasperCompileManager.compileReport(reportInputStream);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, connection);
            //以附件形式保存文件
            String generateFileName = jasperReport.getName() + ".pdf";
            //设置http的文件类型及编码方式
            response.setContentType("application/pdf;charset=utf-8");
            //设置下载的文件名称 名称含有中文的话需要用URLEncoder进行编码
            response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(generateFileName, "utf-8"));
            out = response.getOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, out);

        } catch (JRException e) {
            log.error("生成pdf报表失败", e);
            throw new BusinessException(e.getMessage());
        } catch (IOException | SQLException e) {
            throw new BusinessException(e);
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    log.error("生成pdf关闭流错误", e);
                }
            }
        }
    }

    public static void printXlsx(InputStream reportInputStream, Map<String, Object> parameters, HttpServletResponse response) {
        if (reportInputStream == null) {
            throw new BusinessException("报表模板不能为空");
        }
        OutputStream out = null;
        try (Connection connection = getConnection()){
            JasperReport jasperReport = JasperCompileManager.compileReport(reportInputStream);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, connection);
            //以附件形式保存文件
            String generateFileName = jasperReport.getName() + ".xlsx";
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-disposition", "attachment; filename="
                    + URLEncoder.encode(generateFileName, "utf8"));

            SimpleXlsxReportConfiguration conf = new SimpleXlsxReportConfiguration();
            conf.setWhitePageBackground(false);
            conf.setDetectCellType(true);

            JRXlsxExporter exporter = new JRXlsxExporter();
            exporter.setConfiguration(conf);
            //设置输入项
            ExporterInput exporterInput = new SimpleExporterInput(jasperPrint);
            exporter.setExporterInput(exporterInput);
            //设置输出项
            out = response.getOutputStream();
            OutputStreamExporterOutput exporterOutput = new SimpleOutputStreamExporterOutput(out);
            exporter.setExporterOutput(exporterOutput);

            exporter.exportReport();
        } catch (IOException | JRException e) {
            log.error("生成excel报表失败", e);
            throw new BusinessException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    log.error("生成excel关闭流错误", e);
                }
            }
        }
    }

    private static String buildFileName(String fileName) {
        // yyyyMMddHHmmssSSS 暂时认为时间到毫秒，文件不会重复
        return fileName + DateUtil.format(DateUtil.dateSecond(), DatePattern.PURE_DATETIME_MS_PATTERN);
    }

    private static Connection getConnection() {
        DataSource dataSource = JasperReportConfig.DATA_SOURCE;
        if (dataSource == null) {
            throw new BusinessException("获取报表数据源失败，数据源为空");
        }
        try {
            Connection connection = dataSource.getConnection();
            if (connection == null) {
                throw new BusinessException("获取报表数据库连接失败,数据库连接为空");
            }
            return connection;
        } catch (SQLException e) {
            throw new BusinessException("获取报表数据库连接失败", e);
        }
    }
```

## 中文显示

1. 在 resources 下创建jasperreports_extension.properties，内容如下

```properties
net.sf.jasperreports.extension.registry.factory.simple.font.families=net.sf.jasperreports.engine.fonts.SimpleFontExtensionsRegistryFactory
net.sf.jasperreports.extension.simple.font.families.lobstertwo=static/font/fonts.xml
```

2. 在 resources 下创建 static/front 文件夹

3. 在 font 下创建 fronts.xml，内容如下

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

4. 在 front 下存放放 ttf 字体

<img :src="$withBase('/images/jasper/中文显示.png')" alt="中文显示">

## Connection引发的血案

由于jasper官方提供的api需要指定`Connection`，所以想当然的`DataSource.getConnection()`
，刚才开测试报表正常，但是过段时间发现报表无法打印，并且服务开始报错，异常信息如下:

```log
java.lang.NullPointerException: null
        at com.mysql.jdbc.ConnectionImpl.getServerVersion(ConnectionImpl.java:3312) ~[mysql-connector-java-5.1.25.jar!/:?]
        at com.mysql.jdbc.DatabaseMetaData.getDatabaseProductVersion(DatabaseMetaData.java:3015) ~[mysql-connector-java-5.1.25.jar!/:?]
        at com.mchange.v2.c3p0.impl.NewProxyDatabaseMetaData.getDatabaseProductVersion(NewProxyDatabaseMetaData.java:356) ~[c3p0-0.9.5.2.jar!/:0.9.5.2]
        at net.sf.jasperreports.engine.query.JRJdbcQueryExecuter.<init>(JRJdbcQueryExecuter.java:155) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.query.JRJdbcQueryExecuterFactory.createQueryExecuter(JRJdbcQueryExecuterFactory.java:219) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.query.QueryExecuterFactory.createQueryExecuter(QueryExecuterFactory.java:109) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.fill.JRFillDataset.createQueryDatasource(JRFillDataset.java:1260) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.fill.JRFillDataset.initDatasource(JRFillDataset.java:732) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.fill.BaseReportFiller.setParameters(BaseReportFiller.java:457) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.fill.JRBaseFiller.fill(JRBaseFiller.java:585) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.fill.BaseReportFiller.fill(BaseReportFiller.java:414) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.fill.JRFiller.fill(JRFiller.java:120) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.fill.JRFiller.fill(JRFiller.java:103) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.JasperFillManager.fill(JasperFillManager.java:530) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
        at net.sf.jasperreports.engine.JasperFillManager.fillReport(JasperFillManager.java:954) ~[jasperreports-6.17.0.jar!/:6.17.0-6d93193241dd8cc42629e188b94f9e0bc5722efd]
```

结合异常堆栈，很明显是没有连上数据库。但是服务开始好用，为什么突然不好用了？

经过一系列的排查：不是驱动->不是mysql连接数、线程池、进程数->what's the fk?

突然想到`Datasoure`连接池不可能为空，那么`Connection`怎么可能连不上了呢，难道说...空了？

fk，`Datasoure`有个东西叫做最大空闲时长，如果超过这个时长。。。。

好吧，以后每次`DataSource.getConnection()`，剩下的交给`Datasoure`管理。

