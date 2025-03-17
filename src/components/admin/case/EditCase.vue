<template>
    <ContnentLayout>
        <section class="case__contaner">
            <button
                class="py-2 px-4 rounded-xl w-fit mt-2 hover:text-orange"
                @click="$router.go(-1)"
            >
                &lt; назад
            </button>
            <div class="flex flex-col gap-6">
                <div class="flex flex-col w-full gap-4">
                    <h1 class="font-medium text-2xl">
                        {{ pageType === 'edit' ? 'Редактировать кейс' : 'Добавить кейс' }}
                    </h1>
                    <div v-if="getShowPublishedBtn" class="flex gap-2 items-center">
                        <input
                            id="published"
                            v-model="published"
                            type="checkbox"
                            value="false"
                            class="w-5 h-5"
                            :disabled="publishedDisabled"
                            @change="setPublished"
                        />
                        <label for="published">Опубликовать</label>
                    </div>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <p class="text-gray text-lg font-semibold">Основные данные</p>

                        <div class="flex flex-col gap-2">
                            <LabelField for="title" :error="!!getErrors?.title"
                                >Название
                            </LabelField>
                            <InputField
                                v-model="caseData.title"
                                input-id="title"
                                placeholder="Название"
                                type="text"
                                :error="!!getErrors?.title"
                                :error-text="getErrors?.title || 'Обязательное поле'"
                            ></InputField>
                        </div>
                        <div class="flex flex-col gap-2">
                            <LabelField for="annotation" :error="!!getErrors?.annotation"
                                >Краткое описание
                            </LabelField>
                            <TextareaField
                                v-model="caseData.annotation"
                                input-id="annotation"
                                placeholder="Описание кейса"
                                type="text"
                                :error="!!getErrors?.annotation"
                                :error-text="getErrors?.annotation || 'Обязательное поле'"
                            ></TextareaField>
                        </div>
                        <div class="flex flex-col gap-2">
                            <LabelField for="description" :error="!!getErrors?.description"
                                >Полное описание
                            </LabelField>
                            <TextEditor
                                v-model="caseData.description"
                                :error="!!getErrors?.description"
                                :error-text="getErrors?.description || 'Обязательное поле'"
                            >
                            </TextEditor>
                        </div>
                        <div class="flex gap-2">
                            <div class="flex flex-col gap-2 w-1/2">
                                <LabelField :error="getErrors?.type">Тип кейса</LabelField>
                                <DropdownComponent
                                    v-model:model-value="caseData.type"
                                    :options="optionCase"
                                    :placeholder="'Выберите тип'"
                                    :error="getErrors?.type"
                                />
                                <p v-if="getErrors?.type" class="error-text">
                                    {{ getErrors?.type || 'Обязательное поле' }}
                                </p>
                            </div>
                            <div class="flex flex-col gap-2 w-1/2">
                                <LabelField for="author" :error="!!getErrors?.author"
                                    >Автор
                                </LabelField>
                                <InputField
                                    v-model="caseData.author"
                                    input-id="author"
                                    placeholder="Автор"
                                    type="text"
                                    :error="!!getErrors?.author"
                                    :error-text="getErrors?.author || 'Обязательное поле'"
                                ></InputField>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <div class="flex flex-col gap-2 w-1/2">
                                <LabelField for="duration" :error="!!getErrors?.duration"
                                    >Время прохождения
                                </LabelField>
                                <InputField
                                    v-model="caseData.duration"
                                    input-id="duration"
                                    placeholder="Время прохождения"
                                    type="text"
                                    :error="!!getErrors?.duration"
                                    :error-text="getErrors?.duration || 'Обязательное поле'"
                                ></InputField>
                            </div>
                            <div class="flex flex-col gap-2 w-1/2"></div>
                        </div>
                        <div class="flex gap-2 flex-col">
                            <LabelField for="preview_img" :error="!!getErrors?.preview_img"
                                >Обложка кейса
                            </LabelField>
                            <FileField
                                field-id="preview_img"
                                label="загрузить"
                                label-class="btn-orange"
                                :accept-material="'image/*'"
                                :error="!!getErrors?.preview_img"
                                :error-text="'Обязательное поле'"
                                :page-type="pageType"
                                :file-name="caseData?.preview_img"
                                @file-change="(file) => fileChange(file, 'preview_img')"
                            ></FileField>
                        </div>
                        <div class="flex gap-2 flex-col">
                            <LabelField for="rules" :error="!!getErrors?.rules"
                                >Правила
                            </LabelField>
                            <FileField
                                field-id="rules"
                                label="загрузить"
                                label-class="btn-orange"
                                :accept-material="'application/pdf'"
                                :error="!!getErrors?.rules"
                                :error-text="'Обязательное поле'"
                                :page-type="pageType"
                                :file-name="caseData?.rules"
                                @file-change="(file) => fileChange(file, 'rules')"
                            ></FileField>
                        </div>
                        <div class="flex gap-2 flex-col">
                            <LabelField for="material" :error="!!getErrors?.material"
                                >Материал
                            </LabelField>
                            <FileField
                                field-id="material"
                                label="загрузить"
                                label-class="btn-orange"
                                :accept-material="'application/pdf'"
                                :error="!!getErrors?.material"
                                :error-text="'Обязательное поле'"
                                :page-type="pageType"
                                :file-name="caseData?.material"
                                @file-change="(file) => fileChange(file, 'material')"
                            ></FileField>
                        </div>
                    </div>
                    <BtnComponent
                        emit-name="action"
                        class="w-fit"
                        :disable="changeDate || getDisableRequest"
                        @action="pageType === 'edit' || changeDate ? edit() : save()"
                        >{{ pageType === 'edit' || changeDate ? 'Редактировать' : 'Сохранить' }}
                    </BtnComponent>
                </div>

                <UploadSlider
                    v-if="caseData.id"
                    :id="caseData.id"
                    :slider-data="caseDataSlider.images_slider"
                ></UploadSlider>
                <AddRulseVideo
                    v-if="caseData.id"
                    :id="caseData.id"
                    v-model:description="caseDataVideoRules.rules_video_description"
                    v-model:file="caseDataVideoRules.rules_video"
                    :page-type="pageType"
                    :change-data="changeVideoRules"
                    :edit-block="editBlock.caseDataVideoRules"
                    :data="getBriefcase"
                ></AddRulseVideo>
                <LevelCase
                    v-if="caseData.id"
                    :id="caseData.id"
                    :data="getBriefcase?.levels"
                ></LevelCase>
            </div>

            <BtnComponent
                v-if="caseData.id && !pageType === 'edit'"
                evel-case
                emit-name="action"
                class="w-fit mt-4"
                @action="newCase()"
                >Создать новый кейс
            </BtnComponent>
        </section>
        <Teleport to="body">
            <Loader v-if="!isLoad" />
        </Teleport>
    </ContnentLayout>
</template>
<script setup>
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import DropdownComponent from '@/components/ui/dropdown/DropdownComponent.vue'
import FileField from '@/components/ui/form/file/FileField.vue'
import InputField from '@/components/ui/form/input/InputField.vue'
import LabelField from '@/components/ui/form/label/LabelField.vue'
import TextEditor from '@/components/ui/form/text-editor/TextEditor.vue'
import TextareaField from '@/components/ui/form/textarea/TextareaField.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { CaseType } from './typy-article/typeArticle'
import { useRoute } from 'vue-router'
import ContnentLayout from '@/layouts/ContnentLayout.vue'
import UploadSlider from './upload-slider/UploadSlider.vue'
import AddRulseVideo from './add-rules-video/AddRulseVideo.vue'
import LevelCase from './level-case/LevelCase.vue'
import Loader from '@/components/ui/loader/Loader.vue'

const briefcaseStore = useBriefcaseStore()
const isLoad = ref(true)
const published = ref(false)
const publishedDisabled = ref(false)
const getIsSuccess = computed(() => {
    return briefcaseStore.getIsSuccess
})

const changeDate = ref(false)
const changeVideoRules = ref(false)

const getBriefcase = computed(() => {
    return briefcaseStore.getBriefcase
})

const getDisableRequest = computed(() => {
    return briefcaseStore.getDisableRequest
})

const getErrors = computed(() => {
    return briefcaseStore.getError
})
const route = useRoute()
const pageType = ref('add')

const editBlock = reactive({
    caseData: false,
    caseDataVideoRules: false
})

const caseData = reactive({
    id: null,
    title: '',
    description: '',
    author: '',
    annotation: '',
    duration: '',
    preview_img: null,
    type: 'moving',
    rules: null,
    material: null
})

const caseDataSlider = reactive({
    images_slider: null
})

const caseDataVideoRules = reactive({
    rules_video_description: '',
    rules_video: null
})

onMounted(() => {
    if (route.name === 'edit-case') {
        pageType.value = 'edit'
        briefcaseStore.getBriefcaseStoreDb(route.params.id)
        isLoad.value = false
    }

    setTimeout(() => {
        isLoad.value = true
    }, 10000)
})
const getShowPublishedBtn = computed(() => {
    if (
        pageType.value === "edit"
        // &&
        // (getUser.value.role === 'ROLE_ADMIN' || getUser.value.role === 'ROLE_MODERATOR')
    ) {
        return true
    } else {
        return false
    }
})

function setPublished() {
    publishedDisabled.value = true
    briefcaseStore.setArticlePublished(caseData.id)
}

function save() {
    const data = new FormData()
    for (const key in caseData) {
        if (caseData[key] !== null) {
            data.append(key, caseData[key])
        }
    }
    briefcaseStore.add(data)
}

function edit() {
    changeDate.value = !changeDate.value

    const data = new FormData()
    for (const key in caseData) {
        if (
            (key === 'preview_img' || key === 'rules' || key === 'material') &&
            typeof caseData[key] !== 'object'
        ) {
            continue
        } else if (caseData[key] !== null) {
            data.append(key, caseData[key])
        }
    }
    briefcaseStore.edit(data)
}

function newCase() {
    editBlock.caseData = false
    editBlock.caseDataVideoRules = false

    pageType.value = 'add'
    caseData.id = null
    caseData.title = ''
    caseData.description = ''
    caseData.author = ''
    caseData.annotation = ''
    caseData.duration = ''
    caseData.preview_img = null
    caseData.type = 'moving'
    caseData.rules = null
    caseData.material = null

    caseDataSlider.images_slider = null

    caseDataVideoRules.rules_video_description = ''
    caseDataVideoRules.rules_video = null
}

const optionCase = Object.entries(CaseType).map(([, val]) => {
    return { label: val.name, value: val.value }
})

function fileChange(file, field) {
    switch (field) {
        case 'preview_img':
            if (!file) {
                caseData.preview_img = getBriefcase.value.preview_img
                    ? getBriefcase.value.preview_img.path
                    : null
            } else {
                caseData.preview_img = file
            }
            break
        case 'rules':
            if (!file) {
                caseData.rules = getBriefcase.value.rules.path
                    ? getBriefcase.value.rules.path
                    : null
            } else {
                caseData.rules = file
            }
            break
        case 'material':
            if (!file) {
                caseData.material = getBriefcase.value.material
                    ? getBriefcase.value.material.path
                    : null
            } else {
                caseData.material = file
            }
            break
    }
}

watch(
    () => ({ ...caseData }),
    () => {
        changeDate.value = false
    },
    { deep: true }
)

watch(
    () => ({ ...caseDataVideoRules }),
    () => {
        changeVideoRules.value = false
    },
    { deep: true }
)

watch(
    getBriefcase,
    async () => {
        isLoad.value = true
        published.value = getBriefcase.value.published
        caseData.id = getBriefcase.value.id
        caseData.title = getBriefcase.value.title
        caseData.description = getBriefcase.value.description
        caseData.author = getBriefcase.value.author
        caseData.annotation = getBriefcase.value.annotation
        caseData.duration = getBriefcase.value.duration
        caseData.type = getBriefcase.value.type
        caseData.preview_img = getBriefcase.value.preview_img?.path
        caseData.rules = getBriefcase.value.rules?.path
        caseData.material = getBriefcase.value.material?.path
        caseDataSlider.images_slider = getBriefcase.value.images_slider
        caseDataVideoRules.rules_video = getBriefcase.value.rules_video?.path
        caseDataVideoRules.rules_video_description = getBriefcase.value?.rules_video_description
        await nextTick()
        changeDate.value = true
    },
    { deep: true }
)

watch(getIsSuccess, async (val) => {
    if (val === 'add') {
        await nextTick()
        changeDate.value = true
    }
    if (val === 'video-rules') {
        editBlock.caseDataVideoRules = true
        changeVideoRules.value = true
        await nextTick()
        changeVideoRules.value = true
    }

    if (val === 'published') {
        publishedDisabled.value = false
    }
})
</script>

<style lang="scss" scoped>
.case__contaner {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 20px;
}

.error-text {
    color: $red !important;
}
</style>
