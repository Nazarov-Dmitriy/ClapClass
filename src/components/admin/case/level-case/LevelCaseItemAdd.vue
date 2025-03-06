<template>
    <div class="flex flex-col gap-4">
        <p class="text-gray text-lg font-semibold">Уровень кейса</p>
        <div class="flex flex-col gap-2">
            <LabelField for="title-level" :error="!!getErrors?.level?.level?.title">Название уровня </LabelField>
            <InputField
                v-model="levelData.title"
                input-id="title-level"
                placeholder="Название уровня"
                type="text"
                :error="!!getErrors?.level?.title"
                :error-text="getErrors?.level?.title"
            ></InputField>
        </div>
        <div class="flex flex-col gap-2">
            <LabelField for="decription-level" :error="!!getErrors?.level?.description"
            >Краткое описание
            </LabelField>
            <TextareaField
                v-model="levelData.description"
                input-id="decription-level"
                placeholder="Описание"
                type="text"
                :error="!!getErrors?.level?.description"
                :error-text="getErrors?.level?.description"
            ></TextareaField>
        </div>
        <FileField
            field-id="video-lvl"
            label-class="btn-orange"
            label="добавить видео"
            :accept-material="'video/*'"
            :error="!!getErrors?.level?.file"
            :error-text="'Обязательное поле'"
            :file-name="levelData.file"
            @file-change="fileChange"
        ></FileField>
        <BtnComponent
            emit-name="action"
            :disable="getDisableRequest"
            class="w-fit"
            current-class="flex gap-2 items-center"
            @action="save()"
        >Сохранить
            <PulseLoader
                :loading="loading"
                :color="'#e05704'"
                :size="'24px'"
                class="flex items-center"
            ></PulseLoader>
        </BtnComponent>
    </div>
</template>
<script setup>
import FileField from '@/components/ui/form/file/FileField.vue'
import LabelField from '@/components/ui/form/label/LabelField.vue'
import { computed, reactive, ref, watch } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import TextareaField from '@/components/ui/form/textarea/TextareaField.vue'
import InputField from '@/components/ui/form/input/InputField.vue'
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'
const briefcaseStore = useBriefcaseStore()
const loading = ref(false)

const levelData = reactive({
    title: '',
    description: '',
    file: null
})

const props = defineProps({
    id: {
        type: Number,
        default: null
    }
})

const getDisableRequest = computed(() => {
    return briefcaseStore.getDisableRequest
})

const getErrors = computed(() => {
    return briefcaseStore.getError
})

const getIsSuccess = computed(() => {
    return briefcaseStore.getIsSuccess
})

function fileChange(file) {
    !file ? (levelData.file = null) : (levelData.file = file)
}

function save() {
    loading.value = true
    const data = new FormData()
    data.append('id', props.id)
    data.append('description', levelData.description)
    data.append('title', levelData.title)
    if (typeof levelData.file === 'object' && levelData.file) {
        data.append('file', levelData.file)
    }
    briefcaseStore.addLevelCase(data)
}

watch(getIsSuccess, (val) => {
    if (val === 'level-add') {
        levelData.description = null
        levelData.file = null
        levelData.title = null
        loading.value = false

    }
})

watch(getDisableRequest, async (val) => {
    if (val === false) {
        loading.value = false
    }
})
</script>
<style lang="scss"></style>
