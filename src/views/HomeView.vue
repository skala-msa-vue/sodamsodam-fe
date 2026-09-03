<template>
  <div id="krds-skip-link"><a href="#main-content">본문 바로가기</a></div>
  <AppHeader />
  <main id="main-content"><HeroCarousel/><PolicyDashboard/><ComplexContentSection/><PolicySection/><NewsSection/><CivilServiceSection/></main>
  <MainFooter/>
</template>
<script setup>
import AppHeader from '@/components/AppHeader.vue'; import MainFooter from '@/components/layout/MainFooter.vue'; import HeroCarousel from '@/components/home/HeroCarousel.vue'; import PolicyDashboard from '@/components/home/PolicyDashboard.vue'; import ComplexContentSection from '@/components/home/ComplexContentSection.vue'; import PolicySection from '@/components/home/PolicySection.vue'; import NewsSection from '@/components/home/NewsSection.vue'; import CivilServiceSection from '@/components/home/CivilServiceSection.vue'
</script>
