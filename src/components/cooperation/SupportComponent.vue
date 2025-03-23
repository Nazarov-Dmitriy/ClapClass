<template>
    <Head>
        <meta property="og:title" content="Сотрудничество" />
    </Head>
    <section class="support">
        <div class="support__container">
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
                        <a href="https://yoomoney.ru/fundraise/18LATS4B2TM.250226" target="_blank">
                            <BtnComponent> Сделайте пожертвование </BtnComponent>
                        </a>
                        <BtnComponentWhite
                            emit-name="toggleModal"
                            :custom-class="'custom-btn'"
                            @toggle-modal="toggleModal"
                            >Свяжитесь с нами</BtnComponentWhite
                        >
                    </div>

                    <div class="support__networks-wrapper">
                        <span>Присоединяйтесь</span>
                        <a :href="getLinkSocial('youtube')" class="w-[60px]" target="_blank">
                            <img
                                src="@/assets/icons/social/youtube.svg "
                                alt="logo"
                                class="footer__youtube"
                            />
                        </a>
                        <a
                            v-if="getLinkSocial('rutube')"
                            :href="getLinkSocial('rutube')"
                            class="w-[40px]"
                            target="_blank"
                        >
                            <img
                                src="@/assets/icons/social/rutube.svg"
                                alt="logo"
                                class="footer__vk"
                            />
                        </a>
                        <a :href="getLinkSocial('vk')" class="w-[40px]" target="_blank">
                            <img src="@/assets/icons/social/vk.svg" alt="logo" class="footer__vk" />
                        </a>
                        <a :href="getLinkSocial('telegram')" class="w-[40px]" target="_blank">
                            <img
                                src="@/assets/icons/social/tg.svg"
                                alt="logo"
                                class="footer__telegram"
                            />
                        </a>
                    </div>
                    <div class="support__share">
                        <ShareComponent>
                            <template #text> Рассказать о нас </template>
                        </ShareComponent>
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <ModalComponent
                :visible="isModalVisible"
                class="support-modal"
                @close-modal="toggleModal"
            >
                <template #header>
                    <ModalHeader :class="{ success: getIsSuccess }" @close-modal="toggleModal">
                        {{
                            getIsSuccess
                                ? 'Спасибо за сообщение!'
                                : 'Заполните форму, и команда Клеппи свяжется с вами'
                        }}
                    </ModalHeader>
                </template>
                <template #form>
                    <UiForm> </UiForm>
                </template>
            </ModalComponent>
        </Teleport>
    </section>
</template>

<script setup>
import { Head } from '@unhead/vue/components'
import { computed, ref } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import BtnComponentWhite from '@/components/ui/btns/BtnComponentWhite.vue'
import UiForm from '../form/UiForm.vue'
import ModalComponent from '../modal/ModalComponent.vue'
import ModalHeader from '../modal/ModalHeader.vue'
import ShareComponent from '../article/ShareComponent.vue'
import { useSocialStore } from '@/stores/socialStore'
import { useSendMessageStore } from '@/stores/sendMessageStore'

const sendMessageStore = useSendMessageStore()
const socialStore = useSocialStore()
const isModalVisible = ref(false)

const getIsSuccess = computed(() => sendMessageStore.getIsSuccess)

const getSocial = computed(() => {
    return socialStore.getSocial
})

function toggleModal() {
    isModalVisible.value = !isModalVisible.value
}

function getLinkSocial(name) {
    return getSocial.value?.filter((el) => el.name === name)[0].link
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
    scrollbar-gutter: stable;
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

.support-modal {
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
