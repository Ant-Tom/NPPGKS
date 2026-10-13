<template>
  <section class="about">
    <div class="container about__inner">
      <SectionTitle to="/o-kompanii">О компании</SectionTitle>
      <p v-reveal="1" class="text">
        НПП «ГКС» — один из лидеров отрасли в создании автоматизированных систем управления технологических процессов,
        блочного оборудования, систем учёта, аналитических систем, решений в области экологического мониторинга.
      </p>
      <p v-reveal="2" class="text">
        Компания реализует комплексные проекты «под ключ», ежегодно выводит на рынок новые решения, располагает
        собственной производственной базой с современным оборудованием.
      </p>
    </div>
    <!-- декоративные квадраты в левом нижнем углу -->
    <span class="about__square about__square--white" aria-hidden="true" />
    <span class="about__square about__square--green" aria-hidden="true" />
  </section>
</template>

<style scoped>
.about {
  position: relative;
  overflow: hidden;
  /* макет: блок 515px, текст через 157px от верха, 158px до низа */
  padding: clamp(64px, 9.24vw, 157px) 0 clamp(120px, 9.3vw, 158px);
  color: var(--white);
  background:
    radial-gradient(ellipse 45% 70% at 72% 75%, rgba(21, 56, 67, 0.95), transparent 70%),
    var(--black);
}
/* колонки макета: заголовок 336 + 106, текст 501 + 80, текст 477 (всего 1500) */
.about__inner {
  display: grid;
  grid-template-columns: 442fr 581fr 477fr;
  gap: 40px 0;
  align-items: start;
}
.about__inner > p:nth-of-type(1) {
  margin-right: clamp(24px, 4.7vw, 80px);
}
.about__square {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  background: var(--white);
}
.about__square--green {
  left: 100px;
  bottom: 0;
  width: 50px;
  height: 50px;
  background: var(--green);
}
@media (max-width: 1279px) {
  .about__inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 40px;
  }
  .about__inner > p:nth-of-type(1) {
    margin-right: 0;
  }
  .about__inner > :first-child {
    grid-column: 1 / -1;
  }
}
@media (max-width: 767px) {
  .about__inner {
    grid-template-columns: minmax(0, 1fr);
  }
  .about__square {
    width: 60px;
    height: 60px;
  }
  .about__square--green {
    left: 60px;
    bottom: 0;
    width: 30px;
    height: 30px;
  }
}
</style>
