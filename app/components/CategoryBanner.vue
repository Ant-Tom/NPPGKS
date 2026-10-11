<script setup lang="ts">
// Баннер направления продукции: фото на всю ширину, затемнение слева, «1/6 ↗», заголовок и описание.
import type { ProductCategory } from '~/data/products'

defineProps<{
  category: ProductCategory
  /** «1/6» — номер в каталоге; без него — шапка страницы направления */
  counter?: string
  to?: string
  tag?: string
}>()
</script>

<template>
  <section class="banner">
    <MediaImage :src="category.banner" alt="" class="banner__bg" :eager="!counter" />
    <div class="container banner__inner">
      <NuxtLink v-if="counter && to" :to="to" class="banner__counter" :aria-label="`${category.title} — подробнее`">
        {{ counter }} <IconArrow />
      </NuxtLink>
      <component :is="tag || 'h2'" class="banner__title">
        <NuxtLink v-if="to" :to="to" class="banner__link">{{ category.title }}</NuxtLink>
        <template v-else>{{ category.title }}</template>
      </component>
      <p class="banner__text">{{ category.text }}</p>
    </div>
  </section>
</template>

<style scoped>
.banner {
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(420px, 36.3vw, 617px);
  padding: clamp(48px, 5.3vw, 90px) 0;
  overflow: hidden;
  color: var(--white);
  background: var(--blue);
  isolation: isolate;
}
.banner__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
}
.banner::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(90deg, rgba(21, 56, 67, 0.95) 0%, rgba(21, 56, 67, 0.7) 35%, rgba(21, 56, 67, 0.2) 70%, rgba(21, 56, 67, 0.1) 100%);
}
.banner__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.banner__counter {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  margin-bottom: clamp(24px, 2.8vw, 48px);
  font-size: clamp(40px, 4.1vw, 70px);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
}
.banner__counter .icon-arrow {
  width: 0.5em;
  height: 0.5em;
  transition: transform 0.2s;
}
.banner__counter:hover .icon-arrow {
  transform: translate(4px, -4px);
}
.banner__title {
  max-width: 640px;
  font-size: var(--fs-h1);
  font-weight: 400;
  line-height: 1.3;
  text-transform: uppercase;
}
.banner__link {
  text-decoration: none;
}
.banner__link:hover {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
}
.banner__text {
  max-width: 820px;
  margin-top: clamp(20px, 1.8vw, 30px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
</style>
