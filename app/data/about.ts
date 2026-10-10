// Контент раздела «О компании»: документы, партнёры, заказчики, отзывы.
// Сканы документов и отзывов кладутся в /public/images/docs и /public/images/reviews —
// пока файлов нет, на их месте показываются заглушки.

export interface DocGroup {
  title: string
  note?: string
  /** пути к сканам; число элементов = число миниатюр в макете */
  files: (string | undefined)[]
}

const empty = (n: number) => Array.from({ length: n }, () => undefined)

export const docGroups: DocGroup[] = [
  { title: 'Политика компании', files: empty(1) },
  { title: 'Сертификаты соответствия системы менеджмента', files: empty(3) },
  { title: 'Свидетельства', files: empty(3) },
  { title: 'Лицензии', files: empty(3) },
  { title: 'Сертификаты партнёрства', files: empty(13) },
  {
    title: 'Заключения оценки соответствия INTI по производственной площадке:',
    note: 'РФ, Республика Татарстан, г. Бугульма, ул. Нефтяников, д. 3 «А»',
    files: empty(5),
  },
  { title: 'Справка о принадлежности домена', files: empty(2) },
  {
    title: 'Свидетельство СРО',
    note: 'Некоммерческое партнёрство «Союз проектировщиков нефтегазовой отрасли» в области проектирования, в том числе в качестве генерального проектировщика особо опасных и технически сложных объектов капитального строительства',
    files: empty(13),
  },
  {
    title: 'Свидетельство СРО НРП',
    note: '«Содружество строителей РТ» в области капитального строительства, в том числе в качестве генерального подрядчика на особо опасных и технически сложных объектах капитального строительства',
    files: empty(13),
  },
]

export interface Logo {
  name: string
  file: string
}

const logo = (name: string, file: string): Logo => ({ name, file: `/images/logos/${file}.png` })

export const partners: Logo[] = [
  logo('Phase Dynamics', 'phase-dynamics'),
  logo('REGLAB', 'reglab'),
  logo('Pascal Solutions', 'pascal-solutions'),
  logo('Группа компаний «Метран»', 'metran'),
  logo('АСТРА', 'astra'),
  logo('Атомик Софт', 'atomik-soft'),
  logo('СибКом Цифра', 'sibkom-cifra'),
  logo('Kaspersky', 'kaspersky'),
  logo('Манотом', 'manotom'),
  logo('Systeme Electric', 'systeme-electric'),
  logo('Klemsan', 'klemsan'),
  logo('ТРЭИ', 'trei'),
  logo('Базис', 'bazis'),
  logo('NERPA', 'nerpa'),
]

export const customers: Logo[] = [
  logo('НОВАТЭК', 'novatek'),
  logo('Арктикгаз', 'arktikgaz'),
  logo('Ямал СПГ', 'yamal-spg'),
  logo('Арктик СПГ 2', 'arktik-spg-2'),
  logo('СИБУР', 'sibur'),
  logo('ЛУКОЙЛ', 'lukoil'),
  logo('Транснефть', 'transneft'),
  logo('Нортгаз', 'nortgaz'),
  logo('Газпром', 'gazprom'),
  logo('РУСАЛ', 'rusal'),
  logo('Татнефть', 'tatneft'),
  logo('ТАИФ', 'taif'),
  logo('Ачимгаз', 'achimgaz'),
  logo('Криогаз', 'kriogaz'),
  logo('ЕвроХим', 'evrohim'),
  logo('ТАНЕКО', 'taneco'),
  logo('Норникель', 'nornikel'),
  logo('Газпром нефть', 'gazprom-neft'),
  logo('Полюс', 'polyus'),
  logo('ПАО «НК «Роснефть»', 'rosneft'),
]

export interface Review {
  company: string
  year: string
  file?: string
}

export const reviews: Review[] = [
  { company: 'АО НПП «Компрессор»', year: '' }, // TODO: год в макете не указан («? г.»)
  { company: 'ООО «РУСАЛ ИТЦ»', year: '2024' },
  { company: 'ООО «Криогаз-Высоцк»', year: '2024' },
  { company: 'ООО «Криогаз-Высоцк»', year: '2024' },
]
