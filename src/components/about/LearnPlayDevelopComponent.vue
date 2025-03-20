<template>
    <section class="learn">
        <div class="learn__container">
            <div class="learn__wrapper">
                <div class="learn__info">
                    <TitleComponent class="learn__info-title">
                        Учись, играй, развивайся!
                    </TitleComponent>
                    <div class="flex flex-col gap-6 md:gap-[30px]">
                        <p class="learn__info-text">Мы знаем о чем мечтают ученики.</p>
                        <p class="learn__info-text">
                            Объединяя возможности креативных индустрий и современной педагогики,
                            команда проекта помогает вашим мечтам подружится.
                        </p>
                        <p class="learn__info-text">
                            С нами эффективность и веселье перестанут быть взаимоисключающими
                            факторами.
                        </p>
                    </div>
                </div>
                <div class="hidden lg:block md+1:block h-80 w-px bg-gray" />
                <div class="teacher__cards">
                    <div v-for="card in cards" :key="card.id" class="teacher__card">
                        <img :src="card.img" alt="card image" class="teacher__card-icon" />
                        <h3 class="teacher__card-name">
                            {{ card.tacher }}
                        </h3>
                        <p class="teacher__card-text">
                            {{ card.position }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import TitleComponent from '../ui/TitleComponent.vue'

const cards = ref([
    {
        id: 1,
        img: '/images/about/teachers/1.png',
        tacher: 'Войнов Александр',
        position: 'Педагог-игропрактик, методист проекта'
    },
    {
        id: 2,
        img: '/images/about/teachers/2.png',
        tacher: 'Плеханова Валентина',
        position: 'Педагог-художник, иллюстратор проекта'
    }
])
</script>
<style lang="scss" scoped>
.learn {
    padding: 132px 0 0;

    @media (max-width: $lg) {
        padding: 62px 0 0;
    }

    @media (max-width: $md) {
        padding: 62px 0 0;
    }
    
    @media (max-width: $sm) {
        padding: 48px 0 0;
    }
}

.learn__container {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.learn__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1312px;
    padding: 0 64px;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: $md) {
        flex-direction: column;
        gap: 24px;
        padding: 0 16px;
    }
}
.learn__info {
    padding: 0 64px;
    display: flex;
    flex-direction: column;
    gap: 48px;
    box-sizing: border-box;

    @media (max-width: $xl) {
        padding-right: 24px;
    }

    @media (max-width: $lg) {
        gap: 24px;
        padding: 0 24px 0 0;
    }
    @media (max-width: $sm) {
        padding: 0;
    }
}
.learn__info-title {
    @media (max-width: $md) {
        text-align: center;
        font-size: 32px;
    }
    @media (max-width: $sm) {
        font-size: 24px;
    }
}
.learn__info-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: $black;
    @media (max-width: $md) {
        text-align: center;
        font-size: 16px;
    }
}
.teacher__cards {
    flex-shrink: 0;
    padding: 0 64px;
    display: flex;
    justify-content: center;
    gap: 64px;
    @media (max-width: $xl) {
        padding-left: 24px;
        gap: 24px;
    }
    @media (max-width: $lg) {
        padding: 0 0 0 24px;
    }
}
.teacher__card {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-content: space-between;
    align-items: center;
    max-width: 220px;
    @media (max-width: $sm) {
        gap: 0;
    }
}
.teacher__card-icon {
    border-radius: 24px;
    width: 100%;
}
.teacher__card-name {
    font-family: 'Century Gothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: $orange;
    text-align: center;
    @media (max-width: $sm) {
        font-size: 20px;
        line-height: 30px;
    }
}
.teacher__card-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: $black;
}
</style>
