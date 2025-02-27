<template>
    <div class="flex flex-col relative">
        <Teleport to="body">
            <ModalConfirm :show="modalShow" @remove="removeReviews" @close="toggleDialog(null)">
                <template #body> <p class="text-xl font-medium">Удалить отзыв ?</p> </template>
            </ModalConfirm>
        </Teleport>
        <Teleport to="body">
            <Loader v-if="!isLoad" />
        </Teleport>
    </div>
</template>
<script setup>
import EditSvg from '@/assets/icons/blog/edit.svg?component'
import RemoveSvg from '@/assets/icons/blog/remove.svg?component'
import { useReviewsStore } from '@/stores/reviewsStore'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ModalConfirm from '@/components/modal/ModalConfirm.vue'
import InputField from '@/components/ui/form/input/InputField.vue'
import TextareaField from '@/components/ui/form/textarea/TextareaField.vue'
import Loader from '@/components/ui/loader/Loader.vue'

const reviewsStore = useReviewsStore()
const isLoad = ref(false)
const edit = ref(null)
const modalShow = ref(false)
const removeId = ref(null)
const previewImage = ref(null)

const getReviewsList = computed(() => {
    return reviewsStore.getReviewsList
})

const getSuccess = computed(() => {
    return reviewsStore.getSuccess
})

function toggleDialog(id) {
    modalShow.value = !modalShow.value
    id ? (removeId.value = id) : (removeId.value = null)
}

function removeReviews() {
    modalShow.value = !modalShow.value
    reviewsStore.removeReviews(removeId.value)
}

const reviewsEdit = reactive({
    description: null,
    date: null,
    author: null,
    file: null
})
const editImg = ref(null)

const getPreviewPath = computed(() => {
    if (previewImage.value?.includes('base64')) {
        return previewImage.value
    }
    return null
})

onMounted(() => {
    reviewsStore.getListDb()
})

function getPath(img) {
    return import.meta.env.VITE_S3_URL + img
}
function saveReviews() {
    const data = new FormData()
    for (const key in reviewsEdit) {
        if (reviewsEdit[key] === null) {
            data.append(key, '')
        } else {
            data.append(key, reviewsEdit[key])
        }
    }
    data.append('id', edit.value)
    reviewsStore.ediReviews(data)
}

function editReviews(item) {
    let date = item.date.split('.')
    edit.value = item.id
    reviewsEdit.description = item.description
    reviewsEdit.date = `${date[2]}-${date[1]}-${date[0]}`
    reviewsEdit.author = item.author
}

function resetEditReviews() {
    edit.value = null
    previewImage.value = null
    reviewsEdit.description = null
    reviewsEdit.date = null
    reviewsEdit.author = null
    reviewsEdit.file = null
}

function editImage() {
    editImg.value.click()
}

function onFileChange(e) {
    const file = e.target.files[0]
    reviewsEdit.file = file
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            previewImage.value = e.target.result
        }
    } else {
        reviewsEdit.file = null
    }
}

watch(getReviewsList, () => {
    isLoad.value = true
})

watch(getSuccess, () => {
    resetEditReviews()
    reviewsStore.getListDb()
    isLoad.value = false
})
</script>
<style lang="scss" scoped>
.reviews-admin__cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;

    @media (max-width: $lg) {
        grid-template-columns: 100%;
    }
}
.reviews-admin__card {
    border: 2px solid $orange;
    border-radius: 32px;
    min-height: 200px;
    width: 100%;
    min-width: 0;

    @media (max-width: $sm) {
        border-radius: 32px;
    }
}
.reviews-admin__card-header {
    display: flex;
    justify-content: space-between;
    border-radius: 30px 30px 0 0;
    padding: 2px 2px 2px 2px;
    background: $yellowy;

    @media (max-width: $sm) {
        padding: 8px;
    }
}
.reviews-admin__card-header-person {
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    width: 100%;
    @media (max-width: $lg) {
        gap: 8px;
    }

    @media (max-width: $sm) {
        flex-direction: column;
        align-items: start;
    }
}
.reviews-admin__header-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.reviews-admin__card-header-person-img-wrapper {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    overflow: hidden;
    flex-shrink: 0;

    & img {
        width: 100%;
        height: 100%;
    }
}

.reviews-admin__card-header-person-info {
    display: flex;
    gap: 16px;
}
.reviews-admin__header-person-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: $orange;
    @media (max-width: $lg) {
        font-size: 20px;
        line-height: 1.2;
    }
    span {
        display: block;
    }
}
.reviews-admin__card-header-date {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: $orange;
    @media (max-width: $lg) {
        font-size: 14px;
        line-height: 1.4;
    }
    @media (max-width: $sm) {
    }

    &.edit {
        color: $black;
        padding-right: 10px;
    }
}

.reviews-admin__card-footer-text {
    padding: 16px;
    @media (max-width: $sm) {
        font-size: 14px;
        line-height: 20px;
    }
}

.btn {
    box-shadow:
        0 2px 4px 0 rgba(21, 15, 13, 0.1),
        0 8px 8px 0 rgba(21, 15, 13, 0.09);
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #ffffff;
    border-radius: 24px;
    padding: 6px 24px;
    background: $orange;
    cursor: pointer;
    transition: 0.4s;
    display: block;
    width: fit-content;
    color: white;

    @media (max-width: $md) {
        // background: blue;
        padding: 6px 12px;
    }
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
