<template>
  <div id="wrap" class="sodam-page">
    <SkipLink target-id="contents" link-text="본문 바로가기" />
    <AppHeader />

    <main id="contents" class="sodam-main">
      <div class="contents-wrap">
        <Breadcrumb
          aria-label="현재 경로"
          :items="breadcrumbItems"
        />

        <header class="page-heading">
          <h1 ref="headingRef" tabindex="-1">
            {{ showRegister ? '회원가입' : '아이디/비밀번호 로그인' }}
          </h1>
          <div v-if="!showRegister" class="security-row">
            <Badge variant="light" color="information" size="small">통합 로그인 연결</Badge>
            <ContextualHelp
              label="통합 로그인 안내"
              title="통합 로그인"
              content="로그인 버튼을 누르면 소담소담 통합 로그인 화면으로 이동하여 인증을 계속합니다."
              position="bottom left"
            />
          </div>
        </header>

        <div
          v-if="formAlert"
          class="live-region"
          :role="formAlert.variant === 'ok' ? 'status' : 'alert'"
          :aria-live="formAlert.variant === 'ok' ? 'polite' : 'assertive'"
        >
          <CriticalAlert :alerts="[formAlert]" />
        </div>

        <div class="login-box" :class="{ 'is-register': showRegister }">
          <section
            class="login-pane"
            :aria-labelledby="showRegister ? 'register-panel-title' : 'login-panel-title'"
          >
            <template v-if="!showRegister">
              <h2 id="login-panel-title" class="sr-only">아이디와 비밀번호 입력</h2>

              <p class="auth-description">
                아이디와 비밀번호를 입력하면 통합 로그인 화면에서 인증을 계속합니다.
              </p>

              <form
                class="auth-form"
                @submit.prevent="handlePasswordLogin"
                @keydown.enter="handleLoginEnter"
                novalidate
              >
                <TextInput
                  ref="idInputRef"
                  id="login-id"
                  v-model="loginForm.username"
                  label="아이디"
                  placeholder="아이디를 입력하세요"
                  :error="loginErrors.username"
                  :disabled="oauthRedirecting"
                />
                <TextInput
                  ref="loginPasswordRef"
                  id="login-password"
                  v-model="loginForm.password"
                  type="password"
                  label="비밀번호"
                  placeholder="비밀번호를 입력하세요"
                  :error="loginErrors.password"
                  :disabled="oauthRedirecting"
                  show-password-toggle
                />

                <Checkbox
                  id="save-id"
                  name="save-id"
                  v-model="saveId"
                  label="아이디 저장"
                  :disabled="oauthRedirecting"
                />

                <Button
                  variant="primary"
                  size="large"
                  class="auth-submit"
                  :disabled="oauthRedirecting"
                  :aria-busy="oauthRedirecting"
                  @click="handlePasswordLogin"
                >
                  {{ oauthRedirecting ? '통합 로그인으로 이동 중' : '로그인' }}
                </Button>
              </form>

              <nav class="account-links" aria-label="계정 도움말">
                <Button variant="text" size="small" :disabled="oauthRedirecting" @click="showAccountHelp('id')">아이디 찾기</Button>
                <span aria-hidden="true">|</span>
                <Button variant="text" size="small" :disabled="oauthRedirecting" @click="showAccountHelp('password')">비밀번호 찾기</Button>
                <span aria-hidden="true">|</span>
                <Button variant="text" size="small" :disabled="oauthRedirecting" @click="switchToRegister">회원가입</Button>
              </nav>
            </template>

            <template v-else>
              <h2 id="register-panel-title" class="panel-title">회원 정보 입력</h2>
              <p class="panel-desc">필수 항목은 기호(*)와 텍스트로 표시됩니다.</p>

              <form
                class="auth-form"
                @submit.prevent="handleRegister"
                @keydown.enter="handleRegisterEnter"
                novalidate
              >
                <TextInput
                  ref="nameInputRef"
                  id="register-name"
                  v-model="registerForm.name"
                  label="이름 (필수) *"
                  :error="fieldErrors.name"
                  :disabled="loading"
                />
                <TextInput
                  ref="emailInputRef"
                  id="register-email"
                  v-model="registerForm.email"
                  label="이메일 (필수) *"
                  :error="fieldErrors.email"
                  :disabled="loading"
                />
                <TextInput
                  ref="passwordInputRef"
                  id="register-password"
                  v-model="registerForm.password"
                  type="password"
                  label="비밀번호 (필수) *"
                  hint="8자 이상"
                  :error="fieldErrors.password"
                  :disabled="loading"
                  show-password-toggle
                />
                <Select
                  id="register-role"
                  v-model="registerForm.role"
                  label="사용자 유형 (필수) *"
                  title="사용자 유형 선택"
                  hint=""
                  :options="roleOptions"
                  :disabled="loading"
                  :status="fieldErrors.role ? 'error' : 'default'"
                  :error-message="fieldErrors.role"
                />

                <Button
                  variant="primary"
                  size="large"
                  class="auth-submit"
                  :disabled="loading"
                  :aria-busy="loading"
                  @click="handleRegister"
                >
                  {{ loading ? '가입 처리 중' : '회원가입' }}
                </Button>
              </form>

              <nav class="account-links" aria-label="로그인으로 이동">
                <span>이미 계정이 있으신가요?</span>
                <Button variant="text" size="small" :disabled="loading" @click="switchToLogin">로그인</Button>
              </nav>
            </template>
          </section>

          <aside class="notice-pane" aria-labelledby="login-notice-title">
            <h2 id="login-notice-title" class="sr-only">로그인 안내</h2>
            <TextList type="dash">
              <TextListItem>
                아이디·비밀번호 확인은 소담소담 통합 로그인 화면에서 진행됩니다.
              </TextListItem>
              <TextListItem>
                아이디 저장을 선택하면 아이디만 현재 브라우저에 저장됩니다.
              </TextListItem>
              <TextListItem>
                공용 기기에서는 아이디 저장을 사용하지 말고, 이용 후 로그아웃해 주세요.
              </TextListItem>
            </TextList>
          </aside>
        </div>

        <p v-if="!showRegister" class="other-login">
          원하는 로그인 방법이 아니신가요?
          <Button
            variant="text"
            size="medium"
            :disabled="oauthRedirecting"
            @click="handleOAuth"
          >
            다른 로그인 방법 보기
          </Button>
        </p>

        <section id="help-contact" class="help-box" aria-labelledby="help-title">
          <h2 id="help-title">로그인에 어려움이 있으신가요?</h2>
          <TextList type="dash">
            <TextListItem>
              이전에 사용하던 로그인 방법이 보이지 않으면 통합 로그인 설정을 확인해 주세요.
            </TextListItem>
            <TextListItem>
              아이디·비밀번호 찾기 기능은 준비 중입니다. 현재는 통합 로그인 화면을 이용해 주세요.
            </TextListItem>
            <TextListItem>
              문의 운영시간은 서비스 운영기관 안내를 확인해 주세요.
            </TextListItem>
          </TextList>
        </section>
      </div>
    </main>

    <Footer
      hide-quick-links
      hide-identifier
      address="소담소담은 국민에게 맞춤형 정부 지원정책을 안내하는 공공 서비스입니다."
      copyright="© 소담소담"
      :contacts="footerContacts"
      :bottom-links="footerBottomLinks"
    />
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUpdated, ref } from 'vue'
import {
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  ContextualHelp,
  CriticalAlert,
  Footer,
  Select,
  SkipLink,
  TextInput,
  TextList,
  TextListItem
} from 'krds-vue'
import AppHeader from '@/components/AppHeader.vue'
import { useAuthStore } from '@/store/auth.js'
import { authApi } from '@/api/auth.js'

const SAVED_ID_KEY = 'sodam-saved-id'

const auth = useAuthStore()

const showRegister = ref(false)
const loading = ref(false)
const oauthRedirecting = ref(false)
const saveId = ref(false)
const formAlert = ref(null)

const loginForm = ref({
  username: '',
  password: ''
})
const loginErrors = ref({
  username: '',
  password: ''
})

const fieldErrors = ref({
  name: '',
  email: '',
  password: '',
  role: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  role: 'STUDENT'
})

const headingRef = ref(null)
const idInputRef = ref(null)
const loginPasswordRef = ref(null)
const nameInputRef = ref(null)
const emailInputRef = ref(null)
const passwordInputRef = ref(null)

const breadcrumbItems = [
  { text: '홈', href: '/' },
  { text: '로그인', href: '/login', disabled: true }
]

const roleOptions = [
  { value: 'STUDENT', label: '정책 신청자' },
  { value: 'INSTRUCTOR', label: '공공기관 담당자' }
]

const footerContacts = []

const footerBottomLinks = [
  { text: '개인정보 처리방침', href: '#privacy', isHighlighted: true },
  { text: '이용약관', href: '#terms' }
]

function handleOAuth() {
  if (oauthRedirecting.value) return
  if (!import.meta.env.VITE_CLIENT_ID || !import.meta.env.VITE_REDIRECT_URI) {
    formAlert.value = {
      variant: 'danger',
      message: '로그인 설정이 없습니다. .env의 클라이언트 정보를 확인한 뒤 개발 서버를 다시 시작해 주세요.'
    }
    return
  }
  oauthRedirecting.value = true
  auth.redirectToLogin()
}

function clearMessages() {
  formAlert.value = null
  loginErrors.value = { username: '', password: '' }
  fieldErrors.value = { name: '', email: '', password: '', role: '' }
}

function switchToRegister() {
  clearMessages()
  showRegister.value = true
  nextTick(() => {
    nameInputRef.value?.focus()
    enhanceFields()
  })
}

function switchToLogin() {
  clearMessages()
  showRegister.value = false
  nextTick(() => {
    idInputRef.value?.focus()
    enhanceFields()
  })
}

function showAccountHelp(type) {
  formAlert.value = {
    variant: 'info',
    message: type === 'id'
      ? '아이디 찾기는 준비 중입니다. 아래 문의 안내를 이용해 주세요.'
      : '비밀번호 찾기는 준비 중입니다. 아래 문의 안내를 이용해 주세요.'
  }
  document.getElementById('help-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function validateLogin() {
  const nextErrors = { username: '', password: '' }
  if (!loginForm.value.username.trim()) {
    nextErrors.username = '아이디를 입력해 주세요.'
  }
  if (!loginForm.value.password) {
    nextErrors.password = '비밀번호를 입력해 주세요.'
  }
  loginErrors.value = nextErrors
  return !Object.values(nextErrors).some(Boolean)
}

function handlePasswordLogin() {
  if (oauthRedirecting.value) return
  formAlert.value = null
  if (!validateLogin()) {
    nextTick(() => {
      enhanceFields()
      if (loginErrors.value.username) idInputRef.value?.focus()
      else loginPasswordRef.value?.focus()
    })
    return
  }

  if (saveId.value) {
    localStorage.setItem(SAVED_ID_KEY, loginForm.value.username.trim())
  } else {
    localStorage.removeItem(SAVED_ID_KEY)
  }

  handleOAuth()
}

function handleLoginEnter(event) {
  if (event.target?.tagName !== 'INPUT') return
  event.preventDefault()
  handlePasswordLogin()
}

function validateRegister() {
  const nextErrors = { name: '', email: '', password: '', role: '' }
  if (!registerForm.value.name.trim()) {
    nextErrors.name = '이름을 입력해 주세요.'
  }
  if (!registerForm.value.email.trim()) {
    nextErrors.email = '이메일을 입력해 주세요.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.value.email.trim())) {
    nextErrors.email = '올바른 이메일 형식으로 입력해 주세요.'
  }
  if (!registerForm.value.password) {
    nextErrors.password = '비밀번호를 입력해 주세요.'
  } else if (registerForm.value.password.length < 8) {
    nextErrors.password = '비밀번호는 8자 이상이어야 합니다.'
  }
  if (!registerForm.value.role) {
    nextErrors.role = '사용자 유형을 선택해 주세요.'
  }
  fieldErrors.value = nextErrors
  return !Object.values(nextErrors).some(Boolean)
}

async function handleRegister() {
  if (loading.value) return
  formAlert.value = null
  if (!validateRegister()) {
    nextTick(() => {
      enhanceFields()
      if (fieldErrors.value.name) nameInputRef.value?.focus()
      else if (fieldErrors.value.email) emailInputRef.value?.focus()
      else if (fieldErrors.value.password) passwordInputRef.value?.focus()
    })
    return
  }

  loading.value = true
  try {
    await authApi.register({
      name: registerForm.value.name.trim(),
      email: registerForm.value.email.trim(),
      password: registerForm.value.password,
      role: registerForm.value.role
    })
    formAlert.value = {
      variant: 'ok',
      message: '회원가입이 완료되었습니다. 아이디와 비밀번호를 입력해 로그인해 주세요.'
    }
    registerForm.value = { name: '', email: '', password: '', role: 'STUDENT' }
    showRegister.value = false
    nextTick(() => {
      headingRef.value?.focus()
      enhanceFields()
    })
  } catch (e) {
    formAlert.value = {
      variant: 'danger',
      message: e.response?.data?.message || '회원가입에 실패했습니다.'
    }
  } finally {
    loading.value = false
  }
}

function handleRegisterEnter(event) {
  if (event.target?.tagName !== 'INPUT') return
  event.preventDefault()
  handleRegister()
}

function applyInputAttrs(componentRef, attrs) {
  const input = componentRef?.inputRef
  if (!input) return
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === false || value == null) {
      input.removeAttribute(key)
    } else if (value === true) {
      input.setAttribute(key, '')
    } else {
      input.setAttribute(key, String(value))
    }
  })

  const group = input.closest('.form-group')
  const hint = group?.querySelector('.form-hint, .form-hint-invalid, .form-hint-success, .form-hint-information')
  if (hint) {
    if (!hint.id) hint.id = `${input.id}-hint`
    input.setAttribute('aria-describedby', hint.id)
  } else {
    input.removeAttribute('aria-describedby')
  }
}

function enhanceFields() {
  if (showRegister.value) {
    applyInputAttrs(nameInputRef.value, {
      autocomplete: 'name',
      required: true,
      'aria-invalid': fieldErrors.value.name ? 'true' : 'false'
    })
    applyInputAttrs(emailInputRef.value, {
      type: 'email',
      autocomplete: 'email',
      required: true,
      'aria-invalid': fieldErrors.value.email ? 'true' : 'false'
    })
    applyInputAttrs(passwordInputRef.value, {
      autocomplete: 'new-password',
      required: true,
      minlength: '8',
      'aria-invalid': fieldErrors.value.password ? 'true' : 'false'
    })

    const roleSelect = document.getElementById('register-role')
    if (roleSelect) {
      roleSelect.setAttribute('required', '')
      roleSelect.setAttribute('aria-invalid', String(Boolean(fieldErrors.value.role)))
    }
    return
  }

  applyInputAttrs(idInputRef.value, {
    autocomplete: 'username',
    required: true,
    'aria-invalid': loginErrors.value.username ? 'true' : 'false'
  })
  applyInputAttrs(loginPasswordRef.value, {
    autocomplete: 'current-password',
    required: true,
    'aria-invalid': loginErrors.value.password ? 'true' : 'false'
  })
}

onMounted(() => {
  const savedId = localStorage.getItem(SAVED_ID_KEY)
  if (savedId) {
    loginForm.value.username = savedId
    saveId.value = true
  }
  nextTick(() => enhanceFields())
})

onUpdated(() => {
  enhanceFields()
})
</script>

<style scoped>
.sodam-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--krds-light-color-surface-white);
}

.sodam-main {
  flex: 1;
  padding-top: var(--krds-gap-8);
  padding-bottom: var(--krds-gap-10);
}

.security-row {
  display: flex;
  align-items: center;
  gap: var(--krds-gap-3);
  margin-top: var(--krds-gap-4);
}

.live-region {
  margin-bottom: var(--krds-gap-5);
}

.login-box {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  background: var(--krds-light-color-surface-white);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}

.login-pane,
.notice-pane {
  padding: var(--krds-padding-8);
}

.login-pane {
  border-right: 1px solid var(--krds-light-color-divider-gray-light);
}

.panel-title {
  font-size: var(--krds-pc-font-size-heading-xsmall);
  font-weight: var(--krds-font-weight-bold);
  color: var(--krds-light-color-text-bolder);
  margin-bottom: var(--krds-gap-3);
}

.panel-desc {
  font-size: var(--krds-pc-font-size-body-small);
  color: var(--krds-light-color-text-subtle);
  margin-bottom: var(--krds-gap-6);
}

.auth-description {
  max-width: 65ch;
  margin-bottom: var(--krds-gap-6);
  color: var(--krds-light-color-text-subtle);
  font-size: var(--krds-pc-font-size-body-small);
  overflow-wrap: anywhere;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--krds-gap-6);
}

.auth-submit {
  width: 100%;
  justify-content: center;
}

.account-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--krds-gap-3);
  margin-top: var(--krds-gap-6);
  font-size: var(--krds-pc-font-size-body-xsmall);
  color: var(--krds-light-color-text-subtle);
}

.other-login {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--krds-gap-3);
  margin-top: var(--krds-gap-7);
  font-size: var(--krds-pc-font-size-body-small);
  color: var(--krds-light-color-text-subtle);
}

.help-box {
  margin-top: var(--krds-gap-7);
  padding: var(--krds-padding-8);
  background: var(--krds-light-color-surface-information-subtler);
  border: 1px solid var(--krds-light-color-divider-gray-light);
  border-radius: var(--krds-radius-medium1);
}

.help-box h2 {
  font-size: var(--krds-pc-font-size-heading-xxsmall);
  font-weight: var(--krds-font-weight-bold);
  color: var(--krds-light-color-text-bolder);
  margin-bottom: var(--krds-gap-5);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1023px) {
  .login-box,
  .login-box.is-register {
    grid-template-columns: 1fr;
  }

  .login-pane {
    border-right: 0;
    border-bottom: 1px solid var(--krds-light-color-divider-gray-light);
    order: 0;
  }

  .notice-pane {
    order: 1;
  }
}

@media (max-width: 767px) {
  .sodam-main {
    padding-top: var(--krds-gap-6);
    padding-bottom: var(--krds-gap-8);
  }

  .login-pane,
  .notice-pane,
  .help-box {
    padding: var(--krds-padding-6);
  }
}
</style>
