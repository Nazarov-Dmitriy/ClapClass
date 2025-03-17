<template>
    <div class="flex flex-col gap-4">
        <p class="text-gray text-lg font-semibold">Посмотрите правила</p>
        <div class="flex flex-col gap-2">
            <LabelField for="annotation" :error="!!getErrors?.rules_video_description"
            >Краткое описание
            </LabelField>
            <TextareaField
                v-model="model"
                input-id="annotation"
                placeholder="Описание"
                type="text"
                :error="!!getErrors?.rules_video_description"
                :error-text="getErrors?.rules_video_description"
            ></TextareaField>
        </div>
        <FileField
            field-id="rules-video"
            label-class="btn-orange"
            label="добавить видео правила"
            :accept-material="'video/*'"
            :error="!!getErrors?.rules_video || videoRulesError"
            :error-text="'Обязательное поле'"
            :file-name="fileRules"
            @file-change="fileChange"
        ></FileField>
        <BtnComponent
            emit-name="action"
            class="w-fit"
            current-class="flex gap-2 items-center"
            :disable="props.changeData || getDisableRequest"
            @action="
                props.editBlock || props.changeData || (props.pageType === 'edit' ? true : false)
                    ? edit()
                    : save()
            "
        >{{
             props.editBlock || props.changeData || (props.pageType === 'edit' ? true : false)
                 ? 'Редактировать'
                 : 'Сохранить'
         }}

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
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'
import FileField from '@/components/ui/form/file/FileField.vue'
import LabelField from '@/components/ui/form/label/LabelField.vue'
import { computed, ref, watch } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import TextareaField from '@/components/ui/form/textarea/TextareaField.vue'
const briefcaseStore = useBriefcaseStore()
const model = defineModel('description', { type: String })
const fileRules = defineModel('file', { type: [String, File] })
const loading = ref(false)

const videoRulesError = ref(false)

const props = defineProps({
    id: {
        type: Number,
        default: null
    },
    data: {
        type: Object,
        default: new Object()
    },
    changeData: {
        type: Boolean,
        default: false
    },
    pageType: {
        type: String,
        default: ''
    },
    editBlock: {
        type: Boolean,
        default: false
    }
})

const getErrors = computed(() => {
    return briefcaseStore.getError
})

const getIsSuccess = computed(() => {
    return briefcaseStore.getIsSuccess
})

const getDisableRequest = computed(() => {
    return briefcaseStore.getDisableRequest
})

function fileChange(file) {
    if (!file) {
        fileRules.value = props.data.rules_video.path ? props.data.rules_video.path : null
    } else {
        fileRules.value = file
    }
}

function save() {
    loading.value = true
    if (fileRules.value !== null) {
        const data = new FormData()
        data.append('id', props.id)
        data.append('rules_video_description', model.value || '')
        if (typeof fileRules.value === 'object') {
            data.append('rules_video', fileRules.value)
        }
        briefcaseStore.addRulesVideo(data)
        videoRulesError.value = false
    } else {
        videoRulesError.value = true
    }
}

function edit() {
    loading.value = true

    if (fileRules.value !== null) {
        const data = new FormData()
        data.append('id', props.id)
        data.append('rules_video_description', model.value)
        if (fileRules.value instanceof File) {
            data.append('rules_video', fileRules.value)
        }
        briefcaseStore.editRulesVideo(data)
        videoRulesError.value = false
    } else {
        videoRulesError.value = true
    }
}

watch(getIsSuccess, async (val) => {
    if (val === 'video-rules') {
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
