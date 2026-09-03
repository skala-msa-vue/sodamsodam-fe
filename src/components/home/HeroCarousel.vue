<template>
  <section class="hero-carousel" aria-roledescription="carousel" aria-label="주요 정책 안내" @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="krds-container hero-frame">
      <button class="carousel-arrow swiper-button-prev prev" type="button" aria-label="이전 슬라이드"
        @click="previous">‹</button>
      <div class="hero-content" aria-live="polite"><span>{{ slide.eyebrow }}</span>
        <h1>{{ slide.title }}</h1>
        <p>{{ slide.description }}</p><a href="#" class="krds-btn large primary">자세히 보러가기</a>
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
            @click="current = i"></button></div><button type="button"
          :class="paused ? 'swiper-button-play' : 'swiper-button-stop'" :aria-label="paused ? '자동 재생 시작' : '자동 재생 정지'"
          @click="paused = !paused">{{ paused ? '▶' : 'Ⅱ' }}</button><button type="button" class="swiper-button-more"
          aria-label="슬라이드 전체 보기">＋</button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'; import { heroSlides } from '@/data/homeData.js'
const current = ref(0), paused = ref(false), hovering = ref(false); const slide = computed(() => heroSlides[current.value]); const next = () => current.value = (current.value + 1) % heroSlides.length; const previous = () => current.value = (current.value - 1 + heroSlides.length) % heroSlides.length; const timer = setInterval(() => { if (!paused.value && !hovering.value) next() }, 5500); onBeforeUnmount(() => clearInterval(timer))
</script>
