<template>
    <div class="modal__header" :class="{ success: getIsSuccess }">
        <div class="modal-close-wrapper">
            <span class="modal-close relative z-10" @click="closeModal">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.92969 5L19.0718 19.1421"
                        stroke="#0E0806"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <path
                        d="M5 19.4102L19.1421 5.26802"
                        stroke="#0E0806"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </span>
        </div>
        <div class="modal__header-info">
            <p class="modal__header-info-text">
                <slot>
                    {{
                        getIsSuccess
                            ? 'Спасибо за сообщение!'
                            : 'Заполните форму, и команда Клеппи свяжется с вами'
                    }}</slot
                >
            </p>
            <slot name="subtitle" />
        </div>
        <div class="modal__header-hero shrink-0" :class="{ rewies: props.image == 'rewies' }">
            <img
                v-if="props.image == 'question'"
                src="@/assets/images/form/question.png"
                alt="image"
                class="modal__header-hero-img"
            />
            <img
                v-else-if="props.image == 'rewies'"
                src="@/assets/images/form/rewies.png"
                alt="image"
                class="modal__header-hero-img"
            />
            <img
                v-else
                src="@/assets/images/form/form-hero-img.png"
                alt="image"
                class="modal__header-hero-img"
            />
            {{ getImageName }}
        </div>
    </div>
</template>

<script setup>
import { useSendMessageStore } from '@/stores/sendMessageStore'
import { computed, onUnmounted } from 'vue'

const emit = defineEmits(['closeModal'])

const props = defineProps({
    image: {
        type: String,
        default: ''
    }
})
const sendMessageStore = useSendMessageStore()

const getIsSuccess = computed(() => sendMessageStore.getIsSuccess)

onUnmounted(() => {
    sendMessageStore.setIsSuccess(false)
})

function closeModal() {
    emit('closeModal')
}
</script>

<style lang="scss" scoped>
.modal__header {
    padding: 16px 64px 0px 64px;
    box-sizing: border-box;
    background: url('@/assets/images/modal/modalHeader/modal-header-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    border-radius: 25px 25px 0 0;

    @media (max-width: $lg) {
        padding: 24px;
        width: 100%;
    }

    &.success {
        border-radius: 25px;
    }
}

.modal__header-info {
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    max-width: 490px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.6);
}
.modal__header-info-text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    text-align: center;
    color: $orange;
}

.modal__header-hero {
    width: 226px;
    height: 171px;

    &.rewies {
        min-width: 264px;
    }

    @media (max-width: $lg) {
        display: none;
    }
}
.modal__header-hero-img {
    width: 100%;
    height: 100%;
}

.modal-close-wrapper {
    position: absolute;
    top: 16px;
    right: 18px;

    @media (max-width: $lg) {
        top: 10px;
        right: 10px;
    }
}
.modal-close {
    cursor: pointer;
}
</style>
