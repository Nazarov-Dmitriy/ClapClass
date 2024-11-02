<script setup lang="ts">
import AboutFeaturesComponent from '../components/about/AboutFeaturesComponent.vue'
import AchievementComponent from '../components/about/AchievementComponent.vue'
import AcquaintComponent from '../components/about/AcquaintComponent.vue'
import ChangeComponent from '../components/about/ChangeComponent.vue'
import FormatComponent from '../components/about/FormatComponent.vue'
import InformationComponent from '../components/about/InformationComponent.vue'
import ProblemsComponent from '../components/about/ProblemsComponent.vue'
import SupportComponent from '../components/about/SupportComponent.vue'
import UseComponent from '../components/about/UseComponent.vue'
import LearnPlayDevelopComponent from '../components/about/LearnPlayDevelopComponent.vue'
import MainLayout from '../layouts/MainLayout.vue'
</script>

<template>
    <MainLayout>
        <AcquaintComponent />
        <InformationComponent />
        <SupportComponent />
        <ProblemsComponent />
        <LearnPlayDevelopComponent />
        <FormatComponent />
        <UseComponent />
        <AboutFeaturesComponent />
        <AchievementComponent />
        <ChangeComponent />
    </MainLayout>
</template>
