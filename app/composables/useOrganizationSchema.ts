/** JSON-LD разметка организации для поисковиков. Данные дополнить из макета. */
export function useOrganizationSchema() {
  const site = useSiteConfig()
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: site.name,
          url: site.url,
        }),
      },
    ],
  })
}
