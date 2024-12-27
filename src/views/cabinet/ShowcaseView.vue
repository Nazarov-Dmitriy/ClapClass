<template>
    <CabinetLayout>
        <div class="page">
            <PanelComponent />
            <div class="wrapper">
                <SidebarComponent />
                <div class="flex flex-col gap-4">
                    <CabinetTabsComponent />
                    <div class="cards-container">
                        <CabinetCardComponent
                            v-for="(card, index) in renderList"
                            :key="index"
                            :card-info="card"
                        />
                    </div>
                </div>
            </div>
            <PaginationComponent
                :perpage="12"
                :data="cardsInfo"
                :color="{ main: '#0E0806', hover: '#E05704' }"
                @set-list="getRenderList"
            />
        </div>
    </CabinetLayout>
</template>
<script setup>
import PanelComponent from '../../components/cabinet/panel/PanelComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import PaginationComponent from '/src/components/pagination/PaginationComponent.vue'
import { computed, ref, watch, onMounted } from 'vue'
import CabinetCardComponent from '/src/components/cabinet/card/CabinetCardComponent.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import CabinetTabsComponent from '/src/components/cabinet/tabs/CabinetTabsComponent.vue'
import { useCardsStore } from '/src/stores/cabinetCardsStore'

const cardsStore = useCardsStore()
const cardsInfo = computed(() => cardsStore.getCardInfo)
const renderList = ref([])

function getRenderList(list) {
    renderList.value = list
}

watch(
    () => cardsInfo.value,
    (newCardsInfo) => {
        getRenderList(newCardsInfo)
    },
    { immediate: true }
)

onMounted(() => {
    getRenderList(cardsInfo.value)
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
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
    width: 100%;
}
</style>
