// v-reveal — плавное появление элемента при прокрутке (стили — в main.css).
// v-reveal="2" — задержка: номер элемента в «лесенке» (шаг 80 мс, максимум 8 шагов).
// На сервере элемент получает data-reveal, поэтому HTML сразу приходит в начальном
// состоянии и ничего не мигает. Без JS (класса .js на <html>) всё видно как обычно.

const step = (value: unknown) => (typeof value === 'number' && value > 0 ? String(Math.min(Math.round(value), 8)) : '')

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined

  const observe = (el: Element) => {
    observer ??= new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-revealed')
          observer!.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    observer.observe(el)
  }

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    getSSRProps: binding => ({ 'data-reveal': step(binding.value) }),
    mounted(el, binding) {
      el.setAttribute('data-reveal', step(binding.value))
      observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })
})
