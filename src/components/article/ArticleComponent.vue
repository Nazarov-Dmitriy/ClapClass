<template>
    <div class="article">
        <img
            v-if="props.article?.img"
            :src="props.article?.img"
            alt="atricle image"
            class="article__img"
        >
        <img
            v-else
            src="/images/stub.png"
            alt="image article"
            class="article__img"
        >
        <div class="article-layout">
            <div class="article__container">
                <div class="article__navigation">
                    <p
                        class="article__back"
                        @click="$router.push('/blog')"
                    >
                        &#8592; Вернуться в "Блог"
                    </p>
                    <div class="article__selection">
                        <p
                            class="article__prev" 
                            @click="$router.push(`/blog/${navigation.prevId}`)"
                        >
                            &lt; <span class="article__next-text">Предыдущая статья</span>
                        </p>
                        <p
                            class="article__next"
                            @click="$router.push(`/blog/${navigation.nextId}`)"
                        >
                            <span class="article__next-text">Cледующая статья</span> &gt;
                        </p>
                    </div>
                </div>
                <div class="article__main">
                    <div class="article__block">
                        <div class="article__header">
                            <h1 class="article__title">
                                {{ article.title }}
                            </h1>
                        </div>

                        <div
                            class="article__contnent"
                            v-html="getContnent"
                        />
                        <div class="article__btns">
                            <div class="article__btns-wraper">
                                <div class="article__raiting">
                                    <img
                                        src="@/assets/icons/article/up.svg"
                                        alt="up"
                                        class="article__btns-icon"
                                    >
                                    {{ article.show }}
                                    <img
                                        src="@/assets/icons/article/down.svg"
                                        alt="down"
                                        class="article__btns-icon"
                                    >
                                </div>
                                <ShareComponent
                                    :article="article"
                                    class="article__share"
                                />
                            </div>
                            <div
                                class="article__favorites"
                                :class="{ 'active': favorites }"
                                @click="favorites = !favorites"
                            >
                                <p class="article__favorites-text">
                                    Добавить в избранное
                                </p>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.84912 0.464844C4.74455 0.464844 3.84912 1.36028 3.84912 2.46485V19.1215C3.84912 20.8309 5.85469 21.7524 7.15176 20.6391L10.6973 17.5958C11.4467 16.9526 12.5533 16.9526 13.3027 17.5959L16.8526 20.6434C18.1496 21.7568 20.1553 20.8352 20.1553 19.1258V2.46484C20.1553 1.36027 19.2599 0.464844 18.1553 0.464844H5.84912Z"
                                        fill="#5B94EA"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="article__sidebar">
                        <OtherArticle :other-atricle="otherAtricle" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import ShareComponent from './ShareComponent.vue';
import OtherArticle from './OtherArticle.vue';

const favorites = ref(false)

const props = defineProps({
    article: {
        type: Array,
        default: () => []
    },
    otherAtricle: {
        type: Array,
        default: () => []
    },
    navigation: {
        type: Object,
        default: () => {}
    },

})

const getContnent = computed(() => {
    let content = '';
    if (props.article?.content) {
        props.article?.content.forEach(el => {
            content += el
        });
    }
    return content
})

watch(() => props.article, () => {
})

</script>
<style lang="scss">
.article {
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.article__img {
    width: 100%;
    aspect-ratio: 4.8 /1;
    min-height: 400px;
    object-fit: cover;

    @media (max-width: $xl) {
        aspect-ratio: 3 /1;
    }

    @media (max-width: $lg) {
        aspect-ratio: 2.5 /1;
    }

    @media (max-width: $md) {
        aspect-ratio: 1.9 /1;
        min-height: 200px;
    }

    @media (max-width: $sm) {
        aspect-ratio: 1.6 /1;
    }


}

.article__container {
    display: flex;
    flex-wrap: wrap;
    padding: 48px 64px 60px 64px;
    gap: 21px;

    @media (max-width: $lg) {
        gap: 48px;
        padding: 48px 16px 60px 16px;
    }

    @media (max-width: $sm) {
        gap: 28px;
        padding: 24px ;
    }
}

.article__navigation {
    display: flex;
    gap: 48px;
    align-items: center;
    flex: 1 1 100%;

    @media (max-width: $md) {
        gap: 16px;
    }

    @media (max-width: $sm) {
        justify-content: space-between;
        .article__next-text{
            display: none;
        }
    }
}

.article__back {
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
    color: $black;
}

.article__selection {
    display: flex;
    gap: 16px;
}

.article__prev,
.article__next {
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
    color: $gray;
}

.article__back,
.article__prev,
.article__next {
    &:hover {
        color: $orange;
    }

    &:active {
        color: $red;
        text-decoration: underline;
    }
}


.article__main {
    display: flex;
    flex: 1 1 100%;
    gap: 40px;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 1;

    @media (max-width: $xl) {
        flex-direction: column;
        gap: 48px;
    }
}

.article__block {
    flex: 0 1 1160px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media (max-width: $sm) {
        gap: 24px;
    }
}

.article__header {
    flex: 1 1 100%;
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
}

.article__title {
    flex: 1 1 100%;
    font-family: 'CenturyGothic';
    font-size: 60px;
    line-height: 60px;
    color: $black;
    padding-bottom: 32px;
    border-bottom: 1px solid $gray;

    @media (max-width: $lg) {
        font-size: 40px;
    }

    @media (max-width: $sm) {
        font-size: 26px;
        line-height: 39px;
        padding-bottom: 16px;
    }
}


.article__contnent {
    font-size: 20px;
    line-height: 30px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    @media (max-width: $sm) {
        font-size: 16px;
        line-height: 24px;
    }
}

.article__contnent p {
    text-indent: 30px;
    text-align: justify;
}

.article__btns {
    flex: 1 1 100%;
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-between;

    @media (max-width: $sm) {
        gap: 16px;
        flex-direction: column;
        align-items: flex-end;
    }
}

.article__btns-wraper{
    display: flex;
    gap: 40px;

    @media (max-width: $sm) {
       width: 100%;
    }    
}

.article__btns-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.article__raiting {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
    color: $black;
}

.article__favorites {
    display: flex;
    gap: 16px;
    align-items: center;
    flex: 0 0 218px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: $gray;
    cursor: pointer;

    & svg path {
        fill: $gray;
    }

    &:hover {
        color: $orange;

        & svg path {
            fill: $orange;
        }
    }

    &:active,
    &.active {
        color: $gray;

        & svg path {
            fill: $red;
        }
    }

    @media (max-width: $sm) {
        flex: 0 0 auto;
    }   
}

.article__share {
    @media (max-width: $sm) {
        margin-left: auto;
        flex: 0 0 auto;
    }
}

.article__favorites-text {
    display: block;
}


.article__sidebar {
    display: flex;
    gap: 40px;
    flex: 0 1 584px;
    flex-wrap: wrap;
    align-content: flex-start;

    @media (max-width: $xl) {
        flex-direction: column;
        gap: 48px;
    }
}


.article-layout {
    position: relative;
    overflow: hidden;
}
</style>