<template>
  <div class="status-page">
    <SkipLink target-id="contents" link-text="본문 바로가기" />
    <AppHeader />

    <main id="contents" class="status-main">
      <div class="contents-wrap">
        <Breadcrumb aria-label="현재 경로" :items="breadcrumbItems" />
        <header class="page-heading">
          <h1>신청 현황</h1>
          <p>제출한 정책 신청 내역과 현재 진행 상태를 확인할 수 있습니다.</p>
        </header>

        <section class="status-section" aria-labelledby="status-title" aria-live="polite">
          <div class="status-heading">
            <h2 id="status-title">나의 신청 내역</h2>
            <p>총 <strong>{{ applications.length }}</strong>건</p>
          </div>

          <div v-if="applications.length" class="application-list">
            <article v-for="item in applications" :key="item.id" class="application-item">
              <div class="application-copy">
                <div class="application-badges">
                  <Badge variant="light" :color="statusColor(item.status)" size="small">
                    {{ applicationStatusLabels[item.status] || item.status }}
                  </Badge>
                  <Badge variant="outline" color="gray" size="small">{{ categoryLabels[item.category] }}</Badge>
                </div>
                <p class="application-agency">{{ item.agency }}</p>
                <h3>{{ item.policyTitle }}</h3>
                <dl class="application-meta">
                  <div><dt>신청번호</dt><dd>{{ item.id }}</dd></div>
                  <div><dt>신청일</dt><dd>{{ formatDate(item.appliedAt) }}</dd></div>
                  <div><dt>지원 내용</dt><dd>{{ item.support }}</dd></div>
                </dl>
              </div>
              <div class="application-action">
                <router-link :to="`/policies/${item.policyId}/check`" class="krds-btn tertiary medium">
                  정책 다시 보기
                </router-link>
              </div>
            </article>
          </div>

          <div v-else class="empty-state">
            <h3>아직 신청한 정책이 없습니다.</h3>
            <p>지원정책을 찾고 자격을 확인한 다음 신청해 보세요.</p>
            <router-link to="/policies" class="krds-btn primary medium">지원정책 찾기</router-link>
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
import { onMounted, ref } from 'vue'
import { Badge, Breadcrumb, Footer, SkipLink } from 'krds-vue'
import AppHeader from '@/components/AppHeader.vue'
import { useAuthStore } from '@/store/auth.js'
import { categoryLabels } from '@/data/policyMocks.js'
import { applicationStatusLabels, getPolicyApplications } from '@/data/policyApplications.js'

const auth = useAuthStore()
const applications = ref([])
const breadcrumbItems = [
  { text: '홈', href: '/' },
  { text: '신청 현황', href: '/enrollments', disabled: true }
]
const footerLinks = [
  { text: '개인정보 처리방침', href: '#privacy', isHighlighted: true },
  { text: '이용약관', href: '#terms' }
]

function statusColor(status) {
  if (status === 'APPROVED') return 'success'
  if (status === 'REJECTED') return 'danger'
  return 'information'
}

function formatDate(value) {
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date(value))
}

onMounted(() => {
  applications.value = getPolicyApplications(auth.user?.id)
})
</script>

<style scoped>
.status-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--krds-light-color-surface-white);
}
.status-main {
  flex: 1;
  padding-block: var(--krds-gap-8) var(--krds-gap-10);
}
.status-section { margin-top: var(--krds-gap-8); }
.status-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: var(--krds-gap-5);
  margin-bottom: var(--krds-gap-5);
}
.status-heading h2 {
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-xsmall);
}
.status-heading p { color: var(--krds-light-color-text-subtle); }
.application-list {
  display: flex;
  flex-direction: column;
  gap: var(--krds-gap-4);
}
.application-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--krds-gap-8);
  padding: var(--krds-padding-8);
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}
.application-copy { min-width: 0; }
.application-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--krds-gap-2);
  margin-bottom: var(--krds-gap-4);
}
.application-agency {
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}
.application-item h3 {
  margin-top: var(--krds-gap-2);
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-small);
  line-height: 1.35;
  overflow-wrap: anywhere;
}
.application-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--krds-gap-7);
  margin-top: var(--krds-gap-5);
}
.application-meta dt {
  margin-bottom: var(--krds-gap-2);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-xsmall);
}
.application-meta dd {
  color: var(--krds-light-color-text-bolder);
  font-weight: var(--krds-font-weight-bold);
  overflow-wrap: anywhere;
}
.application-action {
  display: flex;
  align-items: center;
}
.empty-state {
  padding: var(--krds-padding-10) var(--krds-padding-8);
  text-align: center;
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}
.empty-state h3 {
  color: var(--krds-light-color-text-bolder);
  font-size: var(--krds-pc-font-size-heading-xsmall);
}
.empty-state p {
  margin-block: var(--krds-gap-3) var(--krds-gap-6);
  color: var(--krds-light-color-text-subtle);
}
@media (max-width: 767px) {
  .status-main { padding-block: var(--krds-gap-6) var(--krds-gap-8); }
  .application-item {
    grid-template-columns: 1fr;
    padding: var(--krds-padding-6);
  }
  .application-meta {
    flex-direction: column;
    gap: var(--krds-gap-3);
  }
  .application-action .krds-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
