<script setup lang="ts">
import { news, newsUrl } from '~/data/news'

usePageSeo(
  'Новости',
  'Новости НПП «ГКС»: аудиты и производство, корпоративные мероприятия, спорт и жизнь коллектива.',
  news[0]!.image,
)
</script>

<template>
  <div>
    <PageHead title="Новости" />

    <section class="container list">
      <ul class="list__grid">
        <li v-for="(n, i) in news" :key="n.title" v-reveal="i % 4" :class="{ 'is-wide': n.wide }">
          <TileCard :title="n.title" :image="n.image" :to="newsUrl(n)" heading :vw="n.wide ? 44 : 22" tag="h2" class="card" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.list {
  padding-bottom: var(--section-y);
}
.list__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: clamp(320px, 30vw, 510px);
  gap: clamp(10px, 1.2vw, 20px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.is-wide {
  grid-column: span 2;
}
.card {
  height: 100%;
  aspect-ratio: auto;
}
@media (max-width: 1023px) {
  .list__grid {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: clamp(280px, 55vw, 460px);
  }
}
@media (max-width: 639px) {
  .list__grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .is-wide {
    grid-column: auto;
  }
  .card {
    aspect-ratio: 4 / 5;
  }
}
</style>
