<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({ title: t('cookies.title') })

const sections = ['what', 'which', 'control']
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('cookies.title') }}</h1>
      <p>{{ t('cookies.updated') }}</p>
    </section>

    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="legal-content">
          <div v-for="key in sections" :key="key">
            <h2>{{ t(`cookies.sections.${key}.h`) }}</h2>
            <p>{{ t(`cookies.sections.${key}.p`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>