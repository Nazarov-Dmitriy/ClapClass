<template>
    <section class="about">
        <div class="about__background">
            <img
                src="../../assets/images/main/about/about-bg.png"
                alt=""
                class="about__background-img"
            />
        </div>
        <div class="about__container">
            <div class="about__wrapper">
                <div class="about__slogan">
                    <h1 class="about__slogan-title">Учиться весело!</h1>
                    <p class="about__slogan-subtitle">Преподавать легко</p>
                </div>
                <div class="about__info">
                    <div class="about__info-logo"></div>
                    <div class="about__info-text-wrapper">
                        <p class="about__info-subtitle">
                            Сервис геймификации здоровьесберегающих технологий
                        </p>
                        <div class="about__info-btn-wrapper">
                            <BtnComponent
                                v-if="!getUser"
                                emit-name="action"
                                class="about__info-btn"
                                @action="() => setModal('login')"
                            >
                                Присоединиться
                            </BtnComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <AuthComponent :modal="modal" @close="() => setModal('')" />
        </Teleport>
    </section>
</template>

<script setup>
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import AuthComponent from '../modal/auth/AuthComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, ref } from 'vue'
const userStore = useUserStore()
const modal = ref('')
const getUser = computed(() => {
    return userStore.getUser
})

function setModal(value) {
    modal.value = value
}
</script>

<style lang="scss">
.about {
    padding: 48px 64px 0px 64px;
    height: 687px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    @media (max-width: $lg) {
        padding: 48px 16px 0px 16px;
        height: 100%;
    }
}

.about__container {
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;

    @media (max-width: $lg) {
        height: auto;
    }
}

.about__background {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.about__background-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.about__wrapper {
    display: flex;
    justify-content: space-between;
    height: 100%;

    @media (max-width: $lg) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 48px;
    }

    @media (max-width: $sm) {
        gap: 24px;
    }
}

.about__slogan {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    position: absolute;

    @media (max-width: $lg) {
        position: static;
        order: -1;
        max-width: 484px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: start;
        height: 214px;
    }

    @media (max-width: $sm) {
        max-width: 296px;
        height: 121px;
    }
}
.about__slogan-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 60px;
    line-height: 90px;
    text-align: center;
    color: $orange;
    border: 4px solid $orange;
    padding: 12px 20px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    width: 541px;
    transform: translate(6px, -20px) rotate(-6deg);

    @media (max-width: $lg) {
        font-size: 40px;
        line-height: 1.5;
        transform: translate(4px, 6px) rotate(-6deg);
        width: fit-content;
    }
    @media (max-width: $sm) {
        font-size: 26px;
        transform: translate(2px, 6px) rotate(-6deg);
        padding: 4px 12px;
    }
}
.about__slogan-subtitle {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 60px;
    line-height: 1.5;
    text-align: center;
    color: $white;
    border: 4px solid $white;
    padding: 12px 24px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $orange;
    box-sizing: border-box;
    width: fit-content;
    position: relative;
    margin-left: 32px;
    transform: rotate(-2deg);
    bottom: 32px;

    @media (max-width: $lg) {
        font-size: 40px;
        line-height: 1.5;
        transform: translate(0, 39px) rotate(-2deg);
        width: fit-content;
    }
    @media (max-width: $sm) {
        font-size: 26px;
        transform: translate(0, 32px) rotate(-2deg);
        padding: 4px 12px;
        margin-left: 0;
    }
}
.about__info {
    display: flex;
    flex-direction: column;
    gap: 48px;
    align-items: end;
    width: 100%;
    z-index: 100;
}
.about__info-logo {
    max-width: 496px;
    height: 211px;

    @media (max-width: $lg) {
        display: none;
    }
}
.about__info-logo {
    display: block;
    width: 100%;
    background-size: cover;
    background-position: center;
    animation: backgroundChange 3s forwards;

    @media (max-width: $lg) {
        display: none;
    }
}

@keyframes backgroundChange {
    0% {
        background-image: url('../../assets/images/main/about/about-logo.png');
    }
    20% {
        background-image: url('../../assets/images/main/about/about-logo1.png');
    }
    40% {
        background-image: url('../../assets/images/main/about/about-logo2.png');
    }
    60% {
        background-image: url('../../assets/images/main/about/about-logo3.png');
    }
    100% {
        background-image: url('../../assets/images/main/about/about-logo4.png');
    }
}

.about__info-text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-right: 32px;

    @media (max-width: $lg) {
        margin-right: 0;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 80px;
    }
}
.about__info-subtitle {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: #000000;
    max-width: 431px;
    width: 100%;
}
.about__info-btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
