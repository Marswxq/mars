# Docker Compose 

## 重启 docker

```shell
#!/bin/bash
function restart(){
	echo 
	read -p "请输入要重新启动的容器名：" dname
	
	if [ -z "$dname" ]
	then 
		echo "输入非法！请检查！"
		exit 1
	fi 
	
	echo
	echo "开始关闭$dname.............................."
	echo
	
	docker-compose stop $dname
	if [ $? -eq 0 ]
	then
		echo
		echo "关闭$dname完成..............................."
		echo
	else
		echo
		echo
		echo
		echo "请检查$dname容器是否存在！！！"
		echo "请检查$dname容器是否存在！！！"
		echo "请检查$dname容器是否存在！！！"
		echo
		echo
		echo
		exit 1
	fi 
	sleep 1
	
	echo "开始删除$dname.............................."
	echo 
	docker-compose rm $dname
	echo 
	
	echo "删除$dname完成.............................."
	echo 
	sleep 1 
	
	echo "重新拉取$dname容器并启动...................."
	echo 
	docker-compose --compatibility up -d $dname
	echo 
	echo "拉取$dname容器完成.........................."
	echo 
	sleep 1 
	
	echo "$dname启动日志.............................."
	echo 
	docker-compose logs -f --tail 100 $dname
}

function restartparam(){

	if [ -z "$param" ]
	then 
		echo "参数非法请检查！"
		exit 1
	fi 

	echo
	echo "开始关闭$param.............................."
	echo
	docker-compose stop $param
	if [ $? -eq 0 ]
	then
	    echo
            echo "关闭$param完成..............................."
            echo
	else
	    echo
	    echo
	    echo 
	    echo "请检查$param容器是否存在！！！" 
        echo "请检查$param容器是否存在！！！"
	    echo "请检查$param容器是否存在！！！"
	    echo
	    echo
  	 echo	    
	    exit 1 
	fi	
	sleep 1
	echo "开始删除$param.............................."
	echo 
	docker-compose rm $param
	echo 
	echo "删除$param完成.............................."
	echo 
	sleep 1 
	echo "重新拉取$param容器并启动...................."
	echo 
	docker-compose --compatibility up -d $param
	echo 
	echo "拉取$param容器完成.........................."
	echo 
	sleep 1 
	echo "$param启动日志.............................."
	echo 
	docker-compose logs -f --tail 100 $param
}

param=$1
if [ -z "$param" ]
then 
	restart
else 
	restartparam
fi
```
