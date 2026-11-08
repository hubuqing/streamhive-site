<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locales } = useI18n()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="brand">
          <svg class="brand-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 2l12 7v14l-12 7-12-7V9l12-7z" stroke="var(--accent)" stroke-width="2" />
            <path d="M12 11l9 5-9 5V11z" fill="var(--accent)" />
          </svg>
          <span class="brand-name">Stream<b>Hive</b></span>
        </div>
        <p class="footer-tagline">{{ t('footer.tagline') }}</p>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.product') }}</h4>
        <NuxtLink :to="localePath('/features')">{{ t('nav.features') }}</NuxtLink>
        <NuxtLink :to="localePath('/solutions')">{{ t('nav.solutions') }}</NuxtLink>
        <NuxtLink :to="localePath('/pricing')">{{ t('nav.pricing') }}</NuxtLink>
        <NuxtLink :to="localePath('/docs')">{{ t('nav.docs') }}</NuxtLink>
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
      <span>© {{ year }} StreamHive Labs Ltd. {{ t('footer.rights') }}</span>
      <div class="footer-legal">
        <NuxtLink :to="localePath('/terms-of-service')">{{ t('footer.terms') }}</NuxtLink>
        <NuxtLink :to="localePath('/cookie-policy')">{{ t('footer.cookies') }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>