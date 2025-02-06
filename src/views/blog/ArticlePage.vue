<template>
    <div class="page">
        <HeaderComponent />
        <ArticleComponent
            :article="getArticle"
            :other-atricle="getRandomArticle"
            :navigation="navigation"
            :subling-id="getArticleSiblingId"
            :user="getUser"
        />
        <FooterComponent />
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import ArticleComponent from '@/components/article/ArticleComponent.vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterComponent from '@/components/main/FooterComponent.vue'
import { useArticleStore } from '@/stores/articleStore'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const route = useRoute()
const articleId = ref()
const navigation = ref()
const articleStore = useArticleStore()
const getArticleSiblingId = computed(() => {
    return articleStore.getArticleSiblingId
})
const getRandomArticle = computed(() => {
    return articleStore.getRandomArticle
})
const getUser = computed(() => {
    return userStore.getUser
})

onMounted(() => {
    articleId.value = +route.params.id
    articleStore.setShow(articleId.value)
    articleStore.getArticleDb(articleId.value)
    articleStore.getArticleSiblingIdDb(articleId.value)
    articleStore.getRandomArticlesDb({ id: articleId.value })
    if (getUser.value) {
        articleStore.getFavorite({ article_id: articleId.value, user_id: getUser.value.id })
    }
})

const getArticle = computed(() => {
    return articleStore.getArticle
})

watch(getUser, () => {
    articleStore.getFavorite({
        article_id: articleId.value,
        user_id: getUser.value.id
    })
})

watch(
    () => route.params,
    (newVal) => {
        articleId.value = +newVal.id
        articleStore.getArticleDb(articleId.value)
        articleStore.getArticleSiblingIdDb(articleId.value)
        articleStore.setShow(articleId.value)
        articleStore.getRandomArticlesDb({ id: articleId.value })
        if (getUser.value) {
            articleStore.getFavorite({ article_id: articleId.value, user_id: getUser.value.id })
        }
    },
    { deep: true }
)
</script>
<style lang="scss">
.page {
    min-height: 100vh;
    margin: 0 auto;
}
</style>
