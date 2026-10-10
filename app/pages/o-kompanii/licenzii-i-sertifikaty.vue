<script setup lang="ts">
import { docGroups } from '~/data/about'

usePageSeo(
  'Лицензии и сертификаты',
  'Лицензии, сертификаты систем менеджмента ISO 9001, 45001, 14001, свидетельства СРО и сертификаты партнёрства НПП «ГКС».',
)
</script>

<template>
  <div>
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
.docs {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: var(--section-y);
}
.group {
  display: flex;
  justify-content: space-between;
  gap: 24px 40px;
  padding-bottom: 14px;
  border-bottom: 1px solid #d1d2d9;
  box-shadow: inset 0 1px 0 var(--light);
}
.group__text {
  max-width: 680px;
}
.group__note {
  margin-top: 16px;
  font-size: var(--fs-text3);
  line-height: 1.67;
  color: var(--grey);
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
