# BeanPostProcessor

**目录**

[[toc]]

## 源码说明

> Factory hook that allows for custom modification of new bean instances — for example, checking for marker interfaces
> or wrapping beans with proxies.
> Typically, post-processors that populate beans via marker interfaces or the like will implement
> postProcessBeforeInitialization, while post-processors that wrap beans with proxies will normally implement
> postProcessAfterInitialization.

源码大致意思是，`BeanPostProcessor`
是一个bean后置处理器，它允许对新的Bean实例进行自定义修改。例如，检查标记接口或使用代理包装Bean。通常通过标记接口等填充Bean的后处理器将实现`postProcessBeforeInitialization`
，而使用代理包装Bean的后处理器通常会实现`postProcessAfterInitialization`。

## 拦截自定义注解

```java
@Component
public class TestBeanPostProcessor implements BeanPostProcessor {

    @Retention(RetentionPolicy.RUNTIME)
    public @interface TestAnnonation{

    }


    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        return BeanPostProcessor.super.postProcessBeforeInitialization(bean, beanName);
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        Class<?> beanClazz = bean.getClass();
        TestAnnonation ta = beanClazz.getAnnotation(TestAnnonation.class);
        if(ta !=null){
            System.out.println("this is ta annonation");
        }
        return BeanPostProcessor.super.postProcessAfterInitialization(bean, beanName);
    }
}
```