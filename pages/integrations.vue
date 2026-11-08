<script setup lang="ts">
const { t } = useI18n()

usePageSeo('integrations', t('integrations.title'))

const sections = [
  { key: 'pms', icon: 'cloud', partners: ['Oracle Hospitality', 'Mews', 'Cloudbeds', 'Apaleo'] },
  { key: 'locks', icon: 'security', partners: ['Salto', 'VDA', 'Dormakaba'] },
  { key: 'payments', icon: 'upsell', partners: ['Stripe', 'Adyen', 'SumUp'] },
  { key: 'hardware', icon: 'tv', partners: ['Samsung', 'LG', 'Philips'] }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('integrations.title') }}</h1>
      <p>{{ t('integrations.subtitle') }}</p>
      <div class="page-hero-visual">
        <div class="media-frame">
          <img
            src="/images/banner-integrations.webp"
            :alt="t('media.alt.integrations')"
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
          <div v-for="s in sections" :key="s.key" class="card">
            <div class="card-icon"><AppIcon :name="s.icon" /></div>
            <h3>{{ t(`integrations.${s.key}Title`) }}</h3>
            <p>{{ t(`integrations.${s.key}Text`) }}</p>
            <div class="partner-chips">
              <span v-for="p in s.partners" :key="p" class="integration-chip">{{ p }}</span>
            </div>
          </div>
        </div>
        <p style="text-align: center; color: var(--text-3); margin-top: 30px; font-size: 0.95rem">
          {{ t('integrations.ecosystem') }}
        </p>
      </div>
    </section>

    <CtaSection />
  </div>
</template>