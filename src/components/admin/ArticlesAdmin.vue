<template>
    <div class="flex flex-col gap-4 mb-12">
        <BtnComponentOrange
            class="blog__btn-panel w-fit"
            emit-name="action"
            @action="$router.push('/blog/create')"
        >
            Добавить статью
        </BtnComponentOrange>
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
import BtnComponentOrange from '@/components/ui/btns/BtnComponentOrange.vue'

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
    articleStore.getArticleListDb({
        search: panel.search,
        sort: panel.sort,
        type: panel.type,
        enablePublished: true
    })
})

function search() {
    articleStore.getArticleListDb({
        search: panel.search,
        sort: panel.sort,
        type: panel.type,
        enablePublished: true
    })
}

watch(
    () => panel.search,
    (newVal) => {
        if (newVal.trim() == '') {
            articleStore.getArticleListDb({
                search: panel.search,
                sort: panel.sort,
                type: panel.type,
                enablePublished: true
            })
        }
    },
    { deep: true }
)

watch(getArticleList, () => {
    data.value = getArticleList.value
})

watch([() => panel.type, () => panel.sort], () => {
    articleStore.getArticleListDb({
        search: panel.search,
        sort: panel.sort,
        type: panel.type,
        enablePublished: true
    })
})

watch(getIsSuccess, (val) => {
    if (val === 'remove') {
        articleStore.getArticleListDb({
            search: panel.search,
            sort: panel.sort,
            type: panel.type,
            enablePublished: true
        })
    }
})
</script>
<style lang="scss"></style>
