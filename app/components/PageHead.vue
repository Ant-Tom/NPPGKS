<script setup lang="ts">
// Шапка внутренней страницы: заголовок Title 1 + вводный текст (слот) + блок справа (слот aside).
// Слот note — серый текст во второй колонке напротив вводного (Услуги, Контакты, Карьера).
// introWidth — ширина вводного текста из макета (обычно 680px)
withDefaults(defineProps<{ title: string, introWidth?: number }>(), { introWidth: 680 })
</script>

<template>
  <section class="page-head" :class="{ 'page-head--intro': $slots.default }" :style="{ '--intro-w': `${introWidth}px` }">
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
/* Отступы из макета (1700px): строка заголовка начинается через 42px после шапки,
   вводный текст — через 29px после заголовка, контент — через 68px после текста.
   Без вводного текста контент начинается через 52px после заголовка (310px от верха) */
.page-head {
  padding: clamp(24px, 2.47vw, 42px) 0 clamp(28px, 3.06vw, 52px);
}
.page-head--intro {
  padding-bottom: clamp(32px, 4vw, 68px);
}
.page-head__inner {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
.page-head__title {
  font-size: var(--fs-title);
  line-height: 1.3;
  font-weight: 700;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}
.page-head__intro {
  max-width: var(--intro-w, 680px);
  margin-top: clamp(16px, 1.7vw, 29px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.page-head__main {
  flex: 1;
}
.page-head__cols {
  display: grid;
  grid-template-columns: minmax(0, var(--intro-w, 680px)) minmax(0, 680px);
  justify-content: space-between;
  gap: 24px clamp(32px, 5.06vw, 86px);
  margin-top: clamp(16px, 1.7vw, 29px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.page-head__cols .page-head__intro {
  margin-top: 0;
}
.page-head__note {
  max-width: 680px;
  color: var(--grey-text);
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
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
