# Git 使用

**目录**

[[toc]]

## 基本命令

### 初始化

创建一个git仓库，创建之后就会在当前目录生成一个.git的文件

```bash
git init
```

### 添加文件

把文件添加到缓冲区

```bash
git add filename
```

添加所有文件到缓冲区（从目前掌握的水平看，和后面加“.”的区别在于，加all可以添加被手动删除的文件，而加“.”不行）

```bash
git add .
git add --all 或 git add -A
```

### 添加标签

```bash
git tag -a "标签名" -m "标签注释"
```

### 推送标签

```bash
git push origin "标签名"
```

### 删除本地标签

```bash
git tag -d 标签名
```

### 删除远端标签

```bash
git push origin :refs/tags/标签名
```

### 删除文件

```bash
git rm filename
```

### 提交

提交缓冲区的所有修改到仓库(注意：如果修改了文件但是没有add到缓冲区，也是不会被提交的)

```bash
git commit -m "提交的说明"
```

commit可以一次提交缓冲区的所有文件

### 查看git库的状态

未提交的文件，分为两种，add过已经在缓冲区的，未add过的(git bash中绿色内容)

```bash
git status
```

### 比较

如果文件修改了，还没有提交，就可以比较文件修改前后的差异

```bash
git diff filename
```

查看暂存区文件和上次提交的快照之间的差异

```bash
git diff --cached
```

显示出branch1和branch2中差异的部分

```bash
git diff branch1 branch2 --stat
```

显示指定文件的详细差异

```bash
git diff branch1 branch2 具体文件路径
```

显示出所有有差异的文件的详细差异

```bash
git diff branch1 branch2
```

### 查看日志

```bash
git log
```

查看branch1分支有，而branch2中没有的log

```bash
git log branch1 ^branch2
```

查看branch2中比branch1中多提交了哪些内容, 注意，列出来的是两个点后边（此处即dev）多提交的内容。

```bash
git log branch1..branch2
```

不知道谁提交的多谁提交的少，单纯想知道有什么不一样

```bash
git log branch1...branch2
```

在上述情况下，在显示出每个提交是在哪个分支上，注意 commit 后面的箭头，根据我们在 –left-right branch1…branch2
的顺序，左箭头 < 表示是 branch1 的，右箭头 > 表示是branch2的。

```bash
git log -lefg-right branch1...branch2
```

### 版本回退

```bash
git reset
```

第一种用法：回退到上一个版本（HEAD代表当前版本，有一个^代表上一个版本，以此类推）

```bash
git reset --hard HEAD^
```

第二种用法：回退到指定版本(其中d7b5是想回退的指定版本号的前几位)

```bash
git reset --hard d7b5
```

第三种用法：回退到当前最高版本

```bash
git reset --hard HEAD
```

### 查看命令历史

查看仓库的操作历史

```bash
git reflog
```

## 分支管理

### 查看分支

```bash
git branch
```

查看本地所有分支

```bash
git branch -a
```

查看远端详情

```bash
git remote show origin
```

分支跟踪信息

```bash
git branch -vv
```

### 创建分支

```bash
git branch 分支名
```

### 切换分支

```bash
git checkout 分支名
```

快速切换到上一个分支

```bash
git checkout @{-1}
```

快速切换到上一个分支简化写法

```bash
git checkout -
```

### 创建分支并切换到创建的分支

```bash
git checkout -b 分支名
```

### 合并某分支的内容到当前分支

```bash
git merge 分支名
```

合并时难免有冲突 #调用图形化工具解决冲突

```bash
git mergetool
```

### 删除分支

删除前检查merge状态（其与上游分支或者与head）

```bash
git branch -d 分支名
```

直接删除

```bash
git branch -D 分支名
```

### 查看分支合并图

```bash
git log --graph
```

## git远端库相关

### 添加远端仓库

```bash
git remote add origin git://127.0.0.1/abc.git
```

### 移除远端仓库

```bash
git remote remove origin移除远端仓库
```

### 将本地仓库内容推送到远端仓库

-u 表示第一次推送master分支的所有内容，后面再推送就不需要-u了,跟commit的区别在于一个是提交到本地仓库，一个是提交到远程仓库

```bash
git push -u origin master
```

### 从远端库更新内容到本地

取回远程仓库的变化，并与本地分支合并

```bash
git pull [remote] [branch]
```

git pull 命令用来更新代码，该命令相当于git fetch 和 git merge 的组合。

### 从远程仓库抓取数据

```bash
git fetch [remote-name]
```

fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支

### 别名

```bash
$ git config alias.st  "status"
```

.后面的字符，代表将来要简写的命令。双引号内的字符，代表着原来命令

# 检查配置信息

```bash
$ git config --list
```

可以通过输入 `git config`： 来检查 Git 的某一项配置

```bash
$ git config user.name
```

用vim编辑配置

```bash
$ git config –e
```

# 克隆现有的仓库

克隆仓库的命令是 `git clone` 。 比如，要克隆 Git 的链接库 `libgit2`，可以用下面的命令：

```bash
$ git clone https://github.com/libgit2/libgit2
```

这会在当前目录下创建一个名为 “libgit2” 的目录，并在这个目录下初始化一个 `.git` 文件夹，
从远程仓库拉取下所有数据放入 `.git` 文件夹，然后从中读取最新版本的文件的拷贝。 如果你进入到这个新建的 `libgit2`
文件夹，你会发现所有的项目文件已经在里面了，准备就绪等待后续的开发和使用。
如果你想在克隆远程仓库的时候，自定义本地仓库的名字，你可以通过额外的参数指定新的目录名：

```bash
$ git clone https://github.com/libgit2/libgit2 mylibgit
```

这会执行与上一条命令相同的操作，但目标目录名变为了 `mylibgit`。

# 检查当前文件状态

可以用 `git status` 命令查看哪些文件处于什么状态。 如果在克隆仓库后立即使用此命令，会看到类似这样的输出：

```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```

# 跟踪新文件

```bash
$ git add README
```

此时再运行 `git status` 命令，会看到 `README` 文件已被跟踪，并处于暂存状态：

```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
(use "git restore --staged <file>..." to unstage)

    new file:   README
```

只要在 `Changes to be committed` 这行下面的，就说明是已暂存状态。 如果此时提交，那么该文件在你运行 `git add`
时的版本将被留存在后续的历史记录中。 你可能会想起之前我们使用 `git init` 后就运行了 `git add`
命令，开始跟踪当前目录下的文件。 `git add` 命令使用文件或目录的路径作为参数；如果参数是目录的路径，该命令将递归地跟踪该目录下的所有文件。

# 暂存已修改的文件

现在我们来修改一个已被跟踪的文件。 如果你修改了一个名为 `CONTRIBUTING.md` 的已被跟踪的文件，然后运行 `git status`
命令，会看到下面内容：

```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)

new file:   README

Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```

文件 `CONTRIBUTING.md` 出现在 `Changes not staged for commit` 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。
要暂存这次更新，需要运行 `git add` 命令。 这是个多功能命令：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等。
将这个命令理解为“精确地将内容添加到下一次提交中”而不是“将一个文件添加到项目中”要更加合适。 现在让我们运行 `git add`
将“CONTRIBUTING.md”放到暂存区，然后再看看 `git status` 的输出：

```bash
$ git add CONTRIBUTING.md
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)

new file:   README
    modified:   CONTRIBUTING.md
```

现在两个文件都已暂存，下次提交时就会一并记录到仓库。 假设此时，你想要在 `CONTRIBUTING.md` 里再加条注释。 重新编辑存盘后，准备好提交。
不过且慢，再运行 `git status` 看看：

```bash
$ vim CONTRIBUTING.md
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)

new file:   README
modified:   CONTRIBUTING.md

Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```

怎么回事？ 现在 `CONTRIBUTING.md` 文件同时出现在暂存区和非暂存区。 这怎么可能呢？ 好吧，实际上 Git
只不过暂存了你运行 `git add` 命令时的版本。 如果你现在提交，`CONTRIBUTING.md` 的版本是你最后一次运行 `git add`
命令时的那个版本，而不是你运行 `git commit` 时，在工作目录中的当前版本。 所以，运行了 `git add`
之后又作了修订的文件，需要重新运行 `git add` 把最新版本重新暂存起来：

```bash
$ git add CONTRIBUTING.md
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)

new file:   README
    modified:   CONTRIBUTING.md
```

# 忽略文件

`.gitignore` 文件的例子：

```properties
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

# 提交更新

现在的暂存区已经准备就绪，可以提交了。 在此之前，请务必确认还有什么已修改或新建的文件还没有 `git add` 过，
否则提交的时候不会记录这些尚未暂存的变化。 这些已修改但未暂存的文件只会保留在本地磁盘。
所以，每次准备提交前，先用 `git status` 看下，你所需要的文件是不是都已暂存起来了， 然后再运行提交命令 `git commit`：

```bash
$ git commit
```

这样会启动你选择的文本编辑器来输入提交说明。
也可以在 `commit` 命令后添加 `-m` 选项，将提交信息与命令放在同一行，如下所示：

```bash
$ git commit -m "Story 182: Fix benchmarks for speed"
```

# 跳过使用暂存区域

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。 Git 提供了一个跳过使用暂存区域的方式，
只要在提交的时候，给 `git commit` 加上 `-a` 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add`
步骤：

```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md

no changes added to commit (use "git add" and/or "git commit -a")
$ git commit -a -m 'added new benchmarks'
[master 83e38c7] added new benchmarks
 1 file changed, 5 insertions(+), 0 deletions(-)
```

# 移除文件

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。 可以用 `git rm`
命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。
如果只是简单地从工作目录中手工删除文件，运行 `git status` 时就会在 “Changes not staged for commit” 部分（也就是
_未暂存清单_）看到：

```bash
$ rm PROJECTS.md
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
(use "git add/rm <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working directory)

deleted:    PROJECTS.md

no changes added to commit (use "git add" and/or "git commit -a")
```

然后再运行 `git rm` 记录此次移除文件的操作：

```bash
$ git rm PROJECTS.md
rm 'PROJECTS.md'
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)

    deleted:    PROJECTS.md
```

下一次提交时，该文件就不再纳入版本管理了。 如果要删除之前修改过或已经放到暂存区的文件，则必须使用强制删除选项 `-f`（译注：即
force 的首字母）。 这是一种安全特性，用于防止误删尚未添加到快照的数据，这样的数据不能被 Git 恢复。
另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。 换句话说，你想让文件保留在磁盘，但是并不想让
Git 继续跟踪。 当你忘记添加 `.gitignore` 文件，不小心把一个很大的日志文件或一堆 `.a` 这样的编译生成文件添加到暂存区时，这一做法尤其有用。
为达到这一目的，使用 `--cached` 选项：

```bash
$ git rm --cached README
```

`git rm` 命令后面可以列出文件或者目录的名字，也可以使用 `glob` 模式。比如：

```bash
$ git rm log/\*.log
```

注意到星号 `*` 之前的反斜杠 `\`， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。
此命令删除 `log/` 目录下扩展名为 `.log` 的所有文件。 类似的比如：

```bash
$ git rm \*~
```

该命令会删除所有名字以 `~` 结尾的文件。

# 修改密码凭证

查看当前用户名、邮箱、密码

```shell
git config user.name
git config user.email
git config user.password
```

修改用户名、邮箱、密码方式

```bash
git config --global user.name "xxx(新的用户名)"
git config --global user.email "123456@163.com(新的邮箱)"
git config --global user.password "123456(新的密码)"
```

# 移动文件

不像其它的 VCS 系统，Git 并不显式跟踪文件移动操作。 如果在 Git 中重命名了某个文件，仓库中存储的元数据并不会体现出这是一次改名操作。
不过 Git 非常聪明，它会推断出究竟发生了什么，至于具体是如何做到的，我们稍后再谈。
既然如此，当你看到 Git 的 `mv` 命令时一定会困惑不已。 要在 Git 中对文件改名，可以这么做：

```bash
$ git mv file_from file_to
```

它会恰如预期般正常工作。 实际上，即便此时查看状态信息，也会明白无误地看到关于重命名操作的说明：

```bash
$ git mv README.md README
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README
```

其实，运行 `git mv` 就相当于运行了下面三条命令：

```bash
$ mv README.md README
$ git rm README.md
$ git add README
```

如此分开操作，Git 也会意识到这是一次重命名，所以不管何种方式结果都一样。 两者唯一的区别是，`mv`
是一条命令而非三条命令，直接用 `git mv` 方便得多。 不过有时候用其他工具批处理重命名的话，要记得在提交前删除旧的文件名，再添加新的文件名。

# 版本

```bash
git --version
```

# 升级

```bash
git update-git-for-windows
```

# 本地项目上传至gitee仓库

```bash
// 初始化git
git init

// 将本地代码库与远程代码库相关联
git remote add origin https://gitee.com/ln_mars/spring-boot-mars

git add -A
git pull
git pull origin master
```

# 尚未推送到远程的提交

**git cherry 找到本地提交列表中,尚未推送到远程的提交**

## 1. 没有参数的情况

`git cherry` 默认比较HEAD本地分支和远程分支, 即当前分支和当前分支追踪的远程分支
如果存在差异,比较结果如下

```bash
+ 717cbc128c0e640f4f93ca8ad1118bd7f79ac728
+ f92324d7c3f3a47afbbb4c3877b323320d2871d4
+ edfaaede19bd2929b10505291266c772e9d1c934
+ fa3100796735f970f6fb94d828a3e463fe5c6731
+ be947b5a36a2102cea16c816b3b8fc8a2134ca63
+ 31bb0cf8f7131be927cb023d31ee16dcd0639060
+ c94061ea1ac16ebfe8e6388cb351a4c9329965d1
```

`git cherry -v` 可以展示出提交的注释信息

```bash
+ 717cbc128c0e640f4f93ca8ad1118bd7f79ac728 由于适应前端解析问题,返回一个string类型的userId
+ f92324d7c3f3a47afbbb4c3877b323320d2871d4 返回签到记录
+ edfaaede19bd2929b10505291266c772e9d1c934 读取plist配置获取默认背景逻辑编码
+ fa3100796735f970f6fb94d828a3e463fe5c6731 读取plist配置获取默认背景逻辑编码
+ be947b5a36a2102cea16c816b3b8fc8a2134ca63 harvest之后返回decoration;重命名;
+ 31bb0cf8f7131be927cb023d31ee16dcd0639060 读取plist配置获取默认背景逻辑编码
+ c94061ea1ac16ebfe8e6388cb351a4c9329965d1 等级自动判断
```

## 2. 一个参数的情况

`git cherry -v origin/master`可以比较本地HEAD分支和远程master分支之间的差别

```bash
+ 1f05a74c9a92e0faf5da96b17a7a15aa6c6e26e7 修复update的SQL错误
+ ad78159f828a148c3d1581b44e2b32cb45464031 修复SQL错误
+ 9d8a7471fb9408d7738b3a43f4f56a159619bfb0 增加逻辑:每次修改周期，保存一次未来提醒记录
+ d618e16338d354830cb2ff2a0208d1502e705941 修复设置以前的日期时候可能导致的数组越界BUG
+ 21d980972e6bcd73270d31b08852a6f62e72465c 预置推送消息增加推送人ID
+ 741c64ef5f396dee29972e8f0684892b373f6aa7 修复SQL错误
```

`git cherry -v origin/master`
可以比较本地HEAD分支和远程master分支之间的差别,等同于`git cherry -v origin/master HEAD`
`git cherry -v master`
可以比较本地HEAD分支和本地master分支之间的差别,等同于`git cherry -v master HEAD`

## 3. 两个参数的情况

`git cherry -v origin/master asa`
比较本地的asa分支和远程master的差别
`git cherry -v master asa`
比较本地asa分支和本地master分支之间的差别
`git cherry -v origin/master origin/asa`
比较远程asa分支和远程master的差别
`git cherry -v master origin/asa`
比较远程asa分支和本地master的差别。

# gitlab fork项目更新

1. 查看目前仓库可以远程更新的信息

```bash
git remote -v
```

2. 配置一个远程更新链接，要拥有git仓库访问权限的

```bash
git remote add upstream git@github.com:xxx/xxx.git
```

3. 拉取远程仓库的代码

```bash
git fetch upstream
```

4. 合并远程仓库的代码

```bash
git merge upstream/master
```

5. 把远程仓库的代码作为新源提交到自己的服务器仓库中

```bash
git push
```

# 常见问题

## 切换分支时报错： error: cannot stat ‘file’: Permission denied

```bash
$ git checkout f-wangxiaoquan-uiDev
error: cannot stat 'src/modules/mbs/baseinfo/empmgt/emp-insu-reg': Permission denied
error: cannot stat 'src/modules/mbs/baseinfo/empmgt/emp-insu-reg': Permission denied
error: cannot stat 'src/modules/mbs/baseinfo/empmgt/emp-insu-reg': Permission denied
```

error: cannot stat ‘file’: Permission denied
解决方法：退出编辑器、浏览器、资源管理器等，然后再切换就可以了。

## 解决冲突

1.退出合并状态

```bash
git merge --abort
```

2.本地解决冲突
查看本地状态可以看到哪些文件需要处理

```bash
git status
```

3.将解决冲突的文件添加到本地暂存区

```bash
git add filename

git commit -m ”冲突“
```

## git 撤销已经push的记录

1.查看log

```bash
git log
```

2.回退本地

```bash
git reset id
```

3.强行推到远程仓库

```bash
git push -f
```

## .gitignore文件并不生效

```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

## git撤销commit

修改了本地的代码，然后使用：

```bash
git add file
git commit -m '修改原因'
```

执行commit后，还没执行push时，想要撤销这次的commit，该怎么办？

```bash
git reset --soft HEAD^
```

这样就成功撤销了commit，如果想要连着add也撤销的话，–soft改为–hard（删除工作空间的改动代码）
命令详解：
HEAD^ 表示上一个版本，即上一次的commit，也可以写成HEAD~1
如果进行两次的commit，想要都撤回，可以使用HEAD~2
–soft
不删除工作空间的改动代码 ，撤销commit，不撤销git add file
–hard
删除工作空间的改动代码，撤销commit且撤销add

## commit注释修改

```bash
git commit --amend
```

这时候会进入vim编辑器，修改完成你要的注释后保存即可。

## git SSL certificate problem: unable to get local issuer certificate

原因：由于没有配置信任的服务器HTTPS验证。默认，cURL被设为不信任任何CAs，就是说，它不信任任何服务器验证
解决：
影响范围是系统当前用户

```bash
git config --global http.sslVerify false
```

全局所有用户

```bash
git config --system http.sslverify false
```

当前仓库

```bash
git config http.sslverify false
```

## TLS certificate verification has been disabled!

原因：缺少了安全认证
解决：`git bash`下执行

```bash
git config --global http.sslVerify true
```

## git add回退

```bash
#首先看看哪些文件加进去了  
git status

#回退git add所有文件  
git reset HEAD

#回退部分文件
git reset HEAD file
```

## remote: The project you were looking for could not be found

解决：在自己的项目路径上加上自己的用户名。（输入密码后即拉取代码成功）

```bash
git clone http://用户名@125.01.02.03:10086/test/xiangmu.git
```
