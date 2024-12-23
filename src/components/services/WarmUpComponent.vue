<template>
    <div class="warm-up">
        <div class="warm-up__wrapper">
            <img :src="information.img" alt="" class="warm-up__img" v-if="information.img" />
            <div class="warm-up__info">
                <h2 class="warm-up__info-title">{{ information.title }}</h2>
                <Swiper
                    ref="swiperRef"
                    :modules="[Navigation, Pagination]"
                    :navigation="navigationOptions"
                    :pagination="paginationOptions"
                    :slides-per-view="1"
                    :space-between="5000"
                    mousewheel="true"
                    simulate-touch="true"
                    :loop="true"
                    :autoplay="autoplayOptions"
                    @slideChange="updateActiveIndex"
                    class="slider"
                >
                    <SwiperSlide v-for="(text, index) in texts" :key="index">
                        <div class="flex flex-col justify-between gap-4 sm:gap-10">
                            <p class="warm-up__text">{{ text }}</p>
                            <div class="tab-wrapper">
                                <div class="slider__slide-tabs">
                                    <span
                                        v-for="(tab, tabIndex) in texts"
                                        :key="tabIndex"
                                        :class="{
                                            'slider__slide-tabs-span': true,
                                            active: activeIndex === tabIndex
                                        }"
                                    ></span>
                                </div>
                                <button
                                    v-show="activeIndex !== texts.length - 1"
                                    @click="swiperRef.value.swiper.slideNext()"
                                    class="btn btn--next"
                                >
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 24L20 16L12 8"
                                            stroke="#E05704"
                                            stroke-width="4"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </button>
                                <button
                                    v-show="activeIndex !== 0"
                                    @click="swiperRef.value.swiper.slidePrev()"
                                    class="btn btn--prev"
                                >
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 24L20 16L12 8"
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
            </div>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { ref } from 'vue'

const props = defineProps({
    information: {
        type: Object,
        required: true
    },
    texts: {
        type: Array,
        required: true
    }
})

const swiperRef = ref(null)

const activeIndex = ref(0)

const navigationOptions = {
    nextEl: '.btn--next',
    prevEl: '.btn--prev'
}

const paginationOptions = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
}

const autoplayOptions = {
    delay: 3000,
    disableOnInteraction: true
}

function updateActiveIndex(swiper) {
    activeIndex.value = swiper.realIndex % props.texts.length
}
</script>

<style scoped lang="scss">
.slider {
    max-width: 648px;
    width: 100%;
    padding: 0;
}
.warm-up {
    margin-top: -5%;
    padding: 196px 64px 48px 64px;
    box-sizing: border-box;
    background-image: url('/images/servecies/warm-up/bg-img.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    position: relative;
    @media (max-width: $lg) {
        padding: 196px 48px 48px 48px;
    }
    @media (max-width: $sm) {
        padding: 80px 16px 16px 16px;
    }
}
.warm-up__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    align-items: center;
    max-width: 1440px;
    margin: 0 auto;

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
    }
}
.warm-up__img {
    border-radius: 24px;
    max-width: 648px;
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;

    @media (max-width: $lg) {
        max-width: 420px;
        margin: 0 auto;
    }
}
.warm-up__info {
    display: grid;
    justify-content: center;
    gap: 48px;
    border-radius: 24px;
    padding: 48px 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    height: 100%;
}
.warm-up__info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: $orange;
}
.warm-up__text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: $black;
    padding: 16px;
}
.slider__slide-tabs {
    transform: translate(0);
}
.slider__slide-tabs-span {
    background: $yellowy;
    border-radius: 8px;
    width: 40px;
    height: 12px;

    &.active {
        background: $orange;
    }
}
.tab-wrapper {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    grid-template-areas: 'left-btn tabs right-btn';
    gap: 16px;
}

.slider__slide-tabs {
    grid-area: tabs;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.btn {
    border: 2px solid $orange;
    border-radius: 100px;
    background: $yellowy;
    position: relative;

    &--prev {
        grid-area: left-btn;
        transform: rotate(180deg);
    }
    &--next {
        grid-area: right-btn;
    }
}
</style>
