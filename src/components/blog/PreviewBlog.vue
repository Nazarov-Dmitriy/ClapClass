<template>
    <section class="bp-section">
        <div class="bp__container">
            <div class="bp__slogan">
                <h2 class="bp__title">
                    Новости
                </h2>
                <h2 class="bp__subtitle">
                    из мира Клеппи
                </h2>
            </div>
            <img
                class="bp__hero"
                :class="{ 'animation': animation }"
                src="@/assets/images/blog/hero.svg"
                alt="hero"
            >
        </div>
    </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const animation = ref(false)

onMounted(() => {
    animation.value = true
})

</script>
<style lang="scss">
.bp-section {
    width: 100%;
    background-image: url('@/assets/images/blog/bg.svg');
    background-position-x: center;
    overflow: hidden;
    height: 390px;
    position: relative;

    @media(max-width: $xxx) {
        background-size: cover;
        background-repeat: no-repeat;
    }

    @media(max-width: $xxl) {
        background-image: url('@/assets/images/blog/bg-xxl.png');
    }

    @media(max-width: $xl) {
        height: 259px;
    }

    @media(max-width: $lg) {
        background-image: url('@/assets/images/blog/bg-lg.png');
    }

    @media(max-width: $md) {
        background-image: url('@/assets/images/blog/bg-md.png');
        height: 235px;
    }

    @media(max-width: $sm) {
        background-image: url('@/assets/images/blog/bg-sm.png');
        height: 226px;
    }
}

.bp__container {
    margin: 0 auto;
    max-width: 1920px;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    position: relative;
}

.bp__slogan {
    width: 540px;
    padding-top: 118px;
    margin-left: calc(clamp(8.313rem, 50vw - 36.688rem, 23.313rem));

    @media(max-width: $xxl) {
        margin-left: 6.2%;
    }

    @media(max-width: $xl) {
        margin-left: 5%;
    }

    @media(max-width: $xl) {
        padding-top: 52px;
    }

    @media(max-width: $lg) {
        margin-left: 6%;
        width: 399px;
    }

    @media(max-width: $md) {
        margin-left: 16px;
        padding-top: 48px;
    }

    @media(max-width: $sm) {
                padding-top: 69px;
    }
}

.bp__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 60px;
    line-height: 60px;
    color: $orange;
    border: 4px solid $orange;
    padding: 16px 24px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    width: 305px;
    box-sizing: border-box;
    transform: rotate(-6deg);

    @media(max-width: $lg) {
        font-size: 40px;
        width: fit-content;
    }

    @media(max-width: $sm) {
        font-size: 26px;
        line-height: 39px;
    }
}

.bp__subtitle {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 60px;
    line-height: 60px;
    color: $white;
    border: 4px solid $white;
    padding: 16px 20px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $orange;
    box-sizing: border-box;
    transform: rotate(-2deg);
    width: 524px;
    position: relative;
    left: 32px;
    top: -8px;

    @media(max-width: $lg) {
        font-size: 40px;
        width: fit-content;
        top: -14px;
    }

    @media(max-width: $sm) {
        font-size: 26px;
        line-height: 39px;
    }
}

.bp__hero {
    width: 466px;
    height: 342px;
    position: absolute;
    right: calc(clamp(8.313rem, 50vw - 36.688rem, 23.313rem));

    &.animation {
        animation: show 0.9s ease-out;
        transform: translate3d(0, 0, 0);
        top: 48px;
    }

    @media(max-width: $xxl) {
        right: 6.2%;
    }

    @media(max-width: $xl) {
        right: 5%;
        width: 288px;
        height: 211px;
    }

    @media(max-width: $lg) {
        right: 6%;
    }

    @media(max-width: $md) {
        display: none;
    }
}

@keyframes show {
    0% {
        top: 538px;
    }

    100% {
        top: 48px;
    }
}
</style>