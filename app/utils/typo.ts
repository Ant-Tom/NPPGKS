// Типограф: неразрывные пробелы, как в макете — короткие слова не остаются в конце строки,
// тире не начинает строку, число не отрывается от единицы измерения.
// Статический текст шаблонов обрабатывается при сборке (nuxt.config → nodeTransforms),
// данные из app/data — через typoDeep.

const NBSP = ' '
const SHORT = /(^|[\s(«"„—])([а-яёА-ЯЁa-zA-Z]{1,2}|№)[ \t\r\n]+(?=\S)/g
const DASH = /[ \t\r\n]+—/g
const NUMBER = /(\d)[ \t\r\n]+(?=(?:г\.|гг\.|км|м²|м|кг|мм|тыс\.|млн|%|₽|лет|год|[а-яё]))/g
const COMPANY = /(НПП|ООО|ГК|ТД)[ \t\r\n]+(?=«)/g
const ABBR = /(^|[\s(])(ул\.|д\.|г\.|пр\.|им\.|т\.|стр\.)[ \t\r\n]+(?=\S)/g

export function typo<T>(value: T): T {
  if (typeof value !== 'string' || !/\S/.test(value)) return value
  let s: string = value
  // подряд идущие короткие слова («и в», «а также») — несколько проходов
  for (let i = 0; i < 3; i++) {
    const next = s.replace(SHORT, `$1$2${NBSP}`)
    if (next === s) break
    s = next
  }
  return s
    .replace(DASH, `${NBSP}—`)
    .replace(NUMBER, `$1${NBSP}`)
    .replace(COMPANY, `$1${NBSP}`)
    .replace(ABBR, `$1$2${NBSP}`) as T
}

// ключи, в которых лежат адреса и служебные значения — их не трогаем
const SKIP = new Set(['to', 'href', 'src', 'image', 'cover', 'banner', 'icon', 'slug', 'file', 'hh', 'city', 'cls', 'layout', 'glow', 'year'])

export function typoDeep<T>(value: T): T {
  if (typeof value === 'string') return typo(value)
  if (Array.isArray(value)) return value.map(typoDeep) as T
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = SKIP.has(k) ? v : typoDeep(v)
    return out as T
  }
  return value
}
