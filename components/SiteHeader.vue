<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const mobileOpen = ref(false)

watch(() => route.fullPath, () => {
  mobileOpen.value = false
})

const links = computed(() => [
  { to: localePath('/features'), label: t('nav.features') },
  { to: localePath('/solutions'), label: t('nav.solutions') },
  { to: localePath('/pricing'), label: t('nav.pricing') },
  { to: localePath('/docs'), label: t('nav.docs') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/contact'), label: t('nav.contact') }
])
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink :to="localePath('/')" class="brand" aria-label="StreamHive home">
        <svg class="brand-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 2l12 7v14l-12 7-12-7V9l12-7z" stroke="var(--accent)" stroke-width="2" />
          <path d="M12 11l9 5-9 5V11z" fill="var(--accent)" />
        </svg>
        <span class="brand-name">Stream<b>Hive</b></span>
      </NuxtLink>

      <nav class="main-nav" aria-label="Main navigation">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <NuxtLink :to="localePath('/contact')" class="btn btn-primary btn-sm nav-cta">
          {{ t('nav.cta') }}
        </NuxtLink>
        <button
          class="menu-toggle"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path v-if="!mobileOpen" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="mobile-nav">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="mobile-link">
        {{ link.label }}
      </NuxtLink>
      <NuxtLink :to="localePath('/contact')" class="btn btn-primary mobile-cta">
        {{ t('nav.cta') }}
      </NuxtLink>
    </div>
  </header>
</template>