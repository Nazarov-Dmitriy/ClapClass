<template>
    <CabinetLayout>
        <PanelComponent v-model:search="panel.search" @search="search()" />
        <div class="wrapper">
            <SidebarComponent />
            <div class="flex flex-col gap-4 w-full">
                <CabinetTabsComponent v-model:type="panel.type" />
                <div class="cards-container">
                    <ListCaseEmpty v-if="!data"></ListCaseEmpty>
                    <CaseList v-else :data="data" />
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
import ListCaseEmpty from '@/components/cabinet/case/empty/ListCaseEmpty.vue'
import CaseList from '@/components/cabinet/case/list/CaseList.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import CabinetTabsComponent from '@/components/cabinet/case/tabs/CabinetTabsComponent.vue'

const briefcaseStore = useBriefcaseStore()

const data = ref()
const panel = reactive({
    search: '',
    type: ''
})

const getListBriefcase = computed(() => {
    return briefcaseStore.getListBriefcase
})

onMounted(() => {
    briefcaseStore.getCaseListDb({ search: panel.search, type: panel.type })
})

function search() {
    briefcaseStore.getCaseListDb({ search: panel.search, type: panel.type })
}

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
    width: 100%;
    margin: 0 auto;
}
.wrapper {
    display: flex;
    height: 100%;
    flex-grow: 1;
}
.cards-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
    width: 100%;
}
</style>
