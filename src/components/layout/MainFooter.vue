<template>
  <Footer
    hide-quick-links
    hide-identifier
    address="소담소담은 국민에게 맞춤형 정부 지원정책을 안내하는 공공 서비스입니다."
    copyright="© 소담소담"
    :contacts="footerContacts"
    :bottom-links="footerBottomLinks"
  />
</template>

<script setup>
import { Footer } from 'krds-vue'

const footerContacts = []
const footerBottomLinks = [
  { text: '개인정보 처리방침', href: '#privacy', isHighlighted: true },
  { text: '이용약관', href: '#terms' }
]
</script>
