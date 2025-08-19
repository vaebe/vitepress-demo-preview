import { defineConfig } from 'vitepress'

export default async () => {
  const mode = process.env.NODE_ENV
  const basePath = '/'

  return defineConfig({
    base: basePath,
    title: "vitepress demo preview",
    description: "vitepress demo 展示测试",
    lastUpdated: true,
    themeConfig: {
      socialLinks: [
        { icon: 'github', link: 'https://github.com/vaebe/vitepress-demo-preview' }
      ],
      outlineTitle: '快速前往',
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2025-present vaebe',
      },
    },
    appearance: true,
  })
}


