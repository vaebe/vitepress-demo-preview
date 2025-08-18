<script setup lang="ts">
import { ref, defineAsyncComponent, Component } from 'vue'
import { data, data as demosData } from '../datas/demos.data'
import { defineClientComponent } from 'vitepress'
import { codeToHtml } from 'shiki'

const { src, isClient = false } = defineProps<{ src: string, isClient?: Boolean }>()

const componentModules = import.meta.glob('../demos/*.vue', { eager: false })

const sourceCode = demosData[src] || ''

const loader = componentModules[`../demos/${src}`] as () => Promise<{ default: Component }>

const Demo = isClient
  ? defineClientComponent(loader)
  : defineAsyncComponent(loader)

const codeHtml = ref('')
codeToHtml(sourceCode, {
  lang: 'vue',
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  }
}).then((res: string) => {
  codeHtml.value = res
})

// 展开/收起功能
const isExpanded = ref(false)
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 复制功能
const copyStatus = ref('') // '' | 'success' | 'error'
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(sourceCode)
    copyStatus.value = 'success'
    setTimeout(() => {
      copyStatus.value = ''
    }, 2000)
  } catch (err) {
    copyStatus.value = 'error'
    console.error('Failed to copy: ', err)
    setTimeout(() => {
      copyStatus.value = ''
    }, 2000)
  }
}
</script>

<template>
  <div class="demo-preview">
    <div class="demo-render">
      <Demo></Demo>
    </div>

    <div class="demo-actions">
      <button @click="toggleExpand" class="action-button">
        {{ isExpanded ? '收起代码' : '展开代码' }}
      </button>
      <button @click="copyCode" class="action-button copy-button"
        :class="{ success: copyStatus === 'success', error: copyStatus === 'error' }">
        {{ copyStatus === 'success' ? '已复制' : copyStatus === 'error' ? '复制失败' : '复制代码' }}
      </button>
    </div>

    <transition name="slide">
      <div class="demo-source">
        <div v-show="isExpanded" v-html="codeHtml"></div>
      </div>
    </transition>
  </div>
</template>

<style>
html.dark .demo-preview .shiki,
html.dark .demo-preview .shiki span {
  color: var(--shiki-dark) !important;
  background: var(--shiki-dark-bg) !important;
  /* 可选，如果你还希望同步字体样式 */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

.demo-preview {
  border: 1px solid var(--vp-code-copy-code-border-color);
  border-radius: 4px;
  overflow: hidden;
}

.demo-render {
  padding: 8px;
}

.demo-actions {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  background: var(--vp-code-block-bg);
}

.action-button {
  margin-left: 8px;
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 4px;
  background: var(--vp-code-copy-code-bg);
  cursor: pointer;
  transition: all 0.3s;
  color: var(--vp-code-copy-code-active-text);
}

.action-button:hover {
  background: var(--vp-code-copy-code-hover-bg);
}

.copy-button.success {
  background: var(--vp-button-brand-bg);
  color: white;
  border-color: var(--vp-button-brand-bg);
}

.copy-button.error {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.demo-source {
  font-size: var(--vp-code-font-size);
  line-height: var(--vp-code-line-height);
  overflow: scroll;
}

.demo-source pre {
  margin: 0;
  padding: 8px 28px !important;
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>