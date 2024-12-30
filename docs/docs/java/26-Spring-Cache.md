# Spring-Cache

> 缓存是什么？缓存是一种介于数据永久存储介质与应用程序之间的数据临时存储介质，使用缓存可以有效的减少低速数据读取过程的次数（例如磁盘IO），提高系统性能。此外缓存不仅可以用于提高永久性存储介质的数据读取效率，还可以提供临时的数据存储空间。

## SpringBoot 内置缓存

### 默认支持

| 缓存类型                      | 说明                                                                                        |
|:--------------------------|:------------------------------------------------------------------------------------------|
| NoOpCacheManager          | Spring 的一个空实现，当没有其他缓存管理器可用时，默认会使用这个实现                                                     |
| ConcurrentMapCacheManager | 简单的基于内存的缓存实现，使用了 java.util.concurrent.ConcurrentHashMap。主要应用于 jvm 缓存等不需要分布式缓存的场景。         |
| Caffeine                  | 高性能的基于 Java 的本地缓存库。个人理解为 ConcurrentMapCacheManager 的升级封装。参考[16-Caffeine](16-Caffeine.md)。 |
| Ehcache                   | 高性能、多功能的 java 缓存。支持单机缓存和分布式缓存。                                                            |
| Hazelcast                 | 分布式的内存数据网格，适用于需要高并发读写操作的场景。                                                               |
| Redis                     | 耳熟能详，可以用作数据库、缓存和消息中间件。                                                                    |

### 依赖

版本使用 SpringBoot 的`spring-boot-dependencies`对应版本即可。

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

* Redis 依赖

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

* Ehcache 依赖

```xml

<dependency>
    <groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache</artifactId>
</dependency>
```

* Caffeine 依赖

```xml

<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```

* Hazelcast 依赖

```xml

<dependency>
    <groupId>com.hazelcast</groupId>
    <artifactId>hazelcast</artifactId>
</dependency>
```

### Redis 缓存配置

```java
@Configuration
@EnableCaching
public class RedisCacheConfig extends CachingConfigurerSupport {

    /**
     * 重写缓存Key生成策略。
     * 包名+方法名+参数列表。防止缓存Key冲突
     */
    @Bean
    @Override
    public KeyGenerator keyGenerator() {
        return (target, method, params) -> {
            // 存放最终结果
            StringBuilder resultStringBuilder = new StringBuilder("cache:key:");
            // 执行方法所在的类
            resultStringBuilder.append(target.getClass().getName()).append(".");
            // 执行的方法名称
            resultStringBuilder.append(method.getName()).append("(");

            // 存放参数
            StringBuilder paramStringBuilder = new StringBuilder();
            for (Object param : params) {
                if (param == null) {
                    paramStringBuilder.append("java.lang.Object[null],");
                } else {
                    paramStringBuilder
                            .append(param.getClass().getName())
                            .append("[")
                            .append(param)
                            .append("],");
                }
            }
            if (StringUtils.hasText(paramStringBuilder.toString())) {
                // 去掉最后的逗号
                String trimLastComma = paramStringBuilder.substring(0, paramStringBuilder.length() - 1);
                resultStringBuilder.append(trimLastComma);
            }
            return resultStringBuilder.append(")").toString();
        };
    }

    @Bean
    public CacheManager redisCacheManager(RedisConnectionFactory factory) {
        Map<String, RedisCacheConfiguration> configurationMap = new HashMap<>();

        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                // ttl 申请缓存，也就是缓存的过期时间
                .entryTtl(Duration.ofMinutes(30))
                // key 序列化类型
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(keySerializer()))
                // value 序列化，注意使用的是  fastJson 序列化，解决 Jackson2JsonRedisSerializer 对数组反序列化错误问题
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericFastJsonRedisSerializer()))
                // 禁用缓存 null 值。记下任何 Cache。put（Object， Object） 操作将出错。不会向 Redis 写入任何内容，也不会删除任何内容。之后，已经存在的 key 仍将存在，其值与以前完全相同。
                .disableCachingNullValues()
                // 缓存 key 前缀
                .computePrefixWith(this::getCachePreFix);

        return RedisCacheManager.builder(factory)
                .initialCacheNames(configurationMap.keySet())
                .withInitialCacheConfigurations(configurationMap)
                .cacheDefaults(config)
                .build();
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        // 配置连接工厂
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        //使用Jackson2JsonRedisSerializer来序列化和反序列化redis的value值（默认使用JDK的序列化方式）
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper om = new ObjectMapper();
        // 指定要序列化的域，field,get和set,以及修饰符范围，ANY是都有包括private和public
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 指定序列化输入的类型，类必须是非final修饰的，final修饰的类，比如String,Integer等会抛出异常
        om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        //使用StringRedisSerializer来序列化和反序列化redis的key值
        //redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setKeySerializer(keySerializer());
        redisTemplate.setHashKeySerializer(keySerializer());
        // 值采用json序列化
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    private RedisSerializer<String> keySerializer() {
        return new StringRedisSerializer();
    }

    /**
     * 缓存前缀
     *
     * @param name 缓存名
     * @return 缓存前缀：缓存名
     */
    private String getCachePreFix(String name) {
        // 缓存前缀，可以通过配置获取自定义前缀，区分各个服务、业务的缓存域
        String cachePreFix = "default";
        cachePreFix = StrUtil.isBlank(cachePreFix) ? "default" : cachePreFix;
        return String.join(StrPool.COLON, cachePreFix, name);
    }
}
```

### 注解

#### 开启缓存

一般在启动类上使用`@EnableCaching`开启缓存，也可以在`@Configuration`标记的配置类上开启。

#### 缓存

使用`@Cacheable`，判断是否已有缓存，有则直接返回缓存，没有则先执行方法然后缓存。

* 源码

```java
/**
 * Annotation indicating that a method (or all methods on a class) triggers a
 * {@link org.springframework.cache.Cache#evict(Object) cache evict} operation.
 *
 * <p>This annotation may be used as a <em>meta-annotation</em> to create custom
 * <em>composed annotations</em> with attribute overrides.
 *
 * @author Costin Leau
 * @author Stephane Nicoll
 * @author Sam Brannen
 * @since 3.1
 * @see CacheConfig
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface CacheEvict {

	/**
	 * Alias for {@link #cacheNames}.
	 */
	@AliasFor("cacheNames")
	String[] value() default {};

	/**
	 * Names of the caches to use for the cache eviction operation.
	 * <p>Names may be used to determine the target cache (or caches), matching
	 * the qualifier value or bean name of a specific bean definition.
	 * @since 4.2
	 * @see #value
	 * @see CacheConfig#cacheNames
	 */
	@AliasFor("value")
	String[] cacheNames() default {};

	/**
	 * Spring Expression Language (SpEL) expression for computing the key dynamically.
	 * <p>Default is {@code ""}, meaning all method parameters are considered as a key,
	 * unless a custom {@link #keyGenerator} has been set.
	 * <p>The SpEL expression evaluates against a dedicated context that provides the
	 * following meta-data:
	 * <ul>
	 * <li>{@code #result} for a reference to the result of the method invocation, which
	 * can only be used if {@link #beforeInvocation()} is {@code false}. For supported
	 * wrappers such as {@code Optional}, {@code #result} refers to the actual object,
	 * not the wrapper</li>
	 * <li>{@code #root.method}, {@code #root.target}, and {@code #root.caches} for
	 * references to the {@link java.lang.reflect.Method method}, target object, and
	 * affected cache(s) respectively.</li>
	 * <li>Shortcuts for the method name ({@code #root.methodName}) and target class
	 * ({@code #root.targetClass}) are also available.
	 * <li>Method arguments can be accessed by index. For instance the second argument
	 * can be accessed via {@code #root.args[1]}, {@code #p1} or {@code #a1}. Arguments
	 * can also be accessed by name if that information is available.</li>
	 * </ul>
	 */
	String key() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.interceptor.KeyGenerator}
	 * to use.
	 * <p>Mutually exclusive with the {@link #key} attribute.
	 * @see CacheConfig#keyGenerator
	 */
	String keyGenerator() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.CacheManager} to use to
	 * create a default {@link org.springframework.cache.interceptor.CacheResolver} if none
	 * is set already.
	 * <p>Mutually exclusive with the {@link #cacheResolver} attribute.
	 * @see org.springframework.cache.interceptor.SimpleCacheResolver
	 * @see CacheConfig#cacheManager
	 */
	String cacheManager() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.interceptor.CacheResolver}
	 * to use.
	 * @see CacheConfig#cacheResolver
	 */
	String cacheResolver() default "";

	/**
	 * Spring Expression Language (SpEL) expression used for making the cache
	 * eviction operation conditional.
	 * <p>Default is {@code ""}, meaning the cache eviction is always performed.
	 * <p>The SpEL expression evaluates against a dedicated context that provides the
	 * following meta-data:
	 * <ul>
	 * <li>{@code #root.method}, {@code #root.target}, and {@code #root.caches} for
	 * references to the {@link java.lang.reflect.Method method}, target object, and
	 * affected cache(s) respectively.</li>
	 * <li>Shortcuts for the method name ({@code #root.methodName}) and target class
	 * ({@code #root.targetClass}) are also available.
	 * <li>Method arguments can be accessed by index. For instance the second argument
	 * can be accessed via {@code #root.args[1]}, {@code #p1} or {@code #a1}. Arguments
	 * can also be accessed by name if that information is available.</li>
	 * </ul>
	 */
	String condition() default "";

	/**
	 * Whether all the entries inside the cache(s) are removed.
	 * <p>By default, only the value under the associated key is removed.
	 * <p>Note that setting this parameter to {@code true} and specifying a
	 * {@link #key} is not allowed.
	 */
	boolean allEntries() default false;

	/**
	 * Whether the eviction should occur before the method is invoked.
	 * <p>Setting this attribute to {@code true}, causes the eviction to
	 * occur irrespective of the method outcome (i.e., whether it threw an
	 * exception or not).
	 * <p>Defaults to {@code false}, meaning that the cache eviction operation
	 * will occur <em>after</em> the advised method is invoked successfully (i.e.
	 * only if the invocation did not throw an exception).
	 */
	boolean beforeInvocation() default false;

}
```

* 属性说明

| 属性            | 说明                                                                         |
|---------------|----------------------------------------------------------------------------|
| value         | cacheNames 的别名                                                             |
| cacheNames    | 用于缓存逐出操作的缓存的名称。名称可用于确定目标缓存（或缓存），与特定 bean 定义的限定符值或 bean 名称匹配。               |
| key           | 支持 SpEL 表达式，动态获取key；默认为"",会覆盖掉 keyGenerator 配置的规则。                         |
| keyGenerator  | 与 key 属性互斥。默认使用系统配置的 spring keyGenerator                                   |
| cacheManager  | 指定 spring cacheManager，redis 中一般都会重写 cacheManager ，方便缓存值使用 json 方式序列化和反序列化 |
| cacheResolver | 指定缓存解析器                                                                    |
| condition     | 执行缓存的条件， 支持 SpEL 表达式                                                       |
| unless        | 不执行缓存的条件，支持 SpEL 表达式                                                       |
| sync          | 是否开启异步模式，默认 false 。开启可以有效防止缓存被击穿。                                          |

* 简单例子

```java
@Cacheable(value = "test:cacheable:" ,key = "targetClass + methodName +#p0")
public Object queryAll(String id) {
    return cacheService.findByid(id);
}
```

#### 配置

`@CacheConfig`是一个类级别的注解，可以指定缓存的名称、键生成器、缓存管理器和缓存解析器。类似于类的全局配置，使类中的所有方法、接口的缓存操作都会共享这些配置。

* 源码

```java
/**
 * {@code @CacheConfig} provides a mechanism for sharing common cache-related
 * settings at the class level.
 *
 * <p>When this annotation is present on a given class, it provides a set
 * of default settings for any cache operation defined in that class.
 *
 * @author Stephane Nicoll
 * @author Sam Brannen
 * @since 4.1
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CacheConfig {

	/**
	 * Names of the default caches to consider for caching operations defined
	 * in the annotated class.
	 * <p>If none is set at the operation level, these are used instead of the default.
	 * <p>May be used to determine the target cache (or caches), matching the
	 * qualifier value or the bean names of a specific bean definition.
	 */
	String[] cacheNames() default {};

	/**
	 * The bean name of the default {@link org.springframework.cache.interceptor.KeyGenerator} to
	 * use for the class.
	 * <p>If none is set at the operation level, this one is used instead of the default.
	 * <p>The key generator is mutually exclusive with the use of a custom key. When such key is
	 * defined for the operation, the value of this key generator is ignored.
	 */
	String keyGenerator() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.CacheManager} to use to
	 * create a default {@link org.springframework.cache.interceptor.CacheResolver} if none
	 * is set already.
	 * <p>If no resolver and no cache manager are set at the operation level, and no cache
	 * resolver is set via {@link #cacheResolver}, this one is used instead of the default.
	 * @see org.springframework.cache.interceptor.SimpleCacheResolver
	 */
	String cacheManager() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.interceptor.CacheResolver} to use.
	 * <p>If no resolver and no cache manager are set at the operation level, this one is used
	 * instead of the default.
	 */
	String cacheResolver() default "";

}
```

属性使用方法参考[`@Cacheable`属性说明](#缓存)

* 简单例子

```java
@CacheConfig(cacheNames = {"test:cacheable:"})
public class TestCacheConfigImpl implements TestCacheConfig {
    @Cacheable(ey = "targetClass + methodName +#p0")
    public Object queryAll(String id) {
        return cacheService.findByid(id);
    }
}
```

#### 更新

`@CachePut`主要用于缓存更新，作用于更新方法上，和`@Cacheable`不同的是，它每次都会触发真实方法的调用。

* 源码

```java
/**
 * Annotation indicating that a method (or all methods on a class) triggers a
 * {@link org.springframework.cache.Cache#put(Object, Object) cache put} operation.
 *
 * <p>In contrast to the {@link Cacheable @Cacheable} annotation, this annotation
 * does not cause the advised method to be skipped. Rather, it always causes the
 * method to be invoked and its result to be stored in the associated cache if the
 * {@link #condition()} and {@link #unless()} expressions match accordingly. Note
 * that Java8's {@code Optional} return types are automatically handled and its
 * content is stored in the cache if present.
 *
 * <p>This annotation may be used as a <em>meta-annotation</em> to create custom
 * <em>composed annotations</em> with attribute overrides.
 *
 * @author Costin Leau
 * @author Phillip Webb
 * @author Stephane Nicoll
 * @author Sam Brannen
 * @since 3.1
 * @see CacheConfig
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface CachePut {

	/**
	 * Alias for {@link #cacheNames}.
	 */
	@AliasFor("cacheNames")
	String[] value() default {};

	/**
	 * Names of the caches to use for the cache put operation.
	 * <p>Names may be used to determine the target cache (or caches), matching
	 * the qualifier value or bean name of a specific bean definition.
	 * @since 4.2
	 * @see #value
	 * @see CacheConfig#cacheNames
	 */
	@AliasFor("value")
	String[] cacheNames() default {};

	/**
	 * Spring Expression Language (SpEL) expression for computing the key dynamically.
	 * <p>Default is {@code ""}, meaning all method parameters are considered as a key,
	 * unless a custom {@link #keyGenerator} has been set.
	 * <p>The SpEL expression evaluates against a dedicated context that provides the
	 * following meta-data:
	 * <ul>
	 * <li>{@code #result} for a reference to the result of the method invocation. For
	 * supported wrappers such as {@code Optional}, {@code #result} refers to the actual
	 * object, not the wrapper</li>
	 * <li>{@code #root.method}, {@code #root.target}, and {@code #root.caches} for
	 * references to the {@link java.lang.reflect.Method method}, target object, and
	 * affected cache(s) respectively.</li>
	 * <li>Shortcuts for the method name ({@code #root.methodName}) and target class
	 * ({@code #root.targetClass}) are also available.
	 * <li>Method arguments can be accessed by index. For instance the second argument
	 * can be accessed via {@code #root.args[1]}, {@code #p1} or {@code #a1}. Arguments
	 * can also be accessed by name if that information is available.</li>
	 * </ul>
	 */
	String key() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.interceptor.KeyGenerator}
	 * to use.
	 * <p>Mutually exclusive with the {@link #key} attribute.
	 * @see CacheConfig#keyGenerator
	 */
	String keyGenerator() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.CacheManager} to use to
	 * create a default {@link org.springframework.cache.interceptor.CacheResolver} if none
	 * is set already.
	 * <p>Mutually exclusive with the {@link #cacheResolver} attribute.
	 * @see org.springframework.cache.interceptor.SimpleCacheResolver
	 * @see CacheConfig#cacheManager
	 */
	String cacheManager() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.interceptor.CacheResolver}
	 * to use.
	 * @see CacheConfig#cacheResolver
	 */
	String cacheResolver() default "";

	/**
	 * Spring Expression Language (SpEL) expression used for making the cache
	 * put operation conditional.
	 * <p>This expression is evaluated after the method has been called due to the
	 * nature of the put operation and can therefore refer to the {@code result}.
	 * <p>Default is {@code ""}, meaning the method result is always cached.
	 * <p>The SpEL expression evaluates against a dedicated context that provides the
	 * following meta-data:
	 * <ul>
	 * <li>{@code #result} for a reference to the result of the method invocation. For
	 * supported wrappers such as {@code Optional}, {@code #result} refers to the actual
	 * object, not the wrapper</li>
	 * <li>{@code #root.method}, {@code #root.target}, and {@code #root.caches} for
	 * references to the {@link java.lang.reflect.Method method}, target object, and
	 * affected cache(s) respectively.</li>
	 * <li>Shortcuts for the method name ({@code #root.methodName}) and target class
	 * ({@code #root.targetClass}) are also available.
	 * <li>Method arguments can be accessed by index. For instance the second argument
	 * can be accessed via {@code #root.args[1]}, {@code #p1} or {@code #a1}. Arguments
	 * can also be accessed by name if that information is available.</li>
	 * </ul>
	 */
	String condition() default "";

	/**
	 * Spring Expression Language (SpEL) expression used to veto the cache put operation.
	 * <p>Default is {@code ""}, meaning that caching is never vetoed.
	 * <p>The SpEL expression evaluates against a dedicated context that provides the
	 * following meta-data:
	 * <ul>
	 * <li>{@code #result} for a reference to the result of the method invocation. For
	 * supported wrappers such as {@code Optional}, {@code #result} refers to the actual
	 * object, not the wrapper</li>
	 * <li>{@code #root.method}, {@code #root.target}, and {@code #root.caches} for
	 * references to the {@link java.lang.reflect.Method method}, target object, and
	 * affected cache(s) respectively.</li>
	 * <li>Shortcuts for the method name ({@code #root.methodName}) and target class
	 * ({@code #root.targetClass}) are also available.
	 * <li>Method arguments can be accessed by index. For instance the second argument
	 * can be accessed via {@code #root.args[1]}, {@code #p1} or {@code #a1}. Arguments
	 * can also be accessed by name if that information is available.</li>
	 * </ul>
	 * @since 3.2
	 */
	String unless() default "";

}
```

属性使用方法参考[`@Cacheable`属性说明](#缓存)

* 简单例子

```java
@Cacheable(value = "test:cacheable:" ,key = "targetClass + methodName +#p0")
public Object queryAll(String id) {
    return cacheService.findByid(id);
}

// 注意更新的缓存与@Cacheable指定的缓存一致
@CachePut(value = "test:cacheable:" ,key = "targetClass + methodName +#p0")
public Object modifyCache(String id) {
    return cacheService.modifyCache(id);
}
```

#### 清除

`@CachEvict`主要用于清理缓存，一般对修改、新增（新增下级业务等）场景下使用。

* 源码

```java
/**
 * Annotation indicating that a method (or all methods on a class) triggers a
 * {@link org.springframework.cache.Cache#evict(Object) cache evict} operation.
 *
 * <p>This annotation may be used as a <em>meta-annotation</em> to create custom
 * <em>composed annotations</em> with attribute overrides.
 *
 * @author Costin Leau
 * @author Stephane Nicoll
 * @author Sam Brannen
 * @since 3.1
 * @see CacheConfig
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface CacheEvict {

	/**
	 * Alias for {@link #cacheNames}.
	 */
	@AliasFor("cacheNames")
	String[] value() default {};

	/**
	 * Names of the caches to use for the cache eviction operation.
	 * <p>Names may be used to determine the target cache (or caches), matching
	 * the qualifier value or bean name of a specific bean definition.
	 * @since 4.2
	 * @see #value
	 * @see CacheConfig#cacheNames
	 */
	@AliasFor("value")
	String[] cacheNames() default {};

	/**
	 * Spring Expression Language (SpEL) expression for computing the key dynamically.
	 * <p>Default is {@code ""}, meaning all method parameters are considered as a key,
	 * unless a custom {@link #keyGenerator} has been set.
	 * <p>The SpEL expression evaluates against a dedicated context that provides the
	 * following meta-data:
	 * <ul>
	 * <li>{@code #result} for a reference to the result of the method invocation, which
	 * can only be used if {@link #beforeInvocation()} is {@code false}. For supported
	 * wrappers such as {@code Optional}, {@code #result} refers to the actual object,
	 * not the wrapper</li>
	 * <li>{@code #root.method}, {@code #root.target}, and {@code #root.caches} for
	 * references to the {@link java.lang.reflect.Method method}, target object, and
	 * affected cache(s) respectively.</li>
	 * <li>Shortcuts for the method name ({@code #root.methodName}) and target class
	 * ({@code #root.targetClass}) are also available.
	 * <li>Method arguments can be accessed by index. For instance the second argument
	 * can be accessed via {@code #root.args[1]}, {@code #p1} or {@code #a1}. Arguments
	 * can also be accessed by name if that information is available.</li>
	 * </ul>
	 */
	String key() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.interceptor.KeyGenerator}
	 * to use.
	 * <p>Mutually exclusive with the {@link #key} attribute.
	 * @see CacheConfig#keyGenerator
	 */
	String keyGenerator() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.CacheManager} to use to
	 * create a default {@link org.springframework.cache.interceptor.CacheResolver} if none
	 * is set already.
	 * <p>Mutually exclusive with the {@link #cacheResolver} attribute.
	 * @see org.springframework.cache.interceptor.SimpleCacheResolver
	 * @see CacheConfig#cacheManager
	 */
	String cacheManager() default "";

	/**
	 * The bean name of the custom {@link org.springframework.cache.interceptor.CacheResolver}
	 * to use.
	 * @see CacheConfig#cacheResolver
	 */
	String cacheResolver() default "";

	/**
	 * Spring Expression Language (SpEL) expression used for making the cache
	 * eviction operation conditional.
	 * <p>Default is {@code ""}, meaning the cache eviction is always performed.
	 * <p>The SpEL expression evaluates against a dedicated context that provides the
	 * following meta-data:
	 * <ul>
	 * <li>{@code #root.method}, {@code #root.target}, and {@code #root.caches} for
	 * references to the {@link java.lang.reflect.Method method}, target object, and
	 * affected cache(s) respectively.</li>
	 * <li>Shortcuts for the method name ({@code #root.methodName}) and target class
	 * ({@code #root.targetClass}) are also available.
	 * <li>Method arguments can be accessed by index. For instance the second argument
	 * can be accessed via {@code #root.args[1]}, {@code #p1} or {@code #a1}. Arguments
	 * can also be accessed by name if that information is available.</li>
	 * </ul>
	 */
	String condition() default "";

	/**
	 * Whether all the entries inside the cache(s) are removed.
	 * <p>By default, only the value under the associated key is removed.
	 * <p>Note that setting this parameter to {@code true} and specifying a
	 * {@link #key} is not allowed.
	 */
	boolean allEntries() default false;

	/**
	 * Whether the eviction should occur before the method is invoked.
	 * <p>Setting this attribute to {@code true}, causes the eviction to
	 * occur irrespective of the method outcome (i.e., whether it threw an
	 * exception or not).
	 * <p>Defaults to {@code false}, meaning that the cache eviction operation
	 * will occur <em>after</em> the advised method is invoked successfully (i.e.
	 * only if the invocation did not throw an exception).
	 */
	boolean beforeInvocation() default false;

}
```

* 属性说明

| 属性               | 说明                                                                          |
|------------------|-----------------------------------------------------------------------------|
| allEntries       | 是否清空所有缓存内容，缺省为 false，如果指定为 true，则方法调用后将立即清空所有缓存                             |
| beforeInvocation | 是否在方法执行前就清空，缺省为 false，如果指定为 true，则在方法还没有执行的时候就清空缓存，缺省情况下，如果方法执行抛出异常，则不会清空缓存 |

其他属性使用方法参考[`@Cacheable`属性说明](#缓存)

* 简单例子

```java
@Cacheable(value = "test:cacheable:" ,key = "targetClass + methodName +#p0")
public Object queryAll(String id) {
    return cacheService.findByid(id);
}

//清除一条缓存，key为要清空的数据
@CacheEvict(value = "test:cacheable:",key="#id")
public void delById(String id) {
    return cacheService.delById(id);
}

//方法调用后清空所有缓存
@CacheEvict(value = "test:cacheable:",allEntries=true)
public void delectAll() {
    cacheService.delById(id);
}

//方法调用前清空所有缓存
@CacheEvict(value = "test:cacheable:",beforeInvocation=true)
public void delectAll() {
    cacheService.delById(id);
}
```

#### 组合缓存、更新、清除

`@Caching`组合多个 Cache 注解一起使用

* 源码

```java
/**
 * Group annotation for multiple cache annotations (of different or the same type).
 *
 * <p>This annotation may be used as a <em>meta-annotation</em> to create custom
 * <em>composed annotations</em> with attribute overrides.
 *
 * @author Costin Leau
 * @author Chris Beams
 * @since 3.1
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Caching {

	Cacheable[] cacheable() default {};

	CachePut[] put() default {};

	CacheEvict[] evict() default {};

}
```

* 简单例子

```java
@Caching(
    cacheable = {
        @Cacheable(value = "test:cacheable:", key = "#id")
    },
    put = { 
        @CachePut(value = "test:cacheable:", key = "#result.id"),
        @CachePut(value = "test:cacheable:", key = "#result.email"),
        @CachePut(value = "test:cacheable:", key = "#result.lastName"),
    }
)
public Object getInfoById(String id) {
    return testService.getInfoById(id);
}
```

## SpEL

> SpEL（Spring Expression Language），即Spring表达式语言，类似于Struts2x中使用的OGNL表达式语言，能在运行时构建复杂表达式、存取对象图属性、对象方法调用等等，并且能与Spring功能完美整合。

在Spring Cache注解属性中（如 key 、condition 、unless ），Spring的缓存抽象使用了SpEl表达式，进而保证了属性值的动态生成及足够的灵活。

### SpEL上下文数据

| **名称**        | **位置** | **描述**                                                                                                               | **示例**                           |
|---------------|--------|----------------------------------------------------------------------------------------------------------------------|----------------------------------|
| methodName    | root对象 | 当前被调用的方法名                                                                                                            | `#root.methodname`               |
| method        | root对象 | 当前被调用的方法                                                                                                             | `#root.method.name`              |
| target        | root对象 | 当前被调用的目标对象实例                                                                                                         | `#root.target`                   |
| targetClass   | root对象 | 当前被调用的目标对象的类                                                                                                         | `#root.targetClass`              |
| args          | root对象 | 当前被调用的方法的参数列表                                                                                                        | `#root.args[0]`                  |
| caches        | root对象 | 当前方法调用使用的缓存列表                                                                                                        | `#root.caches[0].name`           |
| Argument Name | 执行上下文  | 当前被调用的方法的参数，如`findArtisan(Artisan artisan)`,可以通过`#artsian.id`获得参数;如`findArtisan(String id)`也可以通过 `#p0`、`#id`、`#a0`获取 | `#artsian.id`  或者参数索引（如 #a0、#p0） |
| result        | 执行上下文  | 方法执行后的返回值（仅当方法执行后的判断有效，如 unless cacheEvict的beforeInvocation=false）                                                   | `#result`                        |

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

### SpEL运算符

| **类型** | **运算符**                                 |
|--------|-----------------------------------------|
| 关系     | <，>，<=，>=，==，!=，lt，gt，le，ge，eq，ne       |
| 算术     | +，- ，* ，/，%，^                           |
| 逻辑     | &&，\|\|，!，and，or，not，between，instanceof |
| 条件     | ?: (ternary)，?: (elvis)                 |
| 正则表达式  | matches                                 |
| 其他类型   | ?.，?[…]，![…]，^[…]，$[…]                  |

