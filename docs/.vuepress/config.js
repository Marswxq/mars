import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {searchPlugin} from '@vuepress/plugin-search'
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
                    collapsible: true
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
    collapsible: true,
    expanded: true,
    children: getFileNames('/java/')
};
const jasper = {
    text: '📊JasperReport',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/jasper/')
};
const database = {
    text: "📈数据库",
    collapsible: true,
    children: getFileNames("/database/")

};
const kettle = {
    text: '📉Kettle',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/kettle/')
};
const activiti = {
    text: '🍻Activiti',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/activiti/')
};
const javascript = {
    text: '🎬JavaScript',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/javascript/')
};
const linux = {
    text: '💻Linux',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/linux/')
}
const docker = {
    text: '🐋Docker',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/docker/')
};
const nginx = {
    text: '🌐Nginx',
    collapsible: true,
    children: getFileNames('/nginx/')
}

const maven = {
    text: '📝Maven',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/maven/')
}
const git = {
    text: '🎨Git',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/git/')
}
const jenkins = {
    text: '🎯Jenkins',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/jenkins/')
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
    collapsible: true,
    children: [activiti, jasper, javascript, java]
}
const service = {
    text: '🏢服务器',
    //可折叠侧边栏
    collapsible: true,
    children: [linux, docker, nginx]
}
const data = {
    text: '🏩数据相关',
    //可折叠侧边栏
    collapsible: true,
    children: [database, kettle]
};
const manager = {
    text: '🏬管理工具',
    //可折叠侧边栏
    collapsible: true,
    children: [git, maven, jenkins]
}
const book = {
    text: '🏯书籍笔记',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/book/')
}
const other = {
    text: '🏦其他',
    //可折叠侧边栏
    collapsible: true,
    children: getFileNames('/other/')
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
            'link', {rel: 'icon', href: '/images/mars_header.png'}
        ]
    ],
    theme: defaultTheme({
        logo: './images/mars_blue.png',
        repo: "https://github.com/Marswxq/mars",
        sidebarDepth: 3,
        // 左侧导航
        sidebar: [technology, service, data, manager, book, other],
        // 头部导航栏
        navbar: [home, technology, service, data, manager, book, other],
        lastUpdated: true,
        // 默认值：false
        displayAllHeaders: true
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
            hotKeys: ['s', '/'],
            // 搜索最大条数
            maxSuggestions: 10,
        })
    ],

    bundler: viteBundler(),
})

