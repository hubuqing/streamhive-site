<script setup lang="ts">
const { t, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="brand">
          <svg class="brand-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="4" y="7" width="24" height="16" rx="3" stroke="var(--accent)" stroke-width="2" />
            <path d="M12 12.5l6 3.5-6 3.5v-7z" fill="var(--accent)" />
            <path d="M4 26h7M21 26h7" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" />
          </svg>
          <span class="brand-name">Su<b>min</b></span>
        </div>
        <p class="footer-tagline">{{ t('footer.tagline') }}</p>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.product') }}</h4>
        <NuxtLink :to="localePath('/features')">{{ t('nav.features') }}</NuxtLink>
        <NuxtLink :to="localePath('/solutions')">{{ t('nav.solutions') }}</NuxtLink>
        <NuxtLink :to="localePath('/integrations')">{{ t('nav.integrations') }}</NuxtLink>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.company') }}</h4>
        <NuxtLink :to="localePath('/about')">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')">{{ t('nav.contact') }}</NuxtLink>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.language') }}</h4>
        <NuxtLink
          v-for="l in locales"
          :key="l.code"
          :to="switchLocalePath(l.code)"
          class="footer-lang"
          :class="{ active: l.code === $i18n.locale }"
        >
          {{ l.name }}
        </NuxtLink>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© {{ year }} {{ t('footer.legalName') }} {{ t('footer.rights') }}</span>
      <div class="footer-legal">
        <NuxtLink :to="localePath('/terms-of-service')">{{ t('footer.terms') }}</NuxtLink>
        <NuxtLink :to="localePath('/cookie-policy')">{{ t('footer.cookies') }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>