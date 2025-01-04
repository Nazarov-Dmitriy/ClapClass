<template>
    <div class="lk__main-personal--inputs">
        <form @submit.prevent="validateForm">
            <div class="grid grid-cols-2 gap-6 item-center">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label for="fcs">ФИО</label>
                        <input
                            id="fcs"
                            v-model="form.fcs"
                            type="text"
                            placeholder="Введите ФИО"
                            class="lk__main-personal-input"
                        />
                        <p v-if="errors.fcs" class="error">
                            {{ errors.fcs }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="phone">Телефон</label>
                        <input
                            id="phone"
                            v-model="form.phone"
                            type="text"
                            placeholder="+7 (___) ___-__-__"
                            class="lk__main-personal-input"
                            @input="onPhoneInput"
                        />
                        <p v-if="errors.phone" class="error">
                            {{ errors.phone }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="email">email*</label>
                        <input
                            id="email"
                            v-model="form.email"
                            type="text"
                            placeholder="maria@mail.ru"
                            class="lk__main-personal-input"
                        />
                        <p v-if="errors.email" class="error">
                            {{ errors.email }}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label for="city">Город</label>
                        <input
                            id="city"
                            v-model="form.city"
                            type="text"
                            placeholder="Выберите город"
                            class="lk__main-personal-input"
                        />
                        <p v-if="errors.city" class="error">
                            {{ errors.city }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="work-place">Место работы</label>
                        <input
                            id="work-place"
                            v-model="form.workPlace"
                            type="text"
                            placeholder="Введите место работы"
                            class="lk__main-personal-input"
                        />
                        <p v-if="errors.workPlace" class="error">
                            {{ errors.workPlace }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="post">Должность</label>
                        <input
                            id="post"
                            v-model="form.post"
                            type="text"
                            placeholder="Введите вашу должность"
                            class="lk__main-personal-input"
                        />
                        <p v-if="errors.post" class="error">
                            {{ errors.post }}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { reactive, computed } from 'vue'

const form = reactive({
    fcs: '',
    phone: '',
    email: '',
    city: '',
    workPlace: '',
    post: ''
})

const errors = reactive({
    fcs: '',
    phone: '',
    email: '',
    city: '',
    workPlace: '',
    post: ''
})

const isFormValid = computed(() => {
    return Object.values(errors).every((error) => error === '')
})

function validateForm() {
    validateField('fcs')
    validateField('phone')
    validateField('email')
    validateField('city')
    validateField('workPlace')
    validateField('post')

    if (isFormValid.value) {
        console.log('Форма отправлена:', form)
    }
}

function validateField(field) {
    const value = form[field]

    switch (field) {
        case 'fcs':
            errors.fcs = value.length === 0 ? 'Это поле обязательно' : ''
            break
        case 'phone':
            const phoneRegexp = /^\+7\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
            errors.phone = !phoneRegexp.test(value) ? 'Неверный формат телефона' : ''
            break
        case 'email':
            const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            errors.email = !emailRegexp.test(value) ? 'Неверный формат email' : ''
            break
        case 'city':
            errors.city = value.length === 0 ? 'Это поле обязательно' : ''
            break
        case 'workPlace':
            errors.workPlace = value.length === 0 ? 'Это поле обязательно' : ''
            break
        case 'post':
            errors.post = value.length === 0 ? 'Это поле обязательно' : ''
            break
        default:
            break
    }
}

function onPhoneInput(event) {
    const target = event.target
    let value = target.value.replace(/\D/g, '')
    if (value.length > 10) value = value.slice(0, 10) 
    const formattedPhone = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+7($2) $3-$4-$5')
    form.phone = formattedPhone
}
defineExpose({
    validateForm
})
</script>

<style lang="scss" scoped>
.lk__main-personal--inputs {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.lk__main-personal-input {
    border: 2px solid $fonLight;
    border-radius: 24px;
    padding: 16px;
    background: $white;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
}
.error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
}
</style>
