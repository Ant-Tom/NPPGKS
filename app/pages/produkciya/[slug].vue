<script setup lang="ts">
// Страница направления продукции. Отдельного макета нет — собрана из блоков страницы «Продукция»:
// баннер направления + все позиции сеткой + ссылки на остальные направления.
import { categories, categoryUrl } from '~/data/products'

const route = useRoute()
const category = categories.find(c => c.slug === route.params.slug)
if (!category) throw createError({ statusCode: 404, statusMessage: 'Страница не найдена', fatal: true })

usePageSeo(category.title, category.text, category.banner)

const others = categories.filter(c => c !== category)
</script>

<template>
  <div v-if="category">
    <nav class="container crumbs" aria-label="Хлебные крошки">
      <NuxtLink to="/produkciya">Продукция</NuxtLink>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{{ category.label }}</span>
    </nav>

    <CategoryBanner :category="category" tag="h1" />

    <section v-if="category.items.length" class="container items">
      <ul class="items__grid">
        <li v-for="(p, i) in category.items" :key="p.title" v-reveal="i % 3">
          <TileCard :title="p.title" :image="p.image" :vw="29" />
        </li>
      </ul>
    </section>

    <section class="container more">
      <h2 class="h1 more__title">Другие направления</h2>
      <ul class="more__list">
        <li v-for="(c, i) in others" :key="c.slug" v-reveal="i">
          <NuxtLink :to="categoryUrl(c)" class="more__link">{{ c.label }} <IconArrow /></NuxtLink>
        </li>
      </ul>
      <AppButton to="/kontakty#feedback">Связаться с нами</AppButton>
    </section>
  </div>
</template>

<style scoped>
.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-block: 24px;
  color: var(--grey-text);
  font-size: var(--fs-caption);
}
.crumbs a {
  color: inherit;
  padding-block: 12px;
  margin-block: -12px;
}
.items {
  padding-top: clamp(32px, 3.5vw, 60px);
}
.items__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(12px, 1.41vw, 24px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.more {
  padding-block: var(--section-y);
}
.more__title {
  color: var(--grey);
}
.more__list {
  margin: clamp(24px, 2.4vw, 40px) 0 clamp(32px, 3.5vw, 60px);
  padding: 0;
  list-style: none;
  border-top: 0.5px solid var(--grey);
}
.more__list li {
  border-bottom: 0.5px solid var(--grey);
}
.more__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 0;
  font-size: var(--fs-h2);
  line-height: 1.53;
  text-decoration: none;
}
.more__link .icon-arrow {
  transition: transform 0.2s;
}
.more__link:hover {
  color: var(--green);
}
.more__link:hover .icon-arrow {
  transform: translate(4px, -4px);
}
@media (max-width: 1023px) {
  .items__grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
@media (max-width: 639px) {
  .items__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
