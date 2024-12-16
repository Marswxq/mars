# WebMvcConfigurationSupport

**目录**

[[toc]]

## WebMvc（拦截器等）配置失效

WebMvcConfigurationSupport是WebMvc的配置类，如果在springboot项目中，有配置类继承了WebMvcConfigurationSupport，那么WebMvc的自动配置类WebMvcAutoConfiguration就会失效。

### 失效原因

```java
@Configuration
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class,
		ValidationAutoConfiguration.class })
public class WebMvcAutoConfiguration
```

在WebMvcAutoConfiguration类上面的注解中可以看到有一条注解：

```java
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
```

该注解表示只有当spring的容器中没有装载继承了WebMvcConfigurationSupport类型的bean时，自动配置类才会生效。WebMvc自动配置类中不仅定义了classpath:
/META-INF/resources/，classpath:/resources/，classpath:/static/，classpath:/public/等路径的映射，还定义了配置文件spring.mvc开头的配置信息等。

### 解决方法

如果想要使用自动配置生效，又要按自己的需要重写某些方法，比如增加拦截器。那么将配置类继承WebMvcConfigurationSupport改为实现WebMvcConfigurer接口即可。

## Jackson日期格式化失效

Spring默认使用Jackson作为序列化工具，如果没有任何配置，在序列化接口参数时，解析Date类型参数时就会报错。

### 未使用WebMvcConfigurationSupport的解决方案

增加配置

```yaml
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
```

### 使用WebMvcConfigurationSupport的解决方案

需要重写WMCS的configureMessageConverters()方法

```java
    /**
     * 实现自定义日期格式化
     */
    @Override
    protected void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
        addDefaultHttpMessageConverters(messageConverters);
        for (HttpMessageConverter<?> mc : messageConverters) {
            if (mc instanceof MappingJackson2HttpMessageConverter) {
                MappingJackson2HttpMessageConverter mc1 = (MappingJackson2HttpMessageConverter) mc;
                ObjectMapper objectMapper = mc1.getObjectMapper();
                objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                objectMapper.setDateFormat(new SimpleDateFormat(IfmConstants.DEFAULT_DATE_FORMAT));
            }
            converters.add(mc);
        }
    }

```

## ObjectMapper Bean失效

与Jackson问题一样，WMCS也不会用Spring维护的ObjectMapperBean实例，而是自己创建了一个ObjectMapper。

## DEMO

```java
@Configuration
public class Configurer extends WebMvcConfigurationSupport{
    
    //自定义的一个拦截器
    @Autowired
    HttpInterceptor httpInterceptor;
    
    //定义时间格式转换器
    @Bean
    public MappingJackson2HttpMessageConverter jackson2HttpMessageConverter() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"));
        converter.setObjectMapper(mapper);
        return converter;
    }

    //添加转换器
    //配置springmvc返回数据时 输出数据的格式，这里只配置了时间的输出格式
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        //将我们定义的时间格式转换器添加到转换器列表中,
        //这样jackson格式化时候但凡遇到Date类型就会转换成我们定义的格式
        converters.add(jackson2HttpMessageConverter());
    }

    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        // TODO Auto-generated method stub
        //将我们自定义的拦截器注册到配置中 
        registry.addInterceptor(httpInterceptor).addPathPatterns("/**");
        super.addInterceptors(registry);
    }   
	

	/**
     * 防止@EnableMvc把默认的静态资源路径覆盖了，手动设置的方式
     * 配置了静态资源访问
     * 还能配置视图解析 访问服务器上的资源
     * @param registry
     */
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 解决静态资源无法访问
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
        //配置视图解析，把url中后面带/image/***的路径映射到c盘photo文件中的资源
       	registry.addResourceHandler("/image/**").addResourceLocations("file:C://photo/");
        super.addResourceHandlers(registry);
    }

    //配置服务器跨域请求被允许
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH")
                .allowCredentials(true).maxAge(3600);
    }
}
```
