<script setup lang="ts">
// Горизонтальная лента карточек: прокрутка свайпом/колесом/перетаскиванием,
// снизу — индикатор прокрутки, как в макете. Лента выходит за правый край контейнера.
const track = ref<HTMLElement>()
const thumb = reactive({ left: 0, width: 100 })
const scrollable = ref(false)

function update() {
  const el = track.value
  if (!el) return
  scrollable.value = el.scrollWidth > el.clientWidth + 4
  thumb.width = (el.clientWidth / el.scrollWidth) * 100
  thumb.left = (el.scrollLeft / el.scrollWidth) * 100
}

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

let ro: ResizeObserver | undefined
onMounted(() => {
  update()
  ro = new ResizeObserver(update)
  if (track.value) ro.observe(track.value)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div v-reveal="1" class="row">
    <div
      ref="track"
      class="row__track"
      :class="{ 'is-dragging': dragging }"
      @scroll.passive="update"
      @pointerdown="down"
      @pointermove="move"
      @pointerup="up"
      @pointerleave="up"
      @click.capture="click"
    >
      <slot />
    </div>
    <div v-show="scrollable" class="container">
      <div class="row__bar" aria-hidden="true">
        <span class="row__thumb" :style="{ left: thumb.left + '%', width: thumb.width + '%' }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.row__track {
  --edge: max(var(--gutter), calc((100vw - var(--container)) / 2));
  display: grid;
  grid-auto-flow: column;
  --gap: clamp(12px, 1.3vw, 22px);
  grid-auto-columns: calc((min(100vw - var(--edge) * 2, var(--container)) - var(--gap) * 2) / 3);
  gap: var(--gap);
  padding: 40px var(--edge);
  margin: -40px 0 -20px;
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
.row__bar {
  position: relative;
  height: 3px;
  margin-top: 20px;
  background: #d9d9d9;
}
.row__thumb {
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--grey);
  transition: left 0.1s linear;
}
</style>
