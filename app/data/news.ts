// Новости (макет «Новости»): заголовок, фото и ширина карточки в сетке.
// Текстов и дат новостей в макете нет, поэтому отдельных страниц новостей пока нет.
// TODO: добавить дату, текст и slug, когда появится контент, и сделать pages/novosti/[slug].vue

export interface NewsItem {
  title: string
  image?: string
  /** карточка на две колонки */
  wide?: boolean
}

const img = (name: string) => `/images/news/${name}.jpg`

export const news: NewsItem[] = [
  { title: 'НПП «ГКС» прошла аудит ПАО «Транснефть»', image: img('transneft-audit'), wide: true },
  { title: 'Анализаторы производства НПП «ГКС»', image: img('analizatory') },
  { title: 'Лучший метролог 2024 г.' }, // фото в макете нет
  { title: 'Казанский национальный полумарафон 2024', image: img('polumarafon-2024') },
  { title: 'С днём знаний!', image: img('den-znanij') },
  { title: 'НПП «ГКС» покорило волны!', image: img('regata') },
  { title: 'Забег «Ночная Казань» 2024 г.', image: img('nochnaya-kazan-2024') },
  { title: 'Первое собрание совета молодёжи предприятий.', image: img('sovet-molodezhi') },
  { title: 'Мечты должны исполняться!', image: img('mechty') },
  { title: 'Кубок НПП «ГКС» по мини-футболу — 2023г.', image: img('kubok-mini-futbol-2023'), wide: true },
]
