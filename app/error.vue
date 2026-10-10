<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
useSeoMeta({ title: props.error.statusCode === 404 ? 'Страница не найдена' : 'Ошибка', robots: 'noindex' })
</script>

<template>
  <NuxtLayout>
    <section class="section">
      <div class="container">
        <h1>{{ error.statusCode === 404 ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
        <p><NuxtLink to="/" @click.prevent="clearError({ redirect: '/' })">На главную</NuxtLink></p>
      </div>
    </section>
  </NuxtLayout>
</template>
