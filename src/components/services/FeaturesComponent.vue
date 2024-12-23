<template>
    <div class="features">
        <h2 class="features__title">Особенности направления</h2>
        <div class="features__blocks">
            <div v-for="block in props.featuresCardInfo" :key="block.id" class="features__block">
                <div class="features__block-header">
                    <img :src="block.img" alt="" class="features__block-img" />
                    <div class="features__block-text">
                        <span v-for="(title, index) in block.title" :key="index">{{ title }}</span>
                    </div>
                </div>
                <div class="features__block-main">
                    <p class="features__main-text">{{ block.text }}</p>
                </div>
            </div>
        </div>
        <BtnComponent class="btn"> Узнай больше о проекте </BtnComponent>
    </div>
</template>

<script setup>
import BtnComponent from '../btns/BtnComponent.vue'

const props = defineProps({
    featuresCardInfo: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss" scoped>
.features {
    padding: 48px 64px 80px 64px;
    box-sizing: border-box;
    display: grid;
    gap: 48px;
    background-image: url('/images/servecies/features/img-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;

    @media (max-width: $lg) {
        padding: 24px 24px 48px 24px;
    }
}
.features__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: $orange;
}
.features__blocks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    align-items: center;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    max-width: 1440px;
    margin: 0 auto;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: $lg) {
        display: flex;
        flex-wrap: nowrap;
    }
    @media (max-width: $sm) {
        max-width: auto;
        margin: auto;
    }
}

.features__block {
    border-radius: 24px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    @media (max-width: $lg) {
        max-width: 480px;
        flex: 0 0 100%;
        width: 100%;
        scroll-snap-align: start;
    }
}
.features__block-header {
    display: flex;
    align-items: center;
    gap: 16px;
}
.features__block-img {
}
.features__block-text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    color: $orange;

    & span {
        display: block;
    }
}
.features__main-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;
}
.btn {
    width: max-content;
    margin: 0 auto;
}
</style>
