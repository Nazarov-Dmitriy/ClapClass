<template>
    <CabinetLayout>
        <div class="page">
            <PanelComponent />
            <div class="flex">
                <SidebarComponent />
                <div v-if="cardsInfo.length" class="flex flex-col gap-6">
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
        </div>
    </CabinetLayout>
</template>

<script setup>
import PanelComponent from '/src/components/cabinet/panel/PanelComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import CabinetCardComponent from '/src/components/cabinet/card/CabinetCardComponent.vue'
import { useCardsStore } from '/src/stores/cabinetCardsStore'
import { computed, onMounted, ref, watch } from 'vue'
import CabinetTabsComponent from '/src/components/cabinet/tabs/CabinetTabsComponent.vue'

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

<style lang="scss" scoped>
.page {
    max-width: 1920px;
    margin: 0 auto;
    height: 100vh;
}
.cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 24px 64px;
    width: 100%;
    background-image: url(/images/servecies/warm-up/bg-img.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
}
</style>
