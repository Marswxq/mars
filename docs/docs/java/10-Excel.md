# Excel

**目录**

[[toc]]

## EasyExcel

>   EasyExcel是一个基于Java的简单、省内存的读写Excel的开源项目。在尽可能节约内存的情况下支持读写百M的Excel。

[官方文档](https://easyexcel.opensource.alibaba.com/docs/current/)
### POM依赖

```XML
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>2.2.10</version>
</dependency>
```

注意：POI版本需要和EasyExcel中jar版本对应

```xml

<dependencys>
    <!-- xls格式excel依赖包 -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>3.17</version>
    </dependency>
    <!--xlsx格式excel依赖包-->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>3.17</version>
    </dependency>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml-schemas</artifactId>
        <version>3.17</version>
    </dependency>
    <dependency>
        <groupId>cglib</groupId>
        <artifactId>cglib</artifactId>
        <version>3.1</version>
    </dependency>
    <!-- easyexcel依赖包 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>easyexcel</artifactId>
        <version>2.2.10</version>
    </dependency>
</dependencys>
```

### 读Excel

```Java
/**
 * 最简单的读
 * <p>1. 创建excel对应的实体对象 参照{@link DemoData}
 * <p>2. 由于默认一行行的读取excel，所以需要创建excel一行一行的回调监听器，参照{@link DemoDataListener}
 * <p>3. 直接读即可
 */
@Test
public void simpleRead() {
    String fileName = TestFileUtil.getPath() + "demo" + File.separator + "demo.xlsx";
    // 这里 需要指定读用哪个class去读，然后读取第一个sheet 文件流会自动关闭
    EasyExcel.read(fileName, DemoData.class, new DemoDataListener()).sheet().doRead();
}
```

### 写Excel

```Java
/**
 * 最简单的写
 * <p>1. 创建excel对应的实体对象 参照{@link com.alibaba.easyexcel.test.demo.write.DemoData}
 * <p>2. 直接写即可
 */
@Test
public void simpleWrite() {
    String fileName = TestFileUtil.getPath() + "write" + System.currentTimeMillis() + ".xlsx";
    // 这里 需要指定写用哪个class去读，然后写到第一个sheet，名字为模板 然后文件流会自动关闭
    // 如果这里想使用03 则 传入excelType参数即可
    EasyExcel.write(fileName, DemoData.class).sheet("模板").doWrite(data());
}
```

### web上传、下载

```Java
 /**
 * 文件下载（失败了会返回一个有部分数据的Excel）
 * <p>1. 创建excel对应的实体对象 参照{@link DownloadData}
 * <p>2. 设置返回的 参数
 * <p>3. 直接写，这里注意，finish的时候会自动关闭OutputStream,当然你外面再关闭流问题不大
 */
@GetMapping("download")
public void download(HttpServletResponse response) throws IOException {
    // 这里注意 有同学反应使用swagger 会导致各种问题，请直接用浏览器或者用postman
    response.setContentType("application/vnd.ms-excel");
    response.setCharacterEncoding("utf-8");
    // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
    String fileName = URLEncoder.encode("测试", "UTF-8");
    response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xlsx");
    EasyExcel.write(response.getOutputStream(), DownloadData.class).sheet("模板").doWrite(data());
}

/**
 * 文件上传
 * <p>1. 创建excel对应的实体对象 参照{@link UploadData}
 * <p>2. 由于默认一行行的读取excel，所以需要创建excel一行一行的回调监听器，参照{@link UploadDataListener}
 * <p>3. 直接读即可
 */
@PostMapping("upload")
@ResponseBody
public String upload(MultipartFile file) throws IOException {
    EasyExcel.read(file.getInputStream(), UploadData.class, new UploadDataListener(uploadDAO)).sheet().doRead();
    return "success";
}
```

## 附录

[EasyExcel官方文档](https://easyexcel.opensource.alibaba.com/docs/current/)

## 案例

### 自定义转换类

以枚举为例，其他都大同小异

```java

```