<script setup lang="ts">
import { partners, customers } from '~/data/about'

usePageSeo(
  'Партнёры и заказчики',
  'Партнёры НПП «ГКС» — лидеры промышленной автоматизации. Заказчики — НОВАТЭК, СИБУР, ЛУКОЙЛ, Газпром, Транснефть, Татнефть, Роснефть и другие.',
)
</script>

<template>
  <div>
    <PageHead title="Партнёры">
      <p>
        НПП «ГКС» на протяжении долгих лет поддерживает партнёрские отношения с ведущими лидерами в области промышленной
        автоматизации и имеет соответствующие сертификаты
      </p>
    </PageHead>
    <LogoGrid :logos="partners" class="partners" />

    <section class="customers">
      <PageHead title="Заказчики">
        <p>
          НПП «ГКС» имеет многолетний опыт реализации проектов для ведущих предприятий нефтяной, газовой и химической
          отраслей промышленности.
        </p>
        <p>Наше предприятие старается поддерживать результативное и долгосрочное сотрудничество с заказчиками.</p>
      </PageHead>
      <LogoGrid :logos="customers" />
    </section>
  </div>
</template>

<style scoped>
/* макет: сетка партнёров с 514px, заголовок «Заказчики» через 151px после неё */
.partners {
  margin-top: clamp(0px, 2.29vw, 39px);
}
.customers {
  margin-top: clamp(32px, 6.41vw, 109px);
}
.customers :deep(.page-head__intro) {
  max-width: 734px;
}
.customers :deep(.page-head__title) {
  font-size: var(--fs-title);
}
</style>
