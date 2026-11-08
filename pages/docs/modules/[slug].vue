<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const moduleKeys = ['lines', 'vod', 'epg', 'clients', 'billing', 'resellers', 'security', 'operations']

const slug = computed(() => route.params.slug as string)

definePageMeta({
  validate: (route) => {
    const keys = ['lines', 'vod', 'epg', 'clients', 'billing', 'resellers', 'security', 'operations']
    return keys.includes(route.params.slug as string)
  }
})

useSeoMeta({ title: () => t(`docs.modules.${slug.value}.title`) })

const bullets = computed(() => {
  const raw = tm(`docs.modules.${slug.value}.bullets`) as unknown
  return Array.isArray(raw) ? (raw as string[]) : []
})
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t(`docs.modules.${slug}.title`) }}</h1>
      <p>{{ t(`docs.modules.${slug}.short`) }}</p>
    </section>

    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="doc-layout">
          <nav class="doc-nav">
            <NuxtLink
              v-for="key in moduleKeys"
              :key="key"
              :to="localePath(`/docs/modules/${key}`)"
            >
              {{ t(`docs.modules.${key}.title`) }}
            </NuxtLink>
          </nav>

          <div class="doc-content">
            <h2>{{ t(`docs.modules.${slug}.title`) }}</h2>
            <p>{{ t(`docs.modules.${slug}.long`) }}</p>
            <ul>
              <li v-for="(b, i) in bullets" :key="i">{{ b }}</li>
            </ul>
            <p style="margin-top: 26px">
              <code>GET /api/v1/{{ slug }}</code>
            </p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>