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
- Скорость: пререндер всех страниц, `@nuxt/image` (AVIF/WebP, адаптивные размеры, lazy), шрифт PT Sans лежит локально в `public/fonts` (без внешних запросов), долгий кеш для `/_nuxt/*`, Яндекс.Карта грузится лениво.
- Адаптивность: макет 1700px, поля и типографика плавно сжимаются (`clamp`), сетки перестраиваются на 1279/1023/767px, мобильное меню.

## Дизайн-система (из Figma)

Цвета: White `#FFFFFF`, Black `#111111`, Green `#A7AF39`, Grey `#808285`, Purple `#9B3393`, Blue `#153843`.
Шрифт PT Sans: Title 1 100/130 Bold, Header 1 46/60 Regular, Header 2 30/46 Bold, Text 22/40, Text 3 18/30, Caption 14/20.
Всё это — CSS-переменные в `app/assets/css/main.css`.

## Готово / осталось

- [x] Шапка с выпадающими меню, футер, кнопки, заголовки секций
- [x] Главная страница
- [ ] Фото и видео с главной (сейчас нейтральные заглушки — `MediaImage` без `src`)
- [ ] О компании (5 стр.), Продукция (+ ~40 карточек), Услуги (+5), Новости (+10), Карьера, Контакты

Пока не все разделы свёрстаны, в `nuxt.config.ts` стоит `prerender.failOnError: false`.

## Структура

```
app/
  assets/css/main.css   дизайн-токены и базовые стили
  components/           AppHeader, AppFooter, AppButton, SectionTitle, MediaImage, OfficesMap
  components/home/      секции главной
  data/site.ts          меню, услуги, категории продукции, контакты офисов
  layouts/default.vue
  pages/                страницы (маршруты)
public/                 шрифты, иконки (SVG из макета), изображения
```
