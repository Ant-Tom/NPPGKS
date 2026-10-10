<script setup lang="ts">
// Фото с оптимизацией (@nuxt/image: WebP, srcset под все экраны, lazy).
// `vw` — какую долю ширины экрана фото занимает на десктопе (на мобильных всегда 100vw).
// Пока файла нет — показывается нейтральная заглушка того же размера, вёрстка не «прыгает».
const props = withDefaults(defineProps<{ src?: string, alt?: string, vw?: number, eager?: boolean }>(), { vw: 100 })

const sizes = computed(() => {
  const d = `${props.vw}vw`
  return `xs:100vw sm:100vw md:${props.vw > 50 ? '100vw' : '50vw'} lg:${d} xl:${d} xxl:${d} 2xl:${d}`
})
</script>

<template>
  <NuxtImg
    v-if="src"
    :src="src"
    :alt="alt || ''"
    :sizes="sizes"
    format="webp"
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
