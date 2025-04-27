# WinSw

## 什么是 WinSw

首先看看 [WinSw官方](https://github.com/winsw/winsw/tree/v3)的介绍

> WinSW wraps and manages any application as a Windows service.

翻译过来的意思就是，WinSW 可以将<u>**任何应用程序**</u>>打包并作为 Windows 服务进行管理。

划重点，Windows 服务可以通过 `services.msc` 进行管理，随着 Windows 自启动等。

## 开始使用 WinSw

WinSw 支持 全局和捆绑两种使用方式

> ## Use WinSW as a global tool
> * Take WinSW.exe or WinSW.zip from the distribution.
> * Write myapp.xml (see the XML config file specification and samples for more details).
> * Run winsw install myapp.xml [options] to install the service.
> * Run winsw start myapp.xml to start the service.
> * Run winsw status myapp.xml to see if your service is up and running.
> ## Use WinSW as a bundled tool
> * Take WinSW.exe or WinSW.zip from the distribution, and rename the .exe to your taste (such as myapp.exe).
> * Write myapp.xml (see the XML config file specification and samples for more details).
> * Place those two files side by side, because that's how WinSW discovers its co-related configuration.
> * Run myapp.exe install [options] to install the service.
> * Run myapp.exe start to start the service.

官方给出了一个 Jenkins 的例子。

```xml
<service>
    <id>jenkins</id>
    <name>Jenkins</name>
    <description>This service runs Jenkins continuous integration system.</description>
    <env name="JENKINS_HOME" value="%BASE%"/>
    <executable>java</executable>
    <arguments>-Xrs -Xmx256m -jar "%BASE%\jenkins.war" --httpPort=8080</arguments>
    <log mode="roll"></log>
</service>
```

划重点，通过官方例子可以得出一个结论，只要是在 Windows 下能执行的应用（文件、脚本、.exe 、.bat 、.jar……）都可以通过 WinSw 注册为
Windows 服务。

## 如何使用 WinSw

首先通过前面内容可以猜到 WinSw 是通过其配置文件进行管理的。

WinSw 支持的命令，官方内容如下

| Command   | Description                                              |
|-----------|----------------------------------------------------------|
| install   | Installs the service.                                    |
| uninstall | Uninstalls the service.                                  |
| start     | Starts the service.                                      |
| stop      | Stops the service.                                       |
| restart   | Stops and then starts the service.                       |
| status    | Checks the status of the service.                        |
| refresh   | Refreshes the service properties without reinstallation. |
| customize | Customizes the wrapper executable.                       |
| dev       | Experimental commands.                                   |

## 使用实例

### 1. nginx

**场景：**

统一认证服务部署在内网，但微信、钉钉等认证需要通过等其官方（公网）的验证才能获取 token 。
此时就需要一台前置服务（nginx）作为内网外往通信的桥梁，但是大家都知道 Windows 运行的不稳定性。
如何确保前置机的稳定运行呢？

**方案：**

把 nginx 作为 Windows 服务来进行管理，随着 Windows 的启动而启动。
PS:如果 Windows 没启动，其他都不用谈了~~~

首先，创建一个 nginx-service.xml 配置文件

```xml
<!-- nginx-service.xml -->
<service>
    <id>nginx</id>
    <name>nginx</name>
    <description>nginx</description>
    <startmode>Automatic</startmode>
    <executable>%BASE%\nginx.exe</executable>
    <logpath>%BASE%\logs\</logpath>
    <log mode="append">rotate</log>
</service>
```

其次，将 WinSw.exe 重命名为 nginx-service.xml

然后，安装 nginx 服务

```bash
nginx-service.exe install
```

最后，启动 nginx 服务

```bash
nginx-service start
```

为了方便使用，可以把管理命令作为脚本。

部署脚本

```bash
# instal.bat
@echo off
:color 2f
chcp 65001
mode con: cols=80 lines=25
echo 请按任意键开始安装后台服务...&pause>nul

nginx-service.exe install

echo 部署完成！
echo.
pause
```

启动脚本

```bash
# start.bat
@echo off
:color 2f
chcp 65001
mode con: cols=80 lines=25
echo 请按任意键开始启动nginx后台服务...&pause>nul

nginx-service start

echo.

echo nginx进程
tasklist /fi "imagename eq nginx.exe"

echo 请确认nginx进程是否存在，如进程未正常打印，请检查nginx安装目录下logs目录下日志，并重新启动
echo.

echo 启动完成！
echo.
pause
```

停止脚本

```bash
# stop.bat
@echo off
:color 2f
chcp 65001
mode con: cols=80 lines=25
echo 请按任意键开始停止nginx后台服务...&pause>nul

%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit

cd /d "%~dp0"

echo nginx进程
tasklist /fi "imagename eq nginx.exe"

echo.
taskkill /f /fi "IMAGENAME eq nginx.exe*"

echo.
echo 请确认nginx进程是否存在，如进程依然存在，请检查nginx安装目录下logs目录下日志，并重新停止
echo.

echo 停止完成！
echo.
pause
```

卸载脚本

```bash
# uninstall.bat
@echo off
:color 2f
chcp 65001
mode con: cols=80 lines=25
echo 请按任意键开始卸载nginx后台服务...&pause>nul

.\nginx-service.exe uninstall

echo 卸载完成！
echo.
pause
```

### 2. jar

配置文件

```xml
<service>
    <!--安装成Windows服务后的服务名-->
    <id>hcbp-devops-warnning</id>
    <!--显示的服务名称-->
    <name>hcbp-devops-warnning</name>
    <!--对服务的描述-->
    <description>hcbp-devops-warnning</description>
    <env name="HCBP_JRE_HOME" value="%Base%"/>
    <executable>java</executable>
    <arguments>-jar .\hcbp-devops-warnning.jar -Xmx512m -Xms512m
        --spring.config.additional-location=.\hcbp-devops-warnning.yml
    </arguments>
    <!--让服务自动启动-->
    <startmode>Automatic</startmode>
    <!--日志路径-->
    <logpath>./logs</logpath>
    <!--日志模式-->
    <log mode="roll-by-size-time">
        <sizeThreshold>10240</sizeThreshold>
        <pattern>yyyyMMdd</pattern>
        <autoRollAtTime>00:00:00</autoRollAtTime>
        <zipOlderThanNumDays>5</zipOlderThanNumDays>
        <zipDateFormat>yyyyMM</zipDateFormat>
    </log>
</service>
```

部署脚本

```bash
@echo off
chcp 65001
setlocal enabledelayedexpansion
echo 开始配置java环境
set "HCBP_JRE_HOME=%cd%\jre-1.8-x32"
echo 环境变量添加HCBP_JRE_HOME
setx /m HCBP_JRE_HOME %cd%\jre-1.8-x32 > nul
set "newPath=%HCBP_JRE_HOME%\bin"
echo %PATH% | findstr /C:"%newPath%" > nul
if %errorlevel% == 0 (
    echo PATH中HCBP_JRE_HOME已存在，正在替换...
    set "newPathList="
    for %%i in (%PATH%) do (
        if /I "%%i"=="%newPath%" (
            set "newPathList=!newPathList!;%%i"
        ) else (
            set "newPathList=!newPathList!;%%i"
        )
    )
    rem 添加新路径
    set "newPathList=!newPathList!;%newPath%"
    setx PATH "!newPathList:~1!" >nul
) else (
    echo PATH中HCBP_JRE_HOME不存在，正在替换...
    setx /m PATH "%PATH%;%newPath%" >nul
)
echo java环境配置完成！

echo 部署hcbp-devops-warnning
hcbp-devops-warnning.exe install
echo 部署完成！
echo.
endlocal
pause
```

启动脚本

```bash
@echo off
chcp 65001
hcbp-devops-warnning.exe start
echo.
echo 日志路径：%cd%\logs
echo 验证：http://127.0.0.1:10001/warnning/doc.html#/home
echo.
pause
```

停止脚本

```bash
@echo off
chcp 65001
hcbp-devops-warnning.exe stop
pause
```

卸载脚本

```bash
@echo off
chcp 65001
hcbp-devops-warnning.exe uninstall
pause
```