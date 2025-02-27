<template>
    <ContnentLayout>
        <section class="case__contaner">
            <button
                class="py-2 px-4 rounded-xl w-fit mt-2 hover:text-orange"
                @click="$router.go(-1)"
            >
                &lt; назад
            </button>
            <div class="flex flex-col gap-4">
                <!-- {{ caseData }}
                <br />
                {{ pageType }} -->
                <!-- {{ getBriefcase }} -->
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-2">
                        <LabelField for="title" :error="getErrors?.title">Название </LabelField>
                        <InputField
                            v-model="caseData.title"
                            input-id="title"
                            placeholder="Название"
                            type="text"
                            :error="getErrors?.title"
                            :error-text="getErrors?.title || 'Обязательное поле'"
                        ></InputField>
                    </div>
                    <div class="flex flex-col gap-2">
                        <LabelField for="annotation" :error="getErrors?.annotation"
                        >Краткое описание
                        </LabelField>
                        <TextareaField
                            v-model="caseData.annotation"
                            input-id="annotation"
                            placeholder="Описание кейса"
                            type="text"
                            :error="getErrors?.annotation"
                            :error-text="getErrors?.annotation || 'Обязательное поле'"
                        ></TextareaField>
                    </div>
                    <div class="flex flex-col gap-2">
                        <LabelField for="description" :error="getErrors?.description"
                        >Полное описание
                        </LabelField>
                        <TextEditor
                            v-model="caseData.description"
                            :error="getErrors?.description"
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
                            <LabelField for="author" :error="getErrors?.author">Автор </LabelField>
                            <InputField
                                v-model="caseData.author"
                                input-id="author"
                                placeholder="Автор"
                                type="text"
                                :error="getErrors?.author"
                                :error-text="getErrors?.author || 'Обязательное поле'"
                            ></InputField>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <div class="flex flex-col gap-2 w-1/2">
                            <LabelField for="duration" :error="getErrors?.duration"
                            >Время прохождения
                            </LabelField>
                            <InputField
                                v-model="caseData.duration"
                                input-id="duration"
                                placeholder="Время прохождения"
                                type="text"
                                :error="getErrors?.duration"
                                :error-text="getErrors?.duration || 'Обязательное поле'"
                            ></InputField>
                        </div>
                        <div class="flex flex-col gap-2 w-1/2"></div>
                    </div>
                    <div class="flex gap-2 flex-col">
                        <LabelField for="preview_img" :error="getErrors?.preview_img"
                        >Обложка кейса
                        </LabelField>
                        <FileField
                            field-id="preview_img"
                            label="загрузить"
                            :accept-material="'image/*'"
                            :error="getErrors?.preview_img"
                            :error-text="'Обязательное поле'"
                            :page-type="pageType"
                            :file-name="caseData?.preview_img"
                            @file-change="(file) => fileChange(file, 'preview_img')"
                        ></FileField>
                    </div>
                    <div class="flex gap-2 flex-col">
                        <LabelField for="rules" :error="getErrors?.rules">Правила </LabelField>
                        <FileField
                            field-id="rules"
                            label="загрузить"
                            :accept-material="'application/pdf'"
                            :error="getErrors?.rules"
                            :error-text="'Обязательное поле'"
                            :page-type="pageType"
                            :file-name="caseData?.rules"
                            @file-change="(file) => fileChange(file, 'rules')"
                        ></FileField>
                    </div>
                    <div class="flex gap-2 flex-col">
                        <LabelField for="material" :error="getErrors?.material"
                        >Материал
                        </LabelField>
                        <FileField
                            field-id="material"
                            label="загрузить "
                            :accept-material="'application/pdf'"
                            :error="getErrors?.material"
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
                    :disable="btnDisabled"
                    @action="pageType === 'edit' ? edit() : save()"
                >{{ pageType === 'edit' ? 'Редактировать' : 'Сохранить' }}
                </BtnComponent>

                {{ btnDisabled }}
            </div>
        </section>
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

const briefcaseStore = useBriefcaseStore()

const getSuccses = computed(() => {
    return briefcaseStore.getSuccess
})

const changeDate = ref(false)
const btnDisabled = computed(() => {
    if (pageType.value === 'edit') {
        return !changeDate.value
    }
    return false
})

const getBriefcase = computed(() => {
    return briefcaseStore.getBriefcase
})

const getErrors = computed(() => {
    return briefcaseStore.getError
})
const route = useRoute()
const pageType = ref(null)
const caseData = reactive({
    id: null,
    title: 'Школа зельеварения',
    description:
        'Пары кореньев, шёпотки соли и котла с кипятком недостаточно для приготовления снадобья. Искусство зельеварения требует глубоких знаний о свойствах каждого ингредиента, пропорций и правильной последовательностью введения. Выступите подмастерьем и составьте точную формулу зелья определяя природу ингредиентов в наставлениях изъясняющегося загадками магистра. Орлиное перо или перечный порошок? Что сначала? Сколько? Делайте выбор, производите арифметические подсчеты, но будьте внимательны – не допускайте взрывов пытаясь поспеть за мастером.  Разминка «Школа зельеварения» проверит способность к абстрактному и образному мышлению в совокупности со знаниями арифметики, позволяющими подобрать правильный ингредиент и пропорции согласно свойствам описанных магистром.',
    author: 'Александр Войнов',
    annotation: 'Краткое описание',
    duration: '3-5 минут',
    preview_img: null,
    type: 'moving',
    rules: null,
    material: null
    // id: null,
    // title: null,
    // description: '',
    // author: null,
    // annotation: null,
    // duration: null,
    // preview_img: null,
    // type: 'moving'
})

onMounted(() => {
    if (route.name === 'edit-article') {
        // pageType.value = 'edit'
        // articleStore.getArticleDb(route.params.id)
        // isLoad.value = false
    }
})

function save() {
    const data = new FormData()
    for (const key in caseData) {
        if (caseData[key] === null) {
            data.append(key, '')
        } else {
            data.append(key, caseData[key])
        }
    }
    briefcaseStore.add(data)
}

function edit() {
    changeDate.value = !changeDate.value

    console.log('edit')

    // const data = new FormData()
    // for (const key in caseData) {
    //     if (caseData[key] === null) {
    //         data.append(key, '')
    //     } else {
    //         data.append(key, caseData[key])
    //     }
    // }
    // briefcaseStore.add(data)
}

const optionCase = Object.entries(CaseType).map(([, val]) => {
    return { label: val.name, value: val.value }
})

function fileChange(file, field) {
    switch (field) {
        case 'preview_img':
            if (!file) {
                caseData.preview_img =
                    pageType.value === 'edit' ? getBriefcase.value.preview_img.path : null
            } else {
                caseData.preview_img = file
            }
            break
        case 'rules':
            if (!file) {
                caseData.rules = pageType.value === 'edit' ? getBriefcase.value.rules.path : null
            } else {
                caseData.rules = file
            }
            break
        case 'material':
            if (!file) {
                caseData.material =
                    pageType.value === 'edit' ? getBriefcase.value.material.path : null
            } else {
                caseData.material = file
            }
            break
    }
}

watch(
    () => ({ ...caseData }),
    () => {
        if (pageType.value === 'edit' && !changeDate.value) {
            changeDate.value = !changeDate.value
        }
        console.log()
    },
    { deep: true }
)

watch(
    getBriefcase,
    async () => {
        console.log(getBriefcase.value)
        console.log(getBriefcase.value.material?.path)
        caseData.id = getBriefcase.value.id
        caseData.preview_img = getBriefcase.value.preview_img?.path
        caseData.rules = getBriefcase.value.rules?.path
        caseData.material = getBriefcase.value.material?.path
        await nextTick()
        pageType.value = 'edit'
    },
    { deep: true }
)
</script>

<style lang="scss" scoped>
.case__contaner {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.error-text {
    color: $red !important;
}
</style>
