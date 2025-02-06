<template>
    <div class="flex flex-col gap-4 mb-12">
        <SearchPanel
            v-model:search="panel.search"
            v-model:sort="panel.sort"
            v-model:type="panel.type"
            :option="option"
            @search="search()"
        />
        <ListArticleEmpty v-if="!data"></ListArticleEmpty>
        <ListArticle v-else :data="data" :editing="true" />
    </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import SearchPanel from '../search/SearchPanel.vue'
import ListArticleEmpty from '../blog/ListArticleEmpty.vue'
import ListArticle from '../blog/ListArticle.vue'
import { useArticleStore } from '@/stores/articleStore'

const articleStore = useArticleStore()
const panel = reactive({
    search: '',
    sort: '',
    type: null
})

const option = [
    { label: 'Cначала новые', value: 'DESC' },
    { label: 'Сначала ранние', value: 'ASC' }
]

const getIsSuccess = computed(() => {
    return articleStore.getIsSuccess
})

const data = ref()

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

watch(getIsSuccess, (val) => {
    if (val === 'remove') {
        articleStore.getArticleListDb({ search: panel.search, sort: panel.sort, type: panel.type })
    }
})
</script>
<style lang="scss"></style>
