<template>
    <section class="reviews">
        <div class="reviews__container container">
            <div class="reviews__wrapper">
                <div class="reviews__info-wrapper">
                    <h2 class="reviews__title">Коллеги уже используют Clap class</h2>
                    <div class="reviews__btn-wrapper">
                        <BtnComponent class="reviews__btn">Больше отзывов</BtnComponent>
                    </div>
                </div>
                <div class="reviews__cards-wrapper">
                    <div class="reviews__cards">
                        <div class="reviews__cards-group">
                            <div
                                v-for="(review, index) in getReviewsList"
                                :key="index"
                                class="reviews__card"
                            >
                                <div class="reviews__card-header">
                                    <img
                                        :src="getUrl(review.filePath)"
                                        alt=""
                                        class="reviews__card-img"
                                    />
                                    <div class="reviews__card-header-text">
                                        <span>{{ review.author }}</span>
                                        <span>{{ review.date }}</span>
                                    </div>
                                </div>
                                <div class="reviews__card-body">
                                    <p class="reviews__card-text">
                                        {{ review.description }}
                                    </p>
                                </div>
                            </div>
                            <div
                                v-for="(review, index) in getReviewsList"
                                :key="index"
                                class="reviews__card"
                            >
                                <div class="reviews__card-header">
                                    <img
                                        :src="getUrl(review.filePath)"
                                        alt=""
                                        class="reviews__card-img"
                                    />
                                    <div class="reviews__card-header-text">
                                        <span>{{ review.author }}</span>
                                        <span>{{ review.date }}</span>
                                    </div>
                                </div>
                                <div class="reviews__card-body">
                                    <p class="reviews__card-text">
                                        {{ review.description }}
                                    </p>
                                </div>
                            </div>
                            <div
                                v-for="(review, index) in getReviewsList"
                                :key="index"
                                class="reviews__card"
                            >
                                <div class="reviews__card-header">
                                    <img
                                        :src="getUrl(review.filePath)"
                                        alt=""
                                        class="reviews__card-img"
                                    />
                                    <div class="reviews__card-header-text">
                                        <span>{{ review.author }}</span>
                                        <span>{{ review.date }}</span>
                                    </div>
                                </div>
                                <div class="reviews__card-body">
                                    <p class="reviews__card-text">
                                        {{ review.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="reviews__cards-group">
                            <div
                                v-for="(review, index) in getReviewsList"
                                :key="index"
                                class="reviews__card"
                            >
                                <div class="reviews__card-header">
                                    <img
                                        :src="getUrl(review.filePath)"
                                        alt=""
                                        class="reviews__card-img"
                                    />
                                    <div class="reviews__card-header-text">
                                        <span>{{ review.author }}</span>
                                        <span>{{ review.date }}</span>
                                    </div>
                                </div>
                                <div class="reviews__card-body">
                                    <p class="reviews__card-text">
                                        {{ review.description }}
                                    </p>
                                </div>
                            </div>
                            <div
                                v-for="(review, index) in getReviewsList"
                                :key="index"
                                class="reviews__card"
                            >
                                <div class="reviews__card-header">
                                    <img
                                        :src="getUrl(review.filePath)"
                                        alt=""
                                        class="reviews__card-img"
                                    />
                                    <div class="reviews__card-header-text">
                                        <span>{{ review.author }}</span>
                                        <span>{{ review.date }}</span>
                                    </div>
                                </div>
                                <div class="reviews__card-body">
                                    <p class="reviews__card-text">
                                        {{ review.description }}
                                    </p>
                                </div>
                            </div>
                            <div
                                v-for="(review, index) in getReviewsList"
                                :key="index"
                                class="reviews__card"
                            >
                                <div class="reviews__card-header">
                                    <img
                                        :src="getUrl(review.filePath)"
                                        alt=""
                                        class="reviews__card-img"
                                    />
                                    <div class="reviews__card-header-text">
                                        <span>{{ review.author }}</span>
                                        <span>{{ review.date }}</span>
                                    </div>
                                </div>
                                <div class="reviews__card-body">
                                    <p class="reviews__card-text">
                                        {{ review.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import { useReviewsStore } from '@/stores/reviewsStore'

const reviewsStore = useReviewsStore()

const getReviewsList = computed(() => {
    return reviewsStore.getReviewsList
})
onMounted(() => {
    reviewsStore.getListDb()
})

function getUrl(url) {
    return import.meta.env.VITE_S3_URL + url
}
</script>
<style lang="scss">
.reviews {
    padding: 148px 64px 48px 64px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;

    @media (max-width: $lg) {
        padding: 48px 16px;
    }
    @media (max-width: $sm) {
        padding: 24px 16px;
    }
}

.reviews__wrapper {
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-top: 5px;
}
.reviews__info-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: $sm) {
        flex-direction: column;
        gap: 16px;
    }
}
.reviews__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 1.3;
    color: $orange;

    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 1.5;
    }
    @media (max-width: $sm) {
        font-size: 24px;
        text-align: center;
    }
}

.reviews__btn-wrapper {
    display: none;
}

.reviews__btn {
    width: max-content;
}

.reviews__cards-wrapper {
    margin: 0 -40px;
    mask-image: linear-gradient(
        to right,
        hsl(0 0% 0%/ 0),
        hsl(0 0% 0% / 1) 5%,
        hsl(0 0% 0% /1) 95%,
        hsl(0 0% 0% / 0)
    );

    @media (max-width: $lg) {
        margin: 0 -16px;
    }
}
.reviews__cards {
    display: flex;
    width: 100%;
    gap: 48px;
    overflow: hidden;

    @media (max-width: $lg) {
        width: 100%;
    }
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.reviews__cards-group {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 48px;
    min-width: 100%;
    animation: slide 15s linear infinite;

    @media (max-width: $lg) {
        animation: slide-lg 15s linear infinite;
    }
}

.reviews__card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    border: 2px solid $orange;
    border-radius: 24px;
    padding: 24px;
    background: $white;
    flex-shrink: 0;
    width: 430px;
    box-sizing: border-box;
    height: 100%;

    @media (max-width: $sm) {
        width: 357px;
    }
}
.reviews__card-header {
    display: flex;
    gap: 24px;
}

.reviews__card-header-text {
    display: flex;
    flex-direction: column;

    span {
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        color: $black;
    }
}

.reviews__card-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: $black;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 6;
    -webkit-line-clamp: 6;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reviews__card-img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
}

@keyframes slide {
    from {
        transform: translateX(40px);
    }
    to {
        transform: translateX(calc(-100% - 8px));
    }
}

@keyframes slide-lg {
    from {
        transform: translateX(16px);
    }
    to {
        transform: translateX(calc(-100% - 32px));
    }
}
</style>
