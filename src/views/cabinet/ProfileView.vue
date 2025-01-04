<script setup>
import PanelComponent from '/src/components/cabinet/panel/PanelComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import CabinetProfileComponent from '/src/components/cabinet/profile/CabinetProfileComponent.vue'
import OfferCase from '/src/components/cabinet/profile/OfferCase.vue'
import SubscriptionComponent from './SubscriptionComponent.vue'
import ChangePassword from '/src/components/cabinet/profile/ChangePassword.vue'
</script>

<template>
    <CabinetLayout>
        <div class="page">
            <PanelComponent />
            <div class="flex w-full">
                <SidebarComponent />
                <div class="w-full">
                    <CabinetProfileComponent />
                    <div class="grid grid-cols-3 gap-4 justify-between items-center p-[16px_64px]">
                        <OfferCase />
                        <SubscriptionComponent />
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </div>
    </CabinetLayout>
</template>

<style lang="scss" scoped>
.page {
    max-width: 1920px;
    margin: 0 auto;
    height: 100vh;
}
</style>
