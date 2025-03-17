<template>
    <section class="support">
        <div class="support__container">
            <div class="support__wrapper">
                <div class="support__hero">
                    <img
                        src="/images/about/support/hero.png"
                        alt="hero"
                        class="support__hero-img"
                    />
                </div>
                <div class="support__info">
                    <p class="support__text">Миссия Клеппи</p>
                    <h2 class="support__title">
                        Сделать атмосферу занятий здоровой, позитивной и эффективной
                    </h2>
                </div>
            </div>
            <div class="support__offer">
                <img
                    src="/images/about/support/coin.png"
                    alt="coin img"
                    class="support__offer-img support__offer-img--coin"
                />
                <img
                    src="/images/about/support/offer-hero.png"
                    alt="offer hero img"
                    class="support__offer-img support__offer-img--hero"
                />
                <a href="https://yoomoney.ru/fundraise/18LATS4B2TM.250226" target="_blank">
                    <BtnComponent> Поддержать проект </BtnComponent>
                </a>
            </div>
        </div>
    </section>
</template>
<script setup>
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
</script>

<style lang="scss" scoped>
.support {
    padding: 48px 64px 0;
    box-sizing: border-box;
    overflow-x: hidden;

    @media (max-width: $lg) {
        padding: 24px 16px 0;
    }
    @media (max-width: $sm) {
        padding: 16px 16px 0;
    }
}
.support__container {
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    gap: 24px;

    @media (max-width: $lg) {
        gap: 10px;
    }
    @media (max-width: $sm) {
        gap:0px;
    }
}
.support__wrapper {
    display: grid;
    grid-template-columns: 280px 1fr;
    align-items: center;
    background: $yellowy;
    height: 251px;
    position: relative;

    &::after {
        content: '';
        background-color: $yellowy;
        position: absolute;
        width: 500%;
        height: 100%;
        z-index: -1;
        left: -200%;
        top: 0;

    }

    @media (max-width: $lg) {
        display: flex;
        flex-direction: column;
        height: auto;
        padding: 0 24px;
        gap: 54px;
    }
    @media (max-width: $sm) {
        padding: 16px 0;
    }
}
.support__hero {
    position: relative;
    max-width: 280px;
    width: 100%;
    height: 100%;

    @media (max-width: $lg) {
        max-width: 256px;
        max-width: 100%;
        display: flex;
        justify-content: center;
        height: 251px;
        z-index: 2;
    }
}
.support__hero-img {
    position: absolute;
    top: -30px;
    left: 0;

    @media (max-width: $lg) {
        position: relative;
        width: 256px;
        height: 280px;
        top: 0;
    }

    @media (max-width: $sm) {
        top: 0;
    }
}
.support__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;

    @media (max-width: $lg) {
        background-color: $white;
        position: relative;
        z-index: 1;

        &::after {
            content: '';
            position: absolute;
            background-color: $white;
            width: calc(100% + 100%);
            left: -50%;
            height: calc(100% + 54px);
            z-index: 0;
            bottom: 0;
        }
    }
    @media (max-width: $sm) {
        background-color: #fff7ac;

        &::after {
            content: none;
        }
    }
}
.support__text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: $black;
    position: relative;
    z-index: 1;
}
.support__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 1.5;
    text-align: center;
    color: $orange;
    position: relative;
    z-index: 1;
    max-width: 778px;

    @media (max-width: $sm) {
        font-size: 24px;
    }
}
.support__offer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    :deep(.btn-orange) {
        padding: 16px;
        box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
        background: $orange;
        border-radius: 0;
        width: max-content;
        max-height: 80px;
        height: 100%;
        transform: translate(0, -30px);

        @media (max-width: $lg) {
            width: auto;
        }
    }

    :deep(.btn-orange__text) {
        display: flex;
        justify-content: center;
        font-family: 'CenturyGothic';
        font-weight: 700;
        font-size: 36px;
        line-height: 48px;

        @media (max-width: $lg) {
            font-size: 24px;
            line-height: 150%;
            width: 100%;
        }
    }

    @media (max-width: $lg) {
        margin-top: 0;
    }
}
.support__offer-img--coin {
    transform: translate(0, 25px);
}

</style>
