<script setup lang="ts">
import TitleComponent from '../ui/TitleComponent.vue';


</script>

<template>
    <section class="format">
        <div class="format__container">
            <div class="format__wrapper">
                <img
                    src="/images/about/format/format-img1.png"
                    alt="format image"
                    class="format__img"
                />
                <div class="format__info">
                    <img
                        src="/images/about/format/format-img1.png"
                        alt="format image"
                        class="format__img format__img--mobile"
                    />
                    <div class="format__info-texts">
                        <TitleComponent  class="format__info-title">
                            Аркадный формат
                        </TitleComponent>
                        <p class="format__info-text">
                            Кейсы сочетают жанровые особенности аркадных и казуальных игр, учитывая
                            тонкости детского восприятия. Это короткий, яркий и динамичный
                            интерактив с ориентацией на действие. Простой и интуитивно понятный
                            геймплей позволяет пользователям быстро включиться и провести
                            интерактивную разминку с пользой для основного занятия.
                        </p>
                    </div>
                </div>
            </div>
            <div class="game__block">
                <div class="game__wrapper">
                    <div class="game__info">
                        <TitleComponent class="game__title"> Игровой мультитул </TitleComponent>
                        <p class="format__info-text game__text">
                            Проект предоставляет централизованный доступ к библиотеке приложений
                            помогая быстро найти подходящий запросу инструмент. Мы позаботились о
                            вашем комфорте, собрав все необходимые инструкции, рекомендации и
                            раздаточные материалы в одном месте.  Начните разминку одним кликом, а
                            объяснение правил предоставьте Клэппи.
                        </p>
                    </div>
                    <img
                        src="/images/about/format/format-img2.png"
                        alt="game title image"
                        class="game__img game__img--mobile"
                    />
                </div>
                <div class="game__img-wrapper">
                    <img
                        src="/images/about/format/format-img2.png"
                        alt="game title image"
                        class="game__img"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.format {
    padding: 48px 64px;
    overflow: hidden;
    @media (max-width: $lg) {
        padding: 24px 16px;
    }
    @media (max-width: $sm) {
        padding: 16px;
    }
}
.format__container {
    max-width: 1440px;
    margin: 0 auto;
}
.game__block {
    display: grid;
    grid-template-columns: 1fr auto;
    @media (max-width: $sm) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
.format__wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    position: relative;

    @media (max-width: $sm) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
.format__img {
    transform: translate(50px, 0);
    &--mobile {
        display: none;
    }
    @media (max-width: $lg) {
        display: none;

        &--mobile {
            display: block;
            transform: translate(0, 0);
        }
    }

    @media (max-width: $sm) {
        &--mobile {
            display: none;
        }
        display: block;
        transform: translate(0, 0);
    }
}
.format__info {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 16px 64px 16px 148px;
    box-sizing: border-box;
    background: #fff7ac;
    position: relative;
    z-index: -1;
    &::after{
        content: '';
        position: absolute;
        background-color: $yellowy;
        height: 100%;
        width: 200%;
        z-index: -1;

        @media(max-width: $lg){
            display: none;
        }
    }

    @media (max-width: $lg) {
        padding: 16px 64px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 37px;
    }
    @media (max-width: $sm) {
        flex-direction: column;
        padding: 16px;
    }
}

.format__info-texts {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.format__info-title {
}
.format__info-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: $black;

    @media (max-width: $lg) {
        font-size: 16px;
    }
}

.game__wrapper {
    padding: 16px 148px 16px 64px;
    box-sizing: border-box;
    background: #e6eaed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::after{
        content: '';
        position: absolute;
        background-color: #e6eaed;
        height: 100%;
        width: 200%;
        z-index: -1;
        left: -200%;

        @media(max-width: $lg){
            display: none;
        }
    }

    @media (max-width: $lg) {
        padding: 16px 64px;
    }
    @media (max-width: $sm) {
        flex-direction: column;
        padding: 16px;
    }
}
.game__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.game__title {
    text-align: right;
}
.game__text {
}
.game__img-wrapper {
    @media (max-width: $sm) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        order: -1;
    }
}
.game__img {
    display: block;
    transform: translate(-100px, 0);

    &--mobile {
        display: none;
    }

    @media (max-width: $lg) {
        display: none;
        &--mobile {
            display: block;
            transform: translate(0);
            width: 326px;
        }
    }

    @media (max-width: $sm) {
        &--mobile {
            display: none;
        }
        display: block;
        width: 280px;
        transform: translate(0);
        order: -1;
    }
}
</style>
