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
                    for="offerName"
                    >Название</label
                >
                <input
                    id="offerName"
                    v-model="formData.name"
                    placeholder="Введите название"
                    class="border border-solid rounded-3xl border-fonLight p-4 box-border autofill"
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
                    class="border border-solid rounded-3xl border-fonLight p-4 box-border autofill"
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
                    <img src="/icons/cabinet/profile/download.svg" alt="download icon" />
                    <h3 class="font-normal text-[20px] leading-[150%] text-orange">
                        Выберите файл
                    </h3>
                    <input
                        ref="fileInput"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf,.docx,.png,.jpg,.zip,.rar,.7zip"
                        @change="onFileChange"
                    />
                </div>
                <div
                    v-for="(file, ind) in files"
                    :key="ind"
                    class="flex justify-between items-center w-full"
                >
                    <p class="font-normal text-[14px] leading-[150%] text-center text-gray">
                        {{ file.name }}
                    </p>
                    <button class="w-4 h-5 hover:text-[#e05704]" @click="removeFile(ind)">
                        <CloseSvg></CloseSvg>
                    </button>
                </div>

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
            <p v-if="errors.file" class="error-text flex gap-1">
                <ErrorSvg clip="w-5 h-5"></ErrorSvg> {{ errors.file }}
            </p>
        </div>
        <BtnComponentOrange
            emit-name="action"
            class="mx-auto"
            :disable="fileLoad || sendForm || fileSize / (1024 * 1024) > 35"
            @action="validateAndSubmit"
        >
            Предложить кейс
        </BtnComponentOrange>
    </div>
    <Teleport to="body">
        <ModalComponent :visible="modal" class="">
            <template #header>
                <ModalHeader :class="{ success: getIsSuccess }" @close-modal="toggleAskModal">
                    Спасибо за сообщение!
                </ModalHeader>
            </template>
        </ModalComponent>
    </Teleport>
</template>

<script setup>
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'
import ErrorSvg from '@/assets/icons/error.svg?component'
import { computed, onMounted, ref, watch } from 'vue'
import BtnComponentOrange from '@/components/ui/btns/BtnComponentOrange.vue'
import TitleComponent from '../../ui/TitleComponent.vue'
import { useSendMessageStore } from '@/stores/sendMessageStore'
import { useUserStore } from '@/stores/userStore'
import ModalHeader from '@/components/modal/ModalHeader.vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import CloseSvg from '@/assets/icons/close.svg?component'

const sendMessageStore = useSendMessageStore()
const userStore = useUserStore()
const getIsSuccess = computed(() => sendMessageStore.getIsSuccess)
const getUser = computed(() => userStore.getUser)

const fileInput = ref(null)
const files = ref([])
const fileSize = ref(0)
const fileLoad = ref(false)
const sendForm = ref(false)
const modal = ref(false)

const formData = ref({
    name: '',
    type: ''
})
const errors = ref({
    name: '',
    type: '',
    size: '',
    file: ''
})

onMounted(() => {
    sendMessageStore.setIsSuccess(null)
})

function addFile() {
    fileInput.value.click()
}

function toggleAskModal() {
    modal.value = !modal.value
}

function onFileChange(event) {
    fileLoad.value = true
    const inputFiles = event.target.files

    if (inputFiles.length > 0) {
        const promises = [...inputFiles].map((file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader()
                fileReader.onload = (e) => {
                    if (e.target?.result) {

                        resolve(file)
                        files.value.push(file)
                        fileSize.value = fileSize.value + file.size
                    }
                }
                fileReader.onabort = () => {
                    reject(new Error('Загрузка файла прекращена'))
                }
                fileReader.onerror = () => {
                    reject(new Error('Ошибка при чтение файла'))
                }
                fileReader.readAsDataURL(file)
            })
        })
        Promise.all(promises).finally(() => {
            fileLoad.value = false
        })
    }
}

function onFileDrop(event) {
    fileLoad.value = true
    const inputFiles = event.dataTransfer.files
    if (inputFiles.length > 0) {
        const promises = [...inputFiles].map((file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader()
                fileReader.onload = (e) => {
                    if (e.target?.result) {
                        resolve(file)
                        files.value.push(file)
                        fileSize.value = fileSize.value + file.size
                    }
                }
                fileReader.onabort = () => {
                    reject(new Error('Загрузка файла прекращена'))
                }
                fileReader.onerror = () => {
                    reject(new Error('Ошибка при чтение файла'))
                }
                fileReader.readAsDataURL(file)
            })
        })
        Promise.all(promises).finally(() => {
            fileLoad.value = false
        })
    }
}

function onDragOver(event) {
    event.dataTransfer.dropEffect = 'copy'
}
function removeFile(id) {
    files.value = files.value.filter((file, ind) => {
        ind === id ? (fileSize.value = fileSize.value - file.size) : null
        return ind !== id
    })
}

function validateForm() {
    let isValid = true
    errors.value.name = ''
    errors.value.type = ''
    errors.value.file = ''

    if (!formData.value.name.trim()) {
        errors.value.name = 'Название обязательно для заполнения.'
        isValid = false
    }
    if (!formData.value.type.trim()) {
        errors.value.type = 'Тип разминки обязателен для заполнения.'
        isValid = false
    }
    if (files.value.length === 0) {
        errors.value.file = 'Обязательное поле'
        isValid = false
    }

    return isValid
}

function resetForm() {
    files.value = []
    fileLoad.value = false
    formData.value.name = ''
    formData.value.type = ''
    sendForm.value = false
}

function validateAndSubmit() {
    if (validateForm()) {
        let resFormData = new FormData()

        if (files.value.length > 0) {
            resFormData.append('name', getUser?.value?.name)
            resFormData.append('email', getUser?.value?.email)
            resFormData.append('title', formData.value.name)
            resFormData.append('type', formData.value.type)
            files.value.forEach((file) => {
                resFormData.append('files', file)
            })
            sendMessageStore.sendOfferMaterial(resFormData)
            sendForm.value = true
        }
    }
}

watch(getIsSuccess, (val) => {
    if (val === 'send-case') {
        resetForm()
        toggleAskModal()
    }
})
</script>
