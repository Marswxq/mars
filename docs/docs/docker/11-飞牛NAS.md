# 飞牛NAS

## 创建目录

```bash
mkdir -p ./{disk1,disk2}
```

## 创建 docker-compose.yml 文件

```bash 
cat > ./docker-compose.yml << 'EOF'
services:
  fnos:
    image: ghcr.io/qemus/qemu:7.12 # 使用包含QEMU的镜像
    container_name: fnos # 容器名称
    environment:
      BOOT: "https://iso.liveupdate.fnnas.com/x86_64/trim/fnos-0.9.37-1311.iso?sign=29d1cd860f6bf34510221aa3b3af4db5&t=1763450082" # 飞牛os安装镜像地址，请替换为最新稳定版本或系统盘镜像路径；
      # BOOT: "/iso/fnos-0.9.37-1311.iso"  # 使用容器内的ISO路径
      RAM_SIZE: "2G" # qemu虚拟机设定的内存大小
      CPU_CORES: "4" # qemu虚拟机设定的CPU核心数
      DISK_SIZE: "16G" # 飞牛系统盘大小
      DISK2_SIZE: "20G" # 数据盘大小，可以添加更多 DISK_SIZE=... 参数创建更多数据盘
    devices:
      - /dev/kvm # 映射 KVM 设备文件，用于启用硬件加速（如果宿主机支持）
      - /dev/net/tun # 映射 TUN/TAP 设备文件，用于网络连接
    cap_add:
      - NET_ADMIN # 添加网络管理权限，允许容器配置网络接口
    ports:
      # 将容器内部的 fnOS 端口映射到宿主机端口
      - 8006:8006 # QEMU Web管理界面默认端口映射
      - 5666:5666 # fnOS Web管理界面默认端口映射
      #- 5005:5005 # fnOS 相关WebDAV服务端口映射（可自行选择是否开启）
      #- 5006:5006 # fnOS 相关WebDAV服务端口映射（可自行选择是否开启）
      #- 445:445 # fnOS 相关SMB服务端口映射（可自行选择是否开启）
      #- 21:21 # fnOS 相关FTP服务端口映射（可自行选择是否开启）
    volumes:
      # 将宿主机目录映射到 fnOS 虚拟机内部作为数据盘，请替换 /dir1 和 /dir2 为实际路径
      - ./disk1:/storage # 映射到 fnOS 内部的第一个数据盘目录
      - ./disk2:/storage2 # 映射到 fnOS 内部的第二个数据盘目录
      # 你可以将 fnOS 的系统盘镜像也通过 volume 映射出来，以便持久化系统状态
      # - ./fnos_system.qcow2:/drive/fnos_system.qcow2 # 示例：将系统盘镜像文件映射出来
    restart: unless-stopped # Docker容器退出后总是重启（除非手动停止）
    stop_grace_period: 2m # 优雅停止的等待时间
    # networks: # 如需设置飞牛系统本地固定IP等，可在此配置网络，可能需要 macvlan 等模式
    #   default:
    #     ipv4_address: 192.168.1.100 # 示例固定IP (需配合 macvlan 网络配置)
EOF
```

## 启动

```bash
docker-compose up -d 
```

## 配置

登录 qemu ：http://[你的ip]:8006 完成 fnOS 安装，教程参考[如何安装和初始化飞牛 fnOS ?](https://help.fnnas.com/articles/fnosV1/start/install-os.md)

最后，完成 fnOS 安装后，登录 http://[你的ip]:5666 开启 fnOS 之旅。