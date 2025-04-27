# Lombook

**目录**

[[toc]]

## @EqualsAndHashCode

1. 此注解会生成equals(Object other) 和 hashCode()方法。
2. 它默认使用非静态，非瞬态的属性
3. 可通过参数exclude排除一些属性
4. 可通过参数of指定仅使用哪些属性
5. 它默认仅使用该类中定义的属性且不调用父类的方法
6. 可通过callSuper=true解决上一点问题。让其生成的方法中调用父类的方法。

**注意**

- 不比较父类属性时（只比较子类属性）

```java
@EqualsAndHashCode(callSuper=false)
```

- 比较父类属性时

```java
@EqualsAndHashCode(callSuper=true)
```

## @Data

相当于@Getter @Setter @RequiredArgsConstructor @ToString @EqualsAndHashCode这5个注解的合集。

## @Accessors

链式编程

### chain 属性

简化代码中的getter和setter方法的书写。通过在类上使用@Accessors(chain = true)，可以让生成的setter方法返回当前对象，从而实现链式调用。

```java
@Accessors(chain = true)
```

### fluent 属性

用来简化getter和setter方法的书写。通过在类上使用@Accessors(fluent = true)
，生成的setter方法会返回void而不是当前对象，但是会以链式调用的方式来设置属性。这样可以在代码中更加灵活地使用setter方法。

```java
@Accessors(fluent = true)
```

## 常见问题

### class lombok.javac.apt.LombokProcessor

问题：lombok 访问不到 jdk

```java
class lombok.javac.apt.LombokProcessor (in unnamed module @0x7d968ec1) cannot access class com.sun.tools.javac.processing.JavacProcessingEnvironment (in module jdk.compiler) because module jdk.compiler does not export com.sun.tools.javac.processing to unnamed module @0x7d968ec1
```

解决：修改项目的编译级别（pom 或者 idea编译级别）

- 方式1：全局配置
```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```
- 方式2：当前项目配置

```xml

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>utf-8</encoding>
                <showWarnings>true</showWarnings>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### java: You aren't using a compiler supported by lombok, so lombok will not work and has been disabled.

问题： lombok 注解不识别

```java
java: You aren't using a compiler supported by lombok, so lombok will not work and has been disabled.
  Your processor is: com.sun.proxy.$Proxy8
  Lombok supports: sun/apple javac 1.6, ECJ
```

原因： lombok 版本过低

解决：

- 方式1：

```xml
<!-- 升级 lombok 版本 -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.24</version>
</dependency>
```

- 方式2：

修改 idea 编译参数，Compiler -> Shared build process VM options ，添加配置：

```bash
-Djps.track.ap.dependencies=false
```


