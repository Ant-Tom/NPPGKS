<script setup lang="ts">
import { categories, categoryUrl } from '~/data/products'

usePageSeo(
  'Продукция',
  'Продукция НПП «ГКС»: системы измерений количества и показателей качества, блочно-комплектное оборудование, системы автоматизации, КИП, системы газового анализа, фильтрационное оборудование.',
  categories[0]!.banner,
)
</script>

<template>
  <div>
    <PageHead title="Наша продукция" />

    <section v-for="(c, i) in categories" :key="c.slug" class="category">
      <CategoryBanner :category="c" :counter="`${i + 1}/${categories.length}`" :to="categoryUrl(c)" />
      <ScrollRow v-if="c.items.length" class="category__items">
        <TileCard v-for="p in c.items" :key="p.title" :title="p.title" :image="p.image" :vw="29" />
      </ScrollRow>
    </section>
  </div>
</template>

<style scoped>
.category__items {
  padding: 30px 0 0;
}
.category:not(:last-child) {
  padding-bottom: clamp(56px, 7.06vw, 120px);
}
</style>
