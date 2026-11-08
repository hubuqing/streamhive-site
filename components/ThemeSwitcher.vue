<script setup lang="ts">
import { ACCENTS } from '~/composables/useTheme'

const { mode, accent, toggleMode, setAccent } = useTheme()
</script>

<template>
  <div class="theme-switcher">
    <div class="accent-dots" role="group" :aria-label="$t('common.accentColor')">
      <button
        v-for="a in ACCENTS"
        :key="a"
        class="accent-dot"
        :class="[`accent-${a}`, { active: accent === a }]"
        :title="$t(`common.accent_${a}`)"
        :aria-label="$t(`common.accent_${a}`)"
        @click="setAccent(a)"
      />
    </div>
    <button
      class="mode-btn"
      :aria-label="mode === 'dark' ? $t('common.toLight') : $t('common.toDark')"
      @click="toggleMode"
    >
      <svg v-if="mode === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
      </svg>
    </button>
  </div>
</template>