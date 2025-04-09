# Dockerfile

**目录**

[[toc]]

## Dockerfile指令详解

| Dockerfile 指令 | 说明                                         |
|---------------|--------------------------------------------|
| FROM          | 指定基础镜像，用于后续的指令构建。                          |
| MAINTAINER    | 指定Dockerfile的作者/维护者。                       |
| LABEL         | 添加镜像的元数据，使用键值对的形式。                         |
| RUN           | 在构建过程中在镜像中执行命令。                            |
| CMD           | 指定容器创建时的默认命令。（可以被覆盖）                       |
| ENTRYPOINT    | 设置容器创建时的主要命令。（不可被覆盖）                       |
| EXPOSE        | 声明容器运行时监听的特定网络端口。                          |
| ENV           | 在容器内部设置环境变量。                               |
| ADD           | 将文件、目录或远程URL复制到镜像中。                        |
| COPY          | 将文件或目录复制到镜像中。                              |
| VOLUME        | 为容器创建挂载点或声明卷。                              |
| WORKDIR       | 设置后续指令的工作目录。                               |
| USER          | 指定后续指令的用户上下文。                              |
| ARG           | 定义在构建过程中传递给构建器的变量，可使用 "docker build" 命令设置。 |
| ONBUILD       | 当该镜像被用作另一个构建过程的基础时，添加触发器。                  |
| STOPSIGNAL    | 设置发送给容器以退出的系统调用信号。                         |
| HEALTHCHECK   | 定义周期性检查容器健康状态的命令。                          |
| SHELL         | 覆盖Docker中默认的shell，用于RUN、CMD和ENTRYPOINT指令。  |

## FROM

FROM是Dockerfile中的第一个指令，也是一个必须的指令。它用于指定构建新镜像时所基于的基础镜像。基础镜像可以是官方的Docker镜像，也可以是其他人或组织发布在Docker
Hub或其他容器注册表中的镜像。

```dockerfile
格式：
  FROM <image>
  FROM <image>:<tag>
示例：
    FROM nginx:1.25.1-alpine 默认不写使用latest版本的基础镜像
```

## MAINTAINER

用于指定镜像的维护者信息。它的作用和用法与LABEL指令类似，用于为镜像添加作者、维护者、联系方式等元数据。

```dockerfile
格式：
    MAINTAINER <name>
示例：
    MAINTAINER Jack yu
    MAINTAINER xxx@qq.com
```

## LABEL

用于向镜像添加元数据标签。这些标签可以包含关于镜像的信息，如作者、版本、描述、维护者等。LABEL指令是可选的，但它在构建镜像时为镜像添加了有用的描述性信息，有助于更好地管理和组织镜像库。

```dockerfile
格式：
   LABEL <key>=<value> <key>=<value> <key>=<value> ...
示例：
    LABEL "com.example.vendor"="ACME Incorporated"
    LABEL com.example.label-with-value="foo"
    LABEL version="1.0"
```

使用LABEL指令有更广泛的用途，可以用来添加更多类型的元数据信息，而MAINTAINER指令仅限于指定维护者信息。因此，如果你正在编写新的Dockerfile，建议使用LABEL指令来添加元数据信息，而避免使用过时的MAINTAINER指令。

## RUN

RUN是Dockerfile中的一个重要指令，用于在镜像中执行命令，以便在构建过程中安装软件包、配置环境、生成文件等。RUN指令执行的命令会在新的镜像层中运行，并且在后续构建中，只有在该层之前的内容发生变化时才会重新运行，利用了Docker的缓存机制，提高了构建速度。RUN指令可以接受多种格式的命令执行方式：Shell
格式：默认情况下，RUN指令使用Shell来执行命令。

```dockerfile
RUN apt-get update && apt-get install -y python3
```

Exec 格式：使用数组格式，可以避免在Shell中发生意外的解释问题。

```dockerfile
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "python3"]
```

RUN指令在Dockerfile中可以出现多次，并且每个RUN指令都会创建一个新的镜像层。为了减少镜像的层数，可以将多个命令合并为一行，例如使用&&连接多个命令，这样在构建镜像时只会生成一个新的层。

## CMD

CMD是Dockerfile中的一个重要指令，用于定义容器启动时默认要执行的命令。一个Dockerfile中只能包含一个CMD指令，如果有多个，则只有最后一个CMD指令会生效。CMD指令有两种格式：Shell
格式：使用Shell格式时，命令会在Shell中执行。

    CMD python app.py

Exec 格式：使用数组格式时，命令不会在Shell中执行，而是直接在容器中执行。

    CMD ["python", "app.py"]

使用CMD指令可以为镜像定义一个默认的启动命令，当使用docker
run命令启动容器时，如果没有指定其他命令，就会执行CMD中定义的命令。这使得在创建容器时无需手动指定要运行的命令，从而使容器的使用更加简便。如果在docker
run命令中指定了其他命令，则会覆盖CMD指令中的默认命令。例如，如果在启动容器时执行以下命令，就会覆盖CMD中定义的默认启动命令：

```dockerfile
docker run my_image python script.py
```

在上面的例子中，容器会运行python script.py命令，而不是默认的CMD指令中定义的命令。

## ENTRYPOINT

ENTRYPOINT是Dockerfile中的一个重要指令，用于配置容器启动时的默认执行命令。它类似于CMD指令，但有一些关键的区别。ENTRYPOINT指令的格式与CMD指令类似，可以使用Shell格式或数组格式，但在使用时，需要注意以下几点：

1. ENTRYPOINT指令的命令会在容器启动时始终执行，无论在docker run命令中是否指定了其他命令。它不会被覆盖，而是作为容器的主要执行命令。

2. 如果在docker run命令中指定了其他命令，这些命令将作为ENTRYPOINT指令的参数进行传递。也就是说，ENTRYPOINT指令中的命令将成为执行时的前缀。

下面是一个使用ENTRYPOINT指令的简单示例：

```dockerfile
FROM ubuntu:latest
 
ENTRYPOINT ["echo", "Hello"]
```

如果我们构建该镜像并运行容器，不提供其他参数，那么容器启动后将输出 "Hello"：

```dockerfile
$ docker build -t my_image .
$ docker run my_image
Hello
```

如果我们在运行容器时提供了其他参数，那么这些参数将作为ENTRYPOINT指令中命令的参数：

```dockerfile
$ docker run my_image "World"
Hello World
```

在实际应用中，可以使用ENTRYPOINT指令来定义一个可执行的程序或脚本，然后在容器启动时运行这个程序，并将Docker容器作为可执行应用来使用。这样可以确保容器在运行时的行为是可预期的，而且可以将容器配置和执行逻辑完全封装在镜像内部，使得容器的使用更加方便和易于管理。

## EXPOSE

EXPOSE用于声明容器在运行时监听的网络端口。它并不会实际上打开或映射端口，而是作为一个文档功能，用于告知用户该镜像内的服务或应用程序将使用指定的端口。以下是一个简单的示例：

```dockerfile
FROM ubuntu:latest
 
# 声明容器将监听80端口
EXPOSE 80
```

在上面的例子中，我们声明了容器将监听80端口。但是需要注意的是，EXPOSE并不会实际上打开该端口，也不会进行端口映射。在使用docker
run命令启动容器时，如果需要通过主机访问容器的80端口，还需要使用-p选项来进行端口映射，例如：

```dockerfile
$ docker run -p 8080:80 my_image
```

上述命令将容器的80端口映射到主机的8080端口，这样就可以通过访问主机的8080端口来访问容器的服务。

## ENV

ENV用于设置环境变量。它允许在镜像构建过程中设置环境变量，这些环境变量将在容器运行时可用。ENV指令的格式是ENV
key=value，其中key是环境变量的名称，value是环境变量的值。你可以使用多个ENV指令来设置多个环境变量。

```dockerfile
FROM ubuntu:latest
 
# 设置环境变量
ENV MY_NAME John Doe
ENV APP_HOME /app
 
# 创建目录并设置工作目录
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
 
# 复制应用程序到镜像中
COPY . .
 
# 在运行时输出环境变量
CMD echo "Hello, $MY_NAME"
```

在上面的例子中，我们使用了两个ENV指令来设置两个环境变量：MY\_NAME和APP\_HOME。在镜像构建过程中，这些环境变量会被设置为指定的值。然后，在容器启动时，CMD指令中的命令将使用$MY\_NAME环境变量的值输出问候语。在运行容器时，你可以通过docker
run命令的-e选项来覆盖环境变量的值。例如：

```dockerfile
$ docker run -e MY_NAME="Alice" my_image
```

上述命令将覆盖默认的MY\_NAME环境变量值，容器将输出 "Hello, Alice"。

## ADD

ADD用于将文件、目录或远程URL复制到镜像中。它类似于COPY指令，但在功能上更强大。ADD指令的格式是ADD source
destination，其中source是要复制的源文件、目录或URL，destination是复制后的目标路径。destination可以是绝对路径或相对于工作目录的路径。除了复制文件和目录，ADD指令还支持自动解压缩。如果source是一个压缩文件（例如.tar、.tar.gz、.tgz、.zip等），那么ADD指令会自动解压缩该文件到destination指定的目录。以下是一些ADD指令的示例：复制本地文件到镜像中：

```dockerfile
ADD app.py /app/
```

复制本地目录到镜像中：

```dockerfile
ADD src/ /app/
```

从远程URL下载文件并复制到镜像中：

```dockerfile
ADD https://example.com/file.tar.gz /tmp/
```

解压缩压缩文件并复制到镜像中：

```dockerfile
ADD app.tar.gz /app/
```

## COPY

COPY用于将本地文件或目录复制到镜像中。它不支持自动解压缩功能，与ADD指令相比，功能更简单明确。COPY指令的格式是COPY source
destination，其中source是要复制的源文件或目录，destination是复制后的目标路径。destination可以是绝对路径或相对于工作目录的路径。以下是一些COPY指令的示例：复制本地文件到镜像中：

```dockerfile
COPY app.py /app/
```

复制本地目录到镜像中：

```dockerfile
COPY src/ /app/
```

COPY指令会将本地文件或目录复制到镜像中的指定位置。在构建镜像时，Docker将会在镜像的文件系统层中添加复制的文件或目录。这使得镜像的构建过程更加明确，不会产生自动解压缩的不确定行为。相对于ADD指令，COPY指令更为推荐，特别是在只需要简单复制本地文件或目录的情况下。COPY指令功能简单，不容易引起不必要的意外行为。对于大多数复制文件的场景，建议使用COPY指令。

## VOLUME

VOLUME于声明容器中的挂载点（数据卷）。数据卷是一个特殊的目录，它可以绕过联合文件系统（UnionFS），并在容器间共享数据。VOLUME指令的格式是VOLUME \["
/path/to/directory"\]，其中/path/to/directory是挂载点的路径。可以在一个Dockerfile中使用多个VOLUME指令来声明多个挂载点。以下是一个简单的示例：

```dockerfile
FROM ubuntu:latest
 
# 声明两个挂载点
VOLUME ["/app/data", "/app/logs"]
```

在上面的例子中，我们声明了两个挂载点/app/data和/app/logs，这样在运行容器时，可以将这两个挂载点映射到主机的文件系统中，以实现数据持久化和共享。在运行容器时，可以使用-v选项或--mount选项来将主机的目录或数据卷映射到容器的挂载点。例如：

```dockerfile
$ docker run -v /host/data:/app/data -v /host/logs:/app/logs my_image
```

上述命令将主机的/host/data和/host/logs目录分别映射到容器中的/app/data和/app/logs挂载点，实现了主机和容器之间的数据共享。

## WORKDIR

WORKDIR用于设置工作目录，也称为当前工作目录。在容器启动时，进程的当前工作目录将被设置为WORKDIR指令所指定的目录。我们使用WORKDIR指令将工作目录设置为/app，

```dockerfile
FROM ubuntu:latest
 
# 设置工作目录
WORKDIR /app
 
# 容器启动时运行的命令
CMD ["python", "app.py"]
```

当容器启动时，进程的当前工作目录将自动设置为/app，这样在执行CMD指令时，不需要使用绝对路径来运行python app.py。

## USER

USER用于指定在容器中运行镜像时要使用的非特权用户。默认情况下，Docker容器在启动时以root用户身份运行，这意味着容器内的进程具有最高权限。然而，为了加强安全性，避免潜在的安全风险，最好以非特权用户的身份运行容器中的应用程序。以下是一个简单的示例：

```dockerfile
FROM ubuntu:latest
 
# 创建一个新用户并切换到该用户
RUN useradd -ms /bin/bash myuser
USER myuser
 
# 设置工作目录
WORKDIR /app
 
# 复制应用程序到工作目录
COPY . .
 
# 设置环境变量
ENV APP_ENV production
 
# 容器启动时运行的命令
CMD ["python", "app.py"]
```

在上面的例子中，我们使用useradd命令创建了一个名为myuser的新用户，并使用-ms
/bin/bash选项指定了创建用户时使用的shell。然后，通过USER指令切换到了myuser用户。这样，在容器运行时，进程将以myuser用户的身份运行，而不是以root用户身份。

## ARG

ARG是用于定义构建参数（build-time
arguments）。构建参数允许在构建镜像时传递变量值，这些变量可以在Dockerfile中使用，并且在构建过程中可以通过--build-arg选项进行覆盖。以下是一个简单的示例：

```dockerfile
FROM ubuntu:latest
 
# 定义构建参数
ARG MY_ENV=production
 
# 使用构建参数设置环境变量
ENV ENVIRONMENT=$MY_ENV
```

在上面的例子中，我们通过ARG指令定义了一个名为MY\_ENV的构建参数，并设置了其默认值为production。然后，在FROM指令之后，我们使用构建参数设置了一个名为ENVIRONMENT的环境变量。在构建镜像时，可以通过--build-arg选项来指定构建参数的值，例如：

```dockerfile
$ docker build --build-arg MY_ENV=development -t my_image .
```

上述命令中，我们通过--build-arg选项将构建参数MY\_ENV的值覆盖为development，构建参数的使用使得在构建镜像时可以根据需要进行参数化配置，使镜像更加灵活和可配置。

## ONBUILD

ONBUILD用于定义一个触发器，在当前镜像作为基础镜像被其他镜像构建时执行一系列的操作。换句话说，ONBUILD允许你在当前镜像构建时定义一些操作，这些操作会在其他镜像以当前镜像为基础构建时执行。例如，你可以在一个基础镜像中使用ONBUILD指令来定义安装依赖包的操作，然后其他镜像可以继承这个基础镜像，并在构建时自动安装所需的依赖。基础镜像
base/Dockerfile:

```dockerfile
FROM ubuntu:latest
 
# 安装一些基本依赖包
RUN apt-get update && apt-get install -y build-essential
 
# 在其他镜像构建时执行的操作
ONBUILD RUN echo "Hello from the ONBUILD trigger!"
```

其他镜像 myapp/Dockerfile:

```dockerfile
FROM base
 
# 复制应用程序到镜像中
COPY . /app
 
# 容器启动时运行的命令
CMD ["python", "app.py"]
```

在上面的例子中，我们定义了一个基础镜像base，它包含一个ONBUILD触发器，在其他镜像构建时会输出 "Hello from the ONBUILD
trigger!"。然后，在另一个镜像myapp中，我们继承了base镜像，并在容器中运行应用程序。当构建myapp镜像时，ONBUILD触发器会自动执行，并输出消息。

## STOPSIGNAL

STOPSIGNAL用于设置在停止容器时要使用的信号。当使用docker stop命令停止容器时，Docker会向容器发送一个指定的信号，这个信号将触发容器的停止操作。

```dockerfile
FROM ubuntu:latest
 
# 设置停止容器时使用的信号
STOPSIGNAL SIGINT
```

在上面的例子中，我们使用STOPSIGNAL指令设置容器停止时使用的信号为SIGINT，即信号编号为2。这意味着当我们使用docker
stop命令停止容器时，Docker会发送SIGINT信号给容器，触发容器的停止操作。

## HEALTHCHECK

HEALTHCHECK用于定义容器的健康检查机制。健康检查是一种用于确定容器是否处于正常运行状态的机制，通过定期检查容器内部的服务或应用程序，可以确保容器持续提供可用的服务。HEALTHCHECK指令有以下几个选项：

* \--interval=：设置健康检查的间隔时间，默认为30秒。

* \--timeout=：设置健康检查命令的超时时间，默认为30秒。

* \--start-period=：设置容器启动后的等待时间，等待一定时间后开始进行健康检查，默认为0秒。

* \--retries=：设置健康检查失败后重试的次数，默认为3次。

以下是一个简单的示例：

```dockerfile
FROM ubuntu:latest
 
# 健康检查命令
HEALTHCHECK --interval=5s --timeout=3s CMD curl -f http://localhost/ || exit 1
```

在上面的例子中，我们使用HEALTHCHECK指令定义了一个健康检查机制。它会每隔5秒运行一次curl命令来检查http:
//localhost/是否返回正常响应（状态码为200）。如果检查失败（返回状态码不为200），则容器会被标记为不健康状态。健康检查是在容器内部进行的，通过执行容器中的检查命令来确定容器的健康状况。当容器的健康状态发生变化时，Docker会相应地更新容器的健康状态，并且在使用Docker
API 时，可以通过查询容器的健康状态来了解容器的健康状况。使用HEALTHCHECK指令可以提高容器的可靠性和健壮性，特别是在使用编排工具如Docker
Compose或Kubernetes时，可以根据容器的健康状态来进行自动的健康调整和容器替换操作。

## SHELL

SHELL是Dockerfile中的一个特殊指令，用于设置在构建镜像时使用的Shell。它允许你指定在Dockerfile中执行的命令所使用的Shell解析器。

```dockerfile
# 设置使用bash作为Shell解释器
SHELL ["/bin/bash", "-c"]
 
# 在构建镜像时执行命令
RUN echo "Hello, Docker!"
```

在上面的例子中，我们使用SHELL指令将Shell解释器设置为bash。然后，在RUN指令中，我们执行了一个简单的命令来输出 "Hello,
Docker!"。

## 使用Dockerfile定制镜像

以下是一个简单的Dockerfile示例：

```dockerfile
# 使用官方的Ubuntu 20.04镜像作为基础镜像
FROM ubuntu:20.04
 
# 设置工作目录
WORKDIR /app
 
# 复制应用程序到镜像中
COPY . .
 
# 安装应用程序所需的依赖
RUN apt-get update && apt-get install -y python3
 
# 设置环境变量
ENV APP_ENV production
 
# 容器启动时运行的命令
CMD ["python3", "app.py"]
```

构建镜像：docker build命令:

    docker build -t my_image .

docker
build命令会根据Dockerfile的内容，逐条执行其中的指令，并创建一个新的镜像。构建过程会根据每条指令的内容，生成新的镜像层。每条指令都会在上一层的基础上进行修改，最终构建出一个完整的镜像。基于参数构建镜像:

```dockerfile
# 使用官方的Ubuntu 20.04镜像作为基础镜像
FROM ubuntu:20.04
 
# 定义构建参数
ARG APP_VERSION=1.0
 
# 设置工作目录
WORKDIR /app
 
# 复制应用程序到镜像中
COPY app-v$APP_VERSION .
 
# 容器启动时运行的命令
CMD ["./app"]
```

构建镜像时，可以通过--build-arg选项来指定构建参数的值：

```dockerfile
docker build --build-arg APP_VERSION=2.0 -t my_app .
```

上述命令将构建一个标签为my\_app的镜像，其中APP\_VERSION构建参数的值为2.0，因此COPY指令将复制app-v2.0目录到镜像中。

## Dockerfile最佳实践

### 最小化镜像大小

最小化Docker镜像的大小是一个重要的优化策略，可以减少网络传输和存储开销，加快镜像的下载和部署速度。以下是一些最小化镜像大小的技巧：

* 使用轻量的基础镜像：选择合适的基础镜像，可以避免不必要的依赖和组件，例如Alpine Linux镜像比Ubuntu镜像更轻量。

* 单独安装软件包：将软件包的安装命令合并到一条RUN指令中，并在安装完成后清理缓存和临时文件，以减少镜像大小。

* 删除不必要的文件：在复制文件或目录到镜像时，只复制必要的文件，并在复制后删除不需要的文件和目录。

* 使用特定的构建工具：对于特定的编程语言和应用程序，使用专门优化过的构建工具可以减少构建中的不必要依赖。

### 使用多阶段构建

多阶段构建是一种有效的优化技术，可以在一个Dockerfile中使用多个FROM指令，每个FROM指令都代表一个构建阶段。每个构建阶段都可以从之前的阶段复制所需的文件，并执行特定的构建操作。使用多阶段构建可以使得最终生成的镜像只包含运行应用程序所必需的文件和依赖，而不包含构建过程中产生的不必要文件和依赖。以下是一个多阶段构建的示例：

```dockerfile
# 构建阶段1
FROM golang:1.17 AS builder
 
WORKDIR /app
COPY . .
 
# 编译应用程序
RUN go build -o myapp
 
# 构建阶段2
FROM alpine:latest
 
# 复制编译后的应用程序
COPY --from=builder /app/myapp /usr/local/bin/
 
# 设置工作目录
WORKDIR /usr/local/bin
 
# 容器启动时运行的命令
CMD ["myapp"]
```

在上面的例子中，我们使用两个构建阶段。第一个构建阶段使用 Golang 基础镜像来编译应用程序，第二个构建阶段使用 Alpine
Linux 基础镜像，仅复制编译后的应用程序，并设置容器启动时的命令。

### 有效使用缓存

Docker在构建镜像时会缓存每个指令的结果，以便在下次构建相同的指令时直接使用缓存，加快构建速度。在编写Dockerfile时，可以根据指令的特性来安排指令的顺序，以使得常变化的指令在后面，不变的指令在前面，这样可以最大程度地利用Docker的缓存机制。例如，将不经常修改的基础依赖安装放在前面的指令，并将频繁修改的应用程序代码放在后面的指令。

### 多层镜像构建优化

多层镜像构建是指在一个Dockerfile中使用多个RUN指令来构建镜像。每个RUN指令会产生一个新的镜像层，而每个镜像层都会占用额外的存储空间。为了优化多层镜像构建，可以使用&&操作符将多个命令合并成一个RUN指令，避免产生额外的镜像层。同时，在一个RUN指令中执行多个命令可以减少Docker镜像的大小。例如，将多个apt-get安装命令合并成一个RUN指令：

```dockerfile
RUN apt-get update && apt-get install -y \
    package1 \
    package2 \
    package3
```

这样可以将多个安装命令合并为一个镜像层，减少镜像大小。

下面是基于 Alpine Linux openjdk-8 基础镜像构建一个包含中文宋体字库的镜像。

```dockerfile
FROM openjdk:8-alpine

# 安装中文字体
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories  \
    && apk add --update ttf-dejavu fontconfig  \
    && rm -rf /var/cache/apk/* 

# 添加宋体
COPY SimSun-01.ttf /usr/share/fonts/ttf-dejavu
COPY NSimSun-02.ttf /usr/share/fonts/ttf-dejavu

# 建立字体索引
RUN  mkfontscale  \
    && mkfontdir  \
    && fc-cache -fv
```

只要`docker build`即可得到一个新的镜像。

```shell
docker build -t alpine-jdk8:0.0.1 .
```

同理，如果我还需要 python 环境，那么我直接在安装一个 python 就可以了。

```dockerfile
FROM openjdk:8-alpine

# 安装python
RUN apk add python2

# 安装中文字体
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories  \
    && apk add --update ttf-dejavu fontconfig  \
    && rm -rf /var/cache/apk/*  

# 添加宋体
COPY SimSun-01.ttf /usr/share/fonts/ttf-dejavu
COPY NSimSun-02.ttf /usr/share/fonts/ttf-dejavu

# 建立字体索引
RUN  mkfontscale  \
    && mkfontdir  \
    && fc-cache -fv
```

