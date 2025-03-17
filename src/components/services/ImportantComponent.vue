<template>
    <div class="important">
        <div class="important__wrapper">
            <div class="important__subwrapper">
                <div class="important__info">
                    <h2 class="important__title">{{ information.title }}</h2>
                    <div class="important__text-wrapper">
                        <p
                            v-for="(text, index) in information.text"
                            :key="index"
                            class="important__text"
                        >
                            {{ text }}
                        </p>
                    </div>
                </div>
            </div>
            <img :src="information.img" alt="" class="important__img" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    information: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" >
.important {
    padding: 80px 64px;
    box-sizing: border-box;

    @media (max-width: $lg) {
        padding: 64px 16px;
    }
    @media (max-width: $sm) {
        padding: 24px 16px 48px 16px;
    }
}
.important__wrapper {

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
    max-width: 1312px;
    margin: 0 auto;

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
    }
}
.important__info {
    display: grid;
    gap: 48px;
}
.important__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $orange;

    @media (max-width: $lg) {
        text-align: center;
    }
}
.important__text-wrapper {
    display: grid;
    gap: 24px;
}
.important__text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: $black;
}
.important__img {
    object-fit: cover;
    aspect-ratio: 1 / 1;
    @media (max-width: $lg) {
        max-width: 420px;
        width: 100%;
        order: -1;
        margin: 0 auto;
    }
}
</style>
