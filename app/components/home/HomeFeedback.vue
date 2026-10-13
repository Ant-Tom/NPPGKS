<script setup lang="ts">
// Три плитки обратной связи. Каждая ведёт к форме с нужной темой обращения.
const tiles = [
  { title: 'Заказать звонок', icon: 'phone', to: '/kontakty?tema=zvonok#feedback', glow: 'tl' },
  { title: 'Задать вопрос', icon: 'headset', to: '/kontakty?tema=vopros#feedback', glow: 'br' },
  { title: 'Оставить отзыв', icon: 'chat2', to: '/o-kompanii/otzyvy#feedback', glow: 'both' },
]
</script>

<template>
  <section class="fb">
    <div class="container">
      <SectionTitle>Обратная связь</SectionTitle>
      <div v-reveal="1" class="fb__intro">
        <p class="fb__lead">
          Мы специализируемся на услугах различных направлений — от проектирования инженерных систем и монтажа
          металлоконструкций до аренды спецтехники и поставок медицинского оборудования.
        </p>
        <p class="fb__note">
          Хотите узнать подробнее об условиях сотрудничества? Свяжитесь с нами по почте или телефону.
          Проконсультируем, ответим на вопросы и подготовим индивидуальные условия сотрудничества
        </p>
      </div>

      <ul class="fb__grid">
        <li v-for="(t, i) in tiles" :key="t.title" v-reveal="i + 1">
          <NuxtLink :to="t.to" class="tile" :class="`tile--${t.glow}`">
            <IconArrow class="tile__arrow" />
            <img :src="`/icons/tile-${t.icon}.svg`" alt="" width="60" height="60" class="tile__icon">
            <span class="tile__title h1">{{ t.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* макет: заголовок через 145px после «Преимуществ», текст 22/40 через 34px, плитки через 88px */
.fb {
  padding: clamp(64px, 8.53vw, 145px) 0 var(--section-y);
}
.fb__intro {
  display: grid;
  grid-template-columns: minmax(0, 700px) minmax(0, 680px);
  justify-content: space-between;
  gap: 24px 40px;
  margin-top: clamp(20px, 2vw, 34px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.fb__note {
  color: var(--grey-text);
}
.fb__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 25px;
  margin: clamp(40px, 5.18vw, 88px) 0 0;
  padding: 0;
  list-style: none;
}
.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 29px;
  height: 100%;
  min-height: 336px;
  padding: 40px 40px 27px;
  overflow: hidden;
  color: var(--white);
  text-decoration: none;
  background: var(--black);
  box-shadow: var(--shadow);
}
.tile--tl {
  background: radial-gradient(ellipse 70% 80% at 0% 0%, rgba(155, 51, 147, 0.75), transparent 70%), var(--black);
}
.tile--br {
  background: radial-gradient(ellipse 80% 90% at 100% 0%, rgba(21, 56, 67, 0.9), transparent 70%), var(--black);
}
.tile--both {
  background:
    radial-gradient(ellipse 70% 80% at 100% 100%, rgba(155, 51, 147, 0.65), transparent 70%),
    radial-gradient(ellipse 80% 80% at 30% 0%, rgba(21, 56, 67, 0.9), transparent 70%),
    var(--black);
}
.tile__arrow {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  transition: transform 0.2s;
}
.tile:hover .tile__arrow {
  transform: translate(4px, -4px);
}
.tile__icon {
  width: 60px;
  height: 60px;
}
.tile__title {
  white-space: nowrap;
}
@media (max-width: 1500px) {
  .fb__intro {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
  .tile__title {
    white-space: normal;
  }
}
@media (max-width: 1023px) {
  .fb__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .tile {
    min-height: 220px;
  }
}
@media (max-width: 767px) {
  .fb__intro {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 32px;
  }
  .tile {
    padding: 28px;
  }
}
</style>
