# Jar包

**目录**

[[toc]]

## 命令格式

```shell
jar {ctxui}## [vfmn0PMe] [jar-file] [manifest-file] [entry-point] [-C dir] files ...
```

## 参数说明

-c  创建新档案 -t  列出档案目录 -x  从档案中提取指定的 (或所有) 文件 -u  更新现有档案 -v  在标准输出中生成详细输出 -f  指定档案文件名 -m  包含指定清单文件中的清单信息 -n  创建新档案后执行 Pack200 规范化 -e  为捆绑到可执行 jar 文件的独立应用程序 指定应用程序入口点 -0  仅存储; 不使用任何 ZIP 压缩 -P  保留文件名中的前导 '/' (绝对路径) 和 ".." (父目录) 组件 -M  不创建条目的清单文件 -i  为指定的 jar 文件生成索引信息 -C  更改为指定的目录并包含以下文件 如果任何文件为目录, 则对其进行递归处理。清单文件名, 档案文件名和入口点名称的指定顺序与 'm', 'f' 和 'e' 标记的指定顺序相同。

## 示例 1: 将两个类文件归档到一个名为 classes.jar 的档案中

```shell
jar cvf classes.jar Foo.class Bar.class
```

## 示例 2: 使用现有的清单文件 'mymanifest' 并 将 foo/ 目录中的所有文件归档到 'classes.jar' 中

```shell
jar cvfm classes.jar mymanifest -C foo/ .
```

## 解压

```shell
jar -xvf xxx.jar
```

## 打包

```shell
jar cvfM0 xxx.jar -C . BOOT-INF/ com/ META-INF/
```

