<template>
  <article class="content-card">
    <div v-if="image || icon" class="card-visual" :class="tone">
      <img v-if="image" :src="image" :alt="imageAlt || ''" class="card-thumbnail">
      <span v-else :class="`art art-${icon}`" aria-hidden="true"></span>
    </div>
    <div class="card-copy">
      <span v-if="badge" class="krds-badge bg-light-primary">{{ badge }}</span>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <router-link
        v-if="href.startsWith('/')"
        :to="href"
        class="krds-btn small link basic"
      >
        {{ linkText }} <i class="svg-icon ico-angle right" aria-hidden="true"></i>
      </router-link>
      <a
        v-else
        :href="href"
        class="krds-btn small link basic"
        :target="external ? '_blank' : undefined"
        :rel="external ? 'noopener noreferrer' : undefined"
      >
        {{ linkText }} <span v-if="external" class="sr-only">(새 창)</span>
        <i class="svg-icon ico-angle right" aria-hidden="true"></i>
      </a>
    </div>
  </article>
</template>
<script setup>
defineProps({
  title: String,
  description: String,
  badge: String,
  icon: String,
  image: String,
  imageAlt: String,
  tone: String,
  href: { type: String, default: '#' },
  external: Boolean,
  linkText: { type: String, default: '자세히보기' }
})
</script>
