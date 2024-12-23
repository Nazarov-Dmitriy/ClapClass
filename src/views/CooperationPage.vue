<template>
    <div class="page">
        <HeaderComponent />
        <ArticleCooperationComponent />
        <SliderCooperation />
        <InterestingComponent />
        <SupportComponent />
        <FooterComponent />
    </div>
</template>

<script setup>
import ArticleCooperationComponent from '../components/cooperation/ArticleCooperationComponent.vue'
import InterestingComponent from '../components/cooperation/InterestingComponent.vue'
import SliderCooperation from '../components/cooperation/SliderCooperation.vue'
import SupportComponent from '../components/cooperation/SupportComponent.vue'
import HeaderComponent from '../components/header/HeaderComponent.vue'
import FooterComponent from '../components/main/FooterComponent.vue'
</script>
<style scoped lang="scss">
.page {
    min-height: 100vh;
    // overflow: hidden;
    margin: 0 auto;
}
</style>
