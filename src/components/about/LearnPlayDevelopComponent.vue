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
import TitleComponent from '../UI/TitleComponent.vue'

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

    @media (max-width: $lg) {
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    max-width: 1312px;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
    }
}
.learn__info {
    padding: 0 64px;
    display: flex;
    flex-direction: column;
    gap: 48px;
    border-right: 1px solid $gray;
    box-sizing: border-box;

    @media (max-width: $lg) {
        gap: 24px;
    }
    @media (max-width: $sm) {
        gap: 16px;
    }
}

.learn__info-title {
    @media (max-width: $lg) {
        text-align: center;
    }
}
.learn__info-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: $black;
    
    @media (max-width: $lg) {
        text-align: center;
    }
    @media (max-width: $sm) {
        text-align: left;
    }
}
.teacher__cards {
    padding: 0 64px;
    display: flex;
    justify-content: space-between;
    gap: 64px;
    max-width: 656px;

    @media (max-width: $lg) {
        display: flex;
        overflow-x: auto;
        gap: 16px;
        scroll-snap-type: x mandatory;
        justify-content: start;
    }
}
.teacher__card {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-wrap: wrap;
    align-content: space-between;
    align-items: center;
    width: 220px;

    @media (max-width: $lg) {
        flex: 0 0 auto;
        width: 188px;
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
}
.teacher__card-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: $black;
}
</style>
