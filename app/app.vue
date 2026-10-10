<script setup lang="ts">
// canonical для каждой страницы: адрес сайта + текущий путь
const site = useSiteConfig()
const route = useRoute()
useHead({
  link: [{ rel: 'canonical', href: () => new URL(route.path, site.url).href }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
