<template>
    <ContnentLayout>
        <div class="flex items-center justify-center grow p-12 flex flex-col gap-4">
            <h1 class="nt__title text-center">{{ textError }}</h1>
            <BtnComponent emit-name="back" @back="$router.go(-1)"
                >Переазгрузить страницу</BtnComponent
            >
        </div>
    </ContnentLayout>
</template>
<script setup>
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import ContnentLayout from '@/layouts/ContnentLayout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const textError = computed(() => {
    let text

    switch (+route.query.status) {
        case 403:
            text = 'Недостаточно прав обратитесь к администратору'
            break
        case 500:
            text = 'Ошибка сервера'
            break
    }

    return text
})
</script>
<style lang="scss">
.nt__title {
    font-size: 48px;
    line-height: 56px;
    color: red;

    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 40px;
    }
}
</style>
