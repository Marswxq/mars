import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        // 使用 Element Plus
        app.use(ElementPlus)

        // 你还可以在这里注册全局组件
        // app.component('MyComponent', MyComponent)
    },

    setup() {
        // 这里可以使用 Composition API
        // 例如：import { ref } from 'vue'
    },

    rootComponents: [
        // 这里可以添加全局组件，如弹窗、通知等
    ],
})