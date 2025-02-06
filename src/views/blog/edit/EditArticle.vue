<template>
    <ContnentLayout>
        <button class="py-2 px-4 rounded-xl w-fit mt-2 hover:text-orange" @click="$router.go(-1)">
            &lt; назад
        </button>
        <div class="edit flex flex-col w-full gap-4">
            <h1 class="font-medium text-2xl">
                {{ pageType ? 'Редактировать статью' : 'Добавить статью' }}
            </h1>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label
                        for="title"
                        class="field__label"
                        :class="{ error: getErrors?.title || dataArticleError?.title }"
                    >Заголовок материала</label
                    >
                    <input
                        id="title"
                        v-model="dataArticle.title"
                        placeholder="Заголовок материала"
                        type="text"
                        class="field__input"
                        :class="{ error: getErrors?.title || dataArticleError?.title }"
                    />
                    <p v-if="getErrors?.title || dataArticleError?.title" class="error-text">
                        {{ getErrors?.title || 'Обязательное поле' }}
                    </p>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label
                        class="field__label"
                        :class="{ error: getErrors?.type || dataArticleError?.type }"
                    >Тип статьи</label
                    >
                    <DropdownComponent
                        v-model:model-value="dataArticle.type"
                        :options="typeOptions"
                        :placeholder="'Выберите категорию'"
                        :error="getErrors?.type || dataArticleError?.type"
                    />
                    <p v-if="getErrors?.type || dataArticleError?.type" class="error-text">
                        {{ getErrors?.type || 'Обязательное поле' }}
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <label
                        class="field__label"
                        :class="{ error: getErrors?.article || dataArticleError?.article }"
                    >Статья</label
                    >
                    <TextEditor
                        v-model="dataArticle.article"
                        :error="getErrors?.article || dataArticleError?.article"
                    >
                    </TextEditor>
                    <p v-if="getErrors?.article || dataArticleError?.article" class="error-text">
                        {{ getErrors?.article || 'Обязательное поле' }}
                    </p>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 items-center">
                        <label
                            class="field__label file"
                            for="input_file"
                            :class="{ error: getErrors?.file || dataArticleError?.file }"
                        >Фаил</label
                        >
                        <div v-if="dataArticle.file && !fileLoad" class="flex gap-2">
                            <p>{{ getFileName }}</p>
                            <button
                                v-if="typeof dataArticle.file == 'object'"
                                class="w-5 h-5 hover:text-[#e05704]"
                                @click="removeFile()"
                            >
                                <svg
                                    width="auto"
                                    height="auto"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.92969 5L19.0718 19.1421"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M5 19.4102L19.1421 5.26802"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div v-else class="">
                            <PulseLoader
                                :loading="fileLoad"
                                :color="'#e05704'"
                                :size="'24px'"
                                class=""
                            ></PulseLoader>
                        </div>
                    </div>
                    <input
                        id="input_file"
                        ref="inputFile"
                        type="file"
                        class="visuallyhidden"
                        :accept="dataArticle.type === 'article' ? 'image/*' : 'video/*'"
                        @change="onFileChange"
                    />
                    <p v-if="getErrors?.file || dataArticleError?.file" class="error-text">
                        {{ getErrors?.file || 'Обязательное поле' }}
                    </p>
                </div>
                <BtnComponent
                    emit-name="action"
                    class="header__btn w-fit"
                    :disable="saveArticle"
                    @action="pageType ? edit() : save()"
                >
                    {{ pageType ? 'Редактировать' : 'Сохранить' }}
                    <PulseLoader
                        :loading="saveArticle"
                        :color="'#e05704'"
                        :size="'24px'"
                        class=""
                    ></PulseLoader>
                </BtnComponent>
            </div>
        </div>
        <Teleport to="body">
            <Loader v-if="!isLoad" />
        </Teleport>
    </ContnentLayout>
</template>
<script setup>
import ContnentLayout from '@/layouts/ContnentLayout.vue'
import { useArticleStore } from '@/stores/articleStore'
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'
import DropdownComponent from '@/components/ui/dropdown/DropdownComponent.vue'
import TextEditor from '@/components/ui/form/text-editor/TextEditor.vue'
import BtnComponent from '@/components/btns/BtnComponent.vue'
import * as yup from 'yup'
import Loader from '@/components/loader/Loader.vue'

const userStore = useUserStore()
const articleStore = useArticleStore()
const route = useRoute()
const fileLoad = ref(false)
const saveArticle = ref(false)
const pageType = ref(null)
const inputFile = ref(null)
const isLoad = ref(true)

const formShema = yup.object({
    title: yup.string().required('title'),
    article: yup.string().required('article'),
    type: yup.string().required('type'),
    file: yup.mixed().required('file'),
    author: yup.number().required('author')
})

const dataArticle = reactive({
    title: null,
    article: '',
    type: 'article',
    file: null,
    author: 17
})

const dataArticleError = reactive({
    title: null,
    article: null,
    type: null,
    file: null,
    author: null
})

const getUser = computed(() => {
    return userStore.getUser
})

const getErrors = computed(() => {
    return articleStore.getErrors
})

const getIsSuccess = computed(() => {
    return articleStore.getIsSuccess
})
const getArticle = computed(() => {
    return articleStore.getArticle
})

const getFileName = computed(() => {
    if (typeof dataArticle.file == 'object') {
        return dataArticle.file.name
    }
    return dataArticle.file.split('/')[dataArticle.file.split('/').length - 1]
})

const typeOptions = [
    { label: 'Статья', value: 'article' },
    { label: 'Видео', value: 'video' }
]

onMounted(() => {
    if (route.name === 'edit-article') {
        pageType.value = 'edit'
        articleStore.getArticleDb(route.params.id)
        isLoad.value = false
    }
})

async function save() {
    await formShema
        .validate(
            {
                title: dataArticle.title,
                article: dataArticle.article,
                type: dataArticle.type,
                file: dataArticle.file,
                author: dataArticle.author
            },
            { abortEarly: false }
        )
        .then(async () => {
            let formData = new FormData()
            formData.append('title', dataArticle.title)
            formData.append('article', dataArticle.article)
            formData.append('type', dataArticle.type)
            formData.append('author', dataArticle.author)
            formData.append('file', dataArticle.file)
            articleStore.add(formData)
            resetError()
        })
        .catch((e) => {
            e.errors.includes('title')
                ? (dataArticleError.title = true)
                : (dataArticleError.title = false)
            e.errors.includes('article')
                ? (dataArticleError.article = true)
                : (dataArticleError.article = false)
            e.errors.includes('type')
                ? (dataArticleError.type = true)
                : (dataArticleError.type = false)
            e.errors.includes('file')
                ? (dataArticleError.file = true)
                : (dataArticleError.file = false)
            e.errors.includes('author')
                ? (dataArticleError.author = true)
                : (dataArticleError.author = false)
        })
}

async function edit() {
    await formShema
        .validate(
            {
                title: dataArticle.title,
                article: dataArticle.article,
                type: dataArticle.type,
                file: dataArticle.file,
                author: dataArticle.author
            },
            { abortEarly: false }
        )
        .then(async () => {
            let formData = new FormData()
            formData.append('title', dataArticle.title)
            formData.append('id', getArticle.value.id)
            formData.append('article', dataArticle.article)
            formData.append('type', dataArticle.type)
            formData.append('author', dataArticle.author)
            formData.append('file', typeof dataArticle.file == 'object' ? dataArticle.file : '')
            articleStore.edit(formData)
            resetError()
        })
        .catch((e) => {
            e.errors.includes('title')
                ? (dataArticleError.title = true)
                : (dataArticleError.title = false)
            e.errors.includes('article')
                ? (dataArticleError.article = true)
                : (dataArticleError.article = false)
            e.errors.includes('type')
                ? (dataArticleError.type = true)
                : (dataArticleError.type = false)
            e.errors.includes('file')
                ? (dataArticleError.file = true)
                : (dataArticleError.file = false)
            e.errors.includes('author')
                ? (dataArticleError.author = true)
                : (dataArticleError.author = false)
        })
}

function resetError() {
    dataArticleError.title = false
    dataArticleError.article = false
    dataArticleError.type = false
    dataArticleError.file = false
    dataArticleError.author = false
}

function resetData() {
    dataArticle.title = null
    dataArticle.article = ''
    dataArticle.type = null
    dataArticle.file = null
    dataArticle.author = null
    inputFile.value.value = ''
}

function onFileChange(e) {
    const file = e.target.files[0]
    let reader = new FileReader()
    if (file) {
        fileLoad.value = true
        dataArticle.file = file
        reader.onload = () => (fileLoad.value = false)
        reader.readAsArrayBuffer(file)
    }
}

function removeFile() {
    pageType.value === 'edit'
        ? (dataArticle.file = getArticle.value.file)
        : (dataArticle.file = null)
    inputFile.value.value = ''
}

watch(getUser, () => {
    if (pageType.value === 'edit') {
        // if (getUser.value?.id == getArticle.value?.author?.id) {
        //     dataNews.author = getUser.value?.id
        // } else {
        //     dataNews.author = getArticle.value?.author?.id
        // }
    } else {
        dataArticle.author = getUser.value?.id
    }
})

watch(getIsSuccess, (val) => {
    if (val === 'add') {
        saveArticle.value = false
        resetData()
    }
})
watch(getArticle, () => {
    isLoad.value = true
    dataArticle.title = getArticle.value.title
    dataArticle.article = getArticle.value.article
    dataArticle.type = getArticle.value.type
    dataArticle.file = getArticle.value.file
    dataArticle.author = getArticle.value.author.id
})
</script>
<style lang="scss" scoped>
.edit {
    margin: 16px 0;
    padding: 16px 60px;
    border-radius: 24px;
    background: #e6eaed;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @media (max-width: $lg) {
        padding: 16px 40px;
    }

    @media (max-width: $sm) {
        padding: 16px;
    }
}

.field__label {
    font-weight: 500;
    color: $gray;
    &.error {
        color: red;
    }

    &.file {
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

        &.error {
            background: $red;
        }
    }
}

.field__input {
    border: 2px solid $gray;
    border-radius: 24px;
    padding: 10px 16px;
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

.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.error-text {
    color: $red !important;
}
</style>
