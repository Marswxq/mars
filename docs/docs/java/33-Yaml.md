# Yaml

## 语法

- 大小写敏感
- 只能用空格缩进（严禁使用 Tab 制表符）
- 缩进空格数必须统一（推荐 2 或 4 空格）
- 使用缩进表示层级关系
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

## 注释

`#`表示注释，从这个字符一直到行尾，都会被解析器忽略。

```yaml
# 这里都是注释内容
test: yaml
```

## 纯量

纯量又称字面量，是指单个的，不可拆分的值，例如：数字、字符串、布尔值、以及日期等

- 字符串：通常不需要引号，但如果包含特殊字符需要使用引号。按需选择单引号还是双引号，用法参考[引号用法](#引号)
- 数字：整数、浮点数
- 布尔值：`true`, `True`, `TRUE`, `on`, `yes` ,表示真； `false`, `False`, `FALSE`, `off`, `no` ，表示假。通常推荐使用小写的
  `true`和`false`保持一致性。
- 空值:`null`, `Null`, `NULL`, `~`。
- 时间戳：ISO 8601 格式 (2001-12-15T02:59:43.1Z)。

## 引号

通常不需要引号，但如果包含特殊字符（如 :`,` ,`{`, `}`, `[`,`]`, `&`,`*`, `#`, `?`, `|`, `-`, `<`, `>`, `=`, `!`, `%`,
`@`, ```）或空格开头/结尾，则需要用单引号 ' 或双引号 " 括起来。引号可以防止这些字符被解释为语法。

```yaml
unquoted: This is a string
single_quoted: 'This has a : colon'
double_quoted: "This allows \n escape sequences"
```

**注意：**

- 单引号字符串（不转义特殊字符）
- 双引号字符串（支持转义序列）

## 键值对

使用 `key: value`形式标识，注意`:`后边有一个空格

```yaml
key1: value1
k2: v2
```

## 文本块

文本块可以使用`|` (字面块)或`>` (折叠块)标记，并且与后面的字符串必须另起一行，规则如下：

- `|` 会保留块中已有的回车换行；
- `|+` 表示保留文本块末尾的换行；
- `|-` 表示删除字符串末尾的换行;
- `>` 标记的文本内容缩进表示的块，将块中回车替换为空格（但是字符串最开始和最末尾如果有回车的话，将不会替换为空格，保留的依然是回车，并且两个回车会作为一个回车来表示）

```yaml
comment_1: |
  my name is\njs.
comment_2: |+
  my name is\njs.
comment_3: |-
  my name is\njs.
over: true
comment_4: >

  hello.
  my name is \njs.

  goodbye.
```

上面的 yaml 输出结果为

```json
{
  "comment_1": "my name is\\njs.\n",
  "comment_2": "my name is\\njs.\n",
  "comment_3": "my name is\\njs.",
  "over": true,
  "comment_4": "\nhello. my name is \\njs.\ngoodbye.\n"
} 
```

## 列表

使用短横线 - 开头表示列表项

```yaml
test:
  - a
  - b
  - c
```

上面的 yaml 输出结果为

```json
{
  "test": [
    "a",
    "b",
    "c"
  ]
}
```

### 行内语法

行内 List（用方括号 `[]`）

```yaml
fruits: [ Apple, Banana, Orange ]
numbers: [ 1, 2, 3 ]
```

## Map

Map 其实就是比[键值对](#键值对)多了些层级，同理嵌套的 java 对象也试用

```yaml
test:
  map:
    k1: v1
    k2: v2
    obj:
      o1: ov1
      o2: ov2
```

上面的 yaml 输出结果为

```json
{
  "test": {
    "map": {
      "k1": "v1",
      "k2": "v2",
      "obj": {
        "o1": "ov1",
        "o2": "ov2"
      }
    }
  }
}
```

### 行内语法

行内 Map（用花括号 `{}`）

```yaml
person: { name: "Alice", age: 30 }
```

### List + Map

1. `List<Map>`

```yaml
users:
  - name: "Alice"
    role: "admin"
  - name: "Bob"
    role: "user"
```

2. `Map<Object,List>`

```yaml
department:
  name: "Engineering"
  members:
    - "Alice"
    - "Bob"
    - "Charlie"
```

3. 多层嵌套

```yaml
company:
  name: "TechCorp"
  teams:
    - name: "Dev"
      projects:
        - "Web App"
        - "Mobile App"
    - name: "QA"
      projects:
        - "Testing Suite"
```

4. 行内语法

```yaml
users:
  - { name: "Alice", role: "admin" }
  - { name: "Bob", role: "user" }
```

## 引用与锚点

引用与锚点主要是用来避免重复定义。

- 锚点 `&`： 标记一个节点以供后面引用。
- 别名 `*`： 引用之前定义的锚点。

```yaml
defaults: &defaults # 定义一个锚点 defaults ，注意使用 & 定义
  adapter: postgres
  host: localhost

development:
  <<: *defaults # 通过 << 将 defaults 锚点内容合并到当前层级，注意使用 * 锚点别名
  database: dev_db

test:
  <<: *defaults # 多次引用锚点内容
  database: test_db
```

## 文档分隔符

`---` 用于分隔同一个文件中的多个 YAML 文档。`... `可选地表示文档结束（较少使用）。

```yaml
# Document 1
name: Doc1
---
# Document 2
name: Doc2
```

通过`---`分割 yaml 后，编译器不会在提示 key 重复错误。

## 常见问题

## Q1.`@ConfigurationProperties`读取 Map 的 key 为中文

yaml 配置如下

```yaml
hy:
  test:
    listMap:
      - name1: js
      - name2: st
      - name3: ob
      - ”我是“: 1
```

错误日志

```java
Description:

Failed to bind properties under 'hy.test.list-map[3]' to java.util.Map<java.lang.String, java.lang.Object>:

    Property: hy.test.listmap[2].name3
    Value: ob
    Origin: class path resource [application.yml]:26:16
    Reason: No converter found capable of converting from type [java.lang.Integer] to type [java.util.Map<java.lang.String, java.lang.Object>]

Action:

Update your application's configuration
```

这个问题找了很久，在网上看到有人说需要使用`[]`把 key 包裹起来，内容如下：

```yaml
hy:
  test:
    listMap:
      - name1: js
      - name2: st
      - name3: ob
      - [ ”我是“ ]: 1
```

动手发线果然~~~，But WTF ?
[Spring 官方文档](https://docs.spring.io/spring-boot/reference/features/external-config.html)有这样一段描述

> Binding Maps
>
> When binding to Map properties you may need to use a special bracket notation so that the original key value is
> preserved.
> If the key is not surrounded by [], any characters that are not alpha-numeric, - or . are removed.
>
> For example, consider binding the following properties to a Map<String,String>:

```yaml
my:
  map:
    "[/key1]": "value1"
    "[/key2]": "value2"
    "/key3": "value3"
```

> For YAML files, the brackets need to be surrounded by quotes for the keys to be parsed properly.

大致意识是说，绑定 Map 属性时，可能需要使用特殊的括号符号，以保留原始键值。如果 key 没有被`[]`包围，则任何非字母数字、-或的字符将会被移除。
对于YAML文件，括号需要用引号括起来，以便正确解析键。

以上，感觉在歧视~~~中文，FXXK....