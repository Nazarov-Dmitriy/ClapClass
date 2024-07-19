<template>
    <section class="faq">
        <div class="faq__container container">
            <h2 class="faq__title">Часто задаваемые вопросы</h2>
            <div class="faq__wrapper">
                <div v-for="(question, index) in questions" :key="index" class="faq__question">
                    <div class="faq__question-wrapper">
                        <p class="faq__question-text">{{ question.question }}</p>
                        <button
                            @click="toggleAnswer(index)"
                            class="faq__arrow-btn"
                            :class="{ active: showAnswer[index] }"
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
                        <div v-if="showAnswer[index]" class="faq__answer">
                            <p>{{ question.answer }}</p>
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
        question: 'Как начать пользоваться сервисом?',
        answer: '1После регистрации вам будет открыт доступ к сопроводительным материалам кейса и возможности запуска разминок'
    },
    {
        question: 'Какое оборудование необходимо для запуска разминок?',
        answer: '2После регистрации вам будет открыт доступ к сопроводительным материалам кейса и возможности запуска разминок'
    },
    {
        question: 'Что такое витрина, направление, кейс, разминка?',
        answer: '3После регистрации вам будет открыт доступ к сопроводительным материалам кейса и возможности запуска разминок'
    },
    {
        question: 'У меня есть идея, могу я ее предложить?',
        answer: '4После регистрации вам будет открыт доступ к сопроводительным материалам кейса и возможности запуска разминок'
    },
    {
        question: 'Как я могу помочь проекту?',
        answer: '5После регистрации вам будет открыт доступ к сопроводительным материалам кейса и возможности запуска разминок'
    }
])

const showAnswer = ref(Array(questions.value.length).fill(false))

const toggleAnswer = (index) => {
    showAnswer.value[index] = !showAnswer.value[index]
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.faq {
    padding: 100px 64px;

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
    border: 1px solid #060c1f;
    cursor: pointer;
    transition:
        background-color 0.3s,
        transform 0.3s;

    &.active {
        background-color: $orange;
        border: none;

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

.active {
    transform: rotate(180deg);
}

.faq__answer {
    border-radius: 24px;
    padding: 24px;
    width: 100%;
    background: $yellowy;
    box-sizing: border-box;
}
</style>
