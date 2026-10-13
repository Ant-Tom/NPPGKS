<script setup lang="ts">
import type { Logo } from '~/data/about'

defineProps<{ logos: Logo[] }>()
</script>

<template>
  <ul class="logos">
    <li v-for="l in logos" :key="l.file" class="logos__cell">
      <NuxtImg :src="l.file" :alt="l.name" :title="l.name" width="200" loading="lazy" class="logos__img" />
    </li>
  </ul>
</template>

<style scoped>
.logos {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}
.logos__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  padding: 18%;
  margin: 0 -1px -1px 0;
  border: 1px solid var(--light);
  transition: background 0.2s;
}
.logos__cell:hover {
  background: var(--light);
}
.logos__img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}
@media (max-width: 1023px) {
  .logos {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 639px) {
  .logos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .logos__cell {
    padding: 14%;
  }
}
</style>
