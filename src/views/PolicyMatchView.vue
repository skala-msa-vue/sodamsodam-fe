<template>
  <div class="match-page">
    <SkipLink target-id="contents" link-text="본문 바로가기" />
    <AppHeader />

    <main id="contents" class="match-main">
      <div class="contents-wrap">
        <Breadcrumb aria-label="현재 경로" :items="breadcrumbItems" />

        <header class="page-heading">
          <h1>맞춤 정책 확인</h1>
          <p>몇 가지 기본정보를 입력하면 신청 가능성이 높은 정부 지원정책을 찾아드립니다.</p>
        </header>

        <StepIndicator
          :current-step="currentStep"
          :current-step-text="currentStepText"
          :steps="steps"
        />

        <div class="match-layout">
          <section class="match-form-panel" aria-labelledby="condition-title">
            <h2 id="condition-title">사용자 조건 입력</h2>
            <p class="form-description">신청 전 상세 조건을 확인해 주세요. 주민번호·전화번호·상세주소는 받지 않습니다.</p>

            <form class="match-form" @submit.prevent="submitProfile" novalidate>
              <fieldset class="field-group" :class="{ 'has-error': errors.targetType }">
                <legend>대상 유형 (필수) *</legend>
                <RadioGroup
                  name="targetType"
                  :value="form.targetType"
                  @update:value="form.targetType = $event"
                >
                  <RadioChip id="target-youth" value="청년">청년</RadioChip>
                  <RadioChip id="target-newlywed" value="신혼부부">신혼부부</RadioChip>
                  <RadioChip id="target-biz" value="소상공인">소상공인</RadioChip>
                  <RadioChip id="target-senior" value="고령층">고령층</RadioChip>
                  <RadioChip id="target-etc" value="기타">기타</RadioChip>
                </RadioGroup>
                <p v-if="errors.targetType" class="field-error">{{ errors.targetType }}</p>
              </fieldset>

              <TextInput
                id="match-age"
                v-model="ageInput"
                label="만 나이 (필수) *"
                placeholder="예: 29"
                :error="errors.age"
              />

              <Select
                id="match-region"
                v-model="form.region"
                label="거주 지역 (필수) *"
                title="거주 지역 선택"
                hint=""
                :options="regionOptions"
                :status="errors.region ? 'error' : 'default'"
                :error-message="errors.region"
              />

              <Select
                id="match-income"
                v-model="form.incomeRange"
                label="월 소득 구간 (필수) *"
                title="월 소득 구간 선택"
                hint=""
                :options="incomeOptions"
                :status="errors.incomeRange ? 'error' : 'default'"
                :error-message="errors.incomeRange"
              />

              <TextInput
                id="match-household"
                v-model="householdInput"
                label="가구원 수 (필수) *"
                placeholder="예: 1"
                :error="errors.householdSize"
              />

              <fieldset class="field-group" :class="{ 'has-error': errors.interest }">
                <legend>관심 지원 분야 (필수) *</legend>
                <RadioGroup
                  name="interest"
                  :value="form.interest"
                  @update:value="form.interest = $event"
                >
                  <RadioChip id="interest-housing" value="주거">주거</RadioChip>
                  <RadioChip id="interest-finance" value="금융">금융</RadioChip>
                  <RadioChip id="interest-biz" value="창업·경영">창업·경영</RadioChip>
                  <RadioChip id="interest-job" value="취업·교육">취업·교육</RadioChip>
                  <RadioChip id="interest-welfare" value="복지">복지</RadioChip>
                </RadioGroup>
                <p v-if="errors.interest" class="field-error">{{ errors.interest }}</p>
              </fieldset>

              <Button
                variant="primary"
                size="large"
                class="match-submit"
                :disabled="loading"
                :aria-busy="loading"
                @click="submitProfile"
              >
                {{ loading ? '추천 정책을 찾는 중' : '맞춤 정책 확인하기' }}
              </Button>
            </form>
          </section>

        </div>

        <section
          v-if="submitted"
          ref="resultRef"
          class="match-results"
          tabindex="-1"
          aria-labelledby="result-title"
          aria-live="polite"
        >
          <h2 id="result-title">추천 결과</h2>
          <p>관심 분야와 관련된 정책을 최대 3개까지 보여 드립니다. 신청 전 상세 조건을 확인해 주세요.</p>

          <div v-if="loading" class="result-status">
            <Spinner label="추천 정책을 찾는 중입니다." />
            <p>관심 분야와 관련된 정책을 찾고 있습니다.</p>
          </div>

          <CriticalAlert v-else-if="resultAlert" :alerts="[resultAlert]" />

          <template v-else-if="recommendations.length">
            <div class="result-grid">
              <article v-for="item in recommendations" :key="`${item.source}-${item.id}`" class="result-card">
                <div class="result-card__top">
                  <Badge variant="light" color="primary" size="small">
                    {{ item.categoryLabel }}
                  </Badge>
                  <Badge variant="light" color="information" size="small">추천 정책</Badge>
                </div>
                <p v-if="item.agency" class="result-card__agency">{{ item.agency }}</p>
                <h3>{{ item.title }}</h3>
                <p class="result-card__desc">{{ item.description }}</p>
                <dl class="result-card__meta">
                  <div>
                    <dt>지원 내용</dt>
                    <dd>{{ item.support }}</dd>
                  </div>
                  <div>
                    <dt>{{ item.metaLabel }}</dt>
                    <dd>{{ item.metaValue }}</dd>
                  </div>
                </dl>
                <router-link :to="item.detailPath" class="krds-btn tertiary medium">
                  상세보기
                </router-link>
              </article>
            </div>
          </template>

          <div v-else class="result-status">
            <h3>추천 결과 없음</h3>
            <p>현재 조건에 맞는 추천 정책이 없습니다. 정책 목록에서 다른 지원사업을 확인해 보세요.</p>
            <router-link to="/policies" class="krds-btn primary medium">정책 목록 보기</router-link>
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
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import {
  Badge,
  Breadcrumb,
  Button,
  CriticalAlert,
  Footer,
  RadioChip,
  RadioGroup,
  Select,
  SkipLink,
  Spinner,
  StepIndicator,
  TextInput
} from 'krds-vue'
import AppHeader from '@/components/AppHeader.vue'
import { useAuthStore } from '@/store/auth.js'
import api from '@/api/index.js'
import { categoryLabels, policyMocks } from '@/data/policyMocks.js'

const PROFILE_KEY = 'sodam_policy_profile'
const NO_USER_MESSAGE = '로그인 사용자 정보를 확인할 수 없습니다. 다시 로그인해 주세요.'

const CATEGORY_LABELS = {
  BACKEND: '청년 지원',
  FRONTEND: '신혼·주거 지원',
  DEVOPS: '소상공인 지원',
  DATA_SCIENCE: '취업·교육 지원'
}

const auth = useAuthStore()
const resultRef = ref(null)
const submitted = ref(false)
const loading = ref(false)
const recommendations = ref([])
const resultAlert = ref(null)
const ageInput = ref('')
const householdInput = ref('1')

const form = reactive({
  targetType: '',
  age: null,
  region: '',
  incomeRange: '',
  householdSize: 1,
  interest: ''
})

const errors = reactive({
  targetType: '',
  age: '',
  region: '',
  incomeRange: '',
  householdSize: '',
  interest: ''
})

const breadcrumbItems = [
  { text: '홈', href: '/' },
  { text: '맞춤 정책 확인', href: '/policy-match', disabled: true }
]

const steps = [
  { step: '1', title: '조건 입력' },
  { step: '2', title: '맞춤 추천' },
  { step: '3', title: '상세 확인' }
]

const currentStep = computed(() => (submitted.value ? 2 : 1))
const currentStepText = computed(() =>
  submitted.value ? '현재 2단계, 맞춤 추천' : '현재 1단계, 조건 입력'
)

const regionOptions = [
  { value: '', label: '지역을 선택하세요' },
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '경기', label: '경기' },
  { value: '기타', label: '기타 지역' }
]

const incomeOptions = [
  { value: '', label: '소득 구간을 선택하세요' },
  { value: '100미만', label: '100만원 미만' },
  { value: '100-200', label: '100만원 이상 200만원 미만' },
  { value: '200-300', label: '200만원 이상 300만원 미만' },
  { value: '300-400', label: '300만원 이상 400만원 미만' },
  { value: '400이상', label: '400만원 이상' }
]

const footerLinks = [
  { text: '개인정보 처리방침', href: '#privacy', isHighlighted: true },
  { text: '이용약관', href: '#terms' }
]

function categoryLabel(category) {
  return CATEGORY_LABELS[category] || '기타 지원'
}

function formatSupport(price) {
  const value = Number(price)
  if (!Number.isFinite(value)) return '-'
  return `${value.toLocaleString('ko-KR')}원`
}

const INTEREST_CATEGORIES = {
  '주거': ['FINANCE'],
  '금융': ['FINANCE', 'DEBT'],
  '창업·경영': ['FINANCE', 'MARKETING', 'DIGITAL', 'RECOVERY'],
  '취업·교육': ['RECOVERY', 'DIGITAL'],
  '복지': ['RECOVERY', 'DEBT']
}

function normalizeApiRecommendation(item) {
  return {
    id: item.id,
    source: 'api',
    title: item.title,
    agency: '',
    categoryLabel: categoryLabel(item.category),
    description: item.description || '상세 지원 내용은 정책 상세 화면에서 확인해 주세요.',
    support: formatSupport(item.price),
    metaLabel: '누적 신청 건수',
    metaValue: `${Number(item.enrollmentCount ?? 0).toLocaleString('ko-KR')}건`,
    detailPath: `/courses/${item.id}`
  }
}

function normalizeMockRecommendation(policy) {
  return {
    id: policy.id,
    source: 'mock',
    title: policy.title,
    agency: policy.agency,
    categoryLabel: categoryLabels[policy.category] || '기타 지원',
    description: policy.summary,
    support: policy.support,
    metaLabel: '신청 기간',
    metaValue: policy.deadline,
    detailPath: `/policies/${policy.id}/check`
  }
}

function getMockRecommendations() {
  const preferredCategories = INTEREST_CATEGORIES[form.interest] || []

  return policyMocks
    .map((policy, index) => {
      const searchable = [policy.title, policy.summary, ...policy.tags].join(' ')
      let score = 0

      if (preferredCategories.includes(policy.category)) score += 4
      if (policy.region === form.region) score += 3
      if (policy.region === '전국') score += 1
      if (form.targetType === '소상공인' && searchable.includes('소상공인')) score += 3

      return { policy, score, index }
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map(({ policy }) => normalizeMockRecommendation(policy))
}

function integerField(value, emptyMessage, invalidMessage, min) {
  if (String(value).trim() === '') return emptyMessage
  const number = Number(value)
  if (!Number.isFinite(number) || !Number.isInteger(number) || number < min) {
    return invalidMessage
  }
  return ''
}

function validate() {
  errors.targetType = form.targetType ? '' : '대상 유형을 선택해 주세요.'
  errors.age = integerField(
    ageInput.value,
    '만 나이를 입력해 주세요.',
    '만 나이는 0 이상의 숫자로 입력해 주세요.',
    0
  )
  errors.region = form.region ? '' : '거주 지역을 선택해 주세요.'
  errors.incomeRange = form.incomeRange ? '' : '월 소득 구간을 선택해 주세요.'
  errors.householdSize = integerField(
    householdInput.value,
    '가구원 수를 입력해 주세요.',
    '가구원 수는 1 이상의 숫자로 입력해 주세요.',
    1
  )
  errors.interest = form.interest ? '' : '관심 지원 분야를 선택해 주세요.'
  return !Object.values(errors).some(Boolean)
}

function saveProfile() {
  form.age = Number(ageInput.value)
  form.householdSize = Number(householdInput.value)

  const profile = {
    targetType: form.targetType,
    age: form.age,
    region: form.region,
    incomeRange: form.incomeRange,
    householdSize: form.householdSize,
    interest: form.interest
  }

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return
    const saved = JSON.parse(raw)
    form.targetType = saved.targetType || ''
    form.age = saved.age ?? null
    form.region = saved.region || ''
    form.incomeRange = saved.incomeRange || ''
    form.householdSize = saved.householdSize ?? 1
    form.interest = saved.interest || ''
    ageInput.value = saved.age == null ? '' : String(saved.age)
    householdInput.value = saved.householdSize == null ? '1' : String(saved.householdSize)
  } catch {
    localStorage.removeItem(PROFILE_KEY)
  }
}

function parseRecommendations(payload) {
  if (Array.isArray(payload?.recommendedCourses)) return payload.recommendedCourses.map(normalizeApiRecommendation)
  if (Array.isArray(payload?.data?.recommendedCourses)) return payload.data.recommendedCourses.map(normalizeApiRecommendation)
  if (Array.isArray(payload?.data)) return payload.data.map(normalizeApiRecommendation)
  return []
}

async function fetchRecommendations() {
  const userId = auth.user?.id
  recommendations.value = []
  resultAlert.value = null

  if (!userId) {
    resultAlert.value = { variant: 'danger', message: NO_USER_MESSAGE }
    return
  }

  loading.value = true
  try {
    const res = await api.get(`/api/recommend/${userId}`)
    recommendations.value = parseRecommendations(res.data).slice(0, 3)

    if (!recommendations.value.length) {
      recommendations.value = getMockRecommendations()
    }
  } catch {
    recommendations.value = getMockRecommendations()
  } finally {
    loading.value = false
  }
}

async function submitProfile() {
  if (loading.value) return
  submitted.value = false
  resultAlert.value = null
  recommendations.value = []

  if (!validate()) return

  saveProfile()
  submitted.value = true
  await nextTick()
  resultRef.value?.focus()
  await fetchRecommendations()
}

onMounted(loadProfile)
</script>

<style scoped>
.match-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--krds-light-color-surface-white);
}

.match-main {
  flex: 1;
  padding-block: var(--krds-gap-8) var(--krds-gap-10);
}

.match-layout {
  display: grid;
  grid-template-columns: minmax(0, 52rem);
  align-items: start;
  margin-top: var(--krds-gap-8);
}

.match-form-panel,
.result-card,
.result-status {
  padding: var(--krds-padding-8);
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}

.match-form-panel h2,
.match-results h2,
.result-status h3 {
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-xsmall);
}

.form-description,
.match-results > p {
  margin-block: var(--krds-gap-3) var(--krds-gap-7);
  color: var(--krds-light-color-text-subtle);
}

.match-form {
  display: grid;
  gap: var(--krds-gap-6);
}

.field-group {
  border: 0;
  min-width: 0;
}

.field-group legend {
  margin-bottom: var(--krds-gap-3);
  color: var(--krds-light-color-text-bolder);
  font-weight: var(--krds-font-weight-bold);
}

.field-error {
  margin-top: var(--krds-gap-3);
  color: var(--krds-light-color-text-danger);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.match-submit {
  width: 100%;
  justify-content: center;
}

.match-results {
  margin-top: var(--krds-gap-9);
  outline: none;
}

.match-results:focus-visible {
  outline: 2px solid var(--krds-light-color-border-primary);
  outline-offset: 3px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--krds-gap-5);
}

.result-status {
  display: grid;
  gap: var(--krds-gap-4);
  justify-items: start;
}

.result-status p {
  color: var(--krds-light-color-text-subtle);
}

.result-card h3 {
  margin-block: var(--krds-gap-4) var(--krds-gap-3);
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-xsmall);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.result-card__top {
  display: flex;
  flex-wrap: wrap;
  gap: var(--krds-gap-2);
}

.result-card__agency {
  margin-top: var(--krds-gap-4);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.result-card__agency + h3 {
  margin-top: var(--krds-gap-2);
}

.result-card__desc {
  color: var(--krds-light-color-text-basic);
  font-size: var(--krds-pc-font-size-body-small);
  overflow-wrap: anywhere;
}

.result-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--krds-gap-7);
  margin-block: var(--krds-gap-5);
}

.result-card__meta dt {
  margin-bottom: var(--krds-gap-2);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.result-card__meta dd {
  color: var(--krds-light-color-text-bolder);
  font-weight: var(--krds-font-weight-bold);
}

@media (max-width: 1023px) {
  .match-layout,
  .result-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .match-main {
    padding-block: var(--krds-gap-6) var(--krds-gap-8);
  }

  .match-form-panel,
  .result-card,
  .result-status {
    padding: var(--krds-padding-6);
  }

  .result-card__meta {
    flex-direction: column;
    gap: var(--krds-gap-3);
  }
}
</style>
