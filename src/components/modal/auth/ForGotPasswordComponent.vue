<template>
    <ModalComponent v-esc="close" :visible="open">
        <template #header>
            <ModalHeader @close-modal="() => close()">
                Восстановление пароля
                <template #subtitle>
                    <p class="forgot-subtitle text-center">
                        Введите e-mail указанный при регистрации и мы отправим на него инструкцию
                    </p>
                </template>
            </ModalHeader>
            <form class="form__wrapper" @submit.prevent>
                <div class="form__group">
                    <input
                        id="forgotEmail"
                        v-model="email"
                        placeholder="marina_ivanova@mail.ru"
                        :class="getError?.email && 'error'"
                        class="form__input"
                    />
                    <p v-if="getError?.email" class="error-text">
                        <ErrorSvg clip="w-5 h-5"></ErrorSvg>       {{ getError?.email }}
                    </p>
                </div>
                <BtnComponent
                    class="mx-auto"
                    emit-name="forGotPassword"
                    @for-got-password="forGotPassword"
                >
                    Отправить
                </BtnComponent>
            </form>
            S
        </template>
    </ModalComponent>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ModalComponent from '../ModalComponent.vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import ModalHeader from '../ModalHeader.vue'
import { useUserStore } from '@/stores/userStore'
import { toast } from "vue3-toastify";
import ErrorSvg from '@/assets/icons/error.svg?component'

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    close: {
        type: Function,
        default: () => {}
    }
})
const userStore = useUserStore()
const getError = computed(() => userStore.getError)
const email = ref('')
const getIsSuccess = computed(() => userStore.getIsSuccess)


function forGotPassword() {
    userStore.forGotPassword({ email: email.value })
}

watch(getIsSuccess, (val) => {
    if (val == 'forGotPassword') {
        props.close()
        toast.success("Пароль отправлен на почту", {
            autoClose: 3000,
            dangerouslyHTMLString: true,
        });
    }
})
</script>

<style lang="scss" scoped>
.form__wrapper {
    border-radius: 0 0 24px 24px;
    padding: 16px 16px 48px 16px;
    box-sizing: border-box;
    background: $fonLight;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form__group {
    display: grid;
    gap: 8px;
    position: relative;
}

.form__label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: $gray;
}

.form__input {
    border: 2px solid $gray;
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    background: #fff;
    color: $gray;

    &.error {
        border-color: $red;
    }
}

.input-icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translate(0, 20%);
}

.form__links {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
}

.form__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;
    text-align: center;

    & span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        text-decoration: underline;
        text-decoration-skip-ink: none;
        text-align: center;
        color: $black;
        display: block;
    }
}

.form__btn {
    margin: 0 auto;
}

.form__footer {
    &--login {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
}

.form__footer-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: $white;
}

.form__footer-link {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: $white;
    border-bottom: 1px solid #fff;

    &--black {
        color: $black;
        border-bottom: 1px solid $black;
    }
}

.btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.checkbox-label {
    color: $white;
}

.forgot-subtitle {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: $gray;
}

.error-text {
    color: $red;
}
</style>
