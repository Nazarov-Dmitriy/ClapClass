<script setup lang="ts">
import AchievementComponent from '../components/about/AchievementComponent.vue'
import AcquaintComponent from '../components/about/AcquaintComponent.vue'
import InformationComponent from '../components/about/InformationComponent.vue'
import SupportComponent from '../components/about/SupportComponent.vue'
import MainLayout from '../layouts/MainLayout.vue'
</script>

<template>
    <MainLayout>
        <AcquaintComponent />
        <InformationComponent />
        <SupportComponent />
        <AchievementComponent />
    </MainLayout>
</template>
