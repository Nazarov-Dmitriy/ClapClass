<script setup lang="ts">
import HeaderComponent from '../components/header/HeaderComponent.vue'
import FooterComponent from '../components/main/FooterComponent.vue'
</script>

<template>
    <div class="page-container page">
        <HeaderComponent />
        <main class="main-container">
            <slot />
        </main>
        <FooterComponent />
    </div>
</template>

<style lang="scss" scoped>
.page-container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-container {
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
}
</style>
