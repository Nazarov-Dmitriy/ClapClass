<template>
    <section class="support">
        <div class="support__container">
            <ModalComponent v-if="isModalVisible" @close-modal="toggleModal">
                <template #header>
                    <ModalHeader @close-modal="toggleModal"  />
                </template>
                <template #form>
                    <UiFom> </UiFom>
                </template>
            </ModalComponent>
            <div class="support__wrapper">
                <div class="support__text-wrapper">
                    <h2 class="support__title">Поддержите нас</h2>
                    <p class="support__text">
                        Расскажите о проекте, внесите вклад в продакшн контента или поддержите
                        работоспособность сервиса
                    </p>
                </div>
                <div class="support__info">
                    <div class="support__info-btn-wrapper">
                        <BtnComponent>Сделайте пожертвование</BtnComponent>
                        <BtnComponentWhite
                            emitName="toggleModal"
                            @toggleModal="toggleModal"
                            :custom-class="'custom-btn'"
                            >Свяжитесь с нами</BtnComponentWhite
                        >
                    </div>

                    <div class="support__networks-wrapper">
                        <span>Присоединяйтесь</span>
                        <img
                            src="@/assets/icons/footer/youtube.svg"
                            alt="logo"
                            class="footer__youtube"
                        />
                        <img src="@/assets/icons/footer/vk.svg" alt="logo" class="footer__vk" />
                        <img
                            src="@/assets/icons/footer/telegram.svg"
                            alt="logo"
                            class="footer__telegram"
                        />
                    </div>
                    <div class="support__share">
                        <span>Рассказать о нас</span>
                        <svg
                            width="21"
                            height="18"
                            viewBox="0 0 21 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.5 8.52708L12.7222 0.59375V5.12708C4.94444 6.26042 1.61111 11.9271 0.5 17.5938C3.27778 13.6271 7.16667 11.8137 12.7222 11.8137V16.4604L20.5 8.52708Z"
                                fill="#656D75"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import BtnComponent from '../btns/BtnComponent.vue'
import BtnComponentWhite from '../btns/BtnComponentWhite.vue'
import UiFom from '../form/UiFom.vue'
import ModalComponent from '../modal/ModalComponent.vue'
import ModalHeader from '../modal/ModalHeader.vue'

const isModalVisible = ref(false)

function toggleModal() {
    isModalVisible.value = !isModalVisible.value
}
</script>

<style lang="scss" scoped>
.support {
    padding: 48px 64px;
    box-sizing: border-box;

    @media (max-width: 991px) {
        padding: 48px 16px;
    }
    @media (max-width: 767px) {
        padding: 64px 16px 48px 16px;
    }
}
.support__container {
    max-width: 1042px;
    margin: 0 auto;
}
.support__wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.support__text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.support__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    color: $orange;
    text-align: center;
}
.support__text {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: $black;
    text-align: center;
}
.support__info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 24px;

    @media (max-width: $lg) {
        display: grid;
        grid-template-columns: 1fr;
    }
}

.support__info-btn-wrapper {
    display: flex;
    gap: 24px;
    @media (max-width: $lg) {
        align-items: center;
        justify-content: center;
    }
    @media (max-width: $sm) {
        flex-direction: column;
    }
}

.support__networks-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
        color: $orange;
    }

    @media (max-width: $lg) {
        justify-content: center;
    }
}

.support__share {
    display: flex;
    gap: 18px;

    svg {
        cursor: pointer;
    }
    @media (max-width: $xl) {
        justify-self: center;
    }
}
</style>
