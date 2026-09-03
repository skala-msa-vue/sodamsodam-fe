<template>
  <article class="content-card">
    <div v-if="icon" class="card-visual" :class="tone"><span :class="`art art-${icon}`" aria-hidden="true"></span></div>
    <div class="card-copy"><span v-if="badge" class="krds-badge bg-light-primary">{{ badge }}</span><h3>{{ title }}</h3><p>{{ description }}</p><a href="#" class="krds-btn small link basic">{{ linkText }} <i class="svg-icon ico-angle right" aria-hidden="true"></i></a></div>
  </article>
</template>
<script setup>defineProps({ title: String, description: String, badge: String, icon: String, tone: String, linkText: { type: String, default: '자세히보기' } })</script>
