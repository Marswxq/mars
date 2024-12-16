# Jvm

**目录**

[[toc]]

## jvm开启gc日志

### 输出GC日志

```bash
-XX:+PrintGC 
```

### 输出GC的详细日志

```bash
-XX:+PrintGCDetails 
```

### 输出GC的时间戳（以基准时间的形式）

```bash
-XX:+PrintGCTimeStamps
```

### 输出GC的时间戳（以日期的形式，如 2013-05-04T21:53:59.234+0800）

```bash
-XX:+PrintGCDateStamps
```

### 在进行GC的前后打印出堆的信息

```bash
-XX:+PrintHeapAtGC
```

### 日志文件的输出路径

```bash
-Xloggc:../logs/gc.log
```

## jvm生成dump

### Full GC前生成dump

```bash
-XX:+HeapDumpBeforeFullGC 
```

### Full GC后生成dump

```bash
-XX:+HeapDumpAfterFullGC
```

### 发生OOM时dump

```bash
-XX:+HeapDumpOnOutOfMemoryError
```

### 设置Dump保存的路径

```bash
-XX:+HeapDumpPath
```

## jstat监控

### jstat命令格式

```bash
@mars ➜ ~  jstat generalOptions
-<option> required
Usage: jstat -help|-options
       jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]

Definitions:
  <option>      An option reported by the -options option
  <vmid>        Virtual Machine Identifier. A vmid takes the following form:
                     <lvmid>[@<hostname>[:<port>]]
                Where <lvmid> is the local vm identifier for the target
                Java virtual machine, typically a process id; <hostname> is
                the name of the host running the target Java virtual machine;
                and <port> is the port number for the rmiregistry on the
                target host. See the jvmstat documentation for a more complete
                description of the Virtual Machine Identifier.
  <lines>       Number of samples between header lines.
  <interval>    Sampling interval. The following forms are allowed:
                    <n>["ms"|"s"]
                Where <n> is an integer and the suffix specifies the units as
                milliseconds("ms") or seconds("s"). The default units are "ms".
  <count>       Number of samples to take before terminating.
  -J<flag>      Pass <flag> directly to the runtime system.
```

**命令参数说明**

- `generalOptions`：通用选项，如果指定一个通用选项，就不能指定任何其他选项或参数。它包括如下两个选项：
    - help：显示帮助信息。
    - options：显示outputOptions参数的列表。
- `outputOptions`：输出选项，指定显示某一种Java虚拟机信息。
- -t：把时间戳列显示为输出的第一列。这个时间戳是从Java虚拟机的开始运行到现在的秒数。
- -h n：每显示n行显示一次表头，其中n为正整数。默认值为 0，即仅在第一行数据显示一次表头。
- vmid：虚拟机唯一ID（LVMID，Local Virtual Machine Identifier），如果查看本机就是Java进程的进程ID。
- interval：显示信息的时间间隔，单位默认毫秒。也可以指定秒为单位，比如：1s。如果指定了该参数，jstat命令将每隔这段时间显示一次统计信息。
- count：显示数据的次数，默认值是无穷大，这将导致jstat命令一直显示统计信息，直到目标JVM终止或jstat命令终止。

**输出选项**

- `class`：显示类加载、卸载数量、总空间和装载耗时的统计信息。
- `compiler`：显示即时编译的方法、耗时等信息。
- `gc`：显示堆各个区域内存使用和垃圾回收的统计信息。
- `gccapacity`：显示堆各个区域的容量及其对应的空间的统计信息。
- `gcutil`：显示有关垃圾收集统计信息的摘要。
- `gccause`：显示关于垃圾收集统计信息的摘要(与-gcutil相同)，以及最近和当前垃圾回收的原因。
- `gcnew`：显示新生代的垃圾回收统计信息。
- `gcnewcapacity`：显示新生代的大小及其对应的空间的统计信息。
- `gcold`: 显示老年代和元空间的垃圾回收统计信息。
- `gcoldcapacity`：显示老年代的大小统计信息。
- `gcmetacapacity`：显示元空间的大小的统计信息。
- `printcompilation`：显示即时编译方法的统计信息。

### -class

- `Loaded`：加载的类的数量。
- `Bytes`：加载的类所占用的字节数。
- `Unloaded`：卸载的类的数量。
- `Bytes`：卸载的类所占用的字节数。
- `Time`：执行类加载和卸载操作所花费的时间。

eg:

```bash
@mars ➜ ~ jstat -class 13672
Loaded  Bytes  Unloaded  Bytes     Time
 53245 106800.0     1629  1985.9      38.56
```

### -compiler

- `Compiled`：执行的编译任务的数量。
- `Failed`：执行编译任务失败的数量。
- `Invalid`：执行编译任务失效的数量。
- `Time`：执行编译任务所花费的时间。
- `FailedType`：上次编译失败的编译类型。
- `FailedMethod`：上次编译失败的类名和方法。

eg:

```bash
@mars ➜ ~ jstat -compiler 13672
Compiled Failed Invalid   Time   FailedType FailedMethod
   71036     11       0   194.92          1 com/intellij/psi/util/PsiTreeUtilKt walkUpToCommonParent
```

### -gc

- `S0C`：年轻代中第一个Survivor区的容量，单位为KB。
- `S1C`：年轻代中第二个Survivor区的容量，单位为KB。
- `S0U`：年轻代中第一个Survivor区已使用大小，单位为KB。
- `S1U`：年轻代中第二个Survivor区已使用大小，单位为KB。
- `EC`：年轻代中Eden区的容量，单位为KB。
- `EU`：年轻代中Eden区已使用大小，单位为KB。
- `OC`：老年代的容量，单位为KB。
- `OU`：老年代已使用大小，单位为KB。
- `MC`：元空间的容量，单位为KB。
- `MU`：元空间已使用大小，单位为KB。
- `CCSC`：压缩类的容量，单位为KB。
- `CCSU`：压缩类已使用大小，单位为KB。
- `YGC`：Young GC的次数。
- `YGCT`：Young GC所用的时间。
- `FGC`：Full GC的次数。
- `FGCT`：Full GC的所用的时间。
- `GCT`：GC的所用的总时间。

eg:

```bash
@mars ➜ ~ jstat -gc 13672
 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT
 0.0   2048.0  0.0   1715.7 512000.0 184320.0  534528.0   431415.5  326528.0 323769.0 41024.0 39771.6    113    1.150   0      0.000    1.150
```

### -gccapacity

- `NGCMN`：年轻代最小的容量，单位为KB。
- `NGCMX`：年轻代最大的容量，单位为KB。
- `NGC`：当前年轻代的容量，单位为KB。
- `S0C`：年轻代中第一个Survivor区的容量，单位为KB。
- `S1C`：年轻代中第二个Survivor区的容量，单位为KB。
- `EC`：年轻代中Eden区的容量，单位为KB。
- `OGCMN`：老年代最小的容量，单位为KB。
- `OGCMX`：老年代最大的容量，单位为KB。
- `OGC`：当前老年代的容量，单位为KB。
- `OC`：当前老年代的容量，单位为KB。
- `MCMN`：元空间最小的容量，单位为KB。
- `MCMX`：元空间最大的容量，单位为KB。
- `MC`：当前元空间的容量，单位为KB。
- `CCSMN`：压缩类最小的容量，单位为KB。
- `CCSMX`：压缩类最大的容量，单位为KB。
- `CCSC`：当前压缩类的容量，单位为KB。
- `YGC`：Young GC的次数。
- `FGC`：Full GC的次数。

eg:

```bash
@mars ➜ ~ jstat -gccapacity 13672
 NGCMN    NGCMX     NGC     S0C   S1C       EC      OGCMN      OGCMX       OGC         OC       MCMN     MCMX      MC     CCSMN    CCSMX     CCSC    YGC    FGC
     0.0 1048576.0 499712.0    0.0 2048.0 497664.0        0.0  1048576.0   548864.0   548864.0      0.0 1335296.0 326848.0      0.0 1048576.0  41024.0    118     0
```

### -gcutil

- `S0`：年轻代中第一个Survivor区使用大小占当前容量的百分比。
- `S1`：年轻代中第二个Survivor区使用大小占当前容量的百分比。
- `E`：Eden区使用大小占当前容量的百分比。
- `O`：老年代使用大小占当前容量的百分比。
- `M`：元空间使用大小占当前容量的百分比。
- `CCS`：压缩类使用大小占当前容量的百分比。
- `YGC`：Young GC的次数。
- `YGCT`：Young GC所用的时间。
- `FGC`：Full GC的次数。
- `FGCT`：Full GC的所用的时间。
- `GCT`：GC的所用的总时间。

eg:

```bash
@mars ➜ ~ jstat -gcutil 13672
  S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT
  0.00  99.41  63.26  81.05  99.16  97.01    124    1.219     0    0.000    1.219
```

### -gccause

- `S0`：年轻代中第一个Survivor区使用大小占当前容量的百分比。
- `S1`：年轻代中第二个Survivor区使用大小占当前容量的百分比。
- `E`：Eden区使用大小占当前容量的百分比。
- `O`：老年代使用大小占当前容量的百分比。
- `M`：元空间使用大小占当前容量的百分比。
- `CCS`：压缩类使用大小占当前容量的百分比。
- `YGC`：Young GC的次数。
- `YGCT`：Young GC所用的时间。
- `FGC`：Full GC的次数。
- `FGCT`：Full GC的所用的时间。
- `GCT`：GC的所用的总时间。
- `LGCC`：上次垃圾回收的原因。
- `GCC`：当前垃圾回收的原因。

eg:

```bash
@mars ➜ ~ jstat -gccause 13672
  S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT    LGCC                 GCC
  0.00  76.07   5.03  80.20  99.17  97.01    127    1.241     0    0.000    1.241 G1 Evacuation Pause  No GC
```

### -gcnew

- `S0C`：年轻代中第一个Survivor区的容量，单位为KB。
- `S1C`：年轻代中第二个Survivor区的容量，单位为KB。
- `S0U`：年轻代中第一个Survivor区已使用大小，单位为KB。
- `S1U`：年轻代中第二个Survivor区已使用大小，单位为KB。
- `TT`：对象在年轻代存活的次数。
- `MTT`：对象在年轻代存活的最大次数
- `DSS`：期望的Survivor区大小，单位为KB。
- `EC`：年轻代中Eden区的容量，单位为KB。
- `EU`：年轻代中Eden区已使用大小，单位为KB。
- `YGC`：Young GC的次数。
- `YGCT`：Young GC所用的时间。

eg:

```bash
@mars ➜ ~ jstat -gcnew 13672
 S0C    S1C    S0U    S1U   TT MTT  DSS      EC       EU     YGC     YGCT
   0.0 3072.0    0.0 2927.9 15  15 31232.0 521216.0 221184.0    134    1.281
```

### -gcnewcapacity

- `NGCMN`：年轻代最小的容量，单位为KB。
- `NGCMX`：年轻代最大的容量，单位为KB。
- `NGC`：当前年轻代的容量，单位为KB。
- `S0CMX`：年轻代中第一个Survivor区最大的容量，单位为KB。
- `S0C`：年轻代中第一个Survivor区的容量，单位为KB。
- `S1CMX`：年轻代中第二个Survivor区最大的容量，单位为KB。
- `S1C`：年轻代中第二个Survivor区的容量，单位为KB。
- `ECMX`：年轻代中Eden区最大的容量，单位为KB。
- `EC`：年轻代中Eden区的容量，单位为KB。
- `YGC`：Young GC的次数。
- `FGC`：Full GC的次数。

eg:

```bash
@mars ➜ ~ jstat -gcnewcapacity 13672
  NGCMN      NGCMX       NGC      S0CMX     S0C     S1CMX     S1C       ECMX        EC      YGC   FGC
       0.0  1048576.0   533504.0      0.0      0.0 1048576.0   4096.0  1048576.0   529408.0   139     0
```

### -gcold

- `MC`：元空间的容量，单位为KB。
- `MU`：元空间已使用大小，单位为KB。
- `CCSC`：压缩类的容量，单位为KB。
- `CCSU`：压缩类已使用大小，单位为KB。
- `OC`：老年代的容量，单位为KB。
- `OU`：老年代已使用大小，单位为KB。
- `YGC`：Young GC的次数。
- `FGC`：Full GC的次数。
- `FGCT`：Full GC的所用的时间。
- `GCT`：GC的所用的总时间。

eg:

```bash
@mars ➜ ~  jstat -gcold 13672
   MC       MU      CCSC     CCSU       OC          OU       YGC    FGC    FGCT     GCT
327936.0 325220.0  41088.0  39811.6    506880.0    417613.0    148     0    0.000    1.379
```

### -gcoldcapacity

- `OGCMN`：老年代最小的容量，单位为KB。
- `OGCMX`：老年代最大的容量，单位为KB。
- `OGC`：当前老年代的容量，单位为KB。
- `OC`：当前老年代的容量，单位为KB。
- `YGC`：Young GC的次数。
- `FGC`：Full GC的次数。
- `FGCT`：Full GC的所用的时间。
- `GCT`：GC的所用的总时间。

eg:

```bash
@mars ➜ ~ jstat -gcoldcapacity 13672
   OGCMN       OGCMX        OGC         OC       YGC   FGC    FGCT     GCT
        0.0   1048576.0    520192.0    520192.0   155     0    0.000    1.415
```

### -gcmetacapacity

- `MCMN`：元空间最小的容量，单位为KB。
- `MCMX`：元空间最大的容量，单位为KB。
- `MC`：当前元空间的容量，单位为KB。
- `CCSMN`：压缩类最小的容量，单位为KB。
- `CCSMX`：压缩类最大的容量，单位为KB。
- `YGC`：Young GC的次数。
- `FGC`：Full GC的次数。
- `FGCT`：Full GC的所用的时间。
- `GCT`：GC的所用的总时间。

eg:

```bash
@mars ➜ ~ jstat -gcmetacapacity 13672
   MCMN       MCMX        MC       CCSMN      CCSMX       CCSC     YGC   FGC    FGCT     GCT
       0.0  1343488.0   328320.0        0.0  1048576.0    41088.0   160     0    0.000    1.446
```

### -printcompilation

- `Compiled`：最近编译方法执行的编译任务的数量。
- `Size`：最近编译方法的字节码的字节数。
- `Type`：最近编译方法的编译类型。
- `Method`：最近编译方法的类名和方法名。

eg:

```bash
@mars ➜ ~  jstat -printcompilation 13672
Compiled  Size  Type Method
   72613      5    1 java/math/BigDecimal scale
```

## jmap快照

### 命令格式

```bash
@mars ➜ ~  jmap -help
Usage:
    jmap [option] <pid>
        (to connect to running process)
    jmap [option] <executable <core>
        (to connect to a core file)
    jmap [option] [server_id@]<remote server IP or hostname>
        (to connect to remote debug server)

where <option> is one of:
    <none>               to print same info as Solaris pmap
    -heap                to print java heap summary
    -histo[:live]        to print histogram of java object heap; if the "live"
                         suboption is specified, only count live objects
    -clstats             to print class loader statistics
    -finalizerinfo       to print information on objects awaiting finalization
    -dump:<dump-options> to dump java heap in hprof binary format
                         dump-options:
                           live         dump only live objects; if not specified,
                                        all objects in the heap are dumped.
                           format=b     binary format
                           file=<file>  dump heap to <file>
                         Example: jmap -dump:live,format=b,file=heap.bin <pid>
    -F                   force. Use with -dump:<dump-options> <pid> or -histo
                         to force a heap dump or histogram when <pid> does not
                         respond. The "live" suboption is not supported
                         in this mode.
    -h | -help           to print this help message
    -J<flag>             to pass <flag> directly to the runtime system
```

- -heap: 显示Java堆的如下信息：
- -histo[:live]: 堆中对象的统计信息
- -clstats:堆中元空间的类加载器的统计信息
- -finalizerinfo：显示在F-Queue中等待Finalizer线程执行finalize方法的对象
- -dump:`<dump-options>`:
    - live: 参数是可选的，如果指定，则只转储堆中的活动对象；如果没有指定，则转储堆中的所有对象。
    - format=b: 表示以hprof二进制格式转储Java堆的内存。
    - file=`<file>`:  用于指定快照dump文件的文件名

### 生成dump文件

```bash
jmap -dump:file=javaDump.hprof,format=b [pid]
jmap -dump:file=javaDump.dump,format=b [pid]
```

### 查看JVM堆中对象详细占用情况

```bash
jmap -histo [pid]
```

## jstack

### 命令格式

```bash
jstack [-l] <pid>
jstack -F [-m] [-l] <pid>
jstack [-m] [-l] <executable> <core>
jstack [-m] [-l] [server_id@]<remote server IP or hostname>
```

- -F 当’jstack [-l] pid’没有响应的时候强制打印栈信息
- -l 长列表. 打印关于锁的附加信息，例如属于java.util.concurrent的ownable synchronizers列表.
- -m 打印java和native c/c++框架的所有栈信息. -h | -help打印帮助信息
- pid 需要被打印配置信息的java进程id,可以用jps工具查询。

### 程统计信息

- 统计线程数

```bash
./jstack -l [pid]|grep 'java.lang.Thread.State'|wc -l
```

- 统计waiting线程数

```bash
./jstack -l [pid]|grep 'java.lang.Thread.State: WAITING'|wc -l 
```

- 统计timed_waiting线程数

```bash
./jstack -l [pid]|grep 'java.lang.Thread.State: TIMED_WAITING'|wc -l
```

## jcmd

### 查看java进程可以执行的操作

```bash
jcmd <pid> help
```

### NMT内存监控

1. jvm开启 NMT

```bash
-XX:NativeMemoryTracking=summary|detail
```

2. 创建基线

```bash
jcmd <pid> VM.native_memory baseline
```

3. 内存变化

```bash
jcmd <pid> VM.native_memory detail.diff
```

### 查看内存分配

1. 添加jvm参数

```bash
-XX:NativeMemoryTracking=[off | summary | detail]
```

2. 执行查看

```bash
jcmd <pid> VM.native_memory [summary | detail | baseline | summary.diff | detail.diff | shutdown] [scale= KB | MB | GB]
# 汇总
jcmd <pid> VM.native_memory summary
# 明细
jcmd <pid> VM.native_memory detail
```

### 性能计数器

```bash
jcmd <pid> PerfCounter.print
```

### jvm属性信息

功能等同于 `jinfo -sysprops <pid>`

```bash
jcmd <pid> VM.system_properties
```

### jvm启动参数

功能等同于`jinfo -flags <pid>`

```bash
jcmd <pid> VM.flags
```

### jvm启动命令行

```bash
jcmd <pid> VM.command_line
```

### 查看堆信息

```bash
jmap [option] [pid]
```

### 生成dump文件

功能等同于`jmap -dump:format=b,file=heapdump.phrof <pid>`

```bash
jcmd <pid> GC.heap_dump FILE_NAME
```

### 线程堆栈信息

功能等同于`jstack -l`

```bash
jcmd <pid> Thread.print
```

### jvm版本信息

```bash
jcmd <pid> VM.version
```

## jps

### 命令格式

```bash
jps [-q] [-mlvV] [<hostid>]
```

- -q ：不显示主类名称、JAR文件名和传递给主方法的参数，只显示本地虚拟机唯一ID
- -mlvV ：我们可以指定这些参数的任意组合。
    - -m ：显示Java虚拟机启动时传递给main ()方法的参数。
    - -l ：显示主类的完整包名，如果进程执行的是JAR文件，也会显示JAR文件的完整路径。
    - -v ：显示Java虚拟机启动时传递的JVM参数。
    - -V ：不显示主类名称、JAR文件名和传递给主方法的参数，只显示本地虚拟机唯一ID
- hostid ：指定的远程主机，可以是ip地址和域名, 也可以指定具体协议，端口。 如果不指定，则显示本机的Java虚拟机的进程信息

## 内存参数

| 参数名称                                            | 含义                                    | 默认值             | 说明                                                                                                                                                                                                                                                                                                              |
|-------------------------------------------------|---------------------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -Xms                                            | 初始堆大小                                 | 物理内存的1/64(<1GB) | 默认(MinHeapFreeRatio参数可以调整)空余堆内存小于40%时，JVM就会增大堆直到-Xmx的最大限制                                                                                                                                                                                                                                                       |
| -Xmx                                            | 最大堆大小                                 | 物理内存的1/4(<1GB)  | 默认(MaxHeapFreeRatio参数可以调整)空余堆内存大于70%时，JVM会减少堆直到-Xms的最小限制                                                                                                                                                                                                                                                        |
| -Xmn                                            | 年轻代大小(1.4 or later)                  | 整个堆的3/8         | 注意：此处的大小是（eden + 2 survivor space + 2 survivor space）的值。与jmap -heap中显示的New gen是不同的。整个堆大小=年轻代大小 + 年老代大小 + 持久代大小。持久代一般固定大小为64m，所以增大年轻代后，将会减小年老代大小。此值对系统性能影响较大，Sun官方推荐配置为整个堆的3/8                                                                                                                                   |
| -XX:PermSize                                    | 设置持久代(perm gen)初始值                    | 物理内存的1/64       | java8取消该参数                                                                                                                                                                                                                                                                                                      |
| <div style="width: 100pt">-XX:MaxPermSize</div> | 设置持久代最大值                              | 物理内存的1/4        | java8取消该参数                                                                                                                                                                                                                                                                                                      |
| -Xss                                            | 每个线程的堆栈大小                             |                 | JDK5.0以后每个线程堆栈大小为1M,以前每个线程堆栈大小为256K.更具应用的线程所需内存大小进行 调整.在相同物理内存下,减小这个值能生成更多的线程.但是操作系统对一个进程内的线程数还是有限制的,不能无限生成,经验值在3000~5000左右一般小的应用， 如果栈不是很深， 应该是128k够用的 大的应用建议使用256k。这个选项对性能影响比较大，需要严格的测试。（校长）和threadstacksize选项解释很类似,官方文档似乎没有解释,在论坛中有这样一句话:"”-Xss is translated in a VM flag named ThreadStackSize”一般设置这个值就可以了。 |
| -XX:NewSize                                     | 设置年轻代大小(for 1.3/1.4)                  |
| -XX:MaxNewSize                                  | 年轻代最大值(for 1.3/1.4)                   |
| -XX:NewRatio                                    | 年轻代(包括Eden和两个Survivor区)与年老代的比值(除去持久代) |                 | -XX:NewRatio=4表示年轻代与年老代所占比值为1:4,年轻代占整个堆栈的1/5Xms=Xmx并且设置了Xmn的情况下，该参数不需要进行设置。                                                                                                                                                                                                                                     |
| -XX:SurvivorRatio                               | Eden区与Survivor区的大小比值                  |                 | 设置为8,则两个Survivor区与一个Eden区的比值为2:8,一个Survivor区占整个年轻代的1/10                                                                                                                                                                                                                                                         |
