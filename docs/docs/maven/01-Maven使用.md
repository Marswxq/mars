# Maven 使用

**目录**

[[toc]]

## mvn参数

- -DgroupId和DartifactId构成了该jar包在pom.xml的坐标，项目依靠这两个属性定位。
- -Dfile表示需要上传的jar包的绝对路径。
- -Durl私服上仓库的位置，打开nexus > repositories菜单，可以看到该路径。
- -DrepositoryId服务器的表示id，在nexus的configuration可以看到。
- -Dversion表示版本信息
- -Dpackaging：上传文件类型，可选值pom、jar、ejb、war、ear、rar、par、maven-archetype、maven-plugin。
- -Dclassifier：附属构建类别，可选值是sources、javadoc。用来上传**sources、javadoc**文件。

## 跳过测试

```shell
-DskipTests
```

```shell
-Dmaven.test.skip=true
```

## 查看错误的详细信息

```shell
mvn  -e
```

## 发生jar的冲突显示冲突的原因

```shell
mvn  install -x
```

## 想要查看完整的依赖踪迹，包含那些因为冲突或者其它原因而被拒绝引入的构件，打开 Maven 的调试标记运行

```shell
mvn install -X	
```

## 强制检查更新

```shell
mvn clean install -U
```

## 打印整个依赖树

```shell
mvn depencity:tree
```

## 发布第三发jar到本地仓库

```shell
mvn install:install-file -DgroupId=com -DartifactId=client -Dversion=0.1.0 -Dpackaging=jar -Dfile=d:\client-0.1.0.jar -DdownloadSources=true -DdownloadJavadocs=true
```

## 发布第三发jar到远端nexus仓库

### 上传本地pom到nexus私服

```shell
mvn deploy:deploy-file -DgroupId=xxx.xxx.xxx.xxx  -DartifactId=xxx-xxx-xxx  -Dversion=1.0.0 -Dfile=C:\Users\mars\Desktop\xxx-xxx-xxx-1.0.0.pom  -Dpackaging=pom -DrepositoryId=xxx-releases -Durl=http://xxx.xxx.xxx.xxx:xxxx/repository/xxx-releases/
```

### 上传本地jar到nexus私服

```shell
mvn deploy:deploy-file -DgroupId=xxx.xxx.xxx.xxx  -DartifactId=xxx-xxx-xxx  -Dversion=1.0.0  -Dpackaging=jar -Dfile=D:\src\01-git\xxxx-1.0.0.jar -DpomFile=D:\src\01-git\pom.xml -Durl=http://xxx.xxx.xxx.xxx:xxxx/repository/xxx-releases/ -DrepositoryId=neusoft_releases
```

## 指定版本号

```shell
# 替换版本号为2.0.0-SNAPSHOT, 会修改pom.xml中的版本号
mvn clean versions:set -DnewVersion=2.0.0-SNAPSHOT
```

## maven命令行窗口指定特定settings.xml

```shell
mvn install --settings c:\user\settings.xml 
mvn clean package --settings F:\Maven\settings.xml -Dmaven.test.skip=true
mvn -s "C:\apache-maven-3.3.3\conf\settingsXXX.xml" clean install -Dmaven.test.skip=true 
```

## maven seource javadoc

```xml
<!-- source -->
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-source-plugin</artifactId>
        <executions>
            <execution>
                <id>attach-sources</id>
                <goals>
                    <goal>jar</goal>
                </goals>
            </execution>
        </executions>
    </plugin>
    <!-- javadoc -->
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-javadoc-plugin</artifactId>
        <configuration>
            <attach>true</attach>
        </configuration>
        <executions>
            <execution>
                <id>attach-javadocs</id>
                <goals>
                    <goal>jar</goal>
                </goals>
            </execution>
        </executions>
    </plugin>
</plugins>
```

## maven-source-plugin 插件生成中文注释乱码

添加环境变量

```powershell
JAVA_TOOL_OPTIONS
```

值：

```powershell
-Dfile.encoding=UTF-8
```

说明：
调用jdk的javac命令执行编译，javac默认采用系统字符集。

```java
// 可以获取当前系统使用的编码字符集
System.getProperty("file.encoding")   
```

## parent.relativePath' of POM.......

报错信息

```shell
'parent.relativePath' of POM xx.xxx.xxx.xxx:xxx-xxx-xxx-xxx:1.0.3-SNAPSHOT (D:\src\01-git\xxxx\pom.xml) points at xx.xxx.xxx.xxx:xxx-xxx-xxx instead of xx.xxx.xxxx.xxxx:xxx-xxx-xxx-xxxx, please verify your project structure @ line 6, column 13
It is highly recommended to fix these problems because they threaten the stability of your build.
For this reason, future Maven versions might no longer support building such malformed projects.
```

解决：设定一个空值将始终从仓库中获取，不从本地路径获取。

```xml

<relativePath/>
```

说明：MAVEN构建jar包时候查找顺序：relativePath元素中的地址>本地仓库>远程仓库

## 生成 maven deplpy 脚本

```shell
echo off
chcp 65001
set /p var=请输入需要遍历的api路径：
java UploadToRemoteMvnRepository.java %var%
pause & exit
```

```java

public class UploadToRemoteMvnRepository {

    public static final String MVN_COMMOND_FORMAT = "mvn deploy:deploy-file -DgroupId=%s -DartifactId=%s -Dversion=%s -Dpackaging=jar -Dfile=%s -Durl=%s -DpomFile=%s -DrepositoryId=neusoft_releases";
    public static final String XXX_RELEASE_URL = "http://xxx.xxx.xxx.xxx:xxxx/repository/xxxx-releases/";
    public static final String XXXF_RELEASE_URL = "http://xxx.xxx.xxx.xxx:xxxx/repository/xxxx-releases/";
    public static final String XXX_SNOPSHOT_URL = "http://xxx.xxx.xxx.xxx:xxxx/repository/xxxx-snapshots/";
    public static final String XXXF_SNAPSHOTS_URL = "http://xxx.xxx.xxx.xxx:xxxx/repository/xxxx-snapshots/";
    public static List<Map<String, String>> lm = new ArrayList<>();
    public static Map<String, String> map = new HashMap<>();

    public static void main(String[] args) throws Exception {
        getFileList("C:\\Users\\mars\\Desktop\\nation\\smc-5.3.0\\api");
        mavenBat();
    }

    public static void getFileList(String filepath) throws IOException {

        File file = new File(filepath);

        File[] fileList = file.listFiles();

        findjar(fileList);
    }

    private static void findjar(File[] fileList) {
        for (int i = 0, len = Objects.requireNonNull(fileList).length; i < len; i++) {
            if (fileList[i].isFile() && fileList[i].getName().endsWith(".jar")) {
                String jar = fileList[i].toString();
                String pom = jar.substring(0, jar.length() - 4).concat(".pom");
                readXml(pom);
                Map<String, String> m = new HashMap<>(8);
                m.put("jar", jar);
                m.put("pom", pom);
                m.put("artifactId", map.get("artifactId"));
                m.put("version", map.get("version"));
                m.put("groupId", map.get("groupId"));
                lm.add(m);
            }
            if (fileList[i].isDirectory()) {
                findjar(fileList[i].listFiles());
            }
        }
    }

    public static void readXml(String file) {
        SAXParserFactory spf = SAXParserFactory.newInstance();
        try {
            SAXParser sp = spf.newSAXParser();
            MyDefaultHandler handler = new MyDefaultHandler();
            sp.parse(file, handler);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static class MyDefaultHandler extends DefaultHandler {
        private String currentTag;
        /*加入有多个标签，指定获取的值*/
        private int needNumber = 1;
        /*当前解析到第几个*/
        private int artifactIdNo;
        private int versiondNo;
        private int groupIdNo;

        /**
         * 开始标签时调用
         *
         * @param qName:      表示开始标签的标签名
         * @param attributes: 表示开始标签内包含的属性列表
         */
        @Override
        public void startElement(String uri, String localName, String qName,
                                 Attributes attributes) throws SAXException {
            currentTag = qName;
            if ("artifactId".equals((currentTag))) {
                artifactIdNo++;
            }
            if ("version".equals((currentTag))) {
                versiondNo++;
            }
            if ("groupId".equals((currentTag))) {
                groupIdNo++;
            }
        }

        /**
         * 结束标签时调用
         *
         * @param qName: 结束标签的标签名称
         */
        @Override
        public void endElement(String uri, String localName, String qName)
                throws SAXException {
            currentTag = null;
        }

        /**
         * 读到文本内容的时调用
         *
         * @param ch:     表示当前读完的所有文本内容
         * @param start：  表示当前文本内容的开始位置
         * @param length: 表示当前文本内容的长度
         */
        @Override
        public void characters(char[] ch, int start, int length)
                throws SAXException {
            //得到当前文本内容
            String content = new String(ch, start, length);
            /*获取指定第x个标签为“作者”的内容*/
            if ("artifactId".equals(currentTag) && artifactIdNo == needNumber) {
                map.put("artifactId", content);
            }
            if ("version".equals(currentTag) && versiondNo == needNumber) {
                map.put("version", content);
            }
            if ("groupId".equals(currentTag) && groupIdNo == needNumber) {
                map.put("groupId", content);
            }
        }

        /**
         * Receive notification of the end of the document.
         *
         * <p>By default, do nothing.  Application writers may override this
         * method in a subclass to take specific actions at the end
         * of a document (such as finalising a tree or closing an output
         * file).</p>
         *
         * @throws SAXException Any SAX exception, possibly
         *                      wrapping another exception.
         * @see ContentHandler#endDocument
         */
        @Override
        public void endDocument() throws SAXException {
            super.endDocument();
        }
    }

    /**
     * "mvn deploy:deploy-file -DgroupId=%s -DartifactId=%s -Dversion=%s -Dpackaging=jar -Dfile=%s -Durl=%s -DpomFile=%s -DrepositoryId=neusoft_releases -Dfile=%s";
     */
    public static void mavenBat() {
        lm.forEach(map -> {
            String url = XXXF_RELEASE_URL;
            String url2 = XXX_RELEASE_URL;
            if (map.getOrDefault("version", "null").toLowerCase().contains("snapshots")) {
                url = XXXF_SNAPSHOTS_URL;
                url2 = XXX_SNOPSHOT_URL;
            }
            System.out.println(String.format(MVN_COMMOND_FORMAT, map.get("groupId"), map.get("artifactId"), map.get("version"), map.get("jar"), url, map.get("pom")));
            System.out.println(String.format(MVN_COMMOND_FORMAT, map.get("groupId"), map.get("artifactId"), map.get("version"), map.get("jar"), url2, map.get("pom")));
        });
    }
}
```

## maven 项目依赖报告

```powershell
mvn project-info-reports:dependencies
```

## maven 内置参数

### 参数列表

| 变量名                               | 作用             | pom使用                                | yaml使用                              | 说明                             |
|-----------------------------------|----------------|--------------------------------------|-------------------------------------|--------------------------------|
| basedir                           | 项目的根目录         | ${basedir}                           | @basedir@                           |                                |
| project.basedir                   | 项目的根目录         | ${project.basedir}                   | @project.basedir@                   | pom.xml所在目录                    |
| project.groupId                   | 项目的 groupId    | ${project.groupId}                   | @project.groupId@                   |                                |
| project.artifactId                | 项目的 artifactId | ${project.artifactId}                | @project.artifactId@                |                                |
| project.version                   | 项目版本           | ${project.version}                   | @project.version@                   |                                |
| project.build.finalName           | 项目打包输出文件的名称    | ${project.build.finalName}           | @project.build.finalName@           | 默认为 artifactId + “-” + version |
| project.build.sourceDirectory     | 项目的主源码目录       | ${project.build.sourceDirectory}     | @project.build.sourceDirectory@     | 默认为 /src/main/java/            |
| project.build.testSourceDirectory | 项目的测试源码目录      | ${project.build.testSourceDirectory} | @project.build.testSourceDirectory@ | 默认为 /src/test/java/            |
| project.build.directory           | 项目构建输出目录       | ${project.build.directory}           | @project.build.directory@           | 默认为 /target/                   |
| project.outputDirectory           | 项目主代码编译输出目录    | ${project.outputDirectory}           | @project.outputDirectory@           | 默认为 /target/classes/           |
| project.testOutputDirectory       | 项目测试代码编译输出目录   | ${project.testOutputDirectory}       | @project.testOutputDirectory@       | 默认为 /target/testclasses/       |

### 自定义属性

在pom中`<properties></properties>`标签中定义的属性，均可通过${标签名}获取。

如：获取maven.compiler.source，`${maven.compiler.source}`

```xml

<properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

### setting 属性

setting中定义xml标签属性，据可通过${标签名}获取。

如：获取maven本地仓库位置，`${settings.localRepository}`

```xml

<localRepository>D:/develop/.m2/repository</localRepository>
```

### 系统属性

java项目，maven可以获取java的系统属性

如：用户目录，`${user.home}`

### 环境变量

获取系统环境便利，linux的$PATH、windows的%PATH%

如：换取jdk路径，`${env.JAVA_HOE}`

## maven dependencies 工程依赖

当一个父pom中的dependencyManagement标签中需要导入另一个pom中的dependencyManagement的时候，必须同时使用`<scope>import</scope>`
和 `<type>pom</type>`

```xml

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.0.1.BUILD-SNAPSHOT</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## maven 编译跳过 resource 下的内容

resource下存放word模板时，编译后的模板可能导致文件损坏

```xml

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.0.2</version>
    <configuration>
        <encoding>UTF-8</encoding>
        <!-- 打包不对excel和word文件进行转码-->
        <nonFilteredFileExtensions>
            <nonFilteredFileExtension>xls</nonFilteredFileExtension>
            <nonFilteredFileExtension>xlsx</nonFilteredFileExtension>
            <nonFilteredFileExtension>doc</nonFilteredFileExtension>
            <nonFilteredFileExtension>docx</nonFilteredFileExtension>
        </nonFilteredFileExtensions>
    </configuration>
</plugin>
```
