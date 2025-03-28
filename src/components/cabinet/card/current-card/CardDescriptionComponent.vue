<template>
    <div class="card-page__left">
        <div class="card-page__left-img-wrapper ">
            <Swiper
                v-if="props.data"
                :modules="[Navigation, Pagination, Autoplay]"
                :navigation="navigationOptions"
                :pagination="paginationOptions"
                :slides-per-view="1"
                :space-between="5000"
                :loop="true"
                class="slider "
                @slide-change="updateActiveIndex"
                @swiper="getRef"
            >
                <SwiperSlide v-for="(img, index) in props.data?.images_slider" :key="index">
                    <img :src="getUrl(img.path)" alt="" class="card-page__left-img" />
                    <div class="card-page__left-img-substrate">
                        <div class="card-page__left-img-substrate-btns">
                            <button
                                class="card-page__left-img-substrate-btn card-page__left-img-substrate-btn--left z-10"
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
                                v-for="(_, ind) in props.data?.images_slider"
                                :key="ind"
                                class="slider__slide-tabs-span"
                                :class="{ active: activeIndex === ind }"
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div v-else class="slider_empty animate-pulse bg-amber-400">
                <div alt="" class="card-page__left-img -z-1"></div>
            </div>
        </div>
        <div class="card-page__left-info">
            <TitleComponent class="card-page__left-title">Описание</TitleComponent>
            <div class="card-page__left-text" v-html="props.data?.description" />

            <div class="card-page__btns">
                <BtnComponentOrange emit-name="action" class="bg-white" @action="toggleRateModal"
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
            <ModalComponent :visible="isAskModalVisible" class="case-modal">
                <template #header>
                    <ModalHeader
                        :class="{ success: getIsSuccess }"
                        :image="getIsSuccess ? '' : 'question'"
                        @close-modal="toggleAskModal"
                    >
                        {{
                            getIsSuccess
                                ? 'Спасибо за сообщение!'
                                : 'Задайте вопрос и команда клэппи свяжется с вами'
                        }}
                    </ModalHeader>
                </template>
                <template #form>
                    <div class="case-modal__form">
                        <UiForm />
                    </div>
                </template>
            </ModalComponent>
            <ModalComponent
                :visible="isFeedbackModalVisible"
                class="case-modal"
                :class="{ success: getIsSuccess }"
            >
                <template #header>
                    <ModalHeader
                        :image="getIsSuccess ? '' : 'rewies'"
                        @close-modal="toggleFeedbackModal"
                    >
                        {{
                            getIsSuccess
                                ? 'Спасибо за сообщение!'
                                : 'Оставьте отзыв, это помогает улучшить разминку'
                        }}
                    </ModalHeader>
                </template>
                <template #form>
                    <div class="case-modal__form">
                        <UiForm />
                    </div>
                </template>
            </ModalComponent>
            <ModalComponent :visible="isRateModalVisible" modal-class="!max-w-[656px]">
                <template #header>
                    <RateModal
                        :current-rating="props.currentRating"
                        @close-modal="toggleRateModal"
                        @set-rating="setRating"
                    />
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
import { computed, onMounted, ref, watch } from 'vue'
import ModalComponent from '/src/components/modal/ModalComponent.vue'
import UiForm from '/src/components/form/UiForm.vue'
import RateModal from '/src/components/modal/cabinet/RateModal.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import { useSendMessageStore } from '@/stores/sendMessageStore'

const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    },
    currentRating: {
        type: Number,
        default: () => 0
    },
    user: {
        type: Object,
        default: () => {}
    }
})
const briefcaseStore = useBriefcaseStore()
const sendMessageStore = useSendMessageStore()
const activeIndex = ref(0)
const swiper = ref(null)
const isAskModalVisible = ref(false)
const isFeedbackModalVisible = ref(false)
const isRateModalVisible = ref(false)
const getIsSuccess = computed(() => sendMessageStore.getIsSuccess)

const navigationOptions = {
    nextEl: '.card-page__left-img-substrate-btn--right',
    prevEl: '.card-page__left-img-substrate-btn--left'
}

const paginationOptions = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
}

onMounted(() => {
    if (props.data?.images_slider?.lenght > 0) {
        swiper.value.updateSlides()
    }
    const bullet = document.querySelectorAll('.swiper-pagination-bullet')
    const tabs = document.querySelectorAll('.slider__tabs-list-item')
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            bullet[index].click()
        })
    })
})

function setRating(val) {
    let params = { briefcase_id: props.data?.id, user_id: props.user?.id, rating: val }
    briefcaseStore.addRating(params)
}

function getRef(swiperInstance) {
    swiper.value = swiperInstance
}

function updateActiveIndex(swiper) {
    activeIndex.value = swiper.realIndex
}

function toggleAskModal() {
    sendMessageStore.setIsSuccess(false)
    isAskModalVisible.value = !isAskModalVisible.value
}

function toggleFeedbackModal() {
    sendMessageStore.setIsSuccess(false)
    isFeedbackModalVisible.value = !isFeedbackModalVisible.value
}
function toggleRateModal() {
    sendMessageStore.setIsSuccess(false)
    isRateModalVisible.value = !isRateModalVisible.value
}

function getUrl(path) {
    if (!path) {
        return false
    }
    let url = import.meta.env.VITE_S3_URL + path
    try {
        new URL(url)
        return url
    } catch (e) {
        return false
    }
}

watch(
    () => props.data,
    () => {
        if (props.data?.images_slider?.lenght > 0) {
            swiper.value.updateSlides()
        }
    }
)

watch(
    () => props.currentRating,
    () => {}
)
</script>

<style lang="scss" scoped>
.card-page__left {
    width: 100%;
    min-width: 0; 
    @include flex-col-gap(24px);
}
.case-modal__form {
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
    min-width: 0;
    max-width: 100%;
}
.slider {
    max-width: 1400px;
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

.slider_empty {
    max-height: 376px;
    height: 100%;
    border-radius: 24px;
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

.case-modal {
    :deep(.modal) {
        border: 4px solid white;
        border-radius: 30px;
        overflow: hidden;
    }

    .success {
        border-radius: 25px;
        justify-content: space-between;

        :deep(.modal__header-info) {
            width: 100%;
        }

        @media (max-width: $lg) {
            justify-content: center;
        }
    }

    :deep(.field__input) {
        &.error {
            border: 2px solid $red;
        }
    }

    :deep(.error-text) {
        color: $red !important;
    }

    :deep(.field__label.error) {
        color: $red !important;
    }

    :deep(.form__error) {
        color: $red !important;
    }
    :deep(.form__input--error) {
        border: 2px solid $red !important;
    }
    :deep(.form__error) {
        color: $red !important;
    }
    :deep(.form__textarea--error) {
        border: 2px solid $red !important;
    }
    :deep(.form__error-wrapper) {
        color: $red !important;
    }
}
</style>
