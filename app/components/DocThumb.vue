<script setup lang="ts">
// Миниатюра скана документа. По клику открывается полноразмерный скан в новой вкладке.
defineProps<{ src?: string, label: string, width?: number }>()
</script>

<template>
  <a v-if="src" :href="src" target="_blank" rel="noopener" class="doc" :aria-label="label">
    <NuxtImg :src="src" :alt="label" :width="width || 60" loading="lazy" class="doc__img" />
  </a>
  <span v-else class="doc doc--empty" :title="label" />
</template>

<style scoped>
.doc {
  display: block;
  aspect-ratio: 1;
  background: #d1d2d9;
  overflow: hidden;
}
.doc__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
a.doc:hover {
  outline: 2px solid var(--green);
}
</style>
