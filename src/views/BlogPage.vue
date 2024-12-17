<template>
    <div class="page">
        <HeaderComponent />
        <PreviewBlog />
        <div class="blog__main">
            <SearchPanel
                v-model:search="panel.search"
                v-model:sort="panel.sort"
                v-model:video="panel.video"
                v-model:article="panel.article"
                :option="option"
                @search="search()"
            />
            <ListArticle :data="data" :search="panel.search" />
        </div>
        <FooterComponent />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import PreviewBlog from '../components/blog/PreviewBlog.vue'
import HeaderComponent from '../components/header/HeaderComponent.vue'
import SearchPanel from '../components/search/SearchPanel.vue'
import ListArticle from '../components/blog/ListArticle.vue'
import FooterComponent from '../components/main/FooterComponent.vue'
import { getAll } from '../db/db.js'

const dataAll = ref([])
const data = ref([])

const panel = reactive({
    search: '',
    sort: '',
    video: false,
    article: false
})

const option = ['Cначала новые', 'Сначала ранние']

onMounted(() => {
    dataAll.value = [...getAll()]
    data.value = dataAll.value
})

function search() {
    data.value = dataAll.value.filter((el) => {
        return el.title.toLocaleLowerCase().includes(panel.search.toLocaleLowerCase())
    })
}

onMounted(() => {
    dataAll.value = [...getAll()]
    data.value = dataAll.value
})

watch(
    () => panel.search,
    (newVal) => {
        if (newVal.trim() == '') {
            data.value = dataAll.value
        }
    },
    { deep: true }
)
</script>
<style scoped lang="scss">
.page {
    min-height: 100vh;
    overflow: hidden;
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
