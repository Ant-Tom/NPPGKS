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
    <div class="hero__stroke" aria-hidden="true">
      <NuxtImg
        src="/images/home/hero-stroke.png"
        alt=""
        width="1237"
        height="632"
        sizes="xs:120vw md:100vw lg:73vw"
        format="webp"
        fetchpriority="high"
      />
      <!-- «кисть»: белая шторка уезжает вправо — анимация только transform, без перерисовки картинки -->
      <span class="hero__wipe" />
    </div>

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
  /* вертикаль макета: подзаголовок на 246px, подложки строк на 298 и 443px, иконки на 638px, видео с 872px */
  padding: calc(var(--header-h) + clamp(40px, 8.65vw, 147px)) 0 clamp(56px, 7.59vw, 129px);
}
.hero__stroke {
  position: absolute;
  overflow: hidden;
  top: -26px;
  left: 30%;
  width: 72.8%;
  max-width: none;
  height: auto;
  pointer-events: none;
}
@media (min-width: 1700px) {
  .hero__stroke { left: calc(50% - 340px); width: 1237px; }
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
.hero__stroke img {
  display: block;
  width: 100%;
  height: auto;
}
.hero__wipe {
  position: absolute;
  inset: 0 -30% 0 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, var(--white) 22%);
  transform: translateX(105%);
  animation: brush 1.4s cubic-bezier(0.65, 0, 0.35, 1) 0.15s both;
  will-change: transform;
}
@keyframes brush {
  from { transform: translateX(-25%); }
}
.hero__company {
  margin-bottom: clamp(6px, 0.7vw, 12px);
  font-size: clamp(24px, 2.41vw, 41px);
  line-height: 1.3;
  font-weight: 400;
  color: var(--grey);
}
/* строка на белой подложке: заглавные ~95px (кегль 136), поля подложки 12px, подложка 120px.
   line-height = высота заглавных, отступы подобраны так, чтобы буквы стояли ровно по центру */
.hero__line {
  margin-left: -0.087em;
  padding: 0.066em 0.087em 0.104em;
  font-size: clamp(40px, 8vw, 136px);
  line-height: 0.7;
  background: var(--white);
}
.hero__line--shift {
  margin-left: clamp(0px, 7.53vw, 128px);
  margin-top: clamp(8px, 1.47vw, 25px);
}
/* преимущества стоят в макете на 239, 639 и 1030px — колонки 400 и 391px */
.hero__features {
  display: grid;
  grid-template-columns: minmax(0, 400px) minmax(0, 391px) auto;
  justify-content: start;
  gap: 24px 0;
  margin: clamp(40px, 4.41vw, 75px) 0 0;
  padding: 0 0 0 clamp(0px, 8.18vw, 139px);
  list-style: none;
}
.hero__features li {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding-right: 24px;
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
    grid-template-columns: minmax(0, 1fr);
    padding-left: 0;
  }
  .hero__features li {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
  .hero__features img {
    width: 48px;
    height: 48px;
    object-position: center;
  }
}
</style>
