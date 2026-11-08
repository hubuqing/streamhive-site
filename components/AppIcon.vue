<script setup lang="ts">
const props = defineProps<{ name: string }>()

const ICONS: Record<string, string[]> = {
  tv: ['M3 5h18v12H3z', 'M9 21h6', 'M12 17v4', 'M10.5 8.5l5 2.5-5 2.5v-5z'],
  cast: ['M3 18h.01M3 14a4 4 0 0 1 4 4M3 10a8 8 0 0 1 8 8', 'M7 17a10 10 0 0 1 10-10h4', 'M17 7l4-1-1 4'],
  streaming: ['M4 6h16M4 12h10', 'M18 15.5l3 2.5-3 2.5v-5z', 'M4 18h11'],
  welcome: ['M4 11l8-7 8 7', 'M6 10v10h12V10', 'M10 20v-6h4v6'],
  info: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M12 11v6', 'M12 7.5h.01'],
  dining: ['M7 3v8a2.5 2.5 0 0 0 5 0V3', 'M9.5 11v10', 'M16.5 3c-1.5 2-2 4-2 6.5 0 1.5.5 2.5 2 2.5s2-1 2-2.5C18.5 7 18 5 16.5 3z', 'M16.5 12v9'],
  upsell: ['M3 17l6-6 4 4 8-8', 'M15 7h6v6', 'M12 21h9'],
  languages: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M3 12h18', 'M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z'],
  cloud: ['M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 8.5 4.5 4.5 0 0 1 17.5 18H7z', 'M12 12v6', 'M9.5 15.5l2.5 2.5 2.5-2.5'],
  analytics: ['M4 20h16', 'M7 20v-6', 'M12 20V9', 'M17 20v-10'],
  security: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z', 'M9 12l2 2 4-4'],
  hotels: ['M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16', 'M3 21h18', 'M15 9h2a2 2 0 0 1 2 2v10', 'M9 7h2', 'M9 11h2', 'M9 15h2'],
  groups: ['M3 21V9l5-4 5 4v12', 'M13 21V13l4-3 4 3v8', 'M3 21h18'],
  resorts: ['M12 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8z', 'M12 1v4', 'M3 14c2 0 2.5 1 4.5 1S9.5 14 12 14s2.5 1 4.5 1 2.5-1 4.5-1', 'M3 18c2 0 2.5 1 4.5 1S9.5 18 12 18s2.5 1 4.5 1 2.5-1 4.5-1', 'M5 10h14'],
  boutique: ['M12 3l2.5 5.5L20 9.5l-4 4 1 5.5-5-2.8-5 2.8 1-5.5-4-4 5.5-1L12 3z'],
  apartments: ['M4 21V7l7-4v18', 'M11 21V11l7-3v13', 'M4 21h18', 'M7 10h.01', 'M7 14h.01', 'M14.5 14h.01'],
  wellness: ['M12 21c-4 0-7-3-7-7 0-3 2-6 7-11 5 5 7 8 7 11 0 4-3 7-7 7z', 'M12 21c0-4 1.5-7 4-9'],
  mail: ['M3 6h18v12H3z', 'M3 7l9 6 9-6'],
  phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z'],
  pin: ['M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z', 'M12 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z'],
  docs: ['M6 3h9l4 4v14H6z', 'M15 3v4h4', 'M9 12h6', 'M9 16h6'],
  rocket: ['M12 3c3 2 5 6 5 10l-3 3h-4l-3-3c0-4 2-8 5-10z', 'M9 16l-2 4', 'M15 16l2 4', 'M12 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z']
}

const paths = computed(() => ICONS[props.name] || ICONS.tv)
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, i) in paths" :key="i" :d="d" />
  </svg>
</template>