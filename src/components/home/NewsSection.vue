<template>
  <section class="home-section">
    <div class="krds-container">
      <SectionHeader title="소식" />
      <div class="krds-tab-area layer">
        <div class="tab line">
          <ul role="tablist" aria-label="소식 분류">
            <li
              v-for="(tab, i) in newsTabs"
              :id="`tab-${i}`"
              :key="tab"
              role="tab"
              :aria-selected="active === i"
              :aria-controls="`news-panel-${i}`"
              :class="{ active: active === i }"
            >
              <button type="button" class="btn-tab" @click="active = i">
                {{ tab }}<span v-if="active === i" class="sr-only"> 선택됨</span>
              </button>
            </li>
          </ul>
        </div>
        <div class="tab-conts-wrap">
          <section :id="`news-panel-${active}`" class="tab-conts active" role="tabpanel" :aria-labelledby="`tab-${active}`">
            <div v-if="visibleNews.length" class="news-grid">
              <article v-for="item in visibleNews" :key="item.title" class="news-card">
                <div>
                  <span class="news-category">{{ item.category }}</span>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                </div>
              </article>
            </div>
            <p v-else class="news-empty">이 분류에 해당하는 소식이 없습니다.</p>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import { newsItems, newsTabs } from '@/data/homeData.js'

const active = ref(0)
const visibleNews = computed(() =>
  active.value === 0 ? newsItems : newsItems.filter((item) => item.category === newsTabs[active.value])
)
</script>
