<script setup lang="ts">
// Фото с оптимизацией (@nuxt/image: AVIF/WebP, адаптивные размеры, lazy).
// Пока файла нет — показывается нейтральная заглушка того же размера, вёрстка не «прыгает».
defineProps<{ src?: string, alt?: string, sizes?: string, eager?: boolean }>()
</script>

<template>
  <NuxtImg
    v-if="src"
    :src="src"
    :alt="alt || ''"
    :sizes="sizes || '100vw'"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    class="media"
  />
  <span v-else class="media media--empty" role="img" :aria-label="alt || undefined" />
</template>

<style scoped>
.media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media--empty {
  background:
    linear-gradient(135deg, rgba(21, 56, 67, 0.25), rgba(128, 130, 133, 0.15)),
    var(--light);
}
</style>
