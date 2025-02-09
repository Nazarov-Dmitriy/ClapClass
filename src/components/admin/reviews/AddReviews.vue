<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <LabelField for="author" :error="getErrors?.author">Автор </LabelField>
                <InputField
                    v-model="reviews.author"
                    input-id="author"
                    placeholder="Иванов Михаил Дмитриевич"
                    type="text"
                    :error="getErrors?.author"
                    :error-text="getErrors?.author || 'Обязательное поле'"
                ></InputField>
            </div>
            <div class="flex flex-col gap-2">
                <LabelField for="description" :error="getErrors?.description">Отзыв </LabelField>
                <TextareaField
                    v-model="reviews.description"
                    input-id="author"
                    placeholder="Отзыв"
                    type="text"
                    :error="getErrors?.author"
                    :error-text="getErrors?.author || 'Обязательное поле'"
                ></TextareaField>
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <LabelField for="date" :error="getErrors?.date">Дата </LabelField>
                <VueDatePicker
                    id="date"
                    v-model="reviews.date"
                    placeholder="дд.мм.гггг"
                    locale="ru"
                    class="data-picker"
                    select-text="Выбрать"
                    cancel-text="Закрыть"
                    :enable-time-picker="false"
                    auto-apply
                    model-type="yyyy-MM-dd"
                    :class="{ error: getErrors?.date }"
                    format="dd.MM.yyyy"
                ></VueDatePicker>
                <p v-if="getErrors?.date" class="error-text">Поле не должно быть пустым</p>
            </div>
        </div>
        <FileField
            label="Фаил"
            :accept-material="'image/*'"
            :error="getErrors?.file ||  reviewsError.file"
            :error-text="getErrors?.file || 'Обязательное поле'"
            :file-name="reviews?.file"
            @file-change="fileChange"
        ></FileField>
    
        <BtnComponent emit-name="action" class="w-fit" @action="save"> Сохранить </BtnComponent>
    </div>
</template>
<script setup>
import BtnComponent from '@/components/btns/BtnComponent.vue'
import FileField from '@/components/ui/form/file/FileField.vue'
import InputField from '@/components/ui/form/input/InputField.vue'
import LabelField from '@/components/ui/form/label/LabelField.vue'
import TextareaField from '@/components/ui/form/textarea/TextareaField.vue'
import { useReviewsStore } from '@/stores/reviewsStore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, reactive,  watch } from 'vue'

const reviewsStore = useReviewsStore()

const getSuccses = computed(() => {
    return reviewsStore.getSuccess
})

const getErrors = computed(() => {
    return reviewsStore.getErrors
})

const reviews = reactive({
    description: null,
    date: null,
    author: null,
    file: null
})

const reviewsError = reactive({
    file: null,
    date: null
})

function save() {
    const data = new FormData()
    for (const key in reviews) {
        if (reviews[key] === null) {
            data.append(key, '')
        } else {
            data.append(key, reviews[key])
        }
    }
    reviewsStore.addReviews(data)
    validate()
}

function fileChange(file) {
    reviews.file = file
}

function validate() {
    !reviews.file ? (reviewsError.file = true) : (reviewsError.file = false)
}


watch(getSuccses, () => {
    for (let key in reviews) {
        reviews[key] = null
    }
})
</script>

<style lang="scss" scoped>
.error-text {
    color: $red !important;
}

.data-picker {
    --dp-input-padding: 10px 16px;
    --dp-border-radius: 32px;
    --dp-border-color: none;
    --dp-font-size: 16px;
    --dp-text-color: $black;
    --dp-icon-color: $black;
    --dp-menu-min-width: 300px;
    --dp-action-row-padding: 12px 20px;

    :deep(.dp__input_wrap) {
        &:hover,
        &:active,
        &:focus {
            border: 2px solid $gray;
        }
    }

    :deep(.dp__pointer) {
        height: 48px;
    }

    &.error {
        :deep(.dp__input_wrap) {
            border: 2px solid red;
            border-radius: 32px;
        }
    }

    :deep(.dp__input_wrap) {
        border: 2px solid $gray;
        border-radius: 32px;
    }
}
</style>
