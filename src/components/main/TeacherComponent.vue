<template>
    <section class="teacher">
        <div class="teacher__container container">
            <h2 class="teacher__title">Clap Class для учителей</h2>
            <div class="teacher__wrapper">
                <div class="teacher__hero">
                    <img
                        src="../../assets/images/main/teacher/teacher-hero-img.png"
                        alt=""
                        class="teacher__hero-img"
                    />
                </div>
                <div class="teacher__info">
                    <h2 class="teacher__info-title">
                        Универсальный инструмент современного преподавателя
                    </h2>
                    <ul class="teacher__info-list">
                        <li
                            v-for="(item, index) in itemInfo"
                            :key="index"
                            class="teacher__info-item"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const itemInfo = ref([
    'Широкий выбор эффективных методик',
    'Кейсы, не требующие долгой подготовки',
    'Интерактивное взаимодействие с классом',
    'Быстрый доступ и понятный интерфейс сервиса',
    'Интерактивное взаимодействие с классом',
    'Быстрый доступ и понятный интерфейс сервиса',
    'Улучшение внутриклассного климата',
    'Интерактивное вовлечение аудитории в процесс',
    'Поддержание необходимого уровня активности',
    'Управление концентрацией и вниманием учеников'
])
</script>

<style lang="scss">
.teacher {
    padding: 148px 64px 100px 64px;
    box-sizing: border-box;
    overflow: hidden;
    @media (max-width: $xl) {
        padding: 48px 16px;
    }
    @media (max-width: $sm) {
        padding: 24px 16px;
    }
}

.teacher__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 47px;
    text-align: center;
    color: $orange;
    margin-bottom: 48px;
    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 1.5;
        text-align: center;
    }
    @media (max-width: $sm) {
        font-size: 24px;
        text-align: center;
        margin-bottom: 16px;
    }
}

.teacher__wrapper {
    background: url('../../assets/images/main/teacher/teacher-bg.png') no-repeat;
    background-size: cover;
    background-position: top;
    padding: 0px 16px 0px 0px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 48px;
    box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
    @media (max-width: $md) {
        flex-direction: column;
    }
    @media (max-width: $sm) {
        gap: 16px;
    }
}
.teacher__hero {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    width: 100%;
    background: $orange;
    border-radius: 24px;
}

.teacher__hero-img {
    width: 100%;
    height: 100%;
    box-shadow: 10px 0 2px 0 rgba(20, 5, 5, 0.2);
    aspect-ratio: 2 / 1;
    object-fit: cover;
    border: 4px solid $white;
    border-radius: 24px;
    background-color: $white;
}
.teacher__info {
    padding: 24px 0px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;

    @media (max-width: $lg) {
        padding: 8px;
    }
    @media (max-width: $sm) {
        padding: 0;
    }
}

.teacher__info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    color: $orange;
    @media (max-width: $xl) {
        text-align: center;
    }
    @media (max-width: $sm) {
        font-size: 20px;
    }
}

.teacher__info-list {
    display: flex;
    flex-direction: column;
    gap: 33px;
    overflow: auto;
    height: 356px;
    padding-top: 5px;

    &::-webkit-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
}

.teacher__info-item {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    color: $black;
    position: relative;
    margin-left: 80px;
    padding-top: 17px;
    padding-bottom: 17px;
    box-sizing: border-box;
    &::before {
        content: url('../../assets/images/main/teacher/teacher-list-img.png');
        position: absolute;
        top: 1px;
        left: -80px;
    }
    @media (max-width: $lg) {
        font-size: 16px;
    }
}
</style>
