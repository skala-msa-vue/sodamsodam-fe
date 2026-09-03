<template><div class="section-heading"><h2>{{ title }}</h2><a v-if="more" href="#">{{ more }} <span aria-hidden="true">＋</span></a><slot /></div></template>
<script setup>defineProps({ title: String, more: String })</script>
