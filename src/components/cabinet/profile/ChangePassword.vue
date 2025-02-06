<template>
    <div class="rounded-3xl p-4 bg-fonLight flex flex-col gap-4 h-full">
        <TitleComponent class="text-center"> Сменить пароль </TitleComponent>
        <form class="flex flex-col gap-2">
            <div class="form__group">
                <label
                    for="repeat-pass"
                    class="form__label text-gray"
                    :class="(error?.password || getError?.password) && 'error'"
                >Старый пароль</label
                >
                <div class="flex w-full relative">
                    <div class="flex w-full relative">
                        <input
                            id="repeat-pass"
                            v-model="inputData.password"
                            :type="!passwordVisible.password ? 'password' : 'text'"
                            class="form__input"
                            placeholder="Введите старый пароль "
                            :class="(error?.password || getError?.password) && 'error'"
                        />
                        <img
                            v-if="!passwordVisible.password"
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
                </div>
                <p v-if="error?.password || getError?.password" class="error-text">
                    {{ error?.password || getError?.password }}
                </p>
            </div>

            <div class="form__group">
                <label
                    for="repeat-pass"
                    class="form__label text-gray"
                    :class="(error?.new_password || getError?.new_password) && 'error'"
                >Новый пароль</label
                >
                <div class="flex w-full relative">
                    <div class="flex w-full relative">
                        <input
                            id="repeat-pass"
                            v-model="inputData.new_password"
                            :type="!passwordVisible.new_password ? 'password' : 'text'"
                            class="form__input"
                            placeholder="Введите новый пароль"
                            :class="(error?.new_password || getError?.new_password) && 'error'  "
                        />
                        <img
                            v-if="!passwordVisible.new_password"
                            class="input-icon"
                            src="/public/icons/auth/inputs/password-invisible.svg"
                            alt=""
                            @click="changeVisiblePassword('new_password')"
                        />
                        <img
                            v-else
                            class="input-icon"
                            src="/public/icons/auth/inputs/password-visible.svg"
                            alt=""
                            @click="changeVisiblePassword('new_password')"
                        />
                    </div>
                </div>
                <p v-if="error?.new_password || getError?.new_password" class="error-text">
                    {{ error?.new_password || getError?.new_password }}
                </p>
            </div>

            <div class="form__group">
                <label
                    for="repeat-pass"
                    class="form__label text-gray"
                    :class="error?.repeatPassword && 'error'"
                >Подтверждение пароля</label
                >
                <div class="flex w-full relative">
                    <div class="flex w-full relative">
                        <input
                            id="repeat-pass"
                            v-model="inputData.repeatPassword"
                            :type="!passwordVisible.repeatPassword ? 'password' : 'text'"
                            class="form__input"
                            placeholder="Введите новый пароль еще раз"
                            :class="error?.repeatPassword && 'error'"
                        />
                        <img
                            v-if="!passwordVisible.repeatPassword"
                            class="input-icon"
                            src="/public/icons/auth/inputs/password-invisible.svg"
                            alt=""
                            @click="changeVisiblePassword('repeatPassword')"
                        />
                        <img
                            v-else
                            class="input-icon"
                            src="/public/icons/auth/inputs/password-visible.svg"
                            alt=""
                            @click="changeVisiblePassword('repeatPassword')"
                        />
                    </div>
                </div>
                <p v-if="error?.repeatPassword" class="error-text">{{ error?.repeatPassword }}</p>
            </div>
        </form>
        <BtnComponentOrange
            class="text-center max-w-[220px] mx-auto"
            emit-name="action"
            @action="setPassword()"
        >
            Сохранить пароль
        </BtnComponentOrange>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import BtnComponentOrange from '../../btns/BtnComponentOrange.vue'
import TitleComponent from '../../ui/TitleComponent.vue'
import { computed, reactive, watch } from 'vue'
const userStore = useUserStore()
const getIsSuccess = computed(() => userStore.getIsSuccess)
const getError = computed(() => userStore.getError)
const inputData = reactive({
    password: '',
    new_password: '',
    repeatPassword: ''
})

const passwordVisible = reactive({
    password: false,
    new_password: false,
    repeatPassword: false
})

const error = reactive({
    password: '',
    new_password: '',
    repeatPassword: ''
})

function changeVisiblePassword(field) {
    passwordVisible[field] = !passwordVisible[field]
}

const isFormValid = computed(() => {
    return Object.values(error).every((error) => error === '')
})

const setPassword = () => {
    validateField('password')
    validateField('new_password')
    validateField('repeatPassword')
    if (isFormValid.value) {
        userStore.changePassword({
            password: inputData.password,
            new_password: inputData.new_password
        })
    }
}

function validateField(field) {
    const value = inputData[field]

    switch (field) {
        case 'password':
            error.password = value.length === 0 ? 'Это поле обязательно' : ''
            break
        case 'new_password':
            error.new_password = value.length === 0 ? 'Это поле обязательно' : ''
            break
        case 'repeatPassword':
            error.repeatPassword = value.length === 0 ? 'Это поле обязательно' : ''
            if (!!inputData.new_password || !!inputData.repeatPassword)
                error.repeatPassword =
                    inputData.new_password !== inputData.repeatPassword ? 'Пароли не совпадают' : ''
            break
        default:
            break
    }
}

watch(getIsSuccess, (val) => {
    if (val === 'changePassword') {
        inputData.password = ''
        inputData.new_password = ''
        inputData.repeatPassword = ''
    }
})
</script>

<style lang="scss" scoped>
.form__group {
    display: grid;
    gap: 8px;
    position: relative;
}
.form__label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;

    &.error {
        color: $red;
    }
}

.error-text {
    color: $red !important;
}

.form__input {
    border: 2px solid transparent;
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
</style>
