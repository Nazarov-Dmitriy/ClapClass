<template>
    <div class="card-page__left">
        <div class="card-page__left-img-wrapper">
            <img :src="cardInfo.img" alt="" class="card-page__left-img" />
        </div>
        <div class="card-page__left-info">
            <TitleComponent class="card-page__left-title">Описание</TitleComponent>
            <p class="card-page__left-text">
                {{ cardInfo.description }}
            </p>
            <div class="card-page__btns">
                <BtnComponentOrange>Оценить кейс</BtnComponentOrange>
                <BtnComponentOrange>Задать вопрос</BtnComponentOrange>
                <BtnComponentOrange>Оставить отзыв</BtnComponentOrange>
            </div>
        </div>
    </div>
</template>
<script setup>
import BtnComponentOrange from '/src/components/btns/BtnComponentOrange.vue'
import TitleComponent from '/src/components/UI/TitleComponent.vue'
const props = defineProps({
    cardInfo: {
        type: Array,
        default: () => []
    }
})
</script>
<style lang="scss" scoped>
.card-page__left {
    width: 100%;
    @include flex-col-gap(24px);
}
.card-page__left-img-wrapper {
    width: 100%;
}
.card-page__left-img {
    @include adaptive-img;
    max-height: 376px;
    height: 100%;
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
}
</style>
