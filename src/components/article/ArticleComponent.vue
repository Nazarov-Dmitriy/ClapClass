<template>
    <div class="article">
        <template v-if="article?.type === 'video'">
            <video-player
                :src="getUrl(article?.file)"
                controls
                :loop="true"
                :volume="0.6"
                class="w-full aspect-square"
                aspect-ratio="16:9"
            />
        </template>
        <template v-else>
            <img
                v-if="!getUrl(article?.file)"
                src="/images/stub.png"
                alt="image article"
                class="article__img"
            />
            <img v-else :src="getUrl(article?.file)" alt="atricle image" class="article__img" />
        </template>
        <div class="article-layout">
            <div class="article__container">
                <div class="article__navigation">
                    <p class="article__back" @click="$router.push('/blog')">
                        &#8592; Вернуться в "Блог"
                    </p>
                    <div class="article__selection">
                        <p
                            class="article__prev"
                            :class="!sublingId?.prev && 'hover:!text-[#656d75] !cursor-not-allowed'"
                            @click="sublingId?.prev && $router.push(`/blog/${sublingId.prev}`)"
                        >
                            &lt; <span class="article__next-text">Предыдущая статья</span>
                        </p>
                        <p
                            class="article__next"
                            :class="!sublingId?.next && 'hover:!text-[#656d75] !cursor-not-allowed'"
                            @click="sublingId?.next && $router.push(`/blog/${sublingId.next}`)"
                        >
                            <span class="article__next-text">Cледующая статья</span> &gt;
                        </p>
                    </div>
                </div>
                <div class="article__main">
                    <div class="article__block">
                        <div class="article__header">
                            <h1 class="article__title">
                                {{ article?.title }}
                            </h1>
                        </div>

                        <div class="article__contnent" v-html="props.article?.article" />
                        <div class="article__btns">
                            <div class="article__btns-wraper">
                                <div class="article__raiting">
                                    <img
                                        src="@/assets/icons/article/up.svg"
                                        alt="up"
                                        class="article__btns-icon"
                                        @click="setLike('add')"
                                    />
                                    {{ props.article?.likes }}
                                    <img
                                        src="@/assets/icons/article/down.svg"
                                        alt="down"
                                        class="article__btns-icon"
                                        @click="setLike('dis')"
                                    />
                                </div>
                                <ShareComponent :article="article" class="article__share" />
                            </div>
                            <div
                                v-if="user"
                                class="article__favorites"
                                :class="{ active: favorites.active }"
                                @click="favoritesChange()"
                            >
                                <p class="article__favorites-text">
                                    {{
                                        favorites.active
                                            ? 'Удалить из избранного'
                                            : 'Добавить в избранное'
                                    }}
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
                        <OtherArticle :other-atricle="props.otherAtricle" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive, ref, watch } from 'vue'
import ShareComponent from './ShareComponent.vue'
import OtherArticle from './OtherArticle.vue'
import { useArticleStore } from '@/stores/articleStore'

const articleStore = useArticleStore()
const props = defineProps({
    article: {
        type: Object,
        default: () => {}
    },
    otherAtricle: {
        type: Array,
        default: () => []
    },
    navigation: {
        type: Object,
        default: () => {}
    },
    sublingId: {
        type: Object,
        default: () => {}
    },
    user: {
        type: Object,
        default: () => {}
    }
})

const activeLike = ref(null)
const initialValueLike = ref(null)
const getFavoriteArticle = computed(() => {
    return articleStore.getFavoriteArticle
})

const favorites = reactive({
    active: getFavoriteArticle,
    disabled: false
})

function setLike(param) {
    if (param === 'add') {
        if (activeLike.value !== 'add') {
            articleStore.setLike({
                id: props.article.id,
                like: activeLike.value === 'dis' && !!initialValueLike.value ? 2 : 1
            })
        }
        activeLike.value = 'add'
    } else {
        if (activeLike.value !== 'dis') {
            articleStore.setLike({
                id: props.article.id,
                dislike: activeLike.value ? 2 : 1
            })
        }
        activeLike.value = 'dis'
    }
}

function getUrl(path) {
    if (!path) {
        return false
    }
    let url = import.meta.env.VITE_S3_URL + path
    try {
        new URL(url)
        return url
    } catch (e) {
        return false
    }
}

async function favoritesChange() {
    if (favorites.disabled) {
        return
    }
    favorites.disabled = true
    let params = { article_id: props.article?.id, user_id: props.user?.id }

    getFavoriteArticle.value
        ? articleStore.removeFavorite(params)
        : articleStore.addFavorite(params)
}

watch(
    () => props.isFavorite,
    (newVal) => {
        favorites.active = newVal
    }
)

watch(
    () => props.article,
    (val) => {
        initialValueLike.value === null ? (initialValueLike.value = val.likes) : null
    }
)

watch(getFavoriteArticle, () => {
    favorites.disabled = false
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
        padding: 24px;
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
        .article__next-text {
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

.article__btns-wraper {
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
    flex: 0 0 auto;
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
