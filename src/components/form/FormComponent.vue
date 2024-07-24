<template>
    <div class="form">
        <div class="form__container container">
            <h2 class="form__hero-title form__hero-title--mobile">Остались вопросы?</h2>
            <div class="form__wrapper">
                <div class="form__hero">
                    <h2 class="form__hero-title">Остались вопросы?</h2>
                    <div class="form__hero-img-wrapper">
                        <img
                            class="form__hero-question-img"
                            :src="getUrl('../../assets/images/form/form-question-img.png')"
                            alt=""
                        />
                        <img
                            class="form__hero-question-img form__hero-question-img--center"
                            :src="getUrl('../../assets/images/form/form-question-img.png')"
                            alt=""
                        />
                        <img
                            class="form__hero-question-img form__hero-question-img--right"
                            :src="getUrl('../../assets/images/form/form-question-img.png')"
                            alt=""
                        />
                        <img
                            :src="getUrl('../../assets/images/form/form-hero-img.png')"
                            alt=""
                            class="form__hero-img"
                        />
                    </div>
                </div>
                <div class="form__info">
                    <form @submit.prevent="handleSubmit" class="form__form">
                        <div class="form__fields">
                            <label
                                for="name"
                                class="form__label"
                                :class="{ form__error: errors.name }"
                            >
                                Как вас зовут?
                            </label>
                            <input
                                type="text"
                                id="name"
                                class="form__input form__input--name"
                                :class="{ 'form__input--error': errors.name }"
                                v-model="form.name"
                                placeholder="Мария Ивановна"
                            />
                            <span v-if="errors.name" class="form__error">
                                <div class="form__error-wrapper">
                                    <img
                                        src="../../assets/images/main/news/news-error-icon.svg"
                                        alt=""
                                    />
                                    {{ errors.name }}
                                </div>
                            </span>

                            <div class="form__form-input-wrapper">
                                <label
                                    for="phone"
                                    class="form__label"
                                    :class="{ form__error: errors.phone }"
                                >
                                    Телефон
                                    <input
                                        type="text"
                                        id="phone"
                                        class="form__input form__input--phone"
                                        :class="{ 'form__input--error': errors.phone }"
                                        v-model="form.phone"
                                        placeholder="+7 (912) 234-56-78"
                                        @input="formatPhone"
                                    />
                                    <span v-if="errors.phone" class="form__error">
                                        <div class="form__error-wrapper">
                                            <img
                                                src="../../assets/images/main/news/news-error-icon.svg"
                                                alt=""
                                            />
                                            {{ errors.phone }}
                                        </div>
                                    </span>
                                </label>

                                <label
                                    for="email"
                                    class="form__label"
                                    :class="{ form__error: errors.email }"
                                >
                                    E-mail
                                    <input
                                        type="text"
                                        id="email"
                                        class="form__input form__input--email"
                                        :class="{ 'form__input--error': errors.email }"
                                        v-model="form.email"
                                        placeholder="marina_ivanova@mail.ru"
                                    />
                                    <span v-if="errors.email" class="form__error">
                                        <div class="form__error-wrapper">
                                            <img
                                                src="../../assets/images/main/news/news-error-icon.svg"
                                                alt=""
                                            />
                                            {{ errors.email }}
                                        </div>
                                    </span>
                                </label>
                            </div>

                            <label
                                for="question"
                                class="form__label"
                                :class="{ form__error: errors.question }"
                            >
                                Вопрос
                            </label>
                            <textarea
                                id="question"
                                cols="30"
                                rows="10"
                                class="form__textarea"
                                :class="{ 'form__textarea--error': errors.question }"
                                v-model="form.question"
                                placeholder="Напишите ваш вопрос"
                            ></textarea>
                            <span v-if="errors.question" class="form__error form__error--textarea">
                                <div class="form__error-wrapper">
                                    <img
                                        src="../../assets/images/main/news/news-error-icon.svg"
                                        alt=""
                                    />
                                    {{ errors.question }}
                                </div>
                            </span>
                        </div>

                        <div class="form__form-wrapper">
                            <div class="form__btn-wrapper">
                                <BtnComponent class="form__btn" type="submit">
                                    Отправить вопрос
                                </BtnComponent>
                            </div>
                            <span class="form__text">
                                Нажимая на кнопку вы соглашаетесь с
                                <a class="form__link" href="#">политикой конфиденциальности</a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import BtnComponent from '../btns/BtnComponent.vue'

function getUrl(url) {
    return new URL(url, import.meta.url).href
}

const form = ref({
    name: '',
    phone: '',
    email: '',
    question: ''
})

const errors = ref({
    name: null,
    phone: null,
    email: null,
    question: null
})

const validateName = () => {
    return form.value.name ? null : 'Поле заполненно некорректно'
}

const validatePhone = () => {
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
    return phonePattern.test(form.value.phone) ? null : 'Поле заполненно некорректно'
}

const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(form.value.email) ? null : 'Поле заполненно некорректно'
}

const validateQuestion = () => {
    return form.value.question ? null : 'Поле заполненно некорректно'
}

const validateForm = () => {
    errors.value.name = validateName()
    errors.value.phone = validatePhone()
    errors.value.email = validateEmail()
    errors.value.question = validateQuestion()
    return (
        !errors.value.name && !errors.value.phone && !errors.value.email && !errors.value.question
    )
}

const handleSubmit = () => {
    const isValid = validateForm()
    if (isValid) {
        form.value = {
            name: '',
            phone: '',
            email: '',
            question: ''
        }
        errors.value = {
            name: null,
            phone: null,
            email: null,
            question: null
        }
    }
}

const formatPhone = (event) => {
    let input = event.target.value.replace(/\D/g, '')
    if (input.length > 1) input = input.substring(1, 11)
    else input = ''

    let formatted = '+7'
    if (input.length > 0) {
        formatted += ' (' + input.substring(0, 3)
    }
    if (input.length >= 4) {
        formatted += ') ' + input.substring(3, 6)
    }
    if (input.length >= 7) {
        formatted += '-' + input.substring(6, 8)
    }
    if (input.length >= 9) {
        formatted += '-' + input.substring(8, 10)
    }

    form.value.phone = formatted
}
</script>

<style scoped lang="scss">
.form__container {
    padding: 48px 64px 0px 64px;
    box-sizing: border-box;
    background: $gray;

    @media (max-width: $lg) {
        padding: 48px 16px 0px 16px;
    }
    @media (max-width: $lg) {
        padding: 24px 16px 0 16px;
    }
}

.form__wrapper {
    display: flex;
    align-items: end;
    gap: 16px;
    @media (max-width: $xl) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
.form__hero {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 546px;
    max-width: 546px;
    width: 100%;
    @media (max-width: $xl) {
        order: 2;
        height: 100%;
    }
    @media (max-width: $sm) {
        display: none;
    }
}
.form__hero-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $white;
    @media (max-width: $xl) {
        display: none;
    }
    &--mobile {
        display: none;
        @media (max-width: $xl) {
            display: block;
            text-align: center;
            margin-bottom: 48px;
        }
        @media (max-width: $sm) {
            font-size: 24px;
            line-height: 1.5;
            margin-bottom: 16px;
        }
    }
}
.form__hero-img-wrapper {
    display: flex;
    flex-direction: column;
    align-items: end;
    position: relative;
}
.form__hero-question-img {
    position: absolute;
    top: 110px;
    left: 20px;
    &--center {
        top: 30px;
        left: 60%;
        transform: translate(-50%) rotate(45deg);
    }
    &--right {
        top: 260px;
        left: 85%;
        transform: translate(-50%) rotate(60deg);
    }
}
.form__hero-img {
    width: 100%;
    max-width: 654px;
    @media (max-width: $lg) {
        max-width: 604px;
    }
}
.form__form {
    display: flex;
    flex-direction: column;
    gap: 40px;
    order: 2;
    margin-bottom: 40px;
}
.form__fields {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.form__label {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    color: $white;
    width: 100%;
}
.form__input {
    border: 2px solid $gray;
    border-radius: 24px;
    padding: 16px;
    width: 100%;
    background: $white;
    box-sizing: border-box;
    position: relative;
    &--name {
        background-image: url('../../assets/images/form/form-name-svg.svg');
        background-repeat: no-repeat;
        background-position: calc(100% - 16px);
    }
    &--phone {
        background-image: url('../../assets/images/form/form-number-svg.svg');
        background-repeat: no-repeat;
        background-position: calc(100% - 16px);
        margin-top: 8px;
    }
    &--email {
        background-image: url('../../assets/images/form/form-mail-svg.svg');
        background-repeat: no-repeat;
        background-position: calc(100% - 16px);
        margin-top: 8px;
    }
}
.form__input--error {
    border: 2px solid $orange !important;
}
.form__textarea--error {
    border: 2px solid $orange !important;
}
.form__error {
    color: $orange !important;
}
.form__error-wrapper {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: max-content;
}
.form__form-input-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    @media (max-width: $sm) {
        flex-direction: column;
        gap: 8px;
    }
}
.form__form-wrapper {
    display: flex;
    align-items: center;
    gap: 36px;
    @media (max-width: $sm) {
        flex-direction: column;
        gap: 16px;
    }
}
.form__textarea {
    border: 2px solid $gray;
    border-radius: 24px;
    padding: 16px;
    width: 100%;
    background-color: $white;
    resize: none;
    box-sizing: border-box;
    &::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        color: $gray;
    }
    &:focus {
        outline: none;
    }
}
.form__btn-wrapper {
    @media (max-width: $sm) {
        width: max-content;
    }
}
.form__btn {
    width: max-content;
    @media (max-width: $sm) {
        width: 100%;
        text-align: center;
    }
}
.form__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: $black;
    @media (max-width: $sm) {
        text-align: center;
    }
}
.form__link {
    border-bottom: 1px solid $black;
    color: $black;
}
</style>
