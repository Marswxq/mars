# Linux 常用

**目录**

[[toc]]

## `

反引号的作用就是将反引号内的`Linux`命令先执行，然后将执行结果赋予变量。

```shell
# 将Linux命令赋予 listc , listc 的值就是该命令的执行结果
$ listc=`ls -la`    
```

## $

- `$$` 是进程ID
- `$!` 是最后运行的进程ID
- `$?` 最后运行的返回值（指的是上一指令的返回值）
- `$*` 和` $@` 是所有参数列表：`$@`的功能基本上与`$*`是相同。只不过`$*`返回的是一个字符串，字符串中存在多外空格，而`$@`
  返回多个字符串。
- `$#` 参数个数
- `$0` 是shell本身的文件名
- `$1` 到`$n` 是第1个参数，第2个参数……第n个参数

## find

### 语法

```bash
find path -option [ -print ] [ -exec -ok command ] {} \;
```

### 参数说明

find 根据下列规则判断 path 和 expression，在命令列上第一个 - ( ) , ! 之前的部份为 path，之后的是 expression。如果 path
是空字串则使用目前路径，如果 expression 是空字串则使用 -print 为预设 expression。
expression 中可使用的选项有二三十个之多，在此只介绍最常用的部份。

- -mount, -xdev : 只检查和指定目录在同一个文件系统下的文件，避免列出其它文件系统中的文件
- -amin n : 在过去 n 分钟内被读取过
- -anewer file : 比文件 file 更晚被读取过的文件
- -atime n : 在过去n天内被读取过的文件
- -cmin n : 在过去 n 分钟内被修改过
- -cnewer file :比文件 file 更新的文件
- -ctime n : 在过去n天内被修改过的文件
- -empty : 空的文件-gid n or -group name : gid 是 n 或是 group 名称是 name
- -ipath p, -path p : 路径名称符合 p 的文件，ipath 会忽略大小写
- -name name, -iname name : 文件名称符合 name 的文件。iname 会忽略大小写
- -size n : 文件大小 是 n 单位，b 代表 512 位元组的区块，c 表示字元数，k 表示 kilo bytes，w 是二个位元组。
- -type c : 文件类型是 c 的文件。
  d: 目录
  c: 字型装置文件
  b: 区块装置文件
  p: 具名贮列
  f: 一般文件
  l: 符号连结
  s: socket
- -pid n : process id 是 n 的文件

### 示例

将目前目录及其子目录下所有延伸档名是 c 的文件列出来

```bash
find . -name "*.c"
```

将目前目录其其下子目录中所有一般文件列出

```bash
find . -type f
```

将目前目录及其子目录下所有最近 20 天内更新过的文件列出

```bash
find . -ctime -20
```

查找/var/log目录中更改时间在7日以前的普通文件，并在删除之前询问它们

```bash
find /var/log -type f -mtime +7 -ok rm {} \;
```

查找前目录中文件属主具有读、写权限，并且文件所属组的用户和其他用户具有读权限的文件

```bash
find . -type f -perm 644 -exec ls -l {} \;
```

为了查找系统中所有文件长度为0的普通文件，并列出它们的完整路径

```bash
find / -type f -size 0 -exec ls -l {} \;
```

查找文件夹下最新的文件

```bash
find /data -type f -print0 | xargs -0 stat -c '%Y %n' | sort -nr | head -n 1 | cut -d ' ' -f 2
```

## cut

### 语法

```bash
cut [选项] [参数]
```

### 参数说明

- -b：仅显示行中指定直接范围的内容；

- -c：仅显示行中指定范围的字符；

- -d：指定字段的分隔符，默认的字段分隔符为“TAB”；

- -f：显示指定字段的内容；

- -n：与“-b”选项连用，不分割多字节字符；

- --complement：补足被选择的字节、字符或字段；

- --out-delimiter=<字段分隔符>：指定输出内容是的字段分割符；

- --help：显示指令的帮助信息；

- --version：显示指令的版本信息。

## route

```bash
route add -net 192.168.20.0 netmask 255.255.255.0 gw 10.12.20.80 dev eth0
```

## tar

### 语法

```bash
tar [参数] -f 归档文件名称.tar [文件...]
```

### 参数说明

- -c：创建一个新的归档文件。
- -x：解压归档文件。
- -t：列出归档文件的内容。
- -r：向现有归档文件中追加文件。
- -u：仅追加比归档文件中已有文件更新的文件。
- -d：找到归档文件中与文件系统不同步的差异。
- -A：将一个 .tar 文件追加到另一个 .tar 文件中。
- -f `<file>`：指定归档文件的名称（必须放在选项列表的最后）。
- -C `<directory>`：切换到指定目录进行操作。
- --exclude=`<pattern>`：排除匹配指定模式的文件。
- --exclude-from=`<file>`：从指定文件读取要排除的模式。
- --exclude-caches：排除目录中的缓存文件。
- --exclude-backups：排除以 ~ 结尾的备份文件。
- --exclude-vcs：排除版本控制系统生成的文件（如 .git、.svn 等）。
- -z：使用 gzip 压缩归档文件。
- -j：使用 bzip2 压缩归档文件。
- -J：使用 xz 压缩归档文件。
- --lzip：使用 lzip 压缩归档文件。
- --lzma：使用 lzma 压缩归档文件。
- --lzop：使用 lzop 压缩归档文件。
- --zstd：使用 zstd 压缩归档文件。
- -a：自动选择压缩方式（基于归档文件的扩展名，如 .tar.gz、.tar.bz2 等）。
- -I `<command>`：使用指定的压缩程序进行压缩或解压。
- -v：显示详细操作过程（verbose）。
- --progress：显示进度条（与 -v 一起使用时）。
- -w 或 --interactive：在每次操作前询问用户确认。
- --checkpoint：在处理每个文件后显示一个检查点。
- --checkpoint-action=`<action>`：在检查点执行指定的动作，如 echo、dot 等。
- --totals：在操作结束后显示处理的总字节数。
- --verbose：详细显示处理的信息。
- --quiet：尽可能少的输出信息。
- -p：保留文件的原始权限（解压时）。
- --same-owner：尝试将解压的文件设为原始所有者（需超级用户权限）。
- --no-same-owner：不设置文件所有者。
- --same-permissions：保留文件的原始权限（与 -p 相同）。
- --no-same-permissions：不保留原始权限，使用当前用户的 umask 设置权限。
- -m：在解压时不恢复文件的修改时间，而使用当前时间。
- -k 或 --keep-old-files：解压时保留已有文件，不覆盖。
- --overwrite：解压时强制覆盖已有文件。
- --remove-files：归档成功后删除原始文件。
- --delete：从归档文件中删除指定文件（仅限 gnu tar）。
- --keep-newer-files：解压时保留比归档中较新的文件。
- --listed-incremental=`<file>`：创建增量备份或从增量备份恢复。
- -L `<N>`：分割大于 N 字节的归档文件（对于磁带机）。
- --tape-length=`<number>`：指定磁带长度（对于磁带机）。
- --multi-volume：创建或恢复多卷归档文件。
- -M：与 --multi-volume 一起使用，处理多卷归档文件。
- --use-compress-program=`<prog>`：使用指定的压缩程序。
- --transform=`<expression>`：重命名归档中的文件。
- --strip-components=`<number>`：解压时剥离指定数量的路径组件。
- --ignore-failed-read：忽略读取错误并继续操作。
- --occurrence=`<number>`：在归档中选择第 number 个出现的文件。
- -S：处理稀疏文件（仅归档实际使用的块）。
- --no-recursion：不递归进入目录。
- -h 或 --dereference：归档符号链接指向的文件而非链接本身。

### 示例

#### 常用参数示例
创建归档文件：将文件 file1、file2 和 directory 打包到一个名为 archive.tar 的归档文件中。

```bash 
tar -cvf archive.tar file1 file2 directory
```

- -c: 创建新的归档文件
- -v: 显示详细输出，列出被添加到归档中的文件
- -f: 指定归档文件的名称

解压归档文件：解压名为 archive.tar 的归档文件，还原其中包含的文件和目录。

```bash
tar -xvf archive.tar
```

- -x: 解压归档文件
- -v: 显示详细输出，列出被解压的文件
- -f: 指定要解压的归档文件的名称

列出归档文件中的内容：仅仅列出名为 archive.tar 的归档文件中包含的所有文件和目录。

```bash
tar -tvf archive.tar
```

- -t: 列出归档文件中的内容
- -v: 显示详细输出，列出归档文件中的所有文件和目录
- -f: 指定要列出内容的归档文件的名称

追加文件到已存在的归档中：将名为 newfile 的文件添加到已存在的名为 archive.tar 的归档文件中。

```bash
tar -rvf archive.tar newfile
```

- -r: 向已存在的归档中追加文件
- -v: 显示详细输出，列出被添加到归档中的文件
- -f: 指定已存在的归档文件的名称

创建一个经过 gzip 压缩的归档文件：打包 directory 目录下的所有文件和子目录，并使用 gzip 压缩，生成名为 archive.tar.gz 的归档文件。

```bash
tar -zcvf archive.tar.gz directory
```

- -z: 表示要使用 gzip 进行压缩。
- -c: 表示创建新的归档文件。
- -v: 表示详细输出，列出被添加到归档中的文件。
- -f archive.tar.gz: 指定归档文件的名称为 archive.tar.gz。

解压一个已经被 gzip 压缩的归档文件：解压 example.tar.gz 文件，并在当前目录下恢复其中包含的文件和目录。

```bash
tar -zxvf example.tar.gz
```

- -z: 表示要使用 gzip 解压归档文件。
- -x: 表示解压操作。
- -v: 表示详细输出，列出被解压的文件。
- -f example.tar.gz: 指定要解压的归档文件的名称为 example.tar.gz。

解压一个已经被 gzip 压缩的归档文件：解压 example.tar.gz 文件，并在指定目录下恢复其中包含的文件和目录。

```bash
tar -zxvf example.tar.gz -C /指定目录
```

- -C：指定目录

指定压缩格式

* -z: 使用 gzip 压缩，文件格式`.gz`

```bash
tar -czvf archive.tar.gz directory
tar -xzvf archive.tar.gz
```

* j: 使用 bzip2 压缩。

```bash
tar -cjvf archive.tar.bz2 directory
tar -xjvf archive.tar.bz2
```

* J: 使用 xz 压缩。

```bash
tar -cJvf archive.tar.xz directory
tar -xJvf archive.tar.xz
```

#### 显示压缩进度

tar 显示解压进度，显示 mysql.tar.gz 解压缩的进度

方式一

```bash
tar -cf - mysql | pv -s $(($(du -sk mysql | awk '{print $1}') * 1024)) | gzip > mysql.tar.gz
```

方式二

```bash
pv mysql.tar.gz | tar -zxf - -C /opt
```

## pidstat

查看IO情况

### 语法

```bash
pidstat [ 选项 ] [ <时间间隔> ] [ <次数> ]
```

### 参数说明

-u：默认的参数，显示各个进程的cpu使用统计
-r：显示各个进程的内存使用统计
-d：显示各个进程的IO使用情况
-p：指定进程号
-w：显示每个进程的上下文切换情况
-t：显示选择任务的线程的统计信息外的额外信息
-V：版本号
-h：在一行上显示了所有活动，这样其他程序可以容易解析。
-I：在SMP环境，表示任务的CPU使用率/内核数量
-l：显示命令名和所有参数

### 示例

#### 进程的 CPU 使用情况

```
pidstat -u -p ALL
```

#### 内存使用情况统计

```bash
pidstat -r
pidstat -r -p [pid] 1 3 

[admin@iz8mo01o140qr7gk43egraz cn-nj-jsybj-d01]$ pidstat -r -p 16597 1 3 
Linux 3.10.0-693.2.2.el7.x86_64 (iz8mo01o140qr7gk43egraz)       06/27/2023      _x86_64_        (4 CPU)

04:53:25 PM   UID       PID  minflt/s  majflt/s     VSZ    RSS   %MEM  Command
04:53:26 PM  1000     16597      7.00      0.00 16393680 9374212  57.62  java
04:53:27 PM  1000     16597      6.00      0.00 16393680 9374212  57.62  java
04:53:28 PM  1000     16597      8.00      0.00 16393680 9374212  57.62  java
Average:     1000     16597      7.00      0.00 16393680 9374212  57.62  java
```

- PID：进程标识符
- Minflt/s:任务每秒发生的次要错误，不需要从磁盘中加载页
- Majflt/s:任务每秒发生的主要错误，需要从磁盘中加载页
- VSZ：虚拟地址大小，虚拟内存的使用KB
- RSS：常驻集合大小，非交换区五里内存使用KB
- Command：task命令名

#### 进程的IO使用情况

```bash
# 展示I/O统计，每秒更新一次
pidstat -d 1
```

- PID：进程id
- kB_rd/s：每秒从磁盘读取的KB
- kB_wr/s：每秒写入磁盘KB
- kB_ccwr/s：任务取消的写入磁盘的KB。当任务截断脏的pagecache的时候会发生。
- COMMAND:task的命令名

#### 显示选择任务的线程的统计信息外的额外信息

```bash
pidstat -t -p 2831
```

- TGID:主线程的表示
- TID:线程id
- %usr：进程在用户空间占用cpu的百分比
- %system：进程在内核空间占用cpu的百分比
- %guest：进程在虚拟机占用cpu的百分比
- %CPU：进程占用cpu的百分比
- CPU：处理进程的cpu编号
- Command：当前进程对应的命令

## tsar

### 安装

```shell
git clone https://github.com/alibaba/tsar.git
cd tsar
make
make install
```

### 语法

```bash
tsar [options]
```

#### 参数说明

**options**：
-check 查看最后一次的采集数据
--check/-C 查看最后一次tsar的提醒信息，如：tsar --check/ tsar --check--cpu--io
--cron/-c 使用crond模式来进行tsar监控
--interval/-i 指明tsar的间隔时间，默认单位分钟,带上--live参数则单位是秒
--list/-L 列出启用的模块
--live/-l 查看实时数据
--file/-f 指定输入文件
--ndays/-n 指定过去的数据天数，默认1天
--date/-d 指定日期,YYYYMMDD或者n代表n天前
--detail/-D 能够指定查看主要字段还是模块的所有字段
--spec/-s 指定字段,tsar –cpu -ssys,util
**Modules Enabled**：
--cpu 列出cpu相关的监控计数
--mem 物理内存的使用情况
--swap 虚拟内存的使用情况
--tcp TCP 协议 IPV4的使用情况
--udp UDP 协议 IPV4的使用情况
--traffic 网络传出的使用情况
--io Linux IO的情况
--pcsw 进程和上下文切换
--partition 磁盘使用情况
--tcpx TCP 连接相关的数据参数
--load 系统负载情况

### 示例

#### 监控系统的cpu

```bash
tsar --cpu
```

#### 监控虚存和load情况

```bash
tsar --swap --load
```

#### 监控内存使用情况

```bash
tsar --mem
```

#### 监控系统IO情况

```bash
tsar --io
```

#### 监控网络统计

```bash
tsar --traffic
tsar --tcp --udp -d 1
```

#### 监控告警信息

查看最后一次tsar的提醒信息，包括系统的cpu，io的告警情况

```bash
tsar --check --cpu --io
```

#### 指定日期

```bash
tsar --load -d 20200208
```

#### 历史数据回溯

-d 2 ：两天前到现在的数据，-i 1 ：每次1分钟作为采集显示

```bash
tsar -d 2 -i 1
```

## history

显示时间、ip

```bash
export HISTTIMEFORMAT="%F %T `who -u am i 2>/dev/null| awk '{print $NF}'|sed \-e 's/[()]//g'` `whoami`"
```

永久生效，显示时间、ip、日期格式化、history 历史记录条数

```bash
cat >> ~/.bash_profile << 'EOF'
HISTSIZE=10000
HISTFILESIZE=10000
USER_IP=`who -u am i 2>/dev/null| awk '{print $NF}'|sed -e 's/[()]//g'`
if [ -z $USER_IP ]
then
  USER_IP=`hostname`
fi
HISTTIMEFORMAT="%F %T $USER_IP:`whoami` "
export HISTTIMEFORMAT
export TIME_STYLE='+%Y-%m-%d %H:%M:%S'
EOF

source ~/.bash_profile
```

## top

### 语法

```bash
top [-] [d] [p] [q] [c] [C] [S] [n]
```

### 参数说明

-d： 指定每两次屏幕信息刷新之间的时间间隔。当然用户可以使用s交互命令来改变之。
-p： 通过指定监控进程ID来仅仅监控某个进程的状态。
-q：该选项将使top没有任何延迟的进行刷新。如果调用程序有超级用户权限，那么top将以尽可能高的优先级运行。
-S：指定累计模式
-s ：使top命令在安全模式中运行。这将去除交互命令所带来的潜在危险。
-i： 使top不显示任何闲置或者僵死进程。
-c： 显示整个命令行而不只是显示命令名

## sed

### 语法

```bash
sed [-hnV][-e<script>][-f<script文件>][文本文件]
```

#### 参数说明

-e`<script>`或`--expression=<script>` ：以选项中指定的`script`来处理输入的文本文件。
-f`<script文件>或--file=<script文件>` ：以选项中指定的`script`文件来处理输入的文本文件。
-n或--quiet或--silent ：仅显示`script`处理后的结果。

#### 示例

```bash
# sed -n '/开始时间/,/结束时间/' 被截取日志原文件名称>截取后存储日志文件名称（时间格式参考日志中时间格式）
sed -n '/2019\/12\/10-18:30:00/,/2019\/12\/10-21:00:00/'p test.log>1.log

# 截取一段时间内的登录日志可以使用SED命令对日志文件进行抽取操作：
sed  -n  '/May 20 17/,$p'   /var/log/messages  | less

# 假如日志的格式是 -，“2015-05-04 09：25：55606后面跟日志内容”这样的目标是需要将05-04的09:25:55和09： 28:08之间的日志从/home/wwwlogs/access.log截取出来，命令：
sed -n '/2015-05-04 09:25:55/,/2015-05-04 09:28:55/'p  /home/wwwlogs/access.log

# 如果要导出到/root/access0925_0928.log这个文件内
sed -n '/2015-05-04 09:25:55/,/2015-05-04 09:28:55/'p  /home/wwwlogs/access.log >/root/access0925_0928.log

# 如果截取的时间段是22/Feb/2019:15:57:00，那么可以使用在 / 前使用转移符  \ 
sed -n  '/22\/Feb\/2019:15:57:00/,/22\/Feb\/2019:15:57:59/'p  /home/wwwlogs/access.log >/root/access0925_0928.log

# 根据之前的日志格式，使用正则表达式：
sed -n '/2010-11-17 09:[0-9][0-9]:[0-9][0-9]/,/2010-11-17 16:[0-9][0-9]:[0-9][0-9]/'p  /home/wwwlogs/access.log
```

## grep

### 语法

```bash
grep [options] pattern [files]
或
grep [-abcEFGhHilLnqrsvVwxy][-A<显示行数>][-B<显示列数>][-C<显示列数>][-d<进行动作>][-e<范本样式>][-f<范本文件>][--help][范本样式][文件或目录...]
```

- pattern - 表示要查找的字符串或正则表达式。
- files - 表示要查找的文件名，可以同时查找多个文件，如果省略 files 参数，则默认从标准输入中读取数据。

### 参数说明

-a 或 --text : 不要忽略二进制的数据。
-A<显示行数> 或 --after-context=<显示行数> : 除了显示符合范本样式的那一列之外，并显示该行之后的内容。
-b 或 --byte-offset : 在显示符合样式的那一行之前，标示出该行第一个字符的编号。
-B<显示行数> 或 --before-context=<显示行数> : 除了显示符合样式的那一行之外，并显示该行之前的内容。
-c 或 --count : 计算符合样式的列数。
-C<显示行数> 或 --context=<显示行数>或-<显示行数> : 除了显示符合样式的那一行之外，并显示该行之前后的内容。
-d <动作> 或 --directories=<动作> : 当指定要查找的是目录而非文件时，必须使用这项参数，否则grep指令将回报信息并停止动作。
-e<范本样式> 或 --regexp=<范本样式> : 指定字符串做为查找文件内容的样式。
-E 或 --extended-regexp : 将样式为延伸的正则表达式来使用。
-f<规则文件> 或 --file=<规则文件> : 指定规则文件，其内容含有一个或多个规则样式，让grep查找符合规则条件的文件内容，格式为每行一个规则样式。
-F 或 --fixed-regexp : 将样式视为固定字符串的列表。
-G 或 --basic-regexp : 将样式视为普通的表示法来使用。
-h 或 --no-filename : 在显示符合样式的那一行之前，不标示该行所属的文件名称。
-H 或 --with-filename : 在显示符合样式的那一行之前，表示该行所属的文件名称。
-i 或 --ignore-case : 忽略字符大小写的差别。
-l 或 --file-with-matches : 列出文件内容符合指定的样式的文件名称。
-L 或 --files-without-match : 列出文件内容不符合指定的样式的文件名称。
-n 或 --line-number : 在显示符合样式的那一行之前，标示出该行的列数编号。
-o 或 --only-matching : 只显示匹配PATTERN 部分。
-q 或 --quiet或--silent : 不显示任何信息。
-r 或 --recursive : 此参数的效果和指定"-d recurse"参数相同。
-s 或 --no-messages : 不显示错误信息。
-v 或 --invert-match : 显示不包含匹配文本的所有行。
-V 或 --version : 显示版本信息。
-w 或 --word-regexp : 只显示全字符合的列。
-x --line-regexp : 只显示全列符合的列。
-y : 此参数的效果和指定"-i"参数相同。

### 示例

1. 显示/proc/meminfo文件中以大小写s开头的行

```bash
cat /proc/meminfo | grep -io "^[s].*"
```

2. 取出默认shell为非bash的用户

```bash
cat /etc/passwd | grep -v "[bash]$" | cut -d : -f 1
```

3. 取出默认shell为bash的且其ID号最大的用户

```bash
cat /etc/passwd | grep "bash$" | cut -d: -f 3 | sort -nr | head -1
```

4. 显示/boot/grub/grub.conf中以至少一个空白字符开头的行

```bash
cat /boot/grub/grub.conf | grep "^[[:space:]]\+"
```

5. 找出/etc/passwd文件中一位数或两位数

```bash
cat /etc/passwd | grep -o "\<[0-9][0-9]\>"
```

6. 找出ifconfig命令结果中所有ip地址

```bash
ifconfig | grep -o "[0-9.]\{7,\}"
```

7. 添加用户bash和testbash、basher，而后找出当前系统上其用户名和默认shell相同的用户

```bash
cat /etc/passwd | grep -E "^\<([[:alpha:]]{1,})\>:.*\1$"
```

8. 统计/etc/rc.d/rc.sysinit文件中以#开头的行的行数，以及空白行的行数

```bash
grep "^#.*" /etc/rc.d/rc.sysinit | wc -l
grep "^$" /etc/rc.d/rc.sysinit | wc -l
```

9. 利用df和grep，取出磁盘各分区利用率，并从大到小排序

```bash
df -h | grep "^/dev" | grep -o "[0-9]\+%" | grep -o "[0-9]\+" | sort -nr 
```

10. 显示匹配某个结果的前三行和后三行

```bash
grep "5" -C 3
```

11. 显示匹配某个结果之前的3行

```bash
grep "5" -B 3
```

12. 显示匹配某个结果之后的3行

```bash
grep "5" -A 3
```

13. 匹配多个字符

```bash
echo this is a text line | grep -e "is" -e "line" -o
```

14. 统计文件或者文本中包含匹配字符串的行数

```bash
grep -c "text" file_name
```

15. 匹配字符串的行数

```bash
grep "text" -n file_name
```

16. 只在目录中所有的.php和.html文件中递归搜索字符"main()"

```bash
grep "main()" . -r --include *.{php,html}
```

17. 在搜索结果中排除所有README文件

```bash
grep "main()" . -r --exclude "README"
```

18. 在搜索结果中排除filelist文件列表里的文件

```bash
grep "main()" . -r --exclude-from filelist
```

## 根据端口号获取PID

```bash
netstat -anp|grep 3031|awk '{printf $7}'|cut -d/ -f1|awk 'END {print}'
lsof -n -i4TCP:"7011" | grep LISTEN | grep -v grep | awk '{print $2}'|awk 'END {print}'
netstat -anp|grep 3306|awk '{printf $7}'|cut -d/ -f1
netstat -nlp | grep -w 端口号 | sed -r 's#.* (.*)/.*#\1#'
netstat -nlp | sed -nr '/端口号/s#.* (.*)/.*#\1#p'
netstat -nlp | awk -F'[ /]*' '/端口号/{print $(NF-2)}'
```

## 查看linux发行版本

```bash
cat /etc/*-release
```

## 终端快捷键

快捷键 作用
ctrl+A 把光标移动到命令行开头。如果我们输入的命令过长，想要把光标移动到命令行开头时使用。
ctrl+E 把光标移动到命令行结尾。
ctrl+C 强制终止当前的命令。
ctrl+L 清屏，相当于clear命令。
ctrl+U 删除或剪切光标之前的命令。我输入了一.行很长的命令，不用使用退格键一个一个字符的删除，使用这个快捷键会更加方便
ctrl+K 删除或剪切光标之后的内容。
ctrl+Y 粘贴ctrl+U或ctrl+K剪切的内容。
ctrl+R 在历史命令中搜索，按下ctrl+R之后，就会出现搜索界面，只要输入搜索内容，就会从历史命令中搜索。
ctrl+D 退出当前终端。
ctrl+Z 暂停，并放入后台。
ctrl+S 暂停屏幕输出。
ctrl+Q 恢复屏幕输出。

## 查看系统日志

```bash
dmesg | egrep -i -B100 'killed process'
egrep -i 'killed process' /var/log/messages
egrep -i -r 'killed process' /var/log
journalctl -xb | egrep -i 'killed process'
```

## 清空文件（日志）

```bash
cat /dev/null > nohup.out
```

## 查看进程所在路径

查看fcs进程所在路径

```bash
[root@iZ8mo01jezbn230jhebkotZ ~]# ps -ef | grep fcs |grep -v grep| awk '{print $2}' | xargs -I '{}' ls -l /proc/{}/cwd        
lrwxrwxrwx 1 admin admin 0 Jul  3 14:18 /proc/30086/cwd -> /home/admin
```

## 查看僵尸进程

```bash
ps -al | gawk '{print $2,$4}' | grep Z
```

## 比较两个目录文件是否一致

```bash
find ./目录1 -type f -exec md5sum {} \;|sed 's/目录2/'|md5sum -c >md5.log
```

跨机对比文件

```bash
find /目录1/ -type f -exec md5sum {} \;|ssh 192.168.1.250 "sed 's/目录2/'|md5sum -c"
```

## 查找并删除文件

```bash
# 第一种：
ls | grep 'test*' | xargs rm -rf

# 第二种：
find ./ -name '*.test' -exec rm -rf {} \;                                 #比较常用
或
find ./ -name '*.test' | xargs rm -rf

find ./*.test -exec rm -rf {} \;
或 
find ./*.test | xargs rm -rf

# 第三种：
aa=$(ls | grep 'test*')
rm $aa
# 注意：用管道符拼接后无法删除
aa=$(ls | grep 'test*') | rm -rf $aa

#还有就是下面的这个原因还没搞明白，原因如下：
#其次正则中 * 为限定符，修饰前一个字符或分组重复零次或多次。
#而 * 在开头前面没有字符或分组。所以匹配不到

#扩展,找到根目录下所有的以test开头的文件并把查找结果当做参数传给rm -rf命令进行删除： 
1、find / -name “test*” |xargs rm -rf 
2、find / -name “test*” -exec rm -rf {} \; 
3、rm -rf $(find / -name “test”)

#如果想指定递归深度，可以这样： 
1、find / -maxdepth 3 -name “*.mp3” |xargs rm -rf 
2、find / -maxdepth 3 -name “test*” -exec rm -rf {} \; 
3、rm -rf $(find / -maxdepth 3 -name “test”) 
# 这样只会查找三层目录中符合条件的文件并删除掉！ 

# 将/usr/local/backups目录下所有10天前带"."的文件删除
find /usr/local/backups -mtime +10 -name "*.*" -exec rm -rf {} \;
```

## 防火墙

### Centos 7

CentOS7 的防火墙配置跟以前版本有很大区别，CentOS7 这个版本的防火墙默认使用的是firewall，与之前的版本使用iptables不一样

#### 查看防火墙状态

```bash
systemctl status firewalld
```

或

```bash
firewall-cmd --state
```

#### 关闭防火墙

```bash
systemctl stop firewalld.service
```

#### 开启防火墙

```bash
systemctl start firewalld.service
```

#### 开启开机启动

```bash
systemctl enable firewalld.service
```

#### 关闭开机启动

```bash
systemctl disable firewalld.service
```

#### 开启端口

```bash
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

* --permanent: 永久生效
* --add-port: 端口和协议，可以是范围，如：8080-8090/tcp

#### 重启防火墙

```bash
firewall-cmd --reload
```

#### 查询某个端口是否开放

```bash
firewall-cmd --query-port=80/tcp
```

#### 移除端口

```bash
firewall-cmd --zone=public --remove-port=80/tcp --permanent
```

或

```bash
firewall-cmd --permanent --remove-port=123/tcp
```

#### 查询已经开放的端口列表

```bash
firewall-cmd --list-port
```

* --zone #作用域
* --add-port=80/tcp #添加端口，格式为：端口/通讯协议
* --remove-port=80/tcp #移除端口，格式为：端口/通讯协议
* --permanent #永久生效，没有此参数重启后失效

### CentOS6

#### 查看防火墙状态

```bash
service iptables status
```

#### 开启防火墙

```bash
service iptables start
```

#### 关闭防火墙

```bash
service iptables stop
```

### Ubuntu

#### 查看防火墙状态

```bash
ufw status
```

#### 开启防火墙

```bash
ufw enable
```

#### 关闭防火墙

```bash
ufw disable
```

## DNS

centos7 配置防火墙

```bash
vim /etc/resolv.conf
```

添加内容

```
nameserver 114.114.114.114
nameserver 8.8.8.8
```

## 最后启动时间

```bash 
who -b 
```

## 重启记录

```bash
last reboot 
```

## 运行时间

```
uptime
```

## 使用`.pem`登录

授权

```shell
chmod 600 xxx.pem
```

登录 ssh

```shell
ssh -i xxx.pem 用户@ip
```

登录sftp

```shell
sftp -i xxx.pem 用户@ip
```

## linux 全局时间格式化

```sehll
cat >> ~/.bash_profile << 'EOF'
export TIME_STYLE='+%Y-%m-%d %H:%M:%S'
EOF
source ~/.bash_profile
```