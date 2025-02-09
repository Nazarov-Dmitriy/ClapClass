<template>
    <ContnentLayout>
        <div class="admin-container">
            <div>
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
        </div>
    </ContnentLayout>
</template>
<script setup>
import ArticlesAdmin from '@/components/admin/ArticlesAdmin.vue'
import ReviewsAdmin from '@/components/admin/reviews/ReviewsAdmin.vue'
import DropdownComponent from '@/components/ui/dropdown/DropdownComponent.vue'
import ContnentLayout from '@/layouts/ContnentLayout.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, ref, watch } from 'vue'

const contentArr = [
    { label: 'Статья', value: 'article' },
    { label: 'Отзывы', value: 'reviews' }
]

const component = computed(() => {
    let currentComponent
    switch (contentPage.value) {
        case 'article':
            currentComponent = ArticlesAdmin
            break
        case 'reviews':
            currentComponent = ReviewsAdmin
            break
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
<style lang="scss">
.admin-container {
    padding: 20px 64px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: $lg) {
        padding: 20px 32px;
    }
    @media (max-width: $sm) {
        padding: 20px 16px;
    }
}
</style>
