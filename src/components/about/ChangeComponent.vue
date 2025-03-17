<script setup lang="ts">
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
</script>

<template>
    <section class="change">
        <div class="change__container">
            <div class="change__card">
                <div class="change__card-info">
                    <h2 class="change__card-info-title">Изменим образование вместе!</h2>
                    <p class="change__card-info-text">
                        Стань амбассадором нового движения! Присоединяйся к команде, задающей тренд
                        на увлекательное образование!
                    </p>
                    <BtnComponent
                        emit-name="action"
                        class="change__card-info-btn"
                        @action="$router.push('/cooperation')"
                    >Сотрудничество</BtnComponent
                    >
                </div>
                <img
                    src="/images/about/change/banner.png"
                    alt="image of the banner"
                    class="change__card-img"
                />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.change {
    padding: 48px 64px;
    @media (max-width: $lg) {
        padding: 24px 16px;
    }
    @media (max-width: $sm) {
        padding: 16px;
    }
}
.change__container {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.change__card {
    border-radius: 24px;
    padding: 24px 48px;
    box-sizing: border-box;
    background: $orange;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    max-width: 1084px;
    width: 100%;

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
    }
    @media (max-width: $sm) {
        padding: 24px 16px;
    }
}
.change__card-info {
    display: flex;
    flex-direction: column;
    gap: 48px;

    @media (max-width: $lg) {
        gap: 24px;
        align-items: center;
    }
    @media (max-width: $sm) {
        gap: 16px;
    }
}
.change__card-info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $white;

    @media (max-width: $lg) {
        text-align: center;
        font-size: 32px;
        line-height: 150%;
    }
    @media (max-width: $sm) {
        font-size: 24px;
    }
}
.change__card-info-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: $white;

    @media (max-width: $lg) {
        text-align: center;
        font-size: 16px;
    }
}
.change__card-info-btn {
    width: max-content;
    border: 2px solid $orange;
    border-radius: 24px;
    padding: 8px 16px;
    box-sizing: border-box;
    background-color: $white;
    &:hover {
        :deep(.btn-orange__text) {
            color: $white;
        }
    }
    :deep(.btn-orange__text) {
        font-weight: 500;
        font-size: 20px;
        line-height: 150%;
        color: $orange;
    }
}
.change__card-img {
    @media (max-width: $lg) {
        display: none;
    }
}
</style>
