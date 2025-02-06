<template>
    <div class="rounded-3xl p-4 bg-fonLight flex flex-col gap-3 h-full">
        <TitleComponent
            class="text-center font-bold text-[24px] leading-[150%] text-orange-500"
            style="font-family: 'CenturyGothic'"
        >
            Предложить кейс
        </TitleComponent>
        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <label
                    class="font-medium text-base text-gray"
                    :class="errors?.name && 'text-red'"
                    for="name"
                >Название</label
                >
                <input
                    id="name"
                    v-model="formData.name"
                    placeholder="Введите название"
                    class="border border-solid rounded-3xl border-fonLight p-4 box-border"
                    type="text"
                    :class="errors?.name && 'border-red'"
                />
                <p v-if="errors?.name" class="text-red text-sm">
                    {{ errors.name }}
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <label
                    class="font-medium text-base text-gray"
                    :class="errors?.type && 'text-red'"
                    for="type"
                >Тип разминки</label
                >
                <input
                    id="type"
                    v-model="formData.type"
                    placeholder="Введите тип разминки"
                    class="border border-solid rounded-3xl border-fonLight p-4 box-border"
                    type="text"
                    :class="errors?.type && 'border-red'"
                />
                <p v-if="errors?.type" class="text-red text-sm">
                    {{ errors?.type }}
                </p>
            </div>
        </div>
        <div>
            <p class="font-medium text-[16px] leading-[20px] text-gray">Загрузите файл</p>
            <div
                class="border border-dashed border-gray rounded-[20px] p-[8px_16px] box-border flex flex-col justify-center items-center gap-2"
                @dragover.prevent="onDragOver"
                @drop.prevent="onFileDrop"
            >
                <div class="flex gap-4 justify-center items-end cursor-pointer" @click="addFile">
                    <img src="/public/icons/cabinet/profile/download.svg" alt="download icon" />
                    <h3 class="font-normal text-[20px] leading-[150%] text-orange">
                        Выберите файл
                    </h3>
                    <input
                        ref="fileInput"
                        type="file"
                        class="hidden"
                        accept=".pdf,.docx,.png,.jpg,.zip,.rar,.7zip"
                        @change="onFileChange"
                    />
                </div>
                <p v-if="file" class="font-normal text-[14px] leading-[150%] text-center text-gray">
                    Выбран файл: {{ file.name }}
                </p>
                <p class="font-normal text-[14px] leading-[150%] text-center text-gray">
                    Чтобы начать загрузку, выберите файлы на компьютере или перетащите их в это
                    окно.
                </p>
                <p class="font-normal text-[14px] leading-[150%] text-center text-gray">
                    Максимальный размер файлов 35 MB
                </p>
            </div>
            <div class="w-full flex items-center justify-center mt-1">
                <PulseLoader
                    :loading="fileLoad"
                    :color="'#e05704'"
                    :size="'24px'"
                    class=""
                ></PulseLoader>
            </div>

            <p v-if="errors?.size" class="text-red text-sm">
                {{ errors.size }}
            </p>
        </div>
        <BtnComponentOrange
            emit-name="action"
            class="mx-auto"
            :disable="fileLoad || sendForm"
            @action="validateAndSubmit"
        >
            Предложить кейс
        </BtnComponentOrange>
    </div>
</template>

<script setup>
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'
import { computed, onMounted, ref, watch } from 'vue'
import BtnComponentOrange from '../../btns/BtnComponentOrange.vue'
import TitleComponent from '../../ui/TitleComponent.vue'
import { useSendMessageStore } from '@/stores/sendMessageStore'
import { useUserStore } from '@/stores/userStore'

const sendMessageStore = useSendMessageStore()
const userStore = useUserStore()
const getIsSuccess = computed(() => sendMessageStore.getIsSuccess)
const getUser = computed(() => userStore.getUser)

const fileInput = ref(null)
const file = ref(null)
const fileLoad = ref(false)
const sendForm = ref(false)

const formData = ref({
    name: '',
    type: ''
})
const errors = ref({
    name: '',
    type: '',
    size: ''
})

onMounted(() => {
    sendMessageStore.setIsSuccess(null)
})

function addFile() {
    fileInput.value.click()
}

function onFileChange(event) {
    const reader = new FileReader()
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.size <= 36 * 1024 * 1024) {
        file.value = selectedFile
        errors.value.size = null
        fileLoad.value = true
        chanfeListenersFile(reader)
        reader.readAsArrayBuffer(selectedFile)
    } else {
        errors.value.size = 'Файл слишком большой. Максимальный размер 35 MB.'
    }
}

function chanfeListenersFile(reader) {
    reader.addEventListener('load', handleEvent)
    reader.addEventListener('error', handleEvent)
    reader.addEventListener('abort', handleEvent)
}

function handleEvent(event) {
    if (event.type === 'load') {
        setTimeout(() => {
            fileLoad.value = false
        }, 5000)
    } else if (event.type === 'error' || event.type === 'abort') {
        errors.value.size = 'Ошибка'
    }
}

function onFileDrop(event) {
    const reader = new FileReader()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.size <= 36 * 1024 * 1024) {
        file.value = droppedFile
        errors.value.size = null
        fileLoad.value = true
        chanfeListenersFile(reader)
        reader.readAsArrayBuffer(droppedFile)
    } else {
        errors.value.size = 'Файл слишком большой. Максимальный размер 35 MB.'
    }
}

function onDragOver(event) {
    event.dataTransfer.dropEffect = 'copy'
}

function validateForm() {
    let isValid = true
    errors.value.name = ''
    errors.value.type = ''

    if (!formData.value.name.trim()) {
        errors.value.name = 'Название обязательно для заполнения.'
        isValid = false
    }
    if (!formData.value.type.trim()) {
        errors.value.type = 'Тип разминки обязателен для заполнения.'
        isValid = false
    }

    return isValid
}

function resetForm() {
    file.value = null
    fileLoad.value = false
    formData.value.name = ''
    formData.value.type = ''
    sendForm.value = false
}

function validateAndSubmit() {
    if (validateForm()) {
        let resFormData = new FormData()
        if (file.value) {
            resFormData.append('name', getUser?.value?.name)
            resFormData.append('email', getUser?.value?.email)
            resFormData.append('title', formData.value.name)
            resFormData.append('type', formData.value.type)
            resFormData.append('file', file.value)
            sendMessageStore.sendOfferMaterial(resFormData)
            sendForm.value = true
        }
    }
}

watch(getIsSuccess, (val) => {
    if (val === 'send-case') {
        resetForm()
    }
})
</script>
