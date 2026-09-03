<template>
    <section class="home-section">
        <div class="krds-container">
            <SectionHeader title="정책소개" more="더보기" />
            <div class="policy-grid">
                <ContentCard v-for="item in policies" :key="item.title" v-bind="item" />
            </div>
        </div>
    </section>
</template>
<script
    setup>    import SectionHeader from '@/components/common/SectionHeader.vue'; import ContentCard from '@/components/common/ContentCard.vue'; import { policies } from '@/data/homeData.js'</script>
