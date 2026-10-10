<script setup lang="ts">
// Заголовок секции (Header 1). С `to` — становится ссылкой со стрелкой ↗
defineProps<{ to?: string, tag?: string }>()
</script>

<template>
  <component :is="tag || 'h2'" class="section-title h1">
    <NuxtLink v-if="to" :to="to" class="section-title__link">
      <slot />
      <IconArrow />
    </NuxtLink>
    <slot v-else />
  </component>
</template>

<style scoped>
.section-title__link {
  display: inline-flex;
  align-items: flex-end;
  gap: 14px;
  text-decoration: none;
}
.section-title__link .icon-arrow {
  margin-bottom: 0.25em;
  transition: transform 0.2s;
}
.section-title__link:hover .icon-arrow {
  transform: translate(4px, -4px);
}
</style>
