<script setup lang="ts">
// Горизонтальная лента карточек: прокрутка свайпом, колесом, перетаскиванием мышью и клавишами.
// Как в макете, лента выходит за правый край — обрезанная карточка подсказывает, что её можно листать.
const track = ref<HTMLElement>()

// перетаскивание мышью (на тач-устройствах работает нативная прокрутка)
let drag: { x: number, left: number } | null = null
let moved = false
const dragging = ref(false)
function down(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || !track.value) return
  drag = { x: e.clientX, left: track.value.scrollLeft }
  moved = false
  dragging.value = true
}
function move(e: PointerEvent) {
  if (!drag || !track.value) return
  const dx = e.clientX - drag.x
  if (Math.abs(dx) > 4) moved = true
  track.value.scrollLeft = drag.left - dx
}
function up() {
  drag = null
  dragging.value = false
}
// не переходим по ссылке, если карточку тянули
function click(e: MouseEvent) {
  if (moved) {
    e.preventDefault()
    e.stopPropagation()
    moved = false
  }
}
</script>

<template>
  <div v-reveal="1" class="row">
    <div
      ref="track"
      class="row__track"
      :class="{ 'is-dragging': dragging }"
      tabindex="0"
      role="region"
      aria-label="Карточки — листаются по горизонтали"
      @pointerdown="down"
      @pointermove="move"
      @pointerup="up"
      @pointerleave="up"
      @click.capture="click"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.row__track {
  --edge: max(var(--gutter), calc((100vw - var(--container)) / 2));
  display: grid;
  grid-auto-flow: column;
  --gap: clamp(12px, 1.41vw, 24px);
  grid-auto-columns: calc((min(100vw - var(--edge) * 2, var(--container)) - var(--gap) * 2) / 3);
  gap: var(--gap);
  padding: 40px var(--edge);
  margin: -40px 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--edge);
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.row__track::-webkit-scrollbar {
  display: none;
}
.row__track > :deep(*) {
  scroll-snap-align: start;
}
.row__track.is-dragging {
  scroll-snap-type: none;
  cursor: grabbing;
  user-select: none;
}
@media (max-width: 1023px) {
  .row__track {
    grid-auto-columns: min(420px, 75vw);
  }
}
</style>
