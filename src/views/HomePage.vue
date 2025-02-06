<template>
    <div>
        <HeaderComponent />
        <AboutComponent />
        <ObjectiveComponent />
        <SliderComponent />
        <StudentComponent />
        <TeacherComponent />
        <ProjectComponent />
        <ReviewsComponent />
        <NewsComponent :data="data" />
        <FaqComponent />
        <FormComponent />
        <FooterComponent />
    </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import HeaderComponent from '../components/header/HeaderComponent.vue'
import AboutComponent from '../components/main/AboutComponent.vue'
import ObjectiveComponent from '../components/main/ObjectiveComponent.vue'
import ProjectComponent from '../components/main/ProjectComponent.vue'
import ReviewsComponent from '../components/main/ReviewsComponent.vue'
import TeacherComponent from '../components/main/TeacherComponent.vue'
import StudentComponent from '../components/main/StudentComponent.vue'
import NewsComponent from '../components/main/NewsComponent.vue'
import FaqComponent from '../components/main/FaqComponent.vue'
import FormComponent from '../components/form/FormComponent.vue'
import SliderComponent from '../components/main/SliderComponent.vue'
import FooterComponent from '../components/main/FooterComponent.vue'
import { useArticleStore } from '@/stores/articleStore'

const articleStore = useArticleStore()
const data = ref([])

const getArticleList = computed(() => {
    return articleStore.getArticleList
})

onMounted(() => {
    articleStore.getArticleListDb({ limit: 3, sort: 'DESC' })
})

watch(getArticleList, () => {
    data.value = getArticleList.value
})
</script>
<style lang="scss"></style>
