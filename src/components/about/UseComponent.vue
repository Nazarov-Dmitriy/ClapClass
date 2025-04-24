<template>
    <section class="use">
        <div class="use__container">
            <div class="user__wrapper">
                <div class="flex flex-col gap-4 relative w-full min-w-0 lg:min-w-[580px]">
                    <Swiper
                        ref="swiperRefUse"
                        :modules="[Navigation, Pagination]"
                        :navigation="navigationOptions"
                        :pagination="paginationOptions"
                        :slides-per-view="1"
                        :space-between="5000"
                        :loop="true"
                        class="slider use__slide h-full"
                        @slide-change="updateActiveIndex"
                    >
                        <SwiperSlide
                            v-for="(slide, index) in slidesCards"
                            :key="index"
                            class="items-center"
                        >
                            <div class="use__slider">
                                <div v-for="card in slide" :key="card.id" class="use__slider-card">
                                    <img :src="card.img" :alt="card.text" class="use__slide-img" />
                                    <div class="flex flex-col gap-1 relative">
                                        <span
                                            v-for="item in card.text"
                                            :key="item"
                                            class="use__slide-text"
                                        >
                                            {{ item }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    <div class="slider__slide-tabs slider__slide-tabs--use">
                        <span
                            v-for="(_, idx) in slidesCards"
                            :key="idx"
                            class="slider__slide-tabs-span slider__slide-tabs-span--use"
                            :class="{ active: activeIndex === idx }"
                        />
                    </div>
                    <div class="slider__slide-arrow-btn-wrapper">
                        <button
                            class="slider__slide-arrow-btn slider__slide-arrow-btn--left use-slide-btn-left"
                            @click="swiperRefUse.value.swiper.slidePrev()"
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
                            @click="swiperRefUse.value.swiper.slideNext()"
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
                    <BtnComponent
                        v-if="!getUser"
                        emit-name="action"
                        class="use__info-btn mobile"
                        @action="() => setModal('register')"
                        >Попробовать сейчас</BtnComponent
                    >
                </div>

                <div class="use__info">
                    <TitleComponent class="use__title">Используем лучшие практики</TitleComponent>
                    <p class="use__text">
                        Проект отслеживает актуальные образовательные тренды наполняя библиотеку
                        инструментами, получившими признание учителей. Благодаря обратной связи
                        пользователей каждый кейс продолжает непрерывно развиваться. Мы не просто
                        создаем разминки, а формируем экосистему эффективных направлений,
                        способствуя всестороннему развитию потенциала детей.
                    </p>
                    <BtnComponent
                        v-if="!getUser"
                        emit-name="action"
                        class="use__info-btn"
                        @action="() => setModal('register')"
                        >Попробовать сейчас</BtnComponent
                    >
                </div>
            </div>
        </div>

        <Teleport to="body">
            <AuthComponent :modal="modal" @close="() => setModal('')" />
        </Teleport>
    </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import TitleComponent from '../ui/TitleComponent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useUserStore } from '@/stores/userStore'
import AuthComponent from '../modal/auth/AuthComponent.vue'

const slidesCards = ref([
    [
        {
            id: 1,
            img: '/images/about/use/card-img1.svg',
            text: ['Геймификация']
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

const userStore = useUserStore()
const modal = ref('')
const getUser = computed(() => {
    return userStore.getUser
})
const activeIndex = ref(0)
const swiperRefUse = ref(null)

const navigationOptions = {
    nextEl: '.use-slide-btn-right',
    prevEl: '.use-slide-btn-left'
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

function setModal(value) {
    modal.value = value
}
</script>

<style lang="scss" scoped>
.use {
    padding: 128px 0 0;

    @media (max-width: $lg) {
        padding: 80px 0 0;
    }

    @media (max-width: $sm) {
        padding: 48px 0 0;
    }
}

.use__container {
    max-width: 1440px;
    margin: 0 auto;
}

.user__wrapper {
    display: grid;
    grid-template-columns: 173fr 134fr;
    justify-content: center;
    align-items: center;
    padding: 0 64px;
    gap: 84px;
    min-width: 0;

    @media (max-width: $xxl) {
        gap: 16px;

    }

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    @media (max-width: $md) {
        padding: 0 16px;
    }
}

.use__slide {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 56px;

    @media (max-width: $md) {
        padding: 0;
    }
}

.use__slide-img {
    border-radius: 24px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #fff7ac;
    object-fit: cover;
    margin: 0 20px;

    @media (max-width: $md) {
        width: 64px;
        aspect-ratio: 1;
        padding: 8px;
    }
}

.use__slider {
    display: grid;
    max-width: 580px;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    @media (max-width: $md) {
        display: flex;
        flex-direction: column;
    }
}
.slider {
    width: 100%;
    min-width: 0;
    max-width: 692px;
    min-height: 0;

    @media (max-width: $md) {
        max-width: 540px;
    }
}

.use__slider-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
    max-width: 188px;
    width: 100%;

    @media (max-width: $md) {
        max-width: none;
        width: 290px;
        padding: 16px;
        flex-direction: row;
        justify-content: start;
    }
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
}
.use__info {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: $md) {
        gap: 16px;
        order: -1;
    }
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

    @media (max-width: $md) {
        display: none;
    }

    &.mobile {
        display: none;

        @media (max-width: $md) {
            display: flex;
        }
    }
}

.slider__slide-arrow-btn-wrapper {
    @media (max-width: $md) {
        display: none;
    }
}
.use-slide-btn-left {
    z-index: 100;
    left: 0;
}
.use-slide-btn-right {
    z-index: 100;
    right: 4px;
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
    height: 12px;
}

.slider__slide-tabs-span--use.active {
    background: $orange;
}
</style>
