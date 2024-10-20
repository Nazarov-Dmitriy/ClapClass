<template>
    <section class="interesting">
        <Teleport to="body">
            <ModalComponent :visible="isModalVisible" @close-modal="toggleModalVisible">
                <template #header>
                    <ModalHeader @close-modal="toggleModalVisible" />
                </template>
                <template #form>
                    <UiForm> </UiForm>
                </template>
            </ModalComponent>
        </Teleport>
        <div class="interesting__container">
            <div class="interesting__cards">
                <div
                    class="interesting__card"
                    v-for="(card, index) in cardsInfoArr"
                    :key="index"
                    :class="{ active: openIndex === index }"
                >
                    <div class="card__wrapper">
                        <div class="card__hero-img-wrapper">
                            <img :src="card.heroImg" alt="" class="card__hero-img" />
                            <p class="card__hero-text">{{ card.heroText }}</p>
                        </div>
                        <h2 class="card__title">
                            <span>{{ card.spanTitle }}</span>
                            {{ card.infoTitle }}
                        </h2>
                        <div class="card__carusel">
                            <p class="card__carusel-text">{{ card.infoText }}</p>
                            <div class="faq__arrow-btn-wrapper">
                                <button
                                    class="faq__arrow-btn--orange"
                                    :class="{ active: openIndex === index }"
                                    @click="toggleAnswer(index)"
                                >
                                    <svg
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 9.64453L12 15.6445L18 9.64453"
                                            stroke="#E05704"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <Transition name="answer">
                            <div
                                v-if="openIndex === index && index !== 2"
                                class="card__carusel-answer"
                            >
                                <div
                                    v-for="answer in card.answers"
                                    :key="answer.id"
                                    class="card__carusel-answer-wrapper"
                                >
                                    <p class="card__carusel-answer-text">{{ answer.text1 }}</p>
                                    <p class="card__carusel-answer-text">{{ answer.text2 }}</p>
                                    <div class="card__carusel-answer-action">
                                        <a href="#" class="card__carusel-answer-action-link">
                                            {{ answer.linkText }}
                                        </a>
                                        <BtnComponentWhite
                                            emit-name="action"
                                            @action="toggleModalVisible"
                                            :custom-class="'custom-btn'"
                                            >{{ answer.btnText }}</BtnComponentWhite
                                        >
                                    </div>
                                </div>
                            </div>
                        </Transition>
                        <Transition name="answer">
                            <div
                                v-if="openIndex === index && index === 2"
                                class="card__carusel-answer"
                            >
                                <div
                                    v-for="answer in card.answers"
                                    :key="answer.id"
                                    class="card__carusel-answer-wrapper"
                                >
                                    <p class="card__carusel-answer-text">{{ answer.text1 }}</p>
                                    <p class="card__carusel-answer-text">{{ answer.text2 }}</p>
                                    <div class="card__carusel-answer-action">
                                        <a href="#" class="card__carusel-answer-action-link">
                                            {{ answer.linkText }}
                                        </a>
                                        <div class="card__carusel-answer-btns">
                                            <BtnComponentWhite
                                                emit-name="action"
                                                @action="toggleModalVisible"
                                                :custom-class="'custom-btn'"
                                                >{{ answer.btnText }}</BtnComponentWhite
                                            >
                                            <BtnComponent
                                                :currentСlass="'card__carusel-answer-btn'"
                                                >{{ answer.btnText2 }}</BtnComponent
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import BtnComponent from '../btns/BtnComponent.vue'
import BtnComponentWhite from '../btns/BtnComponentWhite.vue'
import ModalComponent from '../modal/ModalComponent.vue'
import ModalHeader from '../modal/ModalHeader.vue'
import UiForm from '../form/UiForm.vue'
const openIndex = ref(null)

const toggleAnswer = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}

const isModalVisible = ref(false)

function toggleModalVisible() {
    isModalVisible.value = !isModalVisible.value
}

const cardsInfoArr = ref([
    {
        heroImg: '/images/main/project/project-card3.png',
        heroText: 'Профи',
        spanTitle: 'Клэппи ищет',
        infoTitle: ` креативных супергероев в свою команду`,
        infoText: 'Создавайте уникальный продукт для поколения будущего',
        answers: [
            {
                id: 1,
                text1: `«Clap Class» – это увлекательный проект, создающий новый стандарт образования. Мы разрабатываем яркие, интерактивные разминки в лучших традициях аркадных игр, вдохновляющие современных учеников. Каждый кейс – результат трудоемкой работы экспертов в сфере педагогики и креативных индустрий.`,
                text2: `Мы верим, что будущее за вовлекающим обучением! Создавайте его вместе с нами уже сегодня. Станьте частью креативной команды единомышленников – формируйте идеи, развивайте маркетинг, дизайн, разработку или музыкальную составляющую. Мы всегда в поиске увлеченных своим делом волонтеров, готовых менять подход к передаче знаний.`,
                linkText: 'Скачать партнерскую  программу >',
                btnText: 'Станьте волонтером'
            }
        ]
    },
    {
        heroImg: '/images/main/project/project-card1.png',
        heroText: 'Педагогам',
        spanTitle: 'Вы полны идей,',
        infoTitle: ` опыта и желания проявить себя?`,
        infoText: 'Публикуйте лучшие образовательные практики нового уровня',
        answers: [
            {
                id: 2,
                text1: `Станьте амбассадором "Clap Class" - соавтором проекта, чье мнение мы ценим. Делитесь своими уникальными методическими разработками, тестируйте новые кейсы и получайте возможность опубликовать свой педагогический опыт на платформе с поддержкой команды сервиса.`,
                text2: `Если у вас есть свежие идеи, готовность первыми опробовать инновационные инструменты сервисаи желание давать обратную связь - вы наш человек!`,
                linkText: 'Скачать партнерскую  программу >',
                btnText: 'Заполните заявку'
            }
        ]
    },
    {
        heroImg: '/images/main/project/project-card5.png',
        heroText: 'Инвесторам',
        spanTitle: 'Инвестируйте',
        infoTitle: ` в новый образовательный формат будущего`,
        infoText: 'Сделайте вклад в стандарт обучения, опережающий время',
        answers: [
            {
                id: 3,
                text1: `Проект "Clap Class" помогает педагогам и детям до 12 лет создавать благоприятную атмосферу для обучения, предоставляя уникальные возможности на ed-tech рынке России. Мы разрабатываем библиотеку игровых приложений для геймификации здоровьесберегающих технологий и готовы к дальнейшему развитию.`,
                text2: `Наш план развития включает расширение линейки направлений, выход на новые платформы и способы взаимодействия с пользователями. Мы открыты для инвестиционных предложений и сотрудничества, и будем благодарны за финансовую поддержку, которая позволит поддерживать свободный доступ к инструментам сервиса.`,
                linkText: 'Скачать партнерскую  программу >',
                btnText: 'Свяжитесь с нами',
                btnText2: 'Поддержите проект'
            }
        ]
    },
    {
        heroImg: '/images/main/project/project-card4.png',
        heroText: 'Школам',
        spanTitle: 'Станьте частью сообщества',
        infoTitle: ` которое меняет подход к образованию`,
        infoText: 'Сформируем благоприятную школьную среду вместе!',
        answers: [
            {
                id: 4,
                text1: `Ваша организация внедряет передовые методики обучения? Тогда мы движемся в одном направлении! Станьте точкой роста, формирующей новый образовательный опыт при поддержке проекта "Clap Class"`,
                text2: `Наши амбассадоры готовы провести презентацию возможностей сервиса, оказать информационную поддержку вашим педагогам и предоставить доступ в сеть инновационных площадок. Этот статус позволит вам участвовать в развитии, тестировании и мероприятиях нашего проекта.`,
                linkText: 'Скачать партнерскую  программу >',
                btnText: 'Заполните заявку'
            }
        ]
    }
])
</script>

<style lang="scss">
.interesting {
    padding: 48px 64px;
    box-sizing: border-box;

    @media (max-width: 991px) {
        padding: 48px 16px;
    }
    @media (max-width: 767px) {
        padding: 64px 16px 48px 16px;
    }
}

.interesting__container {
    max-width: 1312px;
    margin: 0 auto;
}

.interesting__cards {
    display: flex;
    flex-direction: column;
    gap: 48px;
}

.interesting__card {
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: #e6eaed;

    &.active {
        background: url(../../assets/images/cooperation/interesting/card-bg.png) no-repeat left
            center;
        background-color: #e6eaed;
        background-size: cover;

        @media (max-width: $lg) {
            background: url(../../assets/images/cooperation/interesting/card-bg.png) no-repeat
                bottom;
            background-color: #e6eaed;
            padding-left: 16px;
        }
        @media (max-width: $sm) {
            background-image: none;
        }
    }
}

.card__wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 38px;
    align-items: center;

    @media (max-width: $lg) {
        grid-template-areas: 'img title';
    }
    @media (max-width: $sm) {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
}

.card__hero-img-wrapper {
    grid-row: span 2;
    @media (max-width: $lg) {
        grid-area: img;
    }
    @media (max-width: $sm) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

.card__hero-text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    text-align: center;
    color: $black;

    @media (max-width: $sm) {
        font-size: 20px;
    }
}

.card__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: $orange;

    span {
        display: block;
        text-align: center;
    }
    @media (max-width: $lg) {
        grid-area: title;
        font-size: 32px;
        line-height: 1.5;
    }
    @media (max-width: $sm) {
        font-size: 24px;
    }
}

.card__carusel {
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    background: #fff7ac;
    display: grid;
    grid-template-columns: 1fr 32px;
    align-items: end;

    @media (max-width: $lg) {
        grid-column: span 2;
        grid-template-columns: 1fr;
    }
}

.card__carusel-text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    color: $gray;

    @media (max-width: $sm) {
        font-size: 20px;
    }
}

.faq__arrow-btn-wrapper {
    @media (max-width: $lg) {
        display: flex;
        justify-content: flex-end;
    }
}

.faq__arrow-btn {
    &--orange {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $orange;
        border-radius: 100px;
        width: 32px;
        height: 32px;
        background: #fff;
        cursor: pointer;
        transition:
            background-color 0.3s,
            color 0.3s,
            transform 0.3s;

        &.active {
            background-color: $orange;
            color: $white;
            transform: rotate(180deg);
            svg path {
                stroke: $white;
            }
        }
    }
}

.card__carusel-answer {
    grid-column: 2;
    @media (max-width: $lg) {
        grid-column: span 2;
    }
}

.card__carusel-answer-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.card__carusel-answer-text {
}

.card__carusel-answer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    @media (max-width: $xl) {
        flex-direction: column;
        justify-content: center;
    }
}

.card__carusel-answer-action-link {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    color: $orange;
    border-bottom: 2px solid #e05704;
    padding: 4px 8px;
    text-align: center;
    text-decoration: none;

    @media (max-width: $lg) {
        text-align: left;
    }
}

.card__carusel-answer-btns {
    display: flex;
    gap: 16px;

    @media (max-width: $sm) {
        flex-direction: column;
    }
}

.custom-btn {
    color: $orange !important;
    border: 1px solid $orange !important;
}

.answer-enter-active,
.answer-leave-active {
    transition:
        opacity 0.3s ease-in-out,
        transform 0.3s ease-in-out;
}

.answer-enter-from,
.answer-leave-to {
    opacity: 0;
}

.answer-enter-to,
.answer-leave-from {
    opacity: 1;
}
</style>
