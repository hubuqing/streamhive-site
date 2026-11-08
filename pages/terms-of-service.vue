<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({ title: t('terms.title') })

const sections = ['intro', 'service', 'accounts', 'billing']
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('terms.title') }}</h1>
      <p>{{ t('terms.updated') }}</p>
    </section>

    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="legal-content">
          <div v-for="key in sections" :key="key">
            <h2>{{ t(`terms.sections.${key}.h`) }}</h2>
            <p>{{ t(`terms.sections.${key}.p`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>