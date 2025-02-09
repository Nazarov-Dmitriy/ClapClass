<template>
    <div class="blog-article__container">
        <div v-if="renderList.length > 0" class="blog-article__list">
            <CardComponent
                v-for="el in renderList"
                :key="el.id"
                :data="el"
                :editing="props.editing"
                @link="linkArticle(el.id)"
            />
        </div>
        <div v-else>
            <h2 class="no-result">По запросу {{ search }} ничего не найдено.</h2>
        </div>
        <PaginationComponent
            :perpage="12"
            :data="props.data"
            :color="{ main: '#0E0806', hover: '#E05704' }"
            @set-list="getRenderList"
        />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PaginationComponent from '../pagination/PaginationComponent.vue'
import CardComponent from './CardComponent.vue'

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    search: {
        type: String,
        default: ''
    },
    editing: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()
const renderList = ref([])

function getRenderList(list) {
    renderList.value = list
}

function linkArticle(id) {
    router.push(`/blog/${id}`)
}

watch(
    () => props.data,
    () => {}
)
</script>
<style lang="scss">
.blog-article__container {
    display: flex;
    flex-direction: column;
    gap: 48px;
}

.blog-article__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: $lg) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $sm) {
        grid-template-columns: 1fr;
    }
}
</style>
