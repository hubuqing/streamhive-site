<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: t('solutions.title') })

const solutionKeys = ['groups', 'independent', 'resorts', 'boutique', 'apartments', 'wellness']
const iconMap: Record<string, string> = {
  groups: 'groups',
  independent: 'hotels',
  resorts: 'resorts',
  boutique: 'boutique',
  apartments: 'apartments',
  wellness: 'wellness'
}
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('solutions.title') }}</h1>
      <p>{{ t('solutions.subtitle') }}</p>
      <div class="page-hero-visual">
        <div class="media-frame">
          <img
            src="/images/banner-solutions.webp"
            :alt="t('media.alt.solutions')"
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
        <div class="grid-3">
          <NuxtLink
            v-for="key in solutionKeys"
            :key="key"
            :to="localePath(`/solutions/${key}`)"
            class="card"
          >
            <div class="card-icon"><AppIcon :name="iconMap[key]" /></div>
            <h3>{{ t(`solutions.list.${key}.title`) }}</h3>
            <p>{{ t(`solutions.list.${key}.short`) }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>