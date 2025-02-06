<template>
    <ContnentLayout>
        <div class="py-4">
            <DropdownComponent
                v-model:model-value="contentPage"
                :options="contentArr"
                class="!w-fit !rounded-xl"
                options-class="!rounded-xl !top-[50px]"
            />
        </div>
        <div v-if="component">
            <component :is="component" />
        </div>
    </ContnentLayout>
</template>
<script setup>
import ArticlesAdmin from '@/components/admin/ArticlesAdmin.vue'
import DropdownComponent from '@/components/ui/dropdown/DropdownComponent.vue'
import ContnentLayout from '@/layouts/ContnentLayout.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, ref, watch } from 'vue'

const contentArr = [
    { label: 'Статья', value: 'article' },
    { label: 'Статья', value: 'article' }
]

const component = computed(() => {
    let currentComponent
    switch (contentPage.value) {
        case 'article':
            currentComponent = ArticlesAdmin
            break
        // case 'Papayas':
        //     // expected output: "Mangoes and papayas are $2.79 a pound."
        //     break
        default:
            ArticlesAdmin
    }
    return currentComponent
})

const contentPage = ref('article')

const userStore = useUserStore()
const getUser = computed(() => {
    return userStore.getUser
})

watch(getUser, () => {})
</script>
<style lang="scss"></style>
