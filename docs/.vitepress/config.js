
import { defineConfig } from "vitepress";
import { head, nav, sidebar } from './configs'

export default defineConfig({
  base: '/totally-out-of-ideas/',
  lang: 'zh-TW',
  title: '完全沒有想法',
  description: '讀書會',
  themeConfig: {
    logo: '',
    siteTitle: '完全沒有想法',
    
    head,
    nav,
    sidebar,

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/gumingWu/vitepress-fun' }
    // ],
    markdown: {
      lineNumbers: true,    // 行號
    },
    footer: {
      copyright: 'MIT Lincensed | Copyright © 2023-present Eason',
    }
  },
  vite: {
    server: {
      port: 8510
    }
  }
})