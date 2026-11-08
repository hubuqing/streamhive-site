<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: t('pricing.title') })

const plans = [
  { key: 'starter', featured: false, planId: 1, featureCount: 5 },
  { key: 'growth', featured: true, planId: 3, featureCount: 6 },
  { key: 'enterprise', featured: false, planId: null, featureCount: 6 }
]

const faqs = ['q1', 'q2', 'q3', 'q4']
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('pricing.title') }}</h1>
      <p>{{ t('pricing.subtitle') }}</p>
    </section>

    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="pricing-grid">
          <div
            v-for="plan in plans"
            :key="plan.key"
            class="plan"
            :class="{ 'plan-featured': plan.featured }"
          >
            <span v-if="plan.featured" class="plan-badge">{{ t('pricing.popular') }}</span>
            <div class="plan-name">{{ t(`pricing.plans.${plan.key}.name`) }}</div>
            <div class="plan-price">
              <template v-if="plan.planId">
                {{ t(`pricing.plans.${plan.key}.price`) }}
                <small>{{ t('pricing.period') }}</small>
              </template>
              <template v-else>{{ t('pricing.custom') }}</template>
            </div>
            <p class="plan-desc">{{ t(`pricing.plans.${plan.key}.desc`) }}</p>
            <ul class="plan-features">
              <li v-for="i in plan.featureCount" :key="i">
                {{ t(`pricing.plans.${plan.key}.features.${i - 1}`) }}
              </li>
            </ul>
            <NuxtLink
              v-if="plan.planId"
              :to="localePath({ path: '/checkout', query: { plan: plan.planId } })"
              class="btn"
              :class="plan.featured ? 'btn-primary' : 'btn-ghost'"
            >
              {{ t('common.orderNow') }}
            </NuxtLink>
            <NuxtLink
              v-else
              :to="localePath('/contact')"
              class="btn btn-ghost"
            >
              {{ t('nav.contact') }}
            </NuxtLink>
          </div>
        </div>
        <p style="text-align:center; color: var(--text-3); font-size: 0.88rem; margin-top: 22px">
          {{ t('pricing.customNote') }}
        </p>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="container" style="max-width: 780px">
        <div class="section-head" style="margin-bottom: 36px">
          <h2>{{ t('pricing.faqTitle') }}</h2>
        </div>
        <details v-for="q in faqs" :key="q" class="faq-item">
          <summary>{{ t(`pricing.faq.${q}`) }}</summary>
          <div class="faq-body">{{ t(`pricing.faq.a${q.slice(1)}`) }}</div>
        </details>
      </div>
    </section>

    <CtaSection />
  </div>
</template>