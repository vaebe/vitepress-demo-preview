import fs from 'node:fs'
import path from 'node:path'
import { defineLoader } from 'vitepress'
import { codeToHtml } from 'shiki'

type Data = Record<string, string>
declare const data: Data
export { data }

export default defineLoader({
  watch: '../demos/*.vue',
  async load(files) {
    const data: Data = {}
    for (const file of files) {
      const fileName = path.basename(file)
      const content = fs.readFileSync(file, 'utf-8')

      // 这里预生成源码高亮后的代码
      data[fileName] = await codeToHtml(content, {
        lang: 'vue',
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        }
      })
    }
    return data
  }
})