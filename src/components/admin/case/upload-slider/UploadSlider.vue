<template>
    <div class="flex flex-col gap-2">
        <p class="text-gray text-lg font-semibold">Фотографии слайдер</p>
        <FileField
            field-id="slider"
            label="добавить "
            label-class="btn-orange"
            :accept-material="'image/*'"
            :error="sliderFilesError"
            :error-text="'Поле не может быть пустым'"
            :page-type="pageType"
            @file-change="fileChange"
        ></FileField>
        <div class="flex flex-col gap-2">
            <div v-for="image in sliderData" :key="image.id" class="flex gap-2">
                <p>
                    {{ image.name }}
                </p>
                <button class="w-5 h-5 hover:text-[#e05704]" @click="removeFileDb(image.id)">
                    <CloseSvg></CloseSvg>
                </button>
            </div>
            <div v-for="(image, ind) in sliderFiles" :key="ind" class="flex gap-2">
                <p>
                    {{ image.name }}
                </p>
                <button class="w-5 h-5 hover:text-[#e05704]" @click="removeFile(ind)">
                    <CloseSvg></CloseSvg>
                </button>
            </div>
        </div>
        <BtnComponent
            emit-name="action"
            class="w-fit"
            :disable="sliderFiles.length === 0 || getDisableRequest"
            @action="save()"
        >Сохранить
        </BtnComponent>
    </div>
</template>
<script setup>
import FileField from '@/components/ui/form/file/FileField.vue'
import CloseSvg from '@/assets/icons/close.svg?component'
import { computed, ref, watch } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
const briefcaseStore = useBriefcaseStore()
const sliderFiles = ref([])
const sliderFilesError = ref(false)

const props = defineProps({
    id: {
        type: Number,
        default: null
    },
    sliderData: {
        type: Array,
        default: null
    },
    pageType: {
        type: String,
        default: 'add'
    }
})

const getIsSuccess = computed(() => {
    return briefcaseStore.getIsSuccess
})

const getDisableRequest = computed(() => {
    return briefcaseStore.getDisableRequest
})

function fileChange(file) {
    sliderFiles.value.push(file)
}

function removeFile(id) {
    sliderFiles.value = sliderFiles.value.filter((_, ind) => ind !== id)
}

function removeFileDb(id) {
    briefcaseStore.removeSliderImage({ caseId: props.id, imageId: id })
}

function save() {
    if (sliderFiles.value.length > 0) {
        const data = new FormData()
        data.append('id', props.id)
        sliderFiles.value.forEach((item) => {
            data.append('images', item)
        })

        briefcaseStore.addSliderImages(data)
        sliderFilesError.value = false
    } else {
        sliderFilesError.value = true
    }
}

watch(getIsSuccess, (val) => {
    if (val === 'add-slider-image') {
        sliderFiles.value = []
    }
})
</script>
<style lang="scss"></style>
