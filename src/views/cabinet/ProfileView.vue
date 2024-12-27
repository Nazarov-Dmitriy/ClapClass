<script setup>
import PanelComponent from '/src/components/cabinet/panel/PanelComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
</script>

<template>
    <CabinetLayout>
        <div class="page">
            PROFILE
            <PanelComponent />
            <SidebarComponent />
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
