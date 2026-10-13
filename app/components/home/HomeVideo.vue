<!-- Видео о компании с собственными контролами (play/pause, прогресс, время, звук).
     Постер — обычная адаптивная картинка (WebP + srcset) поверх видео: <video poster> не умеет
     отдавать уменьшенные версии, а это самый крупный элемент первого экрана на телефонах (LCP) -->
<script setup lang="ts">
const props = defineProps<{ src?: string, poster?: string }>()

const video = ref<HTMLVideoElement>()
const playing = ref(false)
const muted = ref(true)
const current = ref(0)
const duration = ref(0)

const progress = computed(() => (duration.value ? (current.value / duration.value) * 100 : 0))
const time = computed(() => {
  const s = Math.floor(current.value)
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
})

function toggle() {
  const v = video.value
  if (!v || !props.src) return
  if (v.paused) v.play()
  else v.pause()
}
function seek(e: MouseEvent) {
  const v = video.value
  if (!v || !duration.value) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  v.currentTime = ((e.clientX - rect.left) / rect.width) * duration.value
}
</script>

<template>
  <section class="video" aria-label="Видео о компании">
    <video
      ref="video"
      class="video__media"
      :src="src"
      :muted="muted"
      playsinline
      preload="none"
      @play="playing = true"
      @pause="playing = false"
      @timeupdate="current = video!.currentTime"
      @loadedmetadata="duration = video!.duration"
    />
    <MediaImage v-if="poster" v-show="!playing && !current" :src="poster" alt="" class="video__poster" eager />
    <div v-else class="video__placeholder" aria-hidden="true" />

    <div class="video__bar">
      <div class="container video__controls">
        <button type="button" class="video__btn" :aria-label="playing ? 'Пауза' : 'Воспроизвести'" @click="toggle">
          <svg v-if="playing" width="26" height="26" viewBox="0 0 26 26" fill="#fff"><rect x="5" y="3" width="5" height="20" /><rect x="16" y="3" width="5" height="20" /></svg>
          <svg v-else width="26" height="26" viewBox="0 0 26 26" fill="#fff"><path d="M6 3v20l17-10z" /></svg>
        </button>
        <div class="video__track" role="slider" aria-label="Перемотка" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100" tabindex="0" @click="seek">
          <span class="video__fill" :style="{ width: progress + '%' }" />
          <span class="video__thumb" :style="{ left: progress + '%' }" />
        </div>
        <span class="video__time">{{ time }}</span>
        <button type="button" class="video__btn" :aria-label="muted ? 'Включить звук' : 'Выключить звук'" @click="muted = !muted">
          <svg width="32" height="28" viewBox="0 0 32 28" fill="none" stroke="#fff" stroke-width="2"><path d="M2 9h6l8-6v22l-8-6H2z" fill="#fff" /><path v-if="muted" d="m21 9 9 10m0-10-9 10" /><path v-else d="M21 8a8 8 0 0 1 0 12m4-16a13 13 0 0 1 0 20" /></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video {
  position: relative;
  aspect-ratio: 1700 / 956;
  max-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: var(--black);
}
.video__media,
.video__poster,
.video__placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video__placeholder {
  background:
    radial-gradient(ellipse 30% 40% at 65% 20%, rgba(255, 180, 60, 0.35), transparent 70%),
    linear-gradient(180deg, #0b1d33 0%, #153843 55%, #0b1620 100%);
}
.video__bar {
  position: absolute;
  inset: auto 0 0;
  padding: 60px 0 20px;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0), rgba(17, 17, 17, 0.6));
}
.video__controls {
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.2vw, 20px);
}
.video__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
}
.video__track {
  position: relative;
  flex: 1;
  height: 20px;
  cursor: pointer;
}
.video__track::before,
.video__fill {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  transform: translateY(-50%);
}
.video__track::before {
  right: 0;
  background: rgba(255, 255, 255, 0.5);
}
.video__fill {
  background: var(--green);
}
.video__thumb {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--green);
  transform: translate(-50%, -50%);
}
.video__time {
  min-width: 46px;
  font-size: 14px;
  color: var(--white);
}
@media (max-width: 767px) {
  .video {
    aspect-ratio: 4 / 3;
  }
}
</style>
