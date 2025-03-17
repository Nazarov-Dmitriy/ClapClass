<template>
    <div class="services__banner">
        <div class="services__title-block">
            <div class="services__img">
                <img :src="props.information.img" alt="" class="sm:w-20 sm:h-20 w-12 h-12" />
            </div>
            <div class="services__titles">
                <h2 class="services__title services__title--white">
                    {{ props.information.titleWhite }}
                </h2>
                <h2 class="services__title services__title--orange">
                    {{ props.information.titleOrange }}
                </h2>
            </div>
        </div>
        <div class="services__info">
            <h2 class="services__info-title">{{ props.information.title }}</h2>
            <p class="services__info-text">
                {{ props.information.text }}
            </p>
            <BtnComponent
                class="services__info-btn"
                emit-name="click"
                @click="() => setModal('register')"
            >
                Регистрация
            </BtnComponent>
        </div>
        <Teleport to="body">
            <AuthComponent :modal="modal" @close="() => setModal('')" />
        </Teleport>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import AuthComponent from '../modal/auth/AuthComponent.vue'

const props = defineProps({
    information: {
        type: Object,
        required: true
    }
})

const modal = ref('')

function setModal(value) {
    modal.value = value
}
</script>

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
    position: relative;
    z-index: 5;
    max-width: 1312px;
    margin: 0 auto;

    @media (max-width: $xxl) {
        margin: 0 50px;
    }

    @media (max-width: $xxl) {
        padding: 32px 16px 16px;
    }
    @media (max-width: $lg) {
        grid-template-columns: 1fr;
        margin: 0 16px;
        padding: 16px;
        gap: 16px;
    }
}
.services__title-block {
    display: flex;
    align-items: flex-end;
    position: relative;
    font-family: 'CenturyGothic';
    width: 570px;
    height: 280px;

    @media (max-width: $xl) {
        justify-content: center;
        width: 414px;
        height: 265px;
        margin: 17px 0;
    }

    @media (max-width: $lg) {
        width: 460px;
        height: 196px;
        margin: 0 auto;
    }

    @media (max-width: $sm) {
        width: auto;
        height: auto;
        margin: 0 auto;
        margin-top: 12px;
    }
}
.services__img {
    border: 4px solid #e05704;
    border-radius: 1000px;
    padding: 44px;
    box-sizing: border-box;
    background-color: $white;
    position: absolute;

    @media (max-width: $xl) {
        display: none;
        position: relative;
    }
    @media (max-width: $lg) {
        display: block;
        width: 176px;
    }
    @media (max-width: $sm) {
        width: 96px;
        height: 96px;
        padding: 24px;
    }
}
.services__titles {
    margin-left: 150px;
    @media (max-width: $xl) {
        margin-left: 0;
    }
    @media (max-width: $lg) {
        transform: translate(-30px, 0);
        max-width: 285px;
    }
}
.services__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 60px;
    line-height: 150%;
    text-align: center;
    position: relative;

    @media (max-width: $lg) {
        font-size: 40px;
    }
    @media (max-width: $sm) {
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
        padding: 12px 20px;
    }
    @media (max-width: $sm) {
        padding: 8px 16px;
    }
}
.services__title--orange {
    border: 4px solid $white;
    padding: 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $orange;
    color: $white;
    width: fit-content;
    z-index: 2;
    transform: translate(20px, 0) rotate(-2deg);

    @media (max-width: $lg) {
        padding: 12px 20px;
    }

    @media (max-width: $sm) {
        padding: 8px 16px;
    }
}
.services__info {
    display: grid;
    gap: 16px;
    justify-content: center;
    max-width: 698px;
    width: 100%;

    @media (max-width: $lg) {
        max-width: 100%;
        padding: 16px;
    }
}
.services__info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: $orange;
}
.services__info-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: #0e0806;
    max-width: 650px;
    width: 100%;

    @media (max-width: $sm) {
        font-size: 16px;
    }
}
.services__info-btn {
    margin: 0 auto;
    width: max-content;
    height: max-content;
}
</style>
