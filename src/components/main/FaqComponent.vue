<template>
    <section class="faq">
        <div class="faq__container container">
            <h2 class="faq__title">Часто задаваемые вопросы</h2>
            <div class="faq__wrapper">
                <div v-for="(question, index) in questions" :key="index" class="faq__question">
                    <div class="faq__question-wrapper">
                        <p class="faq__question-text">
                            {{ question.question }}
                        </p>
                        <button
                            class="faq__arrow-btn"
                            :class="{ active: openIndex === index }"
                            @click="toggleAnswer(index)"
                        >
                            <svg
                                class="faq__arrow-icon"
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 0.999512L7 6.99951L13 0.999511"
                                    stroke="#0E0806"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <transition name="fade">
                        <div v-if="openIndex === index" class="faq__answer">
                            <div v-if="question.id === 3" class="faq__answer-wrapper">
                                <ul class="faq__answer-list">
                                    <li
                                        v-for="(item, ind) in question.answer"
                                        :key="ind"
                                        class="faq__answer-item faq__answer-text"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                            <p
                                v-else-if="question.id === 4 || question.id === 5"
                                class="faq__answer-text"
                            >
                                {{ question.answer.part1 }}
                                <router-link class="faq__answer-link" :to="question.answer.href">
                                    {{ question.answer.link }}
                                </router-link>
                                {{ question.answer.part2 }}
                            </p>
                            <p v-else class="faq__answer-text">
                                {{ question.answer }}
                            </p>

                            <img
                                class="faq__answer-img"
                                src="../../assets/images/main/faq/faq-answer-bg.png"
                                alt=""
                            />
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const questions = ref([
    {
        id: 1,
        question: 'Как начать пользоваться сервисом?',
        answer: 'После регистрации вам будет открыт доступ к сопроводительным материалам кейса и возможности запуска разминок'
    },
    {
        id: 2,
        question: 'Какое оборудование необходимо для запуска разминок?',
        answer: 'Для использования кейсов сервиса вам понадобится доступ к сети интернет, компьютер подключенный к устройству вывода видео (проектор, телевизор, интерактивная панель) и устройству вывода звука (колонки, аудиосистема), принтер'
    },
    {
        id: 3,
        question: 'Что такое витрина, направление, кейс, разминка?',
        answer: [
            'Витрина кейсов – страница со списком всех кейсов сервиса Направление – выкладка на витрине кейсов, объединяющая все разминки по выбранному формату (подвижные/ритм/когнитивные).',
            'Кейс – страница определенной разминки, содержащая все необходимые материалы и инструкции для ее проведения.',
            'Разминка – видео для демонстрации в аудитории.'
        ]
    },
    {
        id: 4,
        question: 'У меня есть идея, могу я ее предложить?',
        answer: {
            part1: 'Вы можете стать соавтором проекта и предложить свой кейс по представленным или новым направлениям в разделе ',
            link: '"Сотрудничество"',
            part2: '. После проверки мы свяжемся с вами и опубликуем кейс с указанием информации об авторе'
        }
    },
    {
        id: 5,
        question: 'Как я могу помочь проекту?',
        answer: {
            part1: 'Информация по этому вопросу собрана в разделе ',
            link: '"Сотрудничество"',
            part2: '',
            href: '/cooperation'
        }
    }
])

const openIndex = ref(null)

function toggleAnswer(index) {
    if (openIndex.value === index) {
        openIndex.value = null
    } else {
        openIndex.value = index
    }
}
</script>

<style lang="scss">
.faq {
    padding: 100px 64px;
    box-sizing: border-box;

    @media (max-width: $lg) {
        padding: 48px 16px;
    }

    @media (max-width: $sm) {
        padding: 24px 16px;
    }
}

.faq__container {
    display: flex;
    flex-direction: column;
    gap: 48px;

    @media (max-width: $sm) {
        gap: 24px;
    }
}

.faq__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 38px;
    color: $orange;

    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 1.5;
        text-align: center;
    }

    @media (max-width: $sm) {
        font-size: 24px;
    }
}

.faq__wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.faq__question {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.faq__question-wrapper {
    display: grid;
    grid-template-columns: 1fr 40px;
    width: 100%;
    align-items: center;
}

.faq__question-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    color: $black;
}

.faq__arrow-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: $white;
    border: 1px solid $black;
    cursor: pointer;
    transition:
        background-color 0.3s,
        transform 0.3s;

    &.active {
        background-color: $orange;
        border: none;
        transform: rotate(180deg);

        .faq__arrow-icon path {
            stroke: $white;
        }
    }
}

.faq__arrow-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    path {
        transition: stroke 0.3s;
    }
}

.faq__answer {
    border-radius: 24px;
    padding: 24px;
    width: 100%;
    background: $yellowy;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    gap: 48px;
}

.faq__answer-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    color: $black;
}

.faq__answer-img {
    object-fit: contain;
    aspect-ratio: 1 / 1;

    @media (max-width: $sm) {
        display: none;
    }
}

.faq__answer-link {
    color: $orange;
    border-bottom: 1px solid $orange;
}
</style>
