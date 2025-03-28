<script setup lang="ts">
import HeaderComponent from '../components/header/HeaderComponent.vue'
</script>

<template>
    <div class="page-container">
        <HeaderComponent />
        <main class="main-container">
            <slot />
        </main>
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
    min-height: 0;
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    height: 100%;
}
</style>
