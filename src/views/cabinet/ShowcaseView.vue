<script setup>
import PanelComponent from '../../components/cabinet/panel/PanelComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import PaginationComponent from '/src/components/pagination/PaginationComponent.vue'
import { ref, watch } from 'vue'
import CabinetCardComponent from '/src/components/cabinet/card/CabinetCardComponent.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import CabinetTabsComponent from '/src/components/cabinet/tabs/CabinetTabsComponent.vue'

const cardInfo = [
    {
        id: 1,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 2,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения2',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 3,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 4,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 5,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 6,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 7,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 8,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 9,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 10,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 11,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Школа зельеварения',
        subtitle: 'Записывайте великие формулы магистра',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '100',
        rating: '100',
        time: '2-5 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 12,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Скейтер в городе',
        subtitle: 'Осваивайте городские трюки на скейте',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '150',
        rating: '95',
        time: '3-7 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    },
    {
        id: 13,
        img: '/images/cabinet/card/card-img1.png',
        title: 'Пиццерия Луиджи',
        subtitle: 'Лучшие рецепты пиццы от шефа',
        viewIcon: '/images/cabinet/card/views.png',
        ratingIcon: '/images/cabinet/card/rating.png',
        views: '200',
        rating: '98',
        time: '5-10 мин',
        timeIcon: '/public/icons/cabinet/card/time-icon.svg'
    }
]

const renderList = ref([])

function getRenderList(list) {
    renderList.value = list
}

watch(
    () => cardInfo,
    () => {}
)
</script>

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
                :data="cardInfo"
                :color="{ main: '#0E0806', hover: '#E05704' }"
                @set-list="getRenderList"
            />
        </div>
    </CabinetLayout>
</template>

<style scoped lang="scss">
.page {
    max-width: 1920px;
    margin: 0 auto;
    height: 100vh;
}
.wrapper {
    display: flex;
}
.cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
    width: 100%;
}
</style>
