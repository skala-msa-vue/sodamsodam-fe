<template>
  <div class="check-page">
    <SkipLink target-id="contents" link-text="본문 바로가기" />
    <AppHeader />

    <main id="contents" class="check-main">
      <div class="contents-wrap">
        <Breadcrumb aria-label="현재 경로" :items="breadcrumbItems" />

        <header class="page-heading check-heading">
          <h1>신청 자격 확인</h1>
          <p>사업 정보를 입력하면 선택한 정책의 기본 자격조건을 확인합니다.</p>
        </header>

        <div v-if="policy" class="check-layout">
          <aside class="policy-summary" aria-labelledby="selected-policy-title">
            <Badge variant="light" color="primary" size="small">
              {{ categoryLabels[policy.category] }}
            </Badge>
            <p>{{ policy.agency }}</p>
            <h2 id="selected-policy-title">{{ policy.title }}</h2>
            <dl>
              <div><dt>지원 내용</dt><dd>{{ policy.support }}</dd></div>
              <div><dt>대상 지역</dt><dd>{{ policy.region }}</dd></div>
              <div><dt>신청 기간</dt><dd>{{ policy.deadline }}</dd></div>
            </dl>
            <router-link to="/policies" class="krds-btn tertiary medium">다른 정책 찾기</router-link>
          </aside>

          <section class="check-form-panel" aria-labelledby="check-form-title">
            <h2 id="check-form-title">사업자 정보 입력</h2>
            <p class="form-description">모든 항목을 입력한 뒤 결과를 확인해 주세요.</p>

            <form class="check-form" @submit.prevent="checkEligibility" novalidate>
              <Select
                id="business-region"
                v-model="form.region"
                label="사업장 지역 (필수) *"
                title="사업장 지역 선택"
                hint=""
                :options="regionOptions"
                :status="errors.region ? 'error' : 'default'"
                :error-message="errors.region"
              />
              <Select
                id="business-type"
                v-model="form.businessType"
                label="사업자 유형 (필수) *"
                title="사업자 유형 선택"
                hint=""
                :options="businessTypeOptions"
                :status="errors.businessType ? 'error' : 'default'"
                :error-message="errors.businessType"
              />
              <TextInput
                id="business-months"
                v-model="form.businessMonths"
                label="업력 (개월, 필수) *"
                placeholder="예: 18"
                :error="errors.businessMonths"
              />
              <TextInput
                id="annual-revenue"
                v-model="form.annualRevenue"
                label="연 매출액 (만원, 필수) *"
                placeholder="예: 35000"
                :error="errors.annualRevenue"
              />
              <TextInput
                id="employee-count"
                v-model="form.employees"
                label="상시근로자 수 (명, 필수) *"
                placeholder="예: 3"
                :error="errors.employees"
              />

              <Button variant="primary" size="large" class="check-submit" @click="checkEligibility">
                자격 확인하기
              </Button>
            </form>

            <section v-if="result" ref="resultRef" class="check-result" tabindex="-1" aria-live="polite">
              <div class="result-title-row">
                <Badge
                  variant="light"
                  :color="result.eligible ? 'success' : 'danger'"
                  size="small"
                >
                  {{ result.eligible ? '기본 자격 충족' : '조건 확인 필요' }}
                </Badge>
                <h3>{{ result.eligible ? '신청 가능성이 있습니다.' : '일부 조건을 충족하지 못했습니다.' }}</h3>
              </div>

              <ul class="condition-list">
                <li v-for="item in result.items" :key="item.label" :class="{ failed: !item.passed }">
                  <strong>{{ item.passed ? '충족' : '미충족' }}</strong>
                  <span>{{ item.label }}</span>
                </li>
              </ul>

              <div class="result-actions">
                <router-link
                  v-if="result.eligible"
                  :to="`/policies/${policy.id}/apply`"
                  class="krds-btn primary medium"
                >
                  신청서 작성하기
                </router-link>
                <router-link to="/policies" class="krds-btn tertiary medium">다른 정책 찾기</router-link>
              </div>
            </section>
          </section>
        </div>

        <div v-else class="not-found">
          <h2>정책 정보를 찾을 수 없습니다.</h2>
          <router-link to="/policies" class="krds-btn primary medium">정책 목록으로 돌아가기</router-link>
        </div>
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
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Badge, Breadcrumb, Button, Footer, Select, SkipLink, TextInput } from 'krds-vue'
import AppHeader from '@/components/AppHeader.vue'
import { categoryLabels, evaluateEligibility, findMockPolicy } from '@/data/policyMocks.js'

const route = useRoute()
const policy = computed(() => findMockPolicy(route.params.id))
const resultRef = ref(null)
const result = ref(null)
const footerLinks = [
  { text: '개인정보 처리방침', href: '#privacy', isHighlighted: true },
  { text: '이용약관', href: '#terms' }
]

const form = ref({
  region: '',
  businessType: '',
  businessMonths: '',
  annualRevenue: '',
  employees: ''
})

const errors = ref({
  region: '',
  businessType: '',
  businessMonths: '',
  annualRevenue: '',
  employees: ''
})

const breadcrumbItems = [
  { text: '홈', href: '/' },
  { text: '지원정책 찾기', href: '/policies' },
  { text: '신청 자격 확인', href: route.fullPath, disabled: true }
]

const regionOptions = [
  { value: '', label: '지역을 선택하세요' },
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '경기', label: '경기' },
  { value: '기타', label: '기타 지역' }
]

const businessTypeOptions = [
  { value: '', label: '사업자 유형을 선택하세요' },
  { value: 'INDIVIDUAL', label: '개인사업자' },
  { value: 'CORPORATION', label: '법인사업자' }
]

function positiveInteger(value, emptyMessage, invalidMessage) {
  if (String(value).trim() === '') return emptyMessage
  const number = Number(value)
  if (!Number.isFinite(number) || !Number.isInteger(number) || number < 0) {
    return invalidMessage
  }
  return ''
}

function validate() {
  errors.value = {
    region: form.value.region ? '' : '사업장 지역을 선택해 주세요.',
    businessType: form.value.businessType ? '' : '사업자 유형을 선택해 주세요.',
    businessMonths: positiveInteger(form.value.businessMonths, '업력을 입력해 주세요.', '업력은 0 이상의 숫자로 입력해 주세요.'),
    annualRevenue: positiveInteger(form.value.annualRevenue, '연 매출액을 입력해 주세요.', '연 매출액은 0 이상의 숫자로 입력해 주세요.'),
    employees: positiveInteger(form.value.employees, '상시근로자 수를 입력해 주세요.', '상시근로자 수는 0 이상의 숫자로 입력해 주세요.')
  }
  return !Object.values(errors.value).some(Boolean)
}

function resetResult() {
  result.value = null
}

watch(() => route.params.id, resetResult)

function checkEligibility() {
  result.value = null
  if (!policy.value || !validate()) return

  result.value = evaluateEligibility(policy.value, form.value)
  nextTick(() => resultRef.value?.focus())
}
</script>

<style scoped>
.check-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--krds-light-color-surface-white);
}

.check-main {
  flex: 1;
  padding-block: var(--krds-gap-8) var(--krds-gap-10);
}

.check-layout {
  display: grid;
  grid-template-columns: minmax(16rem, 0.7fr) minmax(0, 1.3fr);
  gap: var(--krds-gap-6);
  align-items: start;
  margin-top: var(--krds-gap-6);
}

.policy-summary,
.check-form-panel,
.not-found {
  padding: var(--krds-padding-8);
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}

.policy-summary > p {
  margin-top: var(--krds-gap-5);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.policy-summary h2,
.check-form-panel h2 {
  margin-top: var(--krds-gap-2);
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-small);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.policy-summary dl {
  margin-block: var(--krds-gap-7);
}

.policy-summary dl div {
  padding-block: var(--krds-padding-4);
  border-bottom: 1px solid var(--krds-light-color-divider-gray-light);
}

.policy-summary dt {
  margin-bottom: var(--krds-gap-2);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.policy-summary dd {
  color: var(--krds-light-color-text-bolder);
  font-weight: var(--krds-font-weight-bold);
}

.form-description {
  margin-block: var(--krds-gap-3) var(--krds-gap-7);
  color: var(--krds-light-color-text-subtle);
}

.check-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--krds-gap-6);
}

.check-form > :nth-child(n + 3) {
  grid-column: 1 / -1;
}

.check-submit {
  width: 100%;
  justify-content: center;
}

.check-result {
  margin-top: var(--krds-gap-8);
  padding: var(--krds-padding-7);
  background: var(--krds-light-color-surface-information-subtler);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
  outline: none;
}

.check-result:focus-visible {
  outline: 2px solid var(--krds-light-color-border-primary);
  outline-offset: 3px;
}

.result-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--krds-gap-3);
}

.result-title-row h3 {
  font-size: var(--krds-pc-font-size-heading-xsmall);
}

.condition-list {
  display: flex;
  flex-direction: column;
  gap: var(--krds-gap-3);
  margin-top: var(--krds-gap-6);
  list-style: none;
}

.condition-list li {
  display: flex;
  gap: var(--krds-gap-4);
  align-items: baseline;
}

.condition-list span {
  overflow-wrap: anywhere;
}

.condition-list strong {
  min-width: 3.5rem;
  color: var(--krds-light-color-text-success);
}

.condition-list .failed strong {
  color: var(--krds-light-color-text-danger);
}

.result-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--krds-gap-3);
  margin-top: var(--krds-gap-6);
}

.not-found {
  margin-top: var(--krds-gap-6);
  text-align: center;
}

.not-found h2 {
  margin-bottom: var(--krds-gap-6);
}

@media (max-width: 767px) {
  .check-main {
    padding-block: var(--krds-gap-6) var(--krds-gap-8);
  }

  .check-layout,
  .check-form {
    grid-template-columns: 1fr;
  }

  .check-form > :nth-child(n + 3) {
    grid-column: auto;
  }

  .policy-summary,
  .check-form-panel {
    padding: var(--krds-padding-6);
  }

  .result-actions {
    flex-direction: column-reverse;
  }

  .result-actions .krds-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
