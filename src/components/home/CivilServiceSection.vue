<template>
  <section class="home-section policy-dashboard civil-dashboard" aria-labelledby="civil-dashboard-title">
    <div class="krds-container">
      <div class="policy-dashboard__heading">
        <div>
          <p>민원 서비스 한눈에 보기</p>
          <h2 id="civil-dashboard-title">자주 이용하는 민원 서비스</h2>
        </div>
        <div class="policy-dashboard__actions">
          <button type="button" class="krds-btn medium icon border" aria-label="이전 민원 서비스" @click="scrollCards(-1)">
            <i class="svg-icon ico-angle left" aria-hidden="true"></i>
          </button>
          <button type="button" class="krds-btn medium icon border" aria-label="다음 민원 서비스" @click="scrollCards(1)">
            <i class="svg-icon ico-angle right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div ref="cardTrack" class="policy-dashboard__track" tabindex="0" aria-label="민원 서비스 카드 목록">
        <article v-for="service in civilServices" :key="service.title" class="policy-dashboard__card civil-dashboard__card">
          <div class="policy-dashboard__badges">
            <span class="krds-badge bg-light-primary">{{ service.badge }}</span>
            <span class="krds-badge outline-gray">온라인 신청</span>
          </div>
          <p class="policy-dashboard__agency">정부24</p>
          <h3>{{ service.title }}</h3>
          <p class="policy-dashboard__summary">{{ service.description }}</p>
          <a :href="service.href" target="_blank" rel="noopener noreferrer" class="krds-btn small link basic">
            바로가기 <span class="sr-only">(새 창)</span><i class="svg-icon ico-angle right" aria-hidden="true"></i>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { civilServices } from '@/data/homeData.js'

const cardTrack = ref(null)

function scrollCards(direction) {
  const track = cardTrack.value
  if (!track) return
  track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.8, 720), behavior: 'smooth' })
}
</script>
