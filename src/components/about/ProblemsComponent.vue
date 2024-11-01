<template>
    <section class="problems">
        <div class="problems__container">
            <div class="problems__wrapper">
                <div class="problems__info">
                    <TitleComponent class="problems__info-title"
                        >Решаем актуальные проблемы</TitleComponent
                    >
                    <p class="problems__info-text">
                        Учеба не должна перегружать младшеклассников, лишая естественной потребности
                        в движении и игре. Современные методики избавляются от формализма, делая
                        ставку на интерес и гармоничное развитие.
                    </p>
                    <p class="problems__info-text">
                        Мы разрабатываем решения, отвечающие актуальной образовательной повестке с
                        заботой о детском здоровье.
                    </p>
                    <BtnComponent
                        emit-name="action"
                        @action="$router.push('/services')"
                        class="problems__info-btn"
                        >Сервисы</BtnComponent
                    >
                </div>
                <div class="problems__cards">
                    <div v-for="card in cards" :key="card.id" class="problems__card">
                        <img :src="card.img" alt="card image" class="problems__card-icon" />
                        <p class="problems__card-tex">{{ card.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import BtnComponent from '../btns/BtnComponent.vue'
import TitleComponent from '../UI/TitleComponent.vue'

const cards = ref([
    {
        id: 1,
        img: '/images/about/problems/img1.svg',
        text: 'Дефицит движения'
    },
    {
        id: 2,
        img: '/images/about/problems/img2.svg',
        text: 'Дефицит движения'
    },
    {
        id: 3,
        img: '/images/about/problems/img3.svg',
        text: 'Дефицит движения'
    },
    {
        id: 4,
        img: '/images/about/problems/img4.svg',
        text: 'Дефицит движения'
    },
    {
        id: 5,
        img: '/images/about/problems/img5.svg',
        text: 'Дефицит движения'
    },
    {
        id: 6,
        img: '/images/about/problems/img6.svg',
        text: 'Дефицит движения'
    }
])
</script>
<style lang="scss" scoped>
.problems {
    padding: 48px 64px;
    box-sizing: border-box;
    overflow: hidden;

    @media (max-width: $lg) {
        padding: 24px 16px;
    }
    @media (max-width: $sm) {
        padding: 16px;
    }
}
.problems__container {
    max-width: 1307px;
    margin: 0 auto;
}
.problems__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    gap: 36px;

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
    }
}
.problems__info {
    display: flex;
    flex-direction: column;
    gap: 48px;
    @media (max-width: $lg) {
        gap: 24px;
    }
    @media (max-width: $sm) {
        gap: 16px;
    }
}

.problems__info-title {
    @media (max-width: $lg) {
        text-align: center;
    }
}

.problems__info-text {
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
.problems__info-btn {
    width: max-content;

    @media (max-width: $lg) {
        margin: 0 auto;
    }
}
.problems__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: 16px;

    @media (max-width: $lg) {
        display: flex;
        overflow-x: auto;
        gap: 16px;
        scroll-snap-type: x mandatory;
        justify-content: start;
    }
}

.problems__card {
    border: 2px solid $orange;
    border-radius: 24px;
    padding: 16px 44px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &:nth-child(even) {
        background: #fff7ac;
    }
    &:nth-child(odd) {
        background: #e6eaed;
    }

    @media (max-width: $lg) {
        flex: 0 0 auto;
        width: 188px;
    }
}
.problems__card-icon {
}
.problems__card-tex {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: $black;
}
</style>
