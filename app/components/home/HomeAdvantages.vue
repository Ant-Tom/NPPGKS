<script setup lang="ts">
// Фото карточек вырезаны из макета главной (1x), под ними — чёрная подложка с заголовком
const cards = [
  { title: 'Более 2000 успешных проектов', image: '/images/home/adv-1.jpg' },
  { title: 'Более 19 лет опыта', image: '/images/home/adv-2.jpg' },
  { title: 'Профессионализм сотрудников', image: '/images/home/adv-3.jpg' },
]
</script>

<template>
  <section class="adv">
    <div class="container">
      <SectionTitle>Преимущества</SectionTitle>
      <ul class="adv__grid">
        <li v-for="card in cards" :key="card.title" class="card">
          <MediaImage :src="card.image" :alt="card.title" :vw="30" />
          <h3 class="card__title h2">{{ card.title }}</h3>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.adv {
  position: relative;
  overflow: hidden;
  padding: var(--section-y) 0;
  color: var(--white);
  background:
    radial-gradient(ellipse 30% 55% at 8% 20%, rgba(155, 51, 147, 0.95), transparent 70%),
    radial-gradient(ellipse 35% 60% at 98% 90%, rgba(155, 51, 147, 0.9), transparent 70%),
    radial-gradient(ellipse 35% 60% at 50% 20%, rgba(21, 56, 67, 0.95), transparent 70%),
    radial-gradient(ellipse 30% 50% at 85% 10%, rgba(21, 56, 67, 0.9), transparent 70%),
    #2a2430;
}
.adv__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin: clamp(32px, 4.1vw, 70px) 0 0;
  padding: 0;
  list-style: none;
}
.card {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--black);
  filter: drop-shadow(0 0 20px rgba(27, 28, 33, 0.2));
}
.card :deep(.media) {
  height: 74%;
}
.card::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 40.6%;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, var(--black) 66.8%);
}
.card__title {
  position: absolute;
  z-index: 1;
  left: 30px;
  right: 30px;
  bottom: 30px;
}
@media (max-width: 1023px) {
  .adv__grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}
@media (max-width: 639px) {
  .adv__grid {
    grid-template-columns: 1fr;
  }
  .card {
    aspect-ratio: 4 / 3;
  }
}
</style>
