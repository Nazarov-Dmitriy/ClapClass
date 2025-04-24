<script setup lang="ts">
import TitleComponent from '../ui/TitleComponent.vue'
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
                        <TitleComponent class="format__info-title">
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
                            раздаточные материалы в одном месте. Начните разминку одним кликом, а
                            объяснение правил предоставьте Клэппи.
                        </p>
                    </div>
                    <div class="game__info-empty"></div>
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
    padding: 148px 0 20px;
    overflow: hidden;

    @media (max-width: $lg) {
        padding: 80px 0 0;
    }
    @media (max-width: $md) {
        padding: 80px 0 0;
    }
}
.format__container {
    max-width: 1440px;
    margin: 0 auto;

    @media (max-width: $lg) {
        display: flex;
        flex-direction: column;
        gap: 48px;
    }
}
.game__block {
    display: grid;
    grid-template-columns: 1fr auto;
    position: relative;
    @media (max-width: $md) {
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

    @media (max-width: $lg) {
        margin: 0 -24px;
    }

    @media (max-width: $md) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
    }
}
.format__img {
    transform: translate(50px, 0);

    @media (max-width: $lg) {
        display: none;
    }

    @media (max-width: $md) {
        display: block;
        transform: translate(0, 0);
    }

    &--mobile {
        display: none;

        position: absolute;
        top: -38px;
        width: 171px;
        height: 311px;

        @media (max-width: $lg) {
            display: block;
            transform: translate(0, 0);
        }

        @media (max-width: $md) {
            display: none;
        }
    }
}
.format__info {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 16px 64px 16px 96px;
    box-sizing: border-box;
    background: #fff7ac;
    position: relative;
    z-index: -1;
    &::after {
        content: '';
        position: absolute;
        background-color: $yellowy;
        height: 100%;
        width: 200%;
        z-index: -1;

        @media (max-width: $lg) {
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
    @media (max-width: $md) {
        flex-direction: column;
        padding: 16px;
    }
}

.format__info-texts {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: $lg) {
        padding-left: 204px;
    }
    @media (max-width: $md) {
        padding-left: 0;
    }
}

.format__info-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: $black;

    @media (max-width: $md) {
        font-size: 16px;
    }
}

.game__wrapper {
    box-sizing: border-box;
    display: flex;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        background-color: #e6eaed;
        height: 100%;
        width: 200%;
        z-index: -1;
        left: -200%;

        @media (max-width: $lg) {
            display: none;
        }
    }

    @media (max-width: $md) {
        flex-direction: column;
        padding: 16px;
    }
}

.game__info {
    display: flex;
    flex-direction: column;
    background: #e6eaed;
    padding: 16px 148px 16px 64px;
    gap: 24px;

    @media (max-width: $lg) {
        padding: 8px 128px 8px 64px;
        gap: 16px;
    }

    @media (max-width: $md) {
        padding: 16px;
        margin: 0 -16px;
    }
}
.game__title {
    text-align: right;

    @media (max-width: $lg) {
        text-align: start;
    }
}

.game__info-empty {
    flex-shrink: 0;
    width: 248px;
    height: 100%;

    @media (max-width: $lg) {
        width: 224px;
        background: #e6eaed;
    }

    @media (max-width: $md) {
        display: none;
    }
}

.game__img-wrapper {
    position: absolute;
    right: 37px;
    top: -38px;

    @media (max-width: $xl) {
        right: 30px;
    }

    // @media (max-width: $md) {
    //     right: 20px;
    // }

    @media (max-width: $md) {
        display: flex;
        top: auto;
        right: auto;
        position: static;
        order: -1;
    }
}

.game__img {
    @media (max-width: $xl) {
        width: 387px;
        height: 299px;
    }

    @media (max-width: $lg) {
        width: 326px;
        height: 252px;
    }

    @media (max-width: $md) {
        width: 280px;
        height: 240px;
        order: -1;
    }

    &--mobile {
        display: none;

        @media (max-width: $lg) {
            position: absolute;
            width: 326px;
            height: 252px;
            right: 31px;
            bottom: 0;
            display: block;
            transform: translate(0);
            width: 326px;
        }

        @media (max-width: $md) {
            display: none;
        }
    }
}
</style>
