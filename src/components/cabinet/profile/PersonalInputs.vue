<template>
    <div class="lk__main-personal--inputs">
        <form @submit.prevent="validateForm">
            <div class="grid grid-cols-2 gap-6 item-center">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="label" for="personalName" :class="errors?.name && 'error'"
                            >ФИО</label
                        >
                        <input
                            id="personalName"
                            v-model="form.name"
                            type="text"
                            placeholder="Введите ФИО"
                            class="lk__main-personal-input"
                            :class="errors?.name && 'error'"
                        />
                        <p v-if="errors.name" class="error-text">
                            {{ errors.name }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="label" for="phone" :class="errors?.phone && 'error'"
                            >Телефон</label
                        >
                        <input
                            id="phone"
                            v-model.trim="form.phone"
                            type="text"
                            placeholder="+7 (___) ___-__-__"
                            class="lk__main-personal-input"
                            :class="errors?.phone && 'error'"
                            @input="onPhoneInput"
                        />
                        <p v-if="errors.phone" class="error-text">
                            {{ errors.phone }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="label" for="personalEmail" :class="errors?.email && 'error'"
                            >email*</label
                        >
                        <input
                            id="personalEmail"
                            v-model="form.email"
                            type="text"
                            placeholder="maria@mail.ru"
                            class="lk__main-personal-input"
                            :class="errors?.email && 'error'"
                        />
                        <p v-if="errors.email" class="error-text">2 {{ errors.email }}</p>
                    </div>
                </div>

                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="label" for="city" :class="errors?.city && 'error'"
                            >Город</label
                        >
                        <input
                            id="city"
                            v-model="form.city"
                            type="text"
                            placeholder="Выберите город"
                            class="lk__main-personal-input"
                            :class="errors?.city && 'error'"
                        />
                        <p v-if="errors.city" class="error-text">
                            {{ errors.city }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="label" for="work-place" :class="errors?.place_work && 'error'"
                            >Место работы</label
                        >
                        <input
                            id="work-place"
                            v-model="form.place_work"
                            type="text"
                            placeholder="Введите место работы"
                            class="lk__main-personal-input"
                            :class="errors?.place_work && 'error'"
                        />
                        <p v-if="errors.place_work" class="error-text">
                            {{ errors.place_work }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="label" for="position" :class="errors?.position && 'error'"
                            >Должность</label
                        >
                        <input
                            id="position"
                            v-model="form.position"
                            type="text"
                            placeholder="Введите вашу должность"
                            class="lk__main-personal-input"
                            :class="errors?.position && 'error'"
                        />
                        <p v-if="errors.position" class="error-text">
                            {{ errors.position }}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/userStore'
import { reactive, computed, watch } from 'vue'

const userStore = useUserStore()

const getUser = computed(() => {
    return userStore.getUser
})

const form = reactive({
    name: getUser.value?.name,
    phone: getUser.value?.phone,
    email: getUser.value?.email,
    city: getUser.value?.city,
    place_work: getUser.value?.place_work,
    position: getUser.value?.position
})

const errors = reactive({
    name: '',
    phone: '',
    email: '',
    city: '',
    place_work: '',
    position: ''
})

const isFormValid = computed(() => {
    return Object.values(errors).every((error) => error === '')
})

function validateForm() {
    validateField('email')
    validateField('name')
    validateField('phone')
    validateField('city')
    validateField('place_work')
    validateField('position')

    if (isFormValid.value) {
        userStore.updateUserInfo({ ...form, current_email: getUser.value.email })
    }
}

function validateField(field) {
    const value = form[field]

    switch (field) {
        case 'name':
            errors.name = value.length === 0 ? 'Это поле обязательно' : ''
            break
        case 'phone':
            // eslint-disable-next-line no-case-declarations
            const phoneRegexp = /^\+7 \(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
            errors.phone = !phoneRegexp.test(value) ? 'Неверный формат телефона' : ''
            break
        case 'email':
            // eslint-disable-next-line no-case-declarations
            const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            errors.email = !emailRegexp.test(value) ? 'Неверный формат email' : ''
            break
        case 'city':
            errors.city = value.length === 0 ? 'Это поле обязательно' : ''
            break
        case 'place_work':
            errors.place_work = value.length === 0 ? 'Это поле обязательно' : ''
            break
        case 'position':
            errors.position = value.length === 0 ? 'Это поле обязательно' : ''
            break
        default:
            break
    }
}

function onPhoneInput(event) {
    const target = event.target
    const x = target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    x[1] = '+7'
    target.value = !x[3]
        ? x[1] + ' (' + x[2]
        : x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')
    form.phone = target.value
}

watch(
    getUser,
    () => {
        const user = {
            name: getUser.value?.name,
            phone: getUser.value?.phone,
            email: getUser.value?.email,
            city: getUser.value?.city,
            place_work: getUser.value?.place_work,
            position: getUser.value?.position
        }
        Object.assign(form, user)
    },
    { deep: true }
)

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
    padding: 15px 16px;
    background: $white;
    font-size: 16px;
    line-height: 24px;
    width: 100%;

    &.error {
        border: 1px solid red;
        font-size: 16px;
        line-height: 24px;
    }
}

.label {
    font-size: 16px;
    line-height: 1.5;

    &.error {
        color: red;
    }
}

.error-text {
    color: $red !important;
    font-size: 12px;
}
</style>
