<script setup lang="ts">
// Три основных направления продукции. Фото коллажей — из макета «Продукция» (/public/images/products/)
const items = [
  {
    title: 'Системы измерений количества и показателей качества',
    text: 'НПП «ГКС» осуществляет проектирование, производство, шеф-монтаж, пусконаладочные работы, метрологическое обеспечение и ввод в действие систем измерений количества и показателей качества (узлов учёта)',
    to: '/produkciya/sistemy-izmerenij',
    layout: 'a',
    photos: ['/images/products/sikn-neft.jpg', '/images/products/sikg-kondensat.jpg', '/images/products/sikg-gaz.jpg'],
  },
  {
    title: 'Блочно-комплектное технологическое оборудование',
    text: 'Блочные установки и технологическое оборудование позволяют комплексно решить задачи, связанные с подготовкой и вводом объекта в эксплуатацию, значительно сокращая срок строительно-монтажных работ',
    to: '/produkciya/blochno-komplektnoe-oborudovanie',
    layout: 'b',
    photos: ['/images/products/bns.jpg', '/images/products/ba.jpg', '/images/products/bmz.jpg'],
  },
  {
    title: 'Системы автоматизации технологических процессов',
    text: 'Наше предприятие выполняет проекты комплексной автоматизации технологических процессов и производств, а также обеспечение их противопожарной защиты',
    to: '/produkciya/sistemy-avtomatizacii',
    layout: 'c',
    photos: ['/images/products/shau.jpg', '/images/products/po.jpg', '/images/products/nku.jpg'],
  },
]
</script>

<template>
  <section class="products">
    <div class="container">
      <SectionTitle to="/produkciya">Продукция</SectionTitle>
    </div>

    <ul class="products__list">
      <li v-for="item in items" :key="item.to" class="row">
        <div class="container row__inner">
          <!-- коллаж из фото: большое + 2 маленьких + светлый квадрат, как в макете -->
          <div class="collage" :class="`collage--${item.layout}`" aria-hidden="true">
            <span class="collage__big"><MediaImage :src="item.photos[0]" :vw="15" /></span>
            <span class="collage__s1"><MediaImage :src="item.photos[1]" :vw="10" /></span>
            <span class="collage__s2"><MediaImage :src="item.photos[2]" :vw="10" /></span>
            <span class="collage__light" />
          </div>
          <div class="row__text">
            <h3 class="h2">
              <NuxtLink :to="item.to" class="row__link">{{ item.title }}</NuxtLink>
            </h3>
            <p class="text">{{ item.text }}</p>
          </div>
        </div>
      </li>
    </ul>

    <div class="container products__more">
      <AppButton to="/produkciya">Посмотреть все</AppButton>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: clamp(64px, 7.5vw, 128px) 0 clamp(64px, 7.5vw, 128px);
}
.products__list {
  margin: clamp(40px, 5.9vw, 100px) 0 0;
  padding: 0;
  list-style: none;
}
.row {
  padding: 0 0 60px;
  border-bottom: 0.5px solid var(--grey);
}
.row + .row {
  padding-top: 80px;
}
.row__inner {
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 40px clamp(40px, 6.8vw, 115px);
  align-items: start;
}
.row__text {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 2.35vw, 40px);
  max-width: 884px;
}
.row__text .h2 {
  max-width: 600px;
}
.row__link {
  text-decoration: underline;
  text-underline-offset: 0.15em;
  text-decoration-thickness: 1px;
}
.row__link:hover {
  color: var(--green);
}

/* коллаж 500×200 на сетке 100px */
.collage {
  position: relative;
  width: 500px;
  max-width: 100%;
  aspect-ratio: 5 / 2;
}
.collage > span {
  position: absolute;
  box-shadow: var(--shadow);
}
.collage__big { width: 40.4%; height: 101%; left: 0; top: -1%; }
.collage__s1 { width: 20%; height: 50%; left: 60.5%; top: 0; }
.collage__s2 { width: 20%; height: 50%; left: 80%; top: 50%; }
.collage__light { width: 20%; height: 50%; left: 40.5%; top: 50%; background: var(--light); box-shadow: none !important; }

.collage--b .collage__big { left: 40%; }
.collage--b .collage__s1 { left: 0; top: 50%; }
.collage--b .collage__s2 { left: 80%; top: 50%; }
.collage--b .collage__light { left: 20%; top: 0; }

.collage--c .collage__big { left: 60%; }
.collage--c .collage__s1 { left: 0; top: 0; }
.collage--c .collage__s2 { left: 20%; top: 50%; }
.collage--c .collage__light { left: 40%; top: 0; }

.products__more {
  display: flex;
  justify-content: center;
  margin-top: 34px;
}

@media (max-width: 1023px) {
  .row__inner {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
