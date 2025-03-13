<template>
    <CabinetLayout>
        <PanelComponent v-model:search="panel.search" @search="search()" />
        <div class="flex grow">
            <SidebarComponent />
            <div class="flex flex-col gap-6 content-container">
                {{ panel }}
                <SearchPanel
                    v-model:sort="panel.sort"
                    v-model:type="panel.type"
                    :option="option"
                    @search="search()"
                />
                <div class="">
                    <div v-if="data" class="cards-container">
                        <ListArticle :data="data" class="22" />
                    </div>

                    <div v-else class="article-container">
                        <div class="flex flex-col gap-14">
                            <div class="flex justify-center">
                                <h3
                                    class="w-[564px] text-center font-bold text-[24px] leading-[150%] text-[#DE4700]"
                                    style="font-family: 'CenturyGothic'"
                                >
                                    Здесь будут отображаться добавленные в избранное статьи из блога
                                </h3>
                            </div>
                            <div class="flex justify-center">
                                <div class="w-max">
                                    <img
                                        src="/images/cabinet/article/article-hero.png"
                                        alt="hero"
                                    />
                                </div>
                                <div class="relative z-[1]">
                                    <div
                                        class="shadow-[0_16px_2px_rgba(14,8,6,0.15)] w-[458px] p-[16px] bg-white rounded-[16px]"
                                    >
                                        <p
                                            class="font-normal text-[20px] leading-[150%] text-center text-black relative z-[3]"
                                        >
                                            Перейдите в верхнем меню в раздел
                                            <router-link
                                                to="/blog"
                                                class="text-orange underline underline-offset-4 decoration-1"
                                                >«Блог»</router-link
                                            >

                                            откройте понравившуюся статью и нажмите внизу статьи
                                            кнопку «Добавить в избранное»
                                        </p>
                                    </div>
                                    <img
                                        class="absolute top-[87px] left-[-21px] z-[2]"
                                        src="/images/cabinet/article/article-hero-text.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CabinetLayout>
</template>

<script setup>
import PanelComponent from '/src/components/cabinet/panel/PanelComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useArticleStore } from '@/stores/articleStore'
import { useUserStore } from '@/stores/userStore'
import ListArticle from '@/components/blog/ListArticle.vue'
import SearchPanel from '@/components/search/SearchPanel.vue'

const articleStore = useArticleStore()
const userStore = useUserStore()
const data = ref()
const panel = reactive({
    search: '',
    sort: '',
    type: null
})

const option = [
    { label: 'Cначала новые', value: 'DESC' },
    { label: 'Сначала ранние', value: 'ASC' }
]

const getUser = computed(() => {
    return userStore.getUser
})

const getArticleList = computed(() => {
    return articleStore.getArticleList
})

onMounted(() => {
    if (getUser.value) {
        articleStore.getArticleFavoriteListDb({
            search: panel.search,
            user_id: getUser?.value.id,
            sort: panel.sort,
            type: panel.type
        })
    }
})

function search() {
    articleStore.getArticleFavoriteListDb({
        search: panel.search,
        user_id: getUser?.value.id,
        sort: panel.sort,
        type: panel.type
    })
}

watch(
    () => panel.search,
    (newVal) => {
        if (newVal.trim() == '') {
            articleStore.getArticleFavoriteListDb({
                search: panel.search,
                user_id: getUser?.value.id
            })
        }
    }
)

watch(getArticleList, () => {
    data.value = getArticleList.value
})

watch([() => panel.type, () => panel.sort], () => {
    articleStore.getArticleListDb({ search: panel.search, sort: panel.sort, type: panel.type })
})
watch(getUser, () => {
    articleStore.getArticleFavoriteListDb({
        search: panel.search,
        user_id: getUser?.value.id,
        sort: panel.sort,
        type: panel.type
    })
})
</script>

<style lang="scss" scoped>
.content-container {
    padding: 24px 64px;
    background-image: url(/images/servecies/warm-up/bg-img.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    width: 100%;

    :deep(.blog__search) {
        display: none;
    }
}

.article-container {
    padding: 114px 0 194px 0;
    display: flex;
    justify-content: center;
    width: 100%;
}

.cards-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;
}

:deep(.blog-article__list) {
    grid-template-columns: repeat(4, 1fr);
}

:deep(.blog__btn-panel) {
    background: $white;
}
</style>
