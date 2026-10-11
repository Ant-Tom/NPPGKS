<script setup lang="ts">
// Карточка-фото с подписью на полупрозрачной размытой плашке снизу (Продукция, Услуги, Новости).
// `heading` — подпись Header 2 (жирная, капсом), иначе — обычный текст 22px.
withDefaults(defineProps<{
  title: string
  image?: string
  to?: string
  heading?: boolean
  vw?: number
  tag?: string
}>(), { vw: 30, tag: 'h3' })
</script>

<template>
  <article class="tile" :class="{ 'tile--heading': heading, 'tile--link': to }">
    <MediaImage :src="image" :alt="image ? title : undefined" :vw="vw" />
    <component :is="tag" class="tile__caption">
      <NuxtLink v-if="to" :to="to" class="tile__link"><span class="tile__text">{{ title }}</span></NuxtLink>
      <span v-else class="tile__text">{{ title }}</span>
    </component>
  </article>
</template>

<style scoped>
.tile {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--light);
  box-shadow: var(--shadow);
}
.tile :deep(.media) {
  position: absolute;
  inset: 0;
  transition: transform 0.4s;
}
.tile--link:hover :deep(.media) {
  transform: scale(1.04);
}
.tile__caption {
  position: absolute;
  inset: auto 0 0;
  min-height: 34%;
  padding: clamp(16px, 1.4vw, 24px) clamp(18px, 1.8vw, 30px);
  color: var(--white);
  font-size: var(--fs-text);
  font-weight: 400;
  line-height: 1.82;
  background: rgba(17, 17, 17, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.tile--heading .tile__caption {
  font-size: var(--fs-h2);
  font-weight: 700;
  line-height: 1.53;
  text-transform: uppercase;
}
.tile__text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.tile__link {
  text-decoration: none;
}
/* вся карточка кликабельна */
.tile__link::after {
  content: '';
  position: absolute;
  inset: -100vh -100vw;
}
.tile--link {
  cursor: pointer;
}
</style>
