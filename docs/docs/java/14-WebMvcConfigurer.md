# WebMvcConfigurer

从EnableWebMvcConfiguration配置类开始,当它注入时父类会注入Spring容器中所有的WebMvcConfigurer类。
WebMvcAutoConfiguration中EnableWebMvcConfiguration实现类

```java
/**
 * Configuration equivalent to {@code @EnableWebMvc}.
 */
@Configuration
public static class EnableWebMvcConfiguration extends DelegatingWebMvcConfiguration {

    private final WebMvcProperties mvcProperties;

    private final ListableBeanFactory beanFactory;

    private final WebMvcRegistrations mvcRegistrations;

    public EnableWebMvcConfiguration(
            ObjectProvider<WebMvcProperties> mvcPropertiesProvider,
            ObjectProvider<WebMvcRegistrations> mvcRegistrationsProvider,
            ListableBeanFactory beanFactory) {
        this.mvcProperties = mvcPropertiesProvider.getIfAvailable();
        this.mvcRegistrations = mvcRegistrationsProvider.getIfUnique();
        this.beanFactory = beanFactory;
    }

    @Bean
    @Override
    public RequestMappingHandlerAdapter requestMappingHandlerAdapter() {
        RequestMappingHandlerAdapter adapter = super.requestMappingHandlerAdapter();
        adapter.setIgnoreDefaultModelOnRedirect(this.mvcProperties == null
                || this.mvcProperties.isIgnoreDefaultModelOnRedirect());
        return adapter;
    }

    @Override
    protected RequestMappingHandlerAdapter createRequestMappingHandlerAdapter() {
        if (this.mvcRegistrations != null
                && this.mvcRegistrations.getRequestMappingHandlerAdapter() != null) {
            return this.mvcRegistrations.getRequestMappingHandlerAdapter();
        }
        return super.createRequestMappingHandlerAdapter();
    }

    @Bean
    @Primary
    @Override
    public RequestMappingHandlerMapping requestMappingHandlerMapping() {
        // Must be @Primary for MvcUriComponentsBuilder to work
        return super.requestMappingHandlerMapping();
    }

    @Bean
    @Override
    public FormattingConversionService mvcConversionService() {
        WebConversionService conversionService = new WebConversionService(
                this.mvcProperties.getDateFormat());
        addFormatters(conversionService);
        return conversionService;
    }

    @Bean
    @Override
    public Validator mvcValidator() {
        if (!ClassUtils.isPresent("javax.validation.Validator",
                getClass().getClassLoader())) {
            return super.mvcValidator();
        }
        return ValidatorAdapter.get(getApplicationContext(), getValidator());
    }

    @Override
    protected RequestMappingHandlerMapping createRequestMappingHandlerMapping() {
        if (this.mvcRegistrations != null
                && this.mvcRegistrations.getRequestMappingHandlerMapping() != null) {
            return this.mvcRegistrations.getRequestMappingHandlerMapping();
        }
        return super.createRequestMappingHandlerMapping();
    }

    @Override
    protected ConfigurableWebBindingInitializer getConfigurableWebBindingInitializer() {
        try {
            return this.beanFactory.getBean(ConfigurableWebBindingInitializer.class);
        }
        catch (NoSuchBeanDefinitionException ex) {
            return super.getConfigurableWebBindingInitializer();
        }
    }

    @Override
    protected ExceptionHandlerExceptionResolver createExceptionHandlerExceptionResolver() {
        if (this.mvcRegistrations != null && this.mvcRegistrations
                .getExceptionHandlerExceptionResolver() != null) {
            return this.mvcRegistrations.getExceptionHandlerExceptionResolver();
        }
        return super.createExceptionHandlerExceptionResolver();
    }

    @Override
    protected void configureHandlerExceptionResolvers(
            List<HandlerExceptionResolver> exceptionResolvers) {
        super.configureHandlerExceptionResolvers(exceptionResolvers);
        if (exceptionResolvers.isEmpty()) {
            addDefaultHandlerExceptionResolvers(exceptionResolvers);
        }
        if (this.mvcProperties.isLogResolvedException()) {
            for (HandlerExceptionResolver resolver : exceptionResolvers) {
                if (resolver instanceof AbstractHandlerExceptionResolver) {
                    ((AbstractHandlerExceptionResolver) resolver)
                            .setWarnLogCategory(resolver.getClass().getName());
                }
            }
        }
    }

    @Bean
    @Override
    public ContentNegotiationManager mvcContentNegotiationManager() {
        ContentNegotiationManager manager = super.mvcContentNegotiationManager();
        List<ContentNegotiationStrategy> strategies = manager.getStrategies();
        ListIterator<ContentNegotiationStrategy> iterator = strategies.listIterator();
        while (iterator.hasNext()) {
            ContentNegotiationStrategy strategy = iterator.next();
            if (strategy instanceof PathExtensionContentNegotiationStrategy) {
                iterator.set(new OptionalPathExtensionContentNegotiationStrategy(
                        strategy));
            }
        }
        return manager;
    }

}
```

接着注入RequestMappingHandlerAdapter Bean 它会调用父类的requestMappingHandlerAdapter方法

```java
@Bean
@Override
public RequestMappingHandlerAdapter requestMappingHandlerAdapter() {
    RequestMappingHandlerAdapter adapter = super.requestMappingHandlerAdapter();
    adapter.setIgnoreDefaultModelOnRedirect(this.mvcProperties == null
            || this.mvcProperties.isIgnoreDefaultModelOnRedirect());
    return adapter;
}
```

```java
@Bean
public RequestMappingHandlerAdapter requestMappingHandlerAdapter() {
    RequestMappingHandlerAdapter adapter = createRequestMappingHandlerAdapter();
    adapter.setContentNegotiationManager(mvcContentNegotiationManager());
    adapter.setMessageConverters(getMessageConverters());
    adapter.setWebBindingInitializer(getConfigurableWebBindingInitializer());
    adapter.setCustomArgumentResolvers(getArgumentResolvers());
    adapter.setCustomReturnValueHandlers(getReturnValueHandlers());

    if (jackson2Present) {
        adapter.setRequestBodyAdvice(Collections.singletonList(new JsonViewRequestBodyAdvice()));
        adapter.setResponseBodyAdvice(Collections.singletonList(new JsonViewResponseBodyAdvice()));
    }

    AsyncSupportConfigurer configurer = new AsyncSupportConfigurer();
    configureAsyncSupport(configurer);
    if (configurer.getTaskExecutor() != null) {
        adapter.setTaskExecutor(configurer.getTaskExecutor());
    }
    if (configurer.getTimeout() != null) {
        adapter.setAsyncRequestTimeout(configurer.getTimeout());
    }
    adapter.setCallableInterceptors(configurer.getCallableInterceptors());
    adapter.setDeferredResultInterceptors(configurer.getDeferredResultInterceptors());

    return adapter;
}
```

这个时候获取配置,例如自定义了返回结果Handler,
WebMvcConfigurerComposite会遍历调用WebMvcConfigurer实现类，addReturnValueHandlers方法,会把自定义配置加载到默认的配置中

```java
@Override
public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> returnValueHandlers) {
    for (WebMvcConfigurer delegate : this.delegates) {
        delegate.addReturnValueHandlers(returnValueHandlers);
    }
}
```

## http访问服务器文件路径

配置WebMvcConfigurer，添加服务器文件路径

```java
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/file/**")
                .addResourceLocations("file:d:/tmp/");
    }
```

浏览器访问：http://localhost:port/context/file/xxxx.xx
