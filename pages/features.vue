<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({ title: t('features.title') })

const featureKeys = [
  'smarttv', 'casting', 'streaming', 'welcome', 'info',
  'dining', 'upsell', 'multilang', 'cloud', 'analytics'
]
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('features.title') }}</h1>
      <p>{{ t('features.subtitle') }}</p>
      <div class="page-hero-visual">
        <div class="media-frame">
          <img
            src="/images/banner-features.webp"
            :alt="t('media.alt.features')"
            width="2048"
            height="1024"
            loading="lazy"
            decoding="async"
          >
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 24px">
      <div class="container">
        <div class="grid-2">
          <div v-for="key in featureKeys" :key="key" class="card">
            <div class="card-icon"><AppIcon :name="key" /></div>
            <h3>{{ t(`features.list.${key}.title`) }}</h3>
            <p>{{ t(`features.list.${key}.text`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>