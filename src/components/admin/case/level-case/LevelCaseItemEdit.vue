<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <LabelField for="title-level" :error="!!getErrors?.[`level${props.level.id}`]?.title">Название уровня </LabelField>
            <InputField
                v-model="levelData.title"
                input-id="title-level"
                placeholder="Название уровня"
                type="text"
                :error="!!getErrors?.[`level${props.level.id}`]?.title"
                :error-text="getErrors?.[`level${props.level.id}`]?.title"
            ></InputField>
        </div>
        <div class="flex flex-col gap-2">
            <LabelField for="decription-level" :error="!!getErrors?.[`level${props.level.id}`]?.description"
            >Краткое описание
            </LabelField>
            <TextareaField
                v-model="levelData.description"
                input-id="decription-level"
                placeholder="Описание"
                type="text"
                :error="!!getErrors?.[`level${props.level.id}`]?.description"
                :error-text="getErrors?.[`level${props.level.id}`]?.description"
            ></TextareaField>
        </div>
        <FileField
            :field-id="'video-lvl' + props.id"
            label="добавить видео правила"
            label-class="btn-orange"
            :accept-material="'video/*'"
            :error="!!getErrors?.[`level${props.level.id}`]?.file"
            :error-text="'Обязательное поле'"
            :file-name="levelData.file"
            @file-change="fileChange"
        ></FileField>

        <div class="flex gap-4">
            <BtnComponent
                emit-name="action"
                :disable="getDisableRequest"
                class="w-fit"
                current-class="!text-base flex gap-2 items-center"
                @action="save()"
            >Редактировать
                <PulseLoader
                    :loading="loading"
                    :color="'#e05704'"
                    :size="'24px'"
                    class="flex items-center"
                ></PulseLoader>
            </BtnComponent>

            <BtnComponent
                emit-name="action"
                class="w-fit"
                current-class="!text-base"
                @action="$emit('cansel')"
            >
                Отмена
            </BtnComponent>

            <BtnComponent
                emit-name="action"
                class="w-fit"
                current-class="!text-base"
                :disable="getDisableRequest"
                @action="remove"
            >
                Удалить
            </BtnComponent>
        </div>
    </div>
</template>
<script setup>
import FileField from '@/components/ui/form/file/FileField.vue'
import LabelField from '@/components/ui/form/label/LabelField.vue'
import { computed, defineEmits, onMounted, reactive, ref, watch } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import TextareaField from '@/components/ui/form/textarea/TextareaField.vue'
import InputField from '@/components/ui/form/input/InputField.vue'
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'

defineEmits(['cansel', 'remove'])
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
    },
    level: {
        type: Object,
        default: new Object()
    }
})

onMounted(() => {
    levelData.file = props.level?.file?.path
    levelData.description = props.level?.description
    levelData.title = props.level?.title
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

function remove() {
    briefcaseStore.removeLevel({ level_id: props.level.id, briefcase_id: props.id })
}

function fileChange(file) {
    if (!file) {
        levelData.file = props.level?.file?.path ? props.level?.file?.path : null
    } else {
        levelData.file = file
    }
}

function save() {
    loading.value = true
    const data = new FormData()
    data.append('id', props.id)
    data.append('levelId', props.level?.id)
    data.append('description', levelData.description)
    data.append('title', levelData.title)
    if (typeof levelData.file === 'object' && levelData.file) {
        data.append('file', levelData.file)
    }
    briefcaseStore.editLevelCase(data)
}

watch(getIsSuccess, (val) => {
    if (val === 'level-edit') {
        loading.value = false
    }
})
</script>
<style lang="scss"></style>
