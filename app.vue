<script setup lang="ts">
const { mode, accent, toggleMode, setAccent } = useTheme()
const i18nHead = useLocaleHead({ dir: true, seo: true })

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang || 'en',
    dir: i18nHead.value.htmlAttrs?.dir || 'ltr',
    'data-theme': mode.value,
    'data-accent': accent.value
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
}))
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="app-main">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>