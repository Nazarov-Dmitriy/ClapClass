<script setup lang="ts">
import AchievementComponent from '../components/about/AchievementComponent.vue'
import AcquaintComponent from '../components/about/AcquaintComponent.vue'
import ChangeComponent from '../components/about/ChangeComponent.vue'
import InformationComponent from '../components/about/InformationComponent.vue'
import ProblemsComponent from '../components/about/ProblemsComponent.vue'
import SupportComponent from '../components/about/SupportComponent.vue'
import MainLayout from '../layouts/MainLayout.vue'
</script>

<template>
    <MainLayout>
        <AcquaintComponent />
        <InformationComponent />
        <SupportComponent />
        <ProblemsComponent />
        <AchievementComponent />
        <ChangeComponent />
    </MainLayout>
</template>
