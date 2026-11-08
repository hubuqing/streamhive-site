<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const detailsEl = ref<HTMLDetailsElement | null>(null)

const availableLocales = computed(() => locales.value)

const onClickOutside = (e: MouseEvent) => {
  if (detailsEl.value && !detailsEl.value.contains(e.target as Node)) {
    detailsEl.value.removeAttribute('open')
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <details ref="detailsEl" class="lang-switcher">
    <summary class="lang-current" :aria-label="$t('common.changeLanguage')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
      </svg>
      <span>{{ locale.toUpperCase() }}</span>
      <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </summary>
    <ul class="lang-menu">
      <li v-for="l in availableLocales" :key="l.code">
        <NuxtLink :to="switchLocalePath(l.code)" class="lang-option" :class="{ active: l.code === locale }">
          {{ l.name }}
        </NuxtLink>
      </li>
    </ul>
  </details>
</template>