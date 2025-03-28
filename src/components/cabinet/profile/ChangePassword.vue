<template>
    <div class="rounded-3xl p-4 bg-fonLight flex flex-col gap-4 h-full">
        <TitleComponent class="text-center !text-[24px]/[36px]"> Сменить пароль </TitleComponent>
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
                            :class="(error?.new_password || getError?.new_password) && 'error'"
                        />
                        <img
                            v-if="!passwordVisible.new_password"
                            class="input-icon"
                            src="/icons/auth/inputs/password-invisible.svg"
                            alt=""
                            @click="changeVisiblePassword('new_password')"
                        />
                        <img
                            v-else
                            class="input-icon"
                            src="/icons/auth/inputs/password-visible.svg"
                            alt=""
                            @click="changeVisiblePassword('new_password')"
                        />
                    </div>
                </div>
                <div class="flex gap-2">
                    <svg
                        class="w-6 h-6 shrink-0 text-gray   "
                         :class="{ 'error-text': error?.new_password || getError?.new_password }"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM12 2C6.47 2 2 6.5 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                            fill="currentColor"
                        />
                    </svg>
                    <p
                        class="text-[14px] leading-[21px] text-gray"
                        :class="{ 'error-text': error?.new_password || getError?.new_password }"
                    >
                        Пароль должен содержать не менее 8 символов, не менее 1й заглавной и
                        маленькой буквы атинского алфовита и цыфры.
                    </p>
                </div>
             
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

                <p v-if="error?.repeatPassword" class="error-text">{{ error?.repeatPassword }}</p>
            </div>
        </form>
        <BtnComponentOrange
            class="text-center max-w-[220px] mx-auto mt-auto"
            emit-name="action"
            @action="setPassword()"
        >
            Сохранить пароль
        </BtnComponentOrange>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import BtnComponentOrange from '@/components/ui/btns/BtnComponentOrange.vue'
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
