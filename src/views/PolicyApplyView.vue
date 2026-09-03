<template>
  <div class="apply-page">
    <SkipLink target-id="contents" link-text="본문 바로가기" />
    <AppHeader />

    <main id="contents" class="apply-main">
      <div class="contents-wrap">
        <Breadcrumb aria-label="현재 경로" :items="breadcrumbItems" />

        <header class="page-heading">
          <h1>{{ completed ? '정책 신청 완료' : '정책 신청서 작성' }}</h1>
          <p>{{ completed ? '신청이 정상적으로 접수되었습니다.' : '신청 정보를 확인하고 필수 동의 항목에 동의해 주세요.' }}</p>
        </header>

        <StepIndicator
          :current-step="completed ? 4 : 3"
          :current-step-text="completed ? '현재 4단계, 접수 완료' : '현재 3단계, 신청서 작성'"
          :steps="steps"
        />

        <div v-if="!policy" class="not-found">
          <h2>정책 정보를 찾을 수 없습니다.</h2>
          <router-link to="/policies" class="krds-btn primary medium">정책 목록으로 돌아가기</router-link>
        </div>

        <section v-else-if="completed" ref="completeRef" class="complete-panel" tabindex="-1" aria-live="polite">
          <Badge variant="light" color="success" size="small">접수 완료</Badge>
          <h2>{{ application.policyTitle }}</h2>
          <p>신청번호 <strong>{{ application.id }}</strong>로 접수되었습니다.</p>

          <dl class="complete-summary">
            <div><dt>신청 기관</dt><dd>{{ application.agency }}</dd></div>
            <div><dt>신청 일시</dt><dd>{{ formatDate(application.appliedAt) }}</dd></div>
            <div><dt>현재 상태</dt><dd>접수 완료</dd></div>
          </dl>

          <div class="complete-actions">
            <router-link to="/enrollments" class="krds-btn primary medium">신청 현황 확인</router-link>
            <router-link to="/policies" class="krds-btn tertiary medium">다른 정책 찾기</router-link>
          </div>
        </section>

        <div v-else class="apply-layout">
          <aside class="policy-panel" aria-labelledby="apply-policy-title">
            <Badge variant="light" color="primary" size="small">{{ categoryLabels[policy.category] }}</Badge>
            <p>{{ policy.agency }}</p>
            <h2 id="apply-policy-title">{{ policy.title }}</h2>
            <dl>
              <div><dt>지원 내용</dt><dd>{{ policy.support }}</dd></div>
              <div><dt>대상 지역</dt><dd>{{ policy.region }}</dd></div>
              <div><dt>신청 기간</dt><dd>{{ policy.deadline }}</dd></div>
            </dl>
          </aside>

          <section class="application-panel" aria-labelledby="application-title">
            <h2 id="application-title">신청 정보</h2>
            <p class="section-description">로그인 정보와 신청 내용을 확인해 주세요.</p>

            <form @submit.prevent="submitApplication" novalidate>
              <div class="applicant-summary">
                <div><span>신청자</span><strong>{{ auth.user?.name || '-' }}</strong></div>
                <div><span>이메일</span><strong>{{ auth.user?.email || '-' }}</strong></div>
              </div>

              <div class="form-field">
                <label for="applicant-note">신청 사유 또는 담당자 참고사항 <span>(선택)</span></label>
                <textarea
                  id="applicant-note"
                  v-model="applicantNote"
                  rows="5"
                  maxlength="500"
                  placeholder="담당자에게 전달할 내용을 입력하세요."
                />
                <p>{{ applicantNote.length }} / 500자</p>
              </div>

              <section class="document-guide" aria-labelledby="document-title">
                <h3 id="document-title">신청 후 준비할 서류</h3>
                <TextList type="dash">
                  <TextListItem>사업자등록증 또는 사업자등록증명</TextListItem>
                  <TextListItem>최근 매출 확인 자료</TextListItem>
                  <TextListItem>지원금 수령 계좌 확인서</TextListItem>
                </TextList>
                <p>접수 후 담당기관 요청에 따라 서류를 제출합니다.</p>
              </section>

              <fieldset class="consent-group" :class="{ 'has-error': consentError }">
                <legend>필수 동의</legend>
                <Checkbox
                  id="consent-personal"
                  v-model="consents.personal"
                  size="large"
                  label="정책 신청 처리를 위한 개인정보 수집·이용에 동의합니다."
                />
                <Checkbox
                  id="consent-accuracy"
                  v-model="consents.accuracy"
                  size="large"
                  label="입력 정보가 사실과 다름없음을 확인합니다."
                />
                <p v-if="consentError" class="field-error">{{ consentError }}</p>
              </fieldset>

              <div class="form-actions">
                <router-link :to="`/policies/${policy.id}/check`" class="krds-btn tertiary large">이전</router-link>
                <button type="submit" class="krds-btn primary large">신청서 제출</button>
              </div>
            </form>
          </section>
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
import { computed, nextTick, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  Badge,
  Breadcrumb,
  Checkbox,
  Footer,
  SkipLink,
  StepIndicator,
  TextList,
  TextListItem
} from 'krds-vue'
import AppHeader from '@/components/AppHeader.vue'
import { useAuthStore } from '@/store/auth.js'
import { categoryLabels, findMockPolicy } from '@/data/policyMocks.js'
import { createPolicyApplication, findPolicyApplication } from '@/data/policyApplications.js'

const route = useRoute()
const auth = useAuthStore()
const policy = computed(() => findMockPolicy(route.params.id))
const applicantNote = ref('')
const consentError = ref('')
const application = ref(null)
const completed = ref(false)
const completeRef = ref(null)
const consents = reactive({ personal: false, accuracy: false })

const steps = [
  { step: '1', title: '정책 선택' },
  { step: '2', title: '자격 확인' },
  { step: '3', title: '신청서 작성' },
  { step: '4', title: '접수 완료' }
]

const breadcrumbItems = computed(() => [
  { text: '홈', href: '/' },
  { text: '지원정책 찾기', href: '/policies' },
  { text: completed.value ? '신청 완료' : '신청서 작성', href: route.fullPath, disabled: true }
])

const footerLinks = [
  { text: '개인정보 처리방침', href: '#privacy', isHighlighted: true },
  { text: '이용약관', href: '#terms' }
]

function formatDate(value) {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(value))
}

async function submitApplication() {
  consentError.value = ''
  if (!consents.personal || !consents.accuracy) {
    consentError.value = '필수 동의 항목을 모두 확인해 주세요.'
    return
  }

  if (!policy.value || !auth.user?.id) return

  application.value = findPolicyApplication(policy.value.id, auth.user.id)
    || createPolicyApplication({
      policy: policy.value,
      user: auth.user,
      applicantNote: applicantNote.value
    })
  completed.value = true
  await nextTick()
  completeRef.value?.focus()
}
</script>

<style scoped>
.apply-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--krds-light-color-surface-white);
}

.apply-main {
  flex: 1;
  padding-block: var(--krds-gap-8) var(--krds-gap-10);
}

.apply-layout {
  display: grid;
  grid-template-columns: minmax(16rem, 0.7fr) minmax(0, 1.3fr);
  gap: var(--krds-gap-6);
  align-items: start;
  margin-top: var(--krds-gap-7);
}

.policy-panel,
.application-panel,
.complete-panel,
.not-found {
  padding: var(--krds-padding-8);
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}

.policy-panel > p {
  margin-top: var(--krds-gap-5);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.policy-panel h2,
.application-panel h2,
.complete-panel h2 {
  margin-top: var(--krds-gap-2);
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-small);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.policy-panel dl {
  margin-top: var(--krds-gap-7);
}

.policy-panel dl div,
.complete-summary div {
  padding-block: var(--krds-padding-4);
  border-bottom: 1px solid var(--krds-light-color-divider-gray-light);
}

.policy-panel dt,
.complete-summary dt {
  margin-bottom: var(--krds-gap-2);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.policy-panel dd,
.complete-summary dd {
  color: var(--krds-light-color-text-bolder);
  font-weight: var(--krds-font-weight-bold);
}

.section-description {
  margin-block: var(--krds-gap-3) var(--krds-gap-7);
  color: var(--krds-light-color-text-subtle);
}

.applicant-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--krds-gap-5);
  padding: var(--krds-padding-6);
  background: var(--krds-light-color-background-gray-subtle);
  border-radius: var(--krds-radius-medium1);
}

.applicant-summary div {
  display: grid;
  gap: var(--krds-gap-2);
}

.applicant-summary span,
.form-field > p {
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.form-field,
.document-guide,
.consent-group {
  margin-top: var(--krds-gap-7);
}

.form-field label,
.consent-group legend,
.document-guide h3 {
  color: var(--krds-light-color-text-bolder);
  font-weight: var(--krds-font-weight-bold);
}

.form-field label span {
  color: var(--krds-light-color-text-subtle);
  font-weight: var(--krds-font-weight-regular);
}

.form-field textarea {
  width: 100%;
  margin-top: var(--krds-gap-3);
  padding: var(--krds-padding-4);
  resize: vertical;
  color: var(--krds-light-color-text-basic);
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-border-gray);
  border-radius: var(--krds-radius-medium1);
  font: inherit;
  line-height: 1.5;
}

.form-field textarea:focus-visible {
  outline: 2px solid var(--krds-light-color-border-primary);
  outline-offset: 2px;
}

.form-field > p {
  margin-top: var(--krds-gap-2);
  text-align: right;
}

.document-guide {
  padding: var(--krds-padding-6);
  background: var(--krds-light-color-surface-information-subtler);
  border-radius: var(--krds-radius-medium1);
}

.document-guide .krds-text-list {
  margin-top: var(--krds-gap-4);
}

.document-guide > p {
  margin-top: var(--krds-gap-4);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.consent-group {
  display: grid;
  gap: var(--krds-gap-4);
  padding: 0;
  border: 0;
}

.field-error {
  margin-top: var(--krds-gap-1);
  color: var(--krds-light-color-text-danger);
  font-size: var(--krds-pc-font-size-body-xsmall);
}

.form-actions,
.complete-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--krds-gap-3);
  margin-top: var(--krds-gap-8);
}

.complete-panel {
  max-width: 48rem;
  margin: var(--krds-gap-8) auto 0;
  outline: none;
}

.complete-panel > p {
  margin-top: var(--krds-gap-4);
  color: var(--krds-light-color-text-basic);
}

.complete-summary {
  margin-top: var(--krds-gap-7);
}

.not-found {
  margin-top: var(--krds-gap-7);
  text-align: center;
}

.not-found h2 {
  margin-bottom: var(--krds-gap-6);
}

@media (max-width: 767px) {
  .apply-main {
    padding-block: var(--krds-gap-6) var(--krds-gap-8);
  }

  .apply-layout,
  .applicant-summary {
    grid-template-columns: 1fr;
  }

  .policy-panel,
  .application-panel,
  .complete-panel {
    padding: var(--krds-padding-6);
  }

  .form-actions,
  .complete-actions {
    flex-direction: column-reverse;
  }

  .form-actions .krds-btn,
  .complete-actions .krds-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
