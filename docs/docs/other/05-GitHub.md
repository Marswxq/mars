# GitHub

## 慢，习惯就好

使用 github 涉及到三个域名，github.com、 assets-cdn.github.com、 github.global.ssl.fastly.net

我的做法是上网找一个域名对应 ip 查询的网站，然后分别查询3个域名对应的 ip 列表，然后在列表中找到能够 ping 通的 ip，配置到 hosts 中。

```
20.205.243.166 github.com
185.199.109.153 assets-cdn.github.com
151.101.1.194 github.global.ssl.fastly.net
```

## Github Pages

> Gitee Pages 暂停服务后，Vuepress 文档没法使用了，只能含泪转移到 GitHub

折腾了很久，最后看到一个帖子，大概意思是，需要在本地把编译后的 dist 内容推送到 `gh-pages` 分支。

Tips:~~~人间清醒啊，使用 git bash 执行

```shell
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误

set -e

# 生成静态文件

npm run docs:build

# 进入生成的文件夹

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'init:blog'

git push -f https://github.com/Marswxq/mars.git master:gh-pages

cd -
```
