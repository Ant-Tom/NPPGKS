<script setup lang="ts">
import { services } from '~/data/site'

usePageSeo(
  'Услуги',
  'Услуги НПП «ГКС»: HAZOP и SIL, пусконаладочные работы, разработка проектной и рабочей документации, сервисное и метрологическое обслуживание, электротехническая лаборатория.',
)
</script>

<template>
  <div class="deco">
    <LogoBg :top="-86" />
    <PageHead title="Услуги" :intro-width="734">
      <p>
        Специализируемся на услугах различных направлений — от проектирования инженерных систем и монтажа
        металлоконструкций до аренды спецтехники и поставок медицинского оборудования.
      </p>
      <template #note>
        <p>
          Хотите узнать подробнее об условиях сотрудничества? Свяжитесь с нами по почте или телефону.
          Проконсультируем, ответим на вопросы и подготовим индивидуальные условия сотрудничества
        </p>
      </template>
    </PageHead>

    <!-- TODO: фото услуг в макете пока не заданы (заглушки) — добавить поле image в data/site.ts -->
    <section class="container list">
      <ul class="list__grid">
        <li v-for="(s, i) in services" :key="s.to" v-reveal="i % 3">
          <TileCard :title="s.label" :to="s.to" heading tag="h2" />
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(12px, 1.41vw, 24px);
  margin: 0;
  padding: 0;
  list-style: none;
}
@media (max-width: 1023px) {
  .list__grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
@media (max-width: 639px) {
  .list__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
