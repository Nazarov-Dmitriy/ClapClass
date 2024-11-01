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
                :slides-per-view="1"
                :space-between="500"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
            >
                <swiper-slide>
                    <div class="services__components-wrapper">
                        <BannerComponent
                            :information="slidesData[activeIndex].content.banner"
                            :texts="texts"
                        />
                        <WarmUpComponent
                            :information="slidesData[activeIndex].content.warmUp"
                            :texts="slidesData[activeIndex].content.warmUp.texts"
                        />
                        <ImportantComponent
                            :information="slidesData[activeIndex].content.important"
                        />
                        <FeaturesComponent
                            :featuresCardInfo="slidesData[activeIndex].content.featuresCardInfo"
                        />
                    </div>
                </swiper-slide>
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
import BannerComponent from './BannerComponent.vue'
import WarmUpComponent from './WarmUpComponent.vue'
import ImportantComponent from './ImportantComponent.vue'
import FeaturesComponent from './FeaturesComponent.vue'

const slidesData = ref([
    {
        tab: 'Подвижные разминки',
        content: {
            banner: {
                titleWhite: 'Подвижные',
                titleOrange: 'разминки',
                title: 'Откройте второе дыхание!',
                text: 'Пробудите утомившийся класс, превратив перерыв на уроке в потрясающий танцевальный флешмоб',
                img: '/images/slider/slide-svg1.svg'
            },
            warmUp: {
                img: '/images/servecies/warm-up/hero-img1.png',
                title: 'Как устроена разминка?',
                texts: [
                    'Подвижные разминки – поддерживают необходимую физическую активность при помощи коротких динамических пауз во время урока. Геймплей, построен на воспроизведении движений и интерактивном взаимодействии с персонажем, выполняющим координирующую функцию.',
                    'Широкий выбор форматов - от танцев и гимнастики до коллективных игр - позволит подобрать правильный кейс для любой аудитории.',
                    'Упражнения помогают преодолеть переутомление, стеснение и проблемы с опорно-двигательным аппаратом, способствуют пробуждению класса, созданию ярких воспоминаний и формированию здоровой традиции.'
                ]
            },
            important: {
                title: 'Важность разминок',
                img: '/images/servecies/important/hero-img1.png',
                text: [
                    'Большую часть дня школьники проводят сидя, провоцируя спад физического и эмоционального тонуса. Происходит взаимообогащение негативных факторов, формирующих привычки, ведущие к деструктивным изменениям костно-мышечной структуры и системы кровообращения.',
                    'Совокупность этих показателей снижает сопротивляемость стрессу и создает трудности в самовыражении, формируя телесную замкнутость. Появляется апатия и гиперактивность, не позволяющие гармонично развиваться и оставаться академически успешными.',
                    'Совокупность этих показателей снижает сопротивляемость стрессу и создает трудности в самовыражении, формируя телесную замкнутость. Появляется апатия и гиперактивность, не позволяющие гармонично развиваться и оставаться академически успешными.'
                ]
            },
            featuresCardInfo: [
                {
                    id: 1,
                    img: '/images/servecies/features/icons/block-icon1.svg',
                    title: ['золотой', 'стандарт'],
                    text: 'Одновременно с тренировкой концентрации внимания ученики получают психологическую разрядку, снимают умственное напряжение, формируют стабильный эмоциональный фон'
                },
                {
                    id: 2,
                    img: '/images/servecies/features/icons/block-icon2.svg',
                    title: ['золотой', 'стандарт'],
                    text: 'Правильный стимул. Синтез музыки, движения и когнитивных упражнений, создает правильное соотношение пользы, творчества и веселья, а яркое аудиовизуальное сопровождение устраняет нетерпимость к монотонности'
                },
                {
                    id: 3,
                    img: '/images/servecies/features/icons/block-icon3.svg',
                    title: ['золотой', 'стандарт'],
                    text: 'Развиваем стабильность концентрации от улучшения длительности, объема и скорости  переключения внимания до способности к его качественному распределению и  многозадачности'
                }
            ]
        }
    },
    {
        tab: 'Ритм-разминки',
        content: {
            banner: {
                titleWhite: 'Ритмичные',
                titleOrange: 'разминки',
                title: 'На старт, внимание!',
                text: 'Активируйте режим концентрации учеников веселыми ритм-играми, задавая необходимый темп занятия',
                img: '/images/slider/slide-svg2.svg'
            },
            warmUp: {
                img: '/images/servecies/warm-up/hero-img2.png',
                title: 'Как устроена разминка?',
                texts: [
                    'Ритм-разминки – инструмент мгновенного вовлечения обучающихся через короткие музыкально-ритмические сессии.  Аудиовизуальный геймплей, построен на воспроизведении действий и звуков в условиях заданного такта с целью синхронизации участников с темпом и событиями игровой симуляции.',
                    'Широкий выбор форматов - от музыкальных упражнений до игр на чувство ритма и координацию - позволит подобрать подходящую разминку или провести командный челлендж.',
                    'Тренировки развивают навык активации и удержания внимания, способствуя быстрому старту и повышению эффективности хронометража занятия.'
                ]
            },
            important: {
                title: 'Важность разминок',
                img: '/images/servecies/important/hero-img2.png',
                text: [
                    'Усидчивость - ключевой вызов для младших школьников. Преобладание непроизвольного внимания дополняется фрагментарным мышлением, сочетающим кратковременную мотивацию и потребность постоянной стимуляции.',
                    'Школьная программа редко способна преодолеть специфическую избирательность, нетерпимость к монотонности и тягу к новизне. Ученикам сложно поддерживать длительную концентрацию, что искажает процесс усвоения знаний, затрудняет развитие речи и памяти. ',
                    'Отсутствие тренировок сосредоточения и фокусировки внимания снижает успеваемость, формирует негативное отношение к учебе, ухудшает дисциплину и качество преподавания.'
                ]
            },
            featuresCardInfo: [
                {
                    id: 4,
                    img: '/images/servecies/features/icons/block-icon4.svg',
                    title: ['Двойная', 'польза'],
                    text: 'Одновременно с тренировкой концентрации внимания ученики получают психологическую разрядку, снимают умственное напряжение, формируют стабильный эмоциональный фон'
                },
                {
                    id: 5,
                    img: '/images/servecies/features/icons/block-icon5.svg',
                    title: ['Правильный', 'стимул'],
                    text: 'Синтез музыки, движения и когнитивных упражнений, создает правильное соотношение пользы, творчества и веселья, а яркое аудиовизуальное сопровождение устраняет нетерпимость к монотонности'
                },
                {
                    id: 6,
                    img: '/images/servecies/features/icons/block-icon6.svg',
                    title: ['Все', 'включено'],
                    text: 'Развиваем стабильность концентрации от улучшения длительности, объема и скорости  переключения внимания до способности к его качественному распределению и  многозадачности'
                }
            ]
        }
    },
    {
        tab: 'Конгитивные разминки',
        content: {
            banner: {
                titleWhite: 'Когнитивные',
                titleOrange: 'разминки',
                title: 'Курс на эффективность!',
                text: 'Настройте аудиторию на мозговой штурм при помощи нейрогимнастики и увлекательных упражнений брейн-фитнеса',
                img: '/images/slider/slide-svg3.svg'
            },
            warmUp: {
                img: '/images/servecies/warm-up/hero-img3.png',
                title: 'Как устроена разминка?',
                texts: [
                    'Когнитивные разминки – повышают продуктивность используя логико-ориентированные  упражнения. Смешанная реальность – основа геймплея, в котором физические действия участников  продолжают игровые события виртуальной игры.',
                    ' Широкий выбор форматов от нейрогимнастики до динамических игр на логику дает возможность подобрать оптимальный кейс для любой задачи.',
                    'Разминки развивают системное мышление и повышают скорость обучения, способствуя качественному усвоению трудного материала и гармоничному развитию интеллекта.'
                ]
            },
            important: {
                title: 'Важность разминок',
                img: '/public/images/servecies/important/hero-img3.png',
                text: [
                    'Длительное поддержание мыслительной активности – труднодоступный навык в условиях потребления информации «короткими порциями». Без тренировки построения сложных логических взаимосвязей между фрагментами знаний невозможно их качественное накопление и формирование опыта.',
                    'Рост объема, сложности и скорости образовательной нагрузки превосходит возможности восприятия учеников, увеличивая время освоения материала.',
                    'Нераскрытый когнитивный потенциал ухудшает эффективность исполнительной деятельности, становясь причиной снижения интереса к учебе, падения успеваемости и психоэмоциональной нестабильности, уменьшая практическую ценность любого занятия.'
                ]
            },
            featuresCardInfo: [
                {
                    id: 7,
                    img: '/images/servecies/features/icons/block-icon7.svg',
                    title: ['Особое', 'измерение'],
                    text: 'Испытайте уникальный опыт тренировки ментальной координации в точке соприкосновения между виртуальным пространством, оперативной мыслительной деятельностью и реальным миром'
                },
                {
                    id: 8,
                    img: '/images/servecies/features/icons/block-icon8.svg',
                    title: ['Идеальная', 'формула'],
                    text: 'Гибридный геймплей снижает последствия «компьютерного синдрома», мини-игры  поддерживают длительный интерес, а правильная прогрессия нагрузки развивает  лояльность к трудностям'
                },
                {
                    id: 9,
                    img: '/images/servecies/features/icons/block-icon9.svg',
                    title: ['Максимум', 'пользы'],
                    text: 'Чередование логики и нейрогимнастики активирует весь потенциал когнитивных способностей развивая системный подход к решению задач в комплексе с навыками ментальной саморегуляции'
                }
            ]
        }
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
}
.services__wrapper {
    position: relative;
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
    @media (max-width: $lg) {
        gap: 16px;
    }
}
.services__item {
}
</style>
