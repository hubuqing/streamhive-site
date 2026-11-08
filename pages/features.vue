<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({ title: t('features.title') })

const featureKeys = [
  'middleware', 'live', 'vod', 'epg', 'transcoding', 'drm',
  'billing', 'resellers', 'analytics', 'clients', 'api', 'security'
]
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('features.title') }}</h1>
      <p>{{ t('features.subtitle') }}</p>
    </section>

    <section class="section" style="padding-top: 24px">
      <div class="container">
        <div class="grid-3">
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