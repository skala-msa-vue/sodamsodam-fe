<template>
  <header class="site-header">
    <div class="utility"><div class="krds-container"><a href="#">Language⌄</a><a href="#">지원⌄</a><a href="#">글자·화면 설정</a></div></div>
    <div class="header-main krds-container">
      <a class="brand" href="/" aria-label="대한민국정부 홈"><span class="taegeuk"><i></i></span><strong>대한민국정부</strong></a>
      <div class="header-actions">
        <button type="button" aria-label="통합검색"><IconSymbol name="search"/><span>통합검색</span></button>
        <button type="button" aria-label="로그인"><span class="action-glyph">↪</span><span>로그인</span></button>
        <button type="button" aria-label="회원가입"><span class="action-glyph">♙</span><span>회원가입</span></button>
        <button class="mobile-menu" type="button" :aria-expanded="menuOpen" aria-controls="main-navigation" aria-label="전체 메뉴" @click="menuOpen = !menuOpen"><IconSymbol name="menu"/></button>
      </div>
    </div>
    <MainNavigation :open="menuOpen" />
  </header>
</template>
<script setup>
import { ref } from 'vue'; import IconSymbol from '@/components/common/IconSymbol.vue'; import MainNavigation from './MainNavigation.vue'; const menuOpen = ref(false)
</script>
