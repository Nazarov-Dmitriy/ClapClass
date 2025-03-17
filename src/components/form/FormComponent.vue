<template>
    <div class="form">
        <div class="form__container container">
            <h2 class="form__hero-title form__hero-title--mobile">Остались вопросы?</h2>
            <div class="form__wrapper" :class="{ success: getIsSuccess }">
                <div class="form__hero">
                    <h2 class="form__hero-title">Остались вопросы?</h2>
                    <div class="form__hero-img-wrapper">
                        <img
                            class="form__hero-question-img"
                            src="../../assets/images/form/form-question-img.png"
                            alt=""
                        />
                        <img
                            class="form__hero-question-img form__hero-question-img--center"
                            src="../../assets/images/form/form-question-img.png"
                            alt=""
                        />
                        <img
                            class="form__hero-question-img form__hero-question-img--right"
                            src="../../assets/images/form/form-question-img.png"
                            alt=""
                        />
                        <img
                            src="../../assets/images/form/form-hero-img.png"
                            alt=""
                            class="form__hero-img"
                        />
                    </div>
                </div>
                <div class="form__info">
                    <div v-if="getIsSuccess" class="form__success">
                        <h2 class="form__success-title">Сообщение отправлено</h2>
                    </div>
                    <form
                        v-if="!getIsSuccess"
                        class="form__form"
                        @submit.prevent
                        @keypress.enter.prevent="validateForm"
                    >
                        <div class="form__fields">
                            <label
                                for="name"
                                class="form__label"
                                :class="{ form__error: formField.nameError }"
                            >
                                Как вас зовут?
                            </label>
                            <input
                                id="name"
                                v-model="formField.name"
                                type="text"
                                class="form__input form__input--name"
                                :class="{ 'form__input--error': formField.nameError }"
                                placeholder="Мария Ивановна"
                                @keypress.enter="validateField($event, 'event', 'name')"
                            />
                            <span v-if="formField.nameError" class="form__error">
                                <div class="form__error-wrapper">
                                    <img src="../../assets/images/form/form-error-svg.svg" alt="" />
                                    <span>Поле заполнено некорректно</span>
                                </div>
                            </span>

                            <div class="form__form-input-wrapper">
                                <label for="phone" class="form__label">
                                    <span :class="{ form__error: formField.phoneError }"
                                    >Телефон</span
                                    >
                                    <input
                                        id="phone"
                                        v-model="formField.phone"
                                        type="text"
                                        class="form__input form__input--phone"
                                        :class="{ 'form__input--error': formField.phoneError }"
                                        placeholder="+7 (912) 234-56-78"
                                        @input="changePhone($event)"
                                        @keypress.enter="validateField($event, 'event', 'phone')"
                                    />
                                    <span v-if="formField.phoneError" class="form__error">
                                        <div class="form__error-wrapper">
                                            <img
                                                src="../../assets/images/form/form-error-svg.svg"
                                                alt=""
                                            />
                                            <span>Поле заполнено некорректно</span>
                                        </div>
                                    </span>
                                </label>

                                <label
                                    for="email"
                                    class="form__label"
                                    :class="{ form__error: formField.emailError }"
                                >
                                    <span :class="{ form__error: formField.emailError }"
                                    >E-mail</span
                                    >
                                    <input
                                        id="email"
                                        v-model="formField.email"
                                        type="text"
                                        class="form__input form__input--email"
                                        :class="{ 'form__input--error': formField.emailError }"
                                        placeholder="marina_ivanova@mail.ru"
                                        @input="changeEmail($event)"
                                        @keypress.enter="validateField($event, 'event', 'email')"
                                    />
                                    <span v-if="formField.emailError" class="form__error">
                                        <div class="form__error-wrapper">
                                            <img
                                                src="../../assets/images/form/form-error-svg.svg"
                                                alt=""
                                            />
                                            <span>Поле заполнено некорректно</span>
                                        </div>
                                    </span>
                                </label>
                            </div>
                            <label
                                for="question"
                                class="form__label"
                                :class="{ form__error: formField.textareaError }"
                            >
                                Вопрос
                            </label>
                            <textarea
                                id="question"
                                v-model="formField.textarea"
                                cols="30"
                                rows="10"
                                class="form__textarea"
                                :class="{ 'form__textarea--error': formField.textareaError }"
                                placeholder="Напишите ваш вопрос"
                                @input="changeTextarea($event)"
                            ></textarea>
                            <span
                                v-if="formField.textareaError"
                                class="form__error form__error--textarea"
                            >
                                <div class="form__error-wrapper">
                                    <img src="../../assets/images/form/form-error-svg.svg" alt="" />
                                    <span>Поле заполнено некорректно</span>
                                </div>
                            </span>
                        </div>

                        <div class="form__form-wrapper">
                            <div class="form__btn-wrapper">
                                <BtnComponent
                                    class="form__btn"
                                    type="submit"
                                    emit-name="form-submit"
                                    @form-submit="validateForm()"
                                >
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
import { computed, onMounted, reactive, watch } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import { useSendMessageStore } from '@/stores/sendMessageStore'

const sendMessageStore = useSendMessageStore()

const getIsSuccess = computed(() => sendMessageStore.getIsSuccess)

const formField = reactive({
    name: '',
    phone: '',
    email: '',
    textarea: '',
    nameError: false,
    phoneError: false,
    emailError: false,
    textareaError: false
})

onMounted(() => {
    sendMessageStore.setIsSuccess(null)
})

function validateField(param, event, nameParam) {
    let target
    if (event === 'event') {
        target = param.target.value.trim()
    } else {
        target = param.trim()
    }

    if (nameParam === 'name') {
        formField.nameError = target.length < 3
    }
    if (nameParam === 'phone') {
        formField.phoneError = target.length < 18
    }
    if (nameParam === 'email') {
        let email_regexp =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        formField.emailError = !email_regexp.test(String(target).toLowerCase())
    }
    if (nameParam === 'textarea') {
        formField.textareaError = target.length < 3
    }
}

function changePhone(event) {
    let target = event.target
    let x = target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    x[1] = '+7'
    target.value = !x[3]
        ? x[1] + '-(' + x[2]
        : x[1] + '-(' + x[2] + ')-' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')
    formField.phone = target.value
}

function changeEmail(event) {
    let target = event.target
    let x = target.value.match(
        /([a-zA-Z0-9]{1})([a-zA-Z0-9._-]{0,19})([@]{0,1})([a-zA-Z0-9._-]{0,10})([.]{0,1})([a-zA-Z0-9._-]{0,5})/
    )
    target.value = x ? x[1] + x[2] + x[3] + x[4] + x[5] + x[6] : ''
    formField.email = target.value
}

function changeTextarea(event) {
    let target = event.target
    event.target.scrollBy(target.scrollHeight, 100)

    if (formField.textareaError && target.value.length > 1) {
        formField.textareaError = false
    }
}

function validateForm() {
    let validateFeildArr = ['name', 'phone', 'email', 'textarea']

    validateFeildArr.forEach((item) => {
        validateField(formField[item], 'validate', item)
    })

    if (
        !formField.nameError &&
        !formField.phoneError &&
        !formField.emailError &&
        !formField.textareaError
    ) {
        sendMessageStore.sendFaq({
            name: formField.name,
            phone: formField.phone,
            email: formField.email,
            question: formField.textarea
        })
    }
}

function resetForm() {
    formField.name = ''
    formField.phone = ''
    formField.email = ''
    formField.textarea = ''
}

watch(getIsSuccess, (val) => {
    if (val === true) {
        resetForm()
    }
})
</script>

<style lang="scss" scoped>
.form {
    background: $gray;
}
.form__container {
    padding: 48px 64px 0px 64px;
    box-sizing: border-box;

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
    justify-content: space-around;
    gap: 16px;

    &.success {
        display: flex;
        align-items: center;
    }
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

.form__success-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    text-align: center;
    color: $white;
    padding: 48px 48px;
    background-color: $gray;
    border-radius: 0 0 24px 24px;
    display: flex;
    align-items: flex-start;
}

.form__form {
    display: flex;
    flex-direction: column;
    gap: 40px;
    order: 2;
    margin-bottom: 40px;
    background-color: $gray;
    border-radius: 0 0 25px 25px;
    padding: 10px 15px;
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
    transition: 0.4s;
    font-size: 16px;
    font-family: 'Inter';
    color: #656d75;

    &:hover {
        background-color: #e6eaed;
    }

    &:focus {
        background-color: $white;
    }

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
    border: 2px solid $yellowy !important;
}
.form__textarea--error {
    border: 2px solid $yellowy !important;
}
.form__error {
    color: $yellowy !important;
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
    align-items: start;
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
    font-size: 16px;
    font-family: 'Inter';
    color: $gray;

    &:hover {
        background-color: #e6eaed;
    }

    &::placeholder {
        font-family: 'Inter';
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        color: $gray;
    }
    &:focus {
        outline: none;
        background-color: $white;
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
