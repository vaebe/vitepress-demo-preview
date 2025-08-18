import DefaultTheme from 'vitepress/theme'
import DemoPreview from '../components/DemoPreview.vue'
import { EnhanceAppContext } from 'vitepress'

export default {
  ...DefaultTheme,
  enhanceApp(ctx:EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx)

    ctx.app.component('DemoPreview', DemoPreview)
  }
}