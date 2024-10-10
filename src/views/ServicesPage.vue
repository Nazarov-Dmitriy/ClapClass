<script setup lang="ts">
import ServeciesComponent from '../components/services/ServeciesComponent.vue'
import TestComponent from '../components/services/TestComponent.vue'
import MainLayout from '../layouts/MainLayout.vue'
</script>

<template>
    <MainLayout>
        <div class="page">
            <TestComponent />
        </div>
    </MainLayout>
</template>

<style lang="scss" scoped>
.page {
    max-width: 1440px;
    margin: 0 auto;
    margin-top: 90px;
}
</style>
