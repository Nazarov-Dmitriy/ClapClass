<template>
    <CabinetLayout>
        <div class="page">
            <PanelComponent />
            <div class="flex">
                <SidebarComponent />
                <div class="card-page">
                    <CardHeaderComponent :card-info="cardInfo" />
                    <div class="card-page__main">
                        <CardDescriptionComponent :card-info="cardInfo" />
                        <StartActivitiesComponent :card-info="cardInfo">
                            <div class="recommend">
                                <TitleComponent class="recommend-title">
                                    Также рекомендуем
                                </TitleComponent>
                                <CabinetCardComponent
                                    v-for="(card, index) in recommendedList"
                                    :key="index"
                                    :card-info="card"
                                />
                            </div>
                        </StartActivitiesComponent>
                    </div>
                </div>
            </div>
        </div>
    </CabinetLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useCardsStore } from '/src/stores/cabinetCardsStore'
import CardDescriptionComponent from '/src/components/cabinet/card/current-card/CardDescriptionComponent.vue'
import PanelComponent from '/src/components/cabinet/panel/PanelComponent.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import CardHeaderComponent from '/src/components/cabinet/card/current-card/CardHeaderComponent.vue'
import StartActivitiesComponent from '/src/components/cabinet/card/current-card/StartActivitiesComponent.vue'
import TitleComponent from '/src/components/UI/TitleComponent.vue'
import CabinetCardComponent from '/src/components/cabinet/card/CabinetCardComponent.vue'

const route = useRoute()
const cardName = computed(() => route.params.name)

const cardsStore = useCardsStore()
const cardInfo = computed(() => {
    const card = cardsStore.getCardInfo.find((card) => card.title === cardName.value)
    return card || {}
})

const cardsInfo = computed(() => cardsStore.getCardInfo)
const recommendedList = computed(() => {
    return cardsStore.getCardInfo.filter((card) => card.title !== cardName.value)
})

watch(
    () => cardsInfo.value,
    (newCardsInfo) => {},
    { immediate: true }
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
    grid-template-columns: 3fr 1fr;
    gap: 24px;
    padding: 24px 24px 0px 64px;

    @media (max-width: $xl) {
        grid-template-columns: 70% 30%;
    }
}
.recommend {
    margin-top: 24px;
    max-height: 912px;
    height: 100%;
    overflow: scroll;
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
</style>
