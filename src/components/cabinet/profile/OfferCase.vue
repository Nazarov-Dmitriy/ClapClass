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
                    for="name"
                >Название</label>
                <input
                    id="name"
                    v-model="formData.name"
                    placeholder="Введите название"
                    class="border-solid rounded-3xl border-fonLight p-4 box-border"
                    type="text"
                >
                <p
                    v-if="errors.name"
                    class="text-red text-sm"
                >
                    {{ errors.name }}
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <label
                    class="font-medium text-base text-gray"
                    for="type"
                >Тип разминки</label>
                <input
                    id="type"
                    v-model="formData.type"
                    placeholder="Введите тип разминки"
                    class="border-solid rounded-3xl border-fonLight p-4 box-border"
                    type="text"
                >
                <p
                    v-if="errors.type"
                    class="text-red text-sm"
                >
                    {{ errors.type }}
                </p>
            </div>
        </div>
        <div>
            <p class="font-medium text-[16px] leading-[20px] text-gray">
                Загрузите файл
            </p>
            <div
                class="border border-dashed border-gray rounded-[20px] p-[8px_16px] box-border flex flex-col justify-center items-center gap-2"
                @dragover.prevent="onDragOver"
                @drop.prevent="onFileDrop"
            >
                <div
                    class="flex gap-4 justify-center items-end cursor-pointer"
                    @click="addFile"
                >
                    <img
                        src="/public/icons/cabinet/profile/download.svg"
                        alt="download icon"
                    >
                    <h3 class="font-normal text-[20px] leading-[150%] text-orange">
                        Выберите файл
                    </h3>
                    <input
                        ref="fileInput"
                        type="file"
                        class="hidden"
                        accept=".pdf,.docx,.png,.jpg"
                        @change="onFileChange"
                    >
                </div>
                <p
                    v-if="file"
                    class="font-normal text-[14px] leading-[150%] text-center text-gray"
                >
                    Выбран файл: {{ file.name }}
                </p>
                <p class="font-normal text-[14px] leading-[150%] text-center text-gray">
                    Чтобы начать загрузку, выберите файлы на компьютере или перетащите их в это
                    окно.
                </p>
                <p class="font-normal text-[14px] leading-[150%] text-center text-gray">
                    Максимальный размер файлов 125 MB
                </p>
            </div>
        </div>
        <BtnComponentOrange
            emit-name="action"
            class="mx-auto"
            @action="validateAndSubmit"
        >
            Предложить кейс
        </BtnComponentOrange>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import BtnComponentOrange from '../../btns/BtnComponentOrange.vue'
import TitleComponent from '../../UI/TitleComponent.vue'

const fileInput = ref(null)
const file = ref(null)

const formData = ref({
    name: '',
    type: ''
})
const errors = ref({
    name: '',
    type: ''
})

function addFile () {
    fileInput.value.click()
}

function onFileChange (event) {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.size <= 125 * 1024 * 1024) {
        file.value = selectedFile
    } else {
        alert('Файл слишком большой. Максимальный размер 125 MB.')
    }
}

function onFileDrop (event) {
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.size <= 125 * 1024 * 1024) {
        file.value = droppedFile
    } else {
        alert('Файл слишком большой. Максимальный размер 125 MB.')
    }
}

function onDragOver (event) {
    event.dataTransfer.dropEffect = 'copy'
}

function validateForm () {
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

function validateAndSubmit () {
    if (validateForm()) {
        alert('Кейс отправлен')
        console.log('Данные формы:', formData.value)
        console.log('Выбранный файл:', file.value)
    }
}
</script>
