<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: t('hero.title') })

const featureKeys = ['smarttv', 'casting', 'streaming', 'welcome', 'info', 'dining']
const solutionKeys = ['groups', 'independent', 'resorts', 'boutique', 'apartments', 'wellness']

const stats = [
  { value: '62K+', label: computed(() => t('hero.statRooms')) },
  { value: '34', label: computed(() => t('hero.statCountries')) },
  { value: '12', label: computed(() => t('hero.statLanguages')) },
  { value: '+27%', label: computed(() => t('hero.statRating')) }
]

const gains = [
  { key: 'upsell', icon: 'upsell' },
  { key: 'satisfaction', icon: 'welcome' },
  { key: 'staff', icon: 'cloud' }
]

const integrations = ['opera', 'mews', 'cloudbeds', 'samsung', 'lg', 'philips', 'stripe', 'salto']

const faqs = ['q1', 'q2', 'q3', 'q4']
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
          <NuxtLink :to="localePath('/features')" class="btn btn-ghost btn-lg">{{ t('hero.secondary') }}</NuxtLink>
        </div>
        <div class="hero-stats">
          <div v-for="s in stats" :key="s.value" class="stat">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding: 48px 0">
      <div class="container">
        <div class="trust-wall">
          <p class="trust-title">{{ t('home.trustTitle') }}</p>
          <div class="trust-brands">
            <span>Hôtel Lumière</span>
            <span>Azure Bay Resorts</span>
            <span>Nordic Stay</span>
            <span>Casa Verde</span>
            <span>The Harbour Line</span>
            <span>Park &amp; Pine</span>
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
          <NuxtLink :to="localePath('/features')" class="btn btn-ghost">{{ t('common.learnMore') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--bg-soft)">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('home.gainsTitle') }}</h2>
        </div>
        <div class="grid-3">
          <div v-for="gain in gains" :key="gain.key" class="card">
            <div class="card-icon"><AppIcon :name="gain.icon" /></div>
            <h3 class="gain-value">{{ t(`home.gain${gain.key.charAt(0).toUpperCase() + gain.key.slice(1)}Title`) }}</h3>
            <p>{{ t(`home.gain${gain.key.charAt(0).toUpperCase() + gain.key.slice(1)}Text`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
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
            <div class="card-icon"><AppIcon :name="key === 'groups' ? 'groups' : key === 'independent' ? 'hotels' : key === 'resorts' ? 'resorts' : key === 'boutique' ? 'boutique' : key === 'apartments' ? 'apartments' : 'wellness'" /></div>
            <h3>{{ t(`solutions.list.${key}.title`) }}</h3>
            <p>{{ t(`solutions.list.${key}.short`) }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--bg-soft)">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('home.integrationsTitle') }}</h2>
          <p>{{ t('home.integrationsSubtitle') }}</p>
        </div>
        <div class="integration-wall">
          <span v-for="name in integrations" :key="name" class="integration-chip">{{ name }}</span>
        </div>
        <div style="text-align: center; margin-top: 26px">
          <NuxtLink :to="localePath('/integrations')" class="btn btn-ghost">{{ t('common.learnMore') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 780px">
        <figure class="testimonial">
          <blockquote>“{{ t('home.testimonialQuote') }}”</blockquote>
          <figcaption>
            <strong>{{ t('home.testimonialName') }}</strong>
            <span>{{ t('home.testimonialRole') }}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="container" style="max-width: 780px">
        <div class="section-head" style="margin-bottom: 36px">
          <h2>{{ t('faq.title') }}</h2>
        </div>
        <details v-for="q in faqs" :key="q" class="faq-item">
          <summary>{{ t(`faq.${q}`) }}</summary>
          <div class="faq-body">{{ t(`faq.a${q.slice(1)}`) }}</div>
        </details>
      </div>
    </section>

    <CtaSection />
  </div>
</template>