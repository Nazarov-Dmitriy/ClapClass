<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <LabelField for="name" :error="getErrors?.name">Название </LabelField>
                <InputField
                    v-model="social.name"
                    input-id="name"
                    placeholder="vk"
                    type="text"
                    :error="getErrors?.name"
                    :error-text="getErrors?.name || 'Обязательное поле'"
                ></InputField>
            </div>
            <div class="flex flex-col gap-2">
                <LabelField for="link" :error="getErrors?.link">Ссылка </LabelField>
                <InputField
                    v-model="social.link"
                    input-id="link"
                    placeholder="https://vk.com"
                    type="text"
                    :error="getErrors?.link"
                    :error-text="getErrors?.link || 'Обязательное поле'"
                ></InputField>
            </div>
        </div>

        <BtnComponent emit-name="action" class="w-fit" @action="save"> Сохранить </BtnComponent>
    </div>
</template>
<script setup>
import BtnComponent from '@/components/btns/BtnComponent.vue'
import InputField from '@/components/ui/form/input/InputField.vue'
import LabelField from '@/components/ui/form/label/LabelField.vue'
import { useSocialStore } from '@/stores/socialStore'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, reactive, watch } from 'vue'

const socialStore = useSocialStore()

const getSuccses = computed(() => {
    return socialStore.getIsSuccess
})

const getErrors = computed(() => {
    return socialStore.getErrors
})

const social = reactive({
    name: null,
    link: null
})

function save() {
    socialStore.add(social)
}

watch(getSuccses, (val) => {
    if (val === 'add')
        for (let key in social) {
            social[key] = null
        }
})
</script>

<style lang="scss" scoped>
.error-text {
    color: $red !important;
}

.data-picker {
    --dp-input-padding: 10px 16px;
    --dp-border-radius: 32px;
    --dp-border-color: none;
    --dp-font-size: 16px;
    --dp-text-color: $black;
    --dp-icon-color: $black;
    --dp-menu-min-width: 300px;
    --dp-action-row-padding: 12px 20px;

    :deep(.dp__input_wrap) {
        &:hover,
        &:active,
        &:focus {
            border: 2px solid $gray;
        }
    }

    :deep(.dp__pointer) {
        height: 48px;
    }

    &.error {
        :deep(.dp__input_wrap) {
            border: 2px solid red;
            border-radius: 32px;
        }
    }

    :deep(.dp__input_wrap) {
        border: 2px solid $gray;
        border-radius: 32px;
    }
}
</style>
