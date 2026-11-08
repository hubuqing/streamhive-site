<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: t('docs.title') })

const moduleKeys = ['lines', 'vod', 'epg', 'clients', 'billing', 'resellers', 'security', 'operations']
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('docs.title') }}</h1>
      <p>{{ t('docs.subtitle') }}</p>
    </section>

    <section class="section" style="padding-top: 24px">
      <div class="container">
        <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 26px">
          {{ t('docs.modulesTitle') }}
        </h2>
        <div class="grid-2">
          <NuxtLink
            v-for="key in moduleKeys"
            :key="key"
            :to="localePath(`/docs/modules/${key}`)"
            class="card"
          >
            <div class="card-icon"><AppIcon :name="key === 'lines' ? 'middleware' : key === 'operations' ? 'analytics' : key" /></div>
            <h3>{{ t(`docs.modules.${key}.title`) }}</h3>
            <p>{{ t(`docs.modules.${key}.short`) }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>