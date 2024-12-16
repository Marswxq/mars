# DRDS

**目录**

[[toc]]

## SHOW HELP

| STATEMENT                               | DESCRIPTION_CN  | DESCRIPTION                                             | EXAMPLE                                     |
|-----------------------------------------|-----------------|---------------------------------------------------------|---------------------------------------------|
| show rule                               | 查看所有表分片信息       | Report all table rule                                   |                                             |
| show rule from TABLE                    | 查看具体表分片信息       | Report table rule                                       | show rule from user                         |
| show full rule from TABLE               | 查看具体表详细分片信息     | Report table full rule                                  | show full rule from user                    |
| show topology from TABLE                | 查看具体物理库表        | Report table physical topology                          | show topology from user                     |
| show partitions from TABLE              | 查看具体表分片列        | Report table dbPartition or tbPartition columns         | show partitions from user                   |
| show broadcasts                         | 查看所有广播表         | Report all broadcast tables                             |                                             |
| show datasources                        | 查看所有分库连接池信息     | Report all partition db threadPool info                 |                                             |
| show node                               | 查看所有分库主从读信息     | Report master/slave read status                         |                                             |
| show slow                               | 查看DRDS监控下的慢SQL  | Report top 100 slow sql                                 |                                             |
| show physical_slow                      | 查看RDS监控下的慢SQL   | Report top 100 physical slow sql                        |                                             |
| clear slow                              | 清空慢SQL          | Clear slow data                                         |                                             |
| trace SQL                               | 跟踪慢SQL不执行       | Start trace sql, use show trace to print profiling data | trace select count(*) from user; show trace |
| show trace                              | 显示跟踪            | Report sql execute profiling info                       |                                             |
| explain SQL                             | 执行计划            | Report sql plan info                                    | explain select count(*) from user           |
| explain detail SQL                      | 详细执行计划          | Report sql detail plan info                             | explain detail select count(*) from user    |
| explain execute SQL                     | 物理节点执行计划        | Report sql on physical db plan info                     | explain execute select count(*) from user   |
| show sequences                          |                 | Report all sequences status                             |                                             |
| create sequence NAME [start with COUNT] |                 | Create sequence                                         | create sequence test start with 0           |
| alter sequence NAME [start with COUNT]  |                 | Alter sequence                                          | alter sequence test start with 100000       |
| drop sequence NAME                      |                 | Drop sequence                                           | drop sequence test                          |
| show db status                          | 查看物理节点空间信息      | Report size of each physical database                   | show db status                              |
| show full db status                     | 查看物理节点表占用空间信息   | Report size of each physical table, support like        | show full db status like user               |
| show ds                                 | 查看简单分库信息        | Report simple partition db info                         | show ds                                     |
| show connection                         | 查看所有连接信息        | Report all connections info                             | show connection                             |
| show trans                              | 查看所有事物信息        | Report trans info                                       | show trans/show trans limit 2               |
| show full trans                         | 查看所有事物详细信息      | Report all trans info                                   | show full trans/show full trans limit 2     |
| show stats                              | 查看请求信息的统计信息     | Report all requst stats                                 | show stats                                  |
| show stc                                | 查看所有分库的请求信息     | Report all requst stats by partition                    | show stc                                    |
| show htc                                | 查看所有分库的CPU/内存信息 | Report the CPU/LOAD/MEM/NET/GC stats                    | show htc                                    |
| show outlines                           |                 | Report outlines                                         | show outlines                               |

## EXPLAIN

### 语法

```sql
EXPLAIN
{LOGICALVIEW | LOGIC | SIMPLE | DETAIL | EXECUTE | PHYSICAL | OPTIMIZER | SHARDING
 | COST | ANALYZE | BASELINE | JSON_PLAN | ADVISOR} 
 {SELECT statement | DELETE statement | INSERT statement | REPLACE statement| UPDATE statement}
```

### EXPLAIN语句

展示基本的SQL执行计划，该执行计划是算子组成，主要体现SQL在CN上的整个执行过程。

```sql
EXPLAIN select count(*) from lineitem group by L_ORDERKEY;
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| LOGICAL EXECUTIONPLAN                                                                                                                                                              |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Project(count(*)="count(*)")                                                                                                                                                       |
|   HashAgg(group="L_ORDERKEY", count(*)="SUM(count(*))")                                                                                                                            |
|     Gather(concurrent=true)                                                                                                                                                        |
|       LogicalView(tables="[000000-000003].lineitem_[00-15]", shardCount=16, sql="SELECT `L_ORDERKEY`, COUNT(*) AS `count(*)` FROM `lineitem` AS `lineitem` GROUP BY `L_ORDERKEY`") |
| HitCache:false                                                                                                                                                                     |                                                                                                                                                               |
| TemplateId: 5819c807                                                                                                                                                               |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

其中，HitCache标记该查询是否命中PlanCache，取值为falseortrue；TemplateId表示对该计划的标识，具有全局唯一性。

### EXPLAIN LOGICALVIEW语句

展示基本的SQL执行计划，该执行计划是算子组成，主要体现SQL在CN上的整个执行过程。

```sql
EXPLAIN LOGICALVIEW select count(*) from lineitem group by L_ORDERKEY;
+----------------------------------------------------------+
| LOGICAL EXECUTIONPLAN                                    |
+----------------------------------------------------------+
| Project(count(*)="count(*)")                             |
|   HashAgg(group="L_ORDERKEY", count(*)="SUM(count(*))")  |
|     Gather(concurrent=true)                              |
|       LogicalView                                        |
|         MysqlAgg(group="L_ORDERKEY", count(*)="COUNT()") |
|           MysqlTableScan(name=[ads, lineitem])           |
| HitCache:true                                            |
| Source:PLAN_CACHE                                        |
| TemplateId: 5819c807
```

### EXPLAIN EXECUTE语句

表示下推SQL在MySQL的执行情况，这个语句和MySQL的explain语句同义。通过该语句可以查看下推SQL在DN上有没有使用索引，有没有做全表扫描。

```sql
EXPLAIN EXECUTE select  count(*) from lineitem group by L_ORDERKEY;
+----+-------------+----------+------------+-------+---------------+---------+---------+-----+------+----------+----------------------------------------------+
| id | select_type | table    | partitions | type  | possible_keys | key     | key_len | ref | rows | filtered | Extra                                        |
+----+-------------+----------+------------+-------+---------------+---------+---------+-----+------+----------+----------------------------------------------+
| 1  | SIMPLE      | lineitem | NULL       | index | PRIMARY       | PRIMARY | 8       | NULL | 1    | 100      | Using index; Using temporary; Using filesort |
+----+-------------+----------+------------+-------+---------------+---------+---------+-----+------+----------+----------------------------------------------+
1 row in set (0.24 sec)
```

### EXPLAIN SHARDING语句

展示当前查询在DN上扫描的物理分片情况。

```sql
EXPLAIN SHARDING  select  count(*) from lineitem group by L_ORDERKEY;
+---------------+----------------------------------+-------------+-----------+-----------+
| LOGICAL_TABLE | SHARDING                         | SHARD_COUNT | BROADCAST | CONDITION |
+---------------+----------------------------------+-------------+-----------+-----------+
| lineitem      | [000000-000003].lineitem_[00-15] | 16          | false     |           |
+---------------+----------------------------------+-------------+-----------+-----------+
1 row in set (0.04 sec)
```

### EXPLAIN COST语句

相对于EXPLAIN语句，除了展示执行计划以外，还会显示各个算子基于统计信息估算的代价，以及这条查询被优化器识别的WORKLOAD。

```sql
EXPLAIN COST select  count(*) from lineitem group by L_ORDERKEY;
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| LOGICAL EXECUTIONPLAN                                                                                                                                                                                                                                                                                            |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Project(count(*)="count(*)"): rowcount = 2508.0, cumulative cost = value = 2.4867663E7, cpu = 112574.0, memory = 88984.0, io = 201.0, net = 4.75, id = 182                                                                                                                                                       |
|   HashAgg(group="L_ORDERKEY", count(*)="SUM(count(*))"): rowcount = 2508.0, cumulative cost = value = 2.4867662E7, cpu = 112573.0, memory = 88984.0, io = 201.0, net = 4.75, id = 180                                                                                                                            |
|     Gather(concurrent=true): rowcount = 2508.0, cumulative cost = value = 2.4860069E7, cpu = 105039.0, memory = 29796.0, io = 201.0, net = 4.75, id = 178                                                                                                                                                        |
|       LogicalView(tables="[000000-000003].lineitem_[00-15]", shardCount=16, sql="SELECT `L_ORDERKEY`, COUNT(*) AS `count(*)` FROM `lineitem` AS `lineitem` GROUP BY `L_ORDERKEY`"): rowcount = 2508.0, cumulative cost = value = 2.4860068E7, cpu = 105038.0, memory = 29796.0, io = 201.0, net = 4.75, id = 109 |
| HitCache:true                                                                                                                                                                                                                                                                                                    |
| Source:PLAN_CACHE                                                                                                                                                                                                                                                                                                |
| WorkloadType: TP                                                                                                                                                                                                                                                                                                 |
| TemplateId: 5819c807
```

### EXPLAIN ANALYZE语句

相对于explain cost语句，除了显示各个算子基于统计信息估算的代价以外，该语句可以收集真实运行过程中算子输出的rowCount等信息。

```sql
EXPLAIN ANALYZE  select  count(*) from lineitem group by L_ORDERKEY;
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| LOGICAL EXECUTIONPLAN                                                                                                                                                                                                                                                                                                                                                                                    |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Project(count(*)="count(*)"): rowcount = 2508.0, cumulative cost = value = 2.4867663E7, cpu = 112574.0, memory = 88984.0, io = 201.0, net = 4.75, actual time = 0.001 + 0.000, actual rowcount = 2506, actual memory = 0, instances = 1, id = 182                                                                                                                                                        |
|   HashAgg(group="L_ORDERKEY", count(*)="SUM(count(*))"): rowcount = 2508.0, cumulative cost = value = 2.4867662E7, cpu = 112573.0, memory = 88984.0, io = 201.0, net = 4.75, actual time = 0.000 + 0.000, actual rowcount = 2506, actual memory = 0, instances = 1, id = 180                                                                                                                             |
|     Gather(concurrent=true): rowcount = 2508.0, cumulative cost = value = 2.4860069E7, cpu = 105039.0, memory = 29796.0, io = 201.0, net = 4.75, actual time = 0.000 + 0.000, actual rowcount = 0, actual memory = 0, instances = 0, id = 178                                                                                                                                                            |
|       LogicalView(tables="[000000-000003].lineitem_[00-15]", shardCount=16, sql="SELECT `L_ORDERKEY`, COUNT(*) AS `count(*)` FROM `lineitem` AS `lineitem` GROUP BY `L_ORDERKEY`"): rowcount = 2508.0, cumulative cost = value = 2.4860068E7, cpu = 105038.0, memory = 29796.0, io = 201.0, net = 4.75, actual time = 0.030 + 0.025, actual rowcount = 10000, actual memory = 0, instances = 0, id = 109 |
| HitCache:true                                                                                                                                                                                                                                                                                                                                                                                            |
| Source:PLAN_CACHE                                                                                                                                                                                                                                                                                                                                                                                        |
| TemplateId: 5819c807                                                                                                                                                                                                                                                                                                                                                                                     |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
7 rows in set (1.08 sec)
```

### EXPLAIN PHYSICAL语句

展示查询在运行过程中执行模式、各个执行片段（Fragment）的依赖关系和并行度。该查询被识别为单机单线程计划模式（TP_LOCAL），执行计划被分为三个片段Fragment-0、Fragment-1和Fragment-2，先做预聚合再做最终的聚合计算，每个片段的执行度可以不同。

```sql
EXPLAIN PHYSICAL select  count(*) from lineitem group by L_ORDERKEY;
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| PLAN                                                                                                                                                                           |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ExecutorMode: TP_LOCAL                                                                                                                                                         |
| Fragment 0 dependency: [] parallelism: 4                                                                                                                                       |
| Gather(concurrent=true)                                                                                                                                                        |
|   LogicalView(tables="[000000-000003].lineitem_[00-15]", shardCount=16, sql="SELECT `L_ORDERKEY`, COUNT(*) AS `count(*)` FROM `lineitem` AS `lineitem` GROUP BY `L_ORDERKEY`") |
| Fragment 1 dependency: [] parallelism: 8                                                                                                                                       |
| LocalBuffer                                                                                                                                                                    |
|   RemoteSource(sourceFragmentIds=[0], type=RecordType(INTEGER L_ORDERKEY, BIGINT count(*)))                                                                                    |
| Fragment 2 dependency: [0, 1] parallelism: 8                                                                                                                                   |
| Project(count(*)="count(*)")                                                                                                                                                   |
|   HashAgg(group="L_ORDERKEY", count(*)="SUM(count(*))")                                                                                                                        |
|     RemoteSource(sourceFragmentIds=[1], type=RecordType(INTEGER L_ORDERKEY, BIGINT count(*)))                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
11 rows in set (0.10 sec)
```

### EXPLAIN ADVISOR语句

基于统计信息，分析当前查询的执行计划，给用户推荐可以加速查询的全局二级索引。

```sql
EXPLAIN ADVISOR select  count(*) from lineitem group by L_ORDERKEY \G;
*************************** 1. row ***************************
IMPROVE_VALUE: 4.4%
  IMPROVE_CPU: 340.8%
  IMPROVE_MEM: 0.0%
   IMPROVE_IO: 1910.0%
  IMPROVE_NET: 0.0%
 BEFORE_VALUE: 2.48676627E7
   BEFORE_CPU: 112573.7
   BEFORE_MEM: 88983.8
    BEFORE_IO: 201
   BEFORE_NET: 4.7
  AFTER_VALUE: 2.38256249E7
    AFTER_CPU: 25536
    AFTER_MEM: 88983.8
     AFTER_IO: 10
    AFTER_NET: 4.7
 ADVISE_INDEX: ALTER TABLE `ads`.`lineitem` ADD GLOBAL INDEX `__advise_index_gsi_lineitem_L_ORDERKEY`(`L_ORDERKEY`) DBPARTITION BY HASH(`L_ORDERKEY`) TBPARTITION BY HASH(`L_ORDERKEY`) TBPARTITIONS 4;
     NEW_PLAN:
Project(count(*)="count(*)")
  HashAgg(group="L_ORDERKEY", count(*)="SUM(count(*))")
    Gather(concurrent=true)
      IndexScan(tables="[000000-000003].lineitem__what_if_gsi_L_ORDERKEY_[00-15]", shardCount=16, sql="SELECT `L_ORDERKEY`, COUNT(*) AS `count(*)` FROM `lineitem__what_if_gsi_L_ORDERKEY` AS `lineitem__what_if_gsi_L_ORDERKEY` GROUP BY `L_ORDERKEY`")

         INFO: GLOBAL_INDEX
1 row in set (0.13 sec)
```

## CHECK TABLE

CHECK TABLE用于对数据表进行检查，主要用于DDL建表失败的情形。

- 对于拆分表，检查底层物理分表是否有缺失的情况，底层的物理分表的列和索引是否一致；
- 对于单库单表，检查表是否存在。

### 语法

```sql
CHECK TABLE tbl_name
```

### 示例

```sql
CHECK TABLE tddl_mgr_log;
+------------------------+-------+----------+----------+
| TABLE                  | OP    | MSG_TYPE | MSG_TEXT |
+------------------------+-------+----------+----------+
| TDDL5_APP.tddl_mgr_log | check | status   | OK       |
+------------------------+-------+----------+----------+
1 row in set (0.56 sec)
CHECK TABLE tddl_mg;
+-------------------+-------+----------+----------------------------------------+
| TABLE             | OP    | MSG_TYPE | MSG_TEXT                               |
+-------------------+-------+----------+----------------------------------------+
| TDDL5_APP.tddl_mg | check | Error    | Table 'tddl5_00.tddl_mg' doesn't exist |
+-------------------+-------+----------+----------------------------------------+
1 row in set (0.02 sec)
```

## 逻辑表的拓扑分布

查看指定逻辑表的拓扑分布，展示该逻辑表保存在哪些分库中，每个分库下包含哪些分表。

### 语法

```sql
SHOW PARTITIONS FROM tablename
```

### 示例

```shell
mysql> SHOW TOPOLOGY FROM test_table; 
+-----+------------------------------------+---------------------+
| ID  | GROUP_NAME                         | TABLE_NAME          |
+-----+------------------------------------+---------------------+
|   0 | DB_1631610412546HSWK_0LNF_0000 | test_table_Oenl_000 |
|   1 | DB_1631610412546HSWK_0LNF_0000 | test_table_Oenl_001 |
|   2 | DB_1631610412546HSWK_0LNF_0000 | test_table_Oenl_002 |
|   3 | DB_1631610412546HSWK_0LNF_0000 | test_table_Oenl_003 |
|   4 | DB_1631610412546HSWK_0LNF_0000 | test_table_Oenl_004 |
|   5 | DB_1631610412546HSWK_0LNF_0000 | test_table_Oenl_005 |
|   6 | DB_1631610412546HSWK_0LNF_0000 | test_table_Oenl_006 |
|   7 | DB_1631610412546HSWK_0LNF_0000 | test_table_Oenl_007 |
|   8 | DB_1631610412546HSWK_0LNF_0001 | test_table_Oenl_008 |
|   9 | DB_1631610412546HSWK_0LNF_0001 | test_table_Oenl_009 |
|  10 | DB_1631610412546HSWK_0LNF_0001 | test_table_Oenl_010 |
|  11 | DB_1631610412546HSWK_0LNF_0001 | test_table_Oenl_011 |
|  12 | DB_1631610412546HSWK_0LNF_0001 | test_table_Oenl_012 |
|  13 | DB_1631610412546HSWK_0LNF_0001 | test_table_Oenl_013 |
|  14 | DB_1631610412546HSWK_0LNF_0001 | test_table_Oenl_014 |
|  15 | DB_1631610412546HSWK_0LNF_0001 | test_table_Oenl_015 |
|  16 | DB_1631610412546HSWK_0LNF_0002 | test_table_Oenl_016 |
|  17 | DB_1631610412546HSWK_0LNF_0002 | test_table_Oenl_017 |
|  18 | DB_1631610412546HSWK_0LNF_0002 | test_table_Oenl_018 |
|  19 | DB_1631610412546HSWK_0LNF_0002 | test_table_Oenl_019 |
|  20 | DB_1631610412546HSWK_0LNF_0002 | test_table_Oenl_020 |
|  21 | DB_1631610412546HSWK_0LNF_0002 | test_table_Oenl_021 |
|  22 | DB_1631610412546HSWK_0LNF_0002 | test_table_Oenl_022 |
|  23 | DB_1631610412546HSWK_0LNF_0002 | test_table_Oenl_023 |
|  24 | DB_1631610412546HSWK_0LNF_0003 | test_table_Oenl_024 |
|  25 | DB_1631610412546HSWK_0LNF_0003 | test_table_Oenl_025 |
|  26 | DB_1631610412546HSWK_0LNF_0003 | test_table_Oenl_026 |
|  27 | DB_1631610412546HSWK_0LNF_0003 | test_table_Oenl_027 |
|  28 | DB_1631610412546HSWK_0LNF_0003 | test_table_Oenl_028 |
|  29 | DB_1631610412546HSWK_0LNF_0003 | test_table_Oenl_029 |
|  30 | DB_1631610412546HSWK_0LNF_0003 | test_table_Oenl_030 |
|  31 | DB_1631610412546HSWK_0LNF_0003 | test_table_Oenl_031 |
|  32 | DB_1631610412546HSWK_0LNF_0004 | test_table_Oenl_032 |
|  33 | DB_1631610412546HSWK_0LNF_0004 | test_table_Oenl_033 |
|  34 | DB_1631610412546HSWK_0LNF_0004 | test_table_Oenl_034 |
|  35 | DB_1631610412546HSWK_0LNF_0004 | test_table_Oenl_035 |
|  36 | DB_1631610412546HSWK_0LNF_0004 | test_table_Oenl_036 |
|  37 | DB_1631610412546HSWK_0LNF_0004 | test_table_Oenl_037 |
|  38 | DB_1631610412546HSWK_0LNF_0004 | test_table_Oenl_038 |
|  39 | DB_1631610412546HSWK_0LNF_0004 | test_table_Oenl_039 |
|  40 | DB_1631610412546HSWK_0LNF_0005 | test_table_Oenl_040 |
|  41 | DB_1631610412546HSWK_0LNF_0005 | test_table_Oenl_041 |
|  42 | DB_1631610412546HSWK_0LNF_0005 | test_table_Oenl_042 |
|  43 | DB_1631610412546HSWK_0LNF_0005 | test_table_Oenl_043 |
|  44 | DB_1631610412546HSWK_0LNF_0005 | test_table_Oenl_044 |
|  45 | DB_1631610412546HSWK_0LNF_0005 | test_table_Oenl_045 |
|  46 | DB_1631610412546HSWK_0LNF_0005 | test_table_Oenl_046 |
|  47 | DB_1631610412546HSWK_0LNF_0005 | test_table_Oenl_047 |
|  48 | DB_1631610412546HSWK_0LNF_0006 | test_table_Oenl_048 |
|  49 | DB_1631610412546HSWK_0LNF_0006 | test_table_Oenl_049 |
|  50 | DB_1631610412546HSWK_0LNF_0006 | test_table_Oenl_050 |
|  51 | DB_1631610412546HSWK_0LNF_0006 | test_table_Oenl_051 |
|  52 | DB_1631610412546HSWK_0LNF_0006 | test_table_Oenl_052 |
|  53 | DB_1631610412546HSWK_0LNF_0006 | test_table_Oenl_053 |
|  54 | DB_1631610412546HSWK_0LNF_0006 | test_table_Oenl_054 |
|  55 | DB_1631610412546HSWK_0LNF_0006 | test_table_Oenl_055 |
|  56 | DB_1631610412546HSWK_0LNF_0007 | test_table_Oenl_056 |
|  57 | DB_1631610412546HSWK_0LNF_0007 | test_table_Oenl_057 |
|  58 | DB_1631610412546HSWK_0LNF_0007 | test_table_Oenl_058 |
|  59 | DB_1631610412546HSWK_0LNF_0007 | test_table_Oenl_059 |
|  60 | DB_1631610412546HSWK_0LNF_0007 | test_table_Oenl_060 |
|  61 | DB_1631610412546HSWK_0LNF_0007 | test_table_Oenl_061 |
|  62 | DB_1631610412546HSWK_0LNF_0007 | test_table_Oenl_062 |
|  63 | DB_1631610412546HSWK_0LNF_0007 | test_table_Oenl_063 |
|  64 | DB_1631610412546HSWK_0LNF_0008 | test_table_Oenl_064 |
|  65 | DB_1631610412546HSWK_0LNF_0008 | test_table_Oenl_065 |
|  66 | DB_1631610412546HSWK_0LNF_0008 | test_table_Oenl_066 |
|  67 | DB_1631610412546HSWK_0LNF_0008 | test_table_Oenl_067 |
|  68 | DB_1631610412546HSWK_0LNF_0008 | test_table_Oenl_068 |
|  69 | DB_1631610412546HSWK_0LNF_0008 | test_table_Oenl_069 |
|  70 | DB_1631610412546HSWK_0LNF_0008 | test_table_Oenl_070 |
|  71 | DB_1631610412546HSWK_0LNF_0008 | test_table_Oenl_071 |
|  72 | DB_1631610412546HSWK_0LNF_0009 | test_table_Oenl_072 |
|  73 | DB_1631610412546HSWK_0LNF_0009 | test_table_Oenl_073 |
|  74 | DB_1631610412546HSWK_0LNF_0009 | test_table_Oenl_074 |
|  75 | DB_1631610412546HSWK_0LNF_0009 | test_table_Oenl_075 |
|  76 | DB_1631610412546HSWK_0LNF_0009 | test_table_Oenl_076 |
|  77 | DB_1631610412546HSWK_0LNF_0009 | test_table_Oenl_077 |
|  78 | DB_1631610412546HSWK_0LNF_0009 | test_table_Oenl_078 |
|  79 | DB_1631610412546HSWK_0LNF_0009 | test_table_Oenl_079 |
|  80 | DB_1631610412546HSWK_0LNF_0010 | test_table_Oenl_080 |
|  81 | DB_1631610412546HSWK_0LNF_0010 | test_table_Oenl_081 |
|  82 | DB_1631610412546HSWK_0LNF_0010 | test_table_Oenl_082 |
|  83 | DB_1631610412546HSWK_0LNF_0010 | test_table_Oenl_083 |
|  84 | DB_1631610412546HSWK_0LNF_0010 | test_table_Oenl_084 |
|  85 | DB_1631610412546HSWK_0LNF_0010 | test_table_Oenl_085 |
|  86 | DB_1631610412546HSWK_0LNF_0010 | test_table_Oenl_086 |
|  87 | DB_1631610412546HSWK_0LNF_0010 | test_table_Oenl_087 |
|  88 | DB_1631610412546HSWK_0LNF_0011 | test_table_Oenl_088 |
|  89 | DB_1631610412546HSWK_0LNF_0011 | test_table_Oenl_089 |
|  90 | DB_1631610412546HSWK_0LNF_0011 | test_table_Oenl_090 |
|  91 | DB_1631610412546HSWK_0LNF_0011 | test_table_Oenl_091 |
|  92 | DB_1631610412546HSWK_0LNF_0011 | test_table_Oenl_092 |
|  93 | DB_1631610412546HSWK_0LNF_0011 | test_table_Oenl_093 |
|  94 | DB_1631610412546HSWK_0LNF_0011 | test_table_Oenl_094 |
|  95 | DB_1631610412546HSWK_0LNF_0011 | test_table_Oenl_095 |
|  96 | DB_1631610412546HSWK_0LNF_0012 | test_table_Oenl_096 |
|  97 | DB_1631610412546HSWK_0LNF_0012 | test_table_Oenl_097 |
|  98 | DB_1631610412546HSWK_0LNF_0012 | test_table_Oenl_098 |
|  99 | DB_1631610412546HSWK_0LNF_0012 | test_table_Oenl_099 |
| 100 | DB_1631610412546HSWK_0LNF_0012 | test_table_Oenl_100 |
| 101 | DB_1631610412546HSWK_0LNF_0012 | test_table_Oenl_101 |
| 102 | DB_1631610412546HSWK_0LNF_0012 | test_table_Oenl_102 |
| 103 | DB_1631610412546HSWK_0LNF_0012 | test_table_Oenl_103 |
| 104 | DB_1631610412546HSWK_0LNF_0013 | test_table_Oenl_104 |
| 105 | DB_1631610412546HSWK_0LNF_0013 | test_table_Oenl_105 |
| 106 | DB_1631610412546HSWK_0LNF_0013 | test_table_Oenl_106 |
| 107 | DB_1631610412546HSWK_0LNF_0013 | test_table_Oenl_107 |
| 108 | DB_1631610412546HSWK_0LNF_0013 | test_table_Oenl_108 |
| 109 | DB_1631610412546HSWK_0LNF_0013 | test_table_Oenl_109 |
| 110 | DB_1631610412546HSWK_0LNF_0013 | test_table_Oenl_110 |
| 111 | DB_1631610412546HSWK_0LNF_0013 | test_table_Oenl_111 |
| 112 | DB_1631610412546HSWK_0LNF_0014 | test_table_Oenl_112 |
| 113 | DB_1631610412546HSWK_0LNF_0014 | test_table_Oenl_113 |
| 114 | DB_1631610412546HSWK_0LNF_0014 | test_table_Oenl_114 |
| 115 | DB_1631610412546HSWK_0LNF_0014 | test_table_Oenl_115 |
| 116 | DB_1631610412546HSWK_0LNF_0014 | test_table_Oenl_116 |
| 117 | DB_1631610412546HSWK_0LNF_0014 | test_table_Oenl_117 |
| 118 | DB_1631610412546HSWK_0LNF_0014 | test_table_Oenl_118 |
| 119 | DB_1631610412546HSWK_0LNF_0014 | test_table_Oenl_119 |
| 120 | DB_1631610412546HSWK_0LNF_0015 | test_table_Oenl_120 |
| 121 | DB_1631610412546HSWK_0LNF_0015 | test_table_Oenl_121 |
| 122 | DB_1631610412546HSWK_0LNF_0015 | test_table_Oenl_122 |
| 123 | DB_1631610412546HSWK_0LNF_0015 | test_table_Oenl_123 |
| 124 | DB_1631610412546HSWK_0LNF_0015 | test_table_Oenl_124 |
| 125 | DB_1631610412546HSWK_0LNF_0015 | test_table_Oenl_125 |
| 126 | DB_1631610412546HSWK_0LNF_0015 | test_table_Oenl_126 |
| 127 | DB_1631610412546HSWK_0LNF_0015 | test_table_Oenl_127 |
+-----+------------------------------------+---------------------+
128 rows in set (0.28 sec)
```

## 分库分表键集合

查看分库分表键集合，分库键和分表键之间用逗号分割。如果最终结果有两个值，说明是既分库又分表的情形，第一个是分库键，第二个是分表键。如果结果只有一个值，说明是分库不分表的情形，该值是分库键。

```shell
mysql> show PARTITIONS from test_table;
+-------------+
| KEYS        |
+-------------+
| TESTTABLE_ID |
+-------------+
1 row in set (0.07 sec)
```

## 广播表列表

查看广播表列表。

```shell
SHOW BROADCASTS;
+------+------------+
| ID   | TABLE_NAME |
+------+------------+
|    0 | brd2       |
|    1 | brd_tbl    |
+------+------------+
2 rows in set (0.01 sec)
```

## SHOW DATASOURCES

查看底层存储信息，包含数据库名、数据库分组名、连接信息、用户名、底层存储类型、读写权重、连接池信息等。

```shell
SHOW DATASOURCES;
+------+----------------------------+------------------------------------------------+--------------------------------------------------+----------------------------------------------------------------------------------+-----------+-------+------+------+------+--------------+----------+--------------+---------------+----------------------------------------------+-------------+--------------+   
| ID   | SCHEMA                     | NAME                                           | GROUP                                            | URL                                                                              | USER      | TYPE  | INIT | MIN  | MAX  | IDLE_TIMEOUT | MAX_WAIT | ACTIVE_COUNT | POOLING_COUNT | ATOM                                         | READ_WEIGHT | WRITE_WEIGHT |
+------+----------------------------+------------------------------------------------+--------------------------------------------------+----------------------------------------------------------------------------------+-----------+-------+------+------+------+--------------+----------+--------------+---------------+----------------------------------------------+-------------+--------------+  
|    0 | seq_test_1487767780814rgkk | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0000_iiab_1 | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0000_RDS | jdbc:mysql://rds1ur80kcv8g3t6p3ol.mysql.rds.aliyuncs.com:3306/seq_test_wnjg_0000 | jnkinsea0 | xdb   | 0    | 24   | 72   | 15           | 5000     | 0            | 1             | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0000_iiab | 10          | 10           |  
|    1 | seq_test_1487767780814rgkk | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0001_iiab_2 | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0001_RDS | jdbc:mysql://rds1ur80kcv8g3t6p3ol.mysql.rds.aliyuncs.com:3306/seq_test_wnjg_0001 | jnkinsea0 | xdb   | 0    | 24   | 72   | 15           | 5000     | 0            | 1             | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0001_iiab | 10          | 10           |   
|    2 | seq_test_1487767780814rgkk | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0002_iiab_3 | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0002_RDS | jdbc:mysql://rds1ur80kcv8g3t6p3ol.mysql.rds.aliyuncs.com:3306/seq_test_wnjg_0002 | jnkinsea0 | xdb   | 0    | 24   | 72   | 15           | 5000     | 0            | 1             | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0002_iiab | 10          | 10           | 
|    3 | seq_test_1487767780814rgkk | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0003_iiab_4 | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0003_RDS | jdbc:mysql://rds1ur80kcv8g3t6p3ol.mysql.rds.aliyuncs.com:3306/seq_test_wnjg_0003 | jnkinsea0 | xdb   | 0    | 24   | 72   | 15           | 5000     | 0            | 1             | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0003_iiab | 10          | 10           |   
|    4 | seq_test_1487767780814rgkk | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0004_iiab_5 | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0004_RDS | jdbc:mysql://rds1ur80kcv8g3t6p3ol.mysql.rds.aliyuncs.com:3306/seq_test_wnjg_0004 | jnkinsea0 | xdb   | 0    | 24   | 72   | 15           | 5000     | 0            | 1             | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0004_iiab | 10          | 10           |   
|    5 | seq_test_1487767780814rgkk | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0005_iiab_6 | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0005_RDS | jdbc:mysql://rds1ur80kcv8g3t6p3ol.mysql.rds.aliyuncs.com:3306/seq_test_wnjg_0005 | jnkinsea0 | xdb   | 0    | 24   | 72   | 15           | 5000     | 0            | 1             | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0005_iiab | 10          | 10           |  
|    6 | seq_test_1487767780814rgkk | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0006_iiab_7 | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0006_RDS | jdbc:mysql://rds1ur80kcv8g3t6p3ol.mysql.rds.aliyuncs.com:3306/seq_test_wnjg_0006 | jnkinsea0 | xdb   | 0    | 24   | 72   | 15           | 5000     | 0            | 1             | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0006_iiab | 10          | 10           |  
|    7 | seq_test_1487767780814rgkk | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0007_iiab_8 | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0007_RDS | jdbc:mysql://rds1ur80kcv8g3t6p3ol.mysql.rds.aliyuncs.com:3306/seq_test_wnjg_0007 | jnkinsea0 | xdb   | 0    | 24   | 72   | 15           | 5000     | 0            | 1             | rds1ur80kcv8g3t6p3ol_seq_test_wnjg_0007_iiab | 10          | 10           |  
+------+----------------------------+------------------------------------------------+--------------------------------------------------+----------------------------------------------------------------------------------+-----------+-------+------+------+------+--------------+----------+--------------+---------------+----------------------------------------------+-------------+--------------+
```

重要列详解：

- **SCHEMA**：数据库名；
- **GROUP**：数据库分组名。分组的目标是管理多组数据完全相同的数据库，比如通过 RDS（MySQL）进行数据复制后的主备数据库。主要用来解决读写分离、主备切换的问题；
- **URL**：底层RDS（MySQL）的连接信息；
- **TYPE**：底层存储类型。
- **READ_WEIGHT**
  ：读权重。在主实例的读压力比较大的时候，可以通过读写分离功能将读流量进行分流，减轻RDS主实例的压力。PolarDB-X会自动识别读写流量，引导写流量进入RDS主实例，读流量则按配置的权重流向所有RDS实例；
- **WRITE_WEIGHT**：写权重。

## SHOW NODE

查看物理库的读写次数（历史累计数据）、读写权重（历史累计数据）。

```shell
SHOW NODE;
+------+--------------------------------------------------+-------------------+------------------+---------------------+--------------------+
| ID   | NAME                                             | MASTER_READ_COUNT | SLAVE_READ_COUNT | MASTER_READ_PERCENT | SLAVE_READ_PERCENT |
+------+--------------------------------------------------+-------------------+------------------+---------------------+--------------------+
| 0    | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0000_RDS |                12 |                0 | 100%                | 0%                 |
| 1    | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0001_RDS |                 0 |                0 | 0%                  | 0%                 |
| 2    | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0002_RDS |                 0 |                0 | 0%                  | 0%                 |
| 3    | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0003_RDS |                 0 |                0 | 0%                  | 0%                 |
| 4    | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0004_RDS |                 0 |                0 | 0%                  | 0%                 |
| 5    | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0005_RDS |                 0 |                0 | 0%                  | 0%                 |
| 6    | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0006_RDS |                 0 |                0 | 0%                  | 0%                 |
| 7    | SEQ_TEST_1487767780814RGKKSEQ_TEST_WNJG_0007_RDS |                 0 |                0 | 0%                  | 0%                 |
+------+--------------------------------------------------+-------------------+------------------+---------------------+--------------------+
8 rows in set (0.01 sec)
```

重要列详解：

- **MASTER_COUNT**：RDS主实例处理的读写查询次数（历史累计数据）；
- **SLAVE_COUNT**：RDS备实例处理的只读查询次数（历史累计数据）；
- **MASTER_PERCENT**：RDS主实例处理的读写查询占比（注意该列显示的是累计的实际数据占比，并不是用户配置的百分比）；
- **SLAVE_PERCENT**：RDS备实例处理的读写查询占比（注意该列显示的是累计的实际数据占比，并不是用户配置的百分比）。

## 慢SQL相关

执行时间超过1秒的SQL语句是慢SQL，逻辑慢SQL是指应用发送到PolarDB-X的慢SQL。

### 语法

```sql
SHOW [FULL] SLOW [WHERE expr] [limit expr]
```

- **SHOW SLOW**：查看自PolarDB-X启动或者上次执行**CLEAR SLOW**以来最慢的100条逻辑慢SQL；
- **SHOW FULL SLOW**：查看实例启动以来记录的所有逻辑慢SQL（持久化到PolarDB-X的内置数据库中），该记录数默认为100条。

```sql
SHOW [FULL] PHYSICAL_SLOW [WHERE expr] [limit expr]
```

- **SHOW PHYSICAL_SLOW**：查看自PolarDB-X启动或者上次执行**CLEAR SLOW**
  以来最慢的100条物理慢SQL（注意，这里记录的是最慢的100个，缓存在PolarDB-X系统中，当实例重启或者执行**CLEAR SLOW**时会丢失）;
- **SHOW FULL PHYSICAL_SLOW**：查看实例启动以来记录的所有物理慢SQL（持久化到PolarDB-X的内置数据库中）。该记录数默认为100条。

## 统计信息

### SHOW [FULL] STATS

查看整体的统计信息，这些信息都是瞬时值。

```sql
SHOW STATS;
+------+---------+----------+-------------------+------------------+------------------------+--------------------+--------+------------+--------------+---------------+----------------+---------------+---------------+--------------+
| QPS  | RDS_QPS | SLOW_QPS | PHYSICAL_SLOW_QPS | ERROR_PER_SECOND | MERGE_QUERY_PER_SECOND | ACTIVE_CONNECTIONS | RT(MS) | RDS_RT(MS) | NET_IN(KB/S) | NET_OUT(KB/S) | THREAD_RUNNING | DDL_JOB_COUNT | BACKFILL_ROWS | CHECKED_ROWS |
+------+---------+----------+-------------------+------------------+------------------------+--------------------+--------+------------+--------------+---------------+----------------+---------------+---------------+--------------+
| 0.00 |    0.00 |     0.00 |              0.00 |             0.00 |                   0.00 |                  1 |   0.00 |       0.00 |         0.00 |          0.00 |              1 |             0 |             0 |            0 |
+------+---------+----------+-------------------+------------------+------------------------+--------------------+--------+------------+--------------+---------------+----------------+---------------+---------------+--------------+

show full stats;
+------+---------+----------+-------------------+------------------+----------------------+------------------------+--------------------+------------------------------+--------+------------+--------------+---------------+----------------+----------------------+-----------------+----------------------------+-----------------------+------------------------------+-------------------------+--------------------------+---------------------+-------+---------+-------------+------------+
| QPS  | RDS_QPS | SLOW_QPS | PHYSICAL_SLOW_QPS | ERROR_PER_SECOND | VIOLATION_PER_SECOND | MERGE_QUERY_PER_SECOND | ACTIVE_CONNECTIONS | CONNECTION_CREATE_PER_SECOND | RT(MS) | RDS_RT(MS) | NET_IN(KB/S) | NET_OUT(KB/S) | THREAD_RUNNING | HINT_USED_PER_SECOND | HINT_USED_COUNT | AGGREGATE_QUERY_PER_SECOND | AGGREGATE_QUERY_COUNT | TEMP_TABLE_CREATE_PER_SECOND | TEMP_TABLE_CREATE_COUNT | MULTI_DB_JOIN_PER_SECOND | MULTI_DB_JOIN_COUNT | CPU   | FREEMEM | FULLGCCOUNT | FULLGCTIME |
+------+---------+----------+-------------------+------------------+----------------------+------------------------+--------------------+------------------------------+--------+------------+--------------+---------------+----------------+----------------------+-----------------+----------------------------+-----------------------+------------------------------+-------------------------+--------------------------+---------------------+-------+---------+-------------+------------+
| 1.63 |    1.68 |     0.03 |              0.03 |             0.02 |                 0.00 |                   0.00 |                  6 |                         0.01 | 157.13 |      51.14 |       134.33 |          1.21 |              1 |                 0.00 |              54 |                       0.00 |                   663 |                         0.00 |                     512 |                     0.00 |                 516 | 0.09% |   6.96% |       76446 |   21326906 |
+------+---------+----------+-------------------+------------------+----------------------+------------------------+--------------------+------------------------------+--------+------------+--------------+---------------+----------------+----------------------+-----------------+----------------------------+-----------------------+------------------------------+-------------------------+--------------------------+---------------------+-------+---------+-------------+------------+
1 row in set (0.01 sec)
            
```

重要列说明：

- **QPS**：应用到PolarDB-X的QPS，通常称为逻辑QPS；
- **RDS_QPS**：PolarDB-X到RDS的QPS，通常称为物理QPS；
- **ERROR_PER_SECOND**：每秒的错误数，包含SQL语法错误，主键冲突，系统错误，连通性错误等各类错误总和；
- **VIOLATION_PER_SECOND**：每秒的主键或者唯一键冲突；
- **MERGE_QUERY_PER_SECOND**：通过分库分表，从多表中进行的查询；
- **ACTIVE_CONNECTIONS**：正在使用的连接；
- **CONNECTION_CREATE_PER_SECOND**：每秒创建的连接数；
- **RT(MS)**：应用到PolarDB-X的响应时间，通常称为逻辑RT（响应时间）；
- **RDS_RT(MS)**：PolarDB-X到RDS/MySQL的响应时间，通常称为物理RT；
- **NET_IN(KB/S)**：PolarDB-X收到的网络流量；
- **NET_OUT(KB/S)**：PolarDB-X输出的网络流量；
- **THREAD_RUNNING**：正在运行的线程数；
- **HINT_USED_PER_SECOND**：每秒带HINT的查询的数量；
- **HINT_USED_COUNT**：启动到现在带HINT的查询总量；
- **AGGREGATE_QUERY_PER_SECOND**：每秒聚合查询的频次；
- **AGGREGATE_QUERY_COUNT**：聚合查询总数（历史累计数据）；
- **TEMP_TABLE_CREATE_PER_SECOND**：每秒创建的临时表的数量；
- **TEMP_TABLE_CREATE_COUNT**：启动到现在创建的临时表总数量；
- **MULTI_DB_JOIN_PER_SECOND**：每秒跨库JOIN的数量；
- **MULTI_DB_JOIN_COUNT**：启动到现在跨库JOIN的总量。

### SHOW DB STATUS

用于查看物理库容量/性能信息，所有返回值为实时信息。 容量信息通过MySQL系统表获得，与真实容量情况可能有差异。

```shell
SHOW DB STATUS;
+------+---------------------------+--------------------+-------------------+------------+--------+----------------+
| ID   | NAME                      | CONNECTION_STRING  | PHYSICAL_DB       | SIZE_IN_MB | RATIO  | THREAD_RUNNING |
+------+---------------------------+--------------------+-------------------+------------+--------+----------------+
|    1 | drds_db_1516187088365daui | 100.100.64.1:59077 | TOTAL             |  13.109375 | 100%   | 3              |
|    2 | drds_db_1516187088365daui | 100.100.64.1:59077 | drds_db_xzip_0000 |   1.578125 | 12.04% |                |
|    3 | drds_db_1516187088365daui | 100.100.64.1:59077 | drds_db_xzip_0001 |     1.4375 | 10.97% |                |
|    4 | drds_db_1516187088365daui | 100.100.64.1:59077 | drds_db_xzip_0002 |     1.4375 | 10.97% |                |
|    5 | drds_db_1516187088365daui | 100.100.64.1:59077 | drds_db_xzip_0003 |     1.4375 | 10.97% |                |
|    6 | drds_db_1516187088365daui | 100.100.64.1:59077 | drds_db_xzip_0004 |   1.734375 | 13.23% |                |
|    7 | drds_db_1516187088365daui | 100.100.64.1:59077 | drds_db_xzip_0005 |   1.734375 | 13.23% |                |
|    8 | drds_db_1516187088365daui | 100.100.64.1:59077 | drds_db_xzip_0006 |   2.015625 | 15.38% |                |
|    9 | drds_db_1516187088365daui | 100.100.64.1:59077 | drds_db_xzip_0007 |   1.734375 | 13.23% |                |
+------+---------------------------+--------------------+-------------------+------------+--------+----------------+
```

重要列说明：

- **NAME**：代表一个PolarDB-X DB，此处显示的是PolarDB-X内部标记，与PolarDB-X DB名称不同；
- **CONNECTION_STRING**：分库的连接信息；
- **PHYSICAL_DB**：分库名称，**TOTAL**行代表一个PolarDB-X DB中所有分库容量的总和；
- **SIZE_IN_MB**：分库中数据占用的空间，单位为MB；
- **RATIO**：单个分库数据量在当前PolarDB-X DB总数据量中的占比；
- **THREAD_RUNNING**：物理数据库实例当前正在执行的线程情况，含义与MySQL语句**SHOW GLOBAL STATUS**返回值的含义相同

### SHOW TABLE STATUS

获取表的信息，该指令聚合了底层各个物理分表的数据。

```shell
SHOW TABLE STATUS;
+---------+--------+---------+------------+------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
| NAME    | ENGINE | VERSION | ROW_FORMAT | ROWS | AVG_ROW_LENGTH | DATA_LENGTH | MAX_DATA_LENGTH | INDEX_LENGTH | DATA_FREE | AUTO_INCREMENT | CREATE_TIME         | UPDATE_TIME | CHECK_TIME | COLLATION          | CHECKSUM | CREATE_OPTIONS | COMMENT |
+---------+--------+---------+------------+------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
| sbtest1 | InnoDB |      10 | Dynamic    |    0 |              0 |     1310720 |               0 |            0 |         0 |              0 | 2021-07-20 15:39:37 | NULL        | NULL       | utf8mb4_general_ci | NULL     |                |         |
| t1      | InnoDB |      10 | Dynamic    |    0 |              0 |     2621440 |               0 |      2621440 |         0 |         200000 | 2021-07-26 20:11:15 | NULL        | NULL       | utf8mb4_general_ci | NULL     |                |         |
+---------+--------+---------+------------+------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
```

重要列详解：

- **NAME**：表名称；
- **ENGINE**：表的存储引擎；
- **VERSION**：表的存储引擎的版本；
- **ROW_FORMAT**
  ：行格式，主要是Dynamic、Fixed、Compressed这三种格式。动态（Dynamic）行的行长度可变，例如VARCHAR或BLOB类型字段；固定（Fixed）行是指行长度不变，例如CHAR和INTEGER类型字段；
- **ROWS**：表中的行数；
- **AVG_ROW_LENGTH**：平均每行包括的字节数；
- **DATA_LENGTH**：整个表的数据量（单位：字节）；
- **MAX_DATA_LENGTH**：表可以容纳的最大数据量；
- **INDEX_LENGTH**：索引占用磁盘的空间大小 ；
- **CREATE_TIME**：表的创建时间；
- **UPDATE_TIME**：表的最近更新时间；
- **COLLATION**：表的默认字符集和字符排序规则；
- **CREATE_OPTIONS**：指表创建时的其他所有选项。

查看具体TABLE的状态可以使用 like 关键字

```sql
mysql> SHOW TABLE STATUS like test_table;
+------------+--------+---------+------------+---------+----------------+-------------+-----------------+--------------+-----------+----------------+-----------------------+-----------------------+------------+-----------------+----------+----------------+---------+
| NAME       | ENGINE | VERSION | ROW_FORMAT | ROWS    | AVG_ROW_LENGTH | DATA_LENGTH | MAX_DATA_LENGTH | INDEX_LENGTH | DATA_FREE | AUTO_INCREMENT | CREATE_TIME           | UPDATE_TIME           | CHECK_TIME | COLLATION       | CHECKSUM | CREATE_OPTIONS | COMMENT |
+------------+--------+---------+------------+---------+----------------+-------------+-----------------+--------------+-----------+----------------+-----------------------+-----------------------+------------+-----------------+----------+----------------+---------+
| test_table | InnoDB |      10 | Dynamic    | 5701365 | 2133           | 12166168576 | 0               | 1966866432   | 7340032   |              0 | 2022-01-05 04:42:18.0 | 2023-06-07 18:00:04.0 | NULL       | utf8_general_ci | NULL     |                | 日志表  |
+------------+--------+---------+------------+---------+----------------+-------------+-----------------+--------------+-----------+----------------+-----------------------+-----------------------+------------+-----------------+----------+----------------+---------+
1 row in set (0.21 sec)
```

### SHOW TABLE INFO [name]

获取各个分表的数据量信息。

```shell
SHOW TABLE INFO SBTEST1;
+----+--------------+-----------------+------------+
| ID | GROUP_NAME   | TABLE_NAME      | SIZE_IN_MB |
+----+--------------+-----------------+------------+
|  0 | test1_000000 | sbtest1_wo5k_00 | 0.01562500 |
|  1 | test1_000000 | sbtest1_wo5k_01 | 0.01562500 |
|  2 | test1_000005 | sbtest1_wo5k_10 | 0.01562500 |
|  3 | test1_000005 | sbtest1_wo5k_11 | 0.01562500 |
|  4 | test1_000010 | sbtest1_wo5k_20 | 0.01562500 |
|  5 | test1_000010 | sbtest1_wo5k_21 | 0.01562500 |
|  6 | test1_000015 | sbtest1_wo5k_30 | 0.01562500 |
|  7 | test1_000015 | sbtest1_wo5k_31 | 0.01562500 |
|  8 | test1_000020 | sbtest1_wo5k_40 | 0.01562500 |
|  9 | test1_000020 | sbtest1_wo5k_41 | 0.01562500 |
| 10 | test1_000025 | sbtest1_wo5k_50 | 0.01562500 |
| 11 | test1_000025 | sbtest1_wo5k_51 | 0.01562500 |
| 12 | test1_000030 | sbtest1_wo5k_60 | 0.01562500 |
| 13 | test1_000030 | sbtest1_wo5k_61 | 0.01562500 |
| 14 | test1_000035 | sbtest1_wo5k_70 | 0.01562500 |
| 15 | test1_000035 | sbtest1_wo5k_71 | 0.01562500 |
+----+--------------+-----------------+------------+
```

## 分析数据分布不均衡

当数据分布不均匀，大部分数据集中在一两个节点时，将导致节点负载过高、查询缓慢，甚至造成节点故障

### 分库级别的数据倾斜

```sql
show db status
```

## 索引触发全表代价

- rds索引命中范围超过80%
- drds索引命中范围超过60%

底层优化逻辑都会触发自动执行全表扫描的。
