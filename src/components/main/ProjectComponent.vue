<template>
    <section class="project">
        <div class="project__container container">
            <h2 class="project__title">Динамично развивающийся проект</h2>
            <div class="project__wrapper">
                <div class="project__cards">
                    <div class="project__card">
                        <div class="project__card-wrapper" @click="$router.push('/cooperation')">
                            <img
                                src="/images/main/project/project-card1.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем к соавторству </span>
                        </div>
                        <div class="project__card-wrapper" @click="$router.push('/cooperation')">
                            <div class="project__card-img">
                                <img
                                    src="/images/main/project/project-card4.png"
                                    alt=""
                                    class="w-full h-full"
                                />
                            </div>

                            <span class="sm:!w-[272px]">Стать инновационной площадкой </span>
                        </div>
                    </div>
                    <div class="project__card">
                        <div class="project__card-wrapper" @click="$router.push('/cooperation')">
                            <img
                                src="/images/main/project/project-card2.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем партнеров </span>
                        </div>
                        <div class="project__card-wrapper" @click="$router.push('/cooperation')">
                            <img
                                src="/images/main/project/project-card5.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Поддержать проект </span>
                        </div>
                    </div>
                    <div class="project__card">
                        <div class="project__card-wrapper" @click="$router.push('/cooperation')">
                            <img
                                src="/images/main/project/project-card3.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем в команду </span>
                        </div>
                        <div class="project__card-wrapper" @click="$router.push('/cooperation')">
                            <img
                                src="/images/main/project/project-card6.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Пригласить коллегу </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue'

const projectCard = ref(null)
</script>
<style lang="scss">
.project {
    padding: 100px 0px 0px 0px;
    box-sizing: border-box;
    @media (max-width: $lg) {
        padding: 48px 0px 0px 0px;
    }
}
.container {
    max-width: 1920px;
    margin: 0 auto;
}
.project__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: $orange;
    margin-bottom: 48px;
    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 1.5;
    }
    @media (max-width: $sm) {
        font-size: 24px;
        margin-bottom: 16px;
    }
}
.project__wrapper {
    padding: 48px 64px;
    background: $fonLight;

    @media (max-width: $lg) {
        padding: 48px 16px;
    }
    @media (max-width: $sm) {
        padding: 24px 16px 0px 16px;
    }
}
.project__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 16px;

    @media (max-width: $lg) {
        display: flex;
        flex-direction: column;
    }

    @media (max-width: $sm) {
        grid-template-columns: repeat(1, 1fr);
    }
}
.project__card {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;

    @media (max-width: $lg) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: $sm) {
        grid-template-columns: 1fr;

        &:not(:last-child) {
            border-bottom: none;
        }
    }

    &::after {
        content: '';
        width: 1px;
        height: 80%;
        background: $gray;
        position: absolute;
        right: 0;
        top: 10%;
    }

    &:last-child::after {
        content: none;
    }

    span {
        font-family: 'CenturyGothic';
        font-weight: 700;
        font-size: 24px;
        line-height: 1.5;
        text-align: center;
        width: 190px;
        color: $gray;
        margin-bottom: 48px;
        cursor: pointer;
        transition: 0.3s ease;

        &:hover {
            border-bottom: 2px solid $red;
            color: $red;
        }

        @media (max-width: $lg) {
            font-size: 20px;
            padding: 16px 0;
            margin-bottom: 0;
        }
        @media (max-width: $sm) {
            text-align: left;
        }
    }
}

.project__card-img {
    width: 168px;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 24px;
    background: $yellowy;
    border-radius: 24px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);

    @media (max-width: $sm) {
        width: 116px;
        padding: 16px;
    }

    &:hover + span {
        border-bottom: 2px solid $red;
        color: $red;
    }
}

@media (max-width: $lg) {
    .project__card::after {
        width: 80%;
        height: 1px;
        top: 100%;
        left: -6px;
        transform: translateX(12%);
    }
}

@media (max-width: $sm) {
    .project__card::after {
        content: none;
    }
}

.project__card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 250px;
    margin-top: 32px;
    gap: 16px;

    @media (max-width: $lg) {
        display: flex;
        height: auto;
    }
    @media (max-width: $sm) {
        flex-direction: row;
        align-items: center;
    }
}
</style>
