/** Заголовок, описание и Open Graph для внутренней страницы */
export function usePageSeo(title: string, description: string, image?: string) {
  useSeoMeta({
    title,
    description,
    ogTitle: `${title} — НПП «ГКС»`,
    ogDescription: description,
    ogType: 'website',
    ogLocale: 'ru_RU',
    ogImage: image,
    twitterCard: 'summary_large_image',
  })
}
