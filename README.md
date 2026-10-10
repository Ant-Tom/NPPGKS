# НПП ГКС — сайт

Nuxt 4, статическая генерация (SSG) для скорости и SEO.

## Команды

```bash
npm install
npm run dev       # http://localhost:3000
npm run generate  # статический сайт в .output/public — залить на любой хостинг
npm run build     # SSR-сборка (Node-сервер в .output/server)
```

Адрес сайта задаётся переменной `NUXT_PUBLIC_SITE_URL` (см. `.env.example`) — из неё строятся canonical, `sitemap.xml` и `robots.txt`.

## Что уже настроено

- SEO: `useSeoMeta` (title/description/Open Graph), canonical, JSON-LD Organization, `sitemap.xml`, `robots.txt`, `lang="ru"`.
- Скорость: пререндер всех страниц, `@nuxt/image` (AVIF/WebP, адаптивные размеры), `@nuxt/fonts` (самохостинг шрифтов, кириллица), долгий кеш для `/_nuxt/*`.
- Адаптивность: токены отступов/контейнера в `app/assets/css/main.css`, fluid-типографика, мобильное меню.

## Структура

```
app/
  assets/css/main.css   дизайн-токены и базовые стили
  components/           AppHeader, AppFooter, блоки страниц
  layouts/default.vue
  pages/                страницы (маршруты)
public/                 favicon, статические файлы
```
