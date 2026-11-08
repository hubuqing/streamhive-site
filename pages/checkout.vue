<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useSeoMeta({ title: t('checkout.title') })

const PLAN_MAP: Record<string, string> = {
  '1': 'starter',
  '3': 'growth',
  '12': 'growth'
}

const planKey = computed(() => {
  const p = route.query.plan as string
  return PLAN_MAP[p] || null
})
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('checkout.title') }}</h1>
      <p>{{ t('checkout.subtitle') }}</p>
    </section>

    <section class="section" style="padding-top: 24px">
      <div class="container">
        <div v-if="planKey" class="checkout-card">
          <h2 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 18px">
            {{ t('checkout.summary') }}
          </h2>
          <div class="checkout-plan">
            <span class="name">{{ t(`pricing.plans.${planKey}.name`) }}</span>
            <span class="price">
              {{ t(`pricing.plans.${planKey}.price`) }}
              <small style="color: var(--text-3); font-size: 0.8rem">{{ t('checkout.period') }}</small>
            </span>
          </div>
          <ul class="plan-features">
            <li v-for="i in (planKey === 'starter' ? 5 : 6)" :key="i">
              {{ t(`pricing.plans.${planKey}.features.${i - 1}`) }}
            </li>
          </ul>
          <button class="btn btn-primary btn-lg" style="width: 100%">
            {{ t('checkout.pay') }}
          </button>
          <p class="pay-note">{{ t('checkout.note') }}</p>
        </div>

        <div v-else class="checkout-card" style="text-align: center">
          <p style="color: var(--text-2); margin-bottom: 20px">{{ t('pricing.subtitle') }}</p>
          <NuxtLink :to="localePath('/pricing')" class="btn btn-primary">
            {{ t('hero.secondary') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>