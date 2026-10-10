<template>
  <footer class="footer">
    <div class="container footer__inner">
      <span>© {{ new Date().getFullYear() }} НПП ГКС</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: 32px 0;
  font-size: 0.875rem;
  color: var(--color-muted);
}
</style>
