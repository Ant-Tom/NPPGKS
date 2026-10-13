<script setup lang="ts">
const description =
  'НПП «ГКС» — инжиниринговая компания: системы измерений количества и показателей качества, блочно-комплектное оборудование, автоматизация технологических процессов. Более 2000 проектов «под ключ».'

useSeoMeta({
  title: 'Инжиниринг как искусство',
  description,
  ogTitle: 'НПП «ГКС» — инжиниринг как искусство',
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'ru_RU',
  twitterCard: 'summary_large_image',
})

useOrganizationSchema()
</script>

<template>
  <div>
    <HomeHero />
    <!-- TODO: сам ролик в макет не входит — положить в /public/video и передать :src -->
    <HomeVideo poster="/images/home/video-poster.jpg" />
    <!-- фоновый логотип из макета: начинается в блоке «О компании» и уходит под «Преимущества» -->
    <div class="deco">
      <HomeAbout />
      <LogoBg :top="77" class="home-logo" />
      <HomeProducts class="home-layer" />
      <HomeAdvantages class="home-layer" />
    </div>
    <HomeFeedback />
    <OfficesMap />
  </div>
</template>

<style scoped>
/* логотип поверх тёмного «О компании», но под «Продукцией» и «Преимуществами» — как в макете */
.home-logo {
  z-index: 0;
}
.home-layer {
  position: relative;
  z-index: 1;
}
</style>
