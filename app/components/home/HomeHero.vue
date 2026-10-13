<!-- Первый экран: «НПП «ГКС» / Инжиниринг как искусство» + 3 преимущества -->
<script setup lang="ts">
const features = [
  { icon: '/images/home/feature-1.png', w: 45, h: 50, text: '2000+ проектов' },
  { icon: '/images/home/feature-2.png', w: 39, h: 52, text: '100% гарантия качества' },
  { icon: '/images/home/feature-3.png', w: 38, h: 51, text: 'Профессиональные кадры' },
]
</script>

<template>
  <section class="hero">
    <!-- мазок кистью (зелёный → синий → фиолетовый) — картинка из макета -->
    <NuxtImg
      src="/images/home/hero-stroke.png"
      alt=""
      width="1237"
      height="632"
      sizes="xs:120vw md:100vw lg:73vw"
      format="webp"
      fetchpriority="high"
      class="hero__stroke"
      aria-hidden="true"
    />

    <div class="container hero__inner">
      <h1 class="hero__title">
        <span class="hero__company">НПП «ГКС»</span>
        <span class="hero__line">Инжиниринг</span>
        <span class="hero__line hero__line--shift">как искусство</span>
      </h1>

      <ul class="hero__features">
        <li v-for="f in features" :key="f.text">
          <img :src="f.icon" alt="" :width="f.w" :height="f.h">
          <span class="text">{{ f.text }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  margin-top: calc(var(--header-h) * -1);
  padding: calc(var(--header-h) + clamp(48px, 9.3vw, 160px)) 0 clamp(56px, 8.4vw, 143px);
}
.hero__stroke {
  animation: brush 1.4s cubic-bezier(0.65, 0, 0.35, 1) 0.15s both;
  position: absolute;
  top: -16px;
  left: 28.2%;
  width: 72.8%;
  max-width: none;
  height: auto;
  pointer-events: none;
}
@media (min-width: 1700px) {
  .hero__stroke { left: calc(50% - 371px); width: 1237px; }
}
.hero__inner {
  position: relative;
}
.hero__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 700;
  text-transform: uppercase;
}
.hero__company,
.hero__line,
.hero__features li {
  animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hero__line { animation-delay: 0.25s; }
.hero__line--shift { animation-delay: 0.4s; }
.hero__features li { animation-name: fade-in; animation-duration: 0.8s; }
.hero__features li:nth-child(1) { animation-delay: 0.8s; }
.hero__features li:nth-child(2) { animation-delay: 0.95s; }
.hero__features li:nth-child(3) { animation-delay: 1.1s; }
@keyframes brush {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
.hero__company {
  margin-bottom: clamp(12px, 1.4vw, 24px);
  font-size: var(--fs-h1);
  line-height: 1.3;
  font-weight: 400;
  color: var(--grey);
}
.hero__line {
  padding: 0.06em 0.12em 0;
  font-size: var(--fs-title);
  line-height: 1.2;
  background: var(--white);
}
.hero__line--shift {
  margin-left: clamp(0px, 8.2vw, 139px);
  margin-top: clamp(4px, 1vw, 16px);
}
.hero__features {
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  gap: 24px clamp(40px, 14vw, 240px);
  margin: clamp(48px, 4.2vw, 70px) 0 0;
  padding: 0 0 0 clamp(0px, 8.2vw, 139px);
  list-style: none;
}
.hero__features li {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.hero__features img {
  height: 56px;
  width: auto;
  object-fit: contain;
  object-position: left bottom;
}

@media (max-width: 767px) {
  .hero__stroke {
    top: 8px;
    left: 10%;
    width: 130%;
  }
  .hero__features {
    grid-template-columns: 1fr;
    padding-left: 0;
  }
  .hero__features li {
    flex-direction: row;
    align-items: center;
  }
  .hero__features img {
    width: 48px;
    height: 48px;
    object-position: center;
  }
}
</style>
