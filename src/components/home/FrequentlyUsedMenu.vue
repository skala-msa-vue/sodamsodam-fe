<template>
    <section class="home-section quick-section">
        <div class="krds-container">
            <SectionHeader title="자주찾는 메뉴"><button class="setting" type="button">⚙ 설정하기</button></SectionHeader>
            <div class="quick-row"><button class="small-arrow" aria-label="이전 메뉴">‹</button>
                <div class="quick-scroll"><a v-for="item in quickMenus" :key="item.id" href="#" class="quick-card">
                        <IconSymbol :name="item.icon" /><strong>{{ item.title }}</strong>
                    </a></div><button class="small-arrow" aria-label="다음 메뉴">›</button>
            </div>
            <div class="mini-indicator"><i></i><i></i></div>
        </div>
    </section>
</template>
<script
    setup>    import SectionHeader from '@/components/common/SectionHeader.vue'; import IconSymbol from '@/components/common/IconSymbol.vue'; import { quickMenus } from '@/data/homeData.js'</script>
