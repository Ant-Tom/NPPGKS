<script setup lang="ts">
// Декоративный контур логотипа на фоне (компонент «Logo BG» из макета: 1690×2304, #D1D2D9, 10%).
// Кладётся внутрь блока с position: relative; isolation: isolate — и оказывается под его содержимым.
// top/left — смещение в px макета (1700px), на узких экранах масштабируется вместе с шириной.
withDefaults(defineProps<{ top?: number, left?: number }>(), { top: 0, left: 5 })
</script>

<template>
  <img
    src="/images/logo-bg.svg"
    alt=""
    aria-hidden="true"
    class="logo-bg"
    :style="{ '--x': left, '--y': top }"
    width="1690"
    height="2304"
    loading="lazy"
    decoding="async"
  >
</template>

<style scoped>
.logo-bg {
  position: absolute;
  z-index: -1;
  top: calc(var(--y) * min(1px, 100vw / 1700));
  left: calc(var(--x) * min(1px, 100vw / 1700));
  width: min(99.4vw, 1690px);
  max-width: none;
  height: auto;
  opacity: 0.1;
  pointer-events: none;
  user-select: none;
  will-change: transform;
}
@media (min-width: 1700px) {
  /* на широких экранах макет центрируется — вместе с ним и логотип */
  .logo-bg {
    left: calc(50% - 850px + var(--x) * 1px);
  }
}
</style>
