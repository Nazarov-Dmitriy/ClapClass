<template>
    <section class="objective">
        <div class="objective__container">
            <div class="objective__wrapper">
                <div class="objective__hero">
                    <img
                        src="../../assets/images/main/objective/objective-hero.png"
                        alt=""
                        class="objective__hero-img"
                    />
                    <img
                        src="../../assets/images/main/objective/objective-hero-lg.png"
                        alt=""
                        class="objective__hero-img objective__hero-img--mobile"
                    />
                </div>
                <div class="objective__info">
                    <h2 class="objective__title">Наша главная цель</h2>

                    <p class="objective__subtitle">
                        Создаем игровые сервисы позволяющие настроить необходимую атмосферу, темп и
                        формат вашего урока для формирования благоприятной внутриклассной среды
                    </p>
                    <div class="objective__btn-wrapper">
                        <BtnComponent class="objective__btn">Узнать больше</BtnComponent>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import BtnComponent from '../btns/BtnComponent.vue'
</script>
<style lang="scss">
.objective {
    padding: 96px 64px 48px 64px;
    box-sizing: border-box;
    box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: url('../../assets/images/main/objective/objective-bg.png');
    background-position: center;
    background-size: cover;

    @media (max-width: $xxx) {
        background-position: top;
        background-repeat: no-repeat;
    }
    @media (max-width: $lg) {
        padding: 0px 16px 48px 16px;
    }
    @media (max-width: $sm) {
        padding: 0px 16px 24px 16px;
    }
}
.objective__container {
    max-width: 1920px;
    margin: 0 auto;
}
.objective__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 48px;

    @media (max-width: $lg) {
        flex-direction: column;
        gap: 0;
    }
}

.objective__hero-img {
    @media (max-width: $lg) {
        display: none;
    }

    &--mobile {
        display: none;
        @media (max-width: $lg) {
            display: block;
            transform: translate(0, 20px);
        }

        @media (max-width: $sm) {
            width: 288px;
            transform: translate(0, 13px);
        }
    }
}
.objective__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 48px;
    align-items: center;
    border-radius: 24px;
    padding: 24px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.5);
    position: relative;
    z-index: 2;

    @media (max-width: $sm) {
        padding: 24px 0px;
        gap: 24px;
    }
}

.objective__title {
    font-family: 'CenturyGothic';
    border-radius: 24px;
    padding: 16px;
    box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $white;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $orange;

    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 1.5;
    }

    @media (max-width: $sm) {
        font-size: 24px;
    }
}
.objective__subtitle {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: $black;

    @media (max-width: $sm) {
        font-size: 16px;
    }
}
.objective__btn-wrapper {
    display: flex;
    justify-content: center;
}
</style>
