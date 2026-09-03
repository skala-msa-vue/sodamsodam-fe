<template>
  <div class="policy-page">
    <SkipLink target-id="contents" link-text="본문 바로가기" />
    <AppHeader />

    <main id="contents" class="policy-main">
      <div class="contents-wrap">
        <Breadcrumb aria-label="현재 경로" :items="breadcrumbItems" />

        <header class="page-heading policy-heading">
          <div>
            <h1>지원정책 찾기</h1>
            <p>사업 조건에 맞는 정책을 검색하고 신청 전 자격을 확인해 보세요.</p>
          </div>
        </header>

        <section class="search-panel" aria-labelledby="search-title">
          <h2 id="search-title">검색 조건</h2>
          <div class="search-grid">
            <TextInput
              id="policy-keyword"
              v-model="keyword"
              label="검색어"
              placeholder="정책명, 기관명, 지원내용을 입력하세요"
              show-clear-button
            />
            <Select
              id="policy-category"
              v-model="selectedCategory"
              label="지원 분야"
              title="지원 분야 선택"
              hint=""
              :options="categoryOptions"
            />
            <Select
              id="policy-region"
              v-model="selectedRegion"
              label="사업장 지역"
              title="사업장 지역 선택"
              hint=""
              :options="regionOptions"
            />
          </div>
          <div class="search-actions">
            <Button variant="tertiary" size="medium" @click="resetFilters">조건 초기화</Button>
          </div>
        </section>

        <section class="result-section" aria-labelledby="result-title" aria-live="polite">
          <div class="result-header">
            <div>
              <h2 id="result-title">검색 결과</h2>
              <p>총 <strong>{{ filteredPolicies.length }}</strong>개의 정책을 찾았습니다.</p>
            </div>
          </div>

          <div v-if="filteredPolicies.length" class="policy-list">
            <article v-for="policy in filteredPolicies" :key="policy.id" class="policy-item">
              <div class="policy-copy">
                <div class="policy-badges">
                  <Badge variant="light" color="primary" size="small">
                    {{ categoryLabels[policy.category] }}
                  </Badge>
                  <Badge variant="outline" color="gray" size="small">{{ policy.region }}</Badge>
                </div>
                <p class="policy-agency">{{ policy.agency }}</p>
                <h3>{{ policy.title }}</h3>
                <p class="policy-summary">{{ policy.summary }}</p>
                <dl class="policy-meta">
                  <div>
                    <dt>지원 내용</dt>
                    <dd>{{ policy.support }}</dd>
                  </div>
                  <div>
                    <dt>신청 기간</dt>
                    <dd>{{ policy.deadline }}</dd>
                  </div>
                </dl>
                <div class="policy-tags" aria-label="정책 키워드">
                  <span v-for="tag in policy.tags" :key="tag">#{{ tag }}</span>
                </div>
              </div>
              <div class="policy-action">
                <router-link :to="`/policies/${policy.id}/check`" class="krds-btn primary medium">
                  자격 확인 및 신청
                </router-link>
              </div>
            </article>
          </div>

          <div v-else class="empty-state">
            <h3>조건에 맞는 정책이 없습니다.</h3>
            <p>검색어를 줄이거나 지역과 지원 분야를 전체로 변경해 보세요.</p>
            <Button variant="primary" size="medium" @click="resetFilters">전체 정책 보기</Button>
          </div>
        </section>
      </div>
    </main>

    <Footer
      hide-quick-links
      hide-identifier
      address="소담소담은 국민에게 맞춤형 정부 지원정책을 안내하는 공공 서비스입니다."
      copyright="© 소담소담"
      :bottom-links="footerLinks"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Badge, Breadcrumb, Button, Footer, Select, SkipLink, TextInput } from 'krds-vue'
import AppHeader from '@/components/AppHeader.vue'
import { categoryLabels, policyMocks } from '@/data/policyMocks.js'

const keyword = ref('')
const selectedCategory = ref('ALL')
const selectedRegion = ref('ALL')

const breadcrumbItems = [
  { text: '홈', href: '/' },
  { text: '지원정책 찾기', href: '/policies', disabled: true }
]

const categoryOptions = [
  { value: 'ALL', label: '전체 분야' },
  ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label }))
]

const regionOptions = [
  { value: 'ALL', label: '전체 지역' },
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '경기', label: '경기' },
  { value: '기타', label: '기타 지역' }
]

const footerLinks = [
  { text: '개인정보 처리방침', href: '#privacy', isHighlighted: true },
  { text: '이용약관', href: '#terms' }
]

const filteredPolicies = computed(() => {
  const query = keyword.value.trim().toLocaleLowerCase('ko-KR')

  return policyMocks.filter((policy) => {
    const searchable = [policy.title, policy.agency, policy.summary, ...policy.tags]
      .join(' ')
      .toLocaleLowerCase('ko-KR')
    const matchesKeyword = !query || searchable.includes(query)
    const matchesCategory = selectedCategory.value === 'ALL' || policy.category === selectedCategory.value
    const matchesRegion = selectedRegion.value === 'ALL'
      || policy.region === '전국'
      || policy.region === selectedRegion.value

    return matchesKeyword && matchesCategory && matchesRegion
  })
})

function resetFilters() {
  keyword.value = ''
  selectedCategory.value = 'ALL'
  selectedRegion.value = 'ALL'
}
</script>

<style scoped>
.policy-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--krds-light-color-surface-white);
}

.policy-main {
  flex: 1;
  padding-block: var(--krds-gap-8) var(--krds-gap-10);
}

.policy-heading {
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--krds-gap-6);
}

.search-panel {
  padding: var(--krds-padding-8);
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}

.search-panel h2,
.result-header h2 {
  margin-bottom: var(--krds-gap-5);
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-xsmall);
}

.search-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(12rem, 1fr) minmax(12rem, 1fr);
  gap: var(--krds-gap-5);
  align-items: end;
}

.search-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--krds-gap-5);
}

.result-section {
  margin-top: var(--krds-gap-9);
}

.result-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: var(--krds-gap-5);
}

.result-header h2 {
  margin-bottom: var(--krds-gap-2);
}

.result-header p {
  color: var(--krds-light-color-text-subtle);
}

.policy-list {
  display: flex;
  flex-direction: column;
  gap: var(--krds-gap-4);
}

.policy-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--krds-gap-8);
  padding: var(--krds-padding-8);
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}

.policy-copy {
  min-width: 0;
}

.policy-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--krds-gap-2);
  margin-bottom: var(--krds-gap-4);
}

.policy-agency {
  margin-bottom: var(--krds-gap-2);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.policy-item h3 {
  margin-bottom: var(--krds-gap-3);
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-small);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.policy-summary {
  max-width: 72ch;
  color: var(--krds-light-color-text-basic);
  font-size: var(--krds-pc-font-size-body-small);
  overflow-wrap: anywhere;
}

.policy-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--krds-gap-7);
  margin-top: var(--krds-gap-5);
}

.policy-meta div {
  display: grid;
  grid-template-columns: auto auto;
  gap: var(--krds-gap-3);
}

.policy-meta dt {
  color: var(--krds-light-color-text-subtle);
}

.policy-meta dd {
  color: var(--krds-light-color-text-bolder);
  font-weight: var(--krds-font-weight-bold);
}

.policy-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--krds-gap-3);
  margin-top: var(--krds-gap-5);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.policy-action {
  display: flex;
  align-items: center;
}

.empty-state {
  padding: var(--krds-padding-10) var(--krds-padding-8);
  text-align: center;
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}

.empty-state h3 {
  margin-bottom: var(--krds-gap-3);
  font-size: var(--krds-pc-font-size-heading-xsmall);
}

.empty-state p {
  margin-bottom: var(--krds-gap-6);
  color: var(--krds-light-color-text-subtle);
}

@media (max-width: 1023px) {
  .search-grid {
    grid-template-columns: 1fr 1fr;
  }

  .search-grid > :first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 767px) {
  .policy-main {
    padding-block: var(--krds-gap-6) var(--krds-gap-8);
  }

  .policy-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .search-panel,
  .policy-item {
    padding: var(--krds-padding-6);
  }

  .search-grid,
  .policy-item {
    grid-template-columns: 1fr;
  }

  .search-grid > :first-child {
    grid-column: auto;
  }

  .policy-action .krds-btn {
    width: 100%;
    justify-content: center;
  }

  .policy-meta {
    flex-direction: column;
    gap: var(--krds-gap-3);
  }
}
</style>
