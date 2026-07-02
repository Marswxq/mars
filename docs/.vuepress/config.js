import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import fs from "fs";
// 获取该文件夹下的所有文件名
const getFileNames = (parentFileName) => {
    const results = []
    const files = fs.readdirSync(`./docs/docs${parentFileName}`)
    files.forEach((val) => {
        if ('README.md'.includes(val)) {
            // results.push('')
        } else {
            if (val.endsWith(".md")) {
                let menu = {
                    text: val.substring(0, val.length - 3),
                    link: `/docs${parentFileName}` + val,
                    collapsible: false
                }
                results.push(menu)
            }
        }
    })
    // console.log(results)
    return results
}

// 资源列表
const java = {
    text: '🍵Java',
    //可折叠侧边栏
    collapsible: false,
    expanded: true,
    children: getFileNames('/java/')
};
const jasper = {
    text: '📊JasperReport',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/jasper/')
};
const database = {
    text: "📈数据库",
    collapsible: false,
    children: getFileNames("/database/")

};
const kettle = {
    text: '📉Kettle',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/kettle/')
};
const activiti = {
    text: '🍻Activiti',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/activiti/')
};
const javascript = {
    text: '🎬JavaScript',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/javascript/')
};
const linux = {
    text: '💻Linux',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/linux/')
}
const docker = {
    text: '🐋Docker',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/docker/')
};
const nginx = {
    text: '🌐Nginx',
    collapsible: false,
    children: getFileNames('/nginx/')
}

const maven = {
    text: '📝Maven',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/maven/')
}
const git = {
    text: '🎨Git',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/git/')
}
const jenkins = {
    text: '🎯Jenkins',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/jenkins/')
}

const raspi = {
    text: '🍓树莓派',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/raspberry/')
}

const md = {
    text: '📘Markdown',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/markdown/')
}

const other = {
    text: '📇其他',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/other/')
}

// 菜单
const home = {
    text: '🏠主页',
    link: '/',
    // // 该元素将一直处于激活状态
    // activeMatch: '/',
};
const technology = {
    text: '🏫技术相关',
    //可折叠侧边栏
    collapsible: false,
    children: [ activiti, jasper, javascript, java ]
}
const service = {
    text: '🏢服务器',
    //可折叠侧边栏
    collapsible: false,
    children: [ linux, docker, nginx ]
}
const data = {
    text: '🏩数据相关',
    //可折叠侧边栏
    collapsible: false,
    children: [ database, kettle ]
};
const manager = {
    text: '🏬管理工具',
    //可折叠侧边栏
    collapsible: false,
    children: [ git, maven, jenkins ]
}
const book = {
    text: '🏯书籍笔记',
    //可折叠侧边栏
    collapsible: false,
    children: getFileNames('/book/')
}
const others = {
    text: '🏦其他',
    //可折叠侧边栏
    collapsible: false,
    children: [ raspi, md, other ]
}
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Mars‘s doc',
    description: '丰碑无语，行胜于言',
    // 仓库名称
    base: '/mars/',
    head: [
        // 设置 favor.ico，.vuepress/public 下
        [
            'link', { rel: 'icon', href: '/images/mars_header.png' }
        ]
    ],
    markdown: {
        code: {
            lineNumbers: true, // 显示代码行号
        },
    },
    theme: defaultTheme({
        logo: './images/mars_blue.png',
        repo: "https://github.com/Marswxq/mars",
        sidebarDepth: 3,
        // 左侧导航
        sidebar: [ technology, service, data, manager, book, others ],
        // 头部导航栏
        navbar: [ home, technology, service, data, manager, book, others ],
        lastUpdated: true,
        // 默认值：false
        displayAllHeaders: true,

        // 添加以下配置来修复 Edit this page 链接
        docsDir: 'docs', // 文档所在的目录，相对于仓库根目录
        docsBranch: 'main', // 文档所在的分支，根据你的实际情况修改
        editLink: true, // 启用编辑链接
        editLinkText: '编辑此页面', // 自定义链接文本
        lastUpdatedText: '上次更新'
    }),

    plugins: [
        searchPlugin({
            locales: {
                '/': {
                    placeholder: 'Search',
                },
                '/zh/': {
                    placeholder: '搜索',
                },
            },
            // 排除首页
            isSearchable: (page) => page.path !== '/',
            // 允许搜索 Frontmatter 中的 `tags`
            getExtraFields: (page) => page.frontmatter.tags ?? [],
            // 快捷键
            hotKeys: [ 's', '/' ],
            // 搜索最大条数
            maxSuggestions: 10,
        })
    ],

    bundler: viteBundler()
})

