<script setup lang="ts">
// TODO: пункты меню взять из макета Figma
const nav = [{ to: '/', label: 'Главная' }]

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo" aria-label="НПП ГКС — на главную">НПП ГКС</NuxtLink>

      <button
        class="header__burger"
        type="button"
        :aria-expanded="open"
        aria-controls="main-nav"
        aria-label="Меню"
        @click="open = !open"
      >
        <span /><span /><span />
      </button>

      <nav id="main-nav" class="header__nav" :class="{ 'is-open': open }" aria-label="Основное меню">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="header__link">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-h);
}
.header__logo {
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  color: inherit;
}
.header__nav {
  display: flex;
  gap: 32px;
}
.header__link {
  color: inherit;
  text-decoration: none;
}
.header__link.router-link-exact-active {
  color: var(--color-accent);
}
.header__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: 0;
  cursor: pointer;
}
.header__burger span {
  width: 24px;
  height: 2px;
  background: currentColor;
}

@media (max-width: 767px) {
  .header__burger {
    display: flex;
  }
  .header__nav {
    position: absolute;
    inset: var(--header-h) 0 auto;
    flex-direction: column;
    gap: 0;
    padding: 8px var(--gutter) 16px;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    display: none;
  }
  .header__nav.is-open {
    display: flex;
  }
  .header__link {
    padding: 12px 0;
  }
}
</style>
