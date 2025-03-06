<template>
    <CabinetLayout>
        <div class="page">
            <PanelComponent />
            <div class="flex">
                <SidebarComponent />
                <div class="card-page">
                    <CaseCardHeaderComponent :data="data" />
                    <div class="card-page__main">
                        <CardDescriptionComponent :data="data" />
                        <StartActivitiesComponent :data="data">
                            <div class="recommend">
                                <TitleComponent class="recommend-title">
                                    Также рекомендуем
                                </TitleComponent>
                                <div class="flex flex-col gap-4">
                                    <CaseCard
                                        v-for="el in listRandom"
                                        :key="el.id"
                                        :data="el"
                                    />
                                </div>
                            </div>
                        </StartActivitiesComponent>
                    </div>
                </div>
            </div>
        </div>
    </CabinetLayout>
    <Teleport to="body">
        <Loader v-if="!isLoad" />
    </Teleport>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import Loader from '@/components/ui/loader/Loader.vue'
import CardDescriptionComponent from '/src/components/cabinet/card/current-card/CardDescriptionComponent.vue'
import PanelComponent from '/src/components/cabinet/panel/PanelComponent.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import StartActivitiesComponent from '/src/components/cabinet/card/current-card/StartActivitiesComponent.vue'
import TitleComponent from '/src/components/ui/TitleComponent.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import CaseCardHeaderComponent from '@/components/cabinet/card/current-card/CaseCardHeaderComponent.vue'
import CaseCard from '@/components/cabinet/case/card/CaseCard.vue'

const route = useRoute()
const briefcaseStore = useBriefcaseStore()
const isLoad = ref(true)
const briefcaseId = ref()

const data = computed(() => {
    return briefcaseStore.getBriefcase
})

const listRandom = computed(() => {
    return briefcaseStore.getListBriefcaseRandom
})

onMounted(() => {
    briefcaseId.value = +route.params.id
    briefcaseStore.getRandomListDb({ id: briefcaseId.value })
    briefcaseStore.getBriefcaseStoreDb(briefcaseId.value)
    isLoad.value = false

    setTimeout(() => {
        isLoad.value = true
    }, 10000)
})

watch([data, listRandom], () => {
    isLoad.value = true
})

watch(
    () => route.params,
    (newVal) => {
        briefcaseId.value = +newVal.id
        briefcaseStore.getRandomListDb({ id: briefcaseId.value })
        briefcaseStore.getBriefcaseStoreDb(briefcaseId.value)
    },
    { deep: true }
)
</script>

<style lang="scss" scoped>
.page {
    @include max-width;
}
.card-page {
    width: 100%;
}
.card-page__main {
    display: grid;
    grid-template-columns: 3fr 395px;
    gap: 24px;
    padding: 24px 24px 48px 64px;

    @media (max-width: $xl) {
        grid-template-columns: 1fr 1fr;
        padding: 24px 24px 48px 24px;
    }
}
.recommend {
    margin-top: 24px;
    max-height: 912px;
    height: 100%;
    overflow-y: scroll;
    @include flex-col-gap(16px);
    :deep(.title) {
        font-family: 'CenturyGothic';
        font-weight: 700;
        font-size: 24px;
        line-height: 150%;
        text-align: center;
        color: $gray;
    }
}

:deep(.cabinet-card__img){
    max-height: 280px;

}
</style>
