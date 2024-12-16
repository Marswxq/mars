# 动态数据源

**目录**

[[toc]]

## 实现原理

通过 Spring-jdbc 提供的 `AbstractRoutingDataSource ` 抽象一个 `RoutingDataSource` 实现动态切换数据源。

<img :src="$withBase('/images/java/DynamicDatasource.png')" alt="动态数据源切换">

## 如何实现

1.   创建 `RoutingDataSource` ，实现数据源唯一标识的动态切换。

```java
public class RoutingDataSource extends AbstractRoutingDataSource {
    /**
     * 重写方法，由此方法的返回值决定具体从哪个数据源中获取连接
     */
    @Override
    protected Object determineCurrentLookupKey() {
        return DataSourceContextHolder.getDataSource();
    }
}
```

2.   创建 `DataSourceContextHolder` ，获取数据源唯一标识

```java
@Slf4j
public class DataSourceContextHolder {
    // 记录每个线程需要使用的数据源关键字
    private static ThreadLocal<String> DATASOURCE_CONTEXT = new ThreadLocal<>();

    public static void switchDataSource(String datasource) {
        log.debug("switchDataSource: {}", datasource);
        DATASOURCE_CONTEXT.set(datasource);
    }

    public static String getDataSource() {
        return DATASOURCE_CONTEXT.get();
    }
    
    /**
     * 清理数据源，避免ThreadLocal带来的内存泄露
     */
    public static void clear() {
        DATASOURCE_CONTEXT.remove();
    }
}
```

3.   创建自定义注解 `@DataSource`

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface DataSource {
    String ds() ;
}
```

4.   创建切面 `DatasourceAspect` 实现数据源切换

```java
@Aspect
@Order(Ordered.HIGHEST_PRECEDENCE)
@Component
public class DatasourceAspect {

    @Pointcut("@annotation(xxx.anotation.DataSource)")
    public void pointcut() {
    }

    @Before("pointcut()")
    public void beforeExecute(JoinPoint joinPoint) {
        Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
        DataSource annotation = method.getAnnotation(DataSource.class);
        if (null == annotation) {
            annotation = joinPoint.getTarget().getClass().getAnnotation(DataSource.class);
        }
        if (null != annotation) {
            // 切换数据源
            DataSourceContextHolder.switchDataSource(annotation.ds());
        }
    }

    @After("pointcut()")
    public void afterExecute() {
        DataSourceContextHolder.clear();
    }
}
```

## 总结&注意

-   通过重写 `AbstractRoutingDataSource` 的 `determineCurrentLookupKey()`  方法，实现数据源切换
-   通过自定义注解+切面，实现方法数据源指定
-   事务管理依然通过 `transactionManager `管理，不需要额外控制
-   如需管理特定路径（使用切面处理特定路径下的所有BO），修改切面 `Pointcut ` 作用域即可
-   多数据源之间事务随着数据源走，同一个数据源内事务一致

## 附录

### AbstractRoutingDataSource主要源码分析

```java
public abstract class AbstractRoutingDataSource extends AbstractDataSource implements InitializingBean {
    /**
     * 数据源map，存放所有目标数据源，key作为数据源唯一标识
     */
    @Nullable
    private Map<Object, Object> targetDataSources;
    
    /**
     * 默认数据源-主数据源
     */
    @Nullable
    private Object defaultTargetDataSource;
    
    public void setTargetDataSources(Map<Object, Object> targetDataSources) {
       this.targetDataSources = targetDataSources;
    }
    
    public void setDefaultTargetDataSource(Object defaultTargetDataSource) {
       this.defaultTargetDataSource = defaultTargetDataSource;
    }
    
    /**
     * mybatis等orm框架在执行sql前调用
     */
    @Override
    public Connection getConnection() throws SQLException {
       return determineTargetDataSource().getConnection();
    }
    
    /**
     * mybatis等orm框架在执行sql前调用
     */
    @Override
    public Connection getConnection(String username, String password) throws SQLException {
       return determineTargetDataSource().getConnection(username, password);
    }
    
    /**
     * 获取connection时调用，获取Datasource，实现动态切换数据源的关键
     */
    protected DataSource determineTargetDataSource() {
       Assert.notNull(this.resolvedDataSources, "DataSource router not initialized");
       // 动态切换数据源的核心实现
       Object lookupKey = determineCurrentLookupKey();
       DataSource dataSource = this.resolvedDataSources.get(lookupKey);
       if (dataSource == null && (this.lenientFallback || lookupKey == null)) {
          dataSource = this.resolvedDefaultDataSource;
       }
       if (dataSource == null) {
          throw new IllegalStateException("Cannot determine target DataSource for lookup key [" + lookupKey + "]");
       }
       return dataSource;
    }
    
    /**
     * 数据源的唯一标识，提供了抽象方法，通过重写此方法实现动态切换数据源
     */
    @Nullable
    protected abstract Object determineCurrentLookupKey();
} 
```

### Mybatis是如何操作数据库的

[MyBatis的工作原理以及核心流程介绍 - MyBatis中文官网](http://www.mybatis.cn/archives/706.html)

>   MyBatis 的工作原理如下图所示
>
>   <img :src="$withBase('/images/java/mybatis.png')" alt="mybatis工作原理">

[SqlSessionFactory - MyBatis中文官网](http://www.mybatis.cn/archives/27.html)

>   1.   SqlSessionFactory 简介
>
>   SqlSessionFactory 是 MyBatis 中的一个重要的对象，它是用来创建 SqlSession 对象的，而 SqlSession 用来操作数据库的。
>
>   2.   SqlSessionFactory 生成
>
>   SqlSessionFactory 对象可以通过 SqlSessionFactoryBuilder 来获得，而 SqlSessionFactoryBuildr 则可以从 XML 配置文件或预先定制的 Configuration 实例构建出 SqlSessionFactory 的实例。
>
>   SqlSessionFactory 是线程安全的，它一旦被创建，在程序运行期间均会存在。在程序运行期间不要重复创建多次，建议使用单例模式。
>
>   3.   SqlSessionFactory 的常用方法
>
>   SqlSessionFactory 主要用于创建 SqlSession ，一般是从 Connection 或者 DataSource 中创建。
>
>   ```java
>   public interface SqlSessionFactory {
>   
>     SqlSession openSession();
>   
>     SqlSession openSession(boolean autoCommit);
>     SqlSession openSession(Connection connection);
>     SqlSession openSession(TransactionIsolationLevel level);
>   
>     SqlSession openSession(ExecutorType execType);
>     SqlSession openSession(ExecutorType execType, boolean autoCommit);
>     SqlSession openSession(ExecutorType execType, TransactionIsolationLevel level);
>     SqlSession openSession(ExecutorType execType, Connection connection);
>   
>     Configuration getConfiguration();
>   
>   }
>   ```

[SqlSessionFactoryBean - MyBatis中文官网](http://www.mybatis.cn/archives/859.html)

>在基础的 MyBatis 用法中，是通过 SqlSessionFactoryBuilder 来创建 SqlSessionFactory 的，而在 MyBatis-Spring 中，则使用 SqlSessionFactoryBean 来创建。要创建工厂 bean，将下面的代码放到 Spring 的 XML 配置文件中：
>
>```xml
><bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
>  <property name="dataSource" ref="dataSource" />
></bean>
>```
>
>需要注意的是 SqlSessionFactoryBean 实现了 Spring 的 FactoryBean 接口。这意味着由 Spring 最终创建的 bean 并不是 SqlSessionFactoryBean 本身，而是工厂类（SqlSessionFactoryBean）的 getObject() 方法的返回结果。这种情况下，Spring 将会在应用启动时为你创建 SqlSessionFactory，并使用 sqlSessionFactory 这个名字存储起来。等效的 Java 代码如下：
>
>```java
>@Bean
>public SqlSessionFactory sqlSessionFactory() {
>  SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
>  factoryBean.setDataSource(dataSource());
>  return factoryBean.getObject();
>}
>```
>
>通常，在 MyBatis-Spring 中，你不需要直接使用 SqlSessionFactoryBean 或对应的 SqlSessionFactory。因为 session 的工厂 bean 将会被注入到 MapperFactoryBean 或其它继承于 SqlSessionDaoSupport 的 DAO（Data Access Object，数据访问对象）中。假设你定义了一个如下的 mapper 接口：
>
>```java
>public interface UserMapper {
>  @Select("SELECT * FROM users WHERE id = #{userId}")
>  User getUser(@Param("userId") String userId);
>}
>```
>
>那么可以通过 MapperFactoryBean 将接口加入到 Spring 中:
>
>```xml
><bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
>  <property name="mapperInterface" value="org.mybatis.spring.sample.mapper.UserMapper" />
>  <property name="sqlSessionFactory" ref="sqlSessionFactory" />
></bean>
>```
>
>配置好之后，你就可以像 Spring 中普通的 Bean 注入方法那样，将映射器注入到你的业务或服务对象中。MapperFactoryBean 将会负责 SqlSession 的创建和关闭。如果使用了 Spring 的事务功能，那么当事务完成时，Session 将会被提交或回滚。最终任何异常都会被转换成 Spring 的 DataAccessException 异常。
