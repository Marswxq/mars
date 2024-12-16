# Word

**目录**

[[toc]]

## Poi-tl

> poi-tl（poi template language）是Word模板引擎，使用模板和数据创建很棒的Word文档。

[官方文档](http://deepoove.com/poi-tl/)

### POM依赖

```xml
<dependencys>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>4.1.2</version>
    </dependency>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>4.1.2</version>
    </dependency>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml-schemas</artifactId>
        <version>4.1.2</version>
    </dependency>
    <dependency>
        <groupId>com.deepoove</groupId>
        <artifactId>poi-tl</artifactId>
        <version>1.10.6</version>
    </dependency>
</dependencys>   
```

### 模板填充

#### 模板文件

<img :src="$withBase('/images/java/poi-tl.png')" alt="模板文件">

#### 填充代码实现

```java
public class TestWordByPOITL {

    public static void main(String[] args) {
        //模板地址
        String templateFilePath = "d:/tmp/tl.docx";
        //生成文件的保存地址
        String destFilePath = "d:/tmp/";
        Map<String, Object> map = new HashMap<>();

        Map<String, Object> map1 = new HashMap<>();

        map1.put("text", "1.岗位说明：科主任为科室安全生产管理第一责任人，做好科室日常工作中风险识别及干预、消防与安全的预防、巡视、检查及应急管理等工作。");

        Map<String, Object> map2 = new HashMap<>();

        map2.put("header1", "一、党务办公室");

        Map<String, Object> map3 = new HashMap<>();

        map3.put("header2", "（一）行政管理" );


        List<Map<String, Object>> maps = Arrays.asList(map2,map3,map1,map2,map3,map1,map2,map3,map1,map2,map3,map1);
        map.put("context", maps);

        ConfigureBuilder builder = Configure.builder();
        try (XWPFTemplate compile = XWPFTemplate.compile(templateFilePath, builder.build())) {
            compile.render(map);
            compile.writeToFile(destFilePath + "out.doc");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```
