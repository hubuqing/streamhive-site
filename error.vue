<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const handleClearError = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div class="error-page">
    <div class="error-code">{{ props.error.statusCode === 404 ? '404' : props.error.statusCode }}</div>
    <h1>{{ t('error.title') }}</h1>
    <p>{{ t('error.text') }}</p>
    <button class="btn btn-primary btn-lg" @click="handleClearError">
      {{ t('error.back') }}
    </button>
  </div>
</template>