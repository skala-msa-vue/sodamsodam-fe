<template>
  <div class="app-shell-top">
    <Masthead text="이 누리집은 대한민국 공식 전자정부 누리집입니다." />

    <Header>
      <HeaderContainer>
        <div class="app-header__primary">
          <div class="header-branding">
            <router-link to="/" class="app-header__wordmark" aria-label="소담소담 홈">
              <img
                src="@/assets/images/logo/sodamsodam.png"
                alt=""
                class="app-header__mark"
                aria-hidden="true"
              />
              <span class="app-header__name">소담소담</span>
              <span class="app-header__tagline">맞춤형 정책 지원 서비스</span>
            </router-link>
          </div>

          <HeaderNavi>
            <template v-if="auth.isAuthenticated">
              <router-link
                v-if="!auth.isInstructor"
                to="/policies"
                class="app-header__nav-link"
                :class="{ active: $route.path.startsWith('/policies') }"
              >
                정책 찾기
              </router-link>
              <router-link
                v-if="!auth.isInstructor"
                to="/policy-match"
                class="app-header__nav-link"
                :class="{ active: $route.path.startsWith('/policy-match') }"
              >
                맞춤 정책 확인하기
              </router-link>
              <router-link
                v-if="auth.isInstructor"
                to="/courses"
                class="app-header__nav-link"
                :class="{ active: $route.path.startsWith('/courses') }"
              >
                정책 관리
              </router-link>
              <router-link
                to="/enrollments"
                class="app-header__nav-link"
                :class="{ active: $route.path === '/enrollments' }"
              >
                신청 현황
              </router-link>
              <HeaderNaviButtonLogout @click="handleLogout">로그아웃</HeaderNaviButtonLogout>
            </template>
            <router-link
              v-else
              to="/login"
              class="btn-navi login"
              aria-label="로그인 화면으로 이동"
            >
              로그인
            </router-link>
          </HeaderNavi>
        </div>
      </HeaderContainer>
    </Header>
  </div>
</template>

<script setup>
import {
  Header,
  HeaderContainer,
  HeaderNavi,
  HeaderNaviButtonLogout,
  Masthead
} from 'krds-vue'
import { useAuthStore } from '@/store/auth.js'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>
