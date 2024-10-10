<template>
    <div class="services">
        <div class="services__wrapper">
            <div class="services__tabs">
                <ul class="services__list">
                    <li
                        v-for="(item, index) in slidesData"
                        :key="index"
                        class="slider__tabs-list-item"
                        :class="{ 'active-tab': activeIndex === index }"
                        @click="handleTabClick(index)"
                    >
                        {{ item.tab }}
                    </li>
                </ul>
            </div>
            <swiper
                :slides-per-view="3"
                :space-between="500"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
            >
                <swiper-slide>
                    <div class="parent">
                        <div class="services__banner">
                            <div class="services__title-block">
                                <img
                                    src="http://localhost:5173/images/slider/slide-svg1.svg"
                                    alt=""
                                    class="services__img"
                                />
                                <div class="services__titles">
                                    <h2 class="services__title services__title--white">
                                        Подвижные
                                    </h2>
                                    <h2 class="services__title services__title--orange">
                                        разминки
                                    </h2>
                                </div>
                            </div>
                            <div class="services__info">
                                <h2 class="services__info-title">Откройте второе дыхание!</h2>
                                <p class="services__info-text">
                                    Пробудите утомившийся класс, превратив перерыв на уроке в
                                    потрясающий танцевальный флешмоб
                                </p>
                                <BtnComponent class="services__info-btn">
                                    Регистрация
                                </BtnComponent>
                            </div>
                        </div>
                        <div class="warm-up">
                            <div class="warm-up__wrapper">
                                <img
                                    src="/images/servecies/hero-img1.png "
                                    alt=""
                                    class="warm-up__img"
                                />
                                <div class="warm-up__info">
                                    <h2 class="warm-up__info-title">Как устроена разминка?</h2>
                                    <p class="warm-up__tex">
                                        Подвижные разминки – поддерживают необходимую физическую
                                        активность при помощи коротких динамических пауз во время
                                        урока. Геймплей, построен на воспроизведении движений и
                                        интерактивном взаимодействии с персонажем, выполняющим
                                        координирующую функцию.
                                    </p>
                                    <div class="warm-up__slide-tabs" />
                                </div>
                            </div>
                        </div>
                        <div class="important">
                            <div class="important__wrapper">
                                <div class="important__info">
                                    <h2 class="important__title">Почему это важно?</h2>
                                    <div class="important__text-wrapper">
                                        <p class="important__text">
                                            Дефицит двигательной активности – побочный эффект
                                            поведенческих паттернов школьной среды, приводящий к
                                            развитию психофизических недугов.
                                        </p>
                                        <p class="important__text">
                                            Большую часть дня школьники проводят сидя, провоцируя
                                            спад физического и эмоционального тонуса. Происходит
                                            взаимообогащение негативных факторов, формирующих
                                            привычки, ведущие к деструктивным изменениям
                                            костно-мышечной структуры и системы кровообращения
                                        </p>
                                        <p class="important__text">
                                            Совокупность этих показателей снижает сопротивляемость
                                            стрессу и создает трудности в самовыражении, формируя
                                            телесную замкнутость. Появляется апатия и
                                            гиперактивность, не позволяющие гармонично развиваться и
                                            оставаться академически успешными.
                                        </p>
                                    </div>
                                </div>
                                <img
                                    src="/images/servecies/important/hero-img1.png"
                                    alt=""
                                    class="important__img"
                                />
                            </div>
                        </div>
                        <div class="features">
                            <h2 class="features__title">Особенности направления</h2>
                            <div class="features__blocks">
                                <div
                                    v-for="block in featuresCardInfo"
                                    :key="block.id"
                                    class="features__block"
                                >
                                    <div class="features__block-header">
                                        <img :src="block.img" alt="" class="features__block-img" />
                                        <div class="features__block-text">
                                            <span
                                                v-for="(title, index) in block.title"
                                                :key="index"
                                                >{{ title }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="features__block-main">
                                        <p class="features__main-text">{{ block.text }}</p>
                                    </div>
                                </div>
                            </div>
                            <BtnComponent class="btn"> Узнай больше о проекте </BtnComponent>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide> 2 </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BtnComponent from '../btns/BtnComponent.vue'

const slidesData = ref([
    {
        tab: 'Подвижные разминки',
        svg: '/images/slider/slide-svg1.svg',
        img: '/images/slider/slide-img1.png',
        title: 'Откройте второе дыхание!',
        text: 'Пробудите утомившийся класс, превратив перерыв на уроке в потрясающий танцевальный флешмоб'
    },
    {
        tab: 'Ритм-разминки',
        svg: '/images/slider/slide-svg2.svg',
        img: '/images/slider/slide-img2.png',
        title: 'На старт, внимание!',
        text: 'Активируйте режим концентрации учеников веселыми ритм-играми, задавая необходимый темп занятия'
    },
    {
        tab: 'Конгитивные разминки',
        svg: '/images/slider/slide-svg3.svg',
        img: '/images/slider/slide-img3.png',
        title: 'Курс на эффективность!',
        text: 'Настройте аудиторию на мозговой штурм при помощи нейрогимнастики и увлекательных упражнений брейн-фитнеса'
    }
])

const activeIndex = ref(0)
const swiperRef = ref(null)

const navigationOptions = {
    nextEl: '.slider__slide-arrow-btn--right',
    prevEl: '.slider__slide-arrow-btn--left'
}

const paginationOptions = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
}

const autoplayOptions = {
    delay: 3000,
    disableOnInteraction: true
}

function updateActiveIndex(swiper) {
    activeIndex.value = swiper.realIndex % slidesData.value.length
}

function handleTabClick(index) {
    activeIndex.value = index
    swiperRef.value.swiper.slideTo(index)
}

const featuresCardInfo = ref([
    {
        id: 1,
        img: '/images/servecies/features/block-icon1.svg',
        title: ['золотой', 'стандарт'],
        text: 'Выверенное сочетание тайминга, возможностей помещений, видов физической нагрузки, возрастных особенностей и рекомендаций ВОЗ,позволяет соответствовать ФГОС'
    },
    {
        id: 2,
        img: '/images/servecies/features/block-icon2.svg',
        title: ['золотой', 'стандарт'],
        text: 'Выверенное сочетание тайминга, возможностей помещений, видов физической нагрузки, возрастных особенностей и рекомендаций ВОЗ,позволяет соответствовать ФГОС'
    },
    {
        id: 3,
        img: '/images/servecies/features/block-icon3.svg',
        title: ['золотой', 'стандарт'],
        text: 'Выверенное сочетание тайминга, возможностей помещений, видов физической нагрузки, возрастных особенностей и рекомендаций ВОЗ,позволяет соответствовать ФГОС'
    }
])

onMounted(() => {
    const bullet = document.querySelectorAll('.swiper-pagination-bullet')
    const tabs = document.querySelectorAll('.slider__tabs-list-item')
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            bullet[index].click()
        })
    })
})
</script>

<style scoped lang="scss">
.services {
    padding: 16px 64px;
    box-sizing: border-box;
}
.services__wrapper {
}
.services__tabs {
    display: grid;
    justify-content: center;
    align-items: center;
    padding: 16px 8px;
}
.services__list {
    display: flex;
    gap: 48px;
}
.services__item {
}
.services__banner {
    border: 4px solid $white;
    max-height: 328px;
    height: 100%;
    border-radius: 24px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #e6eaed;
    display: flex;
    justify-content: space-between;
    margin: 0 64px;
    position: relative;
    z-index: 1;
}
.services__title-block {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
}
.services__img {
    border: 4px solid #e05704;
    border-radius: 1000px;
    padding: 48px;
    box-sizing: border-box;
    background-color: $white;
}
.services__titles {
    // position: absolute;
    // left: 200px;
}
.services__title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 60px;
    line-height: 150%;
    text-align: center;
}
.services__title--white {
    border: 4px solid #e05704;
    padding: 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    transform: rotate(6deg);
    color: $orange;
}
.services__title--orange {
    border: 4px solid #fff;
    padding: 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #e05704;
    transform: rotate(2deg);
    color: $white;
}
.services__info {
    display: grid;
    gap: 16px;
    justify-content: center;
    max-width: 698px;
    width: 100%;
}
.services__info-title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: $orange;
}
.services__info-text {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: #0e0806;
}
.services__info-btn {
    margin: 0 auto;
    width: max-content;
    height: max-content;
}

//////// warm-up////////

.warm-up {
    margin-top: -10%;
    padding: 196px 64px 48px 64px;
    box-sizing: border-box;
    box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
    background-image: url('/images/servecies/warm-up/bg-img.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    position: relative;
    z-index: 0;
}
.warm-up__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}
.warm-up__img {
    border-radius: 24px;
    max-width: 648px;
    width: 100%;
    border: 2px solid $black;
}
.warm-up__info {
    display: grid;
    justify-content: center;
    gap: 48px;
    border-radius: 24px;
    padding: 48px 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
}
.warm-up__info-title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 36px;
    line-height: 133%;
    text-align: center;
    color: $orange;
}
.warm-up__tex {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: $black;
}
.warm-up__slide-tabs {
}

/////// important ///////

.important {
    padding: 80px 64px;
    box-sizing: border-box;
}
.important__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
}
.important__info {
    display: grid;
    gap: 48px;
}
.important__title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 36px;
    line-height: 133%;
    color: #e05704;
}
.important__text-wrapper {
    display: grid;
    gap: 24px;
}
.important__text {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: #0e0806;
}
.important__img {
}

//////// features ///////
.features {
    padding: 48px 64px 80px 64px;
    box-sizing: border-box;
    box-shadow: 0 -16px 2px 0 rgba(14, 8, 6, 0.15);
    display: grid;
    gap: 48px;
    background-image: url('/images/servecies/features/img-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
}
.features__title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 36px;
    line-height: 133%;
    text-align: center;
    color: #e05704;
}
.features__blocks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    align-items: center;
}
.features__block {
    border-radius: 24px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    display: grid;
    gap: 24px;
}
.features__block-header {
    display: flex;
    align-items: center;
    gap: 16px;
}
.features__block-img {
}
.features__block-text {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    color: #e05704;

    & span {
        display: block;
    }
}
.features__main-text {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #0e0806;
}
.btn {
    width: max-content;
    margin: 0 auto;
}
</style>
