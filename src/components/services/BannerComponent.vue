<script setup>
import BtnComponent from '../btns/BtnComponent.vue'

const props = defineProps({
    information: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="services__banner">
        <div class="services__title-block">
            <img :src="information.img" alt="" class="services__img" />
            <div class="services__titles">
                <h2 class="services__title services__title--white">{{ information.titleWhite }}</h2>
                <h2 class="services__title services__title--orange">
                    {{ information.titleOrange }}
                </h2>
            </div>
        </div>
        <div class="services__info">
            <h2 class="services__info-title">{{ information.title }}</h2>
            <p class="services__info-text">
                {{ information.text }}
            </p>
            <BtnComponent class="services__info-btn"> Регистрация </BtnComponent>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.services__banner {
    border: 4px solid $white;
    border-radius: 24px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #e6eaed;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 40px;
    margin: 0 64px;
    position: relative;
    z-index: 1;

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
        margin: 0 16px;
    }
}
.services__title-block {
    display: flex;
    align-items: flex-end;
    position: relative;
    @media (max-width: $lg) {
        justify-content: center;
    }
}
.services__img {
    border: 4px solid #e05704;
    border-radius: 1000px;
    padding: 48px;
    box-sizing: border-box;
    background-color: $white;

    @media (max-width: $xl) {
        display: none;
    }
    @media (max-width: $lg) {
        display: block;
        width: 176px;
    }
    @media (max-width: $sm) {
        width: 96px;
        padding: 24px;
    }
}
.services__titles {
    // position: absolute;
    // left: 200px;
}
.services__title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 60px;
    line-height: 150%;
    text-align: center;
    position: relative;

    @media (max-width: $lg) {
        font-size: 40px;
    }
    @media (max-width: $lg) {
        font-size: 26px;
    }
}
.services__title--white {
    border: 4px solid #e05704;
    padding: 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    transform: rotate(-6deg);
    color: $orange;

    @media (max-width: $lg) {
        padding: 16px 24px;
    }
}
.services__title--orange {
    border: 4px solid #fff;
    padding: 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #e05704;
    color: $white;
    z-index: 2;
}
.services__info {
    display: grid;
    gap: 16px;
    justify-content: center;
    max-width: 698px;
    width: 100%;

    @media (max-width: $lg) {
        max-width: 100%;
    }
}
.services__info-title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: $orange;
}
.services__info-text {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: #0e0806;
    max-width: 650px;
    width: 100%;

    @media(max-width: $lg){
        font-size: 16px;
    }
}
.services__info-btn {
    margin: 0 auto;
    width: max-content;
    height: max-content;
}
</style>
