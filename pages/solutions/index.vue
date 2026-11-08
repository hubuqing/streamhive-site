<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: t('solutions.title') })

const solutionKeys = [
  'hotels', 'airlines', 'hospitals', 'isps', 'cruise-ships',
  'buses', 'apartments', 'news-agencies', 'homes'
]
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('solutions.title') }}</h1>
      <p>{{ t('solutions.subtitle') }}</p>
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