<template>
  <nav class="related-sites" aria-label="관련 사이트">
    <div class="krds-container related-grid">
      <div v-for="(site, index) in relatedSites" :key="site" class="related-item">
        <button type="button" :aria-expanded="active === index" @click="active = active === index ? -1 : index"><span>{{ site }}</span><span aria-hidden="true">{{ active === index ? '−' : '+' }}</span></button>
        <div v-if="active === index" class="related-panel"><a href="#">관련 누리집 바로가기</a></div>
      </div>
    </div>
  </nav>
</template>
<script setup>import { ref } from 'vue'; import { relatedSites } from '@/data/homeData.js'; const active = ref(-1)</script>
