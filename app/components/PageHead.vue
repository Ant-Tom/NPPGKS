<script setup lang="ts">
// Шапка внутренней страницы: заголовок Title 1 + вводный текст (слот) + блок справа (слот aside)
defineProps<{ title: string }>()
</script>

<template>
  <section class="page-head">
    <div class="container page-head__inner">
      <div class="page-head__main">
        <h1 class="page-head__title">{{ title }}</h1>
        <div v-if="$slots.default" class="page-head__intro">
          <slot />
        </div>
      </div>
      <slot name="aside" />
    </div>
  </section>
</template>

<style scoped>
.page-head {
  padding: clamp(40px, 5.9vw, 100px) 0 clamp(40px, 4.7vw, 80px);
}
.page-head__inner {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
.page-head__title {
  font-size: var(--fs-title);
  line-height: 1.1;
  font-weight: 700;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}
.page-head__intro {
  max-width: 680px;
  margin-top: clamp(24px, 2.6vw, 44px);
}
.page-head__intro :deep(p + p) {
  margin-top: 12px;
}
@media (max-width: 1023px) {
  .page-head__inner {
    flex-direction: column;
  }
}
</style>
