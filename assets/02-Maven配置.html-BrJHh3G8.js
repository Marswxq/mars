import{_ as e,c,a as n,b as t,w as p,d as i,r as o,o as u,e as l}from"./app-DJm-wWA8.js";const k={},d={class:"table-of-contents"};function g(v,s){const a=o("router-link");return u(),c("div",null,[s[9]||(s[9]=n("h1",{id:"maven-配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#maven-配置"},[n("span",null,"Maven 配置")])],-1)),s[10]||(s[10]=n("p",null,[n("strong",null,"目录")],-1)),n("nav",d,[n("ul",null,[n("li",null,[t(a,{to:"#setting-xml"},{default:p(()=>s[0]||(s[0]=[l("setting.xml")])),_:1})]),n("li",null,[t(a,{to:"#pom-xml"},{default:p(()=>s[1]||(s[1]=[l("pom.xml")])),_:1}),n("ul",null,[n("li",null,[t(a,{to:"#基础配置"},{default:p(()=>s[2]||(s[2]=[l("基础配置")])),_:1})]),n("li",null,[t(a,{to:"#构建配置"},{default:p(()=>s[3]||(s[3]=[l("构建配置")])),_:1})]),n("li",null,[t(a,{to:"#分发配置"},{default:p(()=>s[4]||(s[4]=[l("分发配置")])),_:1})]),n("li",null,[t(a,{to:"#仓库配置"},{default:p(()=>s[5]||(s[5]=[l("仓库配置")])),_:1})]),n("li",null,[t(a,{to:"#报表配置"},{default:p(()=>s[6]||(s[6]=[l("报表配置")])),_:1})]),n("li",null,[t(a,{to:"#项目配置"},{default:p(()=>s[7]||(s[7]=[l("项目配置")])),_:1})])])]),n("li",null,[t(a,{to:"#profile"},{default:p(()=>s[8]||(s[8]=[l("profile")])),_:1})])])]),s[11]||(s[11]=i(`<h2 id="setting-xml" tabindex="-1"><a class="header-anchor" href="#setting-xml"><span>setting.xml</span></a></h2><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>settings</span></span>
<span class="line">        <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--本地仓库。该值表示构建系统本地仓库的路径。其默认值为\${user.home}/.m2/repository。  --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>localRepository</span><span class="token punctuation">&gt;</span></span>usr/local/maven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>localRepository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--Maven是否需要和用户交互以获得输入。如果Maven需要和用户交互以获得输入，则设置成true，反之则应为false。默认为true。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>interactiveMode</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>interactiveMode</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--Maven是否需要使用plugin-registry.xml文件来管理插件版本。</span>
<span class="line">        如果设置为true，则在{user.home}/.m2下需要有一个plugin-registry.xml来对plugin的版本进行管理</span>
<span class="line">        默认为false。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>usePluginRegistry</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>usePluginRegistry</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--表示Maven是否需要在离线模式下运行。如果构建系统需要在离线模式下运行，则为true，默认为false。</span>
<span class="line">        当由于网络设置原因或者安全因素，构建服务器不能连接远程仓库的时候，该配置就十分有用。  --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>offline</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>offline</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--当插件的组织Id（groupId）没有显式提供时，供搜寻插件组织Id（groupId）的列表。</span>
<span class="line">        该元素包含一个pluginGroup元素列表，每个子元素包含了一个组织Id（groupId）。</span>
<span class="line">        当我们使用某个插件，并且没有在命令行为其提供组织Id（groupId）的时候，Maven就会使用该列表。</span>
<span class="line">        默认情况下该列表包含了org.apache.maven.plugins。 --&gt;</span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginGroups</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token comment">&lt;!--plugin的组织Id（groupId）--&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginGroup</span><span class="token punctuation">&gt;</span></span>org.codehaus.mojo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginGroup</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginGroups</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--用来配置不同的代理，多代理profiles可以应对笔记本或移动设备的工作环境：通过简单的设置profile id就可以很容易的更换整个代理配置 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>proxies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token comment">&lt;!--代理元素包含配置代理时需要的信息 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>proxy</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--代理的唯一定义符，用来区分不同的代理元素。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>myproxy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--该代理是否是激活的那个。true则激活代理。当我们声明了一组代理，而某个时候只需要激活一个代理的时候，该元素就可以派上用处 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>active</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>active</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--代理的协议。 协议://主机名:端口，分隔成离散的元素以方便配置。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>protocol</span><span class="token punctuation">&gt;</span></span>http://…<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>protocol</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--代理的主机名。协议://主机名:端口，分隔成离散的元素以方便配置。   --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>host</span><span class="token punctuation">&gt;</span></span>proxy.somewhere.com<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>host</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--代理的端口。协议://主机名:端口，分隔成离散的元素以方便配置。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>port</span><span class="token punctuation">&gt;</span></span>8080<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>port</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--代理的用户名，用户名和密码表示代理服务器认证的登录名和密码。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>username</span><span class="token punctuation">&gt;</span></span>proxyuser<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>username</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--代理的密码，用户名和密码表示代理服务器认证的登录名和密码。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>password</span><span class="token punctuation">&gt;</span></span>somepassword<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>password</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--不该被代理的主机名列表。该列表的分隔符由代理服务器指定；例子中使用了竖线分隔符，使用逗号分隔也很常见。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nonProxyHosts</span><span class="token punctuation">&gt;</span></span>*.google.com|ibiblio.org<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nonProxyHosts</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>proxy</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>proxies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--配置服务端的一些设置。一些设置如安全证书不应该和pom.xml一起分发。这种类型的信息应该存在于构建服务器上的settings.xml文件中。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servers</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token comment">&lt;!--服务器元素包含配置服务器时需要的信息  --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--这是server的id（注意不是用户登陆的id），该id与distributionManagement中repository元素的id相匹配。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>server001<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--鉴权用户名。鉴权用户名和鉴权密码表示服务器认证所需要的登录名和密码。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>username</span><span class="token punctuation">&gt;</span></span>my_login<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>username</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--鉴权密码 。鉴权用户名和鉴权密码表示服务器认证所需要的登录名和密码。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>password</span><span class="token punctuation">&gt;</span></span>my_password<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>password</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--鉴权时使用的私钥位置。和前两个元素类似，私钥位置和私钥密码指定了一个私钥的路径</span>
<span class="line">                （默认是/home/hudson/.ssh/id_dsa）以及如果需要的话，一个密语。</span>
<span class="line">                将来passphrase和password元素可能会被提取到外部，但目前它们必须在settings.xml文件以纯文本的形式声明 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>privateKey</span><span class="token punctuation">&gt;</span></span>\${usr.home}/.ssh/id_dsa<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>privateKey</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--鉴权时使用的私钥密码。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>passphrase</span><span class="token punctuation">&gt;</span></span>some_passphrase<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>passphrase</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--文件被创建时的权限。如果在部署的时候会创建一个仓库文件或者目录，这时候就可以使用权限（permission）。</span>
<span class="line">                这两个元素合法的值是一个三位数字，其对应了unix文件系统的权限，如664，或者775。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filePermissions</span><span class="token punctuation">&gt;</span></span>664<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filePermissions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--目录被创建时的权限。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directoryPermissions</span><span class="token punctuation">&gt;</span></span>775<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directoryPermissions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--传输层额外的配置项  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servers</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--为仓库列表配置的下载镜像列表。  --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrors</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token comment">&lt;!--给定仓库的下载镜像。  --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirror</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--该镜像的唯一标识符。id用来区分不同的mirror元素。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>planetmirror.com<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--镜像名称  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>PlanetMirror Australia<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--该镜像的URL。构建系统会优先考虑使用该URL，而非使用默认的服务器URL。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://downloads.planetmirror.com/pub/maven2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--被镜像的服务器的id。例如，如果我们要设置了一个Maven中央仓库（http://repo1.maven.org/maven2）的镜像，就需要将该元素设置成central。</span>
<span class="line">            这必须和中央仓库的id central完全一致。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrorOf</span><span class="token punctuation">&gt;</span></span>central<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrorOf</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirror</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrors</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--根据环境参数来调整构建配置的列表。settings.xml中的profile元素是pom.xml中profile元素的裁剪版本。</span>
<span class="line">        它包含了id，activation, repositories, pluginRepositories和 properties元素。</span>
<span class="line">        这里的profile元素只包含这五个子元素是因为这里只关心构建系统这个整体（这正是settings.xml文件的角色定位），而非单独的项目对象模型设置。</span>
<span class="line">        如果一个settings中的profile被激活，它的值会覆盖任何其它定义在POM中或者profile.xml中的带有相同id的profile。  --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profiles</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!--根据环境参数来调整的构件的配置 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!--该配置的唯一标识符。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--自动触发profile的条件逻辑。Activation是profile的开启钥匙。</span>
<span class="line">                如POM中的profile一样，profile的力量来自于它能够在某些特定的环境中自动使用某些特定的值；这些环境通过activation元素指定。</span>
<span class="line">                activation元素并不是激活profile的唯一方式。settings.xml文件中的activeProfile元素可以包含profile的id。</span>
<span class="line">                profile也可以通过在命令行，使用-P标记和逗号分隔的列表来显式的激活（如，-P test）。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token comment">&lt;!--profile默认是否激活的标识 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeByDefault</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeByDefault</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token comment">&lt;!--activation有一个内建的java版本检测，如果检测到jdk版本与期待的一样，profile被激活。 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>jdk</span><span class="token punctuation">&gt;</span></span>1.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>jdk</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性。 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>os</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--激活profile的操作系统的名字  --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>Windows XP<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--激活profile的操作系统所属家族(如 &#39;windows&#39;)   --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>family</span><span class="token punctuation">&gt;</span></span>Windows<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>family</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--激活profile的操作系统体系结构   --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arch</span><span class="token punctuation">&gt;</span></span>x86<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arch</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--激活profile的操作系统版本 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.1.2600<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>os</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--如果Maven检测到某一个属性（其值可以在POM中通过\${名称}引用），其拥有对应的名称和值，Profile就会被激活。</span>
<span class="line">                    如果值字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--激活profile的属性的名称 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>mavenVersion<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--激活profile的属性的值  --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>2.0.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活profile。</span>
<span class="line">                    另一方面，exists则会检查文件是否存在，如果存在则激活profile。 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>file</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--如果指定的文件存在，则激活profile。  --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exists</span><span class="token punctuation">&gt;</span></span>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exists</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--如果指定的文件不存在，则激活profile。 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">&gt;</span></span>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>missing</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>file</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--对应profile的扩展属性列表。Maven属性和Ant中的属性一样，可以用来存放一些值。这些值可以在POM中的任何地方使用标记\${X}来使用，这里X是指属性的名称。</span>
<span class="line">                属性有五种不同的形式，并且都能在settings.xml文件中访问。   </span>
<span class="line">                   1. env.X: 在一个变量前加上&quot;env.&quot;的前缀，会返回一个shell环境变量。例如,&quot;env.PATH&quot;指代了$path环境变量（在Windows上是%PATH%）。   </span>
<span class="line">                   2. project.x：指代了POM中对应的元素值。      </span>
<span class="line">                   3. settings.x: 指代了settings.xml中对应元素的值。   </span>
<span class="line">                   4. Java System Properties: 所有可通过java.lang.System.getProperties()访问的属性都能在POM中使用该形式访问，   </span>
<span class="line">                    如/usr/lib/jvm/java-1.6.0-openjdk-1.6.0.0/jre。      </span>
<span class="line">                   5. x: 在&lt;properties/&gt;元素中，或者外部文件中设置，以\${someVar}的形式使用。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token comment">&lt;!-- 如果这个profile被激活，那么属性\${user.install}就可以被访问了 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>user.install</span><span class="token punctuation">&gt;</span></span>usr/local/winner/jobs/maven-guide<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>user.install</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--远程仓库列表，它是Maven用来填充构建系统本地仓库所使用的一组远程项目。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repositories</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token comment">&lt;!--包含需要连接到远程仓库的信息  --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--远程仓库唯一标识 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>codehausSnapshots<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token comment">&lt;!--远程仓库名称  --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>Codehaus Snapshots<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!--如何处理远程仓库里发布版本的下载 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>releases</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                        <span class="token comment">&lt;!--true或者false表示该仓库是否为下载某种类型构件（发布版，快照版）开启。   --&gt;</span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enabled</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                        <span class="token comment">&lt;!--该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳。这里的选项是：</span>
<span class="line">                            always（一直），daily（默认，每日），interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。  --&gt;</span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>updatePolicy</span><span class="token punctuation">&gt;</span></span>always<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>updatePolicy</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                        <span class="token comment">&lt;!--当Maven验证构件校验文件失败时该怎么做:</span>
<span class="line">                            ignore（忽略），fail（失败），或者warn（警告）。 --&gt;</span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>checksumPolicy</span><span class="token punctuation">&gt;</span></span>warn<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>checksumPolicy</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>releases</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!--如何处理远程仓库里快照版本的下载。有了releases和snapshots这两组配置，POM就可以在每个单独的仓库中，为每种类型的构件采取不同的策略。</span>
<span class="line">                        例如，可能有人会决定只为开发目的开启对快照版本下载的支持。参见repositories/repository/releases元素 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshots</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>updatePolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>checksumPolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshots</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!--远程仓库URL，按protocol://hostname/path形式  --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://snapshots.maven.codehaus.org/maven2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!--用于定位和排序构件的仓库布局类型-可以是default（默认）或者legacy（遗留）。</span>
<span class="line">                        Maven 2为其仓库提供了一个默认的布局；然而，Maven 1.x有一种不同的布局。我们可以使用该元素指定布局是default（默认）还是legacy（遗留）。  --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout</span><span class="token punctuation">&gt;</span></span>default<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>layout</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repositories</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--发现插件的远程仓库列表。仓库是两种主要构件的家。第一种构件被用作其它构件的依赖。这是中央仓库中存储的大部分构件类型。另外一种构件类型是插件。</span>
<span class="line">                Maven插件是一种特殊类型的构件。由于这个原因，插件仓库独立于其它仓库。pluginRepositories元素的结构和repositories元素的结构类似。</span>
<span class="line">                每个pluginRepository元素指定一个Maven可以用来寻找新插件的远程地址。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginRepositories</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token comment">&lt;!--包含需要连接到远程插件仓库的信息.参见profiles/profile/repositories/repository元素的说明 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginRepository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>releases</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>updatePolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>checksumPolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>releases</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshots</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>updatePolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>checksumPolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshots</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginRepository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginRepositories</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--手动激活profiles的列表，按照profile被应用的顺序定义activeProfile。 该元素包含了一组activeProfile元素，每个activeProfile都含有一个profile id。</span>
<span class="line">                任何在activeProfile中定义的profile id，不论环境设置如何，其对应的 profile都会被激活。</span>
<span class="line">                如果没有匹配的profile，则什么都不会发生。例如，env-test是一个activeProfile，则在pom.xml（或者profile.xml）中对应id的profile会被激活。</span>
<span class="line">                如果运行过程中找不到这样一个profile，Maven则会像往常一样运行。  --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeProfiles</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeProfile</span><span class="token punctuation">&gt;</span></span>env-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeProfile</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeProfiles</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profiles</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>settings</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pom-xml" tabindex="-1"><a class="header-anchor" href="#pom-xml"><span>pom.xml</span></a></h2><h3 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置"><span>基础配置</span></a></h3><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span></span>
<span class="line">        <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 模型版本。maven2.0必须是这样写，现在是maven2唯一支持的版本 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成，</span>
<span class="line">        如com.winner.trade，maven会将该项目打成的jar包放本地路径：/com/winner/trade --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.winner.trade<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 本项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>trade-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 本项目目前所处的版本号 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 打包的机制，如pom, jar, maven-plugin, ejb, war, ear, rar, par，默认为jar --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>packaging</span><span class="token punctuation">&gt;</span></span>jar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>packaging</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 帮助定义构件输出的一些附属构件,附属构件与主构件对应，有时候需要加上classifier才能唯一的确定该构件</span>
<span class="line">            不能直接定义项目的classifer,因为附属构件不是项目直接默认生成的，而是由附加的插件帮助生成的  --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>classifier</span><span class="token punctuation">&gt;</span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>classifier</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!--dependencyManagement 标签用于控制子模块的依赖版本等信息 --&gt;</span></span>
<span class="line">    <span class="token comment">&lt;!-- 该标签只用来控制版本，不能将依赖引入，该元素能够约束 dependencies 下依赖的使用，即 dependencies 声明的依赖若未指定版本，</span>
<span class="line">    则使用 dependencyManagement 中指定的版本，否则将覆盖 dependencyManagement 中的版本 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token comment">&lt;!--引用的properties标签中定义的属性 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.2.17<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 定义本项目的依赖关系 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 每个dependency都对应这一个jar包 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 一般情况下，maven是通过groupId、artifactId、version这三个元素值（俗称坐标）来检索该构件，</span>
<span class="line">                然后引入你的工程。如果别人想引用你现在开发的这个项目（前提是已开发完毕并发布到了远程仓库），</span>
<span class="line">                就需要在他的pom文件中新建一个dependency节点，将本项目的groupId、artifactId、version写入，</span>
<span class="line">                maven就会把你上传的jar包下载到他的本地 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.winner.trade<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>trade-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- maven认为，程序对外部的依赖会随着程序的所处阶段和应用场景而变化，所以maven中的依赖关系有作用域(scope)的限制。</span>
<span class="line">                scope包含如下的取值：compile（编译范围）、provided（已提供范围）、runtime（运行时范围）、test（测试范围）、system（系统范围） --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 设置指依赖是否可选，默认为false,即子项目默认都继承:为true,则子项目必需显示的引入，与dependencyManagement里定义的依赖类似 。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 屏蔽依赖关系。</span>
<span class="line">                比如项目中使用的libA依赖某个库的1.0版，libB依赖某个库的2.0版，现在想统一使用2.0版，就应该屏蔽掉对1.0版的依赖 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.slf4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>slf4j-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 为pom定义一些常量，在pom中的其它地方可以直接引用</span>
<span class="line">        使用方式 如下 ：\${file.encoding} --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>file.encoding</span><span class="token punctuation">&gt;</span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>file.encoding</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>java.source.version</span><span class="token punctuation">&gt;</span></span>1.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>java.source.version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>java.target.version</span><span class="token punctuation">&gt;</span></span>1.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>java.target.version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    ...</span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建配置" tabindex="-1"><a class="header-anchor" href="#构建配置"><span>构建配置</span></a></h3><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 产生的构件的文件名，默认值是\${artifactId}-\${version}。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>finalName</span><span class="token punctuation">&gt;</span></span>myPorjectName<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>finalName</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 构建产生的所有文件存放的目录,默认为\${basedir}/target，即项目根目录下的target --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">&gt;</span></span>\${basedir}/target<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directory</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 当项目没有规定目标（Maven2 叫做阶段（phase））时的默认值，</span>
<span class="line">        必须跟命令行上的参数相同例如jar:jar，或者与某个阶段（phase）相同例如install、compile等 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>defaultGoal</span><span class="token punctuation">&gt;</span></span>install<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>defaultGoal</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 当filtering开关打开时，使用到的过滤器属性文件列表。</span>
<span class="line">        项目配置信息中诸如\${spring.version}之类的占位符会被属性文件中的实际值替换掉 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filters</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span><span class="token punctuation">&gt;</span></span>../filter.properties<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filters</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目相关的所有资源路径列表，例如和项目相关的配置文件、属性文件，这些资源被包含在最终的打包文件里。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resource</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 描述了资源的目标路径。该路径相对target/classes目录（例如\${project.build.outputDirectory}）。</span>
<span class="line">            举个例子，如果你想资源在特定的包里(org.apache.maven.messages)，你就必须该元素设置为org/apache/maven/messages。</span>
<span class="line">            然而，如果你只是想把资源放到源码目录结构里，就不需要该配置。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>targetPath</span><span class="token punctuation">&gt;</span></span>resources<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>targetPath</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 是否使用参数值代替参数名。参数值取自properties元素或者文件里配置的属性，文件在filters元素里列出。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filtering</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filtering</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 描述存放资源的目录，该路径相对POM路径 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">&gt;</span></span>src/main/resources<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directory</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 包含的模式列表 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">&gt;</span></span>**/*.properties<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">&gt;</span></span>**/*.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includes</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 排除的模式列表</span>
<span class="line">                如果&lt;include&gt;与&lt;exclude&gt;划定的范围存在冲突，以&lt;exclude&gt;为准 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>excludes</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclude</span><span class="token punctuation">&gt;</span></span>jdbc.properties<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclude</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>excludes</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resource</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 单元测试相关的所有资源路径，配制方法与resources类似--&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>testResources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>testResource</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>targetPath</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filtering</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>excludes</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>testResource</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>testResources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目源码目录，当构建项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sourceDirectory</span><span class="token punctuation">&gt;</span></span>\${basedir}\\src\\main\\java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sourceDirectory</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目脚本源码目录，该目录和源码目录不同，</span>
<span class="line">        绝大多数情况下，该目录下的内容会被拷贝到输出目录(因为脚本是被解释的，而不是被编译的)。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scriptSourceDirectory</span><span class="token punctuation">&gt;</span></span>\${basedir}\\src\\main\\scripts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scriptSourceDirectory</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目单元测试使用的源码目录，当测试项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>testSourceDirectory</span><span class="token punctuation">&gt;</span></span>\${basedir}\\src\\test\\java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>testSourceDirectory</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 被编译过的应用程序class文件存放的目录。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>outputDirectory</span><span class="token punctuation">&gt;</span></span>\${basedir}\\target\\classes<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>outputDirectory</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 被编译过的测试class文件存放的目录。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>testOutputDirectory</span><span class="token punctuation">&gt;</span></span>\${basedir}\\target\\test-classes<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>testOutputDirectory</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目的一系列构建扩展,它们是一系列build过程中要使用的产品，会包含在running bulid‘s classpath里面。</span>
<span class="line">        他们可以开启extensions，也可以通过提供条件来激活plugins。</span>
<span class="line">        简单来讲，extensions是在build过程被激活的产品--&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>extensions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 例如，通常情况下，程序开发完成后部署到线上Linux服务器，可能需要经历打包、</span>
<span class="line">            将包文件传到服务器、SSH连上服务器、敲命令启动程序等一系列繁琐的步骤。</span>
<span class="line">            实际上这些步骤都可以通过Maven的一个插件 wagon-maven-plugin 来自动完成</span>
<span class="line">            下面的扩展插件wagon-ssh用于通过SSH的方式连接远程服务器，</span>
<span class="line">            类似的还有支持ftp方式的wagon-ftp插件 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>extension</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.maven.wagon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>wagon-ssh<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>extension</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>extensions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 使用的插件列表 。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>maven-assembly-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.5.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 在构建生命周期中执行一组目标的配置。每个目标可能有不同的配置。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!-- 执行目标的标识符，用于标识构建过程中的目标，或者匹配继承过程中需要合并的执行目标 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>assembly<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!-- 绑定了目标的构建生命周期阶段，如果省略，目标会被绑定到源数据里配置的默认阶段 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">&gt;</span></span>package<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!-- 配置的执行目标 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>single<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!-- 配置是否被传播到子POM --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>inherited</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>inherited</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 作为DOM对象的配置,配置项因插件而异 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>finalName</span><span class="token punctuation">&gt;</span></span>\${finalName}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>finalName</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appendAssemblyId</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appendAssemblyId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>descriptor</span><span class="token punctuation">&gt;</span></span>assembly.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>descriptor</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 是否从该插件下载Maven扩展（例如打包和类型处理器），</span>
<span class="line">                由于性能原因，只有在真需要下载时，该元素才被设置成true。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>extensions</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>extensions</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 项目引入插件所需要的额外依赖 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 任何配置是否被传播到子项目 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>inherited</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>inherited</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 主要定义插件的共同元素、扩展元素集合，类似于dependencyManagement，</span>
<span class="line">        所有继承于此项目的子项目都能使用。该插件配置项直到被引用时才会被解析或绑定到生命周期。</span>
<span class="line">        给定插件的任何本地配置都会覆盖这里的配置 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分发配置" tabindex="-1"><a class="header-anchor" href="#分发配置"><span>分发配置</span></a></h3><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token comment">&lt;!-- 项目分发信息，在执行mvn deploy后表示要发布的位置。</span>
<span class="line">    有了这些信息就可以把网站部署到远程服务器或者把构件部署到远程仓库。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>distributionManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 部署项目产生的构件到远程仓库需要的信息 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 是分配给快照一个唯一的版本号（由时间戳和构建流水号），还是每次都使用相同的版本号</span>
<span class="line">            参见repositories/repository元素 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uniqueVersion</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>uniqueVersion</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>repo-id<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>repo-name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>file://\${basedir}/target/deploy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 构件的快照部署到哪里,如果没有配置该元素，默认部署到repository元素配置的仓库 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshotRepository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uniqueVersion</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshotRepository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 部署项目的网站需要的信息 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>site</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 部署位置的唯一标识符，用来匹配站点和settings.xml文件里的配置 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>site-id<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 部署位置的名称 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>site-name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 部署位置的URL，按protocol://hostname/path形式 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>scp://svn.baidu.com/banseon:/var/www/localhost/banseon-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>site</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目下载页面的URL。如果没有该元素，用户应该参考主页。</span>
<span class="line">        使用该元素的原因是：帮助定位那些不在仓库里的构件（由于license限制）。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>downloadUrl</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 如果构件有了新的group ID和artifact ID（构件移到了新的位置），这里列出构件的重定位信息。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>relocation</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 构件新的group ID --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 构件新的artifact ID --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 构件新的版本号 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 显示给用户的，关于移动的额外信息，例如原因。 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>message</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>relocation</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 给出该构件在远程仓库的状态。不得在本地项目中设置该元素，因为这是工具自动更新的。有效的值有：none（默认），converted（仓库管理员从Maven 1 POM转换过来），partner（直接从伙伴Maven 2仓库同步过来），deployed（从Maven 2实例部署），verified（被核实时正确的和最终的）。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>status</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>distributionManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="仓库配置" tabindex="-1"><a class="header-anchor" href="#仓库配置"><span>仓库配置</span></a></h3><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token comment">&lt;!-- 发现依赖和扩展的远程仓库列表。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repositories</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 包含需要连接到远程仓库的信息 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 如何处理远程仓库里发布版本的下载 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>releases</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- true或者false表示该仓库是否为下载某种类型构件（发布版，快照版）开启。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳。</span>
<span class="line">                这里的选项是：always（一直），daily（默认，每日），</span>
<span class="line">                interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>updatePolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!-- 当Maven验证构件校验文件失败时该怎么做：</span>
<span class="line">                ignore（忽略），fail（失败），或者warn（警告）。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>checksumPolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>releases</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 如何处理远程仓库里快照版本的下载。有了releases和snapshots这两组配置，</span>
<span class="line">            POM就可以在每个单独的仓库中，为每种类型的构件采取不同的策略。</span>
<span class="line">            例如，可能有人会决定只为开发目的开启对快照版本下载的支持 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshots</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>updatePolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>checksumPolicy</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshots</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 远程仓库唯一标识符。可以用来匹配在settings.xml文件里配置的远程仓库 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>repo-id<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 远程仓库名称 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>repo-name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 远程仓库URL，按protocol://hostname/path形式 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://192.168.1.169:9999/repository/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 用于定位和排序构件的仓库布局类型-可以是default（默认）或者legacy（遗留）。</span>
<span class="line">            Maven 2为其仓库提供了一个默认的布局；</span>
<span class="line">            然而，Maven 1.x有一种不同的布局。</span>
<span class="line">            我们可以使用该元素指定布局是default（默认）还是legacy（遗留）。 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout</span><span class="token punctuation">&gt;</span></span>default<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>layout</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repository</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repositories</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 发现插件的远程仓库列表，这些插件用于构建和报表 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginRepositories</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 包含需要连接到远程插件仓库的信息.参见repositories/repository元素 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginRepository</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginRepositories</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="报表配置" tabindex="-1"><a class="header-anchor" href="#报表配置"><span>报表配置</span></a></h3><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token comment">&lt;!-- 描述使用报表插件产生报表的规范,特定的maven 插件能输出相应的定制和配置报表.</span>
<span class="line">当用户执行“mvn site”，这些报表就会运行,在页面导航栏能看到所有报表的链接。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>reporting</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- true，则网站不包括默认的报表。这包括“项目信息”菜单中的报表。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>excludeDefaults</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 所有产生的报表存放到哪里。默认值是\${project.build.directory}/site。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>outputDirectory</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 使用的报表插件和他们的配置。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>inherited</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>links</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span><span class="token punctuation">&gt;</span></span>http://java.sun.com/j2se/1.5.0/docs/api/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>link</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>links</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token comment">&lt;!-- 一组报表的多重规范，每个规范可能有不同的配置。</span>
<span class="line">            一个规范（报表集）对应一个执行目标 。例如，有1，2，3，4，5，6，7，8，9个报表。</span>
<span class="line">            1，2，5构成A报表集，对应一个执行目标。2，5，8构成B报表集，对应另一个执行目标 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>reportSets</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!-- 表示报表的一个集合，以及产生该集合的配置 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>reportSet</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!-- 报表集合的唯一标识符，POM继承时用到 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>sunlink<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!-- 产生报表集合时，被使用的报表的配置 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!-- 配置是否被继承到子POMs --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>inherited</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">&lt;!-- 这个集合里使用到哪些报表 --&gt;</span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>reports</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>report</span><span class="token punctuation">&gt;</span></span>javadoc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>report</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>reports</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>reportSet</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>reportSets</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>reporting</span><span class="token punctuation">&gt;</span></span>    </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="项目配置" tabindex="-1"><a class="header-anchor" href="#项目配置"><span>项目配置</span></a></h3><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token comment">&lt;!-- 项目的问题管理系统(Bugzilla, Jira, Scarab,或任何你喜欢的问题管理系统)的名称和URL，本例为 jira --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>issueManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 问题管理系统（例如jira）的名字， --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>system</span><span class="token punctuation">&gt;</span></span>jira<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>system</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 该项目使用的问题管理系统的URL --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://jira.clf.com/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>issueManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 项目持续集成信息 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ciManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 持续集成系统的名字，例如continuum --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>system</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 该项目使用的持续集成系统的URL（如果持续集成系统有web接口的话）。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 构建完成时，需要通知的开发者/用户的配置项。包括被通知者信息和通知条件（错误，失败，成功，警告） --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>notifiers</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 配置一种方式，当构建中断时，以该方式通知用户/开发者 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>notifier</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 传送通知的途径 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 发生错误时是否通知 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sendOnError</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 构建失败时是否通知 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sendOnFailure</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 构建成功时是否通知 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sendOnSuccess</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 发生警告时是否通知 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sendOnWarning</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 不赞成使用。通知发送到哪里 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>address</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 扩展配置项 --&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>notifier</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>notifiers</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ciManagement</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 项目的名称, Maven产生的文档用 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>banseon-maven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 项目主页的URL, Maven产生的文档用 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://www.clf.com/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 项目的详细描述, Maven 产生的文档用。 当这个元素能够用HTML格式描述时</span>
<span class="line">            （例如，CDATA中的文本会被解析器忽略，就可以包含HTML标签），不鼓励使用纯文本描述。</span>
<span class="line">            如果你需要修改产生的web站点的索引页面，你应该修改你自己的索引页文件，而不是调整这里的文档。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">&gt;</span></span>A maven project to study maven.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 描述了这个项目构建环境中的前提条件。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>prerequisites</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 构建该项目或使用该插件所需要的Maven的最低版本 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>prerequisites</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 项目创建年份，4位数字。当产生版权信息时需要使用这个值。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>inceptionYear</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 项目相关邮件列表信息 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mailingLists</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 该元素描述了项目相关的所有邮件列表。自动产生的网站引用这些信息。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mailingList</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 邮件的名称 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>Demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 发送邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>post</span><span class="token punctuation">&gt;</span></span>clf@126.com<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>post</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>subscribe</span><span class="token punctuation">&gt;</span></span>clf@126.com<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>subscribe</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 取消订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>unsubscribe</span><span class="token punctuation">&gt;</span></span>clf@126.com<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>unsubscribe</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 你可以浏览邮件信息的URL --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>archive</span><span class="token punctuation">&gt;</span></span>http:/hi.clf.com/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>archive</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mailingList</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mailingLists</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 项目开发者列表 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>developers</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 某个项目开发者的信息 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>developer</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- SCM里项目开发者的唯一标识符 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>HELLO WORLD<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目开发者的全名 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>banseon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目开发者的email --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>email</span><span class="token punctuation">&gt;</span></span>banseon@126.com<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>email</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目开发者的主页的URL --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目开发者在项目中扮演的角色，角色元素描述了各种角色 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>roles</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>role</span><span class="token punctuation">&gt;</span></span>Project Manager<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>role</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>role</span><span class="token punctuation">&gt;</span></span>Architect<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>role</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>roles</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目开发者所属组织 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>organization</span><span class="token punctuation">&gt;</span></span>demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>organization</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目开发者所属组织的URL --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>organizationUrl</span><span class="token punctuation">&gt;</span></span>http://hi.clf.com/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>organizationUrl</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目开发者属性，如即时消息如何处理等 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dept</span><span class="token punctuation">&gt;</span></span>No<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dept</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目开发者所在时区， -11到12范围内的整数。 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>timezone</span><span class="token punctuation">&gt;</span></span>-5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>timezone</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>developer</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>developers</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 项目的其他贡献者列表 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>contributors</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 项目的其他贡献者。参见developers/developer元素 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>contributor</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>email</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>organization</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>organizationUrl</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>roles</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>timezone</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>contributor</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>contributors</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 该元素描述了项目所有License列表。应该只列出该项目的license列表，不要列出依赖项目的license列表。</span>
<span class="line">            如果列出多个license，用户可以选择它们中的一个而不是接受所有license。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>licenses</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 描述了项目的license，用于生成项目的web站点的license页面，其他一些报表和validation也会用到该元素。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>license</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- license用于法律上的名称 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>Apache 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 官方的license正文页面的URL --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://www.clf.com/LICENSE-2.0.txt<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目分发的主要方式： </span>
<span class="line">    repo，可以从Maven库下载 </span>
<span class="line">    manual， 用户必须手动下载和安装依赖 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>distribution</span><span class="token punctuation">&gt;</span></span>repo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>distribution</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 关于license的补充信息 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>comments</span><span class="token punctuation">&gt;</span></span>A business-friendly OSS license<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>comments</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>license</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>licenses</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- SCM(Source Control Management)标签允许你配置你的代码库，供Maven web站点和其它插件使用。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scm</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- SCM的URL,该URL描述了版本库和如何连接到版本库。欲知详情，请看SCMs提供的URL格式和列表。该连接只读。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>connection</span><span class="token punctuation">&gt;</span></span>scm:svn:http://svn.baidu.com/banseon/maven/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>connection</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 给开发者使用的，类似connection元素。即该连接不仅仅只读 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>developerConnection</span><span class="token punctuation">&gt;</span></span>scm:svn:http://svn.baidu.com/banseon/maven/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>developerConnection</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 当前代码的标签，在开发阶段默认为HEAD --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tag</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 指向项目的可浏览SCM库（例如ViewVC或者Fisheye）的URL。 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://svn.baidu.com/banseon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scm</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">&lt;!-- 描述项目所属组织的各种属性。Maven产生的文档用 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>organization</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 组织的全名 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 组织主页的URL --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://www.clf.com/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>organization</span><span class="token punctuation">&gt;</span></span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="profile" tabindex="-1"><a class="header-anchor" href="#profile"><span>profile</span></a></h2><p>pom.xml中的profile可以看做pom.xml的副本，拥有与pom.xml相同的子元素与配置方法。它包含可选的activation（profile的触发器）和一系列的changes。例如test过程可能会指向不同的数据库（相对最终的deployment）或者不同的dependencies或者不同的repositories，并且是根据不同的JDK来改变的。只需要其中一个成立就可以激活profile，如果第一个条件满足了，那么后面就不会在进行匹配。</p><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token comment">&lt;!-- 在列的项目构建profile，如果被激活，会修改构建处理 --&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profiles</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 根据环境参数或命令行参数激活某个构建处理 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token comment">&lt;!--自动触发profile的条件逻辑。Activation是profile的开启钥匙。--&gt;</span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--profile默认是否激活的标识 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeByDefault</span><span class="token punctuation">&gt;</span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeByDefault</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--activation有一个内建的java版本检测，如果检测到jdk版本与期待的一样，profile被激活。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>jdk</span><span class="token punctuation">&gt;</span></span>1.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>jdk</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>os</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--激活profile的操作系统的名字  --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>Windows XP<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--激活profile的操作系统所属家族(如 &#39;windows&#39;)   --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>family</span><span class="token punctuation">&gt;</span></span>Windows<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>family</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--激活profile的操作系统体系结构   --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arch</span><span class="token punctuation">&gt;</span></span>x86<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arch</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--激活profile的操作系统版本 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.1.2600<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>os</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--如果Maven检测到某一个属性（其值可以在POM中通过\${名称}引用），其拥有对应的名称和值，Profile就会被激活。</span>
<span class="line">               如果值字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--激活profile的属性的名称 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>mavenVersion<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--激活profile的属性的值  --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>2.0.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">&lt;!--提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活profile。</span>
<span class="line">               另一方面，exists则会检查文件是否存在，如果存在则激活profile。 --&gt;</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>file</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--如果指定的文件存在，则激活profile。  --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exists</span><span class="token punctuation">&gt;</span></span>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exists</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">&lt;!--如果指定的文件不存在，则激活profile。 --&gt;</span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">&gt;</span></span>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>missing</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>file</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modules</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repositories</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginRepositories</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>reporting</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>distributionManagement</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profiles</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18))])}const m=e(k,[["render",g],["__file","02-Maven配置.html.vue"]]),b=JSON.parse('{"path":"/docs/maven/02-Maven%E9%85%8D%E7%BD%AE.html","title":"Maven 配置","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"setting.xml","slug":"setting-xml","link":"#setting-xml","children":[]},{"level":2,"title":"pom.xml","slug":"pom-xml","link":"#pom-xml","children":[{"level":3,"title":"基础配置","slug":"基础配置","link":"#基础配置","children":[]},{"level":3,"title":"构建配置","slug":"构建配置","link":"#构建配置","children":[]},{"level":3,"title":"分发配置","slug":"分发配置","link":"#分发配置","children":[]},{"level":3,"title":"仓库配置","slug":"仓库配置","link":"#仓库配置","children":[]},{"level":3,"title":"报表配置","slug":"报表配置","link":"#报表配置","children":[]},{"level":3,"title":"项目配置","slug":"项目配置","link":"#项目配置","children":[]}]},{"level":2,"title":"profile","slug":"profile","link":"#profile","children":[]}],"git":{"updatedTime":1734338014000,"contributors":[{"name":"wangxiaoquan","email":"wxq","commits":1}]},"filePathRelative":"docs/maven/02-Maven配置.md"}');export{m as comp,b as data};
