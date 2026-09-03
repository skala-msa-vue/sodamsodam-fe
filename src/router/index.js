import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/callback',
    name: 'Callback',
    component: () => import('@/views/CallbackView.vue')
  },
  {
    path: '/policies',
    name: 'PolicySearch',
    component: () => import('@/views/PolicySearchView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/policies/:id/check',
    name: 'PolicyEligibility',
    component: () => import('@/views/PolicyEligibilityView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/policies/:id/apply',
    name: 'PolicyApply',
    component: () => import('@/views/PolicyApplyView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/policy-match',
    name: 'PolicyMatch',
    component: () => import('@/views/PolicyMatchView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/courses',
    name: 'CourseList',
    component: () => import('@/views/CourseListView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/courses/new',
    name: 'CourseCreate',
    component: () => import('@/views/CourseCreateView.vue'),
    meta: { requiresAuth: true, instructorOnly: true }
  },
  {
    path: '/courses/:id(\\d+)',
    name: 'CourseDetail',
    component: () => import('@/views/CourseDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/enrollments',
    name: 'Enrollment',
    component: () => import('@/views/EnrollmentView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('@/views/MyPageView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

function getAuthenticatedHome(auth) {
  return auth.isInstructor
    ? { name: 'CourseList' }
    : { name: 'PolicySearch' }
}

// 인증/권한 가드
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'Login' }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return getAuthenticatedHome(auth)
  }

  if (to.meta.instructorOnly && auth.user?.role !== 'INSTRUCTOR') {
    return { name: 'CourseList' }
  }
})

export default router
