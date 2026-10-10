<script setup lang="ts">
// Поиск по разделам сайта (на клиенте, без сервера)
import { mainNav, footerExtraLinks, type NavLink } from '~/data/site'

useSeoMeta({ title: 'Поиск', robots: 'noindex, follow' })

const all: NavLink[] = [...mainNav.flatMap(i => [i, ...(i.children ?? [])]), ...footerExtraLinks]
const pages = [...new Map(all.map(p => [p.to, p])).values()]

const route = useRoute()
const q = ref(String(route.query.q ?? ''))
const results = computed(() => {
  const s = q.value.trim().toLowerCase()
  return s ? pages.filter(p => p.label.toLowerCase().includes(s)) : pages
})
</script>

<template>
  <section class="search container">
    <h1 class="h1">Поиск</h1>
    <input v-model="q" type="search" class="search__input" placeholder="Что вы ищете?" aria-label="Поисковый запрос" autofocus>
    <ul class="search__list">
      <li v-for="p in results" :key="p.to">
        <NuxtLink :to="p.to">{{ p.label }}</NuxtLink>
      </li>
      <li v-if="!results.length" class="search__empty">Ничего не найдено</li>
    </ul>
  </section>
</template>

<style scoped>
.search {
  padding-block: var(--section-y);
}
.search__input {
  width: 100%;
  max-width: 700px;
  margin-top: 32px;
  padding: 16px 20px;
  font: inherit;
  font-size: 18px;
  border: 1px solid var(--grey);
}
.search__list {
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
}
.search__list li + li {
  margin-top: 12px;
}
.search__empty {
  color: var(--grey);
}
</style>
