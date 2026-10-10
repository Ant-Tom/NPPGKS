import { company, offices } from '~/data/site'

/** JSON-LD разметка организации (адреса, телефоны) для поисковиков */
export function useOrganizationSchema() {
  const site = useSiteConfig()
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: company.legalName,
          alternateName: company.name,
          url: site.url,
          email: company.email,
          taxID: company.inn,
          address: offices.map(o => ({
            '@type': 'PostalAddress',
            streetAddress: o.street,
            addressLocality: o.city,
            postalCode: o.postalCode,
            addressRegion: 'Республика Татарстан',
            addressCountry: 'RU',
          })),
          contactPoint: offices.flatMap(o =>
            o.phones.map(telephone => ({ '@type': 'ContactPoint', telephone, contactType: 'customer service', areaServed: 'RU' })),
          ),
        }),
      },
    ],
  })
}
