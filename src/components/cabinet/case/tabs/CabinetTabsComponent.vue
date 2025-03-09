<template>
    <div class="tabs">
        <ul class="tabs-list">
            <li
                v-for="(item, index) in slidesData"
                :key="index"
                class="tabs-list-item"
                :class="{ 'active-tab': type === item.value }"
                @click="handleTabClick(item.value)"
            >
                <span>{{ item.tab }}</span>
                <img
                    v-if="index > 0"
                    class="info-btn"
                    :src="item.icon"
                    alt="tab icon"
                    @mouseover="showPopup(index)"
                    @mouseleave="hidePopup"
                />
                <div v-if="isPopupVisible && hoveredTab === index" class="tab-popup">
                    <p class="tab-popup__text">{{ item.popupText }} - подробности</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isPopupVisible = ref(false)
const hoveredTab = ref(null)
const slidesData = ref([
    {
        tab: 'Все кейсы',
        icon: '',
        value: ''
    },
    {
        tab: 'Подвижные разминки',
        icon: '/images/cabinet/card/tabs-img.png',
        popupText: `Раздел помогает поддерживать необходимую двигательную  активность через динамические игры, гимнастику, танцевальные флешмобы`,
        value: 'moving'
    },
    {
        tab: 'Ритм-разминки',
        icon: '/images/cabinet/card/tabs-img.png',
        popupText:
            'Раздел помогает активировать внимание и концентрацию через  ритмические игры, координационные упражнения, музыкальные челленджи',
        value: 'rhythm'
    },
    {
        tab: 'Конгитивные разминки',
        icon: '/images/cabinet/card/tabs-img.png',
        popupText: `Раздел помогает эффективно начать основное занятие через когнитивные тренировки, логические игры, упражнения брейн-фитнеса`,
        value: 'cognitive'
    }
])

const type = defineModel('type', { type: String, default: '' })

function handleTabClick(index) {
    type.value = index
}

function showPopup(index) {
    hoveredTab.value = index
    isPopupVisible.value = true
}

function hidePopup() {
    isPopupVisible.value = false
    hoveredTab.value = null
}
</script>
<style scoped lang="scss">
.tabs {
    padding: 16px 64px;
}
.tabs-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 48px;
    margin-bottom: -48px;
    position: relative;

    @media (max-width: $lg) {
        gap: 16px;
    }
    @media (max-width: $sm) {
        gap: 7px;
        margin-bottom: 0;
    }
}

.tabs-list-item {
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: $gray;
    border-bottom: 1px solid $gray;
    cursor: pointer;
    position: relative;

    &:hover,
    &:active {
        color: $orange;
        border-bottom: 1px solid $orange;
    }

    @media (max-width: $lg) {
        font-size: 16px;
    }
    &.active-tab {
        border-bottom: 1px solid $orange;
        color: $orange;
    }
}
.info-btn {
    position: absolute;
    top: 5px;
    right: -30px;
}
.tab-popup {
    border: 2px solid #656d75;
    border-radius: 24px 0 24px 24px;
    padding: 16px;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    z-index: 2;
    background: #e6eaed;
    max-width: 340px;
    width: 320px;
}
.tab-popup__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;
}
</style>
