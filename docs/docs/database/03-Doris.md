#  Doris 安装

##  Doris 镜像构建 

### 软硬件要求

**硬件要求**

推荐配置：4 核 16GB 内存

**软件要求**

Docker Version：20.10 及以后版本

### 构建 FE 镜像

#### 1. FE 镜像的环境目录

```shell
 mkdir -p /data/doris/docker-build/fe/dockerfile /data/doris/docker-build/fe/resource
```

-   目录结构

```text
└── docker-build                                                // 构建根目录 
    └── fe                                                   // Doris 构建目录
        ├── Dockerfile                                          // Dockerfile 脚本
        └── resource                                            // 资源目录
            ├── init_fe.sh                                      // FE 启动及注册脚本
            └── apache-doris-2.0.3-bin.tar.gz                   // 二进制程序包
```

#### 2. Dockerfile

-   创建Dockerfile

```shell
# 创建文件
touch /data/doris/docker-build/fe/Dockerfile
# 编辑文件
vim /data/doris/docker-build/fe/Dockerfile
```

-   Dockerfile 内容

```dockerfile
# 选择基础镜像
FROM openjdk:8u342-jdk

# 设置环境变量
ENV JAVA_HOME="/usr/local/openjdk-8/"
ENV PATH="/opt/apache-doris/fe/bin:$PATH"

# 下载软件至镜像内，可根据需要替换
ADD ./resource/apache-doris-2.0.13-bin-x64.tar.gz /opt/

RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    apt-get clean && \
    mkdir /opt/apache-doris && \
    cd /opt && \
    mv apache-doris-2.0.13-bin-x64/fe /opt/apache-doris/

ADD ./resource/init_fe.sh /opt/apache-doris/fe/bin
RUN chmod 755 /opt/apache-doris/fe/bin/init_fe.sh

ENTRYPOINT ["/opt/apache-doris/fe/bin/init_fe.sh"]
```

#### 3. init_fe.sh

-   创建 init_fe.sh

```shell
# 创建文件
touch /data/doris/docker-build/fe/resource/init_fe.sh
# 编辑文件
vim /data/doris/docker-build/fe/resource/init_fe.sh
```

-   init_fe.sh 内容

```shell
#!/bin/bash
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

set -eo pipefail
shopt -s nullglob

DORIS_HOME="/opt/apache-doris"

# Obtain necessary and basic information to complete initialization

# logging functions
# usage: doris_[note|warn|error] $log_meg
#    ie: doris_warn "task may fe risky!"
#   out: 2023-01-08T19:08:16+08:00 [Warn] [Entrypoint]: task may fe risky!
doris_log() {
    local type="$1"
    shift
    # accept argument string or stdin
    local text="$*"
    if [ "$#" -eq 0 ]; then text="$(cat)"; fi
    local dt="$(date -Iseconds)"
    printf '%s [%s] [Entrypoint]: %s\n' "$dt" "$type" "$text"
}
doris_note() {
    doris_log Note "$@"
}
doris_warn() {
    doris_log Warn "$@" >&2
}
doris_error() {
    doris_log ERROR "$@" >&2
    exit 1
}

# check to see if this file is being run or sourced from another script
_is_sourced() {
    [ "${#FUNCNAME[@]}" -ge 2 ] &&
        [ "${FUNCNAME[0]}" = '_is_sourced' ] &&
        [ "${FUNCNAME[1]}" = 'source' ]
}

docker_setup_env() {
    declare -g DATABASE_ALREADY_EXISTS BUILD_TYPE_K8S PRIORITY_NETWORKS_EXISTS
    if [ -d "${DORIS_HOME}/fe/doris-meta/image" ]; then
        doris_note "the image is exsit!"
        DATABASE_ALREADY_EXISTS='true'
    fi
    if grep -q "$PRIORITY_NETWORKS" "${DORIS_HOME}/fe/conf/fe.conf" ; then
        doris_note "the priority_networks is exsit!"
        PRIORITY_NETWORKS_EXISTS='true'
    else
        doris_note "the priority_networks values is $PRIORITY_NETWORKS"
        doris_note "the conf file path is ${DORIS_HOME}/fe/conf/fe.conf"
    fi
}

# Check the variables required for   startup
docker_required_variables_env() {
    declare -g RUN_TYPE
    if [ -n "$BUILD_TYPE" ]; then
        RUN_TYPE="K8S"
        if [[ $BUILD_TYPE =~ ^([kK]8[sS])$ ]]; then
            doris_warn "BUILD_TYPE" $BUILD_TYPE
        else
            doris_error "BUILD_TYPE rule error！example: [k8s], Default Value: docker."
        fi
        return
    fi

    if [[ -n "$FE_SERVERS" && -n "$BE_SERVERS" && -n "$FE_ID"  && -n "$FQDN" ]]; then
        RUN_TYPE="FQDN"
        if [[ $FE_SERVERS =~ ^[a-zA-Z].+:[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}:[1-6]{0,1}[0-9]{1,4}(,[a-zA-Z]+\w+:[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}:[1-6]{0,1}[0-9]{1,4})*$ || $FE_SERVERS =~ ^([0-9a-fA-F]{1,4}:){7,7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,5}((:[0-9a-fA-F]{1,4}){1,2}|:)|([0-9a-fA-F]{1,4}:){1,4}((:[0-9a-fA-F]{1,4}){1,3}|:)|([0-9a-fA-F]{1,4}:){1,3}((:[0-9a-fA-F]{1,4}){1,4}|:)|([0-9a-fA-F]{1,4}:){1,2}((:[0-9a-fA-F]{1,4}){1,5}|:)|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}|:)|:((:[0-9a-fA-F]{1,4}){1,7}|:)$ ]]; then
            doris_warn "FE_SERVERS " $FE_SERVERS
        else
            doris_error "FE_SERVERS rule error！example: \$FE_NAME:\$FE_HOST_IP:\$FE_EDIT_LOG_PORT[,\$FE_NAME:\$FE_HOST_IP:\$FE_EDIT_LOG_PORT]... AND FE_NAME Ruler is '[a-zA-Z].+'!"
        fi
        if [[ $FE_ID =~ ^[1-9]{1}$ ]]; then
            doris_warn "FE_ID " $FE_ID
        else
            doris_error "FE_ID rule error！If FE is the role of Master, please set FE_ID=1, and ensure that all IDs correspond to the IP of the current node, ID start num is 1."
        fi
        if [[ $BE_SERVERS =~ ^[a-zA-Z].+:[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}(,[a-zA-Z]+\w+:[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3})*$ || $FE_SERVERS =~ ^([0-9a-fA-F]{1,4}:){7,7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,5}((:[0-9a-fA-F]{1,4}){1,2}|:)|([0-9a-fA-F]{1,4}:){1,4}((:[0-9a-fA-F]{1,4}){1,3}|:)|([0-9a-fA-F]{1,4}:){1,3}((:[0-9a-fA-F]{1,4}){1,4}|:)|([0-9a-fA-F]{1,4}:){1,2}((:[0-9a-fA-F]{1,4}){1,5}|:)|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}|:)|:((:[0-9a-fA-F]{1,4}){1,7}|:)$ ]]; then
            doris_warn "BE_SERVERS " $BE_SERVERS
        else
            doris_error "BE_SERVERS rule error！example: \$BE_NODE_NAME:\$BE_HOST_IP[,\$BE_NODE_NAME:\$BE_HOST_IP:]... AND BE_NODE_NAME Ruler is '[a-zA-Z].+'!"
        fi
        return
    fi

    if [[ -n "$RECOVERY" && -n "$FE_SERVERS" && -n "$FE_ID" ]]; then
        RUN_TYPE="RECOVERY"
        if [[ $RECOVERY =~ true ]]; then
            doris_warn "RECOVERY " $RECOVERY
        else
            doris_error "RECOVERY value error! Only Support 'true'!"
        fi
        if [[ $FE_SERVERS =~ ^.+:[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}:[1-6]{0,1}[0-9]{1,4}(,.+:[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}:[1-6]{0,1}[0-9]{1,4})*$ || $FE_SERVERS =~ ^([0-9a-fA-F]{1,4}:){7,7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,5}((:[0-9a-fA-F]{1,4}){1,2}|:)|([0-9a-fA-F]{1,4}:){1,4}((:[0-9a-fA-F]{1,4}){1,3}|:)|([0-9a-fA-F]{1,4}:){1,3}((:[0-9a-fA-F]{1,4}){1,4}|:)|([0-9a-fA-F]{1,4}:){1,2}((:[0-9a-fA-F]{1,4}){1,5}|:)|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}|:)|:((:[0-9a-fA-F]{1,4}){1,7}|:)$ ]]; then
            doris_warn "FE_SERVERS " $FE_SERVERS
        else
            doris_error "FE_SERVERS rule error！example: \$FE_NAME:\$FE_HOST_IP:\$FE_EDIT_LOG_PORT[,\$FE_NAME:\$FE_HOST_IP:\$FE_EDIT_LOG_PORT]..."
        fi
        if [[ $FE_ID =~ ^[1-9]{1}$ ]]; then
            doris_warn "FE_ID" $FE_ID
        else
            doris_error "FE_ID rule error！If FE is the role of Master, please set FE_ID=1, and ensure that all IDs correspond to the IP of the current node."
        fi
        doris_warn "The Frontend MetaData Will Recovery."
        return
    fi

    if [[ -n "$FE_SERVERS" && -n "$FE_ID" ]]; then
        RUN_TYPE="ELECTION"
        if [[ $FE_SERVERS =~ ^.+:[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}:[1-6]{0,1}[0-9]{1,4}(,.+:[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}:[1-6]{0,1}[0-9]{1,4})*$ || $FE_SERVERS =~ ^([0-9a-fA-F]{1,4}:){7,7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,5}((:[0-9a-fA-F]{1,4}){1,2}|:)|([0-9a-fA-F]{1,4}:){1,4}((:[0-9a-fA-F]{1,4}){1,3}|:)|([0-9a-fA-F]{1,4}:){1,3}((:[0-9a-fA-F]{1,4}){1,4}|:)|([0-9a-fA-F]{1,4}:){1,2}((:[0-9a-fA-F]{1,4}){1,5}|:)|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}|:)|:((:[0-9a-fA-F]{1,4}){1,7}|:)$ ]]; then
            doris_warn "FE_SERVERS" $FE_SERVERS
        else
            doris_error "FE_SERVERS rule error！example: \$FE_NAME:\$FE_HOST_IP:\$FE_EDIT_LOG_PORT[,\$FE_NAME:\$FE_HOST_IP:\$FE_EDIT_LOG_PORT]..."
        fi
        if [[ $FE_ID =~ ^[1-9]{1}$ ]]; then
            doris_warn "FE_ID" $FE_ID
        else
            doris_error "FE_ID rule error！If FE is the role of Master, please set FE_ID=1, and ensure that all IDs correspond to the IP of the current node."
        fi
        return
    fi

    if [[ -n "$FE_MASTER_IP" && -n "$FE_MASTER_PORT" && -n "$FE_CURRENT_IP" && -n "$FE_CURRENT_PORT" ]]; then
        RUN_TYPE="ASSIGN"
        if [[ $FE_MASTER_IP =~ ^[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}$ || $FE_MASTER_IP =~ ^([0-9a-fA-F]{1,4}:){7,7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,5}((:[0-9a-fA-F]{1,4}){1,2}|:)|([0-9a-fA-F]{1,4}:){1,4}((:[0-9a-fA-F]{1,4}){1,3}|:)|([0-9a-fA-F]{1,4}:){1,3}((:[0-9a-fA-F]{1,4}){1,4}|:)|([0-9a-fA-F]{1,4}:){1,2}((:[0-9a-fA-F]{1,4}){1,5}|:)|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}|:)|:((:[0-9a-fA-F]{1,4}){1,7}|:)$ ]]; then
            doris_warn "FE_MASTER_IP" $FE_MASTER_IP
        else
            doris_error "FE_MASTER_IP rule error！example: \$FE_MASTER_IP"
        fi
        if [[ $FE_MASTER_PORT =~ ^[1-6]{0,1}[0-9]{1,4}$ ]]; then
            doris_warn "FE_MASTER_PORT" $FE_MASTER_PORT
        else
            doris_error "FE_MASTER_PORT rule error！example: \$FE_MASTER_EDIT_LOG_HOST."
        fi
        if [[ $FE_CURRENT_IP =~ ^[1-2]{0,1}[0-9]{0,1}[0-9]{1}(\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}){3}$ || $FE_CURRENT_IP =~ ^([0-9a-fA-F]{1,4}:){7,7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,5}((:[0-9a-fA-F]{1,4}){1,2}|:)|([0-9a-fA-F]{1,4}:){1,4}((:[0-9a-fA-F]{1,4}){1,3}|:)|([0-9a-fA-F]{1,4}:){1,3}((:[0-9a-fA-F]{1,4}){1,4}|:)|([0-9a-fA-F]{1,4}:){1,2}((:[0-9a-fA-F]{1,4}){1,5}|:)|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}|:)|:((:[0-9a-fA-F]{1,4}){1,7}|:)$ ]]; then
            doris_warn "FE_CURRENT_IP" $FE_CURRENT_IP
        else
            doris_error "FE_CURRENT_IP rule error！example: \$FE_CURRENT_IP"
        fi
        if [[ $FE_CURRENT_PORT =~ ^[1-6]{0,1}[0-9]{1,4}$ ]]; then
            doris_warn "FE_CURRENT_PORT" $FE_CURRENT_PORT
        else
            doris_error "FE_CURRENT_PORT rule error！example: \$FE_CURRENT_EDIT_LOG_HOST."
        fi
        return
    fi

    doris_error EOF "
                 Note that you did not configure the required parameters!
                 plan 1:
                 BUILD_TYPE
                 plan 2:
                 RECOVERY & FE_SERVERS & FE_ID
                 plan 3:
                 FE_SERVERS & FE_ID
                 plan 4:
                 FE_SERVERS & FE_ID & BE_SERVERS & FQDN
                 plan 5:
                 FE_MASTER_IP & FE_MASTER_PORT & FE_CURRENT_IP & FE_CURRENT_PORT"
                EOF

}

get_doris_fe_args() {
    declare -g MASTER_FE_IP CURRENT_FE_IP CURRENT_NODE_NAME MASTER_FE_EDIT_PORT MASTER_NODE_NAME CURRENT_FE_EDIT_PORT PRIORITY_NETWORKS CURRENT_FE_IS_MASTER FE_HOSTS_MSG BE_HOSTS_MSG
    if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "RECOVERY" ]]; then
        local feServerArray=($(echo "${FE_SERVERS}" | awk '{gsub (/,/," "); print $0}'))
        for i in "${feServerArray[@]}"; do
            val=${i}
            val=${val// /}
            tmpFeName=$(echo "${val}" | awk -F ':' '{ sub(/ /, ""); print$1}')
            tmpFeIp=$(echo "${val}" | awk -F ':' '{ sub(/ /, ""); print$2}')
            tmpFeEditLogPort=$(echo "${val}" | awk -F ':' '{ sub(/ /, ""); print$3}')
            check_arg "TMP_FE_IP" $tmpFeIp
            feIpArray+=("$tmpFeIp")
            check_arg "TMP_FE_EDIT_LOG_PORT" $tmpFeEditLogPort
            feEditLogPortArray+=("$tmpFeEditLogPort")
        done

        MASTER_FE_IP=${feIpArray[0]}
        check_arg "MASTER_FE_IP" $MASTER_FE_IP
        MASTER_FE_EDIT_PORT=${feEditLogPortArray[0]}
        check_arg "MASTER_FE_EDIT_PORT" $MASTER_FE_EDIT_PORT
        CURRENT_FE_IP=${feIpArray[$FE_ID-1]}
        check_arg "CURRENT_FE_IP" $CURRENT_FE_IP
        CURRENT_FE_EDIT_PORT=${feEditLogPortArray[$FE_ID-1]}
        check_arg "CURRENT_FE_EDIT_PORT" $CURRENT_FE_EDIT_PORT

        if [ ${MASTER_FE_IP} == ${CURRENT_FE_IP} ]; then
            CURRENT_FE_IS_MASTER=true
        else
            CURRENT_FE_IS_MASTER=false
        fi

        PRIORITY_NETWORKS=$(echo "${CURRENT_FE_IP}" | awk -F '.' '{print$1"."$2"."$3".0/24"}')
        check_arg "PRIORITY_NETWORKS" $PRIORITY_NETWORKS

        doris_note "FE_IP_ARRAY = [${feIpArray[*]}]"
        doris_note "FE_EDIT_LOG_PORT_ARRAY = [${feEditLogPortArray[*]}]"
        doris_note "MASTER_FE = ${MASTER_FE_IP}:${MASTER_FE_EDIT_PORT}"
        doris_note "CURRENT_FE = ${CURRENT_FE_IP}:${CURRENT_FE_EDIT_PORT}"
        doris_note "PRIORITY_NETWORKS = ${PRIORITY_NETWORKS}"

    elif [[ $RUN_TYPE == "FQDN" ]]; then
        local feServerArray=($(echo "${FE_SERVERS}" | awk '{gsub (/,/," "); print $0}'))
        local beServerArray=($(echo "${BE_SERVERS}" | awk '{gsub (/,/," "); print $0}'))
        feIpArray=()
        feEditLogPortArray=()
        feNameArray=()
        beIpArray=()
        beNameArray=()
        for ((i=0; i<${#feServerArray[@]}; i++)); do
            val=${feServerArray[i]}
            val=${val// /}
            tmpFeName=$(echo "${val}" | awk -F ':' '{ sub(/ /, ""); print$1}')
            tmpFeIp=$(echo "${val}" | awk -F ':' '{ sub(/ /, ""); print$2}')
            tmpFeEditLogPort=$(echo "${val}" | awk -F ':' '{ sub(/ /, ""); print$3}')
            check_arg "TMP_FE_NAME" $tmpFeName
            feNameArray+=("$tmpFeName")
            check_arg "TMP_FE_IP" $tmpFeIp
            feIpArray+=("$tmpFeIp")
            check_arg "TMP_FE_EDIT_LOG_PORT" $tmpFeEditLogPort
            feEditLogPortArray+=("$tmpFeEditLogPort")
            FE_HOSTS_MSG+=$(printf "%s\t%s" $tmpFeIp $tmpFeName)
            if [ $i -lt $((${#feServerArray[@]}-1)) ]; then
                FE_HOSTS_MSG+='\n'
            fi
        done
        for ((i=0; i<${#beServerArray[@]}; i++)); do
            val=${beServerArray[i]}
            val=${val// /}
            tmpBeName=$(echo "${val}" | awk -F ':' '{ sub(/fe/, ""); sub(/ /, ""); print$1}')
            tmpBeIp=$(echo "${val}" | awk -F ':' '{ sub(/ /, ""); print$2}')
            check_arg "TMP_BE_NAME" $tmpBeName
            beNameArray+=("$tmpBeName")
            check_arg "TMP_BE_IP" $tmpBeIp
            beIpArray+=("$tmpBeIp")
            BE_HOSTS_MSG+=$(printf "%s\t%s" $tmpBeIp $tmpBeName)
            if [ $i -lt $((${#beServerArray[@]}-1)) ]; then
                BE_HOSTS_MSG+='\n'
            fi
        done

        MASTER_FE_IP=${feIpArray[0]}
        check_arg "MASTER_FE_IP" $MASTER_FE_IP
        MASTER_FE_EDIT_PORT=${feEditLogPortArray[0]}
        check_arg "MASTER_FE_EDIT_PORT" $MASTER_FE_EDIT_PORT
        MASTER_NODE_NAME=${feNameArray[0]}
        check_arg "MASTER_NODE_NAME" $MASTER_NODE_NAME
        CURRENT_NODE_NAME=${feNameArray[$FE_ID-1]}
        check_arg "CURRENT_NODE_NAME" $CURRENT_NODE_NAME
        CURRENT_FE_IP=${feIpArray[$FE_ID-1]}
        check_arg "CURRENT_FE_IP" $CURRENT_FE_IP
        CURRENT_FE_EDIT_PORT=${feEditLogPortArray[$FE_ID-1]}
        check_arg "CURRENT_FE_EDIT_PORT" $CURRENT_FE_EDIT_PORT

        if [ "${MASTER_FE_IP}" == "${CURRENT_FE_IP}" ]; then
            CURRENT_FE_IS_MASTER=true
        else
            CURRENT_FE_IS_MASTER=false
        fi

        # Print arrays with desired format
        doris_note "FE_HOSTS_MSG = [\n${FE_HOSTS_MSG}\n]"
        doris_note "BE_HOSTS_MSG = [\n${BE_HOSTS_MSG}\n]"
        doris_note "FE_NAME_ARRAY = [${feNameArray[*]}]"
        doris_note "FE_IP_ARRAY = [${feIpArray[*]}]"
        doris_note "FE_EDIT_LOG_PORT_ARRAY = [${feEditLogPortArray[*]}]"
        doris_note "MASTER_FE = ${MASTER_FE_IP}:${MASTER_FE_EDIT_PORT}"
        doris_note "MASTEMASTER_NODE_NAMER_FE = ${MASTER_NODE_NAME}"
        doris_note "CURRENT_NODE_NAME = ${CURRENT_NODE_NAME}"
        doris_note "CURRENT_FE = ${CURRENT_FE_IP}:${CURRENT_FE_EDIT_PORT}"

    elif [[ $RUN_TYPE == "ASSIGN" ]]; then
        MASTER_FE_IP=${FE_MASTER_IP}
        check_arg "MASTER_FE_IP" $MASTER_FE_IP
        MASTER_FE_EDIT_PORT=${FE_MASTER_PORT}
        check_arg "MASTER_FE_EDIT_PORT" $MASTER_FE_EDIT_PORT
        CURRENT_FE_IP=${FE_CURRENT_IP}
        check_arg "CURRENT_FE_IP" $CURRENT_FE_IP
        CURRENT_FE_EDIT_PORT=${FE_CURRENT_PORT}
        check_arg "CURRENT_FE_EDIT_PORT" $CURRENT_FE_EDIT_PORT

        if [ ${MASTER_FE_IP} == ${CURRENT_FE_IP} ]; then
            CURRENT_FE_IS_MASTER=true
        else
            CURRENT_FE_IS_MASTER=false
        fi

        PRIORITY_NETWORKS=$(echo "${CURRENT_FE_IP}" | awk -F '.' '{print$1"."$2"."$3".0/24"}')
        check_arg "PRIORITY_NETWORKS" $PRIORITY_NETWORKS
    fi

    # check fe start
    if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" ]]; then
        check_fe_status true
    fi
}

add_priority_networks() {
    doris_note "add priority_networks ${1} to ${DORIS_HOME}/fe/conf/fe.conf"
    echo "priority_networks = ${1}" >>${DORIS_HOME}/fe/conf/fe.conf
}

add_fqdn_conf() {
    doris_note "add ‘enable_fqdn_mode = true’ to ${DORIS_HOME}/fe/conf/fe.conf"
    echo "enable_fqdn_mode = true" >>${DORIS_HOME}/fe/conf/fe.conf
    doris_note "add 'FE hosts msg' \n${FE_HOSTS_MSG} to /etc/hosts"
    echo -e ${FE_HOSTS_MSG} >/etc/hosts
    doris_note "add 'BE hosts msg' \n${BE_HOSTS_MSG} to /etc/hosts"
    echo -e ${BE_HOSTS_MSG} >>/etc/hosts
    doris_note "add 'host_name = ${CURRENT_NODE_NAME}' to /etc/hostname"
    echo ${CURRENT_NODE_NAME} >/etc/hostname
}

# Execute sql script, passed via stdin
# usage: docker_process_sql sql_script
docker_process_sql() {
    set +e
    if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" ]]; then
        mysql -uroot -P9030 -h${MASTER_FE_IP} --comments "$@" 2>/dev/null
    elif [[ $RUN_TYPE == "FQDN" ]]; then
        mysql -uroot -P9030 -h${MASTER_NODE_NAME} --comments "$@" 2>/dev/null
    fi
}

docker_setup_db() {
    set +e
    # check fe status
    local is_fe_start=false
    if [[ ${CURRENT_FE_IS_MASTER} == true ]]; then
        doris_note "Current FE is Master FE!  No need to register again！"
        return
    fi
    for i in {1..30}; do
        if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" ]]; then
            docker_process_sql <<<"alter system add FOLLOWER '${CURRENT_FE_IP}:${CURRENT_FE_EDIT_PORT}'"
        elif [[ $RUN_TYPE == "FQDN" ]]; then
            docker_process_sql <<<"alter system add FOLLOWER '${CURRENT_NODE_NAME}:${CURRENT_FE_EDIT_PORT}'"
        fi
        register_fe_status=$?
        if [[ $register_fe_status == 0 ]]; then
            doris_note "FE successfully registered！"
            is_fe_start=true
            break
        else
            if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" ]]; then
                check_fe_status
            fi
            if [ -n "$CURRENT_FE_ALREADY_EXISTS" ]; then
                doris_warn "Same frontend already exists! No need to register again！"
                break
            fi
            if [[ $(($i % 20)) == 1 ]]; then
                doris_warn "register_fe_status: ${register_fe_status}"
                doris_warn "FE failed registered!"
            fi
        fi
        if [[ $(($i % 20)) == 1 ]]; then
            doris_note "ADD FOLLOWER failed, retry."
        fi
        sleep 1
    done
    if ! [[ $is_fe_start ]]; then
        doris_error "Failed to register CURRENT_FE to FE！Tried 30 times！Maybe FE Start Failed！"
    fi
}

# Check whether the passed parameters are empty to avoid subsequent task execution failures. At the same time,
# enumeration checks can fe added, such as checking whether a certain parameter appears repeatedly, etc.
check_arg() {
    if [ -z $2 ]; then
        doris_error "$1 is null!"
    fi
}


check_fe_status() {
    set +e
    declare -g CURRENT_FE_ALREADY_EXISTS
    if [[ ${CURRENT_FE_IS_MASTER} == true ]]; then
        doris_note "Current FE is Master FE!  No need check fe status！"
        return
    fi
    for i in {1..30}; do
        if [[ $1 == true ]]; then
            if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" ]]; then
                docker_process_sql <<<"show frontends" | grep "[[:space:]]${MASTER_FE_IP}[[:space:]]" | grep "[[:space:]]${MASTER_FE_EDIT_PORT}[[:space:]]"
            elif [[ $RUN_TYPE == "FQDN" ]]; then
                docker_process_sql <<<"show frontends" | grep "[[:space:]]${MASTER_NODE_NAME}[[:space:]]" | grep "[[:space:]]${MASTER_FE_EDIT_PORT}[[:space:]]"
            fi
        else
            if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" ]]; then
                docker_process_sql <<<"show frontends" | grep "[[:space:]]${CURRENT_FE_IP}[[:space:]]" | grep "[[:space:]]${CURRENT_FE_EDIT_PORT}[[:space:]]"
            elif [[ $RUN_TYPE == "FQDN" ]]; then
                docker_process_sql <<<"show frontends" | grep "[[:space:]]${CURRENT_NODE_NAME}[[:space:]]" | grep "[[:space:]]${CURRENT_FE_EDIT_PORT}[[:space:]]"
            fi
        fi
        fe_join_status=$?
        if [[ "${fe_join_status}" == 0 ]]; then
            if [[ $1 == true ]]; then
                doris_note "Master FE is started!"
            else
                doris_note "Verify that CURRENT_FE is registered to FE successfully"
            fi
            CURRENT_FE_ALREADY_EXISTS=true
            break
        else
            if [[ $(($i % 20)) == 1 ]]; then
                if [[ $1 == true ]]; then
                    doris_note "Master FE is not started, retry."
                else
                    doris_warn "Verify that CURRENT_FE is registered to FE failed, retry."
                fi
            fi
        fi
        if [[ $(($i % 20)) == 1 ]]; then
            doris_note "try session Master FE."
        fi
        sleep 1
    done
}

cleanup() {
    doris_note "Container stopped, running stop_fe script"
    ${DORIS_HOME}/fe/bin/stop_fe.sh
}

_main() {
    docker_required_variables_env
    trap 'cleanup' SIGTERM SIGINT
    if [[ $RUN_TYPE == "K8S" ]]; then
        ${DORIS_HOME}/fe/bin/start_fe.sh --console &
        child_pid=$!
    else
        get_doris_fe_args
        docker_setup_env
        if [[ $DATABASE_ALREADY_EXISTS == "true" && $PRIORITY_NETWORKS_EXISTS != "true" ]]; then
            if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" || $RUN_TYPE == "RECOVERY" ]]; then
                doris_note "start add_priority_networks"
                add_priority_networks $PRIORITY_NETWORKS
            elif [[ $RUN_TYPE == "FQDN" ]]; then
                doris_note "start add_fqdn_conf"
                add_fqdn_conf
            fi
        fi
        docker_setup_db
        if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" ]]; then
            check_fe_status
        fi
        doris_note "Ready to start CURRENT_FE！"
        if [ $RECOVERY == true ]; then
            start_fe.sh --console --metadata_failure_recovery &
            child_pid=$!
        fi
        if [[ $CURRENT_FE_IS_MASTER == true ]]; then
            ${DORIS_HOME}/fe/bin/start_fe.sh --console &
            child_pid=$!
        else
            if [[ $RUN_TYPE == "ELECTION" || $RUN_TYPE == "ASSIGN" ]]; then
                ${DORIS_HOME}/fe/bin/start_fe.sh --helper ${MASTER_FE_IP}:${MASTER_FE_EDIT_PORT} --console &
            elif [[ $RUN_TYPE == "FQDN" ]]; then
                ${DORIS_HOME}/fe/bin/start_fe.sh --helper ${MASTER_NODE_NAME}:${MASTER_FE_EDIT_PORT} --console &
            fi
            child_pid=$!
        fi
    fi
    wait $child_pid
    exec "$@"
}

if ! _is_sourced; then
    _main "$@"
fi
```

#### 4.  上传 doris 二进制文件

-   上传 apache-doris-2.0.13-bin-x64.tar.gz 到 `/data/doris/docker-build/fe/resource/` 
-   查看 FE 安装环境内容

```shell
tree /data/doris
```

结果：

```text
/data/doris
└── docker-build
    └── fe
        ├── Dockerfile
        └── resource
            ├── apache-doris-2.0.13-bin-x64.tar.gz
            └── init_fe.sh
```

#### 5. 构建 FE 镜像

```shell
cd /data/doris/docker-build/fe && docker build . -t apache-doris-fe:2.0.13
```

结果：

ps：过程可能很久，需要等待~

```text
[root@iZ0jl2zspvl2lbaflikgacZ fe]# cd /data/doris/docker-build/fe && docker build . -t apache-doris:2.0.13-fe
[+] Building 887.8s (10/10) FINISHED                                                                           
 => [internal] load .dockerignore                                                                         0.0s
 => => transferring context: 2B                                                                           0.0s
 => [internal] load build definition from Dockerfile                                                      0.0s
 => => transferring dockerfile: 1.40kB                                                                    0.0s
 => [internal] load metadata for docker.io/library/openjdk:8u342-jdk                                      1.2s
 => [1/5] FROM docker.io/library/openjdk:8u342-jdk@sha256:86e863cc57215cfb181bd319736d0baf625fe8f150577  23.6s
 => => resolve docker.io/library/openjdk:8u342-jdk@sha256:86e863cc57215cfb181bd319736d0baf625fe8f150577f  0.0s
 => => sha256:86e863cc57215cfb181bd319736d0baf625fe8f150577f9eb58bd937f5452cb8 1.04kB / 1.04kB            0.0s
 => => sha256:3af2ac94130765b73fc8f1b42ffc04f77996ed8210c297fcfa28ca880ff0a217 1.79kB / 1.79kB            0.0s
 => => sha256:2068746827ec1b043b571e4788693eab7e9b2a95301176512791f8c317a2816a 10.88MB / 10.88MB          2.1s
 => => sha256:b273004037cc3af245d8e08cfbfa672b93ee7dcb289736c82d0b58936fb71702 7.81kB / 7.81kB            0.0s
 => => sha256:001c52e26ad57e3b25b439ee0052f6692e5c0f2d5d982a00a8819ace5e521452 55.00MB / 55.00MB         12.4s
 => => sha256:d9d4b9b6e964657da49910b495173d6c4f0d9bc47b3b44273cf82fd32723d165 5.16MB / 5.16MB            1.2s
 => => sha256:9daef329d35093868ef75ac8b7c6eb407fa53abbcb3a264c218c2ec7bca716e6 54.58MB / 54.58MB         10.6s
 => => sha256:d85151f15b6683b98f21c3827ac545188b1849efb14a1049710ebc4692de3dd5 5.42MB / 5.42MB            3.7s
 => => sha256:52a8c426d30b691c4f7e8c4b438901ddeb82ff80d4540d5bbd49986376d85cc9 210B / 210B                3.9s
 => => sha256:8754a66e005039a091c5ad0319f055be393c7123717b1f6fee8647c338ff3ceb 105.92MB / 105.92MB       18.5s
 => => extracting sha256:001c52e26ad57e3b25b439ee0052f6692e5c0f2d5d982a00a8819ace5e521452                 2.9s
 => => extracting sha256:d9d4b9b6e964657da49910b495173d6c4f0d9bc47b3b44273cf82fd32723d165                 0.2s
 => => extracting sha256:2068746827ec1b043b571e4788693eab7e9b2a95301176512791f8c317a2816a                 0.3s
 => => extracting sha256:9daef329d35093868ef75ac8b7c6eb407fa53abbcb3a264c218c2ec7bca716e6                 2.5s
 => => extracting sha256:d85151f15b6683b98f21c3827ac545188b1849efb14a1049710ebc4692de3dd5                 0.2s
 => => extracting sha256:52a8c426d30b691c4f7e8c4b438901ddeb82ff80d4540d5bbd49986376d85cc9                 0.0s
 => => extracting sha256:8754a66e005039a091c5ad0319f055be393c7123717b1f6fee8647c338ff3ceb                 2.7s
 => [internal] load build context                                                                        14.3s
 => => transferring context: 2.69GB                                                                      14.3s
 => [2/5] ADD ./resource/apache-doris-2.0.13-bin-x64.tar.gz /opt/                                        38.5s
 => [3/5] RUN apt-get update &&     apt-get install -y default-mysql-client &&     apt-get clean &&     804.7s
 => [4/5] ADD ./resource/init_fe.sh /opt/apache-doris/fe/bin                                              0.1s 
 => [5/5] RUN chmod 755 /opt/apache-doris/fe/bin/init_fe.sh                                               0.3s 
 => exporting to image                                                                                   19.3s 
 => => exporting layers                                                                                  19.3s 
 => => writing image sha256:e1f19d9b661d04cdcb1749ce04b365f51ee2de6a83f3c1a5bb781ccdd9842877              0.0s 
 => => naming to docker.io/library/apache-doris:2.0.13-fe                                                 0.0s 
```

### 构建 BE 镜像

#### 1. BE 镜像目录

```shell
mkdir -p /data/doris/docker-build/be/resource
```

-   目录结构

```text
└── docker-build                                                // 构建根目录 
    └── be                                                      // BE 构建目录
        ├── Dockerfile                                          // dockerfile 脚本
        └── resource                                            // 资源目录
            ├── init_be.sh                                      // 启动及注册脚本
            └── apache-doris-2.0.3-bin.tar.gz                   // 二进制程序包
```

#### 2. Dockerfile

```
# 创建文件
touch /data/doris/docker-build/be/Dockerfile
# 编辑文件
vim /data/doris/docker-build/be/Dockerfile
```

-   Dockerfile 内容

```dockerfile
# 选择基础镜像
FROM openjdk:8u342-jdk

# 设置环境变量
ENV JAVA_HOME="/usr/local/openjdk-8/" 
ENV PATH="/opt/apache-doris/be/bin:$PATH"

# 下载软件至镜像内，可根据需要替换
ADD ./resource/apache-doris-2.0.13-bin-x64.tar.gz /opt/

RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    apt-get clean && \
    mkdir /opt/apache-doris && \
    cd /opt && \
    mv apache-doris-2.0.13-bin-x64/be /opt/apache-doris/

ADD ./resource/init_be.sh /opt/apache-doris/be/bin
RUN chmod 755 /opt/apache-doris/be/bin/init_be.sh

ENTRYPOINT ["/opt/apache-doris/be/bin/init_be.sh"]
```

#### 3. init_be.sh

-   创建 init_be.sh

```shell
# 创建init_be.sh
touch /data/doris/docker-build/be/resource/init_be.sh
# 编辑init_be.sh
vim /data/doris/docker-build/be/resource/init_be.sh
```

#### 4. 上传 doris 二进制文件

-   上传 apache-doris-2.0.13-bin-x64.tar.gz 到 `/data/doris/docker-build/be/resource/` 
-   查看 BE 安装环境内容

```shell
tree /data/doris/docker-build/be
```

结果：

```text
[root@iZ0jl2zspvl2lbaflikgacZ resource]# tree /data/doris/docker-build/be
/data/doris/docker-build/be
├── Dockerfile
└── resource
    ├── apache-doris-2.0.13-bin-x64.tar.gz
    └── init_be.sh
```

#### 5. 构建 BE 镜像

```shell
cd /data/doris/docker-build/be && docker build . -t apache-doris-be:2.0.13
```

结果：

ps：过程可能很久，需要等待~

```text
[root@iZ0jl2zspvl2lbaflikgacZ be]# cd /data/doris/docker-build/be && docker build . -t apache-doris:2.0.13-be
[+] Building 561.6s (10/10) FINISHED                                                                                               
 => [internal] load build definition from Dockerfile                                                                          0.0s
 => => transferring dockerfile: 652B                                                                                          0.0s
 => [internal] load .dockerignore                                                                                             0.0s
 => => transferring context: 2B                                                                                               0.0s
 => [internal] load metadata for docker.io/library/openjdk:8u342-jdk                                                          1.2s
 => [1/5] FROM docker.io/library/openjdk:8u342-jdk@sha256:86e863cc57215cfb181bd319736d0baf625fe8f150577f9eb58bd937f5452cb8    0.0s
 => [internal] load build context                                                                                             0.0s
 => => transferring context: 135B                                                                                             0.0s
 => CACHED [2/5] ADD ./resource/apache-doris-2.0.13-bin-x64.tar.gz /opt/                                                      0.0s
 => [3/5] RUN apt-get update &&     apt-get install -y default-mysql-client &&     apt-get clean &&     mkdir /opt/apache-  546.2s
 => [4/5] ADD ./resource/init_be.sh /opt/apache-doris/be/bin                                                                  0.1s
 => [5/5] RUN chmod 755 /opt/apache-doris/be/bin/init_be.sh                                                                   0.3s 
 => exporting to image                                                                                                       13.8s 
 => => exporting layers                                                                                                      13.8s 
 => => writing image sha256:4f420522480e7c131d7863430c84c0526ff5f64ef8f8c6c27d0bb971c76eec5b                                  0.0s 
 => => naming to docker.io/library/apache-doris:2.0.13-be                                                                     0.0s
```

### 推送 harbor

#### 1.  登录 harbor

```shell
docker login -u service -p dEdeF2bAFa3C3A2e dev.huiyisoft.cn:9445 
```

#### 2.  标记镜像

```shell
docker tag apache-doris-be:2.0.13 dev.huiyisoft.cn:9445/library/apache-doris-be:2.0.13
docker tag apache-doris-fe:2.0.13 dev.huiyisoft.cn:9445/library/apache-doris-fe:2.0.13
```

#### 3. 推送镜像

```shell
docker push dev.huiyisoft.cn:9445/library/apache-doris-be:2.0.13
docker push dev.huiyisoft.cn:9445/library/apache-doris-fe:2.0.13
```

## Doris 部署

**软件环境**

| 软件           | 版本        |
| -------------- | ----------- |
| Docker         | 20.0 及以上 |
| docker-compose | 20.1 及以上 |

**硬件环境**

| 配置类型 | 硬件信息 | 最大运行集群规模 |
| -------- | -------- | ---------------- |
| 最低配置 | 2C 4G    | 1FE 1BE          |
| 推荐配置 | 4C 16G   | 3FE 3BE          |

###  系统参数配置

修改宿主机`vm.max_map_count`配置

```shell
sysctl -w vm.max_map_count=2000000
```

