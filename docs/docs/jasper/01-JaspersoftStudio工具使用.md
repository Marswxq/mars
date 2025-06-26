# Jaspersoft studio 工具使用

**目录**

[[toc]]

## Jaspersoft studio 安装

地址：[Jaspersoft studio](https://community.jaspersoft.com/files/file/19-jaspersoft%C2%AE-studio-community-edition/?do=download&r=235&confirm=1&t=1&csrfKey=4c772766151f1401a9ca13474674c73c)

基础环境：jdk1.8+

## Jaspersoft studio 说明

### Outline 元素列表

| 元素               | 名词     | 描述                                |
|------------------|--------|-----------------------------------|
| Styles           | 样式     | 可以创建全局样式，在表格处用的比较多                |
| Parameters       | 参数     | 由外面传递到里面的参数，一般使用HashMap，也可以向子报表传参 |
| Fields           | 字段     | 映射字段                              |
| Sort Fields      | 有序字段   | 有序的映射字段                           |
| Scriptlets       | 脚本     |                                   |
| Title            | 标题     | 除了第一页，其他页都不展示                     |
| Page Header      | 页头     | 每页都会展示，在页面上部                      |
| Column Header    | 列头     | 表中列的列头                            |
| Detail           | 内容区    | 重复出现的内容在此展示                       |
| Column Footer    | 列脚     | 表中列的列脚                            |
| Page Footer      | 页脚     | 每页都会展示，在页面下部                      |
| Last Page Footer | 最后一页页脚 | 只在最后一页展示                          |
| Summary          | 统计区    | 报表最后一页中，一般用来统计                    |
| Background       | 背景     | 设置报表的背景样式                         |
| No Data          |        |                                   |

### Basic Elements 基本元素

| 元素                   | 描述      |
|----------------------|---------|
| Note                 | 备注      |
| Text Field           | 动态文本    |
| Static Text          | 静态文本    |
| Image                | 图片      |
| Break                | 强制分页符   |
| Rectangle            | 矩形      |
| Ellipase             | 椭圆      |
| Line                 | 线条      |
| Generic              |         |
| Frame                | 框架      |
| Barcode              | 条形码、二维码 |
| List                 | List集合  |
| Chart                | 图表      |
| Crosstab             |         |
| Table                | 表格      |
| Map                  | Map     |
| Spider               | 网状图表    |
| Custom Visualization |         |

### Report 模板参数

| 元素                                  | 名称                     | 描述                                         |
|-------------------------------------|------------------------|--------------------------------------------|
| Report Name                         | 模板名称                   | 注意，如果你复制了一份模板文件，这个地方是没有修改的                 |
| Description                         | 模板描述                   | 这个模板文件是干什么的，起注释作用                          |
| Language                            |                        | 有三种 Java、groovy、javascript，这里指定报表表达式使用的语言。 |
| Imports                             | 引入其他包                  | 自定义，或者第三方                                  |
| Format Factory Class                | 翻译                     | 指定实现要与此报表一起使用的接口的类的名称。如果省略，将创建的实例          |
| When No Data Type                   | 参数                     | 当打印的报表数据源中没有数据的情况下，也就是数据源为空的情况下            |
|                                     | null                   | 默认，不选择。                                    |
|                                     | No Pages               | 不打印数据。                                     |
|                                     | Blank Pages            | 返回一个空白的页面。                                 |
|                                     | All Sections No Detail | 打印除了Detail 之外的所有页面。                        |
|                                     | No Data Section        | 把No Data的Band 的也打印出来。                      |
| Title On A New Page                 |                        | 表示 Tilte Band 单独一页打印。                      |
| Summary On A New Page               |                        | 表示 Summary 单独一页打印。                         |
| Summary With Page Header And Footer |                        | 表示在Sumnmary最后一页，也显示Header头 和 Footer脚       |
| Float Column Footer                 |                        | 在最后一页,Column Foot(列脚)是否紧挨着最后一个Details      |
| Ignore Pagination                   |                        | 忽略分页                                       |
| Create bookmarks                    |                        | 创建书签                                       |
| Dataset                             |                        |                                            |
| When Resource Missing Type          | 参数                     | 当资源的属性错误时                                  |
|                                     | Null                   | 默认，为Null                                   |
|                                     | Empty                  | 空                                          |
|                                     | Key                    | 输出key                                      |
|                                     | Error                  | 报错，异常                                      |
| Scriptlet Class                     |                        | 自定义scriptlet，可在报表生成时自定义一些行为                |
| Resource Bundle                     |                        | 资源绑定，报表所用资源文件                              |
| Default Data Adapter                |                        | 默认数据源，在这里，可以选择数据源配置在哪里                     |
| Edit query,filter and sort options  |                        | 数据源相关操作                                    |
| Page Format                         | 报表格式化                  | 类似打印预览设置                                   |

### 内置参数

<img :src="$withBase('/images/jasper/内置参数.png')" alt="内置参数">

| 元素                  | 名称           | 描述                                  |
|---------------------|--------------|-------------------------------------|
| $V{PAGE_NUMBER}     | 当前页数         | 可以是页码也可以是页数，通过TextField的计算时间的不同值来设置 |
| $V{PAGE_COUNT}      | 前页面中记录的数目    |                                     |
| $V{GROUPNAME_COUNT} | 当前组的记录数      |                                     |
| $V{COLUMN_NUMBER}   | 列号码          | 当前page中的列号，用于序号等                    |
| $V{REPORT_COUNT}    | 当前文档中数据源记录数目 | 全文档总的列号，分页后列号是连续的，用于序号等             |

## JasperReport 开发

1. JRXML：报表填充模板，本质是一个XML。

2. Jasper：由JRXML模板编译生成的二进制文件，用于代码填充数据。

### 创建Report及数据源

1. 创建Report

<img :src="$withBase('/images/jasper/创建Report.png')" alt="创建Report">

2. 选择模板，空白即可，下一步

<img :src="$withBase('/images/jasper/空白Report.png')" alt="空白Report">

3. 填写Report名称，下一步

<img :src="$withBase('/images/jasper/Report名称.png')" alt="Report名称">

4. 选择/创建数据源

<img :src="$withBase('/images/jasper/数据源.png')" alt="数据源">

4.1. 首次使用，点击“New”创建数据源，选择“Database JDBC Connection”，点击下一步

<img :src="$withBase('/images/jasper/创建数据源.png')" alt="创建数据源">

4.2. 填写数据源配置

* Name：数据源名称
* JDBC Driver：驱动名称，选 MySQL (com.mysql.jdbc.Driver)
* JDBC
  Url：数据库连接串，填如
  `jdbc:mysql://ip:port/db\_name?characterEncoding=utf8&useUnicode=true&zeroDateTimeBehavior=convertToNull&autoReconnect=true&failOverReadOnly=false&allowMultiQueries=true&connectTimeout=60000&socketTimeout=60000`
  ，注意修改`ip:port/db\_name`内容
* Username：数据库用户名
* Password：数据库密码

<img :src="$withBase('/images/jasper/数据源信息.png')" alt="数据源信息">

4.3. 配置数据源驱动

<img :src="$withBase('/images/jasper/数据库驱动.png')" alt="数据库驱动">

4.4. 测试并保存

<img :src="$withBase('/images/jasper/测试并保存.png')" alt="测试并保存">

4.5. 填写SQL

未定义参数前可以不填写sql，或者使用`where 1 = 2 `解析字段即可

**注意：** `$P{emp\_dept\_name}` 为 JasperReport 参数传递语法，参考下文“参数”中的配置

<img :src="$withBase('/images/jasper/填写sql.png')" alt="填写sql">

### 设计Reoprt

1. 删除Report中不使用的内容

<img :src="$withBase('/images/jasper/删除不使用内容.png')" alt="删除不使用内容">

2. 设计Report内容

2.1. Title & Column Header ：表头和列头

<img :src="$withBase('/images/jasper/表头和列头.png')" alt="表头和列头">

- 表头设置

<img :src="$withBase('/images/jasper/表头字体布局设置.png')" alt="表头字体布局设置">

- 列头快速布局

<img :src="$withBase('/images/jasper/列头快速布局.png')" alt="列头快速布局">

- 列头背景色

<img :src="$withBase('/images/jasper/列头背景色.png')" alt="列头背景色">

2.2. 填充列

<img :src="$withBase('/images/jasper/列属性.png')" alt="列属性">

- 数据集配置

<img :src="$withBase('/images/jasper/数据集.png')" alt="数据集">

- 解析数据集

<img :src="$withBase('/images/jasper/解析数据集.png')" alt="解析数据集">

- 填充结果

<img :src="$withBase('/images/jasper/填充结果.png')" alt="填充结果">

- 最终结果

<img :src="$withBase('/images/jasper/最终结果.png')" alt="最终结果">

### 预览Report

<img :src="$withBase('/images/jasper/预览.png')" alt="预览">

### 参数

* 参数可以定义在 where 条件中，用于过滤数据，语法为 `$P{参数名}`，比如：

  ```sql
  where emp_dept_name = $P{emp_dept_name}
  ```

* 参数也可以传入 SQL 片段，用于拼接 SQL 语句，语法为 `$P!{参数名}`，比如：

  ```sql
  where $P!{conditions}
  ```

<img :src="$withBase('/images/jasper/参数.png')" alt="参数">

* 处理 SQL 语句中的 Null，`$P{parametername}` 格式的参数，无法正确处理`Null`
  值，我们可以使用 `$X{EQUAL,fieldname,parametername}`来处理 Null 值。也可以通过样式/格式设置

<img :src="$withBase('/images/jasper/样式格式.png')" alt="样式格式">

* 处理 SQL 语句中的 IN 与 NOT IN 形式，`$X{IN 或者 NOTIN, 字段名,参数名}`
  ，emp\_dept\_values的参数值一般是一个列表（`java.util.Collection`）或者一个数组

  ```sql
  select * from emp where $X{IN, emp_dept_name,emp_dept_values}
  ```

### 样式

1. 设置单元格和内容的长宽

<img :src="$withBase('/images/jasper/设置单元格和内容的长宽.png')" alt="设置单元格和内容的长宽">

2. 边框

<img :src="$withBase('/images/jasper/边框.png')" alt="边框">

3. 字体和单元格内边距

<img :src="$withBase('/images/jasper/字体和单元格内边距.png')" alt="字体和单元格内边距">

## JasperReport Table

### 创建Report

创建报表：file->new->Jasper Report，删掉不适用的元素。

<img :src="$withBase('/images/jasper/table新建.png')" alt="table新建">

### 创建参数

Outline: table_demo->Parameters->Create Parameter

参数用于报表传值，调用报表时候的参数值，理解为sql中的where条件

<img :src="$withBase('/images/jasper/table参数.png')" alt="table参数">

<img :src="$withBase('/images/jasper/table参数名.png')" alt="table参数名">

### 创建Dataset and Query

Outline: table_demo->Dataset and Query

主数据源的数据集，用于报表展现和table中sql参数的获取

<img :src="$withBase('/images/jasper/table数据集.png')" alt="table数据集">

<img :src="$withBase('/images/jasper/table数据集内容.png')" alt="table数据集内容">

### Dataset

- 创建Empty Dataset

Outline: table_demo->Create Dataset

table dataset：table展现的内容

<img :src="$withBase('/images/jasper/table子数据集.png')" alt="table子数据集">

<img :src="$withBase('/images/jasper/table_dataset_empty.png')" alt="table_dataset_empty">

- 创建Dataset Parameter

Outline: table_demo->emptable->Parameters->Create Parameter

<img :src="$withBase('/images/jasper/table_dataset_parameter.png')" alt="table_dataset_parameter">

- 修改Detaset

Outline: table_demo->emptable->Dataset and Query

<img :src="$withBase('/images/jasper/table_dataset.png')" alt="table_dataset">

### Table

- 配置table

<img :src="$withBase('/images/jasper/table_dataset_step0.png')" alt="table_dataset_step0">

<img :src="$withBase('/images/jasper/table_dataset_step1.png')" alt="table_dataset_step1">

<img :src="$withBase('/images/jasper/table_dataset_step2.png')" alt="table_dataset_step2">

<img :src="$withBase('/images/jasper/table_dataset_step3.png')" alt="table_dataset_step3">

<img :src="$withBase('/images/jasper/table_dataset_step4.png')" alt="table_dataset_step4">

<img :src="$withBase('/images/jasper/table_dataset_step5.png')" alt="table_dataset_step5">

<img :src="$withBase('/images/jasper/table_dataset_step6.png')" alt="table_dataset_step6">

<img :src="$withBase('/images/jasper/table_dataset_step7.png')" alt="table_dataset_step7">

<img :src="$withBase('/images/jasper/table_dataset_step8.png')" alt="table_dataset_step8">

- 预览table

<img :src="$withBase('/images/jasper/table_dataset_step9.png')" alt="table_dataset_step9">

### Table的一些扩展

#### 表格的表头

table design模式下，给多有column新建一个Group Columns

<img :src="$withBase('/images/jasper/table_header.png')" alt="table_header">

<img :src="$withBase('/images/jasper/table_header1.png')" alt="table_header1">

#### 动态table

根据主数据源返回结果，自动按照部门分组，每个部门一个独立table

<img :src="$withBase('/images/jasper/table_header2.png')" alt="table_header2">

<img :src="$withBase('/images/jasper/table_header3.png')" alt="table_header3">

<img :src="$withBase('/images/jasper/table_header4.png')" alt="table_header4">

##### table参数

table参数可以选择主数据的结果（Fields），也可以选择系统参数（Parameters）

<img :src="$withBase('/images/jasper/table_parameter.png')" alt="table_parameter">

#### table 列求和

使用dataset的variables对列进行求和。

创建可变参数

<img :src="$withBase('/images/jasper/table_sum_variables.png')" alt="table_sum_variables">

配置可变参数，注意用于计算的属性需要与variables数据类型保持一致

<img :src="$withBase('/images/jasper/table_sum_variables1.png')" alt="table_sum_variables1">

配置计算

<img :src="$withBase('/images/jasper/table_sum_variables2.png')" alt="table_sum_variables2">

预览

<img :src="$withBase('/images/jasper/table_sum_variables3.png')" alt="table_sum_variables3">

## JasperReport Frame

Frame 元素，会根据内容自动拉伸显示的内容，实现动态文本高度。

下面是一个简单的测试报表，在不配置字体和单元格的情况下，字体过长会被截断。

![基础报表](/images/jasper/jasper_frame_基础报表.png)

测试下效果，输入参数设置为一个长点的内容

```text
2222222222222222222222222测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测1111111111111111111111111试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试4444444444444444444444444444444444444444
```

预览效果如下，可以发现文字显示不全

![基础报表预览](/images/jasper/jasper_frame_基础报表预览.png)

然后将入参文本属性设置为自适应高度，$P(text)->Text field->Text Adjust，将其属性设置为 StretchHeight

![基础报表入参设置高度自适应](/images/jasper/jasper_frame_基础报表入参设置高度自适应.png)

预览效果如下，发现文字内容确实自适应高度了，但是会覆盖下面单元格内容

![基础报表自文本适应高度预览](/images/jasper/jasper_frame_基础报表自文本适应高度预览.png)

引入 Frame ，并设置高度自适应

![jasper_frame_元素](/images/jasper/jasper_frame_元素.png)

![jasper_frame_配置1](/images/jasper/jasper_frame_配置1.png)

![jasper_frame_配置2](/images/jasper/jasper_frame_配置2.png)

最后预览效果如下

![jasper_frame_预览](/images/jasper/jasper_frame_预览.png)

***注意：*** 如果多选元素设置属性失败，需要逐个属性配置以上截图内容