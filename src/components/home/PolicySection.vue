<template>
  <section class="home-section">
    <div class="krds-container">
      <SectionHeader title="정책 소개" />
      <div class="policy-grid">
        <article v-for="policy in featuredPolicies" :key="policy.id" class="content-card policy-intro-card">
          <div class="card-copy">
            <div class="policy-intro-card__badges">
              <span class="krds-badge bg-light-primary">{{ categoryLabels[policy.category] }}</span>
              <span class="krds-badge outline-gray">{{ policy.region }}</span>
            </div>
            <p class="policy-intro-card__agency">{{ policy.agency }}</p>
            <h3>{{ policy.title }}</h3>
            <p>{{ policy.summary }}</p>
            <router-link :to="`/policies/${policy.id}/check`" class="krds-btn small link basic">
              자격 확인하기 <i class="svg-icon ico-angle right" aria-hidden="true"></i>
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import { categoryLabels, policyMocks } from '@/data/policyMocks.js'

const featuredPolicies = computed(() => policyMocks.slice(0, 3))
</script>
