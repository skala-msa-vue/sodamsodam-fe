<template>
  <section
    ref="rootEl"
    class="home-section policy-dashboard"
    aria-labelledby="policy-dashboard-title"
    @mouseenter="pauseHover"
    @mouseleave="resumeHover"
    @focusin="pauseHover"
    @focusout="resumeHover"
  >
    <div class="krds-container">
      <div class="policy-dashboard__heading">
        <div>
          <p>맞춤 정책 한눈에 보기</p>
          <h2 id="policy-dashboard-title">지금 신청할 수 있는 정책</h2>
        </div>
        <div class="policy-dashboard__actions">
          <router-link to="/policies" class="krds-btn medium text">전체 정책 보기 <i class="svg-icon ico-angle right" aria-hidden="true"></i></router-link>
          <button type="button" class="krds-btn medium icon border" aria-label="이전 정책" @click="scrollCards(-1)"><i class="svg-icon ico-angle left" aria-hidden="true"></i></button>
          <button type="button" class="krds-btn medium icon border" aria-label="다음 정책" @click="scrollCards(1)"><i class="svg-icon ico-angle right" aria-hidden="true"></i></button>
        </div>
      </div>

      <div ref="cardTrack" class="policy-dashboard__track" tabindex="0" aria-label="정책 카드 목록" @pointerdown="pauseHover">
        <article v-for="policy in policyMocks" :key="policy.id" class="policy-dashboard__card">
          <div class="policy-dashboard__badges">
            <span class="krds-badge bg-light-primary">{{ categoryLabels[policy.category] }}</span>
            <span class="krds-badge outline-gray">{{ policy.region }}</span>
          </div>
          <p class="policy-dashboard__agency">{{ policy.agency }}</p>
          <h3>{{ policy.title }}</h3>
          <p class="policy-dashboard__summary">{{ policy.summary }}</p>
          <dl>
            <div><dt>지원내용</dt><dd>{{ policy.support }}</dd></div>
            <div><dt>신청기한</dt><dd>{{ policy.deadline }}</dd></div>
          </dl>
          <router-link :to="`/policies/${policy.id}/check`" class="krds-btn small link basic">자격 확인하기 <i class="svg-icon ico-angle right" aria-hidden="true"></i></router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { categoryLabels, policyMocks } from '@/data/policyMocks.js'
import { nextCardInTrack, useAutoplay } from '@/composables/useAutoplay.js'

const cardTrack = ref(null)
const rootEl = ref(null)

function scrollCards(direction) {
  const track = cardTrack.value
  if (!track) return
  if (direction > 0) {
    nextCardInTrack(track)
  } else {
    const card = track.querySelector(':scope > *')
    if (!card) return
    const styles = getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    const step = card.getBoundingClientRect().width + gap
    track.scrollBy({ left: -step, behavior: 'smooth' })
  }
  restart()
}

const { pauseHover, resumeHover, observe, restart } = useAutoplay(() => nextCardInTrack(cardTrack.value))

onMounted(() => observe(rootEl.value))
</script>
