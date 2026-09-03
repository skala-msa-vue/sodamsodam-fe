<template>
    <section class="home-section civil-section">
        <div class="krds-container">
            <SectionHeader title="민원 서비스" more="더보기" />
            <div class="civil-grid">
                <ContentCard v-for="item in civilServices" :key="item.title" v-bind="item" link-text="바로가기" />
            </div>
            <div class="pager"><b>1 / 8</b><button aria-label="이전 민원">‹</button><button aria-label="다음 민원">›</button>
            </div>
        </div>
    </section>
</template>
<script
    setup>    import SectionHeader from '@/components/common/SectionHeader.vue'; import ContentCard from '@/components/common/ContentCard.vue'; import { civilServices } from '@/data/homeData.js'</script>
