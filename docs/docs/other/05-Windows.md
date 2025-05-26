# Windows

## 查找端口

```shell
netstat -ano | findstr [端口号]
```

## 查找进程

```shell
tasklist | findstr [进程关键字]
```

## 杀掉进程

```shell
taskkill /F /PID [PID]
```

## C 盘瘦身

通过 mklink 命令将某些大文件或目录链接到其他磁盘，从而节省系统盘空间。

```shell
mklink /D link target
```

示例，将 C 盘下腾讯相关目录迁移到 D 盘下，从而释放 C 盘空间。

1. 先手动将"C:\Users\mars\AppData\Roaming\Tencent"迁移到"D:\tmp\07-Tencent"。
2. cmd 下执行如下命令。

```shell
mklink /d "C:\Users\mars\AppData\Roaming\Tencent" "D:\tmp\07-Tencent"
```


