<template>
    <section class="support">
        <div class="support__container">
            <Teleport to="body">
                <ModalComponent :visible="isModalVisible" @close-modal="toggleModal">
                    <template #header>
                        <ModalHeader @close-modal="toggleModal" />
                    </template>
                    <template #form>
                        <UiForm> </UiForm>
                    </template>
                </ModalComponent>
            </Teleport>
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
                        <ShareComponent>
                            <template #text> Рассказать о нас </template>
                        </ShareComponent>
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
import UiForm from '../form/UiForm.vue'
import ModalComponent from '../modal/ModalComponent.vue'
import ModalHeader from '../modal/ModalHeader.vue'
import ShareComponent from '../article/ShareComponent.vue'

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
