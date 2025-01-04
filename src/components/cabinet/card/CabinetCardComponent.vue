<template>
    <div class="cabinet-card" @click="linkCard(cardInfo.title)">
        <img
            v-if="Array.isArray(cardInfo.img) && cardInfo.img.length > 1"
            :src="cardInfo.img[0]"
            alt=""
            class="cabinet-card__img"
        />
        <img v-else :src="cardInfo.img" alt="" class="cabinet-card__img" />

        <div class="cabinet-card__info">
            <h2 class="cabinet-card__info-title">{{ cardInfo.title }}</h2>
            <p class="cabinet-card__info-text">{{ cardInfo.subtitle }}</p>
        </div>
        <div class="cabinet-card__footer">
            <div class="cabinet-card__footer-btns">
                <div class="cabinet-card__footer-btn-views">
                    <img :src="cardInfo.viewIcon" alt="" class="cabinet-card__footer-btn-img" />
                    <span>{{ cardInfo.views }}</span>
                </div>
                <div class="cabinet-card__footer-btn-rating">
                    <img :src="cardInfo.ratingIcon" alt="" class="cabinet-card__footer-btn-img" />
                    <span>{{ cardInfo.rating }}</span>
                </div>
            </div>
            <div class="cabinet-card__footer-btn-time">
                <img :src="cardInfo.timeIcon" alt="" class="cabinet-card__footer-btn-img" />
                <span>{{ cardInfo.time }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
    cardInfo: {
        type: Object,
        required: true
    }
})
const router = useRouter()

function linkCard(name) {
    router.push(`/cabinet/showcase/${name}`)
}
</script>

<style scoped lang="scss">
.cabinet-card {
    border: 2px solid $gray;
    border-radius: 24px;
    max-width: 565px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        border: 2px solid $orange;
        box-shadow: 0 0 20px 0 $orange;
    }
}
.cabinet-card__img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    max-height: 300px;
    border-radius: 24px 24px 0 0;
}
.cabinet-card__info {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: $white;
}
.cabinet-card__info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    color: $black;
}
.cabinet-card__info-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;
}
.cabinet-card__footer {
    padding: 8px 16px;
    box-sizing: border-box;
    background: $fonLight;
    width: 100%;
    border-radius: 0 0 24px 24px;
    display: flex;
    justify-content: space-between;
}
.cabinet-card__footer-btns {
    display: flex;
    gap: 16px;
    align-items: center;

    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: $gray;
    }
}
.cabinet-card__footer-btn-views {
    display: flex;
    gap: 10px;
    align-items: center;
}
.cabinet-card__footer-btn-rating {
    display: flex;
    gap: 10px;
    align-items: center;
}
.cabinet-card__footer-btn-time {
    display: flex;
    gap: 10px;
    align-items: center;

    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: $gray;
    }
}
</style>
