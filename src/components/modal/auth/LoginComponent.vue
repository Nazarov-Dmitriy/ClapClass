<template>
    <ModalComponent v-esc="close" :visible="open">
        <template #header>
            <ModalHeader @close-modal="close">
                Приветствуем!
                <template #subtitle>
                    <p class="forgot-subtitle text-center">
                        Введите данные для входа в личный кабинет
                    </p>
                </template>
            </ModalHeader>
        </template>
        <template #form>
            <form class="form__wrapper" @submit.prevent>
                <div class="form__group">
                    <label for="email" class="form__label" :class="getError?.email && 'error'"
                    >E-mail</label
                    >
                    <div class="flex w-full relative">
                        <input
                            v-model="inputData.email"
                            type="text"
                            class="form__input"
                            :class="getError?.email && 'error'"
                            placeholder="пароль"
                        />
                        <img
                            class="input-icon"
                            src="/public/icons/auth/inputs/input-mail.svg"
                            alt=""
                        />
                    </div>
                    <p v-if="getError?.email" class="error-text">
                        {{ getError?.email }}
                    </p>
                </div>
                <div class="form__group">
                    <label for="password" class="form__label" :class="getError?.password && 'error'"
                    >Пароль</label
                    >
                    <div class="flex w-full relative">
                        <input
                            id="password"
                            v-model="inputData.password"
                            placeholder="Введите пароль"
                            class="form__input"
                            :class="getError?.password && 'error'"
                            :type="passwordVisible.password ? 'password' : 'text'"
                        />
                        <img
                            v-if="passwordVisible.password"
                            class="input-icon"
                            src="/public/icons/auth/inputs/password-invisible.svg"
                            alt=""
                            @click="changeVisiblePassword('password')"
                        />
                        <img
                            v-else
                            class="input-icon"
                            src="/public/icons/auth/inputs/password-visible.svg"
                            alt=""
                            @click="changeVisiblePassword('password')"
                        />
                    </div>

                    <p v-if="getError?.password" class="error-text">
                        {{ getError?.password }}
                    </p>
                </div>
                <div class="form__login flex justify-between items-center">
                    <div class="flex gap-2 cursor-pointer">
                        <div
                            v-if="isCheckboxActive"
                            class="checkbox-filled flex justify-center items-center bg-[#fff7ac]"
                            @click="toggleCheckbox"
                        >
                            <img src="/public/icons/auth/checkboxes/checkbox-filled.svg" alt="" />
                        </div>
                        <img
                            v-else
                            src="/public/icons/auth/checkboxes/checkbox-empty.svg"
                            alt=""
                            @click="toggleCheckbox"
                        />

                        <span class="checkbox-label" @click="toggleCheckbox">Запомнить меня</span>
                    </div>
                    <BtnComponent emit-name="action" @action="login"> Войти </BtnComponent>
                </div>
                <div class="form__footer form__footer--login">
                    <div class="btn-wrapper">
                        <button
                            class="form__footer-link form__footer-link--black"
                            @click="toggleModal('for-got-password')"
                        >
                            Забыли пароль?
                        </button>
                    </div>
                    <div class="btn-wrapper">
                        <button class="form__footer-link" @click.prevent="toggleModal('register')">
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </form>
        </template>
    </ModalComponent>
</template>

<script setup>
import { ref, onUnmounted, reactive, computed, watch } from 'vue'
import ModalComponent from '../ModalComponent.vue'
import BtnComponent from '../../btns/BtnComponent.vue'
import ModalHeader from '../ModalHeader.vue'
import { useUserStore } from '../../../stores/userStore'
import { useRouter } from 'vue-router'

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
const emit = defineEmits(['change-modal'])
const router = useRouter()
const getError = computed(() => userStore.getError)
const getIsSuccess = computed(() => userStore.getIsSuccess)

const inputData = reactive({
    email: '',
    password: ''
})
const isCheckboxActive = ref(false)
const passwordVisible = reactive({
    password: true
})

const toggleModal = (value) => {
    emit('change-modal', value)
}

function changeVisiblePassword(field) {
    passwordVisible[field] = !passwordVisible[field]
}

function toggleCheckbox() {
    isCheckboxActive.value = !isCheckboxActive.value
}

function login() {
    userStore.login(
        { ...inputData, time_token: isCheckboxActive.value ? 'long' : 'short' },
        isCheckboxActive.value
    )
}

watch(getIsSuccess, (val) => {
    if (val === true) {
        props.close()
        router.push('/')
        userStore.setIsSuccess()
    }
})

onUnmounted(() => {
    inputData.email = ''
    inputData.password = ''
    isCheckboxActive.value = false
    userStore.setErrors()
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
        color: $red;
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
        border-color: $red;
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
</style>
