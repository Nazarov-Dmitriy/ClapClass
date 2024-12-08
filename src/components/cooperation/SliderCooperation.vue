<template>
    <section class="slider">
        <div class="slider__container">
            <div class="slider__cards">
                <Swiper
                    v-if="isMobile"
                    ref="swiperRef"
                    :modules="[Navigation, Pagination]"
                    :pagination="paginationOptions"
                    :slides-per-view="1"
                    :space-between="500"
                    @slide-change="updateActiveIndex"
                >
                    <SwiperSlide v-for="(card, index) in slidesDataArr" :key="index">
                        <div class="slider__card">
                            <div class="slider__card-img-wrapper">
                                <img
                                    :src="card.img"
                                    alt=""
                                    class="slider__card-img"
                                    :class="card.class"
                                />
                            </div>
                            <p class="slider__card-text">
                                {{ card.text }}
                            </p>
                        </div>
                    </SwiperSlide>
                    <div class="slider__slide-tabs">
                        <span
                            v-for="(item, index) in slidesDataArr"
                            :key="index"
                            class="slider__slide-tabs-span"
                            :class="{ active: activeIndex === index }"
                        />
                    </div>
                </Swiper>

                <div v-else class="slider__card-wrapper--desctop">
                    <div class="slider__card" v-for="(card, index) in slidesDataArr" :key="index">
                        <div class="slider__card-img-wrapper">
                            <img :src="card.img" alt="" class="slider__card-img" />
                        </div>
                        <p class="slider__card-text">
                            {{ card.text }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const isMobile = ref(true)

const slidesDataArr = ref([
    {
        img: '/images/cooperation/slider/cooperation-logo.png',
        text: `«Clap Class» – это динамичный, инновационный проект с новыми стандартами
                            в образовании. Мы создаем уникальные игровые сервисы, помогающие
                            трансформировать школьную среду в эффективную и комфортную атмосферу,
                            где главным приоритетом является здоровье и развитие детей.`
    },
    {
        img: '/images/cooperation/slider/cooperation-hero.png',
        class: 'hero-img',
        text: `Наши продукты увлекают учеников, улучшают качество преподавания и делают
                            процесс передачи знаний веселым и эффективным. Присоединяйтесь к миссии
                            по созданию захватывающего внимание обучения. Вместе мы преобразуем
                            школьную среду и вернем радость познания!`
    }
])

const activeIndex = ref(0)
const swiperRef = ref(null)

function handleResize() {
    isMobile.value = window.innerWidth <= 992
}

const paginationOptions = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
}

function updateActiveIndex(swiper) {
    activeIndex.value = swiper.activeIndex
}

onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.slider {
    padding: 48px 64px;
    box-sizing: border-box;
    box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #fff7ac;

    @media (max-width: $lg) {
        padding: 48px 16px;
    }
    @media (max-width: $sm) {
        padding: 64px 16px 48px 16px;
    }
}
.slider__container {
    max-width: 1920px;
    margin: 0 auto;
}
.slider__cards {
    display: flex;
    gap: 64px;

    @media (max-width: $lg) {
        display: block;
    }
}
.slider__card-wrapper--desctop {
    display: flex;
    gap: 64px;
}

.slider__card {
    border-radius: 24px;
    padding: 24px 8px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.5);
    position: relative;
    margin-top: 20px;
}
.slider__card-img-wrapper {
    position: absolute;
    top: -80px;
    left: -70px;
    z-index: 0;

    @media (max-width: $lg) {
        top: -40px;
        left: -20px;
    }
}
.slider__card-img {
    @media (max-width: $lg) {
        width: 120px;
    }
}
.hero-img {
    position: absolute;
    top: -30px;
}
.slider__card-text {
    padding: 8px 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: $black;
}

.slider__slide-tabs-span {
    border-radius: 24px;
    max-width: 32px;
    width: 100%;
    height: 8px;
    background-color: $white;
    &.active {
        background: $orange;
    }
}

.slider__slide-tabs {
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    @media (max-width: $sm) {
        padding-top: 16px;
    }
}
</style>
