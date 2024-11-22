<template>
    <ModalComponent
        :visible="isModalVisible"
        @close="closeModal"
    >
        <template #header>
            <ModalHeader @close-modal="closeModal">
                Регистрируйся и получи доступ к витрине кейсов
            </ModalHeader>
        </template>
        <template
            v-if="!isLogin"
            #form
        >
            <form
                class="form__wrapper"
                @submit.prevent="registerUser"
            >
                <div class="form__group">
                    <label
                        for="email"
                        class="form__label"
                    >E-mail</label>
                    <input
                        id="email"
                        v-model="inputData.email"
                        class="form__input"
                        placeholder="marina_ivanova@mail.ru"
                    >
                </div>
                <div class="form__group">
                    <label
                        for="password"
                        class="form__label"
                    >Придумайте пароль</label>
                    <input
                        id="password"
                        v-model="inputData.password"
                        class="form__input"
                        placeholder="пароль"
                    >
                </div>
                <div class="form__group">
                    <label
                        for="repeat-pass"
                        class="form__label"
                    >Повторите пароль</label>
                    <input
                        id="repeat-pass"
                        v-model="inputData.repeatPassword"
                        class="form__input"
                        placeholder="повторите пароль"
                    >
                </div>
                <div class="form__links">
                    <p class="form__text">
                        Нажимая кнопку, я соглашаюсь с
                        <span>Политикой обработки персональных данных.</span>
                    </p>
                    <BtnComponent
                        class="form__btn"
                        @click="registerUser"
                    >
                        Зарегистрироваться
                    </BtnComponent>
                </div>
                <div class="form__footer">
                    <p class="form__footer-text">
                        Уже есть аккаунт?
                    </p>
                    <div class="btn-wrapper">
                        <button
                            class="form__footer-link"
                            @click.prevent="switchToLogin"
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </form>
        </template>
        <template
            v-else
            #form
        >
            <form
                class="form__wrapper"
                @submit.prevent="login"
            >
                <div class="form__group">
                    <label
                        for="email"
                        class="form__label"
                    >E-mail</label>
                    <input
                        id="email"
                        v-model="inputData.email"
                        placeholder="marina_ivanova@mail.ru"
                        class="form__input"
                    >
                </div>
                <div class="form__group">
                    <label
                        for="password"
                        class="form__label"
                    >Пароль</label>
                    <input
                        id="password"
                        v-model="inputData.password"
                        placeholder="Введите пароль"
                        class="form__input"
                    >
                </div>
                <div class="form__login flex justify-between items-center">
                    <div class="flex gap-2">
                        <img
                            v-if="isCheckboxActive"
                            src="/public/icons/auth/checkboxes/checkbox-empty.svg"
                            alt=""
                            @click="toggleCheckbox"
                        >
                        <div
                            v-else
                            class="checkbox-filled flex justify-center items-center bg-[#fff7ac]"
                            @click="toggleCheckbox"
                        >
                            <img
                                src="/public/icons/auth/checkboxes/checkbox-filled.svg"
                                alt=""
                            >
                        </div>

                        <span
                            class="checkbox-label"
                            @click="toggleCheckbox"
                        >Запомнить меня</span>
                    </div>
                    <BtnComponent @click="login">
                        Войти
                    </BtnComponent>
                </div>
                <div class="form__footer">
                    <div class="btn-wrapper">
                        <button
                            class="form__footer-link"
                            @click="showForgotPassword"
                        >
                            Забыли пароль?
                        </button>
                    </div>
                    <div class="btn-wrapper">
                        <button
                            class="form__footer-link"
                            @click.prevent="switchToRegister"
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </form>
        </template>
    </ModalComponent>
    <ModalComponent
        :visible="forgotPassword"
        @close="closeModal"
    >
        <template #header>
            <ModalHeader @close-modal="closeModal">
                Восстановление пароля
                <template #subtitle>
                    <p class="forgot-subtitle text-center">
                        Введите e-mail указанный при регистрации и мы отправим на него инструкцию
                    </p>
                </template>
            </ModalHeader>
            <form
                class="form__wrapper"
                @submit.prevent="registerUser"
            >
                <div class="form__group">
                    <input
                        id="email"
                        v-model="inputData.email"
                        placeholder="marina_ivanova@mail.ru"
                        class="form__input"
                    >
                </div>
                <BtnComponent class="mx-auto">
                    Войти
                </BtnComponent>
            </form>
        </template>
    </ModalComponent>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'
import ModalComponent from '../ModalComponent.vue'
import BtnComponent from '../../btns/BtnComponent.vue'
import ModalHeader from '../ModalHeader.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../stores/userStore'

const props = defineProps({
    isModalVisible: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['close'])
const router = useRouter()
const userStore = useUserStore()

const forgotPassword = ref(false)

// переменные для авторизации, регистрации, пароля
const isLogin = ref(false)
const inputData = reactive({
    email: '',
    password: '',
    repeatPassword: ''
})

const user = computed(() => userStore.getUser)
const isCheckboxActive = ref(false)

function closeModal () {
    forgotPassword.value = false
    emit('close')
}

function toggleCheckbox () {
    isCheckboxActive.value = !isCheckboxActive.value
}

// логика переключения модальных окон
function switchToLogin () {
    isLogin.value = true
}

function switchToRegister () {
    isLogin.value = false
}

function showForgotPassword () {
    isLogin.value = false
    forgotPassword.value = true
    emit('close')
}

function handleEscapeKey (event) {
    if (event.key === 'Escape') {
        closeModal()
    }
}

// логика регистрации и авторизации пользователя
async function registerUser () {
    try {
        const status = await new Promise((resolve) => {
            userStore.registerUser({ ...inputData }, resolve)
        })
        if (status === 201) {
            router.push('/')
        } else {
            console.error(`Ошибка регистрации: статус ${status}`)
        }
    } catch (error) {
        console.error('Ошибка регистрации:', error)
    }
}

function login () {
    userStore.login({ email: inputData.email, password: inputData.password })
    if (user.value) {
        router.push('/')
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey)
    userStore.fetchUser()
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey)
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
}
.form__label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: $white;
}
.form__input {
    border: 2px solid $gray;
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    background: #fff;
    color: $gray;
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

    & span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        text-decoration: underline;
        text-decoration-skip-ink: none;
        text-align: center;
        color: $black;
    }
}
.form__btn {
    margin: 0 auto;
}
.form__footer {
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
