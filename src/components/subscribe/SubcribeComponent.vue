<template>
    <div class="subscribe">
        <div class="subscribe__img-container">
            <img
                class="subscribe__slogan"
                src="../../assets/images/article/slogan.png"
                alt="slogan"
            />
            <img
                class="subscribe__slogan-mobile"
                src="../../assets/images/article/slogan-mobile.png"
                alt="slogan"
            />
            <img class="subscribe__hero" src="../../assets/images/article/hero.png" alt="hero" />
            <img
                class="subscribe__hero-mobile"
                src="../../assets/images/article/hero-mobile.png"
                alt="hero"
            />
        </div>
        <form v-if="!subscribe" class="subscribe__form" @submit.prevent @keypress.enter.prevent>
            <div class="subscribe__group" :class="{ error: formField.emailError }">
                <input
                    v-model="formField.email"
                    class="subscribe__input"
                    type="text"
                    placeholder="Введите ваш email"
                    @input="changeEmail($event)"
                    @keypress.enter="validateField($event, 'event')"
                />
                <div v-if="formField.emailError" class="input-error">
                    <img src="../../assets/images/main/news/news-error-icon.svg" alt="" />
                    <span class="text-error">Поле заполненно некорректно</span>
                </div>
            </div>
            <div class="subscribe__info">
                <BtnComponentWhite
                    emit-name="subscribe"
                    class="subscribe__btn"
                    :color="subscribe__btn"
                    @subscribe="addSubscribe()"
                >
                    <span>Подписаться</span>
                </BtnComponentWhite>
                <p class="subscribe__text">
                    Нажимая кнопку “Подписаться” вы соглашаетесь с
                    <span
                    ><a class="subscribe__text-link" href="#"
                    >политикой обработки персональных данных</a
                    ></span
                    >
                </p>
            </div>
        </form>
        <div
            v-else
            class="subscribe__form flex items-center justify-center h-full -mt-2 min-h-[200px]"
        >
            <p class="subscribe__card-text">Вы уже подписаны</p>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive, ref, watch } from 'vue'
import BtnComponentWhite from '../btns/BtnComponentWhite.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const getUser = computed(() => {
    return userStore.getUser
})

const isSuccess = computed(() => {
    return userStore.isSuccess
})

const subscribe = ref(false)

const formField = reactive({
    email: '',
    emailError: false
})

function addSubscribe() {
    validateField(formField.email, 'validate')
    if (!formField.emailError) {
        userStore.addSubscribe({ email: formField.email })
        formField.email = ''
    }
}

function validateField(param, event) {
    let target
    if (event === 'event') {
        target = param.target.value.trim()
    } else {
        target = param.trim()
    }
    let email_regexp =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    !email_regexp.test(String(target).toLowerCase())
        ? (formField.emailError = true)
        : (formField.emailError = false)
}

function changeEmail(event) {
    let target = event.target
    let x = target.value.match(
        /([a-zA-Z]{1})([a-zA-Z0-9._-]{0,19})([@]{0,1})([a-zA-Z0-9._-]{0,10})([.]{0,1})([a-zA-Z0-9._-]{0,5})/
    )
    target.value = x ? x[1] + x[2] + x[3] + x[4] + x[5] + x[6] : ''
    formField.email = target.value
}

watch(
    getUser,
    () => {
        subscribe.value = getUser.value.subscribe
    },
    { deep: true }
)

watch(isSuccess, () => {
    subscribe.value = true
})
</script>
<style lang="scss" scoped>
.subscribe {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.subscribe__img-container {
    width: 100%;

    @media (max-width: $xl) {
        display: flex;
        justify-content: center;
        gap: 24px;
    }
}

.subscribe__slogan {
    position: absolute;
    top: 0;
    left: 0;
    width: 229px;
    height: 156px;

    &-mobile {
        display: none;
    }

    @media (max-width: $xl) {
        position: relative;
        width: 229px;
        height: 156px;
        flex-shrink: 0;
        display: block;
    }

    @media (max-width: $sm) {
        display: none;

        &-mobile {
            position: absolute;
            top: 0;
            transform: translatex(-50%);
            left: 50%;
            display: block;
        }
    }
}

.subscribe__hero {
    margin: 140px auto 0 auto;
    width: 315px;
    height: 211px;
    display: block;

    &-mobile {
        display: none;
    }

    @media (max-width: $xl) {
        min-width: 200px;
        margin: 0;
        max-width: 315px;
        max-height: 211px;
        width: 100%;
        height: auto;
        flex-shrink: 1;
        display: block;
    }

    @media (max-width: $sm) {
        display: none;

        &-mobile {
            margin-top: 108px;
            width: 100%;
            display: block;
        }
    }
}

.subscribe__form {
    background: $gray;
    border-radius: 24px;
    padding: 32px 16px;
    gap: 36px;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0px 16px 4px 0 rgba(14, 8, 6, 0.25);
}

.subscribe__group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .input-error {
        margin-top: 0;
    }

    &.error {
        .subscribe__input {
            outline: 2px solid $orange;
        }
    }
}

.subscribe__input {
    border-radius: 24px;
    background: $white;
    color: $gray;
    padding: 16px;
    border: none;
    font-size: 16px;
    line-height: 1.5;
}

.subscribe__info {
    display: flex;
    flex-direction: column;
    gap: 36px;
    align-items: center;

    @media (max-width: $xl) {
        flex-direction: row;
        align-items: flex-start;
    }

    @media (max-width: $sm) {
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
}

.subscribe__text {
    font-size: 12px;
    line-height: 1.5;
    color: $white;
    text-align: center;
}

.subscribe__text-link {
    color: $white;
    text-decoration: underline;
}

.subscribe__card-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    color: white;
}
</style>
