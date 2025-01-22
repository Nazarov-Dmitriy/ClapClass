<template>
    <LoginComponent
        :open="currentModal === 'login'"
        :close="closeModal"
        @change-modal="toggleModal"
    ></LoginComponent>
    <RegisterComponent
        :open="currentModal === 'register'"
        :close="closeModal"
        @change-modal="toggleModal"
    ></RegisterComponent>
    <ForGotPasswordComponent
        :open="currentModal === 'for-got-password'"
        :close="closeModal"
    ></ForGotPasswordComponent>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'

import ForGotPasswordComponent from './ForGotPasswordComponent.vue'
import LoginComponent from './LoginComponent.vue'
import RegisterComponent from './RegisterComponent.vue'

const props = defineProps({
    modal: {
        type: String,
        default: ''
    }
})

const currentModal = ref('')
const emit = defineEmits(['close'])

onMounted(() => {
    currentModal.value = props.modal
})

onUnmounted(() => {
    currentModal.value = ''
})

const toggleModal = (value) => {
    currentModal.value = value
}

function closeModal() {
    currentModal.value = ''
    emit('close')
}

watch(
    () => props.modal,
    (val) => {
        currentModal.value = val
    }
)
</script>
