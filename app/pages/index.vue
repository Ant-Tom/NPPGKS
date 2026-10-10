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
    <!-- TODO: видео и постер из макета (Main Frame) — положить в /public/video и /public/images/home -->
    <HomeVideo />
    <HomeAbout />
    <HomeProducts />
    <HomeAdvantages />
    <HomeFeedback />
    <OfficesMap />
  </div>
</template>
