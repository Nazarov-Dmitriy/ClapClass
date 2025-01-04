<script setup lang="ts">
import { ref } from 'vue'
import BtnComponentOrange from '../../btns/BtnComponentOrange.vue'
import AvatarUploader from './AvatarUploader.vue'
import PersonalInputs from './PersonalInputs.vue'
const personalInputsRef = ref()

function submitForm () {
    personalInputsRef.value.validateForm()
}
</script>

<template>
    <div class="lk__main">
        <div class="lk__main-personal">
            <div class="lk-wrapper">
                <AvatarUploader />
                <PersonalInputs ref="personalInputsRef" />
            </div>
            <BtnComponentOrange
                class="mx-auto mt-4"
                emit-name="action"
                @action="submitForm"
            >
                Сохранить изменения
            </BtnComponentOrange>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lk__main {
    padding: 16px 64px;
    box-sizing: border-box;
}

.lk__main-personal {
    border-radius: 24px;
    padding: 16px;
    background: $fonLight;
}
.lk-wrapper {
    display: grid;
    grid-template-columns: 307px 1fr;
    gap: 24px;
}
</style>
