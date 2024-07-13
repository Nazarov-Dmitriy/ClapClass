<template>
    <section class="about">
        <div class="about__container">
            <div class="about__wrapper">
                <div class="about__slogan">
                    <h1 class="about__slogan-title">Учиться весело!</h1>
                    <p class="about__slogan-subtitle">Преподавать легко!</p>
                </div>
                <div class="about__info">
                    <img :src="currentImage" alt="Logo" class="about__info-logo" />
                    <div class="about__info-text-wrapper">
                        <p class="about__info-subtitle">
                            Сервис геймификации здоровьесберегающих технологий
                        </p>
                        <div class="about__info-btn-wrapper">
                            <BtnComponent class="about__info-btn">Присоединиться</BtnComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BtnComponent from '../btns/BtnComponent.vue'

const images = [
    new URL('../../assets/images/main/about/about-logo.png', import.meta.url).href,
    new URL('../../assets/images/main/about/about-logo1.png', import.meta.url).href,
    new URL('../../assets/images/main/about/about-logo2.png', import.meta.url).href,
    new URL('../../assets/images/main/about/about-logo3.png', import.meta.url).href,
    new URL('../../assets/images/main/about/about-logo4.png', import.meta.url).href
]

const currentImage = ref(images[0])
let intervalId = null
let imageIndex = 0

const changeImage = () => {
    imageIndex++
    if (imageIndex < images.length) {
        currentImage.value = images[imageIndex]
    } else {
        clearInterval(intervalId)
    }
}

onMounted(() => {
    intervalId = setInterval(changeImage, 1000)
})

onUnmounted(() => {
    clearInterval(intervalId)
})
</script>

<style lang="scss">
.about {
    padding: 48px 64px 0px 64px;
    height: 634px;
    box-sizing: border-box;
    background: url('../../assets/images/main/about/about-bg.png') no-repeat top;
}

.about__container {
    max-width: 1440px;
    margin: 0 auto;
}
.about__wrapper {
    display: flex;
    gap: 147px;
    justify-content: space-between;
}
.about__slogan {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
}
.about__slogan-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 60px;
    line-height: 100%;
    text-align: center;
    color: $orange;
    border: 4px solid $orange;
    padding: 16px 24px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    transform: rotate(-4deg);
    box-sizing: border-box;
}
.about__slogan-subtitle {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 60px;
    line-height: 100%;
    text-align: center;
    color: $white;
    border: 4px solid $white;
    padding: 16px 24px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $orange;
    box-sizing: border-box;
}
.about__info {
    display: flex;
    flex-direction: column;
    gap: 48px;
    align-items: end;
    width: 100%;
}
.about__info-logo {
}
.about__info-text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.about__info-subtitle {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: $black;
}
.about__info-btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
