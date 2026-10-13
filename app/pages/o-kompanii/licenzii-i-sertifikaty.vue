<script setup lang="ts">
import { docGroups } from '~/data/about'

usePageSeo(
  'Лицензии и сертификаты',
  'Лицензии, сертификаты систем менеджмента ISO 9001, 45001, 14001, свидетельства СРО и сертификаты партнёрства НПП «ГКС».',
)
</script>

<template>
  <div class="deco">
    <LogoBg :top="-86" />
    <PageHead title="Лицензии и сертификаты">
      <p>НПП «ГКС» обладает необходимыми лицензиями и сертификатами для выполнения полного комплекса инжиниринговых работ</p>
    </PageHead>

    <section class="container docs">
      <article v-for="g in docGroups" :key="g.title" class="group">
        <div class="group__text">
          <h2 class="h2">{{ g.title }}</h2>
          <p v-if="g.note" class="group__note">{{ g.note }}</p>
        </div>
        <div class="group__thumbs">
          <DocThumb v-for="(f, i) in g.files" :key="i" :src="f" :label="`${g.title} — документ ${i + 1}`" />
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
/* Макет: группы через 60px, у каждой 30px до тонкой серой линии (у последней линии нет);
   заголовок по центру миниатюр, миниатюры 60×60 по 8 в ряд прижаты вправо */
.docs {
  /* в макете список начинается на 40px ниже обычного (475px от верха) */
  margin-top: clamp(0px, 2.35vw, 40px);
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 3.53vw, 60px);
  padding-bottom: var(--section-y);
}
.group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px 40px;
  padding-bottom: 30px;
  border-bottom: 0.5px solid var(--grey);
}
.group:last-child {
  border-bottom: 0;
}
.group__text {
  max-width: 700px;
}
/* «обрезка» межстрочных полей: выравнивание идёт по буквам, как в макете */
.group .h2 {
  margin: -0.44em 0 -0.4em;
}
.group__note {
  margin: 22px 0 -0.54em;
  font-size: var(--fs-text);
  line-height: 1.82;
  color: var(--grey-text);
}
.group__thumbs {
  display: grid;
  grid-template-columns: repeat(8, 60px);
  direction: rtl;
  align-content: start;
  gap: 14px;
  flex-shrink: 0;
}
.group__thumbs > * {
  direction: ltr;
}
@media (max-width: 1023px) {
  .group {
    flex-direction: column;
  }
  .group__thumbs {
    grid-template-columns: repeat(auto-fill, 52px);
    direction: ltr;
    gap: 10px;
  }
}
</style>
