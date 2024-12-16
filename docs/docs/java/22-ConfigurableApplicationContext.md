# ConfigurableApplicationContext

**目录**

[[toc]]

## 手动注册spring实例

```java
@Component
public class TestConfigurableApplicationContext {

    private interface TestBean {
        void test();
    }

    private class TestBeanImpl implements TestBean {

        @Override
        public void test() {
            System.out.println("this is test method");
        }
    }

    private final ConfigurableApplicationContext context;

    public TestConfigurableApplicationContext(ConfigurableApplicationContext context) {
        this.context = context;
    }

    @PostConstruct
    public void registerBean() {
        TestBean testBean = new TestBeanImpl();
        context.getBeanFactory().registerSingleton("testBean", testBean);
    }
}
```

