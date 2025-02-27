<template>
    <CabinetLayout>
        <div class="page">
            <PanelComponent />
            <div class="wrapper">
                <SidebarComponent />
                <div class="flex flex-col gap-4 w-full">
                    <CabinetTabsComponent />
                    <div class="cards-container">
                        <ListCaseEmpty v-if="!data"></ListCaseEmpty>
                        <CaseList v-else :data="data" />
                    </div>
                </div>
            </div>
     
        </div>
    </CabinetLayout>
</template>
<script setup>
import PanelComponent from '../../components/cabinet/panel/PanelComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import { computed, ref, watch, onMounted, reactive } from 'vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import CabinetTabsComponent from '/src/components/cabinet/tabs/CabinetTabsComponent.vue'
import ListCaseEmpty from '@/components/cabinet/case/empty/ListCaseEmpty.vue'
import CaseList from '@/components/cabinet/case/list/CaseList.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'

const briefcaseStore = useBriefcaseStore()

const data = ref()
const panel = reactive({
    search: '',
    type: null
})

const getListBriefcase = computed(() => {
    return briefcaseStore.getListBriefcase
})

onMounted(() => {
    briefcaseStore.getCaseListDb({ search: panel.search, type: panel.type })
})

watch(
    () => panel.search,
    (newVal) => {
        if (newVal.trim() == '') {
            briefcaseStore.getCaseListDb({
                search: panel.search,
                type: panel.type
            })
        }
    },
    { deep: true }
)

watch(getListBriefcase, () => {
    data.value = getListBriefcase.value
})

watch([() => panel.type], () => {
    briefcaseStore.getCaseListDb({ search: panel.search, type: panel.type })
})
</script>
<style scoped lang="scss">
.page {
    max-width: 1920px;
    margin: 0 auto;
    height: 100%;
}
.wrapper {
    display: flex;
    height: 100%;
}
.cards-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
    width: 100%;
}
</style>
