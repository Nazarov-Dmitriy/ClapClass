<template>
    <section class="features">
        <div class="features__container">
            <TitleComponent class="features__title">Особенности продукта</TitleComponent>
            <Swiper
                ref="swiperRef"
                :modules="[Navigation, Pagination, Autoplay]"
                :navigation="navigationOptions"
                :pagination="paginationOptions"
                :slides-per-view="1"
                :space-between="2000"
                :loop="true"
                :autoplay="autoplayOptions"
                class="slider__wrapper"
                @slide-change="updateActiveIndex"
            >
                <SwiperSlide v-for="(slide, index) in slidesData" :key="index">
                    <div class="slider">
                        <div class="slider__img-wrapper">
                            <img :src="slide.svg" alt="slider image" class="slider__img" />
                        </div>
                        <div class="slider__info">
                            <TitleComponent class="slider__info-title">{{
                                slide.title
                            }}</TitleComponent>
                            <p class="slider__info-text">
                                {{ slide.text }}
                            </p>
                        </div>
                        <div class="slider__slide-arrow-btn-wrapper">
                            <button
                                class="slider__slide-arrow-btn about-btn-left slider__slide-arrow-btn--left use-slide-btn-left"
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
                                class="slider__slide-arrow-btn about-btn-right slider__slide-arrow-btn--right use-slide-btn-right"
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
            <div class="slider__slide-tabs slider__slide-tabs--about">
                <span
                    v-for="(item, index) in slidesData"
                    :key="index"
                    class="slider__slide-tabs-span slider__slide-tabs-span--about"
                    :class="{ active: activeIndex === index }"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { onMounted, ref } from 'vue'
import TitleComponent from '../ui/TitleComponent.vue'

const slidesData = ref([
    {
        svg: '/images/about/features/slider-img1.svg',
        title: 'Концепция «win-win»',
        text: 'Сценарий разминки позволяет единовременно участвовать любому количеству детей и взаимодействовать друг с другом'
    },
    {
        svg: '/images/about/features/slider-img2.svg',
        title: 'Гибридный подход',
        text: 'Сочетание направлений комплексно развивает физический, когнитивный и творческий потенциал ребенка'
    },
    {
        svg: '/images/about/features/slider-img3.svg',
        title: 'Универсальный кейс',
        text: 'Широкий выбор форматов для любой цели, предмета и конкретного момента в хронометраже занятия'
    },
    {
        svg: '/images/about/features/slider-img4.svg',
        title: 'Абсолютный интерактив',
        text: 'Сценарий разминки позволяет единовременно участвовать любому количеству детей и взаимодействовать друг с другом'
    },
    {
        svg: '/images/about/features/slider-img5.svg',
        title: 'Дружелюбный софт',
        text: 'Интуитивно понятный сервис, не требующий длительного времени на изучение, подготовку и организацию разминок'
    }
])

const activeIndex = ref(0)
const swiperRef = ref(null)

const navigationOptions = {
    nextEl: '.about-btn-right',
    prevEl: '.about-btn-left'
}

const paginationOptions = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
}

function updateActiveIndex(swiper) {
    activeIndex.value = swiper.realIndex % slidesData.value.length
}


onMounted(() => {
    const bullet = document.querySelectorAll('.swiper-pagination-bullet')
    const tabs = document.querySelectorAll('.slider__tabs-list-item')
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            bullet[index].click()
        })
    })
})
</script>

<style lang="scss" scoped>
.features {
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
.features__container {
    max-width: 1307px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 48px;
}
.features__title {
    text-align: center;
}
.slider__wrapper {
    width: 90%;
    &::before {
        content: none;
    }
    &::after {
        content: none;
    }
}
.slider {
    display: grid;
    grid-template-columns: repeat(2, auto);
    column-gap: 48px;
    justify-content: center;
    align-items: center;
    border: 8px solid #fff;
    border-radius: 24px;
    padding: 48px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #e6eaed;

    @media (max-width: $lg) {
        width: 100%;
        margin: 0 auto;
    }
    @media (max-width: $sm) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;
    }
}

.slider__img-wrapper {
    border: 8px solid #fff;
    border-radius: 200px;
    padding: 48px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #fff7ac;
}
.slider__img {
    object-fit: cover;
    aspect-ratio: 1 / 1;
}
.slider__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.slider__info-title {
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;

    @media (max-width: $sm) {
        text-align: center;
    }
}
.slider__info-text {
    text-align: left;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: #0e0806;

    @media (max-width: $lg) {
        font-size: 16px;
    }

    @media (max-width: $sm) {
        text-align: center;
    }
}

.use-slide-btn-right {
    @media (max-width: $lg) {
        display: block;
    }
}
.use-slide-btn-left {
    @media (max-width: $lg) {
        display: block;
    }
}
.slider__slide-arrow-btn--right {
    right: -70px;

    @media (max-width: $lg) {
        right: -30px;
    }
}
.slider__slide-arrow-btn--left {
    left: -70;

    @media (max-width: $lg) {
        left: -30px;
    }
}
.slider__slide-tabs--about {
    display: none;
    @media (max-width: $sm) {
        display: flex;
    }
}
.slider__slide-tabs-span--about {
    background: #fff7ac;

    &.active {
        background: #e05704;
    }
}
</style>
