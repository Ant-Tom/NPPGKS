<script setup lang="ts">
import { aboutPages, productCategories, services, footerExtraLinks, company } from '~/data/site'

const columns = [
  { title: 'О компании', to: '/o-kompanii', links: aboutPages },
  { title: 'Продукция', to: '/produkciya', links: productCategories },
  { title: 'Услуги', to: '/uslugi', links: services },
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <NuxtLink to="/" class="footer__title">Главная</NuxtLink>

        <nav v-for="col in columns" :key="col.to" class="footer__col" :aria-label="col.title">
          <NuxtLink :to="col.to" class="footer__title">{{ col.title }}</NuxtLink>
          <ul>
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink :to="link.to" class="footer__link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <ul class="footer__extra">
          <li v-for="link in footerExtraLinks" :key="link.to">
            <NuxtLink :to="link.to" class="footer__title">{{ link.label }}</NuxtLink>
          </li>
        </ul>

        <div class="footer__icons">
          <div class="footer__row">
            <a
              v-for="s in company.socials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              class="footer__icon"
              target="_blank"
              rel="noopener"
            >
              <img :src="s.icon" alt="" width="36" height="36" loading="lazy">
            </a>
          </div>
          <div class="footer__row">
            <NuxtLink to="/kontakty#feedback" class="footer__icon" aria-label="Заказать звонок">
              <img src="/icons/phone.svg" alt="" width="36" height="36" loading="lazy">
            </NuxtLink>
            <NuxtLink to="/kontakty#feedback" class="footer__icon" aria-label="Задать вопрос">
              <img src="/icons/headset.svg" alt="" width="36" height="36" loading="lazy">
            </NuxtLink>
            <NuxtLink to="/o-kompanii/otzyvy" class="footer__icon" aria-label="Оставить отзыв">
              <img src="/icons/chat2.svg" alt="" width="36" height="36" loading="lazy">
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <span>{{ year }} НПП «ГКС»</span>
        <span>Дизайн сайта: Katerina Timofeeva</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 58px 0 36px;
  background: var(--black);
  color: var(--white);
}
.footer ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.footer__grid {
  display: grid;
  grid-template-columns: auto auto 199px 250px auto auto;
  justify-content: space-between;
  gap: 40px 60px;
}
.footer__title {
  display: block;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  text-decoration: none;
}
.footer__col ul {
  margin-top: 12px;
}
.footer__col li + li {
  margin-top: 12px;
}
.footer__link {
  font-size: 14px;
  line-height: 20px;
  color: var(--grey);
  text-decoration: none;
}
.footer__link:hover,
.footer__title:hover {
  color: var(--green);
}
.footer__extra li + li {
  margin-top: 10px;
}
.footer__icons {
  display: flex;
  flex-direction: column;
  gap: 27px;
}
.footer__row {
  display: flex;
  gap: 8px;
}
.footer__icon {
  transition: opacity 0.2s;
}
.footer__icon:hover {
  opacity: 0.8;
}
.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 60px;
  margin-top: 56px;
  font-size: 14px;
  line-height: 20px;
  opacity: 0.5;
}

@media (max-width: 1279px) {
  .footer__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 767px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
