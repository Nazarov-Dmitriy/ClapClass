<template>
    <section class="news">
        <div class="news__container container">
            <img
                class="news__bg"
                src="../../assets/images/main/news/news-bg.png"
                alt="Background"
            />
            <div class="news__wrapper">
                <div class="news__info">
                    <h2 class="news__info-title">Новости проекта</h2>
                    <BtnComponent 
                        class="news__info-btn" 
                        emit-name="goToBlog" 
                        @goToBlog="goToBlog">
                        Перейти в блог
                    </BtnComponent>
                </div>
                <div class="news__cards">
                    <div
                        v-for="(news, index) in limitedNewsItems"
                        :key="index"
                        class="news__card"
                        @click="linkArticle(news.id)"
                    >
                        <div class="news__card-info">
                            <div class="news__card-info-hash">
                                <span 
                                    v-for="tag in news.tags" 
                                    :key="tag">{{ tag }}</span>
                            </div>
                            <p class="news__card-text">
                                {{ news.title }}
                            </p>
                        </div>
                        <div class="news__card-date">
                            <span>{{ news.publication_date }}</span>
                        </div>
                    </div>
                    <div class="news__card--subscribe">
                        <div class="news__card-img-wrapper">
                            <img
                                src="../../assets/images/main/news/news-hero.png"
                                alt="Subscribe"
                                class="news__card-img"></img>
                            <div class="news__card-img-text-wrapper">
                                <p class="news__card-img-text">Подписывайся на наши новости!</p>
                                <img
                                    class="news-text-bg"
                                    src="../../assets/images/main/news/news-text-bg.png"
                                    alt="Text Background"
                                ></img>
                            </div>
                        </div>
                        <div class="news__card-info news__card-info--subscribe">
                            <form
                                action="#"
                                class="news__card-form"
                                @submit.prevent="sendMail"
                                @keypress.enter.prevent="sendMail"
                            >
                                <input
                                    v-model="email"
                                    class="news__card-form-input"
                                    :class="{ 'is-invalid': showDangerBlock }"
                                    type="text"
                                    placeholder="Введите ваш email"/>
                                <div v-if="showDangerBlock" class="input-error">
                                    <img
                                        src="../../assets/images/main/news/news-error-icon.svg"
                                        alt=""/>
                                    <span>Поле заполненно некорректно</span>
                                </div>
                                <div>
                                    <div class="news__card-info-wrapper">
                                        <div class="news__card-btn-wrapper">
                                            <BtnComponent class="news__card-form-btn">
                                                Подписаться
                                            </BtnComponent>
                                        </div>
                                        <p class="news__card-text--subscribe">
                                            Нажимая кнопку “Подписаться” вы соглашаетесь с
                                            <span>
                                                <a class="news__card-text-link--subscribe" href="#">
                                                    политикой обработки персональных данных
                                                </a>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, defineProps, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import BtnComponent from '../btns/BtnComponent.vue'

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
})

const email = ref('')
const showDangerBlock = ref(false)
const newsItems = ref([])

const router = useRouter()

function linkArticle(id) {
    router.push(`/blog/${id}`)
}

watch(
    () => props.data,
    (newData) => {
        newsItems.value = newData.map((news, index) => ({
            id: news.id ?? index,
            ...news
        }))
    },
    { immediate: true }
)

const limitedNewsItems = computed(() => {
    return newsItems.value.slice(0, 3)
})

function goToBlog() {
    router.push('/blog')
}

function sendMail() {
    if (validateEmail(email.value)) {
        showDangerBlock.value = false
        email.value = ''
    } else {
        showDangerBlock.value = true
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

</script>

<style lang="scss">
.news {
    padding: 100px 0 0 0;
    overflow: hidden;
    box-sizing: border-box;
    @media (max-width: $lg) {
        padding: 48px 0;
    }
    @media (max-width: $sm) {
        padding: 24px 0;
    }
}

.news__container {
    position: relative;
}

.news__bg {
    transform: translate(0, 10px);
    width: 100%;
}

.news__wrapper {
    padding: 0 64px 48px 64px;
    background: $fonLight;
    display: flex;
    flex-direction: column;
    gap: 58px;
    box-sizing: border-box;

    @media (max-width: $lg) {
        gap: 16px;
        padding: 16px 16px 48px 16px;
    }
    @media (max-width: $sm) {
        gap: 16px;
        padding: 16px 16px 24px 16px;
    }
}

.news__info {
    display: flex;
    flex-direction: column;
    gap: 23px;
    padding-top: 54px;

    @media (max-width: $lg) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0;
    }
    @media (max-width: $sm) {
        flex-direction: column;
        justify-content: center;
        gap: 16px;
    }
}

.news__info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $orange;

    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 1.5;
    }
    @media (max-width: $sm) {
        font-size: 24px;
    }
}

.news__info-btn {
    width: max-content;
}

.news__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    justify-content: space-between;

    @media (max-width: $lg) {
        grid-template-columns: 1fr;
    }
}

.news__card {
    border: 2px solid $orange;
    border-radius: 24px;
    background: $white;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    cursor: pointer;

    &:hover {
        background: $yellowy;
    }
    &:hover .news__card-text {
        color: $red;
    }
}

.news__card-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.news__card-info-hash {
    display: flex;
    gap: 16px;
}

.news__card-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    color: $orange;
}

.news__card-date {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: $black;
}

.news__card-info--subscribe {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: $lg) {
    }
}

.news__card-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    @media (max-width: $lg) {
        display: flex;
        align-items: start;
    }
}

.news__card-info-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: $lg) {
        flex-direction: row;
        align-items: center;
    }
    @media (max-width: $sm) {
        flex-direction: column;
    }
}

.news__card-form-input {
    border: 2px solid $gray;
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    width: 100%;

    &:hover {
        border: 2px solid #656d75;
        background: #e6eaed;
    }

    &:focus {
        background: $white;
    }

    @media (max-width: $lg) {
        width: 100%;
    }
}
.input-error {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: -16px;
    box-sizing: border-box;
    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        color: $orange;
    }
}

.is-invalid {
    border-color: $orange !important;
}

.news__card-btn-wrapper {
    display: flex;
    justify-content: center;

    @media (max-width: $sm) {
        width: 100%;
    }
}

.news__card-form-btn {
    border: 2px solid $white;
    border-radius: 24px;
    padding: 8px 16px;
    width: 163px;
    height: 46px;
    background: $gray;
    color: $white;
    text-align: center;

    @media (max-width: $sm) {
        width: 100%;
    }
}

.news__card--subscribe {
    border-radius: 24px;
    padding: 32px 16px 16px 16px;
    box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $gray;

    @media (max-width: $lg) {
        margin-top: 220px;
    }
    @media (max-width: $sm) {
        margin-top: 320px;
    }
}

.news__card-text--subscribe {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.5;
    color: $white;

    .news__card-text-link--subscribe {
        font-size: 12px;
        color: $white;
    }

    .news__card-text--subscribe span {
        text-decoration: underline;
        text-decoration-skip-ink: none;
    }

    @media (max-width: $lg) {
        grid-area: text;
    }
}

.news__card-img-wrapper {
    position: relative;
}
.news__card-img {
    position: absolute;
    transform: translate(-50%);
    top: -242px;
    left: 50%;

    @media (max-width: $lg) {
        right: 0;
        left: auto;
        transform: translate(0);
    }
    @media (max-width: $sm) {
        width: 288px;
        transform: translate(-50%);
        top: -220px;
        left: 50%;
    }
}

.news__card-img-text-wrapper {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: $black;
    box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $white;
    border-radius: 16px;
    padding: 16px;
    position: absolute;
    width: 204px;
    top: -240px;
    left: -257px;

    @media (max-width: $lg) {
        left: 50%;
        transform: translate(-100%);
    }

    @media (max-width: $sm) {
        top: -300px;
        transform: translate(-50%, -50%);
    }
}

.news-text-bg {
    position: absolute;
    top: 50px;
    right: -20px;

    @media (max-width: $sm) {
        display: none;
    }
}
</style>
