<template>
    <ModalComponent :visible="isModalVisible" @close="closeModal">
        <template #header>
            <ModalHeader @closeModal="closeModal">
                Регистрируйся и получи доступ к витрине кейсов
            </ModalHeader>
        </template>
        <template #form v-if="!isLogin">
            <form @submit.prevent="register" class="form__wrapper">
                <div class="form__group">
                    <label for="email" class="form__label">E-mail</label>
                    <input id="email" class="form__input" placeholder="marina_ivanova@mail.ru" v-model="email" />
                </div>
                <div class="form__group">
                    <label for="password" class="form__label">Придумайте пароль</label>
                    <input id="password" class="form__input" placeholder="пароль" v-model="password" />
                </div>
                <div class="form__group">
                    <label for="repeat-pass" class="form__label">Повторите пароль</label>
                    <input id="repeat-pass" class="form__input" placeholder="повторите пароль" v-model="repeatPassword" />
                </div>
                <div class="form__links">
                    <p class="form__text">
                        Нажимая кнопку, я соглашаюсь с
                        <span>Политикой обработки персональных данных.</span>
                    </p>
                    <BtnComponent class="form__btn" @click="register">
                        Зарегистрироваться
                    </BtnComponent>
                </div>
                <div class="form__footer">
                    <p class="form__footer-text">Уже есть аккаунт?</p>
                    <div class="btn-wrapper">
                        <button class="form__footer-link" @click.prevent="switchToLogin">
                            Войти
                        </button>
                    </div>
                </div>
            </form>
        </template>
        <template #form v-else>
            <form @submit.prevent="login" class="form__wrapper">
                <div class="form__group">
                    <label for="email" class="form__label">E-mail</label>
                    <input id="email" class="form__input" v-model="email" />
                </div>
                <div class="form__group">
                    <label for="password" class="form__label">Пароль</label>
                    <input id="password" class="form__input" v-model="password" />
                </div>
                <div class="form__login">
                    <BtnComponent @click="login">Войти</BtnComponent>
                </div>
                <div class="form__footer">
                    <div class="btn-wrapper">
                        <button class="form__footer-link" @click.prevent="resetPassword">
                            Забыли пароль?
                        </button>
                    </div>
                    <div class="btn-wrapper">
                        <button class="form__footer-link" @click.prevent="switchToRegister">
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </form>
        </template>
    </ModalComponent>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ModalComponent from '../ModalComponent.vue'
import BtnComponent from '../../btns/BtnComponent.vue'
import ModalHeader from '../ModalHeader.vue'

const props = defineProps({
    isModalVisible: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const isLogin = ref(false)

function closeModal() {
    emit('close')
}

function switchToLogin() {
    isLogin.value = true
}

function switchToRegister() {
    isLogin.value = false
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeModal()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey)
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
    background: #656d75;
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
    color: #fff;
}
.form__input {
    border: 2px solid #656d75;
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    background: #fff;
    color: #656d75;
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
    color: #0e0806;

    & span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        text-decoration: underline;
        text-decoration-skip-ink: none;
        text-align: center;
        color: #0e0806;
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
    color: #fff;
}
.form__footer-link {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: #fff;
    border-bottom: 1px solid #fff;
}
.btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
