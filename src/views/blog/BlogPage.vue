<template>
    <div class="page">
        <HeaderComponent />
        <PreviewBlog />
        <div class="blog__main">
            <SearchPanel
                v-model:search="panel.search"
                v-model:sort="panel.sort"
                v-model:type="panel.type"
                :option="option"
                @search="search()"
            />
            <ListArticleEmpty v-if="!data"></ListArticleEmpty>
            <ListArticle v-else :data="data" />
        </div>
        <FooterComponent />
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import PreviewBlog from '@/components/blog/PreviewBlog.vue'
import FooterComponent from '@/components/main/FooterComponent.vue'
import SearchPanel from '@/components/search/SearchPanel.vue'
import ListArticle from '@/components/blog/ListArticle.vue'
import { useArticleStore } from '@/stores/articleStore'
import ListArticleEmpty from '@/components/blog/ListArticleEmpty.vue'

const articleStore = useArticleStore()

const data = ref(null)

const panel = reactive({
    search: '',
    sort: '',
    type: null
})

const option = [
    { label: 'Cначала новые', value: 'DESC' },
    { label: 'Сначала ранние', value: 'ASC' }
]

const getArticleList = computed(() => {
    return articleStore.getArticleList
})

onMounted(() => {
    articleStore.getArticleListDb({ search: panel.search, sort: panel.sort, type: panel.type })
})

function search() {
    articleStore.getArticleListDb({ search: panel.search, sort: panel.sort, type: panel.type })
}

watch(
    () => panel.search,
    (newVal) => {
        if (newVal.trim() == '') {
            articleStore.getArticleListDb({
                search: panel.search,
                sort: panel.sort,
                type: panel.type
            })
        }
    },
    { deep: true }
)

watch(getArticleList, () => {
    data.value = getArticleList.value
})

watch([() => panel.type, () => panel.sort], () => {
    articleStore.getArticleListDb({ search: panel.search, sort: panel.sort, type: panel.type })
})
</script>
<style scoped lang="scss">
.page {
    min-height: 100vh;
    margin: 0 auto;
}

.blog__main {
    max-width: 1920px;
    margin: 0 auto;
    padding: 48px 64px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 48px;

    @media (max-width: $lg) {
        padding: 48px 16px;
    }

    @media (max-width: $sm) {
        padding: 24px 16px;
    }
}
</style>
