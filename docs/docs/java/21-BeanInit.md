# BeanInit

**目录**

[[toc]]

## SmartInitializingSingleton

实现`SmartInitializingSingleton`
的接口后，当所有单例bean初始化完成，Spring的IOC容器会回调该接口的`afterSingletonsInstantiated()`方法。

**注意**
`SmartInitializingSingleton`只能应用于单例bean，且不能作用在懒加载bean上。

```java
@Component
@Getter
@RequiredArgsConstructor
public class RedisUtil implements SmartInitializingSingleton {
    @Override
    public void afterSingletonsInstantiated() {
        Assert.notNull(redisTemplate, "redisTemplate is null");
        valueOps = redisTemplate.opsForValue();
        hashOps = redisTemplate.opsForHash();
        listOps = redisTemplate.opsForList();
        setOps = redisTemplate.opsForSet();
        zSetOps = redisTemplate.opsForZSet();
}
```

## InitializingBean

实现`InitializingBean`的接口后，当类被创建后会自动调用该接口的`afterPropertiesSet()`方法。

**注意**
`InitializingBean`不能作用于懒加载的bean上。

```java
@Slf4j
@Configuration
public class ExcelConfig implements InitializingBean {

    @Value("${mars.excel.batch.count:1000}")
    private Integer batchCount;
    public static Integer BATCH_COUNT;

    @Override
    public void afterPropertiesSet() {
        BATCH_COUNT = this.batchCount;
        log.info(">>>>>> excel批量提交条数:{}", BATCH_COUNT);
    }
}
```

## @PostConstruct

```java
public class DefaultUserFactory implements UserFactory{
    @PostConstruct
    public void init() {
        System.out.println("@PostConstruct : UserFactory 初始化中...");
    }
}
```

## @Bean()

```java Test1
public class Test {
    public void init() {
        System.out.println("this is init method");
    }
}
```

```java
@Configuration
public class ConfigTest {
    @Bean(initMethod = "init")
    public Test test() {
        return new Test();
    }
}
```

## 静态块

```java
public class ExcelUtil {
    private static final ThreadPoolExecutor THREAD_POOL;

    static {
        //获取当前机器cpu的核心数
        int cpuNum = Runtime.getRuntime().availableProcessors();
        // excel线程池
        THREAD_POOL = new ThreadPoolExecutor(cpuNum,
                cpuNum,
                0L,
                TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(20),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.CallerRunsPolicy());
    }
}    
```

## spring+构造函数

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MarsCoreTestApplication.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
@PropertySource("classpath:application-local.yml")
@Component
public class TestConstructor {

    public TestConstructor() {
        System.out.println("this is constructor");
    }
}
```


