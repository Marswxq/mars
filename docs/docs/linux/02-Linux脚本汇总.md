# Linux 脚本汇总

## 比较AB两台服务器文件是否一致

```bash
#!/bin/bash
#假设A机器到B机器已经做了无密码登录设置
dir=/home/web11/newsystem
md5dir=/home/web11
rm -rf $md5dir/md5.txt $md5dir/md5_b.txt
##假设B机器的IP为192.168.0.100
B_user=web11
B_ip=192.168.131.243
#过滤掉.kepp文件
find "$dir" -type f |grep -v "*.keep"| xargs md5sum > $md5dir/md5.txt
ssh $B_user@$B_ip "rm -rf $md5dir/md5_b.txt"
ssh $B_user@$B_ip "find '$dir' -type f |grep -v "*.keep"| xargs md5sum > $md5dir/md5_b.txt" 
scp $B_user@$B_ip:$md5dir/md5_b.txt $md5dir
for f in `awk '{print $2}' $md5dir/md5.txt`
do 
  if grep -wq "$f" $md5dir/md5_b.txt
  then 
    #-w全字符匹配，$f$--以$f变量全字符结尾的字符串，防止1.js.com.js 1.js 这种文件比较时错误
    #也可以考虑使用长度控制 echo "$f"|wc -L
    md5_a=`grep -w $f$ $md5dir/md5.txt|grep -v "*.keep"|awk '{print $1}'`
    md5_b=`grep -w $f$ $md5dir/md5_b.txt|grep -v "*.keep"|awk '{print $1}'`
    if [ "$md5_a" != "$md5_b" ]
    then 
      echo "$f changde."
    fi
  else     
    echo "$f deleted."
  fi
done
```

## 命令行中的参数传递

```bash
#!/bin/bash
# using a global variable to pass a value
function db1() {
    # $1和$2 不能从命令行中传递，只能调用函数时，手动传递
    echo $(($1 * $2))
}
if [ $# -eq 2 ]; then
    value=$(db1 $1 $2)
    echo "The result is $value"
else
    echo "Usage: badtest1 a b"
fi
```

## 调用外部脚本方法

```bash
外部脚本 ：脚本库.sh
#!/bin/bash
# myscript functions
function addem() {
    echo $(($1 + $2))
}
function multem() {
    echo $(($1 * $2))
}
function divem() {
    if [ $2 -ne 0]; then
        echo $(($1 / $2))
    else
        echo -1
    fi
}

使用库函数.sh 
#!/bin/bash
#using a library file the wrong way
#两个. .之间有空格，等同于 source ./脚本库.sh
. ./脚本库.sh
result=$(addem 10 15)
echo "The result is $result"
```

## 局部变量

```bash
#!/bin/bash
# demonstrating the local keyword
function func1() {
    local temp=$(($value + 5))
    result=$(($temp * 2))
}
temp=4
value=6
func1
echo "The result is $result"
if [ $temp -gt $value ]; then
    echo "temp is larger"
else
    echo "temp is smaller"
fi
```

## 系统信息

```bash
#!/bin/bash
disk_info ()
{
   echo "======================disk info========================"
   df -ThP|column -t
}
cpu_info ()
{
   echo "=======================cpu info========================"
   echo "cpu processor is $(grep "processor" /proc/cpuinfo |wc -l)"
   echo "cpu mode name is $(grep "model name" /proc/cpuinfo |uniq|awk '{print $4,$5,$6,$7,$8,$9}')"
   grep "cpu MHz" /proc/cpuinfo |uniq |awk '{print $1,$2":"$4}'
   awk '/cache size/ {print $1,$2":"$4$5}' /proc/cpuinfo |uniq
}
mem_info ()
{
   echo "=====================memory info========================"
   MemTotal=$(awk '/MemTotal/ {print $2}' /proc/meminfo)
   MemFree=$(awk '/MemFree/ {print $2}' /proc/meminfo)
   Buffers=$(awk '/^Buffers:/ {print $2}' /proc/meminfo)
   Cached=$(awk '/^Cached:/ {print $2}' /proc/meminfo)
   FreeMem=$(($MemFree/1024+$Buffers/1024+$Cached/1024))
   UsedMem=$(($MemTotal/1024-$FreeMem))
   echo "Total memory is $(($MemTotal/1024)) MB"
   echo "Free  memory is ${FreeMem} MB"
   echo "Used  memory is ${UsedMem} MB"
}
#负载情况
loadavg_info ()
{
   echo "===================load average info===================="
   Load1=$(awk  '{print $1}' /proc/loadavg)
   Load5=$(awk  '{print $2}' /proc/loadavg)
   Load10=$(awk '{print $3}' /proc/loadavg)
   echo "Loadavg in 1  min is $Load1"
   echo "Loadavg in 5  min is $Load5"
   echo "Loadavg in 10 min is $Load10"
}
network_info ()
{
   echo "=====================network info======================="
   network_card=$(ip addr |grep inet |egrep -v "inet6|127.0.0.1" | awk '{print $NF}')
   IP=$(ip addr |grep inet |egrep -v "inet6|127.0.0.1" |awk '{print $2}' |awk -F "/" '{print $1}')
   MAC=$(cat /sys/class/net/$network_card/address) 
   echo "network: $network_card  address is  $IP"
   echo " IP: $IP"
   echo "MAC: $MAC"
}

# 执行函数
disk_info 
cpu_info
mem_info 
#负载情况
loadavg_info   
network_info
```

## 清理日志

```shell
#!/bin/bash
dir1=/opt/cloud/instances/           #/opt/cloud/instances/ 删除15天前的       
dir2=/opt/cloud/log/                      #/opt/cloud/log/ 删除7天前的
 
if [ -d $dir1 ];then
    find $dir1 -type f -name "*.log" -mtime +15 |xargs rm -f
elif [ -d $dir2 ];then
    find $dir2 -type f -mtime +7 |xargs rm -f
fi
```

## IO使用率

监控磁盘IO使用率，并找出哪个进程造成磁盘使用率很高

```shell
#!/bin/bash
##监控磁盘IO使用率，并找出哪个进程造成磁盘使用率很高
##该脚本需要写一个常驻循环
#判断机器上是否安装iostat命令
if ! which iostat &>/dev/null
then
    yum install -y sysstat
    #如果你的机器为ubuntu，请使用这个命令：apt-get install -y sysstat
fi
#判断机器上是否安装iotop命令
if ! which iotop &>/dev/null
then
    yum install -y iotop
    #如果你的机器为ubuntu，请使用这个命令：apt-get install -y iotop
fi
#定义记录日志的目录
logdir=/tmp/iolog
[ -d $logdir ] || mkdir $logdir
#定义日志名字
dt=`date +%F`
#定义获取io的函数（取5次平均值）
get_io()
{    
    iostat -dx 1 5 > $logdir/iostat.log
    sum=0
    #取最后一列的%util值循环遍历然后相加
    for ut in  `grep "^$1" $logdir/iostat.log|awk '{print $NF}'|cut -d. -f1`
    do
        sum=$[$sum+$ut]
    done
    echo $[$sum/5]
}
#这里的true表示条件为真
while true
do
    #获取所有设备，对所有设备名遍历
    for d in `iostat -dx|egrep -v '^$|Device:|CPU\)'|awk '{print $1}'`
    do
        io=`get_io $d`
        #如果io使用率大于等于80
        if [ $io -ge 80 ]
        then
            #向日志里记录时间、iostat和iotop信息
            date >> $logdir/$dt   
            cat $logdir/iostat.log >>$logdir/$dt
            iotop -obn2 >>$logdir/$dt
            echo "####################" >>$logdir/$dt
        fi
    #休眠10秒，继续以上步骤
    done
    sleep 10
done

```

## 截取字符串

```shell
${string: start :length} 从 string 字符串的左边第 start 个字符开始，向右截取 length 个字符。
${string: start} 从 string 字符串的左边第 start 个字符开始截取，直到最后。
${string: 0-start :length} 从 string 字符串的右边第 start 个字符开始，向右截取 length 个字符。
${string: 0-start} 从 string 字符串的右边第 start 个字符开始截取，直到最后。
${string#*chars}  从 string 字符串第一次出现 *chars 的位置开始，截取 *chars 右边的所有字符。
${string##*chars} 从 string 字符串最后一次出现 *chars 的位置开始，截取 *chars 右边的所有字符。
${string%chars*}`从 string 字符串第一次出现 chars* 的位置开始，截取 *chars 左边的所有字符。
${string%%chars*} 从 string 字符串最后一次出现 chars* 的位置开始，截取 *chars 左边的所有字符。
```

示例

```shell
#!/bin/bash
str="hello world !"
echo ${str:2:3}
echo ${str:5}
echo ${str:0-7}
echo ${str:0-7:3}
echo ${str#*o}
echo ${str##*o}
echo ${str%o*}
echo ${str%%o*}
```

输出

```text
llo
world !
world !
wor
world !
rld !
hello w
hell
```

**注意：** 使用`%`和`#`时，后边的`*`位置不同

## 解压并重启服务

```shell
#!/bin/bash
#domain目录
domain_home=/opt/web11/weblogic/user_projects/domains/cqsi
function restart(){
  #如果进程pid存在，kill掉
  PID=`ps -ef | grep java | grep cqsiServer | grep -v grep | awk '{print $2}'`
  if [ ${PID} ]
  then
    kill -9 ${PID}
  fi
  #清理缓存  
  rm -rf $domain_home/servers/cqsiServer/tmp $domain_home/servers/cqsiServer/cache
  #后台启动并重定向日志输出文件
  nohup sh $domain_home/startWebLogic.sh >$domain_home/nohup.log  2>&1 &
  #查看日志  
  tail -f $domain_home/nohup.log
}
#判断EAPDomain.zip是否上传
if [ -f EAPDomain.zip ] 
then 
  echo "开始解压EAPDomain.zip………………………………" 
  unzip -o ./EAPDomain.zip
else
  echo "不存在EAPDomain.zip文件，请检查文件是否已经上传！"
  exit 1
fi

if [ $? -eq 0 ] 
then 
  echo "解压完成………………………………"
  echo "开始执行web.xml等文件替换，执行unzip overwrite.zip………………………………"
  unzip -o ./overwrite.zip
fi

if [ $? -eq 0 ]
then
  echo "替换完成………………………………"
  echo "版本更新成功！！！"
else
  echo "替换文件失败，请检查overwrite.zip文件" 
  exit 1 
fi

if [ $? -eq 0 ]
then 
  echo "执行授权操作"
  chmod 744 -R ./EAPDomain
fi

if [ $? -eq 0 ]
then 
  echo "授权744成功！"
else
  echo "授权失败！不影响版本更新内容，可能影响ftp工具上传单独文件"
fi

if [ $? -ne 0 ]
then 
  exit 1
fi

read -p "是否现在重新启动服务y/n，是请输入y，否请输入n: " option
case $option in 
  y)
    restart
  	;;
  n)
    echo "您选择了不重新启动服务，如有class、配置文件等更新，系统可能不生效！"
    exit 0 
  	;;
  *)
  	echo "输入参数错误！"
    exit 1
    ;;
esac

```

## 创建并写入文件

```bash
cat > welcome.txt << EOF
欢迎来到Shell编程世界！
这里是一个充满挑战和乐趣的地方。
EOF
```

### 使用变量

在`EOF`块中可以使用`Shell`变量来实现动态生成文件内容。

```bash
name="Shell 编程"
cat > message.txt << EOF
欢迎进入 ${name} 的世界！
EOF
```

这样写入的内容就是“欢迎进入 Shell 编程 的世界！”

### 防止变量扩展

如果希望`EOF`块中的内容原样输出（不进行变量扩展），可以使用引号将`EOF`包裹起来。

```bash
cat > example.txt << 'EOF'
文件路径：$HOME
EOF
```

这样`$HOME`不会被替换为实际的家目录路径。

## Mysql 备份和还原（dcoker 方式）

根据脚本中的汉字按需修改

### 固定备份模式

```shell
#!/bin/bash

# 容器名称
containerName=你的容器名称

# 容器id
containerId=`docker ps |grep $containerName |awk '{print $1}'`

echo $containerId

# 容器中备份路径（需要挂载到宿主机的路径）

containerPath='你容器中的一个文件路径'

dbPassword='你的mysql密码'
# 备份的数据库
dbNames=('你要备份的数据库名称1' '你要备份的数据库名称2' '你要备份的数据库名称3')

# docker备份
for dbName in "${dbNames[@]}"; do
   echo '开始执行docker备份:'$dbName
   command="mysqldump -uroot -p$dbPassword -h127.0.0.1 --databases $dbName > $containerPath/你的备份文件前缀-$dbName-`date "+%Y%m%d"`.sql"
   docker exec -it  $containerId bash -c "$command"
done

# 归档
backupSourceDir="你宿主机路径，与containerPath挂载关联的宿主机路径"
backupDir="你宿主机存放归档文件的路径"

if [ ! -d "$backupDir" ]; then
  mkdir $backupDir
fi

tar -zcvf $backupDir/你的备份文件前缀-`date "+%Y%m%d"`.tar.gz $backupSourceDir/你的备份文件前缀*.sql

rm -rf $backupSourceDir/你的备份文件前缀*.sql
```

### 手动输入备份

```shell
#!/bin/bash

# 需要修改的变量
# 数据库容器名称（据实修改）
containerName=mysql
# 数据库密码（据实修改）
dbpassword=你的mysql密码
# 数据库用户
dbuser='root'
# 数据库端口
dbport='3306'
# 获取数据库容器id
containerId=$(docker ps | grep $containerName | awk '{print $1}')

script="mysqldump -uroot -p$dbpassword -h127.0.0.1 -P$dbport"

# 输入的变量
db=''
table=''
bakdir=$(pwd)
read -p "请输入要备份的数据库：" dbname

if [ -z $dbname ]; then
	db=$dbname
	echo "输入为空，请重新输入"
	exit 1
else
	db=$dbname
	script=$script" --databases $db"
fi

read -p "请输入要备份的表（多个表使用空格分割），跳过请输入回车：" -a tablenames

if [ -z $tablenames ]; then
	echo "未指定备份表，将进行$db全库导出"
else
	for arg in "${tablenames[@]}"; do
		table+="$arg "
	done
	# 拼接脚本
	script=$script" --tables $table "
: << 'where'
	read -p "请输入 where 条件（默认无），跳过请输入回车：" where
	if [ -n "$where" ]; then 
		echo "where:" $where
		safe_where=$(printf "%s" "$where" | sed "s/'/\\\\'/g")
		echo "safe_where:" $safe_where
		script="$script --where '$safe_where'"
	fi
where
fi

# 是否导出建表语句
read -p "是否导出create语句（是输入y/yes，否输入n/no，默认不导出create语句），跳过请输入回车：" createsql
case $createsql in 
	y|yes)
		;;
	*)
		script=$script" --no-create-info"
		;;
esac

filename=$db-$(date '+%Y%m%d%H%M%S')

script=$script" > /$filename.sql"

read -p "请输入导出文件路径（默认当前路径），跳过请输入回车：" bakpath
if [ ! -z $bakpath ]; then
	bakdir=$bakpath
fi

echo

# 执行导出
echo "[1/4] 正在导出数据库..."
docker exec -it $containerId bash -c "$script"

if [ $? -eq 0 ]; then
	echo "导出完成，准备开始执行压缩"
	echo 
else
	echo "导出失败！！"
	exit 2
fi

# 压缩
echo "[2/4] 正在压缩备份文件..."
docker exec -it $containerId bash -c "tar -zcvf $filename.tar.gz $filename.sql"

if [ $? -eq 0 ]; then
	echo "压缩完成，准备开始执行拷贝"
	echo 
else
	echo "压缩失败！！"
	exit 2
fi

# 拷贝
echo "[3/4] 正在拷贝到宿主机..."
docker cp $containerId:$filename.tar.gz $bakdir

if [ $? -eq 0 ]; then
	echo "拷贝完成,准备开始执行清理"
	echo 
else
	echo "拷贝失败！！"
	exit 2
fi

# 清理容器中的文件
echo "[4/4] 正在清理临时文件..."
docker exec -it $containerId bash -c "rm -rf $filename.tar.gz $filename.sql"

if [ $? -eq 0 ]; then
	echo "清理完成!"
	echo
else
	echo "清理失败！！"
	exit 2
fi

echo "====================================================="
echo "备份成功！文件位置: $bakdir/$filename.tar.gz"
echo "====================================================="
echo
exit 0
```

#### 如何替换导出语句种的 schema

mysqldump 导出的 sql 文件种，一般会指定 schema

```bash
--
-- Current Database: `mdm`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mdm` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `mdm-server_6f433393d93d4ee9b49bcc1bd43b4c87`;
```

当文件过大时，vim 和普通的 sed 命令无法修改脚本，可以尝试使用如下脚本

```bash
perl -i -pe '
if (!$replaced && /^\s*USE\s+`?mdm`?\s*;/) {
	s/^(\s*)USE\s+`?mdm`?\s*;/$1USE `mdm-server_6f433393d93d4ee9b49bcc1bd43b4c87`;/;
	$replaced = 1;
}
' mdm-20250710190956.sql
```

### 还原备份

```shell
#!/bin/bash
# 需要修改的变量
# 数据库密码（据实修改）
dbpassword=你的mysql密码
# 数据库用户
dbuser='root'
# 数据库端口
dbport='3306'
# 数据库容器名称
containerName=mysql

# 获取数据库容器id
containerId=$(docker ps | grep $containerName | awk '{print $1}')

script="mysql -uroot -p$dbpassword -h127.0.0.1 -P$dbport -e "

read -p "请输入要执行的文件：" dbfile

if [ -z $dbfile ]; then
	echo "输入为空，请重新输入"
	exit 2
fi

filepath=$(dirname $dbfile)
cd $filepath
filename=''

case $dbfile in 
	*.tar.gz)
		echo "执行的文件为.tar.gz格式，执行解压"
		filename=$(tar -zxvf $dbfile)
		;;
	*.sql)
		echo "执行的文件为.sql格式"
		filename=$(basename $dbfile)
		;;
	*)
		echo "不支持的格式，请使用.tar.gz或.sql文件"
		exit 2
		;;
esac

# 拼接脚本
if [ ! -z $filename ]; then
	script=$script" \"source /$filename\""
fi

echo 

# 拷贝
echo "[1/3] 正在向docker容器拷贝文件..."
docker cp $filename $containerId:/$filename
if [ $? -eq 0 ]; then
	echo "拷贝完成，即将执行导入………………………………"
	echo
else
	echo "拷贝失败！！"
	exit 2
fi

echo "[2/3] 正在执行数据库导入..."
docker exec -it $containerId bash -c "$script"

if [ $? -eq 0 ]; then
        echo "执行导入完成，即将执行清理"
        echo
else
        echo "拷贝失败！！"
        exit 2
fi

# 清理容器内脚本
echo "[3/3] 正在清理docker容器生成的临时文件..."
docker exec -it $containerId bash -c "rm -rf /$filename"

if [ $? -eq 0 ]; then
        echo "执行清理完成"
        echo
else
        echo "拷贝失败！！"
        exit 2
fi

case $dbfile in
        *.tar.gz)
                rm -rf $filename
		;;
esac

echo "导入完成!"
echo

exit 0
```

## 远程备份 (open ssh 方式)

### 自动备份最新文件

```shell
#!/bin/bash
# 备份服务器
ip=备份服务器ip
# 密钥文件
rsa=密钥文件
# 获取最新备份文件
bakfiledir=最新备份文件所在路径
# 通过 ssh 远程执行命令获取需要备份的文件
bakfile=`ssh -i $rsa root@$ip "find $bakfiledir/*.tar.gz -type f -print0 | xargs -0 stat -c '%Y %n' | sort -nr | head -n 1 | cut -d ' ' -f 2"`
# 备份文件存放地址
targetdir=备份文件存放路径
# 执行备份
sudo scp -i $rsa root@$ip:$bakfile $targetdir
```

### 备份并删除

```shell
#!/bin/bash
# 备份服务器
ip=备份服务器ip
# 密钥
rsa=密钥文件
# 获取最新备份文件
nexus='/data/nexus'
# 备份文件路径
targetnexus=/media/pi/Bakup/01-backup/01-hy/nexus
if [ ! -d $targetnexus ];then
	mkdir -p $targetnexus
fi
echo '开始执行'`basename $targetnexus`'备份'
# 压缩
nexusfilename=`basename $targetnexus`-`date +'%Y%m%d'`.tar.gz
sudo ssh -i $rsa root@$ip "tar -zcf /data/backup/`basename $nexus`/$nexusfilename $nexus"
# 备份
sudo scp -i $rsa root@$ip:/data/backup/`basename $nexus`/$nexusfilename $targetnexus
# 删除源备份文件
sudo ssh -i $rsa root@$ip "rm -rf /data/backup/`basename $nexus`/$nexusfilename"
```

