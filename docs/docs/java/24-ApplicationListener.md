# ApplicationListener

> Spring的Enent机制。相当于Spring提供的观察者模式。

**目录**

[[toc]]

## 原理分析

Spring的事件发布与监听主要由3部分组成。

- 事件：ApplicationEvent
- 发布器：ApplicationEventPublisher
- 监听：ApplicationListener

<img :src="$withBase('/images/java/springpublisher.png')" alt="springpublisher">  

## 事件

定义一个统一的事件（理解为基类），用于扩展事件

```java
@Getter
@Setter
public class MarsAppicationEvent extends ApplicationEvent implements Serializable {

    private static final long serialVersionUID = -8965489051151591696L;
    private MarsEvent marsEvent;

    public MarsAppicationEvent(Object source, MarsEvent marsEvent) {
        super(source);
        this.marsEvent = marsEvent;
    }

    public static MarsAppicationEvent of(Object source, MarsEvent marsEvent) {
        return new MarsAppicationEvent(source, marsEvent);
    }

}
```

事件这里定义了一个监听器接口，纯粹是为了业务扩展

```java
public interface MarsEvent extends Serializable, Runnable {

    default String getBusinessId() {
        return null;
    }

    default MarsEventType getEventType() {
        return MarsEventTypeEnum.BUSINESS;
    }
}

```

监听器接口中使用的事件类型接口和枚举实现

```java
public interface MarsEventType {

    String getEventType();
}

@Getter
@AllArgsConstructor
public enum MarsEventTypeEnum implements MarsEventType {

    BUSINESS("business");


    private final String eventType;

}

```

## 发布器

使用Spring的`ApplicationEventPublisher`接口发布事件。

说明：`ApplicationEventPublisher`是`ApplicationContext`
的父接口，所以这里直接使用注入方式，获取Spring提供的实例。定义为`static`纯粹是为了使用方便（习惯而已）。

```java
@Component
public class MarsApplicationPubliser {

    private static ApplicationEventPublisher staticApplicationEventPublisher;

    public MarsApplicationPubliser(ApplicationEventPublisher applicationEventPublisher) {
        this.staticApplicationEventPublisher = applicationEventPublisher;
    }

    public static void publish(MarsAppicationEvent event){
        staticApplicationEventPublisher.publishEvent(event);
    }

}
```

## 监听

事件监听可以通过`ApplicationListener`接口或者`@EventListener`注解方式来实现。

### ApplicationListener
```java
@Slf4j
@Component
public class MarsApplicationListener implements ApplicationListener<MarsAppicationEvent> {

    /**
     * Handle an application event.
     *
     * @param event the event to respond to
     */
    @Override
    public void onApplicationEvent(@NonNull MarsAppicationEvent event) {
        log.info("监听到 {}", event);
        MarsEvent listener = event.getMarsEvent();
        listener.run();
    }
}
```

### @EventListener

```java
@Slf4j
@Component
public class MarsApplicationListener implements ApplicationListener<MarsAppicationEvent> {

    /**
     * Handle an application event.
     *
     * @param event the event to respond to
     */
    @Override
    public void onApplicationEvent(@NonNull MarsAppicationEvent event) {
        log.info("监听到 {}", event);
        MarsEvent listener = event.getMarsEvent();
        listener.run();
    }
}
```








