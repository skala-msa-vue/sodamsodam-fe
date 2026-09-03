<template>
  <section class="hero-carousel" aria-roledescription="carousel" aria-label="주요 정책 안내">
    <div class="krds-container hero-frame">
      <button class="carousel-arrow swiper-button-prev prev" type="button" aria-label="이전 슬라이드"
        @click="previous">‹</button>
      <div class="hero-content" aria-live="polite"><span>{{ slide.eyebrow }}</span>
        <h1>{{ slide.title }}</h1>
        <p>{{ slide.description }}</p><router-link v-if="slide.href.startsWith('/')" :to="slide.href" class="krds-btn large primary">{{ slide.buttonText }}</router-link><a v-else :href="slide.href" class="krds-btn large primary">{{ slide.buttonText }}</a>
      </div>
      <div class="hero-art" :class="`hero-${slide.icon}`" role="img" :aria-label="`${slide.eyebrow} 일러스트레이션`">
        <div class="screen"><span></span><i></i></div>
        <div class="money">₩</div>
        <div class="coin">₩</div>
      </div>
      <button class="carousel-arrow swiper-button-next next" type="button" aria-label="다음 슬라이드" @click="next">›</button>
      <div class="carousel-controls swiper-indicator">
        <div class="dots swiper-pagination" :aria-label="`${current + 1} / ${heroSlides.length}`"><button
            v-for="(_, i) in heroSlides" :key="i" type="button" :class="{ active: i === current }"
            :aria-label="`${i + 1}번 슬라이드`" :aria-current="i === current ? 'true' : undefined"
            @click="current = i"></button></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from 'vue'; import { heroSlides } from '@/data/homeData.js'
const current = ref(0); const slide = computed(() => heroSlides[current.value]); const next = () => current.value = (current.value + 1) % heroSlides.length; const previous = () => current.value = (current.value - 1 + heroSlides.length) % heroSlides.length
</script>
