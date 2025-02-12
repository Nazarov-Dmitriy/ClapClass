<template>
    <div class="form__info">
        <div v-if="formField.success" class="form__success">
            <h2 class="form__success-title">Сообщение отправлено</h2>
        </div>
        <form
            v-if="!formField.success"
            @submit.prevent="handleSubmit"
            @keypress.enter.prevent="validateForm"
            class="form__form"
        >
            <div class="form__fields">
                <label for="username" class="form__label" :class="{ form__error: formField.nameError }">
                    Как вас зовут?
                </label>
                <input
                    type="text"
                    id="username"
                    class="form__input form__input--name"
                    :class="{ 'form__input--error': formField.nameError }"
                    v-model="formField.name"
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
                        <span :class="{ form__error: formField.phoneError }">Телефон</span>

                        <input
                            type="text"
                            id="phone"
                            class="form__input form__input--phone"
                            :class="{ 'form__input--error': formField.phoneError }"
                            v-model="formField.phone"
                            placeholder="+7 (912) 234-56-78"
                            @input="changePhone($event)"
                            @keypress.enter="validateField($event, 'event', 'phone')"
                        />
                        <span v-if="formField.phoneError" class="form__error">
                            <div class="form__error-wrapper">
                                <img src="../../assets/images/form/form-error-svg.svg" alt="" />
                                <span>Поле заполнено некорректно</span>
                            </div>
                        </span>
                    </label>

                    <label
                        for="fieldEmail"
                        class="form__label"
                        :class="{ form__error: formField.emailError }"
                    >
                        <span :class="{ form__error: formField.phoneError }">E-mail</span>
                        <input
                            type="text"
                            id="fieldEmail"
                            class="form__input form__input--email"
                            :class="{ 'form__input--error': formField.emailError }"
                            v-model="formField.email"
                            placeholder="marina_ivanova@mail.ru"
                            @input="changeEmail($event)"
                            @keypress.enter="validateField($event, 'event', 'email')"
                        />
                        <span v-if="formField.emailError" class="form__error">
                            <div class="form__error-wrapper">
                                <img src="../../assets/images/form/form-error-svg.svg" alt="" />
                                <span>Поле заполнено некорректно</span>
                            </div>
                        </span>
                    </label>
                </div>

                <!-- Added Message Field -->
                <label
                    for="message"
                    class="form__label"
                    :class="{ form__error: formField.messageError }"
                >
                    Ваше сообщение
                </label>
                <input
                    type="text"
                    id="message"
                    class="form__input form__input--message"
                    :class="{ 'form__input--error': formField.messageError }"
                    v-model="formField.message"
                    placeholder="Введите тему сообщения"
                    @input="changeMessage($event)"
                    @keypress.enter="validateField($event, 'event', 'message')"
                />
                <span v-if="formField.messageError" class="form__error">
                    <div class="form__error-wrapper">
                        <img src="../../assets/images/form/form-error-svg.svg" alt="" />
                        <span>Поле заполнено некорректно</span>
                    </div>
                </span>

                <textarea
                    id="question"
                    cols="30"
                    rows="10"
                    class="form__textarea"
                    :class="{ 'form__textarea--error': formField.textareaError }"
                    v-model="formField.textarea"
                    placeholder="Введите ваше сообщение"
                    @input="changeTextarea($event)"
                ></textarea>
                <span v-if="formField.textareaError" class="form__error form__error--textarea">
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
</template>
<script setup>
import { reactive } from 'vue'
import BtnComponent from '../btns/BtnComponent.vue'

const formField = reactive({
    name: '',
    phone: '',
    email: '',
    message: '', // Added field
    textarea: '',
    nameError: false,
    phoneError: false,
    emailError: false,
    messageError: false, // Added field
    textareaError: false,
    success: false
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
    if (nameParam === 'message') {
        formField.messageError = target.length < 3
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
        /([a-zA-Z]{1})([a-zA-Z0-9._-]{0,19})([@]{0,1})([a-zA-Z0-9._-]{0,10})([.]{0,1})([a-zA-Z0-9._-]{0,5})/
    )
    target.value = x ? x[1] + x[2] + x[3] + x[4] + x[5] + x[6] : ''
    formField.email = target.value
}

function changeMessage(event) {
    let target = event.target
    formField.message = target.value

    if (formField.messageError && target.value.length >= 3) {
        formField.messageError = false
    }
}

function changeTextarea(event) {
    let target = event.target
    event.target.scrollBy(target.scrollHeight, 100)

    if (formField.textareaError && target.value.length > 3) {
        formField.textareaError = false
    }
}

function validateForm() {
    let validateFieldArr = ['name', 'phone', 'email', 'message', 'textarea']

    validateFieldArr.forEach((item) => {
        validateField(formField[item], 'validate', item)
    })

    if (
        !formField.nameError &&
        !formField.phoneError &&
        !formField.emailError &&
        !formField.messageError &&
        !formField.textareaError
    ) {
        formField.success = true
        resetForm()
    }
}

function resetForm() {
    formField.name = ''
    formField.phone = ''
    formField.email = ''
    formField.message = ''
    formField.textarea = ''
}

function handleSubmit() {
    validateForm()
}
</script>

<style lang="scss" scoped>
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
