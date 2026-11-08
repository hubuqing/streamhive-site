<script setup lang="ts">
const { t, locale } = useI18n()

usePageSeo('contact', t('contact.title'))

const form = reactive({
  name: '',
  email: '',
  company: '',
  rooms: '',
  topic: 'demo',
  message: '',
  website: ''
})

const submitted = ref(false)
const sending = ref(false)
const failed = ref(false)
const failCode = ref(0)

const submit = async () => {
  if (sending.value) return
  sending.value = true
  failed.value = false
  failCode.value = 0
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, locale: locale.value }
    })
    submitted.value = true
  } catch (e) {
    failed.value = true
    const err = e as { status?: number }
    failCode.value = err.status || 0
    console.error('contact submit failed:', e)
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('contact.title') }}</h1>
      <p>{{ t('contact.subtitle') }}</p>
      <div class="page-hero-visual">
        <div class="media-frame">
          <img
            src="/images/banner-contact.webp"
            :alt="t('media.alt.contact')"
            width="2048"
            height="1024"
            loading="lazy"
            decoding="async"
          >
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 24px">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-item">
              <div class="card-icon"><AppIcon name="mail" /></div>
              <div>
                <strong>{{ t('contact.email') }}</strong>
                <p style="color: var(--text-2); font-size: 0.92rem">hello@castella.example.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="card-icon"><AppIcon name="phone" /></div>
              <div>
                <strong>{{ t('contact.phone') }}</strong>
                <p style="color: var(--text-2); font-size: 0.92rem">+351 21 555 0190</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="card-icon"><AppIcon name="pin" /></div>
              <div>
                <strong>{{ t('contact.hq') }}</strong>
                <p style="color: var(--text-2); font-size: 0.92rem">Rua da Prata 88, Lisbon, Portugal</p>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 22px">
              {{ t('contact.formTitle') }}
            </h2>
            <div v-if="submitted" class="form-success">
              {{ t('contact.success') }}
            </div>
            <form v-else @submit.prevent="submit">
              <div class="form-group">
                <label for="name">{{ t('contact.name') }}</label>
                <input id="name" v-model="form.name" type="text" required>
              </div>
              <div class="form-group">
                <label for="email">{{ t('contact.emailField') }}</label>
                <input id="email" v-model="form.email" type="email" required>
              </div>
              <div class="form-group">
                <label for="company">{{ t('contact.company') }}</label>
                <input id="company" v-model="form.company" type="text">
              </div>
              <div class="form-group">
                <label for="rooms">{{ t('contact.rooms') }}</label>
                <input id="rooms" v-model="form.rooms" type="number" min="1" max="100000" placeholder="—">
              </div>
              <div class="form-group">
                <label for="topic">{{ t('contact.topic') }}</label>
                <select id="topic" v-model="form.topic">
                  <option value="demo">{{ t('contact.topics.demo') }}</option>
                  <option value="integration">{{ t('contact.topics.integration') }}</option>
                  <option value="partnership">{{ t('contact.topics.partnership') }}</option>
                  <option value="other">{{ t('contact.topics.other') }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">{{ t('contact.message') }}</label>
                <textarea id="message" v-model="form.message" required minlength="10" :placeholder="t('contact.messageHint')" />
              </div>
              <input
                v-model="form.website"
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
                class="hp-field"
              >
              <div v-if="failed" class="form-error">
                {{ failCode === 422 ? t('contact.errorValidation') : t('contact.error') }}
                <small v-if="failCode && failCode !== 422" style="display:block;opacity:.7">HTTP {{ failCode }}</small>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%" :disabled="sending">
                {{ sending ? t('contact.sending') : t('contact.send') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>