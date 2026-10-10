<script setup lang="ts">
import { mainNav } from '~/data/site'

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

// раскрытый подпункт в мобильном меню
const expanded = ref<string | null>(null)
const toggle = (to: string) => (expanded.value = expanded.value === to ? null : to)

const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))

watch(open, (v) => {
  if (import.meta.client) document.documentElement.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <header class="header">
    <div class="header__bar">
      <NuxtLink to="/" class="header__logo" aria-label="НПП «ГКС» — на главную">НПП «ГКС»</NuxtLink>

      <nav id="main-nav" class="header__nav" :class="{ 'is-open': open }" aria-label="Основное меню">
        <ul class="nav">
          <li v-for="item in mainNav" :key="item.to" class="nav__item" :class="{ 'has-sub': item.children }">
            <div class="nav__row">
              <NuxtLink :to="item.to" class="nav__link" :class="{ 'is-active': isActive(item.to) }">
                {{ item.label }}
              </NuxtLink>
              <button
                v-if="item.children"
                type="button"
                class="nav__toggle"
                :aria-expanded="expanded === item.to"
                :aria-label="`Подразделы: ${item.label}`"
                @click="toggle(item.to)"
              >
                <img src="/icons/chevron.svg" alt="" width="16" height="16">
              </button>
            </div>
            <ul v-if="item.children" class="sub" :class="{ 'is-open': expanded === item.to }">
              <li v-for="child in item.children" :key="child.to">
                <NuxtLink :to="child.to" class="sub__link">{{ child.label }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <NuxtLink to="/poisk" class="header__search" aria-label="Поиск по сайту">
          <img src="/icons/search.svg" alt="" width="20" height="20">
        </NuxtLink>
        <NuxtLink to="/kontakty#feedback" class="header__cta">
          <img src="/icons/chat.svg" alt="" width="29" height="27">
          <span>Свяжитесь с нами</span>
        </NuxtLink>
        <button
          class="header__burger"
          type="button"
          :aria-expanded="open"
          aria-controls="main-nav"
          :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
          @click="open = !open"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}
.header__bar {
  display: flex;
  align-items: stretch;
  height: var(--header-h);
  padding-left: var(--gutter);
}
.header__logo {
  display: none;
  align-self: center;
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
}
.header__nav {
  display: flex;
  align-items: center;
  flex: 1;
}
.nav {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 34px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav__item {
  position: relative;
}
.nav__row {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav__link {
  font-size: 18px;
  line-height: 30px;
  text-decoration: none;
  white-space: nowrap;
}
.nav__link.is-active {
  font-weight: 700;
}
.nav__toggle {
  display: flex;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
  transition: transform 0.2s;
}
.nav__toggle[aria-expanded='true'] {
  transform: rotate(180deg);
}

/* выпадающее меню на десктопе — по наведению/фокусу */
.sub {
  position: absolute;
  top: 100%;
  left: -24px;
  min-width: 320px;
  max-width: 420px;
  margin: 0;
  padding: 20px 24px;
  list-style: none;
  background: var(--white);
  box-shadow: var(--shadow);
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
}
.has-sub:hover > .sub,
.has-sub:focus-within > .sub,
.sub.is-open {
  opacity: 1;
  visibility: visible;
  transform: none;
}
.sub li + li {
  margin-top: 14px;
}
.sub__link {
  display: block;
  font-size: 16px;
  line-height: 22px;
  text-decoration: none;
}
.sub__link:hover,
.nav__link:hover {
  color: var(--green);
}

.header__actions {
  display: flex;
  align-items: stretch;
}
.header__search {
  display: flex;
  align-items: center;
  padding: 0 clamp(16px, 2vw, 34px);
}
.header__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  width: 270px;
  background: var(--black);
  color: var(--white);
  font-weight: 700;
  font-size: 18px;
  text-decoration: none;
  transition: background 0.2s;
}
.header__cta:hover {
  background: var(--blue);
}
.header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: var(--header-h);
  padding: 0 20px;
  background: var(--black);
  border: 0;
  cursor: pointer;
}
.header__burger span {
  height: 2px;
  background: var(--white);
}

@media (max-width: 1279px) {
  .header__cta {
    width: auto;
    padding: 0 24px;
  }
}

/* планшет и мобильные: бургер + полноэкранное меню */
@media (max-width: 1023px) {
  .header {
    background: rgba(255, 255, 255, 0.85);
  }
  .header__logo {
    display: block;
    margin-right: auto;
  }
  .header__nav {
    position: fixed;
    inset: var(--header-h) 0 0;
    display: none;
    align-items: flex-start;
    padding: 24px var(--gutter) 40px;
    overflow-y: auto;
    background: var(--white);
  }
  .header__nav.is-open {
    display: block;
  }
  .nav {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
  .nav__item {
    border-bottom: 0.5px solid var(--grey);
  }
  .nav__row {
    justify-content: space-between;
  }
  .nav__link {
    flex: 1;
    padding: 14px 0;
    font-size: 20px;
  }
  .nav__toggle {
    padding: 14px;
  }
  .sub {
    position: static;
    display: none;
    min-width: 0;
    max-width: none;
    padding: 0 0 16px 16px;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
  }
  .has-sub:hover > .sub,
  .has-sub:focus-within > .sub {
    display: none;
  }
  .sub.is-open,
  .has-sub > .sub.is-open {
    display: block;
  }
  .header__cta {
    padding: 0 16px;
  }
  .header__burger {
    display: flex;
  }
}

@media (max-width: 639px) {
  .header__cta span {
    display: none;
  }
  .header__search {
    padding: 0 16px;
  }
}
</style>
