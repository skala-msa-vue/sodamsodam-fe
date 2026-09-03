<template>
  <nav id="main-navigation" class="main-nav" aria-label="주요 메뉴" :class="{ open }">
    <div class="krds-container nav-list">
      <a v-for="item in items" :key="item" href="#">{{ item }} <span aria-hidden="true">⌄</span></a>
    </div>
  </nav>
</template>
<script setup>defineProps({ open: Boolean }); const items = ['민원', '서비스신청', '정책정보', '기관소개', '고객센터']</script>
