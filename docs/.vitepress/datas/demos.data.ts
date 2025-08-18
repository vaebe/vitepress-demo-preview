import fs from 'node:fs'
import path from 'node:path'
import { defineLoader } from 'vitepress'

type Data = Record<string, string>
declare const data: Data
export { data }

export default defineLoader({
  watch: '../demos/*.vue',
  async load(files) {
    const data:Data = {}
    for (const file of files) {
      const fileName = path.basename(file)
      const content = fs.readFileSync(file, 'utf-8')
      data[fileName] = content
    }
    return data
  }
})