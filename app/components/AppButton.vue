<script setup lang="ts">
// Зелёная кнопка из UI-kit: 270×60, PT Sans Bold 18, стрелка вправо
withDefaults(defineProps<{ to?: string, type?: 'button' | 'submit', arrow?: boolean }>(), { arrow: true, type: 'button' })
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="btn">
    <slot />
    <img v-if="arrow" src="/icons/chevron-right.svg" alt="" width="12" height="22">
  </NuxtLink>
  <button v-else :type="type" class="btn">
    <slot />
    <img v-if="arrow" src="/icons/chevron-right.svg" alt="" width="12" height="22">
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-width: 270px;
  height: 60px;
  padding: 0 32px;
  background: var(--green);
  color: var(--white);
  font-weight: 700;
  font-size: 18px;
  text-decoration: none;
  border: 0;
  cursor: pointer;
  filter: drop-shadow(0 0 20px rgba(27, 28, 33, 0.2));
  transition: background 0.2s;
}
.btn:hover {
  background: #949b2f;
}
.btn img {
  transition: transform 0.2s;
}
.btn:hover img {
  transform: translateX(4px);
}
@media (max-width: 479px) {
  .btn {
    width: 100%;
    min-width: 0;
  }
}
</style>
