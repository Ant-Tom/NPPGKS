// https://nuxt.com/docs/api/configuration/nuxt-config
import { typo } from './app/utils/typo'

// Типограф для статического текста шаблонов: применяется при компиляции,
// поэтому серверный и клиентский HTML совпадают (без расхождений гидратации)
const typoTransform = (node: { type: number, content?: unknown }) => {
  if (node.type === 2 /* NodeTypes.TEXT */ && typeof node.content === 'string') node.content = typo(node.content)
}

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },

  modules: ['@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  css: ['~/assets/css/main.css'],

  // Адрес сайта для canonical / sitemap / og:url (переопределяется NUXT_PUBLIC_SITE_URL)
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.ru',
    name: 'НПП ГКС',
    defaultLocale: 'ru',
  },

  runtimeConfig: {
    public: {
      // Куда отправляются формы (резюме, обратная связь) — NUXT_PUBLIC_FORM_ENDPOINT
      formEndpoint: '',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s — НПП ГКС',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // оба начертания шрифта — сразу в предзагрузку, чтобы не было «прыжка» текста
        { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: '/fonts/pt-sans-400.woff2' },
        { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: '/fonts/pt-sans-700.woff2' },
      ],
      meta: [{ name: 'theme-color', content: '#111111' }],
      // признак включённого JS — от него зависят анимации появления (v-reveal)
      script: [{ innerHTML: "document.documentElement.classList.add('js')", tagPosition: 'head' }],
    },
    // плавная смена страниц
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // Все страницы пререндерятся в статический HTML: максимум скорости и индексации
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      // TODO: вернуть true, когда будут свёрстаны все разделы из меню (сейчас часть ссылок ведёт на 404)
      failOnError: false,
    },
    compressPublicAssets: true,
  },

  routeRules: {
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // шрифты, иконки и картинки меняются редко — кешируем в браузере на неделю
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/icons/**': { headers: { 'cache-control': 'public, max-age=604800' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=604800' } },
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=604800' } },
  },

  image: {
    format: ['webp'],
    quality: 80,
    screens: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1440, '2xl': 1920 },
  },


  vite: {
    vue: { template: { compilerOptions: { nodeTransforms: [typoTransform] } } },
  },

  experimental: { payloadExtraction: true },
})
