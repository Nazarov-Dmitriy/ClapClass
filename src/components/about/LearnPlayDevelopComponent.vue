<template>
    <section class="learn">
        <div class="learn__container">
            <div class="learn__wrapper">
                <div class="learn__info">
                    <TitleComponent class="learn__info-title">
                        Учись, играй, развивайся!
                    </TitleComponent>
                    <p class="learn__info-text">
                        Мы знаем о чем мечтают ученики.
                    </p>
                    <p class="learn__info-text">
                        Объединяя возможности креативных индустрий и 
                        современной педагогики, команда проекта помогает 
                        вашим мечтам подружится.
                    </p>
                    <p class="learn__info-text">
                        С нами эффективность и веселье перестанут 
                        быть взаимоисключающими факторами.
                    </p>
                </div>
                <div 
                    class="max-[768px]:hidden md+1:block h-80 w-px bg-gray"
                />
                <div class="teacher__cards">
                    <div 
                        v-for="card in cards"
                        :key="card.id" 
                        class="teacher__card"
                    >
                        <img 
                            :src="card.img" 
                            alt="card image" 
                            class="teacher__card-icon" 
                        >
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
    },
])
</script>
<style lang="scss" scoped>
.learn {
    padding: 48px 64px;
    @media (max-width: $md) {
        padding: 24px 16px;
    }
    @media (max-width: $sm) {
        padding: 16px;
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
    width: 100%;
    box-sizing: border-box;

    @media (max-width: $md) {
        flex-direction: column;
        gap: 24px;
    }
}
.learn__info {
    padding: 0 64px;
    display: flex;
    flex-direction: column;
    gap: 48px;
    box-sizing: border-box;

    @media (max-width: $md) {
        padding-right: 24px;
    }
    @media (max-width: $md) {
        gap: 24px;
        padding: 0 64px;
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
    padding: 0 64px;
    display: flex;
    justify-content: center;
    gap: 64px;
    @media (max-width: $xl) {
        padding-left: 24px;
        gap: 24px;
    }
    @media (max-width: $md) {
        padding: 0;
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
