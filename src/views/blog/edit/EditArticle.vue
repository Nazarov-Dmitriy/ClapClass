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
                    <LabelField for="title" :error="getErrors?.title || dataArticleError?.title"
                    >Заголовок материала</LabelField
                    >
                    <InputField
                        v-model="dataArticle.title"
                        input-id="title"
                        placeholder="Заголовок материала"
                        type="text"
                        :error="getErrors?.title || dataArticleError?.title"
                        :error-text="getErrors?.title || 'Обязательное поле'"
                    ></InputField>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <LabelField :error="getErrors?.type || dataArticleError?.type"
                    >Тип статьи</LabelField
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
                    <LabelField :error="getErrors?.article || dataArticleError?.article"
                    >Статья</LabelField
                    >
                    <TextEditor
                        v-model="dataArticle.article"
                        :error="getErrors?.article || dataArticleError?.article"
                        :error-text="getErrors?.article || 'Обязательное поле'"
                    >
                    </TextEditor>
                </div>
                <FileField
                    label="Фаил"
                    :accept-material="dataArticle.type === 'article' ? 'image/*' : 'video/*'"
                    :error="getErrors?.file || dataArticleError?.file"
                    :error-text="getErrors?.file || 'Обязательное поле'"
                    :page-type="pageType"
                    :file-name="dataArticle?.file"
                    @file-change="fileChange"
                ></FileField>
                <BtnComponent
                    emit-name="action"
                    class="header__btn w-fit"
                    current-class="flex gap-2 items-center"
                    :disable="saveArticle"
                    @action="pageType ? edit() : save()"
                >
                    {{ pageType ? 'Редактировать' : 'Сохранить' }}
                    <PulseLoader
                        :loading="saveArticle"
                        :color="'#e05704'"
                        :size="'24px'"
                        class="flex items-center"
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
import LabelField from '@/components/ui/form/label/LabelField.vue'
import InputField from '@/components/ui/form/input/InputField.vue'
import FileField from '@/components/ui/form/file/FileField.vue'

const userStore = useUserStore()
const articleStore = useArticleStore()
const route = useRoute()
const saveArticle = ref(false)
const pageType = ref(null)
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
    author: null
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

const typeOptions = [
    { label: 'Статья', value: 'article' },
    { label: 'Видео', value: 'video' }
]

onMounted(() => {
    setUser()
    if (route.name === 'edit-article') {
        pageType.value = 'edit'
        articleStore.getArticleDb(route.params.id)
        isLoad.value = false
    }
})

function fileChange(file) {
    if (!file) {
        dataArticle.file = pageType.value === 'edit' ? getArticle.value.file : null
    } else {
        dataArticle.file = file
    }
}

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
            saveArticle.value = true
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
            saveArticle.value = true
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
    dataArticle.type = 'article'
    dataArticle.file = null
}

function setUser() {
    if (pageType.value === 'edit') {
        if (getUser.value?.id == getArticle.value?.author?.id) {
            dataArticle.author = getUser.value?.id
        } else {
            dataArticle.author = getArticle.value?.author?.id
        }
    } else {
        dataArticle.author = getUser.value?.id
    }
}

watch(getUser, () => {
    setUser()
})

watch(getIsSuccess, (val) => {
    saveArticle.value = false
    val === 'add' && resetData()
})
watch(
    getArticle,
    () => {
        isLoad.value = true
        dataArticle.title = getArticle.value.title
        dataArticle.article = getArticle.value.article
        dataArticle.type = getArticle.value.type
        dataArticle.file = getArticle.value.file
        dataArticle.author = getArticle.value.author.id
    },
    { deep: true }
)
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

.error-text {
    color: $red !important;
}
</style>
