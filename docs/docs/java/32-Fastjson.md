# Fastjson

## 序列化配置

首先，看看`SerializerFeature`源码。

```java
package com.alibaba.fastjson.serializer;

/**
 * @author wenshao[szujobs@hotmail.com]
 */
public enum SerializerFeature {
    QuoteFieldNames,
    /**
     *
     */
    UseSingleQuotes,
    /**
     *
     */
    WriteMapNullValue,
    /**
     * 用枚举toString()值输出
     */
    WriteEnumUsingToString,
    /**
     * 用枚举name()输出
     */
    WriteEnumUsingName,
    /**
     *
     */
    UseISO8601DateFormat,
    /**
     * @since 1.1
     */
    WriteNullListAsEmpty,
    /**
     * @since 1.1
     */
    WriteNullStringAsEmpty,
    /**
     * @since 1.1
     */
    WriteNullNumberAsZero,
    /**
     * @since 1.1
     */
    WriteNullBooleanAsFalse,
    /**
     * @since 1.1
     */
    SkipTransientField,
    /**
     * @since 1.1
     */
    SortField,
    /**
     * @since 1.1.1
     */
    @Deprecated
    WriteTabAsSpecial,
    /**
     * @since 1.1.2
     */
    PrettyFormat,
    /**
     * @since 1.1.2
     */
    WriteClassName,

    /**
     * @since 1.1.6
     */
    DisableCircularReferenceDetect, // 32768

    /**
     * @since 1.1.9
     */
    WriteSlashAsSpecial,

    /**
     * @since 1.1.10
     */
    BrowserCompatible,

    /**
     * @since 1.1.14
     */
    WriteDateUseDateFormat,

    /**
     * @since 1.1.15
     */
    NotWriteRootClassName,

    /**
     * @since 1.1.19
     * @deprecated
     */
    DisableCheckSpecialChar,

    /**
     * @since 1.1.35
     */
    BeanToArray,

    /**
     * @since 1.1.37
     */
    WriteNonStringKeyAsString,

    /**
     * @since 1.1.42
     */
    NotWriteDefaultValue,

    /**
     * @since 1.2.6
     */
    BrowserSecure,

    /**
     * @since 1.2.7
     */
    IgnoreNonFieldGetter,

    /**
     * @since 1.2.9
     */
    WriteNonStringValueAsString,

    /**
     * @since 1.2.11
     */
    IgnoreErrorGetter,

    /**
     * @since 1.2.16
     */
    WriteBigDecimalAsPlain,

    /**
     * @since 1.2.27
     */
    MapSortField;

    public static final SerializerFeature[] EMPTY = new SerializerFeature[0];
    public static final int WRITE_MAP_NULL_FEATURES
            = WriteMapNullValue.getMask()
            | WriteNullBooleanAsFalse.getMask()
            | WriteNullListAsEmpty.getMask()
            | WriteNullNumberAsZero.getMask()
            | WriteNullStringAsEmpty.getMask();
    public final int mask;

    SerializerFeature() {
        mask = (1 << ordinal());
    }

    public static boolean isEnabled(int features, SerializerFeature feature) {
        return (features & feature.mask) != 0;
    }

    public static boolean isEnabled(int features, int fieaturesB, SerializerFeature feature) {
        int mask = feature.mask;

        return (features & mask) != 0 || (fieaturesB & mask) != 0;
    }

    public static int config(int features, SerializerFeature feature, boolean state) {
        if (state) {
            features |= feature.mask;
        } else {
            features &= ~feature.mask;
        }

        return features;
    }

    public static int of(SerializerFeature[] features) {
        if (features == null) {
            return 0;
        }

        int value = 0;

        for (SerializerFeature feature : features) {
            value |= feature.mask;
        }

        return value;
    }

    public final int getMask() {
        return mask;
    }
}
```

源码属性说明

| 名称                             | 含义                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| QuoteFieldNames                | 输出key时是否使用双引号,默认为true                                                                                                                                                                                                                                                                                                                                                                                                                                |
| UseSingleQuotes                | 使用单引号而不是双引号,默认为false                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| WriteMapNullValue              | 是否输出值为null的字段,默认为false                                                                                                                                                                                                                                                                                                                                                                                                                               |
| WriteEnumUsingToString         | Enum输出name()或者original,默认为false                                                                                                                                                                                                                                                                                                                                                                                                                      |
| UseISO8601DateFormat           | Date使用ISO8601格式输出，默认为false                                                                                                                                                                                                                                                                                                                                                                                                                           |
| WriteNullListAsEmpty           | List字段如果为null,输出为[],而非null                                                                                                                                                                                                                                                                                                                                                                                                                           |
| WriteNullStringAsEmpty         | 字符类型字段如果为null,输出为”“,而非null                                                                                                                                                                                                                                                                                                                                                                                                                           |
| WriteNullNumberAsZero          | 数值字段如果为null,输出为0,而非null                                                                                                                                                                                                                                                                                                                                                                                                                              |
| WriteNullBooleanAsFalse        | Boolean字段如果为null,输出为false,而非null                                                                                                                                                                                                                                                                                                                                                                                                                     |
| SkipTransientField             | 如果是true，类中的Get方法对应的Field是transient，序列化时将会被忽略。默认为true                                                                                                                                                                                                                                                                                                                                                                                                 |
| SortField                      | 按字段名称排序后输出。默认为false                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| WriteTabAsSpecial              | 把\t做转义输出，默认为false                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| PrettyFormat                   | 结果是否格式化,默认为false                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| WriteClassName                 | 序列化时写入类型信息，默认为false。反序列化是需用到                                                                                                                                                                                                                                                                                                                                                                                                                         |
| DisableCircularReferenceDetect | 消除对同一对象循环引用的问题，默认为false                                                                                                                                                                                                                                                                                                                                                                                                                              |
| WriteSlashAsSpecial            | 对斜杠’/’进行转义                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| BrowserCompatible              | 将中文都会序列化为\uXXXX格式，字节数会多一些，但是能兼容IE 6，默认为false                                                                                                                                                                                                                                                                                                                                                                                                         |
| WriteDateUseDateFormat         | 全局修改日期格式,默认为false。JSON.DEFFAULT_DATE_FORMAT = “yyyy-MM-dd”;JSON.toJSONString(obj, SerializerFeature.WriteDateUseDateFormat);                                                                                                                                                                                                                                                                                                                         |
| DisableCheckSpecialChar        | 一个对象的字符串属性中如果有特殊字符如双引号，将会在转成json时带有反斜杠转移符。如果不需要转义，可以使用这个属性。默认为false                                                                                                                                                                                                                                                                                                                                                                                  |
| NotWriteRootClassName          |                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| BeanToArray                    | 将对象转为array输出                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| WriteNonStringKeyAsString      | 不是String的字段写为String                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| NotWriteDefaultValue           | 不设默认值                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| BrowserSecure                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| IgnoreNonFieldGetter           | 忽略没有getter方法的属性                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| WriteEnumUsingName             | 目前版本的fastjson默认对enum对象使用WriteEnumUsingName属性，因此会将enum值序列化为其Name。 使用WriteEnumUsingToString方法可以序列化时将Enum转换为toString()的返回值；同时override toString函数能够将enum值输出需要的形式。但是这样做会带来一个问题，对应的反序列化使用的Enum的静态方法valueof可能无法识别自行生成的toString()，导致反序列化出错。 如果将节省enum序列化后的大小，可以将enum序列化其ordinal值，保存为int类型。fastJson在反序列化时，如果值为int，则能够使用ordinal值匹配，找到合适的对象。 fastjson要将enum序列化为ordinal只需要禁止WriteEnumUsingName feature。 首先根据默认的features排除WriteEnumUsingName,然后使用新的features序列化即可。 |

 
