<template>
    <section class="home-section">
        <div class="krds-container">
            <SectionHeader title="복합 콘텐츠" />
            <div class="complex-layout">
                <article class="feature-card">
                    <h3>행정서식<br>간편이름</h3>
                    <p>길고 복잡한 명칭은 이제 그만<br>핵심 단어만 간결하게</p><a href="#">자세히보기 →</a><span class="book-art"
                        aria-hidden="true">A<br>▱</span>
                </article><button class="small-arrow complex-prev" aria-label="이전 콘텐츠">‹</button>
                <div class="complex-cards">
                    <ContentCard v-for="item in contentsWithImages" :key="item.title" v-bind="item" />
                </div><button class="small-arrow complex-next" aria-label="다음 콘텐츠">›</button>
            </div>
            <div class="mini-indicator"><i></i><i></i></div>
        </div>
    </section>
</template>
<script setup>
import SectionHeader from '@/components/common/SectionHeader.vue'
import ContentCard from '@/components/common/ContentCard.vue'
import { complexContents } from '@/data/homeData.js'
import pensionImage from '@/assets/images/home/연금.jpg.avif'
import savingsImage from '@/assets/images/home/저축.jpg'
import smallBusinessImage from '@/assets/images/home/소상공인.jpg'

const imageMap = {
    pension: pensionImage,
    savings: savingsImage,
    store: smallBusinessImage
}

const contentsWithImages = complexContents.map((item) => ({
    ...item,
    image: imageMap[item.icon],
    imageAlt: `${item.title} 안내 이미지`
}))
</script>
