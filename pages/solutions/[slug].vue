<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const SOLUTION_KEYS = ['groups', 'independent', 'resorts', 'boutique', 'apartments', 'wellness']
const ICON_MAP: Record<string, string> = {
  groups: 'groups',
  independent: 'hotels',
  resorts: 'resorts',
  boutique: 'boutique',
  apartments: 'apartments',
  wellness: 'wellness'
}

const slug = computed(() => route.params.slug as string)

definePageMeta({
  validate: (route) => {
    const keys = ['groups', 'independent', 'resorts', 'boutique', 'apartments', 'wellness']
    return keys.includes(route.params.slug as string)
  }
})

usePageSeo('solutionDetail', t(`solutions.list.${slug.value}.title`))

const bullets = computed(() => {
  const raw = tm(`solutions.list.${slug.value}.bullets`) as unknown
  return Array.isArray(raw) ? (raw as string[]) : []
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="card-icon page-hero-icon"><AppIcon :name="ICON_MAP[slug] || 'tv'" /></div>
      <h1>{{ t(`solutions.list.${slug}.title`) }}</h1>
      <p>{{ t(`solutions.list.${slug}.short`) }}</p>

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

    <section class="section" style="padding-top: 20px">
      <div class="container" style="max-width: 820px">
        <div class="card" style="padding: 36px">
          <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 14px">
            {{ t(`solutions.list.${slug}.title`) }}
          </h2>
          <p style="color: var(--text-2); margin-bottom: 26px">
            {{ t(`solutions.list.${slug}.long`) }}
          </p>
          <ul class="solution-bullets">
            <li v-for="(b, i) in bullets" :key="i">{{ b }}</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px">
          <NuxtLink :to="localePath('/solutions')" class="btn btn-ghost">
            ← {{ t('solutions.title') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>

<style scoped>
.page-hero-icon {
  margin: 0 auto 20px;
  width: 64px;
  height: 64px;
  border-radius: 18px;
}

.page-hero-icon svg {
  width: 32px;
  height: 32px;
}

.solution-bullets {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.solution-bullets li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  color: var(--text-2);
  font-size: 0.95rem;
}

.solution-bullets li::before {
  content: '✓';
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .solution-bullets {
    grid-template-columns: 1fr;
  }
}
</style>