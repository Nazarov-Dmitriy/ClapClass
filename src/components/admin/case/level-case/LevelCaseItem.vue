<template>
    <div class="flex flex-col gap-4">
        <div v-if="editLevel" class="flex flex-col gap-2">
            <p class="">
                <span class="font-medium text-gray">Название:</span> {{ props.level?.title }}
            </p>
            <p class="">
                <span class="font-medium text-gray">Краткое описание:</span>
                {{ props.level?.description }}
            </p>
            <p class="font-medium text-gray">Фаил: {{ props.level?.file?.path.split('/')[ props.level?.file?.path.split('/').length -1] }}</p>
        </div>
        <LevelCaseItemEdit
            v-else
            :id="props.id "
            :level="level"
            @cansel="editLevel = true"
        ></LevelCaseItemEdit>

        <div class="flex gap-4">
            <BtnComponent
                v-if="editLevel"
                emit-name="action"
                class="w-fit"
                current-class="!text-base"
                @action="editLevel = !editLevel"
            >
                Редактировать
            </BtnComponent>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import LevelCaseItemEdit from './LevelCaseItemEdit.vue'

const editLevel = ref(true)

const props = defineProps({
    id: {
        type: Number,
        default: null
    },
    level: {
        type: Object,
        default: new Object()
    }
})

</script>
<style lang="scss"></style>
