<script setup lang="ts">
// Модальная панель во всю высоту экрана (тёмная, как «Анкета» в макете).
// Нативный <dialog>: Esc, фокус внутри и подложка — силами браузера.
const open = defineModel<boolean>({ default: false })
const dialog = ref<HTMLDialogElement>()

watch(open, (v) => {
  const d = dialog.value
  if (!d) return
  if (v && !d.open) d.showModal()
  if (!v && d.open) d.close()
  document.documentElement.style.overflow = v ? 'hidden' : ''
})

// клик по подложке (вне панели) закрывает окно
function backdrop(e: MouseEvent) {
  if (e.target === dialog.value) open.value = false
}
onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.style.overflow = ''
})
</script>

<template>
  <dialog ref="dialog" class="modal" @close="open = false" @click="backdrop">
    <div class="modal__panel">
      <button type="button" class="modal__close" aria-label="Закрыть" @click="open = false">
        <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m2 2 14 14M16 2 2 16" /></svg>
      </button>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  width: min(726px, 100%);
  max-width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0 auto;
  padding: 0;
  border: 0;
  background: #1f1f1f;
  color: var(--white);
}
.modal::backdrop {
  background: rgba(17, 17, 17, 0.6);
}
.modal[open] {
  animation: modal-in 0.25s ease-out;
}
@keyframes modal-in {
  from { opacity: 0; transform: translateY(16px); }
}
.modal__panel {
  position: relative;
  min-height: 100%;
  padding: clamp(40px, 3.5vw, 60px) clamp(20px, 3.5vw, 62px) 48px;
}
.modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  padding: 6px;
  color: rgba(255, 255, 255, 0.7);
  background: none;
  border: 0;
  cursor: pointer;
}
.modal__close:hover {
  color: var(--white);
}
</style>
