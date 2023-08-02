
import { defineConfig } from "vitepress";
import { head, nav, sidebar } from './configs'

const themeConfig = {
  logo: '/apple-touch-icon.png',
  siteTitle: '完全沒有想法',
  
  nav,
  sidebar,

  // socialLinks: [
  //   { icon: 'github', link: 'https://github.com/gumingWu/vitepress-fun' }
  // ],
  footer: {
    copyright: 'MIT Lincensed | Copyright © 2023-present Eason',
  }
};

// markdown 配置
const markdown = {
  lineNumbers: true
}

export default defineConfig({
  base: '/totally-out-of-ideas/',
  lang: 'zh-TW',
  title: '完全沒有想法',
  description: '讀書會',
  head,
  themeConfig,
  markdown,
  vite: {
    server: {
      port: 8510
    }
  }
})