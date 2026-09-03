<template>
  <svg class="icon-symbol" viewBox="0 0 24 24" aria-hidden="true">
    <path v-if="name === 'search'" d="m21 21-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"/>
    <path v-else-if="name === 'menu'" d="M4 6h16M4 12h16M4 18h16"/>
    <path v-else-if="name === 'heart'" d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z"/>
    <path v-else-if="name === 'cloud'" d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z"/>
    <path v-else-if="name === 'map'" d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Zm5-2v14m6-12v14"/>
    <path v-else-if="name === 'wallet'" d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6h16V4H5a3 3 0 0 0-3 3m13 5h5"/>
    <path v-else-if="name === 'building'" d="M4 21V8l8-4 8 4v13M8 11h2m4 0h2m-8 4h2m4 0h2M9 21v-3h6v3"/>
    <path v-else-if="name === 'printer'" d="M7 9V4h10v5M7 18H4v-7h16v7h-3m-10-4h10v7H7v-7Z"/>
    <path v-else-if="name === 'note'" d="M6 3h12v18H6V3Zm3 5h6m-6 4h6m-6 4h4"/>
    <path v-else d="M4 20V8h16v12H4Zm4-12V5h8v3m-5 4h2m-6 4h10"/>
  </svg>
</template>
<script setup>defineProps({ name: { type: String, default: 'briefcase' } })</script>
