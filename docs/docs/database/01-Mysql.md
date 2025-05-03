# Mysql

**目录**

[[toc]]

## MYSQL常用jdbc参数配置说明

| 参数名称                    | 参数说明                                                            | 缺省值                                                                                                                                | 最低版本要求 |
|-------------------------|-----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|--------|
| useUnicode              | 是否使用Unicode字符集，如果参数characterEncoding设置为gb2312或gbk，本参数值必须设置为true | false                                                                                                                              | 1.1g   |
| characterEncoding       | 当useUnicode设置为true时，指定字符编码。比如可设置为gb2312或gbk                     | false                                                                                                                              | 1.1g   |
| autoReconnect           | 当数据库连接异常中断时，是否自动重新连接                                            | false                                                                                                                              | 1.1    |
| autoReconnectForPools   | 是否使用针对数据库连接池的重连策略                                               | false                                                                                                                              | 3.1.3  |
| failOverReadOnly        | 自动重连成功后，连接是否设置为只读                                               | true                                                                                                                               | 3.0.12 |
| maxReconnects           | autoReconnect设置为true时，重试连接的次数                                   | 3                                                                                                                                  | 1.1    |
| initialTimeout          | autoReconnect设置为true时，两次重连之间的时间间隔，单位：秒                          | 2                                                                                                                                  | 1.1    |
| connectTimeout          | 和数据库服务器建立socket连接时的超时，单位：毫秒。 0表示永不超时，适用于JDK 1.4及更高版本            | 0                                                                                                                                  | 3.0.1  |
| socketTimeout           | socket操作（读写）超时，单位：毫秒。 0表示永不超时                                   | 0                                                                                                                                  | 3.0.1  |
| serverTimezone          | 覆盖时区的检测/映射。当服务器的时区未映射到Java时区时使用                                 |                                                                                                                                    | 3.0.2  |
| allowMultiQueries       | 可以在sql语句后携带分号，实现多语句执行。（可以使得sql语句中有多个insert或者update语句）           |                                                                                                                                    |        |
| nullCatalogMeansCurrent | 指定库涉及表(true:jdbcurl中指定的数据库，false:mysql下全部的库;默认值根据mysql驱动版本认定)   | 从mysql-connector-java 5.x 版本起，nullCatalogMeansCurrent 属性由原来的默认true改为了false。6.0之后 nullCatalogMeansCurrent 默认又改为true。8.0后默认又改为false。 |        |

## 命令行

### 连接格式

```bash
mysql -h主机地址 -u用户名 -p用户密码 -P端口
```

### 登录本地mysql

```bash
mysql -uroot –p 
```

### 登录本地mysql并执行sql

```bash
mysql -u root -p"Mysql1234%^&*" -e "show variables like '%datadir%';"
```

### 登录远程mysql并执行sql脚本

```bash
mysql -h远程服务器地址 –u用户名 –p密码 –D数据库<sql脚本文件路径
```

## 初始密码

```bash
grep 'temporary password' /var/log/mysqld.log
```

## 修改密码（不知旧密码）

my.cnf，Linux下默认路径为/etc/my.cnf

```bash
[mysqld]#下添加
 skip-grant-tables=1 #不用验证MySQL修改密码
```

- 方式1 mysqladmin

```bash
mysqladmin -u 用户名 -p 旧密码 password 新密码
mysqladmin -uroot -p"1234%^&*" password "Mysql1234%^&*"
```

- 方式2 SET PASSWORD

```bash
set password for 用户名@localhost = password('新密码');
set password for root@localhost = password('Mysql%^&*1234');
```

- 方式3用UPDATE直接编辑user表（Mysql5.7之前）

```bash
use mysql; 
update user set password=password('Mysql1234%^&*') where user='root' and host='localhost'; 
flush privileges;
```

- 方式4 ALTER

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Mysql%^&*1234';
```

## 远程主机访问授权

- 允许任何主机远程连接访问

```sql
grant ALL PRIVILEGES ON *.* TO root@'%' identified by "123456";
grant select on 数据库.* to 用户名@'%' identified by “密码”;
grant * on hsf_hibiz.* to hsa_admin@'%' Identified by 'abc' WITH GRANT OPTION; 
grant select,insert,update,delete on *.* to hsa_admin@'%' Identified by 'abc';
```

- 只允许本机连接访问

```sql
grant select on 数据库.* to 用户名@登录主机 identified by “密码”;
grant select,insert,update,delete on hsf_hibiz.* to hsa_admin@localhost identified by “hsa_admin”;
```

## 查看Server版本

```sql
Select version();
```

## 查看数据存储路径

```sql
show variables like '%datadir%'; 
```

## 启动关闭

- 启动服务

```bash
service mysql start
systemctl start mysqld.service
```

- 关闭服务

```bash
service mysql stop
systemctl stop mysqld.service
```

- 重启服务

```bash
service mysql restart
systemctl restart mysqld.service
```

## 遇到锁表快速解决办法

### 当前出现的锁

```sql
SELECT * FROM information_schema.INNODB_LOCKs;
```

### 锁等待的对应关系

```sql
SELECT * FROM information_schema.INNODB_LOCK_waits;
```

### 当前运行的所有事务

```sql
SELECT * FROM information_schema.INNODB_TRX;
```

### 批量删除事务表中的事务

通过information_schema.processlist表中的连接信息生成需要处理掉的MySQL连接的语句临时文件，然后执行临时文件中生成的指令。

```sql
SELECT concat('KILL ',id,';') FROM information_schema.processlist p INNER JOIN  information_schema.INNODB_TRX x ON p.id=x.trx_mysql_thread_id WHERE db='test';

```

### 查看表锁情况

```sql
SHOW GLOBAL STATUS LIKE 'table_locks%';
+-----------------------+-------+
| Variable_name         | Value |
+-----------------------+-------+
| Table_locks_immediate | 90    |
| Table_locks_waited    | 0     |
+-----------------------+-------+
```

- Table_locks_immediate 立即获得表锁请求的次数
- Table_locks_waited 无法立即获得对表锁的请求的次数，需要等待。这个值过高说明性能可能出现了问题，并影响连接的释放

## GROUP_CONCAT

### 基本语法

```sql
GROUP_CONCAT([DISTINCT] column_name [,column_name ...]
             [ORDER BY {unsigned_integer | col_name | expr}
             [ASC | DESC] [SEPARATOR 'separator_string']])
```

* DISTINCT: 可选参数，用于去除重复值。
* column_name: 要连接的列名，可以是多个。
* ORDER BY: 可选参数，用于指定结果排序的方式。
* SEPARATOR: 可选参数，用于指定分隔符，默认为逗号 ,。

### 长度限制

`GROUP_CONCAT()`的结果长度受限于系统变量`group_concat_max_len`
，默认值为1024字节。若需增加限制，可执行 `SET group_concat_max_len = 新长度`

## Timeout详细解析

```sql
show variables like ‘%timeout%’ ;
```

## mysql性能

### mysqld.cnf

```properties
[mysqld]
pid-file	= /var/run/mysqld/mysqld.pid
socket		= /var/run/mysqld/mysqld.sock
datadir		= /var/lib/mysql
symbolic-links=0
#数据库允许的最大连接数
max_connections=1000
#控制一个数据包发送的任何参数的最大大小
max_allowed_packet=200M
#控制是否需要进行域名解析来获取客户端的主机名
skip-name-resolve
#用于缓存Innodb存储引擎表的数据、索引等的最大缓存区大小，是数据库性能影响最大的一个参数
innodb_buffer_pool_size=16G
#Mysql读入缓冲区大小，对表进行顺序扫描的请求将分配一个读入缓冲区
read_buffer_size=4M
#用于存放join查询中间结果的缓存大小
join_buffer_size=8M
#用于存放排序数据的缓存大小，超过这个大小就会使用文件排序
sort_buffer_size=8M
# Mysql 随机 Query 缓冲区大小，当按任意顺序读取行时，将分配一个随机读取缓冲区。如进行排序查询时，Mysql 会首先扫描该缓冲，避免磁盘搜索，提高查询速度（ 默认 256K ，该缓冲也是为每线程分配 ）
read_rnd_buffer_size=4M
#临时表大小
tmp_table_size=32M
myisam_sort_buffer_size=32M
key_buffer_size=128M
```

## 常用语句

### 显示所有数据库

```sql
show databases
```

### 选定某个数据库

```sql
use dbname
```

### 显示某个库中的所有表

```sql
SHOW TABLES [FROM db_name] 
```

### 查看表结构

```sql
desc table
```

### 查看建表SQL

```sql
SHOW CREATE TABLE tbl_name
```

### 查看表索引

```sql
SHOW INDEX FROM tbl_name [FROM db_name] 
```

### 查看表主键

```sql
show keys from tblname;
```

### 查看超时时间

```sql
show variables like '%timeout%';
```

### 查看慢sql是否开启

```sql
mysql> show variables like '%slow%';  
+------------------+-------+  
| Variable_name    | Value |  
+------------------+-------+  
| log_slow_queries | OFF   |  
| slow_launch_time | 2     |  
+------------------+-------+  
mysql> show global status like '%slow%';  
+---------------------+-------+  
| Variable_name       | Value |  
+---------------------+-------+  
| Slow_launch_threads | 0     |  
| Slow_queries        | 279   |  
+---------------------+-------+ 
```

配置中关闭了记录慢查询（最好是打开，方便优化），超过2秒即为慢查询，一共有279条慢查询

### 列出用户正在运行的线程

```sql
SHOW PROCESSLIST
```

### 列出某用户权限

```sql
SHOW GRANTS FOR user
```

### 列出 MySQL 系统环境变量

```sql
SHOW VARIABLES
```

### 列出线程情况

```sql
SHOW STATUS LIKE  'Threads%';
+-------------------+--------+
| Variable_name     | Value  |
+-------------------+--------+
| Threads_cached    | 1      | 
| Threads_connected | 217    |
| Threads_created   | 29     |
| Threads_running   | 88     |
+-------------------+--------+

SHOW VARIABLES LIKE 'thread_cache_size';
+-------------------+-------+
| Variable_name     | Value |
+-------------------+-------+
| thread_cache_size | 10    |
+-------------------+-------+
```

- Threads_cached 线程在缓存中的数量
- Threads_connected 当前打开的连接数
- Threads_created 创建用于处理连接的线程数。
- Threads_running 未休眠的线程数

**注意**：如果Threads_created大，则可能要增加thread_cache_size值。缓存未命中率可以计算为Threads_created / Connections

### 列出总连接数

```sql
SHOW VARIABLES LIKE "max_connections" ; 
```

### 列出单个用户的连接数最大值，即并发值

```sql
SHOW VARIABLES LIKE 'max_user_connections';
```

### 列出 DB Server 状态

```sql
SHOW STATUS
```

### 列出字段完整属性

```sql
SHOW FULL FIELDS FROM tbl_name [FROM db_name]
```

### 列出字段及详情

```sql
SHOW FULL COLUMNS FROM tbl_name [FROM db_name]
```

### 列出资料表字段

```sql
SHOW COLUMNS FROM tbl_name [FROM db_name]
```

### 列出数据表及表状态信息

```sql
SHOW TABLE STATUS [FROM db_name]
```

### 开启/关闭失去了记录日志

```sql
SET GLOBAL log_output = 'TABLE';
SET GLOBAL general_log = 'OFF';
```

### 查看执行sql

```sql
select * from mysql.general_log 
```

### 查看数据库容量

```sql
SELECT
	table_schema AS '数据库',
	sum( table_rows ) AS '记录数',
	sum(TRUNCATE ( data_length / 1024 / 1024, 2 )) AS '数据容量(MB)',
	sum(TRUNCATE ( index_length / 1024 / 1024, 2 )) AS '索引容量(MB)' 
FROM
	information_schema.TABLES 
GROUP BY
	table_schema 
ORDER BY
	sum( data_length ) DESC,
	sum( index_length ) DESC;
```

### 服务器执行sql

```sql
[root@localhost ~]# for i in {3..1024};do mysql -h 172.20.0.124 -P2883 -u dr_write@yh_02#hndsj_yh  -p'1h5.Y0lTjr_E0nGhJl' -e "update /*+ PARALLEL(16),READ_CONSISTENCY(WEAK),query_timeout(10000000000) */ setlcent_clc_db.psn_trt_info_d partition (p$i) set vali_flag = '0' where PSN_SETL_CUM_SN in(select PSN_SETL_CUM_SN from data_mid_02_db.PSN_SETL_CUM_SN) and vali_flag = '1';";sleep 2;done
```

### IF表达式

```sql 
IF(expr1,expr2,expr3)
```

如果 expr1 是TRUE (expr1 <> 0 and expr1 <> NULL)，则 IF()的返回值为expr2; 否则返回值则为 expr3。

```sql
IFNULL(expr1,expr2)
```

假如expr1 不为 NULL，则 IFNULL() 的返回值为 expr1; 否则其返回值为 expr2。

### DATE_FORMAT

```sql
DATE_FORMAT(date,format)
```

#### format参数

| **限定符** | **含义**                                              |
|---------|-----------------------------------------------------|
| %a      | 三个字符缩写的工作日名称，例如:_Mon_, _Tue_, _Wed_,等               |
| %b      | 三个字符缩写的月份名称，例如：_Jan_，_Feb_，_Mar_等                   |
| %c      | 以数字表示的月份值，例如：1, 2, 3…12                             |
| %D      | 英文后缀如：_0th_, _1st_, _2nd_等的一个月之中的第几天                |
| %d      | 如果是1个数字(小于10)，那么一个月之中的第几天表示为加前导加0， 如：00, 01,02, …31 |
| %e      | 没有前导零的月份的日子，例如：1,2，… 31                             |
| %f      | 微秒，范围在000000..999999                                |
| %H      | 24小时格式的小时，前导加0，例如：00,01..23                         |
| %h      | 小时，12小时格式，带前导零，例如：01，02 … 12                        |
| %I      | 与%h相同                                               |
| %i      | 分数为零，例如：00,01，… 59                                  |
| %j      | 一年中的的第几天，前导为0，例如，001,002，… 366                      |
| %k      | 24小时格式的小时，无前导零，例如：0,1,2 … 23                        |
| %l      | 12小时格式的小时，无前导零，例如：0,1,2 … 12                        |
| %M      | 月份全名称，例如：January, February,…December                |
| %m      | 具有前导零的月份名称，例如：00,01,02，… 12                         |
| %p      | AM或PM，取决于其他时间说明符                                    |
| %r      | 表示时间，12小时格式hh:mm:ss AM或PM                           |
| %S      | 表示秒，前导零，如：00,01，… 59                                |
| %s      | 与%S相同                                               |
| %T      | 表示时间，24小时格式hh:mm:ss                                 |
| %U      | 周的第一天是星期日，例如：00,01,02 … 53时，前导零的周数                  |
| %u      | 周的第一天是星期一，例如：00,01,02 … 53时，前导零的周数                  |
| %V      | 与%U相同，它与%X一起使用                                      |
| %v      | 与%u相同，它与%x一起使用                                      |
| %W      | 工作日的全称，例如：Sunday, Monday,…, Saturday                |
| %w      | 工作日，以数字来表示(0 = 星期日，1 = 星期一等)                        |
| %X      | 周的四位数表示年份,第一天是星期日; 经常与%V一起使用                        |
| %x      | 周的四位数表示年份,第一天是星期日; 经常与%v一起使用                        |
| %Y      | 表示年份，四位数，例如2000，2001，…等。                            |
| %y      | 表示年份，两位数，例如00，01，…等。                                |
| %%      | 将百分比(%)字符添加到输出                                      |

#### 常用的日期格式字符串

| **DATE_FORMAT字符串** | **格式化日期**                       |
|--------------------|---------------------------------|
| %Y-%m-%d           | 2017/4/30                       |
| %e/%c/%Y           | 4/7/2013                        |
| %c/%e/%Y           | 7/4/2013                        |
| %d/%m/%Y           | 4/7/2013                        |
| %m/%d/%Y           | 7/4/2013                        |
| %e/%c/%Y %H:%i     | 4/7/2013 11:20                  |
| %c/%e/%Y %H:%i     | 7/4/2013 11:20                  |
| %d/%m/%Y %H:%i     | 4/7/2013 11:20                  |
| %m/%d/%Y %H:%i     | 7/4/2013 11:20                  |
| %e/%c/%Y %T        | 4/7/2013 11:20                  |
| %c/%e/%Y %T        | 7/4/2013 11:20                  |
| %d/%m/%Y %T        | 4/7/2013 11:20                  |
| %m/%d/%Y %T        | 7/4/2013 11:20                  |
| %a %D %b %Y        | Thu 4th Jul 2013                |
| %a %D %b %Y %H:%i  | Thu 4th Jul 2013 11:20          |
| %a %D %b %Y %T     | Thu 4th Jul 2013 11:20:05       |
| %a %b %e %Y        | Thu Jul 4 2013                  |
| %a %b %e %Y %H:%i  | Thu Jul 4 2013 11:20            |
| %a %b %e %Y %T     | Thu Jul 4 2013 11:20:05         |
| %W %D %M %Y        | Thursday 4th July 2013          |
| %W %D %M %Y %H:%i  | Thursday 4th July 2013 11:20    |
| %W %D %M %Y %T     | Thursday 4th July 2013 11:20:05 |
| %l:%i %p %b %e, %Y | 7/4/2013 11:20                  |
| %M %e, %Y          | 4-Jul-13                        |
| %a, %d %b %Y %T    | Thu, 04 Jul 2013 11:20:05       |

### 字符串转数字

1. 字段值+0

```sql
select psn_no + 0  from setl_test_d
```

2. cast(字段名 as 转换的类型)

```sql
select cast(psn_no as signed) from setl_test_d
```

3. convert

```sql
select convert(psn_no, signed) from setl_test_d
```

### json中字段值的提取

#### 语法

```sql
JSON_EXTRACT(json, path, ...)
```

`JSON_EXTRACT()` 函数返回`JSON`文档中由路径表达式匹配的所有的值。如果路径表达式匹配了一个值，则返回该值，如果路径表达式匹配了多个值，则返回一个包含了所有值的数组。

如果存在以下的情况， JSON_EXTRACT() 函数将返回 NULL：

- 如果 JSON 文档中不存在指定的路径。

- 如果任意一个参数为 NULL。

JSON_EXTRACT() 函数将在以下情况下返回错误：

- 如果参数 json 不是有效的 JSON 文档，MySQL 将会给出错误。您可以使用 JSON_VALID() 验证 JSON 文档的有效性。

- 如果参数 path 不是有效的路径表达式, MySQL 将会给出错误。

#### 示例

```sql
# 如何从数组中提取一个元素
SELECT JSON_EXTRACT('[1, 2, {"x": 3}]', '$[2]');

+------------------------------------------+
| JSON_EXTRACT('[1, 2, {"x": 3}]', '$[2]') |
+------------------------------------------+
| {"x": 3}                                 |
+------------------------------------------+

# 如何从数组中提取多个元素
SELECT JSON_EXTRACT('[1, 2, {"x": 3}]', '$[2].x', '$[1]', '$[0]');

+------------------------------------------------------------+
| JSON_EXTRACT('[1, 2, {"x": 3}]', '$[2].x', '$[1]', '$[0]') |
+------------------------------------------------------------+
| [3, 2, 1]                                                  |
+------------------------------------------------------------+

# 如何从对象中提取一个节点
SELECT JSON_EXTRACT('{"x": 1, "y": [1, 2]}', '$.y');

+----------------------------------------------+
| JSON_EXTRACT('{"x": 1, "y": [1, 2]}', '$.y') |
+----------------------------------------------+
| [1, 2]                                       |
+----------------------------------------------+

# 带有多个路径
SELECT JSON_EXTRACT('{"x": 1, "y": [1, 2]}', '$.x', '$.y');

+-----------------------------------------------------+
| JSON_EXTRACT('{"x": 1, "y": [1, 2]}', '$.x', '$.y') |
+-----------------------------------------------------+
| [1, [1, 2]]                                         |
+-----------------------------------------------------+
```

### 获取所有表的主键

```sql
SELECT
	tab.TABLE_SCHEMA,
	col.table_name,
	col.column_name 
FROM
	information_schema.table_constraints tab,
	information_schema.key_column_usage col 
WHERE
	col.constraint_name = tab.constraint_name 
	AND col.table_name = tab.table_name 
	AND tab.constraint_type = 'primary key' 
	AND tab.TABLE_SCHEMA NOT IN ( 'mysql', 'information_schema', 'performance_schema', 'sys', 'sysdb' );
```

### 索取没有主键的表

```sql
SELECT
	a.TABLE_SCHEMA,
	a.TABLE_NAME 
FROM
	(
	SELECT
		TABLE_SCHEMA,
		TABLE_NAME 
	FROM
		information_schema.TABLES 
	WHERE
	TABLE_SCHEMA NOT IN ( 'mysql', 'information_schema', 'performance_schema', 'sys', 'sysdb' )) AS a
	LEFT JOIN (
	SELECT
		TABLE_SCHEMA,
		TABLE_NAME 
	FROM
		information_schema.TABLE_CONSTRAINTS 
	WHERE
		CONSTRAINT_TYPE = 'PRIMARY KEY' 
	AND TABLE_SCHEMA NOT IN ( 'mysql', 'information_schema', 'performance_schema', 'sys', 'sysdb' )) AS b ON a.TABLE_SCHEMA = b.TABLE_SCHEMA 
	AND a.TABLE_NAME = b.TABLE_NAME 
WHERE
	b.TABLE_NAME IS NULL;
```

### 汉字首字母

```sql
DELIMITER $$

DROP FUNCTION IF EXISTS `fun_pinyin`$$
CREATE DEFINER=`root`@`%` FUNCTION `fun_pinyin`(in_string VARCHAR (4000)) RETURNS varchar(4000) CHARSET gbk
    DETERMINISTIC
BEGIN#截取字符串，每次做截取后的字符串存放在该变量中，初始为函数参数in_string值
  DECLARE
    tmp_str VARCHAR (4000) CHARSET gbk DEFAULT '';#tmp_str的长度
  DECLARE
    tmp_len SMALLINT DEFAULT 0;#tmp_str的长度
  DECLARE
    tmp_loc SMALLINT DEFAULT 0;#截取字符，每次 left(tmp_str,1) 返回值存放在该变量中
  DECLARE
    tmp_char VARCHAR (2) CHARSET gbk DEFAULT '';#结果字符串
  DECLARE
    tmp_rs VARCHAR (21845) CHARSET gbk DEFAULT '';#拼音字符，存放单个汉字对应的拼音首字符
  DECLARE
    tmp_cc VARCHAR (2) CHARSET gbk DEFAULT '';#初始化，将in_string赋给tmp_str
  
  SET tmp_str = in_string;#初始化长度
  
  SET tmp_len = LENGTH(tmp_str);#如果被计算的tmp_str长度大于0则进入该while
  WHILE
      tmp_len > 0 DO#获取tmp_str最左端的首个字符，注意这里是获取首个字符，该字符可能是汉字，也可能不是。
      
      SET tmp_char = LEFT(tmp_str, 1);#左端首个字符赋值给拼音字符
      
      SET tmp_cc = tmp_char;#获取字符的编码范围的位置，为了确认汉字拼音首字母是哪一个
      
      SET tmp_loc = INTERVAL(CONV(HEX(tmp_char), 16, 10), 0xB0A1, 0xB0C5, 0xB2C1, 0xB4EE, 0xB6EA, 0xB7A2, 0xB8C1, 0xB9FE, 0xBBF7, 0xBFA6, 0xC0AC, 0xC2E8, 0xC4C3, 0xC5B6, 0xC5BE, 0xC6DA, 0xC8BB, 0xC8F6, 0xCBFA, 0xCDDA, 0xCEF4, 0xD1B9, 0xD4D1);#判断左端首个字符是多字节还是单字节字符，要是多字节则认为是汉字且作以下拼音获取，要是单字节则不处理。如果是多字节字符但是不在对应的编码范围之内，即对应的不是大写字母则也不做处理，这样数字或者特殊字符就保持原样了
      IF
        (LENGTH(tmp_char) > 1 AND tmp_loc > 0 AND tmp_loc < 24) THEN#获得汉字拼音首字符
          SELECT
            ELT(tmp_loc, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z') INTO tmp_cc;
          
        END IF;#将当前tmp_str左端首个字符拼音首字符与返回字符串拼接
      
      SET tmp_rs = CONCAT(tmp_rs, tmp_cc);#将tmp_str左端首字符去除
      
      SET tmp_str = SUBSTRING(tmp_str, 2);#计算当前字符串长度
      
      SET tmp_len = LENGTH(tmp_str);
      
    END WHILE;#返回结果字符串
  RETURN tmp_rs;
  
END $$

DELIMITER ;
```

### 数字转（财务）汉字大写

```sql
DROP FUNCTION if EXISTS fun_convertm;
DELIMITER $$
CREATE FUNCTION fun_convertm(MONEY VARCHAR(150)) RETURNS VARCHAR(150) CHARSET utf8
    DETERMINISTIC
BEGIN
    DECLARE
RESULT VARCHAR(100);
    DECLARE
NUM_ROUND VARCHAR(100);
    DECLARE
NUM_LEFT VARCHAR(100);
    DECLARE
NUM_RIGHT VARCHAR(2);
    DECLARE
STR1 VARCHAR(10);
    DECLARE
STR2 VARCHAR(16);
    DECLARE
NUM_PRE INT;
    DECLARE
NUM_CURRENT INT;
    DECLARE
NUM_COUNT INT;
    DECLARE
NUM1 INT;
    SET MONEY = CONVERT(
            MONEY,
        DECIMAL(14, 2));
    SET NUM_ROUND = CONCAT(MONEY, '');
    SET STR1 = '零壹贰叁肆伍陆柒捌玖';
    SET STR2 = '圆拾佰仟万拾佰仟亿拾佰仟万拾佰仟';
    SET NUM_PRE = 1;
    SET NUM_COUNT = 0;
    SET NUM_LEFT = FLOOR(MONEY);
    SET NUM_RIGHT = REPLACE(NUM_ROUND, CONCAT(NUM_LEFT, '.'), '');
    IF
MONEY IS NULL THEN
        SET RESULT = NULL;
END IF;
    IF
LENGTH(NUM_LEFT) >= 8 THEN
        SET NUM1 = CAST(SUBSTR(NUM_LEFT, - 8, 4) AS SIGNED);
    ELSEIF LENGTH(NUM_LEFT) > 4 THEN
        SET NUM1 = CAST(SUBSTR(NUM_LEFT, - LENGTH(NUM_LEFT), LENGTH(NUM_LEFT) - 4) AS SIGNED);
ELSE
        SET NUM1 = CAST(SUBSTR(NUM_LEFT, 1, 4) AS SIGNED);
END IF;
    IF
LENGTH(NUM_LEFT) > 16 THEN
        SET RESULT = '**********';
END IF;
    IF
LENGTH(NUM_RIGHT) = 2 THEN
        IF
            CAST(SUBSTR(NUM_RIGHT, 1, 1) AS SIGNED) = 0 THEN
            SET RESULT = CONCAT('零', SUBSTR(STR1, CAST(SUBSTR(NUM_RIGHT, 2, 1) AS SIGNED) + 1, 1), '分');
        ELSE
            SET RESULT = CONCAT(SUBSTR(STR1, CAST(SUBSTR(NUM_RIGHT, 1, 1) AS SIGNED) + 1, 1), '角',
                                SUBSTR(STR1, CAST(SUBSTR(NUM_RIGHT, 2, 1) AS SIGNED) + 1, 1), '分');
        END IF;
ELSE
        IF
            LENGTH(NUM_RIGHT) = 1 THEN
            SET RESULT = CONCAT(SUBSTR(STR1, CAST(SUBSTR(NUM_RIGHT, 1, 1) AS SIGNED) + 1, 1), '角整');
        ELSE
            SET RESULT = '整';
        END IF;
END IF;
    myloop :
    LOOP
        SET NUM_COUNT = NUM_COUNT + 1;
        SET NUM_CURRENT = CAST(SUBSTR(NUM_LEFT, LENGTH(NUM_LEFT) - NUM_COUNT + 1, 1) AS SIGNED);
        IF
NUM_CURRENT > 0 THEN
            SET RESULT = CONCAT(SUBSTR(STR1, NUM_CURRENT + 1, 1), SUBSTR(STR2, NUM_COUNT, 1), RESULT);
ELSE
            IF
                NUM_COUNT = 5 THEN
                IF
                    MOD(NUM_COUNT - 1, 4) = 0
                        AND NUM1 <> 0 THEN

                    SET RESULT = CONCAT(SUBSTR(STR2, NUM_COUNT, 1), RESULT);

                    SET NUM_PRE = 0;
END IF;
ELSE
                IF
                    MOD(NUM_COUNT - 1, 4) = 0 THEN

                    SET RESULT = CONCAT(SUBSTR(STR2, NUM_COUNT, 1), RESULT);

                    SET NUM_PRE = 0;
END IF;

END IF;
            IF
NUM_PRE > 0
                    OR LENGTH(NUM_LEFT) = 1 THEN
                SET RESULT = CONCAT(SUBSTR(STR1, NUM_CURRENT + 1, 1), RESULT);
END IF;
END IF;
        SET NUM_PRE = NUM_CURRENT;
        IF
NUM_COUNT >= LENGTH(NUM_LEFT) THEN
            LEAVE myloop;
END IF;
END LOOP myloop;
    IF
MONEY < 0 THEN
        SET RESULT = CONCAT('负', RESULT);
END IF;
    SET RESULT = REPLACE(RESULT, '零零分', '整');
    SET RESULT = REPLACE(RESULT, '零分', '整');
    SET RESULT = REPLACE(RESULT, '元整', '圆整');
RETURN RESULT;
END;
$$
```

### 开窗

按照规则获取第一条数据

```sql
SELECT
  * 
FROM
  (
    SELECT
      zpo.ZySerialNo,
      zpo.OperationDateTime,
      zpo.MainOperationFlag,
      zpo.OperationDoctorDeptCode,
      ( CASE WHEN @zsn = zpo.ZySerialNo THEN @seq := @seq + 1 ELSE @seq := 0 END ) flag,
      @zsn := zpo.ZySerialNo 
    FROM
      stdDs_ZyPatOperation zpo,
      ( SELECT @seq := 0, @zsn := '' ) tmp 
    WHERE
      zpo.OperationCode IN ( SELECT op_code FROM stdDs_Operation_Item WHERE op_type = '手术' AND vali_flag = '1' ) 
      AND zpo.OperationDoctorDeptCode IS NOT NULL 
    ORDER BY
      zpo.ZySerialNo,
      zpo.MainOperationFlag,
      zpo.OperationDateTime 
  ) tmp 
WHERE
  tmp.flag = 0
```