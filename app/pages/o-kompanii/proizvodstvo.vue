<script setup lang="ts">
usePageSeo(
  'Производство',
  'Собственная производственная база НПП «ГКС» в Бугульме (12,5 тыс. м²) и Казани: системы измерения, арматурные блоки, блочно-комплектное оборудование, шкафы АСУ ТП, лаборатории.',
)

const capabilities = [
  'Заготовительное производство: трубные заготовки, раскрой металла',
  'Аттестованное сварочное производство и термическая обработка сварных швов',
  'Механическое производство: фрезеровка, сверление',
  'Механосборочное производство, общая площадь которого — более 9,8 тыс. м²',
  'Нанесение ЛКП и защитных покрытий, контроль толщины, адгезии',
  'Лабораторные испытания: ЛНК, механические, электрические',
]

const departments = [
  'Департамент измерительных систем и блочного оборудования',
  'Департамент автоматизированных систем управления',
  'Департамент контрольно-измерительных приборов и аналитического оборудования',
]

// Фото — в /public/images/production/
const photos = {
  wide1: undefined as string | undefined,
  wide2: undefined as string | undefined,
  shop: undefined as string | undefined,
  machining: undefined as string | undefined,
}
</script>

<template>
  <div>
    <PageHead title="Производство">
      <p>
        Собственная производственная база значительно сокращает время изготовления продукции, поскольку весь комплекс
        работ (от проектирования продукции до её изготовления и ввода в эксплуатацию) производится в рамках одной компании.
      </p>
      <p>
        Основная производственная площадка НПП «ГКС» находится в г. Бугульма. На территории свыше 12,5 тыс. м²
        осуществляется производство и выпуск промышленного оборудования, включая системы измерения, арматурные блоки,
        фильтрационное и блочно-комплектное оборудование.
      </p>
    </PageHead>

    <section class="container caps">
      <ol class="caps__grid">
        <li v-for="(c, i) in capabilities" :key="c" class="cap" :class="`cap--${i + 1}`">
          <span class="cap__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="cap__text">{{ c }}</span>
        </li>
      </ol>
    </section>

    <section class="container structure">
      <div class="structure__inner">
      <h2 class="h1 structure__title">Состав предприятия</h2>
      <p>Структурно в состав предприятия входят три производственных подразделения:</p>
      <ol>
        <li v-for="d in departments" :key="d">{{ d }}</li>
      </ol>
      </div>
    </section>

    <div class="wide"><MediaImage :src="photos.wide1" alt="Производственный цех НПП «ГКС»" /></div>

    <section class="container cols">
      <p>
        На производственной базе в г. Казани производится шкафное и щитовое оборудование для автоматизированных систем
        управления технологическими процессами, систем противоаварийной защиты, низковольтные комплектные устройства
        и контрольно-измерительные приборы.
      </p>
      <p class="cols__muted">
        Сертифицированные аналитическая и метрологическая лаборатории позволяют осуществлять поверку и калибровку
        изготавливаемого у себя и стороннего оборудования Заказчиков
      </p>
    </section>

    <div class="wide"><MediaImage :src="photos.wide2" alt="Контрольно-измерительный прибор" /></div>

    <section class="areas">
      <div class="container">
        <h2 class="h1 areas__title">Участки производственной площадки</h2>
      </div>
      <div class="mosaic">
        <div class="tile tile--photo"><MediaImage :src="photos.shop" alt="Производственный цех" :vw="34" /></div>
        <p class="tile tile--dark tile--wide tile--glow-a">
          Производственный цех с зоной проведения заводских-приёмочных испытаний, зоной изготовления маркировки
          и мобильными автоматизированными станками для обжима и зачистки проводов
        </p>
        <p class="tile tile--dark tile--glow-b">Механообрабатывающий цех со слесарной мастерской с оборудованием на базе ЧПУ</p>
        <div class="tile tile--photo"><MediaImage :src="photos.machining" alt="Механообрабатывающий цех" :vw="34" /></div>
        <p class="tile tile--light">Для хранения комплектующих, оборудования и расходных материалов имеется склад</p>
        <p class="tile tile--light">
          Вся производимая продукция сертифицирована и соответствует ТУ, общегосударственным и внутриотраслевым стандартам
          качества
        </p>
        <p class="tile tile--dark tile--wide tile--glow-c">
          Электротехническая лаборатория с испытательными стендами и парком поверенного оборудования для проведения всех
          необходимых замеров и испытаний
        </p>
      </div>
    </section>

    <OfficesMap />
  </div>
</template>

<style scoped>
.caps__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.cap {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
  min-height: 333px;
  padding: 40px;
  overflow: hidden;
  color: var(--white);
  background: var(--black);
  box-shadow: var(--shadow);
}
.cap::before {
  content: '';
  position: absolute;
  width: 90%;
  height: 160%;
  border-radius: 50%;
  pointer-events: none;
}
.cap > * {
  position: relative;
}
.cap--1::before { background: var(--blue); left: 45%; top: -40%; transform: rotate(25deg); }
.cap--2::before { background: var(--blue); left: -40%; top: -70%; transform: rotate(-20deg); }
.cap--3::before { background: transparent; }
.cap--4::before { background: transparent; }
.cap--5::before { background: var(--blue); left: 40%; top: -100%; transform: rotate(30deg); }
.cap--6::before { background: var(--purple); left: 55%; top: -50%; transform: rotate(20deg); }
.cap__num {
  font-weight: 700;
  font-size: clamp(40px, 3.5vw, 60px);
  line-height: 1;
}
.cap__text {
  font-size: var(--fs-text3);
  line-height: 1.67;
}

.structure {
  padding-top: var(--section-y);
  padding-bottom: var(--section-y);
  font-size: var(--fs-text3);
  line-height: 1.67;
}
.structure__inner {
  max-width: 680px;
}
.structure__title {
  margin-bottom: 32px;
  color: var(--grey);
}
.structure ol {
  margin: 8px 0 0;
  padding-left: 1.4em;
}

.wide {
  aspect-ratio: 1700 / 766;
  max-height: 80vh;
  width: 100%;
}

.cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px clamp(40px, 8.2vw, 140px);
  padding-block: var(--section-y);
  font-size: var(--fs-text3);
  line-height: 1.67;
}
.cols__muted {
  color: var(--grey);
}

.areas__title {
  max-width: 700px;
  padding: var(--section-y) 0 clamp(32px, 4.1vw, 70px);
  color: var(--grey);
}
.mosaic {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(300px, 33.4vw);
}
@media (min-width: 1700px) {
  .mosaic { grid-auto-rows: 568px; }
}
.tile {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  padding: clamp(24px, 5.9vw, 100px);
  overflow: hidden;
  font-size: var(--fs-text3);
  line-height: 1.67;
  isolation: isolate;
}
.tile--photo {
  padding: 0;
}
.tile--wide {
  grid-column: span 2;
}
.tile--dark {
  color: var(--white);
  background: var(--black);
}
.tile--light {
  background: var(--white);
}
.tile--dark::before {
  content: '';
  position: absolute;
  width: 70%;
  height: 140%;
  border-radius: 50%;
  background: var(--blue);
  pointer-events: none;
  z-index: -1;
}
.tile--glow-a::before { left: 50%; top: -60%; transform: rotate(30deg); }
.tile--glow-b::before { left: -10%; top: 40%; transform: rotate(-30deg); width: 120%; }
.tile--glow-c::before { left: 60%; top: -40%; transform: rotate(20deg); }

@media (max-width: 1023px) {
  .caps__grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .cols {
    grid-template-columns: 1fr;
  }
  .mosaic {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .tile--wide {
    grid-column: auto;
  }
  .tile--photo {
    aspect-ratio: 4 / 3;
  }
}
@media (max-width: 639px) {
  .caps__grid {
    grid-template-columns: 1fr;
  }
  .cap {
    min-height: 220px;
  }
}
</style>
