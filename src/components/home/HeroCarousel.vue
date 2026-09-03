<template>
  <section
    ref="rootEl"
    class="hero-carousel"
    :class="{ 'is-paused': paused }"
    aria-roledescription="carousel"
    aria-label="주요 정책 안내"
    @mouseenter="pauseHover"
    @mouseleave="resumeHover"
    @focusin="pauseHover"
    @focusout="resumeHover"
  >
    <div class="krds-container hero-frame">
      <button class="carousel-arrow swiper-button-prev prev" type="button" aria-label="이전 슬라이드" @click="goPrevious">
        ‹
      </button>

      <div class="hero-copy-slot">
        <Transition name="hero-copy" mode="out-in">
          <div :key="current" class="hero-content">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.description }}</p>
            <router-link v-if="slide.href.startsWith('/')" :to="slide.href" class="krds-btn large primary">
              {{ slide.buttonText }}
            </router-link>
            <a v-else :href="slide.href" class="krds-btn large primary">{{ slide.buttonText }}</a>
          </div>
        </Transition>
      </div>

      <div class="hero-art" role="img" :aria-label="slide.imageAlt">
        <img
          v-for="(item, i) in heroSlides"
          :key="item.image"
          :src="item.image"
          :alt="i === current ? item.imageAlt : ''"
          :class="{ 'is-active': i === current }"
          :fetchpriority="i === 0 ? 'high' : 'low'"
        />
      </div>

      <button class="carousel-arrow swiper-button-next next" type="button" aria-label="다음 슬라이드" @click="goNext">
        ›
      </button>

      <div class="carousel-controls swiper-indicator">
        <button
          type="button"
          class="carousel-autoplay"
          :aria-pressed="paused ? 'false' : 'true'"
          :aria-label="paused ? '자동 넘김 시작' : '자동 넘김 일시정지'"
          @click="toggle"
        >
          {{ paused ? '재생' : '정지' }}
        </button>
        <div class="dots swiper-pagination" :aria-label="`${current + 1} / ${heroSlides.length}`">
          <button
            v-for="(_, i) in heroSlides"
            :key="i"
            type="button"
            :class="{ active: i === current }"
            :aria-label="`${i + 1}번 슬라이드`"
            :aria-current="i === current ? 'true' : undefined"
            @click="goTo(i)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { heroSlides } from '@/data/homeData.js'
import { AUTOPLAY_INTERVAL_MS, useAutoplay } from '@/composables/useAutoplay.js'

const current = ref(0)
const rootEl = ref(null)
const slide = computed(() => heroSlides[current.value])

function advance() {
  current.value = (current.value + 1) % heroSlides.length
}

function goNext() {
  advance()
  restart()
}

function goPrevious() {
  current.value = (current.value - 1 + heroSlides.length) % heroSlides.length
  restart()
}

function goTo(index) {
  current.value = index
  restart()
}

const { paused, pauseHover, resumeHover, toggle, observe, restart } = useAutoplay(advance, {
  interval: AUTOPLAY_INTERVAL_MS
})

onMounted(() => observe(rootEl.value))
</script>
