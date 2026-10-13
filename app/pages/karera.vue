<script setup lang="ts">
import { benefits, vacancies, vacancyCities } from '~/data/career'

usePageSeo(
  'Карьера',
  'Вакансии НПП «ГКС» в Казани и Бугульме. Карьерный рост, конкурентоспособная зарплата, социальные льготы. Заполните анкету кандидата.',
  '/images/career/hero.jpg',
)

const formOpen = ref(false)

const city = ref<string | null>(null)
const shown = computed(() => (city.value ? vacancies.filter(v => v.city === city.value) : vacancies))
</script>

<template>
  <div>
    <section class="hero">
      <MediaImage src="/images/career/hero.jpg" alt="" class="hero__bg" eager />
      <div class="container hero__inner">
        <h1 class="hero__title"><span>Присоединяйся</span> <span>к нашей команде!</span></h1>
        <p class="hero__text">
          Мы рады инициативным и вовлечённым сотрудникам, готовым решать сложные задачи и реализовывать масштабные
          проекты. Заполни анкету кандидата и стань частью команды НПП «ГКС»
        </p>
        <AppButton :arrow="false" class="hero__btn" aria-haspopup="dialog" @click="formOpen = true">
          <svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <rect x="1.5" y="3.5" width="19" height="21" rx="1.5" /><path d="M7 1.5h8v4H7zM6 12h10M6 17h10M6 21h6" />
          </svg>
          Заполнить анкету
        </AppButton>
      </div>
    </section>

    <section class="container about">
      <h2 v-reveal class="h1 about__title">Карьера</h2>
      <div v-reveal="1" class="about__cols">
        <div>
          <p>
            НПП «ГКС» современная, динамичная инжиниринговая компания, осуществляющая комплекс работ для крупных
            предприятий нефтегазовой, нефтехимической и металлургической областей.
          </p>
          <p>
            Компания ориентирована на достижение результатов и создание лучших профессиональных услуг для наших
            Заказчиков.
          </p>
        </div>
        <div class="about__note">
          <p>В нашей команде ценятся талантливые и целеустремлённые специалисты, желающие расти и развиваться вместе с нами.</p>
          <p>Карьера в НПП «ГКС» – это участие в масштабных проектах и решение интересных профессиональных задач</p>
        </div>
      </div>
    </section>

    <section class="container benefits">
      <h2 v-reveal class="h1 benefits__title">Преимущества работы у нас</h2>
      <ul class="benefits__grid">
        <li
          v-for="(b, i) in benefits"
          :key="b.title"
          v-reveal="i + 1"
          class="benefit"
          :class="`benefit--${i + 1}`"
          :style="{ backgroundImage: `url(${b.image})` }"
        >
          <h3 class="benefit__title h1">{{ b.title }}</h3>
          <p class="benefit__text">{{ b.text }}</p>
        </li>
      </ul>
    </section>

    <section class="container vacancies">
      <h2 v-reveal class="vacancies__title">Вакансии</h2>

      <div v-reveal="1" class="filters" role="group" aria-label="Город">
        <button type="button" class="filter" :aria-pressed="city === null" @click="city = null">Все города</button>
        <button
          v-for="c in vacancyCities"
          :key="c"
          type="button"
          class="filter"
          :aria-pressed="city === c"
          @click="city = c"
        >
          г. {{ c }}
        </button>
      </div>

      <ul class="list">
        <li v-for="(v, i) in shown" :key="v.title" v-reveal="i" class="vacancy">
          <details>
            <summary class="vacancy__head">
              <span>
                <span class="vacancy__title">{{ v.title }}</span>
                <span class="vacancy__city">г. {{ v.city }}</span>
              </span>
              <svg class="vacancy__chevron" width="36" height="20" viewBox="0 0 36 20" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="m2 2 16 16L34 2" /></svg>
            </summary>
            <div class="vacancy__body">
              <a v-if="v.hh" :href="v.hh" class="vacancy__hh" target="_blank" rel="noopener">
                <img src="/images/career/hh.png" alt="" width="20" height="20">
                Подробнее на hh.ru
              </a>
              <div v-if="v.duties || v.requirements" class="vacancy__cols">
                <div v-if="v.duties">
                  <h3 class="vacancy__label">Обязанности</h3>
                  <ul><li v-for="d in v.duties" :key="d">{{ d }}</li></ul>
                </div>
                <div v-if="v.requirements">
                  <h3 class="vacancy__label">Требования</h3>
                  <ul><li v-for="r in v.requirements" :key="r">{{ r }}</li></ul>
                </div>
              </div>
              <p v-else class="vacancy__empty">Подробности уточняйте в отделе кадров или отправьте резюме — мы свяжемся с вами.</p>
              <button type="button" class="vacancy__apply" @click="formOpen = true">Откликнуться</button>
            </div>
          </details>
        </li>
        <li v-if="!shown.length" class="list__empty">
          Сейчас открытых вакансий в этом городе нет — отправьте резюме, и мы свяжемся с вами, когда появится подходящая.
        </li>
      </ul>
    </section>

    <AppModal v-model="formOpen">
      <LeadForm
        title="Отправить резюме"
        topic="Резюме"
        :fields="['name', 'lastName', 'phone', 'email', 'message', 'file']"
      />
    </AppModal>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: clamp(560px, 63.6vw, 1082px);
  margin-top: calc(var(--header-h) * -1);
  padding: calc(var(--header-h) + 60px) 0 clamp(56px, 6vw, 100px);
  overflow: hidden;
  color: var(--white);
  background: var(--blue);
  isolation: isolate;
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  animation: hero-zoom 2.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes hero-zoom {
  from { transform: scale(1.1); }
}
.hero__title span,
.hero__text,
.hero__btn {
  animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hero__title span:nth-child(1) { animation-delay: 0.2s; }
.hero__title span:nth-child(2) { animation-delay: 0.35s; }
.hero__text { animation-delay: 0.55s; }
.hero__btn { animation-delay: 0.7s; }
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(21, 56, 67, 0) 40%, rgba(21, 56, 67, 0.85) 100%),
    linear-gradient(90deg, rgba(17, 17, 17, 0.35) 0%, rgba(17, 17, 17, 0) 60%);
}
.hero__title {
  max-width: 1100px;
  font-size: var(--fs-title);
  font-weight: 700;
  line-height: 1.3;
  text-transform: uppercase;
}
.hero__title span {
  display: inline-block;
}
.hero__text {
  max-width: 720px;
  margin-top: 0;
  font-size: var(--fs-text);
  line-height: 1.82;
}
.hero__btn {
  margin-top: clamp(24px, 2.06vw, 35px);
  height: 78px;
  min-width: 356px;
  font-size: clamp(18px, 1.4vw, 24px);
}

/* макет: «Карьера» через 86px после первого экрана, карточки преимуществ — через 167px после текста */
.about {
  padding-block: clamp(48px, 5.06vw, 86px) var(--section-y);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.about__title {
  color: var(--grey);
}
.about__cols {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px clamp(40px, 8.2vw, 140px);
  margin-top: clamp(24px, 2.6vw, 44px);
}
.about__cols p + p {
  margin-top: 12px;
}
.about__note {
  color: var(--grey-text);
}

.benefits {
  position: relative;
  padding-block: clamp(40px, 3.94vw, 67px) clamp(64px, 10.8vw, 183px);
}
.benefits__title {
  position: absolute;
  width: calc((100% - var(--gutter) * 2) / 3 - 40px);
  padding-top: 27px;
  color: var(--grey);
}
.benefits__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}
.benefit {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  aspect-ratio: 1;
  padding: clamp(20px, 1.59vw, 27px) clamp(20px, 2.4vw, 40px) clamp(32px, 6.47vw, 110px);
  color: var(--white);
  background: var(--blue) center / cover no-repeat;
  box-shadow: var(--shadow);
}
.benefit__text {
  font-size: var(--fs-text);
  line-height: 1.82;
}
.benefit--1 { grid-area: 1 / 2; }
.benefit--2 { grid-area: 1 / 3; }
.benefit--3 { grid-area: 2 / 1; }
.benefit--4 { grid-area: 2 / 3; }
.benefit--5 { grid-area: 3 / 2; }

.vacancies {
  padding-block: 0 var(--section-y);
}
.vacancies__title {
  font-size: var(--fs-title);
  font-weight: 700;
  line-height: 1.3;
  text-transform: uppercase;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: clamp(20px, 1.76vw, 30px) 0 clamp(20px, 2.06vw, 35px);
}
.filter {
  min-height: 60px;
  padding: 0 20px;
  font-size: 18px;
  color: var(--green);
  background: var(--white);
  border: 2px solid var(--green);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.filter[aria-pressed='true'],
.filter:hover {
  color: var(--white);
  background: var(--green);
}
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.vacancy {
  border-bottom: 1px solid var(--light);
}
.vacancy__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: clamp(24px, 2.12vw, 36px) 0 clamp(24px, 2.18vw, 37px);
  list-style: none;
  cursor: pointer;
}
.vacancy__head::-webkit-details-marker {
  display: none;
}
.vacancy__title {
  display: block;
  font-size: var(--fs-h2);
  font-weight: 700;
  line-height: 1.53;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}
.vacancy__head:hover .vacancy__title {
  color: var(--green);
}
.vacancy__city {
  display: block;
  margin-top: 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--grey-text);
}
.vacancy__chevron {
  flex-shrink: 0;
  margin-top: 10px;
  color: var(--grey);
  transition: transform 0.2s;
}
details[open] .vacancy__chevron {
  transform: rotate(180deg);
}
.vacancy__body {
  padding-bottom: clamp(24px, 2.4vw, 40px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.vacancy__hh {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  font-size: 18px;
  color: #d6001c;
}
.vacancy__cols {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px clamp(40px, 4.7vw, 80px);
}
.vacancy__label {
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 700;
}
.vacancy__cols ul {
  margin: 0;
  padding-left: 1.2em;
}
.vacancy__empty {
  color: var(--grey-text);
}
.vacancy__apply {
  min-height: 44px;
  margin-top: 16px;
  padding: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--green);
  background: none;
  border: 0;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}
.list__empty {
  padding: 32px 0;
  color: var(--grey-text);
  font-size: var(--fs-text);
}

/* планшет: две колонки вместо «шахматки» 3×3 */
@media (max-width: 1279px) {
  .benefits__title {
    position: static;
    width: auto;
    margin-bottom: 32px;
  }
  .benefits__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .benefit--1, .benefit--2, .benefit--3, .benefit--4, .benefit--5 { grid-area: auto; }
  .benefit {
    aspect-ratio: auto;
    min-height: 360px;
  }
}
@media (max-width: 1023px) {
  .about__cols,
  .vacancy__cols {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 639px) {
  .benefits__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .benefit {
    aspect-ratio: auto;
    min-height: 300px;
  }
  .hero__btn {
    min-width: 0;
    height: 64px;
  }
}
</style>
