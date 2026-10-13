<script setup lang="ts">
// Карта офисов: Яндекс.Карта + карточка выбранного офиса, как в макете.
// iframe подключается, только когда карта появляется на экране: чужие скрипты и cookies
// не тормозят загрузку страницы, пока до карты не доскроллили.
// plain — только карта с метками, без вкладок и карточки (страница «Контакты»).
import { offices, telHref } from '~/data/site'

defineProps<{ plain?: boolean }>()

const active = ref(1) // в макете открыт филиал в Бугульме
const office = computed(() => offices[active.value]!)
const closed = ref(false)

const src = computed(() => {
  const pts = offices.map(o => `${o.coords[1]},${o.coords[0]},pm2vvm`).join('~')
  const [lat, lon] = [54.9, 51.2]
  return `https://yandex.ru/map-widget/v1/?ll=${lon},${lat}&z=7&pt=${pts}`
})

const root = ref<HTMLElement>()
const visible = ref(false)
let io: IntersectionObserver | undefined
onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) return (visible.value = true)
  io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      visible.value = true
      io?.disconnect()
    }
  }, { rootMargin: '200px 0px' })
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section ref="root" class="map" :class="{ 'map--plain': plain }" aria-label="Офисы на карте">
    <iframe v-if="visible" class="map__frame" :src="src" title="НПП «ГКС» на карте" loading="lazy" allowfullscreen />

    <div v-if="!plain" class="map__tabs" role="tablist" aria-label="Офисы">
      <button
        v-for="(o, i) in offices"
        :key="o.city"
        type="button"
        role="tab"
        :aria-selected="active === i"
        class="map__tab"
        @click="active = i; closed = false"
      >
        {{ o.city }}
      </button>
    </div>

    <div v-if="!plain && !closed" class="map__card">
      <button type="button" class="map__close" aria-label="Закрыть" @click="closed = true">×</button>
      <p class="map__title">{{ office.title.replace(/ \(.*\)/, '') }} в г. {{ office.city }}, {{ office.street }}, {{ office.postalCode }}</p>
      <p class="map__label">Телефон</p>
      <a v-for="p in office.phones" :key="p" :href="telHref(p)" class="map__phone">{{ p }}</a>
      <NuxtLink to="/kontakty#feedback" class="map__btn">Написать сообщение</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.map {
  position: relative;
  height: 488px;
  background: #e8e4d8;
}
.map--plain {
  height: clamp(360px, 47.8vw, 812px);
}
.map__frame {
  width: 100%;
  height: 100%;
  border: 0;
}
.map__tabs {
  position: absolute;
  top: 16px;
  left: var(--gutter);
  display: flex;
  gap: 8px;
}
.map__tab {
  min-height: 44px;
  padding: 6px 16px;
  font-size: 14px;
  background: var(--white);
  border: 0;
  box-shadow: var(--shadow);
  cursor: pointer;
}
.map__tab[aria-selected='true'] {
  color: var(--white);
  background: var(--purple);
}
.map__card {
  position: absolute;
  top: 66px;
  right: var(--gutter);
  width: 411px;
  max-width: calc(100% - 32px);
  padding: 40px 30px 30px;
  color: var(--white);
  background: var(--black);
}
.map__close {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  font-size: 24px;
  line-height: 1;
  color: var(--grey);
  background: none;
  border: 0;
  cursor: pointer;
}
.map__title {
  font-weight: 700;
  font-size: 22px;
  line-height: 34px;
}
.map__label {
  margin-top: 16px;
  font-size: 14px;
  color: var(--grey);
}
.map__phone {
  display: block;
  font-size: 18px;
  line-height: 30px;
  text-decoration: none;
}
@media (pointer: coarse) {
  /* на сенсорных экранах — высота строки под палец */
  .map__phone {
    line-height: 44px;
  }
}
.map__btn {
  display: inline-block;
  margin-top: 24px;
  padding: 14px 24px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid var(--grey);
  transition: border-color 0.2s;
}
.map__btn:hover {
  border-color: var(--white);
}
@media (max-width: 767px) {
  .map {
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .map__frame {
    height: 320px;
  }
  .map__card {
    position: static;
    width: auto;
    max-width: none;
  }
}
</style>
