<template>
    <section class="use">
        <div class="use__container">
            <div class="user__wrapper">
                <Swiper
                    ref="swiperRef"
                    :modules="[Navigation, Pagination]"
                    :navigation="navigationOptions"
                    :pagination="paginationOptions"
                    :slides-per-view="1"
                    :space-between="5000"
                    :loop="true"
                    class="slider use__slide"
                    @slide-change="updateActiveIndex"
                >
                    <SwiperSlide v-for="(slide, index) in slidesCards" :key="index">
                        <div class="use__slider">
                            <div v-for="card in slide" :key="card.id" class="use__slider-card">
                                <img :src="card.img" :alt="card.text" class="use__slide-img" />
                                <div class="flex flex-col gap-1">
                                    <span
                                        v-for="item in card.text"
                                        :key="item"
                                        class="use__slide-text"
                                    >
                                        {{ item }}
                                    </span>
                                </div>
                            </div>

                            <div class="slider__slide-tabs slider__slide-tabs--use">
                                <span
                                    v-for="(item, idx) in slidesCards"
                                    :key="idx"
                                    class="slider__slide-tabs-span slider__slide-tabs-span--use"
                                    :class="{ active: activeIndex === idx }"
                                />
                            </div>
                            <div class="slider__slide-arrow-btn-wrapper">
                                <button
                                    class="slider__slide-arrow-btn slider__slide-arrow-btn--left use-slide-btn-left"
                                    @click="swiperRef.value.swiper.slidePrev()"
                                >
                                    <svg
                                        width="12"
                                        height="21"
                                        viewBox="0 0 12 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 18.6221L2 10.6221L10 2.62207"
                                            stroke="#E05704"
                                            stroke-width="4"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </button>
                                <button
                                    class="slider__slide-arrow-btn slider__slide-arrow-btn--right use-slide-btn-right"
                                    @click="swiperRef.value.swiper.slideNext()"
                                >
                                    <svg
                                        width="12"
                                        height="21"
                                        viewBox="0 0 12 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 18.6221L2 10.6221L10 2.62207"
                                            stroke="#E05704"
                                            stroke-width="4"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div class="use__info">
                    <TitleComponent class="use__title">Используем лучшие практики</TitleComponent>
                    <p class="use__text">
                        Проект отслеживает актуальные образовательные тренды наполняя библиотеку
                        инструментами, получившими признание учителей. Благодаря обратной связи
                        пользователей каждый кейс продолжает непрерывно развиваться. Мы не просто
                        создаем разминки, а формируем экосистему эффективных направлений,
                        способствуя всестороннему развитию потенциала детей.
                    </p>
                    <BtnComponent class="use__info-btn">Попробовать сейчас</BtnComponent>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup >
import { onMounted, ref } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import TitleComponent from '../ui/TitleComponent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slidesCards = ref([
    [
        {
            id: 1,
            img: '/images/about/use/card-img1.svg',
            text: ['Геймификации']
        },
        {
            id: 2,
            img: '/images/about/use/card-img2.svg',
            text: ['Игропедагогика']
        },
        {
            id: 3,
            img: '/images/about/use/card-img3.svg',
            text: ['Нейрогимнастика']
        }
    ],
    [
        {
            id: 4,
            img: '/images/about/use/card-img4.svg',
            text: ['Ритм-гимнастика']
        },
        {
            id: 5,
            img: '/images/about/use/card-img5.svg',
            text: ['Lecture-racing']
        },
        {
            id: 6,
            img: '/images/about/use/card-img6.svg',
            text: ['Брейн-фитнес']
        }
    ],
    [
        {
            id: 7,
            img: '/images/about/use/card-img7.svg',
            text: ['Быстрое', 'творчество']
        },
        {
            id: 8,
            img: '/images/about/use/card-img8.svg',
            text: ['Танцевальные', 'сессии']
        },
        {
            id: 9,
            img: '/images/about/use/card-img9.svg',
            text: ['Пальчиковая', 'гимнастика']
        }
    ],
    [
        {
            id: 10,
            img: '/images/about/use/card-img10.svg',
            text: ['Музыкальные', 'упражнения']
        },
        {
            id: 11,
            img: '/images/about/use/card-img11.svg',
            text: ['Динамические', 'паузы']
        },
        {
            id: 12,
            img: '/images/about/use/card-img12.svg',
            text: ['Логические', 'игры']
        }
    ]
])

const activeIndex = ref(0)
const swiperRef = ref(null)

const navigationOptions = {
    nextEl: '.slider__slide-arrow-btn--right',
    prevEl: '.slider__slide-arrow-btn--left'
}

const paginationOptions = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
}

function updateActiveIndex(swiper) {
    activeIndex.value = swiper.realIndex
}

onMounted(() => {
    setTimeout(() => {
        const bullet = document.querySelectorAll('.swiper-pagination-bullet')
        const tabs = document.querySelectorAll('.slider__tabs-list-item')
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                bullet[index]?.click()
            })
        })
    }, 0)
})
</script>

<style lang="scss" scoped>
.use {
    padding: 48px 64px;
    @media (max-width: $lg) {
        padding: 24px 16px;
    }
    @media (max-width: $sm) {
        padding: 16px;
    }
}
.use__container {
    max-width: 1440px;
    margin: 0 auto;
}
.user__wrapper {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 84px;

    @media (max-width: $xl) {
        grid-template-columns: 2fr 1fr;
    }

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}
.use__slide {
    padding: 0;
}
.use__slide-img {
    border-radius: 24px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #fff7ac;
    object-fit: cover;
}
.use__slider {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;

    @media (max-width: $sm) {
        display: flex;
        flex-direction: column;
    }
}
.slider {
    width: 100%;
}
.use__slider-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.use__title {
    @media (max-width: $lg) {
        text-align: center;
    }
}
.use__slide-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: #656d75;
    max-width: 121px;
}
.use__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.use__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;

    @media (max-width: $lg) {
        text-align: center;
    }
}
.use__info-btn {
    width: max-content;

    @media (max-width: $lg) {
        margin: 0 auto;
    }
}
.use-slide-btn-left {
    left: 0;
}
.use-slide-btn-right {
    right: 0;
}

.slider__slide-tabs--use {
    transform: translate(0);
    width: 100%;
    grid-column: span 3;
}
.slider__slide-tabs-span--use {
    max-width: 40px;
    width: 100%;
    background: #fff7ac;
}

.slider__slide-tabs-span--use.active {
    background: $orange;
}
</style>
