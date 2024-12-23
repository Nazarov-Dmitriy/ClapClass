<template>
    <div class="page">
        <HeaderComponent />
        <ArticleComponent
            :article="article"
            :other-atricle="otherAtricle"
            :navigation="navigation"
        />
        <FooterComponent />
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import ArticleComponent from '../components/article/ArticleComponent.vue';
import HeaderComponent from '../components/header/HeaderComponent.vue';
import FooterComponent from '../components/main/FooterComponent.vue';
import  { getById , randomArticle,getSiblingCard}  from '../db/db.js';   
import { onMounted, ref, watch } from 'vue';

const route = useRoute()
const articleId = ref()
const article = ref()
const navigation = ref()
const otherAtricle = ref([])

onMounted(()=>{
    articleId.value =+route.params.id
    getArticle()
    getOtherAtricle()
})

function getArticle (){
    let data = getById(articleId.value);
    navigation.value = getSiblingCard(articleId.value)
    article.value =data[0] 
}

function getOtherAtricle (){
    otherAtricle.value = randomArticle(articleId.value , 4);
}

watch(() => route.params, (newVal) => {
    articleId.value = +newVal.id
    getArticle()
    getOtherAtricle ()
}, { deep: true })

</script>
<style lang="scss">
.page {
    min-height: 100vh;
    // overflow: hidden;
    margin: 0 auto;
}
</style>