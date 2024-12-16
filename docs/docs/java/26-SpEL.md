# SpEL

> SpEL（Spring Expression Language），即Spring表达式语言，类似于Struts2x中使用的OGNL表达式语言，能在运行时构建复杂表达式、存取对象图属性、对象方法调用等等，并且能与Spring功能完美整合。

在Spring Cache注解属性中（如 key 、condition 、unless ），Spring的缓存抽象使用了SpEl表达式，进而保证了属性值的动态生成及足够的灵活。

## SpEL上下文数据

| **名称**        | **位置** | **描述**                                                             | **示例**                 |
|---------------|--------|--------------------------------------------------------------------|------------------------|
| methodName    | root对象 | 当前被调用的方法名                                                          | `#root.methodname`     |
| method        | root对象 | 当前被调用的方法                                                           | `#root.method.name`    |
| target        | root对象 | 当前被调用的目标对象实例                                                       | `#root.target`         |
| targetClass   | root对象 | 当前被调用的目标对象的类                                                       | `#root.targetClass`    |
| args          | root对象 | 当前被调用的方法的参数列表                                                      | `#root.args[0]`        |
| caches        | root对象 | 当前方法调用使用的缓存列表                                                      | `#root.caches[0].name` |
| Argument Name | 执行上下文  | 当前被调用的方法的参数，如findArtisan(Artisan artisan),可以通过#artsian.id获得参数      | `#artsian.id`          |
| result        | 执行上下文  | 方法执行后的返回值（仅当方法执行后的判断有效，如 unless cacheEvict的beforeInvocation=false） | `#result`              |

**注意：**

- 使用root对象的属性作为key时可以将“#root”省略，因为Spring默认使用的就是root对象的属性。 如：

```java
@Cacheable(key = "targetClass + methodName +#p0")
```

- 使用方法参数时可以直接使用“#参数名”或者“#p参数index”。 如：

```java
@Cacheable(value="users", key="#id")
@Cacheable(value="users", key="#p0")
```

## SpEL运算符

| **类型** | **运算符**                                 |
|--------|-----------------------------------------|
| 关系     | <，>，<=，>=，==，!=，lt，gt，le，ge，eq，ne       |
| 算术     | +，- ，* ，/，%，^                           |
| 逻辑     | &&，\|\|，!，and，or，not，between，instanceof |
| 条件     | ?: (ternary)，?: (elvis)                 |
| 正则表达式  | matches                                 |
| 其他类型   | ?.，?[…]，![…]，^[…]，$[…]                  |
