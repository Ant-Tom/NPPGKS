<script setup lang="ts">
usePageSeo(
  'Общая информация',
  'НПП «ГКС» — один из лидеров отрасли в создании АСУ ТП, блочного оборудования, систем учёта и аналитических систем. Более 500 сотрудников, более 900 проектов с 2006 года.',
  '/images/about/office-kazan.jpg',
)

const systems = [
  { abbr: 'СМК', text: 'Система менеджмента качества, соответствующая требованиям ISO 9001:2015 (ГОСТ Р ИСО 9001–2015)', cls: 'a' },
  { abbr: 'СМ ОЗБТ', text: 'Система менеджмента в области охраны здоровья и безопасности труда по требованиям ISO 45001:2018 (ГОСТ Р ИСО 45001–2020)', cls: 'b' },
  { abbr: 'СЭМ', text: 'Система экологического менеджмента по требованиям ISO 14001:2015 (ГОСТ Р ИСО 14001–2016)', cls: 'c' },
]
</script>

<template>
  <div>
    <PageHead title="Общая информация" class="head">
      <p>
        НПП «ГКС» — один из лидеров отрасли в создании автоматизированных систем управления технологических процессов,
        блочного оборудования, систем учёта, аналитических систем, решений в области экологического мониторинга.
      </p>
      <p>
        Компания реализует комплексные проекты «под ключ», ежегодно выводит на рынок новые решения, располагает
        собственной производственной базой с современным оборудованием.
      </p>
      <template #aside>
        <!-- TODO: положить PDF презентации в /public/files/ -->
        <a href="/files/prezentaciya-npp-gks-2024.pdf" class="pres" target="_blank" rel="noopener">
          <span class="pres__title h1">Презентация</span>
          <span class="pres__text">Информацией о деятельности компании можно ознакомиться в презентации</span>
          <span class="pres__link">Презентация НПП ГКС 2024 <IconArrow /></span>
        </a>
      </template>
    </PageHead>

    <div class="photo">
      <MediaImage src="/images/about/office-kazan.jpg" alt="Центральный офис НПП «ГКС» в Казани" :vw="72" eager />
    </div>

    <section class="band">
      <div class="container band__inner">
        <p>
          В штате компании более 500 квалифицированных сотрудников, на регулярной основе проходящих повышение
          квалификации и разностороннее обучение. Наличие собственных проектировщиков, монтажников, метрологов,
          пусконаладчиков позволяет в рамках одной компании вводить в сжатые сроки системы на объектах Заказчика, а также
          сокращать сроки разработки и изготовления за счёт параллельной работы по проектированию и изготовлению.
        </p>
        <p>
          НПП «ГКС» — независимый системный интегратор, предлагающий Заказчикам решения на различных платформах.
          Предприятие принимает участие в масштабных проектах страны. С 2006 г. реализовано более 900 проектов
          в нефтегаздобыче, нефтепереработке, нефтехимии, химических производств, металлургии, золотодобыче.
          География работ — Российская Федерация, страны СНГ, Китай.
        </p>
      </div>
    </section>

    <section class="mgmt">
      <div class="container mgmt__inner">
        <h2 class="h1 mgmt__title">Системы менеджмента</h2>
        <div class="mgmt__grid">
          <article v-for="s in systems" :key="s.abbr" class="sys" :class="`sys--${s.cls}`">
            <h3 class="sys__abbr h1">{{ s.abbr }}</h3>
            <p>{{ s.text }}</p>
          </article>
          <span class="mgmt__cell mgmt__cell--1" aria-hidden="true" />
          <span class="mgmt__cell mgmt__cell--2" aria-hidden="true" />
        </div>
        <p class="mgmt__sro">
          НПП «ГКС» является членом СРО, имеет свидетельства о допуске к определённому виду или видам работ, которые
          оказывают влияние на безопасность объектов капитального строительства.
          <NuxtLink to="/o-kompanii/licenzii-i-sertifikaty">Свидетельства СРО</NuxtLink>
        </p>
      </div>
    </section>

    <section class="geo">
      <div class="container">
        <h2 class="h1">География работ</h2>
        <p class="geo__text">
          Предприятие осуществляет свою деятельность от берегов Балтики до просторов Тихого океана, а также от Каспийского
          моря до Северного Ледовитого океана. Располагается оно в Республике Татарстан
        </p>
      </div>
      <div class="geo__map">
        <MediaImage src="/images/about/geography-map.jpg" alt="Карта объектов НПП «ГКС»: Россия, страны СНГ" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.head {
  padding-bottom: 0;
}
.head :deep(.page-head__inner) {
  align-items: stretch;
}
.head :deep(.page-head__main) {
  padding-bottom: clamp(40px, 4.7vw, 80px);
}
.photo {
  position: relative;
  z-index: 1;
  width: 71.6%;
  aspect-ratio: 1217 / 716;
}
.pres {
  flex-shrink: 0;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  width: 483px;
  min-height: 322px;
  margin-right: calc(var(--gutter) * -1);
  padding: 40px clamp(20px, 2.4vw, 40px) 28px;
  color: var(--white);
  text-decoration: none;
  background: var(--black);
}
.pres__title {
  margin-bottom: auto;
  padding-bottom: 40px;
}
.pres__text {
  font-size: var(--fs-text3);
  line-height: 1.67;
}
.pres__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  color: var(--green);
}
.pres__link .icon-arrow {
  width: 28px;
  height: 28px;
  transition: transform 0.2s;
}
.pres:hover .icon-arrow {
  transform: translate(4px, -4px);
}

.band {
  margin-top: -88px;
  padding: calc(88px + clamp(48px, 5.9vw, 100px)) 0 clamp(120px, 10vw, 170px);
  color: var(--white);
  background: var(--black) url('/images/about/leaf-dark.jpg') center bottom / cover no-repeat;
}
.band__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px clamp(40px, 8vw, 140px);
  font-size: var(--fs-text3);
  line-height: 1.67;
}

.mgmt {
  padding: var(--section-y) 0;
}
.mgmt__inner {
  display: grid;
  grid-template-columns: 1fr;
}
.mgmt__title {
  color: var(--grey);
  max-width: 320px;
}
.mgmt__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 500px));
  grid-template-rows: repeat(3, auto);
  margin-top: clamp(-100px, -5vw, -40px);
}
.sys {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  min-height: 336px;
  padding: 40px;
  overflow: hidden;
  color: var(--white);
  font-size: var(--fs-text3);
  line-height: 1.67;
  background: var(--black);
  box-shadow: var(--shadow);
}
.sys::before {
  content: '';
  position: absolute;
  width: 140%;
  height: 160%;
  border-radius: 50%;
  background: var(--blue);
  pointer-events: none;
}
.sys > * {
  position: relative;
}
.sys--a { grid-column: 2; grid-row: 1; }
.sys--a::before { left: 5%; top: -60%; transform: rotate(30deg); }
.sys--b { grid-column: 1; grid-row: 2; }
.sys--b::before { left: 70%; top: 20%; transform: rotate(-20deg); }
.sys--c { grid-column: 2; grid-row: 3; }
.sys--c::before { left: -20%; top: -130%; transform: rotate(15deg); }
.mgmt__cell { border: 1px solid var(--light); }
.mgmt__cell--1 { grid-column: 2; grid-row: 2; }
.mgmt__cell--2 { grid-column: 3; grid-row: 2; }
.mgmt__sro {
  max-width: 680px;
  margin: clamp(40px, 5.9vw, 100px) 0 0 calc((100% - 0px) / 3);
  color: var(--grey);
  font-size: var(--fs-text3);
  line-height: 1.67;
}
.mgmt__sro a {
  color: var(--black);
}

.geo {
  padding-top: var(--section-y);
}
.geo__text {
  max-width: 700px;
  margin-top: 32px;
  font-size: var(--fs-text3);
  line-height: 1.67;
}
.geo__map {
  margin-top: clamp(32px, 4vw, 60px);
  aspect-ratio: 1500 / 703;
  max-height: 703px;
  width: 100%;
}

@media (max-width: 1023px) {
  .photo {
    width: 100%;
  }
  .pres {
    align-self: stretch;
    width: auto;
    min-height: 0;
    margin: 0 calc(var(--gutter) * -1);
  }
  .band {
    margin-top: 0;
    padding-top: var(--section-y);
  }
  .band__inner {
    grid-template-columns: 1fr;
  }
  .mgmt__grid {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    gap: 16px;
    margin-top: 32px;
  }
  .sys--a, .sys--b, .sys--c { grid-column: 1; grid-row: auto; min-height: 260px; }
  .mgmt__cell { display: none; }
  .mgmt__sro { margin-left: 0; }
  .geo__map { aspect-ratio: 4 / 3; }
}
</style>
