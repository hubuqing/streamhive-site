<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({ title: t('contact.title') })

const form = reactive({
  name: '',
  email: '',
  company: '',
  topic: 'demo',
  message: ''
})

const submitted = ref(false)

const submit = () => {
  submitted.value = true
}
</script>

<template>
  <div>
    <section class="page-hero">
      <h1>{{ t('contact.title') }}</h1>
      <p>{{ t('contact.subtitle') }}</p>
    </section>

    <section class="section" style="padding-top: 24px">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-item">
              <div class="card-icon"><AppIcon name="mail" /></div>
              <div>
                <strong>{{ t('contact.email') }}</strong>
                <p style="color: var(--text-2); font-size: 0.92rem">sales@streamhive.example.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="card-icon"><AppIcon name="phone" /></div>
              <div>
                <strong>{{ t('contact.phone') }}</strong>
                <p style="color: var(--text-2); font-size: 0.92rem">+359 88 555 0100</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="card-icon"><AppIcon name="pin" /></div>
              <div>
                <strong>{{ t('contact.hq') }}</strong>
                <p style="color: var(--text-2); font-size: 0.92rem">Tsar Boris III 215, Sofia, Bulgaria</p>
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
                <label for="topic">{{ t('contact.topic') }}</label>
                <select id="topic" v-model="form.topic">
                  <option value="demo">{{ t('contact.topics.demo') }}</option>
                  <option value="pricing">{{ t('contact.topics.pricing') }}</option>
                  <option value="migration">{{ t('contact.topics.migration') }}</option>
                  <option value="partnership">{{ t('contact.topics.partnership') }}</option>
                  <option value="other">{{ t('contact.topics.other') }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">{{ t('contact.message') }}</label>
                <textarea id="message" v-model="form.message" required />
              </div>
              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%">
                {{ t('contact.send') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>