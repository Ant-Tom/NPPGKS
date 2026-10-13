<script setup lang="ts">
import { reviews } from '~/data/about'

usePageSeo(
  'Отзывы о нашей работе',
  'Отзывы заказчиков о работе НПП «ГКС»: РУСАЛ ИТЦ, Криогаз-Высоцк, НПП «Компрессор».',
)
</script>

<template>
  <div>
    <PageHead title="Отзывы о нашей работе">
      <p>НПП «ГКС» за многие годы работы зарекомендовал себя как надёжный партнёр, получив положительные отзывы Заказчиков</p>
    </PageHead>

    <section class="container reviews">
      <ul class="reviews__grid">
        <li v-for="(r, i) in reviews" :key="i" class="review">
          <a v-if="r.file" :href="r.file" target="_blank" rel="noopener" class="review__scan">
            <NuxtImg :src="r.file" :alt="`Отзыв ${r.company}`" width="362" loading="lazy" />
          </a>
          <span v-else class="review__scan" />
          <p class="review__company">{{ r.company }}</p>
          <p v-if="r.year" class="review__year">{{ r.year }} г.</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
/* макет: сканы 362×512 с шагом 18px, подпись 22px через 20px под сканом, 90px до футера */
.reviews {
  padding-bottom: clamp(56px, 5.3vw, 90px);
}
.reviews__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.review__scan {
  display: block;
  aspect-ratio: 362 / 512;
  overflow: hidden;
  background: #d9d9d9;
  box-shadow: var(--shadow);
}
.review__scan img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.review__company {
  margin-top: 20px;
  font-size: var(--fs-text);
  line-height: 35px;
}
.review__year {
  font-size: var(--fs-text);
  line-height: 35px;
  color: var(--grey-text);
}
@media (max-width: 1023px) {
  .reviews__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
