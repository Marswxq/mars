# Swagger

**目录**

[[toc]]

## 常见问题

### Q1.swagger java.lang.NumberFormatException: empty String

因为`springfox-swagger2(2.9.2)`依赖于`swagger-models(1.5.20)`，而该版本的`swagger`会将实体类中非`String`
类型的属性默认赋值为空字符串，因此需要手动添加更高版本的`swagger-models`依赖。

```xml
<dependency>
    <groupId>io.swagger</groupId>
    <artifactId>swagger-models</artifactId>
    <version>1.5.21</version>
</dependency>
```