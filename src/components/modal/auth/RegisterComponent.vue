<template>
    <ModalComponent v-esc="close" :visible="props.open">
        <template #header>
            <ModalHeader @close-modal="close">
                Регистрируйся и получи доступ к витрине кейсов
            </ModalHeader>
        </template>

        <template #form>
            <form class="form__wrapper" @submit.prevent>
                <div class="form__group">
                    <label
                        for="registerEmail"
                        class="form__label"
                        :class="getError?.email && 'error'"
                        >E-mail</label
                    >
                    <input
                        id="registerEmail"
                        v-model="inputData.email"
                        class="form__input"
                        placeholder="marina_ivanova@mail.ru"
                        :class="getError?.email && 'error'"
                    />
                    <p v-if="getError?.email" class="error-text">
                        <ErrorSvg clip="w-5 h-5"></ErrorSvg>   {{ getError?.email }}
                    </p>
                </div>
                <div class="form__group">
                    <label
                        for="password"
                        class="form__label"
                        :class="(getError?.password || error?.repeatPassword) && 'error'"
                        >Придумайте пароль</label
                    >
                    <div class="flex w-full relative">
                        <input
                            id="password"
                            ref="passwordInput"
                            v-model="inputData.password"
                            :type="!passwordVisible.password ? 'password' : 'text'"
                            :class="(getError?.password || error?.repeatPassword) && 'error'"
                            class="form__input"
                            placeholder="пароль"
                        />
                        <img
                            v-if="!passwordVisible.password"
                            class="input-icon"
                            src="/icons/auth/inputs/password-invisible.svg"
                            alt=""
                            @click="changeVisiblePassword('password')"
                        />
                        <img
                            v-else
                            class="input-icon"
                            src="/icons/auth/inputs/password-visible.svg"
                            alt=""
                            @click="changeVisiblePassword('password')"
                        />
                    </div>
                    <p v-if="getError?.password" class="error-text">
                        <ErrorSvg clip="w-5 h-5"></ErrorSvg>  {{ getError?.password }}
                    </p>
                </div>
                <div class="form__group">
                    <label
                        for="repeat-pass"
                        class="form__label"
                        :class="error?.repeatPassword && 'error'"
                        >Повторите пароль</label
                    >
                    <div class="flex w-full relative">
                        <div class="flex w-full relative">
                            <input
                                id="repeat-pass"
                                ref="repeatPasswordInput"
                                v-model="inputData.repeatPassword"
                                :type="!passwordVisible.repeatPassword ? 'password' : 'text'"
                                class="form__input"
                                placeholder="повторите пароль"
                                :class="error?.repeatPassword && 'error'"
                            />
                            <img
                                v-if="!passwordVisible.repeatPassword"
                                class="input-icon"
                                src="/icons/auth/inputs/password-invisible.svg"
                                alt=""
                                @click="changeVisiblePassword('repeatPassword')"
                            />
                            <img
                                v-else
                                class="input-icon"
                                src="/icons/auth/inputs/password-visible.svg"
                                alt=""
                                @click="changeVisiblePassword('repeatPassword')"
                            />
                        </div>
                    </div>
                    <p v-if="error?.repeatPassword" class="error-text">
                        <ErrorSvg clip="w-5 h-5"></ErrorSvg> Пароли не совпадают
                    </p>
                </div>

                <div class="form__links">
                    <p class="form__text">
                        Нажимая кнопку, я соглашаюсь с
                        <span>Политикой обработки персональных данных.</span>
                    </p>
                    <BtnComponent class="form__btn" emit-name="action" @action="registerUser">
                        Зарегистрироваться
                    </BtnComponent>
                </div>
                <div class="form__footer">
                    <p class="form__footer-text">Уже есть аккаунт?</p>
                    <div class="btn-wrapper">
                        <button class="form__footer-link" @click="toggleModal('login')">
                            Войти
                        </button>
                    </div>
                </div>
            </form>
        </template>
    </ModalComponent>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import ErrorSvg from '@/assets/icons/error.svg?component'
import ModalComponent from '../ModalComponent.vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import ModalHeader from '../ModalHeader.vue'
import { useUserStore } from '../../../stores/userStore'

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
const getIsSuccess = computed(() => userStore.getIsSuccess)
const getError = computed(() => userStore.getError)
const error = reactive({
    repeatPassword: ''
})

const emit = defineEmits(['change-modal'])

const inputData = reactive({
    email: '',
    password: '',
    repeatPassword: ''
})

const passwordVisible = reactive({
    password: false,
    repeatPassword: false
})

function changeVisiblePassword(field) {
    passwordVisible[field] = !passwordVisible[field]
}

const toggleModal = (value) => {
    emit('change-modal', value)
}

async function registerUser() {
    validatePassword()
    if (!error.repeatPassword) {
        userStore.register({ email: inputData.email, password: inputData.password })
    }
}

function validatePassword() {
    inputData.password !== inputData.repeatPassword
        ? (error.repeatPassword = true)
        : (error.repeatPassword = false)
}

watch(getIsSuccess, (val) => {
    if (val === 'register') {
        emit('change-modal', 'login')
        userStore.setIsSuccess()
    }
})
</script>

<style lang="scss" scoped>
.form__wrapper {
    border-radius: 0 0 24px 24px;
    padding: 16px 16px 48px 16px;
    box-sizing: border-box;
    background: $gray;
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
    color: $white;

    &.error {
        color: $yellowy;
    }
}

.form__input {
    border: 2px solid $gray;
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    background: #fff;
    color: $gray;
    width: 100%;

    &.error {
        border-color: $yellowy;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
    }

    &:-webkit-autofill:hover {
        -webkit-box-shadow: 0 0 0 50px #e6eaed inset; /* Change the color to your own background color */
    }
}
.input-icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translate(0, -50%);
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
    color: $yellowy;
}
</style>
