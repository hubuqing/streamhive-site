<script setup lang="ts">
const props = defineProps<{ name: string }>()

const ICONS: Record<string, string[]> = {
  middleware: ['M4 5h16v5H4z', 'M4 14h16v5H4z', 'M7 7.5h.01', 'M7 16.5h.01'],
  live: ['M12 11a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M7.5 7a6.5 6.5 0 0 0 0 10', 'M16.5 7a6.5 6.5 0 0 1 0 10', 'M4.5 4.5a10 10 0 0 0 0 15', 'M19.5 4.5a10 10 0 0 1 0 15'],
  vod: ['M4 4h16v16H4z', 'M4 9h16', 'M4 15h16', 'M9 4v16', 'M15 4v16'],
  epg: ['M4 6h16v14H4z', 'M4 10h16', 'M8 6V4', 'M16 6V4', 'M8 14h3', 'M13 14h3'],
  transcoding: ['M4 7h4l8 10h4', 'M16 7h4v4', 'M4 17h4', 'M18 13l2-2 2 2'],
  drm: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z', 'M9 12l2 2 4-4'],
  billing: ['M3 6h18v12H3z', 'M3 10h18', 'M7 15h4'],
  resellers: ['M12 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M5 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M19 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M12 8v4', 'M12 12l-5.5 4', 'M12 12l5.5 4'],
  analytics: ['M4 20h16', 'M7 20v-6', 'M12 20V9', 'M17 20V4'],
  clients: ['M3 5h18v11H3z', 'M9 20h6', 'M12 16v4'],
  api: ['M8 6l-5 6 5 6', 'M16 6l5 6-5 6'],
  security: ['M6 10h12v10H6z', 'M9 10V7a3 3 0 0 1 6 0v3'],
  hotels: ['M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16', 'M3 21h18', 'M15 9h2a2 2 0 0 1 2 2v10', 'M9 7h2', 'M9 11h2', 'M9 15h2'],
  airlines: ['M21 3l-8 18-3-7-7-3 17-8z'],
  hospitals: ['M12 5v14', 'M5 12h14', 'M4 4h16v16H4z'],
  isps: ['M2.5 9a14.5 14.5 0 0 1 19 0', 'M5.5 12.5a10 10 0 0 1 13 0', 'M8.5 16a6 6 0 0 1 7 0', 'M12 19.5h.01'],
  'cruise-ships': ['M4 15l1.5-6h13L20 15', 'M3 15c2 0 2.5 1 5 1s2.5-1 5-1 2.5 1 5 1 2.5-1 3-1', 'M12 9V3', 'M9 5h6', 'M6 19h12'],
  buses: ['M5 4h14v13H5z', 'M5 9h14', 'M9 4v5', 'M15 4v5', 'M8 17v3', 'M16 17v3', 'M5 13h14'],
  apartments: ['M4 21V7l7-4v18', 'M11 21V11l7-3v13', 'M4 21h18', 'M7.5 10h.01', 'M7.5 14h.01', 'M14.5 14h.01'],
  'news-agencies': ['M4 5h13v14H6a2 2 0 0 1-2-2V5z', 'M17 8h3v9a2 2 0 0 1-2 2', 'M7 8h7', 'M7 11h7', 'M7 14h4'],
  homes: ['M4 11l8-7 8 7', 'M6 10v10h12V10', 'M10 20v-6h4v6'],
  mail: ['M3 6h18v12H3z', 'M3 7l9 6 9-6'],
  phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z'],
  pin: ['M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z', 'M12 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z'],
  docs: ['M6 3h9l4 4v14H6z', 'M15 3v4h4', 'M9 12h6', 'M9 16h6'],
  rocket: ['M12 3c3 2 5 6 5 10l-3 3h-4l-3-3c0-4 2-8 5-10z', 'M9 16l-2 4', 'M15 16l2 4', 'M12 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z']
}

const paths = computed(() => ICONS[props.name] || ICONS.docs)
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