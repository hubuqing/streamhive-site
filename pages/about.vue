<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({ title: t('about.title') })

const valueKeys = ['operators', 'honest', 'openness']
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('about.title') }}</h1>
      <p>{{ t('about.subtitle') }}</p>
    </section>

    <section class="section" style="padding-top: 24px">
      <div class="container" style="max-width: 820px">
        <div class="card" style="padding: 36px">
          <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 14px">
            {{ t('about.storyTitle') }}
          </h2>
          <p style="color: var(--text-2)">
            {{ t('about.story') }}
          </p>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="container">
        <div class="section-head">
          <h2>{{ t('about.valuesTitle') }}</h2>
        </div>
        <div class="grid-3">
          <div v-for="key in valueKeys" :key="key" class="card">
            <div class="card-icon"><AppIcon name="rocket" /></div>
            <h3>{{ t(`about.values.${key}.title`) }}</h3>
            <p>{{ t(`about.values.${key}.text`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>