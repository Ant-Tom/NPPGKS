<script setup lang="ts">
// Шапка внутренней страницы: заголовок Title 1 + вводный текст (слот) + блок справа (слот aside).
// Слот note — серый текст во второй колонке напротив вводного (Услуги, Контакты, Карьера).
defineProps<{ title: string }>()
</script>

<template>
  <section class="page-head">
    <div class="container page-head__inner">
      <div class="page-head__main">
        <h1 v-reveal class="page-head__title">{{ title }}</h1>
        <div v-if="$slots.note" v-reveal="1" class="page-head__cols">
          <div class="page-head__intro">
            <slot />
          </div>
          <div class="page-head__note">
            <slot name="note" />
          </div>
        </div>
        <div v-else-if="$slots.default" v-reveal="1" class="page-head__intro">
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
.page-head__main {
  flex: 1;
}
.page-head__cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px clamp(40px, 8.2vw, 140px);
  margin-top: clamp(24px, 2.6vw, 44px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.page-head__cols .page-head__intro {
  margin-top: 0;
}
.page-head__note {
  max-width: 680px;
  color: var(--grey);
}
.page-head__intro :deep(p + p),
.page-head__note :deep(p + p) {
  margin-top: 12px;
}
@media (max-width: 1023px) {
  .page-head__inner {
    flex-direction: column;
  }
  .page-head__cols {
    grid-template-columns: 1fr;
  }
}
</style>
