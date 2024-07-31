<template>
    <section class="slider">
        <div class="slider__container container">
            <h2 class="slider__title">
                Готовые игровые решения для учебного процесса
            </h2>
            <div class="slider__wrapper">
                <div class="slider__tabs">
                    <ul class="slider__tabs-list">
                        <li
                            v-for="(item, index) in slidesData"
                            :key="index"
                            class="slider__tabs-list-item"
                            :class="{ 'active-tab': activeIndex === index }"
                            @click="handleTabClick(index)"
                        >
                            {{ item.tab }}
                        </li>
                    </ul>
                </div>
                <div class="slider__slider-wrapper">
                    <Swiper
                        ref="swiperRef"
                        :modules="[Navigation, Pagination]"
                        :navigation="navigationOptions"
                        :pagination="paginationOptions"
                        :slides-per-view="1"
                        :space-between="500"
                        mousewheel="true"
                        simulate-touch="true"
                        @slide-change="updateActiveIndex"
                    >
                        <SwiperSlide
                            v-for="(item, index) in slidesData"
                            :key="index"
                        >
                            <div class="slider__slide">
                                <img
                                    :src="item.img"
                                    alt=""
                                    class="slider__slide-img"
                                >
                                <div class="slider__slide-info">
                                    <div class="slider__slide-info-title-wrapper">
                                        <img
                                            :src="getPath(item.svg)"
                                            alt=""
                                        >
                                        <h2 class="slider__slide-info-title">
                                            {{ item.title }}
                                        </h2>
                                    </div>
                                    <div class="slider__slide-info-text-wrapper">
                                        <p class="slider__slide-info-text">
                                            {{ item.text }}
                                        </p>
                                        <div class="slider__slide-info-text-btn-wrapper">
                                            <BtnComponent class="slider__slide-info-text-btn">
                                                Подробнее
                                            </BtnComponent>
                                        </div>
                                    </div>
                                </div>
                                <div class="slider__slide-arrow-btn-wrapper">
                                    <button
                                        class="slider__slide-arrow-btn slider__slide-arrow-btn--left"
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
                                        class="slider__slide-arrow-btn slider__slide-arrow-btn--right"
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
                    <div class="swiper-pagination" />
                </div>
                <div class="slider__slide-tabs">
                    <span
                        v-for="(item, index) in slidesData"
                        :key="index"
                        class="slider__slide-tabs-span"
                        :class="{ active: activeIndex === index }"
                    />
                </div>
                <div class="slider__info">
                    <p class="slider__info-text">
                        Присоединяйтесь к проекту и создайте свою витрину кейсов
                    </p>
                    <div class="slider__info-btn-wrapper">
                        <BtnComponentWhite class="slider__info-btn">
                            Витрина кейсов
                        </BtnComponentWhite>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BtnComponent from '../btns/BtnComponent.vue'
import BtnComponentWhite from '../btns/BtnComponentWhite.vue'
const slidesData = ref([
    {
        tab: 'Подвижные разминки',
        svg: '/images/slider/slide-svg1.svg',
        img: '/images/slider/slide-img1.png',
        title: 'Откройте второе дыхание!',
        text: 'Пробудите утомившийся класс, превратив перерыв на уроке в потрясающий танцевальный флешмоб'
    },
    {
        tab: 'Ритм-разминки',
        svg: '/images/slider/slide-svg2.svg',
        img: '/images/slider/slide-img2.png',
        title: 'На старт, внимание!',
        text: 'Активируйте режим концентрации учеников веселыми ритм-играми, задавая необходимый темп занятия'
    },
    {
        tab: 'Конгитивные разминки',
        svg: '/images/slider/slide-svg3.svg',
        img: '/images/slider/slide-img3.png',
        title: 'Курс на эффективность!',
        text: 'Настройте аудиторию на мозговой штурм при помощи нейрогимнастики и увлекательных упражнений брейн-фитнеса'
    }
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

function getPath (img) {
    return new URL(img, import.meta.url).href
}

function updateActiveIndex (swiper) {
    activeIndex.value = swiper.activeIndex
}

function handleTabClick (index) {
    activeIndex.value = index
    swiperRef.value.swiper.slideTo(index)
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

<style lang="scss">
.swiper {
    overflow: hidden;
}

.swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
    display: flex;
    justify-content: center;
}

.active-tab {
    color: $orange !important;
    border-bottom: 1px solid $orange !important;
}

.slider {
    padding: 100px 64px 48px 64px;
    box-sizing: border-box;
    overflow: hidden;
    @media (max-width: $lg) {
        padding: 48px 16px;
    }
    @media (max-width: $sm) {
        padding: 24px 16px;
    }
}

.slider__container {
    display: flex;
    flex-direction: column;
    gap: 48px;
    @media (max-width: $sm) {
        gap: 16px;
    }
}

.slider__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: $orange;
    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 1.5;
    }
}

.slider__wrapper {
    display: flex;
    flex-direction: column;
    gap: 48px;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        width: calc(100% + 1000%);
        margin: 0 auto;
        height: 60%;
        bottom: -100px;
        left: 0;
        background: $yellowy;
        z-index: -1;
    }
    &::before {
        content: '';
        position: absolute;
        width: calc(100% + 1000%);
        margin: 0 auto;
        height: 60%;
        bottom: -100px;
        left: calc(-100% - 1000%);
        background: $yellowy;
        z-index: -1;
    }
    @media (max-width: $sm) {
        gap: 16px;
    }
}
.slider__tabs-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 48px;
    margin-bottom: -48px;
    @media (max-width: $lg) {
        gap: 16px;
    }
    @media (max-width: $sm) {
        gap: 7px;
        margin-bottom: 0;
    }
}

.slider__tabs-list-item {
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: $gray;
    border-bottom: 1px solid $gray;
    cursor: pointer;
    @media (max-width: $lg) {
        font-size: 16px;
    }
    &.active-tab {
        border-bottom: 1px solid $orange;
        color: $orange;
    }
}

.slider__slide {
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    border: 4px solid $white;
    border-radius: 24px;
    background: $fonLight;
    display: flex;
    gap: 16px;
    padding: 16px;
    pointer-events: none;
    position: relative;
    width: 85%;
    @media (max-width: $lg) {
        flex-direction: column;
        width: 80%;
    }
    @media (max-width: $sm) {
        width: 100%;
    }
    .slider__slide-info-text-btn,
    .slider__slide-arrow-btn {
        pointer-events: auto;
    }
}

.slider__slide-img {
    width: 50%;
    object-fit: cover;
    aspect-ratio: 2 / 1;
    @media (max-width: $lg) {
        width: 100%;
    }
}

.slider__slide-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 50%;
    @media (max-width: $lg) {
        width: 100%;
    }
}

.slider__slide-info-title-wrapper {
    display: flex;
    gap: 24px;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;

    @media (max-width: $lg) {
        padding: 16px 8px;
    }
}

.slider__slide-info-title-wrapper img {
    @media (max-width: $lg) {
        display: none;
    }
}

.slider__slide-info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    color: $orange;
    text-align: center;
}

.slider__slide-info-text-wrapper {
    border-radius: 24px;
    padding: 24px;
    background: $yellowy;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 72px;
    @media (max-width: $lg) {
        gap: 16px;
    }
    @media (max-width: $sm) {
        gap: 8px;
    }
}

.slider__slide-info-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: $black;
    @media (max-width: $sm) {
        font-size: 16px;
    }
}

.slider__slide-arrow-btn-wrapper {
    @media (max-width: $sm) {
        display: none;
    }
}

.slider__slide-arrow-btn {
    border: 2px solid $orange;
    border-radius: 100px;
    background: $yellowy;
    padding: 8px 12px;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &--left {
        left: -60px;
    }
    &--right {
        right: -60px;
        transform: rotate(180deg);
    }
}

.swiper-pagination {
    display: none;
}

.slider__slide-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    transform: translateY(-30px);
    @media (max-width: $sm) {
        transform: translateY(-15px);
    }
}

.slider__slide-tabs-span {
    border-radius: 24px;
    max-width: 120px;
    width: 100%;
    height: 8px;
    background-color: $white;
    &.active {
        background: $orange;
    }
}

.slider__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.slider__info-text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    text-align: center;
    color: $gray;
    @media (max-width: $sm) {
        font-size: 20px;
    }
}

.slider__info-btn-wrapper {
    display: flex;
    justify-content: center;
}

.slider__info-btn {
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    background-color: $white;
    border: 2px solid $orange;
    & .btn-orange__text {
        color: $orange;
        &:hover {
            color: $white;
        }
    }
}


</style>
