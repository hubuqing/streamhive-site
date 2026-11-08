<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: t('hero.title') })

const featureKeys = ['middleware', 'live', 'vod', 'epg', 'transcoding', 'drm']
const solutionKeys = [
  'hotels', 'airlines', 'hospitals', 'isps', 'cruise-ships',
  'buses', 'apartments', 'news-agencies', 'homes'
]

const stats = [
  { value: '4.2M', label: computed(() => t('hero.statSubscribers')) },
  { value: '18K+', label: computed(() => t('hero.statChannels')) },
  { value: '99.99%', label: computed(() => t('hero.statUptime')) },
  { value: '0.4s', label: computed(() => t('hero.statLatency')) }
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-inner">
        <span class="hero-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M13 2L3 14h7l-1 8 11-13h-8l1-7z" />
          </svg>
          {{ t('hero.badge') }}
        </span>
        <h1>
          {{ t('hero.title') }}<br>
          <span class="accent-text">{{ t('hero.titleAccent') }}</span>
        </h1>
        <p class="hero-sub">{{ t('hero.subtitle') }}</p>
        <div class="hero-actions">
          <NuxtLink :to="localePath('/contact')" class="btn btn-primary btn-lg">{{ t('hero.primary') }}</NuxtLink>
          <NuxtLink :to="localePath('/pricing')" class="btn btn-ghost btn-lg">{{ t('hero.secondary') }}</NuxtLink>
        </div>
        <div class="hero-stats">
          <div v-for="s in stats" :key="s.value" class="stat">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('home.featuresTitle') }}</h2>
          <p>{{ t('home.featuresSubtitle') }}</p>
        </div>
        <div class="grid-3">
          <div v-for="key in featureKeys" :key="key" class="card">
            <div class="card-icon"><AppIcon :name="key" /></div>
            <h3>{{ t(`features.list.${key}.title`) }}</h3>
            <p>{{ t(`features.list.${key}.text`) }}</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 36px">
          <NuxtLink :to="localePath('/features')" class="btn btn-ghost">{{ t('common.viewAll') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--bg-soft)">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('home.solutionsTitle') }}</h2>
          <p>{{ t('home.solutionsSubtitle') }}</p>
        </div>
        <div class="grid-3">
          <NuxtLink
            v-for="key in solutionKeys"
            :key="key"
            :to="localePath(`/solutions/${key}`)"
            class="card"
          >
            <div class="card-icon"><AppIcon :name="key" /></div>
            <h3>{{ t(`solutions.list.${key}.title`) }}</h3>
            <p>{{ t(`solutions.list.${key}.short`) }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>