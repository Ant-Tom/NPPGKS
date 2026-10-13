<script setup lang="ts">
import { company, offices, telHref } from '~/data/site'

usePageSeo(
  'Контакты',
  `Контакты НПП «ГКС»: центральный офис в Казани (${offices[0]!.street}) и филиал в Бугульме. Телефоны, e-mail, часы работы ${company.workHours}.`,
)

// тема обращения из ссылок «Заказать звонок» / «Задать вопрос» (?tema=…)
const topics: Record<string, string> = { zvonok: 'Заказать звонок', vopros: 'Задать вопрос' }
const route = useRoute()
const topic = computed(() => topics[String(route.query.tema)] || 'Обратная связь')

// у каждого офиса — свой цвет плиток (как в макете) и свой набор строк
const rows = (i: number) => {
  const o = offices[i]!
  return [
    { icon: 'address', label: 'Адрес', lines: [o.address] },
    { icon: 'phone', label: o.phones.length > 1 && i > 0 ? 'Телефоны' : 'Телефон', lines: o.phones, tel: true },
    o.email && { icon: 'mail', label: 'Email', lines: [o.email], mail: true },
    o.fax && { icon: 'fax', label: 'Факс', lines: [o.fax] },
    { icon: 'inn', label: 'ИНН', lines: [company.inn] },
  ].filter(Boolean) as { icon: string, label: string, lines: string[], tel?: boolean, mail?: boolean }[]
}
</script>

<template>
  <div>
    <PageHead title="Контакты">
      <p>Свяжитесь с нами одним из удобных способов. Мы всегда рады ответить на ваши вопросы! Часы работы: {{ company.workHours }}</p>
      <template #note>
        <p>
          Наша компания имеет широкую сеть региональных представительств и дилеров. Вы можете обратиться в ближайший
          к вам офис для получения дополнительных консультаций
        </p>
      </template>
    </PageHead>

    <template v-for="(o, i) in offices" :key="o.city">
      <section class="container office" :class="i === 0 ? 'office--green office--first' : 'office--purple'">
        <h2 v-reveal class="office__title h1">
          <svg class="office__pin" width="44" height="55" viewBox="0 0 44 55" aria-hidden="true">
            <path d="M22 0C9.85 0 0 9.6 0 21.45 0 37.5 22 55 22 55s22-17.5 22-33.55C44 9.6 34.15 0 22 0Zm0 29a7.7 7.7 0 1 1 0-15.4A7.7 7.7 0 0 1 22 29Z" fill="currentColor" />
          </svg>
          {{ o.title }}
        </h2>
        <dl class="office__grid">
          <div v-for="(r, j) in rows(i)" :key="r.label" v-reveal="j + 1" class="item">
            <dt class="item__label">
              <span class="item__icon"><img :src="`/icons/contacts/${r.icon}.png`" alt="" width="80" height="80"></span>
              {{ r.label }}
            </dt>
            <dd v-for="l in r.lines" :key="l" class="item__line">
              <a v-if="r.tel" :href="telHref(l)">{{ l }}</a>
              <a v-else-if="r.mail" :href="`mailto:${l}`">{{ l }}</a>
              <template v-else>{{ l }}</template>
            </dd>
          </div>
        </dl>
      </section>
      <OfficesMap v-if="i === 0" plain class="map" />
    </template>

    <section id="feedback" class="feedback">
      <div class="container feedback__inner">
        <div v-reveal class="feedback__intro">
          <h2 class="h1">Обратная связь</h2>
          <p>
            Хотите узнать подробнее об условиях сотрудничества? Оставьте заявку — проконсультируем, ответим на вопросы
            и подготовим индивидуальные условия сотрудничества.
          </p>
        </div>
        <div v-reveal="1" class="feedback__form">
          <LeadForm :title="topic" :topic="topic" :message-label="topic === 'Заказать звонок' ? 'Удобное время для звонка' : 'Сообщение'" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* макет: заголовок офиса через 68px после шапки страницы (98px после карты), карта — через 87px после адресов;
   колонки с шагом 345px */
.office {
  padding-block: clamp(48px, 5.76vw, 98px) clamp(48px, 5.12vw, 87px);
  font-size: var(--fs-text);
  line-height: 1.82;
}
.office--first {
  padding-top: clamp(32px, 4vw, 68px);
}
.office--green { --accent: var(--green); }
.office--purple { --accent: var(--purple); }
.office__title {
  display: flex;
  align-items: center;
  gap: 20px;
}
.office__pin {
  flex-shrink: 0;
  width: clamp(30px, 2.6vw, 44px);
  height: auto;
  color: var(--accent);
}
.office__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 23%)) minmax(0, 1fr);
  gap: 32px 0;
  margin: clamp(32px, 3.88vw, 66px) 0 0;
}
.item {
  min-width: 0;
  padding-right: 24px;
}
.item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-bottom: 14px;
  background: var(--accent);
}
.item__label {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  font-size: clamp(18px, 1.41vw, 24px);
  font-weight: 700;
}
.item__line {
  margin: 0;
  max-width: 280px;
  overflow-wrap: anywhere;
}
.item__line a {
  text-decoration: none;
}
.item__line a:hover {
  color: var(--accent);
}

.feedback {
  padding-block: var(--section-y);
  color: var(--white);
  background: #1f1f1f;
}
.feedback__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 600px);
  gap: 40px clamp(40px, 8.2vw, 140px);
}
.feedback__intro p {
  max-width: 560px;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--fs-text);
  line-height: 1.82;
}

@media (max-width: 1279px) {
  .office__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 1023px) {
  .feedback__inner {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 639px) {
  .office__grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
  .item__icon {
    width: 60px;
    height: 60px;
  }
  .item__icon img {
    width: 60px;
    height: 60px;
  }
}
</style>
