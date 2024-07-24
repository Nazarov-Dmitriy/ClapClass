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
                        <li class="teacher__info-item">Широкий выбор эффективных методик</li>
                        <li class="teacher__info-item">Кейсы, не требующие долгой подготовки</li>
                        <li class="teacher__info-item">Интерактивное взаимодействие с классом</li>
                        <li class="teacher__info-item">
                            Быстрый доступ и понятный интерфейс сервиса
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss">
.teacher {
    padding: 148px 64px 100px 64px;
    box-sizing: border-box;
    overflow: hidden;
    @media (max-width: $xl) {
        padding: 48px 0;
    }
    @media (max-width: $sm) {
        padding: 24px 0;
        
    }
}

.teacher__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 1.3;
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
    @media (max-width: $xl) {
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
    box-sizing: border-box;
}

.teacher__hero-img {
    border-radius: 24px;
    padding: 16px;
    max-width: 624px;
    width: 100%;
    height: 100%;
    box-shadow: 10px 0 2px 0 rgba(20, 5, 5, 0.2);
    background: $orange;
    aspect-ratio: 2 / 1;
    object-fit: cover;
    box-sizing: border-box;
}

.teacher__info {
    padding: 24px 0px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    @media (margin: $sm) {
        padding: 8px;
    }
}

.teacher__info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
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

    @media(max-width: $lg){
        overflow: scroll;
        height: 296px;
        padding-top: 20px;
    }
}

.teacher__info-item {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    color: $black;
    position: relative;
    margin-left: 80px;
    &::before {
        content: url('../../assets/images/main/teacher/teacher-list-img.png');
        position: absolute;
        top: -14px;
        left: -80px;
    }
    @media (max-width: $lg) {
        font-size: 16px;
    }
}
</style>
