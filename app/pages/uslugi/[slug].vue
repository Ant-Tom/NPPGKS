<script setup lang="ts">
// Страница услуги. Макета и текстов по каждой услуге пока нет — показываем заголовок,
// общий текст о сотрудничестве, кнопку связи и остальные услуги.
// TODO: добавить описание услуги, когда появится контент
import { services } from '~/data/site'

const route = useRoute()
const service = services.find(s => s.to === `/uslugi/${route.params.slug}`)
if (!service) throw createError({ statusCode: 404, statusMessage: 'Страница не найдена', fatal: true })

usePageSeo(service.label, `${service.label} — услуги НПП «ГКС». Проконсультируем и подготовим индивидуальные условия сотрудничества.`)

const others = services.filter(s => s !== service)
</script>

<template>
  <div v-if="service">
    <nav class="container crumbs" aria-label="Хлебные крошки">
      <NuxtLink to="/uslugi">Услуги</NuxtLink>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{{ service.label }}</span>
    </nav>

    <PageHead :title="service.label" class="head">
      <p>
        Хотите узнать подробнее об условиях сотрудничества? Свяжитесь с нами по почте или телефону.
        Проконсультируем, ответим на вопросы и подготовим индивидуальные условия сотрудничества
      </p>
    </PageHead>

    <div class="container cta">
      <AppButton to="/kontakty#feedback">Связаться с нами</AppButton>
    </div>

    <section class="container others">
      <h2 class="h1 others__title">Другие услуги</h2>
      <ul class="others__grid">
        <li v-for="(s, i) in others" :key="s.to" v-reveal="i">
          <TileCard :title="s.label" :to="s.to" heading :vw="22" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 24px;
  color: var(--grey-text);
  font-size: var(--fs-caption);
}
.crumbs a {
  color: inherit;
  padding-block: 12px;
  margin-block: -12px;
}
.head :deep(.page-head__title) {
  font-size: clamp(32px, 4.1vw, 70px);
}
.cta {
  padding-bottom: var(--section-y);
}
.others {
  padding-bottom: var(--section-y);
}
.others__title {
  margin-bottom: clamp(24px, 2.4vw, 40px);
  color: var(--grey);
}
.others__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(12px, 1.3vw, 22px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.others__grid :deep(.tile__caption) {
  font-size: clamp(16px, 1.3vw, 22px);
}
@media (max-width: 1023px) {
  .others__grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
</style>
