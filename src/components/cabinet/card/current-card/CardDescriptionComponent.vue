<template>
    <div class="card-page__left">
        <div class="card-page__left-img-wrapper">
            <Swiper
                ref="swiperRef"
                :modules="[Navigation, Pagination, Autoplay]"
                :navigation="navigationOptions"
                :pagination="paginationOptions"
                :slides-per-view="1"
                :space-between="5000"
                :loop="true"
                class="slider"
                @slide-change="updateActiveIndex"
            >
                <SwiperSlide
                    v-for="(img, imgIndex) in Array.isArray(cardInfo.img)
                        ? cardInfo.img
                        : [cardInfo.img]"
                    :key="imgIndex"
                >
                    <img :src="img" alt="" class="card-page__left-img" />
                    <div class="card-page__left-img-substrate">
                        <div class="card-page__left-img-substrate-btns">
                            <button
                                class="card-page__left-img-substrate-btn card-page__left-img-substrate-btn--left"
                            >
                                <svg
                                    width="33"
                                    height="32"
                                    viewBox="0 0 33 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20.5 8L12.5 16L20.5 24"
                                        stroke="white"
                                        stroke-width="4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                class="card-page__left-img-substrate-btn card-page__left-img-substrate-btn--right"
                            >
                                <svg
                                    width="33"
                                    height="32"
                                    viewBox="0 0 33 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20.5 8L12.5 16L20.5 24"
                                        stroke="white"
                                        stroke-width="4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="slider__slide-tabs">
                            <span
                                v-for="(img, index) in Array.isArray(cardInfo.img)
                                    ? cardInfo.img
                                    : [cardInfo.img]"
                                :key="index"
                                class="slider__slide-tabs-span"
                                :class="{ active: activeIndex === index }"
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="card-page__left-info">
            <TitleComponent class="card-page__left-title">Описание</TitleComponent>
            <p class="card-page__left-text">
                {{ cardInfo.description }}
            </p>
            <div class="card-page__btns">
                <BtnComponentOrange emit-name="action" @action="toggleRateModal"
                >Оценить кейс</BtnComponentOrange
                >
                <BtnComponentOrange emit-name="action" @action="toggleAskModal"
                >Задать вопрос</BtnComponentOrange
                >
                <BtnComponentOrange emit-name="action" @action="toggleFeedbackModal"
                >Оставить отзыв</BtnComponentOrange
                >
            </div>
        </div>
        <Teleport to="body">
            <ModalComponent :visible="isAskModalVisible">
                <template #header>
                    <ModalHeader @close-modal="toggleAskModal">
                        Задайте вопрос и команда клэппи свяжется с вами
                    </ModalHeader>
                </template>
                <template #form>
                    <div class="modal">
                        <UiForm />
                    </div>
                </template>
            </ModalComponent>
            <ModalComponent :visible="isFeedbackModalVisible">
                <template #header>
                    <ModalHeader @close-modal="toggleFeedbackModal">
                        Оставьте отзыв, это помогает улучшить разминку
                    </ModalHeader>
                </template>
                <template #form>
                    <div class="modal">
                        <UiForm />
                    </div>
                </template>
            </ModalComponent>
            <ModalComponent :visible="isRateModalVisible">
                <template #header>
                    <RateModal @close-modal="toggleRateModal" />
                </template>
            </ModalComponent>
        </Teleport>
    </div>
</template>

<script setup>
import BtnComponentOrange from '@/components/ui/btns/BtnComponentOrange.vue'
import TitleComponent from '/src/components/ui/TitleComponent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ModalHeader from '/src/components/modal/ModalHeader.vue'
import { onMounted, ref } from 'vue'
import ModalComponent from '/src/components/modal/ModalComponent.vue'
import UiForm from '/src/components/form/UiForm.vue'
import RateModal from '/src/components/modal/cabinet/RateModal.vue'

const props = defineProps({
    cardInfo: {
        type: Object,
        default: () => {}
    }
})

const activeIndex = ref(0)
const swiperRef = ref(null)
const isAskModalVisible = ref(false)
const isFeedbackModalVisible = ref(false)
const isRateModalVisible = ref(false)

const navigationOptions = {
    nextEl: '.card-page__left-img-substrate-btn--right',
    prevEl: '.card-page__left-img-substrate-btn--left'
}

const paginationOptions = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
}

function updateActiveIndex(swiper) {
    activeIndex.value = swiper.realIndex % props.cardInfo.img.length
}

function toggleAskModal() {
    isAskModalVisible.value = !isAskModalVisible.value
}
function toggleFeedbackModal() {
    isFeedbackModalVisible.value = !isFeedbackModalVisible.value
}
function toggleRateModal() {
    isRateModalVisible.value = !isRateModalVisible.value
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
.card-page__left {
    width: 100%;
    @include flex-col-gap(24px);
}
.modal {
    :deep(.form__form) {
        background-color: $fonLight;
    }
    :deep(.form__label) {
        color: $gray;
    }
    :deep(.form__error-wrapper) {
        color: $gray;
    }
}

.card-page__left-img-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
}
.slider {
    max-width: 1300px;
    width: 100%;
    padding: 0;

    @media (max-width: 1750px) {
        max-width: 1100px;
    }
    @media (max-width: $xxl) {
        max-width: 800px;
    }
    @media (max-width: $xl) {
        max-width: 519px;
    }
}
.card-page__left-img {
    @include adaptive-img;
    max-height: 376px;
    height: 100%;
    border-radius: 24px;
    position: relative;
    z-index: 1;
}
.card-page__left-img-substrate {
    border-radius: 0 0 24px 24px;
    padding: 8px 0px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.5);
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
    z-index: 2;
}
.card-page__left-img-substrate-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
}
.card-page__left-img-substrate-btn {
    border: 2px solid $white;
    border-radius: 100px;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;

    &:hover {
        border: 2px solid $orange;
        background: #fff7ac;

        svg path {
            stroke: $orange;
            transition: stroke 0.3s ease;
            position: relative;
            z-index: -1;
        }
    }

    &--right {
        transform: rotate(180deg);
    }
}

.card-page__left-info {
    @include flex-col-gap(8px);
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    background: $fonLight;
}

.card-page__left-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;
    margin-bottom: 16px;
}
.card-page__btns {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}
.slider__slide-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    transform: translateY(-25px);
    @media (max-width: $sm) {
        transform: translateY(-5px);
    }
}

.slider__slide-tabs-span {
    border-radius: 24px;
    max-width: 40px;
    width: 100%;
    height: 8px;
    background-color: $white;
    &.active {
        background: $orange;
    }
}
</style>
