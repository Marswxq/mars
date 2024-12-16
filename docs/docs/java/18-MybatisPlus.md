# Mybatis-Plus

**目录**

[[toc]]

## 控制台SQL

### 开启打印

```properties
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

### 关闭打印

```properties
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.nologging.NoLoggingImpl
```

## Entity类型转换

### table

```sql
create table type_handler
(
    id          varchar(32)  not null
        primary key,
    type_name   varchar(100) null,
    type_code   varchar(32)  null,
    type_arr    varchar(100) null,
    type_json   json         null,
    type_list   longtext     null,
    vali_flag   varchar(1)   null,
    remark      text         null,
    create_time datetime     null,
    creator     varchar(100) null,
    update_time datetime     null,
    opreator    varchar(100) null
);
```

### ToTypeHandler

```java
public class ToTypeHandler extends JacksonTypeHandler {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public ToTypeHandler(Class<?> type) {
        super(type);
    }

    @Override
    protected Object parse(String json) {
        try {
            return objectMapper.readValue(json, new TypeReference<List<TypeHandlerTo>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
```

### entity

**注意：**

- 实体类@TableName注解添加`autoResultMap = true`
- 属性 @TableField注解指定`typeHandler = ToTypeHandler.class` , 默认类型指定`typeHandler = JacksonTypeHandler.class`

```java
@Data
@EqualsAndHashCode(callSuper = false)
@TableName(value = "type_handler", autoResultMap = true)
public class TypeHandlerEntity extends AbstractEntity {


    private static final long serialVersionUID = 7265137797452149819L;
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private String id;

    private String typeName;

    private String typeCode;

    @TableField(typeHandler = JacksonTypeHandler.class)
    private String[] typeArr;

    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, Object> typeJson;

    @TableField(typeHandler = ToTypeHandler.class)
    private List<TypeHandlerTo> typeList;

}
```

