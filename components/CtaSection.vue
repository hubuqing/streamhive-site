<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="cta-section">
    <div class="cta-card">
      <h2>{{ t('cta.title') }}</h2>
      <p>{{ t('cta.text') }}</p>
      <div class="cta-actions">
        <NuxtLink :to="localePath('/contact')" class="btn btn-primary btn-lg">
          {{ t('cta.contact') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/pricing')" class="btn btn-ghost btn-lg">
          {{ t('cta.pricing') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>