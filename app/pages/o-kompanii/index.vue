<script setup lang="ts">
usePageSeo(
  'Общая информация',
  'НПП «ГКС» — один из лидеров отрасли в создании АСУ ТП, блочного оборудования, систем учёта и аналитических систем. Более 500 сотрудников, более 900 проектов с 2006 года.',
  '/images/about/office-kazan.jpg',
)

// Тексты — как в макете, с неразрывными пробелами
const systems = [
  { abbr: 'СМК', text: 'Система менеджмента качества, соответствующая требованиям ISO 9001:2015 (ГОСТ Р\u00a0ИСО\u00a09001–2015)', cls: 'a' },
  { abbr: 'СМ\u00a0ОЗБТ', text: 'Система менеджмента в\u00a0области охраны здоровья и\u00a0безопасности труда по\u00a0требованиям ISO 45001:2018 (ГОСТ Р\u00a0ИСО\u00a045001–2020)', cls: 'b' },
  { abbr: 'СЭМ', text: 'Система экологического менеджмента по\u00a0требованиям ISO 14001:2015 (ГОСТ Р\u00a0ИСО\u00a014001–2016)', cls: 'c' },
]
</script>

<template>
  <div class="deco">
    <LogoBg :top="-86" :left="5" />

    <PageHead title="Общая информация" class="head">
      <p>
        НПП&nbsp;«ГКС» — один из&nbsp;лидеров отрасли в&nbsp;создании автоматизированных систем управления технологических
        процессов, блочного оборудования, систем учёта, аналитических систем, решений в&nbsp;области экологического мониторинга.
      </p>
      <p>
        Компания реализует комплексные проекты «под&nbsp;ключ», ежегодно выводит на&nbsp;рынок новые решения, располагает
        собственной производственной базой с&nbsp;современным оборудованием.
      </p>
      <template #aside>
        <!-- TODO: положить PDF презентации в /public/files/ -->
        <a v-reveal="2" href="/files/prezentaciya-npp-gks-2024.pdf" class="pres" target="_blank" rel="noopener">
          <span class="pres__title h1">Презентация</span>
          <span class="pres__text">Информацией о&nbsp;деятельности компании можно ознакомиться в&nbsp;презентации</span>
          <span class="pres__link">Презентация НПП&nbsp;ГКС&nbsp;2024 <IconArrow /></span>
        </a>
      </template>
    </PageHead>

    <div class="photo">
      <MediaImage src="/images/about/office-kazan.jpg" alt="Центральный офис НПП «ГКС» в Казани" :vw="72" eager />
    </div>

    <!-- В актуальном макете абзацы этой полосы скрыты (виден только фон); текст оставлен, геометрия — из версии с текстом -->
    <section class="band">
      <div class="container band__inner">
        <p v-reveal>
          В&nbsp;штате компании более 500&nbsp;квалифицированных сотрудников, на&nbsp;регулярной основе проходящих повышение
          квалификации и&nbsp;разностороннее обучение. Наличие собственных проектировщиков, монтажников, метрологов,
          пусконаладчиков позволяет в&nbsp;рамках одной компании вводить в&nbsp;сжатые сроки системы на&nbsp;объектах Заказчика,
          а&nbsp;также сокращать сроки разработки и&nbsp;изготовления за&nbsp;счёт параллельной работы по&nbsp;проектированию
          и&nbsp;изготовлению.
        </p>
        <p v-reveal="1">
          НПП&nbsp;«ГКС» — независимый системный интегратор, предлагающий Заказчикам решения на&nbsp;различных платформах.
          Предприятие принимает участие в&nbsp;масштабных проектах страны. С&nbsp;2006&nbsp;г. реализовано более 900&nbsp;проектов
          в&nbsp;нефтегаздобыче, нефтепереработке, нефтехимии, химических производств, металлургии, золотодобыче.
          География работ — Российская Федерация, страны СНГ, Китай.
        </p>
      </div>
      <!-- квадраты в левом нижнем углу: белый 100×100 и зелёный 50×50 -->
      <span class="band__sq band__sq--white" aria-hidden="true" />
      <span class="band__sq band__sq--green" aria-hidden="true" />
    </section>

    <section class="mgmt deco">
      <LogoBg :top="366" :left="640" />
      <div class="container">
        <div class="mgmt__grid">
          <h2 v-reveal class="h1 mgmt__title">Системы менеджмента</h2>
          <article v-for="(s, i) in systems" :key="s.abbr" v-reveal="i + 1" class="sys" :class="`sys--${s.cls}`">
            <h3 class="sys__abbr h1">{{ s.abbr }}</h3>
            <p>{{ s.text }}</p>
          </article>
        </div>
        <p v-reveal class="mgmt__sro">
          НПП&nbsp;«ГКС» является членом СРО, имеет свидетельства о&nbsp;допуске к&nbsp;определённому виду или&nbsp;видам
          работ, которые оказывают влияние на&nbsp;безопасность объектов капитального строительства.
          <NuxtLink to="/o-kompanii/licenzii-i-sertifikaty">Свидетельства СРО</NuxtLink>
        </p>
      </div>
    </section>

    <section class="geo">
      <div class="container">
        <h2 v-reveal class="h1">География работ</h2>
        <p v-reveal="1" class="geo__text">
          Предприятие осуществляет свою деятельность от&nbsp;берегов Балтики до&nbsp;просторов Тихого океана, а&nbsp;также
          от&nbsp;Каспийского моря до&nbsp;Северного Ледовитого океана. Располагается оно в&nbsp;Республике Татарстан
        </p>
      </div>
      <div class="geo__map">
        <MediaImage src="/images/about/geography-map.jpg" alt="Карта объектов НПП «ГКС»: Россия, страны СНГ" />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Координаты — из макета 1700px; px → vw там, где блок должен масштабироваться с экраном */
.head {
  padding-bottom: 0;
}
.head :deep(.page-head__main) {
  padding-bottom: clamp(40px, 4vw, 68px);
}
/* «Презентация» 483×481: верх на уровне вводного текста (302px), низ упирается в фото */
.pres {
  flex-shrink: 0;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  width: 483px;
  min-height: 481px;
  margin-top: clamp(0px, 10.24vw, 174px);
  margin-right: calc(var(--gutter) * -1);
  padding: 47px 40px 40px;
  color: var(--white);
  text-decoration: none;
  background: var(--black);
  box-shadow: var(--shadow);
}
.pres__title {
  margin-bottom: auto;
  padding-bottom: 40px;
}
.pres__text {
  max-width: 345px;
  font-size: clamp(18px, 1.41vw, 24px);
  line-height: 1.5;
}
.pres__link {
  display: flex;
  align-items: flex-end;
  gap: 30px;
  margin-top: 10px;
  color: var(--green);
  font-size: var(--fs-text);
  line-height: 32px;
}
.pres__link .icon-arrow {
  width: 32px;
  height: 32px;
  transition: transform 0.2s;
}
.pres:hover .icon-arrow {
  transform: translate(4px, -4px);
}

/* фото 1217×629 слева, вплотную к тёмной полосе */
.photo {
  width: 71.6%;
  aspect-ratio: 1217 / 629;
}

/* тёмная полоса 595px: текст через 157px от верха, две колонки по 680 с промежутком 140 */
.band {
  position: relative;
  min-height: clamp(420px, 35vw, 595px);
  padding: clamp(64px, 9.2vw, 157px) 0 clamp(96px, 7vw, 120px);
  color: var(--white);
  background: var(--black) url('/images/about/leaf-dark.jpg') center bottom / cover no-repeat;
}
.band__inner {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 680px));
  justify-content: space-between;
  gap: 32px clamp(40px, 8.24vw, 140px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.band__sq {
  position: absolute;
  bottom: 0;
}
.band__sq--white {
  left: 0;
  width: clamp(48px, 5.88vw, 100px);
  aspect-ratio: 1;
  background: var(--white);
}
.band__sq--green {
  left: clamp(48px, 5.88vw, 100px);
  width: clamp(24px, 2.94vw, 50px);
  aspect-ratio: 1;
  background: var(--green);
}

/* системы менеджмента: сетка 2×3 ячейки 500×336 (заголовок — в первой), через 156px после полосы */
.mgmt {
  padding: clamp(64px, 9.2vw, 156px) 0 0;
}
.mgmt__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 500px));
  grid-auto-rows: minmax(336px, auto);
}
.mgmt__title {
  grid-area: 1 / 1;
  max-width: 441px;
  padding-top: 25px;
  color: var(--grey);
}
.sys {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  padding: 25px 40px 38px;
  overflow: hidden;
  color: var(--white);
  font-size: var(--fs-text);
  line-height: 1.82;
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
  filter: blur(60px);
  pointer-events: none;
}
.sys > * {
  position: relative;
}
.sys--a { grid-area: 1 / 2; }
.sys--a::before { left: -40%; top: -40%; }
.sys--b { grid-area: 2 / 1; }
.sys--b::before { left: 10%; top: -20%; }
.sys--c { grid-area: 3 / 2; }
.sys--c::before { left: -60%; top: -60%; }
.mgmt__sro {
  max-width: 680px;
  margin: clamp(48px, 7.4vw, 127px) 0 0 calc(501 / 1500 * 100%);
  color: var(--grey-text);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.mgmt__sro a {
  color: var(--black);
}

.geo {
  /* выше второго фонового логотипа, который свисает из блока систем менеджмента */
  position: relative;
  padding-top: clamp(48px, 7.8vw, 133px);
}
.geo__text {
  max-width: 690px;
  margin-top: clamp(20px, 2vw, 34px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.geo__map {
  aspect-ratio: 1700 / 703;
  max-height: 703px;
  width: 100%;
  margin-top: clamp(32px, 3.4vw, 58px);
}

@media (max-width: 1023px) {
  .pres {
    align-self: stretch;
    width: auto;
    min-height: 0;
    margin: 0 calc(var(--gutter) * -1);
    padding: 40px var(--gutter);
  }
  .pres__title {
    padding-bottom: 24px;
  }
  .photo {
    width: 100%;
    aspect-ratio: 16 / 10;
  }
  .band {
    min-height: 0;
  }
  .band__inner {
    grid-template-columns: minmax(0, 1fr);
  }
  .mgmt__grid {
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: auto;
    gap: 16px;
  }
  .mgmt__title {
    grid-area: auto;
    padding: 0 0 16px;
  }
  .sys--a, .sys--b, .sys--c { grid-area: auto; min-height: 260px; }
  .mgmt__sro { margin-left: 0; }
  .geo__map { aspect-ratio: 4 / 3; }
}
</style>
