<template>
  <section class="home-section">
    <div class="krds-container">
      <SectionHeader title="주요 지원 사업" />
      <div class="complex-layout">
        <article class="feature-card">
          <h3>내 조건에 맞는<br>정책을 찾아보세요</h3>
          <p>나이·지역·사업 정보만 입력하면<br>신청을 살펴볼 정책을 안내합니다.</p>
          <router-link to="/policy-match">맞춤 정책 확인하기 →</router-link>
        </article>
        <button class="small-arrow complex-prev" type="button" aria-label="이전 콘텐츠" @click="scrollCards(-1)">‹</button>
        <div ref="cardTrack" class="complex-cards">
          <ContentCard v-for="item in complexContents" :key="item.title" v-bind="item" />
        </div>
        <button class="small-arrow complex-next" type="button" aria-label="다음 콘텐츠" @click="scrollCards(1)">›</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ContentCard from '@/components/common/ContentCard.vue'
import { complexContents } from '@/data/homeData.js'
import { nextCardInTrack } from '@/composables/useAutoplay.js'

const cardTrack = ref(null)

function scrollCards(direction) {
  const track = cardTrack.value
  if (!track) return
  if (direction > 0) {
    nextCardInTrack(track)
    return
  }
  const card = track.querySelector(':scope > *')
  if (!card) return
  const styles = getComputedStyle(track)
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
  const step = card.getBoundingClientRect().width + gap
  track.scrollBy({ left: -step, behavior: 'smooth' })
}
</script>
