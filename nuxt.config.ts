// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },

  modules: ['@nuxt/image', '@nuxt/fonts', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  css: ['~/assets/css/main.css'],

  // Адрес сайта для canonical / sitemap / og:url (переопределяется NUXT_PUBLIC_SITE_URL)
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.ru',
    name: 'НПП ГКС',
    defaultLocale: 'ru',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s — НПП ГКС',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#ffffff' }],
    },
  },

  // Все страницы пререндерятся в статический HTML: максимум скорости и индексации
  nitro: {
    prerender: { crawlLinks: true, routes: ['/'] },
    compressPublicAssets: true,
  },

  routeRules: {
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  image: {
    format: ['avif', 'webp'],
    quality: 80,
    screens: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1440, '2xl': 1920 },
  },

  fonts: {
    defaults: { weights: [400, 500, 600, 700], subsets: ['latin', 'cyrillic'] },
  },

  experimental: { payloadExtraction: true },
})
