<script setup lang="ts">
// TODO: тексты и мета-описание взять из макета Figma
useSeoMeta({
  title: 'Главная',
  description: 'НПП ГКС — официальный сайт.',
  ogTitle: 'НПП ГКС',
  ogDescription: 'НПП ГКС — официальный сайт.',
  ogType: 'website',
  ogLocale: 'ru_RU',
  twitterCard: 'summary_large_image',
})

useOrganizationSchema()
</script>

<template>
  <section class="section">
    <div class="container">
      <h1>НПП ГКС</h1>
    </div>
  </section>
</template>
