# Caffeine本地缓存

> 缓存在日常开发中启动至关重要的作用，由于是存储在内存中，数据的读取速度是非常快的，能大量减少对数据库的访问，减少数据库的压力。相较于Redis，本地缓存无法解决分布式缓存同步问题，但是可以节约网络开销，从而降低时耗。

**目录**

[[toc]]


## 如何实现

1. pom.xml 依赖

`version` 版本跟随 `spring-boot-starter-parent` 父级 `spring-boot-dependencies` 管理的版本。

```pom
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
     <groupId>com.github.ben-manes.caffeine</groupId>
     <artifactId>caffeine</artifactId>
</dependency>
```

2. configuration 配置

```java
@EnableCaching
@Configuration
public class CaffeineConfig {

    /**
     * 方式一 ： 使用 SpringCache 注解方法实现缓存
     *
     * @return
     */
    @Bean("caffeineCacheManager")
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
                                         // 设置最后一次写入或访问后经过固定时间过期
                                         .expireAfterAccess(60, TimeUnit.MINUTES)
                                         // 初始的缓存空间大小
                                         .initialCapacity(100)
                                         // 缓存的最大条数
                                         .maximumSize(1000));
        return cacheManager;
    }

    /**
     * 方式二 ： 使用 Caffeine 方法实现缓存
     *
     * @return
     */
    @Bean("caffeineCache")
    public Cache<String, Object> caffeineCache() {
        return Caffeine.newBuilder()
                       // 设置最后一次写入或访问后经过固定时间过期
                       .expireAfterWrite(60, TimeUnit.SECONDS)
                       // 初始的缓存空间大小
                       .initialCapacity(100)
                       // 缓存的最大条数
                       .maximumSize(1000)
                       .build();
    }
    
}
```

3. Caffeine 参数

    - initialCapacity=[integer]: 相当于配置 `Caffeine.initialCapacity`  初始的缓存空间大小
    - maximumSize=[long]: 相当于配置 `Caffeine.maximumSize` 缓存的最大条数
    - maximumWeight=[long]: 相当于配置 `Caffeine.maximumWeight` 缓存的最大权重
    - expireAfterAccess=[持续时间]: 相当于配置 `Caffeine.expireAfterAccess` 最后一次写入或访问后经过固定时间过期
    - expireAfterWrite=[持续时间]: 相当于配置 `Caffeine.expireAfterWrite` 最后一次写入后经过固定时间过期
    - refreshAfterWrite=[持续时间]: 相当于配置 `Caffeine.refreshAfterWrite` 创建缓存或者最近一次更新缓存后经过固定的时间间隔，刷新缓存
    - weakKeys: 相当于配置 `Caffeine.weakKeys` 打开key的弱引用
    - weakValues: 相当于配置 `Caffeine.weakValues` 打开value的弱引用
    - softValues: 相当于配置 `Caffeine.softValues` 打开value的软引用
    - recordStats: 相当于配置 `Caffeine.recordStats` 开发统计功能

   **注意：**

    - `expireAfterWrite`和`expireAfterAccess`同时存在时，以`expireAfterWrite`为准。
    - `maximumSize`和`maximumWeight`不可以同时使用
    - `weakValues`和`softValues`不可以同时使用

   使用时，请根据项目自身情况和使用场景，决定是否开启软/弱引用。

## 如何使用

使用原生springBoot+mybatisplus+h2环境模拟

1. `User4AutoCacheController` `SpringCache` 注解自动装配

```java
@RestController
@RequestMapping("/web/autoCache")
public class User4AutoCacheController {
    @Resource
    UserService userService;
    @Resource(name="caffeineCacheManager")
    CacheManager cacheManager;

    @GetMapping("/add")
    User addUser(User user) {
        return userService.addUserAutoCache(user);
    }

    @GetMapping("/update")
    User updateUser(User user) {
        return userService.updateUserAutoCache(user);
    }

    @GetMapping("/getUser")
    User getUser(long id) {
        return userService.getUserAutoCache(id);
    }

    @GetMapping("/delUser")
    Integer delUser(long id) {
        return userService.delUserAutoCache(id);
    }

    @GetMapping("/getUsers")
    List<User> getUsers(User user) {
        return userService.getUsersAutoCache(user);
    }

    @GetMapping("/cacheInfos")
    User getCacheInfos(String key){
        key = "cache:auto:user:"+key;
        Cache cache = cacheManager.getCache("caffeineCacheManager") ;
        assert cache != null;
        if(cache.get(key)!=null){
            return (User) Objects.requireNonNull(cache.get(key)).get();
        }else{
            return null;
        }
    }
}
```

2. `User4HandCacheController ` `Caffeine` 方法手动加载

```java
@RestController
@RequestMapping("/web/handCache")
public class User4HandCacheController {
    @Resource
    UserService userService;

    @GetMapping("/add")
    User addUser(User user) {
        return userService.addUser(user);
    }

    @GetMapping("/update")
    User updateUser(User user) {
        return userService.updateUser(user);
    }

    @GetMapping("/getUser")
    User getUser(long id) {
        return userService.getUser(id);
    }

    @GetMapping("/delUser")
    Integer delUser(long id) {
        return userService.delUser(id);
    }

    @GetMapping("/getUsers")
    List<User> getUsers(User user) {
        return userService.getUsers(user);
    }
}
```

3. `UserService ` `UserServiceImpl`

```java
public interface UserService extends IService<User> {

    User addUserAutoCache(User user);

    User updateUserAutoCache(User user);

    User getUserAutoCache(long id);

    Integer delUserAutoCache(long id);

    List<User> getUsersAutoCache(User user);

    User addUser(User user);

    User updateUser(User user);

    User getUser(long id);

    Integer delUser(long id);

    List<User> getUsers(User user);
}
```

```java
@Service
@CacheConfig(cacheNames = "caffeineCacheManager")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Resource(name = "caffeineCache")
    Cache<String, Object> caffeineCache;

    @Override
    @CachePut(key = "'cache:auto:user:'+#user.id", condition = "#user.id != null || #result != null ")
    public User addUserAutoCache(User user) {
        this.getBaseMapper().insert(user);
        return user;
    }

    @Override
    @CachePut(key = "'cache:auto:user:'+#user.id", condition = "#user.id != null || #result !=null ")
    public User updateUserAutoCache(User user) {
        this.getBaseMapper().updateById(user);
        return user;
    }

    @Override
    @Cacheable(key = "'cache:auto:user:'+#id", condition = "#id != null", unless = "#result== null")
    public User getUserAutoCache(long id) {
        return this.baseMapper.selectById(id);
    }

    @Override
    @CacheEvict(key = "'cache:auto:user:'+#id", condition = "#id != null && #result == 1 ")
    public Integer delUserAutoCache(long id) {
        return this.baseMapper.deleteById(id);
    }

    @Override
    @Cacheable(key = "'cache:auto:users:'+#user.id", condition = "#user.id != null", unless = "#result== null || #result.size() == 0 ")
    public List<User> getUsersAutoCache(User user) {
        return this.getBaseMapper().selectList(new QueryWrapper<>(user));
    }

    @Override
    public User addUser(User user) {
        if (this.getBaseMapper().insert(user) > 0) {
            caffeineCache.put("cache:hand:user:" + user.getId(), user);
        }
        return user;
    }

    @Override
    public User updateUser(User user) {
        if (this.getBaseMapper().updateById(user) > 0) {
            caffeineCache.put("cache:hand:user:" + user.getId(), user);
        }
        return user;
    }

    @Override
    public User getUser(long id) {
        User user = (User) caffeineCache.getIfPresent("cache:hand:user:" + id);
        if (user != null) {
            return user;
        }
        user = this.baseMapper.selectById(id);
        if (user != null) {
            caffeineCache.put("cache:hand:user:" + id, user);
        }
        return user;
    }

    @Override
    public Integer delUser(long id) {
        if (this.baseMapper.deleteById(id) == 1) {
            User user = (User) caffeineCache.getIfPresent("cache:hand:user:" + id);
            if (user != null) {
                caffeineCache.invalidate("cache:hand:user:" + id);
            }
            return 1;
        }
        return 0;
    }

    @Override
    public List<User> getUsers(User user) {
        List<User> users = (List<User>) caffeineCache.getIfPresent("cache:hand:users:" + user.getId());
        if (users != null && users.size() > 1) {
            return users;
        }
        users = this.getBaseMapper().selectList(new QueryWrapper<>(user));
        if (users != null && users.size() > 1) {
            caffeineCache.put("cache:hand:users:" + user.getId(), user);
        }
        return users;
    }
}
```

3. `UserMapper`

```java
public interface UserMapper extends BaseMapper<User> {

}
```

4. `User`

```java
@Data
@ToString
public class User {
     private Long id;
     private String name;
     private Integer age;
     private String email;
}
```

5. `data-h2.sql` `schema-h2.sql`

```sql
# data-h2.sql
DELETE FROM user;

INSERT INTO user (id, name, age, email) VALUES
(1, 'neo', 18, 'smile1@ityouknow.com'),
(2, 'keep', 36, 'smile@ityouknow.com'),
(3, 'pure', 28, 'smile@ityouknow.com'),
(4, 'smile', 21, 'smile@ityouknow.com'),
(5, 'it', 24, 'smile@ityouknow.com');
```

```sql
#schema-h2.sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
   id BIGINT(20) NOT NULL COMMENT '主键ID',
   name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
   age INT(11) NULL DEFAULT NULL COMMENT '年龄',
   email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
   PRIMARY KEY (id)
);
```

## 附录

### Caffeine 组件

[Caffeine](https://github.com/ben-manes/caffeine/wiki/Home-zh-CN)是一个基于Java8开发的提供了近乎最佳命中率的高性能的缓存库。并且在
spring5 (springboot 2.x) 后，spring 官方放弃了 Guava，而使用了性能更优秀的 Caffeine 作为默认缓存组件。

缓存和ConcurrentMap有点相似，但还是有所区别。最根本的区别是ConcurrentMap将会持有所有加入到缓存当中的元素，直到它们被从缓存当中手动移除。但是，Caffeine的缓存`Cache`
通常会被配置成自动驱逐缓存中元素，以限制其内存占用。在某些场景下，`LoadingCache`和`AsyncLoadingCache` 因为其自动加载缓存的能力将会变得非常实用。

Caffeine提供了灵活的构造器去创建一个拥有下列特性的缓存：

- [自动加载](https://github.com/ben-manes/caffeine/wiki/Population-zh-CN)元素到缓存当中，异步加载的方式也可供选择
- 当达到最大容量的时候可以使用基于[就近度和频率](https://github.com/ben-manes/caffeine/wiki/Efficiency-zh-CN)的算法进行[基于容量的驱逐](https://github.com/ben-manes/caffeine/wiki/Eviction-zh-CN#基于容量)
- 将根据缓存中的元素上一次访问或者被修改的时间进行[基于过期时间的驱逐](https://github.com/ben-manes/caffeine/wiki/Eviction-zh-CN#基于时间)
- 当向缓存中一个已经过时的元素进行访问的时候将会进行[异步刷新](https://github.com/ben-manes/caffeine/wiki/Refresh-zh-CN)
- key将自动被[弱引用](https://github.com/ben-manes/caffeine/wiki/Eviction-zh-CN#基于引用)所封装
- value将自动被[弱引用或者软引用](https://github.com/ben-manes/caffeine/wiki/Eviction-zh-CN#基于引用)所封装
- 驱逐(或移除)缓存中的元素时将会进行[通知](https://github.com/ben-manes/caffeine/wiki/Removal-zh-CN)
- [写入传播](https://github.com/ben-manes/caffeine/wiki/Writer-zh-CN)到一个外部数据源当中
- 持续计算缓存的访问[统计指标](https://github.com/ben-manes/caffeine/wiki/Statistics-zh-CN)

### Java中四种引用类型

| **引用类型**              | **垃圾回收** | **用途**                                         | **生存时间**   |
|-----------------------|----------|------------------------------------------------|------------|
| 强引用 Strong Reference  | 从来不会     | 对象的一般状态                                        | jvm停止运行时终止 |
| 软引用 Soft Reference    | 在内存不足时   | 对象缓存                                           | 内存不足时终止    |
| 弱引用 Weak Reference    | 在垃圾回收时   | 对象缓存                                           | gc运行后终止    |
| 虚引用 Phantom Reference | 从来不会     | 跟踪对象被垃圾回收器回收的活动，当一个虚引用关联的对象被垃圾收集器回收之前会收到一条系统通知 | jvm停止运行时终止 |
