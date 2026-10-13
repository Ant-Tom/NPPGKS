<script setup lang="ts">
// Страница новости (макеты «Новость 1–9»): крошки, обложка 600×750 слева, заголовок, год и текст справа,
// ниже — абзацы в две колонки, подразделы и галерея (сетка 3 колонки, часть фото на две).
import { news, newsUrl } from '~/data/news'

const route = useRoute()
const item = news.find(n => n.slug === route.params.slug)
if (!item) throw createError({ statusCode: 404, statusMessage: 'Страница не найдена', fatal: true })

usePageSeo(item.title, item.lead?.[0]?.slice(0, 200) || item.title, item.cover || item.image)

// соседние новости для навигации внизу (только те, у которых есть страница)
const pages = news.filter(n => n.slug)
const index = pages.indexOf(item)
const prev = pages[index - 1]
const next = pages[index + 1]
</script>

<template>
  <article v-if="item">
    <nav class="container crumbs" aria-label="Хлебные крошки">
      <NuxtLink to="/novosti">Новости</NuxtLink>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{{ item.title }}</span>
    </nav>

    <header class="container head">
      <div v-reveal class="head__cover">
        <MediaImage :src="item.cover" :alt="item.cover ? item.title : undefined" :vw="36" eager />
      </div>
      <div class="head__text">
        <h1 v-reveal class="h1">{{ item.title }}</h1>
        <p v-if="item.year" v-reveal="1" class="head__year"><time :datetime="item.year">{{ item.year }}</time></p>
        <div v-reveal="2" class="prose">
          <p v-for="p in item.lead" :key="p">{{ p }}</p>
        </div>
      </div>
    </header>

    <section v-if="item.columns" v-reveal class="container columns prose">
      <p v-for="p in item.columns" :key="p">{{ p }}</p>
    </section>

    <section v-for="s in item.sections" :key="s.title" v-reveal class="container section prose">
      <h2 v-if="s.title" class="h2 section__title">{{ s.title }}</h2>
      <p v-for="p in s.text" :key="p">{{ p }}</p>
    </section>

    <section v-if="item.gallery?.length" class="container gallery" aria-label="Фотографии">
      <ul class="gallery__grid">
        <li
          v-for="(g, i) in item.gallery"
          :key="i"
          v-reveal="i % 3"
          class="gallery__item"
          :class="{ 'is-wide': g.wide }"
        >
          <a :href="g.src" target="_blank" rel="noopener" :aria-label="`Фото ${i + 1} — открыть в полном размере`">
            <MediaImage :src="g.src" alt="" :vw="g.wide ? 59 : 29" />
          </a>
        </li>
      </ul>
    </section>

    <nav class="container pager" aria-label="Другие новости">
      <NuxtLink v-if="prev" :to="newsUrl(prev)!" class="pager__link pager__link--prev">
        <span class="pager__label">← Предыдущая</span>
        <span class="pager__title">{{ prev.title }}</span>
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="next" :to="newsUrl(next)!" class="pager__link pager__link--next">
        <span class="pager__label">Следующая →</span>
        <span class="pager__title">{{ next.title }}</span>
      </NuxtLink>
    </nav>
  </article>
</template>

<style scoped>
.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-block: clamp(24px, 2.8vw, 48px) clamp(32px, 3.5vw, 60px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.crumbs a {
  color: var(--grey);
  text-decoration: none;
}
.crumbs a:hover {
  color: var(--black);
}

.head {
  display: grid;
  grid-template-columns: minmax(0, 600px) minmax(0, 1fr);
  gap: 32px clamp(24px, 2.2vw, 37px);
  align-items: start;
}
.head__cover {
  position: relative;
  aspect-ratio: 600 / 750;
  overflow: hidden;
}
.head__cover :deep(.media) {
  position: absolute;
  inset: 0;
}
.head__text {
  padding-top: clamp(0px, 4vw, 68px);
}
.head__year {
  margin-top: 8px;
  color: var(--grey);
  font-size: 18px;
  line-height: 1.67;
}
.prose {
  font-size: var(--fs-text);
  line-height: 1.82;
}
.head .prose {
  margin-top: clamp(16px, 1.8vw, 30px);
}
.prose p + p {
  margin-top: 12px;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px clamp(40px, 4.7vw, 80px);
  padding-top: clamp(48px, 5.3vw, 90px);
}
.columns p + p {
  margin-top: 0;
}
.section {
  max-width: calc(var(--container) * 0.6 + var(--gutter) * 2);
  margin-left: 0;
  padding-top: clamp(32px, 3.5vw, 60px);
}
.section__title {
  margin-bottom: 12px;
}

.gallery {
  padding-top: clamp(48px, 5.9vw, 100px);
}
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(8px, 0.95vw, 16px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.gallery__item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}
/* две колонки + промежуток: 995×489 в макете */
.gallery__item.is-wide {
  grid-column: span 2;
  aspect-ratio: 995 / 489;
}
.gallery__item a {
  position: absolute;
  inset: 0;
}
.gallery__item :deep(.media) {
  position: absolute;
  inset: 0;
  transition: transform 0.5s;
}
.gallery__item a:hover :deep(.media) {
  transform: scale(1.03);
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding-block: var(--section-y);
}
.pager__link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 0;
  text-decoration: none;
  border-top: 0.5px solid var(--grey);
}
.pager__link--next {
  text-align: right;
}
.pager__label {
  color: var(--grey);
  font-size: 18px;
}
.pager__title {
  font-size: var(--fs-h2);
  font-weight: 700;
  line-height: 1.53;
  text-transform: uppercase;
}
.pager__link:hover .pager__title {
  color: var(--green);
}

@media (max-width: 1023px) {
  .head,
  .columns {
    grid-template-columns: 1fr;
  }
  .head__cover {
    max-width: 600px;
  }
  .head__text {
    padding-top: 0;
  }
}
@media (max-width: 639px) {
  .gallery__grid {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }
  .gallery__item.is-wide {
    aspect-ratio: 2 / 1;
  }
  .pager {
    grid-template-columns: 1fr;
  }
  .pager__link--next {
    text-align: left;
  }
}
</style>
