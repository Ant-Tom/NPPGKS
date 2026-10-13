// Структура сайта и контакты — единый источник для меню, футера и разметки.
import { categories, categoryUrl } from './products'
import { typoDeep } from '~/utils/typo'

export interface NavLink {
  label: string
  to: string
  children?: NavLink[]
}

export const productCategories: NavLink[] = categories.map(c => ({ label: c.label, to: categoryUrl(c) }))

export const services: NavLink[] = typoDeep([
  {
    label: 'Проведение работ по анализу опасностей и рисков (HAZOP), определению целевого уровня интегральной безопасности (SIL)',
    to: '/uslugi/hazop-sil',
  },
  { label: 'Пусконаладочные работы', to: '/uslugi/puskonaladochnye-raboty' },
  { label: 'Разработка проектной и рабочей документации', to: '/uslugi/proektnaya-dokumentaciya' },
  { label: 'Сервисное и метрологическое обслуживание', to: '/uslugi/servisnoe-obsluzhivanie' },
  { label: 'Электротехническая лаборатория', to: '/uslugi/elektrolaboratoriya' },
])

export const aboutPages: NavLink[] = [
  { label: 'Общая информация', to: '/o-kompanii' },
  { label: 'Производство', to: '/o-kompanii/proizvodstvo' },
  { label: 'Лицензии и сертификаты', to: '/o-kompanii/licenzii-i-sertifikaty' },
  { label: 'Партнеры и заказчики', to: '/o-kompanii/partnery-i-zakazchiki' },
  { label: 'Отзывы', to: '/o-kompanii/otzyvy' },
]

export const mainNav: NavLink[] = [
  { label: 'Главная', to: '/' },
  { label: 'О компании', to: '/o-kompanii', children: aboutPages },
  { label: 'Продукция', to: '/produkciya', children: productCategories },
  { label: 'Услуги', to: '/uslugi', children: services },
  { label: 'Новости', to: '/novosti' },
  { label: 'Карьера', to: '/karera' },
  { label: 'Контакты', to: '/kontakty' },
]

export const footerExtraLinks: NavLink[] = [
  { label: 'Новости', to: '/novosti' },
  { label: 'Карьера', to: '/karera' },
  { label: 'Контакты', to: '/kontakty' },
  { label: 'Политика конфиденциальности', to: '/politika-konfidencialnosti' },
  { label: 'Оценка качества', to: '/ocenka-kachestva' },
  { label: 'Сводные ведомости', to: '/svodnye-vedomosti' },
]

export interface Office {
  title: string
  city: string
  address: string
  postalCode: string
  street: string
  phones: string[]
  fax?: string
  email?: string
  /** [широта, долгота] — TODO: сверить точные координаты офисов */
  coords: [number, number]
}

export const company = {
  name: 'НПП «ГКС»',
  legalName: 'ООО НПП «ГКС»',
  inn: '1655107067',
  email: 'info@nppgks.tw1.ru',
  workHours: 'ПН–ПТ 8:00–17:00',
  // TODO: ссылки на соцсети — в макете только иконки
  socials: [
    { label: 'Telegram', icon: '/icons/tg.svg', href: '#' },
    { label: 'WhatsApp', icon: '/icons/wa.svg', href: '#' },
    { label: 'YouTube', icon: '/icons/yt.svg', href: '#' },
    { label: 'Email', icon: '/icons/mail.svg', href: 'mailto:info@nppgks.tw1.ru' },
  ],
}

export const offices: Office[] = typoDeep([
  {
    title: 'Центральный офис (г. Казань)',
    city: 'Казань',
    address: 'ул. Тази Гиззата, д. 3, г. Казань, Республика Татарстан, 420111, Россия',
    street: 'ул. Тази Гиззата, д. 3',
    postalCode: '420111',
    phones: ['+7 843 221-70-00', '+7 843 221-70-01'],
    fax: '+7 843 221-70-01',
    email: 'info@nppgks.tw1.ru',
    coords: [55.7887, 49.1063],
  },
  {
    title: 'Филиал (г. Бугульма)',
    city: 'Бугульма',
    address: 'ул. Нефтяников, д. № 3А, г. Бугульма, Республика Татарстан, 423231, Россия',
    street: 'ул. Нефтяников, д. № 3А',
    postalCode: '423231',
    phones: ['+7 (85594) 7 49 10', '+7 (85594) 7 77 74'],
    coords: [54.5378, 52.7985],
  },
])

/** tel:-ссылка из телефона в любом формате */
export const telHref = (phone: string) => 'tel:' + phone.replace(/[^\d+]/g, '')
