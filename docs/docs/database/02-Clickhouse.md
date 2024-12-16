# Clickhouse

**目录**

[[toc]]

## 类型对照

| **Java**  | **MySql**                                          | **ClickHouse**                                    | **Oracle**                         | **Hive**  | **Flink Sql**  |
|-----------|----------------------------------------------------|---------------------------------------------------|------------------------------------|-----------|----------------|
| boolean   | boolean  tinyint(1)                                | UInt8                                             | NUMBER(1)                          | boolean   | BOOLEAN        |
| byte      | tinyint                                            | Int8                                              | NUMBER(3,0)                        | tinyint   | TINYINT        |
| short     | smallint tinyint unsigned                          | Int16 uint8                                       | NUMBER(5,0)                        | smallint  | SMALLINT       |
| int       | int mediumint smallint unsigned mediumint unsigned | Int32 uint16                                      | NUMBER(10,0)                       | int       | INT            |
| long      | bigint int unsigned                                | Int64 UInt32 Int128 Int256 uInt64 uInt128 uInt256 | NUMBER(20,0)                       | bigint    | BIGINT         |
| float     | float                                              | Float32                                           | BINARY_FLOAT                       | float     | FLOAT          |
| double    | double                                             | Float64                                           | BINARY_DOUBLE                      | double    | DOUBLE         |
| String    | varchar char text tinytext mediumtext longtext     | String uuid fixedString                           | VARCHAR2 NVARCHAR2 CHAR NCHAR LONG | string    | STRING VARCHAR |
| decimal   | decimal numeric precision                          | Decimal                                           | NUMBER FLOAT                       |           | DECIMAL        |
| date      | date year                                          | Date                                              |                                    |           | DATE           |
| time      | time                                               |                                                   |                                    |           | TIME(0)        |
| timestamp | timestamp datetime                                 | datetime64                                        | date                               | timestamp | TIMESTAMP      |
| byte[]    | blob binary varbinary tinyblob mediumblob longblob |                                                   | RAW                                |           | BYTES          |

## 常见问题

### Q1.java.sql.SQLFeatureNotSupportedException: Transactions are not supported

一般都是clickhouse驱动版本的问题，要么使用版本高了，要么低了

```xml

<dependency>
    <groupId>ru.yandex.clickhouse</groupId>
    <artifactId>clickhouse-jdbc</artifactId>
    <version>0.2.4</version>
</dependency>
```
