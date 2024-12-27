<script setup lang="ts">
import BtnComponentOrange from '/src/components/btns/BtnComponentOrange.vue'
import TitleComponent from '/src/components/UI/TitleComponent.vue'
import PanelComponent from '/src/components/cabinet/panel/PanelComponent.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
</script>

<template>
    <CabinetLayout>
        <PanelComponent />
        <div class="flex">
            <SidebarComponent />
            <div class="card-page">
                <div class="card-page__header">
                    <div class="card-page__header-left">
                        <img
                            src="/icons/cabinet/card-page/title-icon.svg"
                            alt=""
                            class="card-page__header-img"
                        />
                        <TitleComponent class="card-page__header-title"
                            >Школа зельеварения</TitleComponent
                        >
                    </div>
                    <div class="card-page__header-right">
                        <img
                            src="/public/images/cabinet/card/rating.png"
                            alt=""
                            class="card-page__header-right-img"
                        />
                        <span>100</span>
                        <img
                            src="/public/images/cabinet/card/views.png"
                            alt=""
                            class="card-page__header-right-img"
                        />
                        <span>100</span>
                        <img
                            src="/public/icons/cabinet/card/time-icon.svg"
                            alt=""
                            class="card-page__header-right-img"
                        />
                        <span>100</span>
                    </div>
                </div>
                <div class="card-page__main">
                    <div class="card-page__left">wadwad</div>
                    <div class="card-page__right">adwwad</div>
                </div>
            </div>
        </div>
    </CabinetLayout>
</template>

<style lang="scss" scoped>
.card-page {
    width: 100%;
}
.card-page__header {
    padding: 8px 64px;
    box-sizing: border-box;
    background: $yellowy;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-page__header-left {
    display: flex;
    align-items: center;
    gap: 16px;
}
.card-page__header-img {
    border: 2px solid $orange;
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
    background: $white;
}
.card-page__header-title {
}
.card-page__header-right {
    display: flex;
    gap: 10px;
}
.card-page__header-right-img {
}
.card-page__main{
    display: grid;
    grid-template-columns: 2fr 1fr;
}
.card-page__left {
}
.card-page__right {
}
</style>
