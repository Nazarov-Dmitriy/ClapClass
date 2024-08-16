<template>
    <div class="page">
        <HeaderComponent />
        <SliderCooperation />
        <InterestingComponent />
        <FooterComponent />
    </div>
</template>

<script setup>
import InterestingComponent from '../components/cooperation/InterestingComponent.vue'
import SliderCooperation from '../components/cooperation/SliderCooperation.vue'
import HeaderComponent from '../components/header/HeaderComponent.vue'
import FooterComponent from '../components/main/FooterComponent.vue'
</script>
<style scoped lang="scss">
.page {
    min-height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 88px;
}
</style>
