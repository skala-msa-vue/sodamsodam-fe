<template>
  <div id="krds-skip-link"><a href="#main-content">본문 바로가기</a></div>
  <AppHeader />
  <main id="main-content"><CriticalAlert/><HeroCarousel/><FrequentlyUsedMenu/><ComplexContentSection/><PolicySection/><NewsSection/><CivilServiceSection/><OrganizationIntroSection/></main>
  <RelatedSiteNavigation/><MainFooter/>
</template>
<script setup>
import AppHeader from '@/components/AppHeader.vue'; import RelatedSiteNavigation from '@/components/layout/RelatedSiteNavigation.vue'; import MainFooter from '@/components/layout/MainFooter.vue'; import CriticalAlert from '@/components/home/CriticalAlert.vue'; import HeroCarousel from '@/components/home/HeroCarousel.vue'; import FrequentlyUsedMenu from '@/components/home/FrequentlyUsedMenu.vue'; import ComplexContentSection from '@/components/home/ComplexContentSection.vue'; import PolicySection from '@/components/home/PolicySection.vue'; import NewsSection from '@/components/home/NewsSection.vue'; import CivilServiceSection from '@/components/home/CivilServiceSection.vue'; import OrganizationIntroSection from '@/components/home/OrganizationIntroSection.vue'
</script>
