<template>
  <div class="page">
    <a class="skip-link" href="#main">Перейти к содержимому</a>
    <AppHeader />
    <main id="main" class="page__main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.page__main {
  flex: 1;
}
</style>
