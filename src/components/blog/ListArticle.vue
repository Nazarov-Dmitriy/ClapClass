<template>
    <div class="blog-article__container">
        <div
            v-if="renderList.length > 0"
            class="blog-article__list"
        >
            <div
                v-for="el in renderList"
                :key="el.id"
                class="blog-article__card"
                @click="linkArticle(el.id)"
            >
                <div
                    v-if="el.img"
                    class="blog-article__cover"
                >
                    <img
                        :src="el.img"
                        alt="image article"
                        class="blog-article__img"
                    >
                </div>
                <div
                    v-else
                    class="blog-article__cover default"
                >
                    <img
                        src="/public/images/stub.png"
                        alt="image article"
                        class="blog-article__img"
                    >
                </div>
                <div class="blog-article__tag">
                    <p
                        v-if="el.type === 'article'"
                        class="blog-article__tag-text"
                    >
                        Статья
                    </p>
                    <p
                        v-else
                        class="blog-article__tag-text video"
                    >
                        Видео
                    </p>
                </div>
                <div class="blog-article__contnent">
                    <h3 class="blog-article__title">
                        {{ el.title }}
                    </h3>
                    <div class="blog-article__footer">
                        <div class="blog-article__btns">
                            <div class="blog-article__btn">
                                <img
                                    src="@/assets/icons/blog/like.svg"
                                    alt="like"
                                    class="blog-article__icon"
                                >
                                <div class="blog-article__count">
                                    {{ el.like }}
                                </div>
                            </div>
                            <div class="blog-article__btns">
                                <div class="blog-article__btn">
                                    <img
                                        src="@/assets/icons/blog/show.svg"
                                        alt="like"
                                        class="blog-article__icon"
                                    >
                                    <div class="blog-article__count">
                                        {{ el.show }}
                                    </div>
                                </div>
                            </div>
                            <p class="blog-article__date">
                                {{ el.publication_date }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="no-result">
                По запросу {{ search }} ничего не найдено.
            </h2>
        </div>
        <PaginationComponent
            :perpage="12"
            :data="props.data"
            :color="{ main: '#0E0806', hover: '#E05704' }"
            @set-list="getRenderList"
        />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import PaginationComponent from '../pagination/PaginationComponent.vue';

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    search: {
        type: String,
        default: ''
    },
})

const router = useRouter()
const renderList = ref([])

function getRenderList (list) {
    console.log(list);
    renderList.value = list
}

function linkArticle (id) {
    router.push(`/blog/${id}`)
}

watch(() => props.data, () => {
})

</script>
<style lang="scss">
.blog-article__container {
    display: flex;
    flex-direction: column;
    gap: 48px;
}

.blog-article__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media(max-width: $lg) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: $sm) {
        grid-template-columns: 1fr;
    }
}

.blog-article__card {
    display: flex;
    flex-direction: column;
    border: 2px solid $gray;
    border-radius: 24px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    &:hover {
        background: $yellowy;
        border-color: $orange;
        box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    }
}

.blog-article__cover {
    width: 100%;
    height: 220px;
}

.blog-article__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.blog-article__tag {
    position: absolute;
    top: 16px;
    left: 24px;
    border: 1px solid $gray;
    border-radius: 8px;
    background: $fonLight;
    overflow: hidden;

    & .video {
        background: $yellowy
    }
}

.blog-article__tag-text {
    padding: 4px 8px;
}

.blog-article__contnent {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;
    flex-grow: 1;

}

.blog-article__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    color: $black;
    max-height: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    width: 100%;
}

.blog-article__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.blog-article__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    width: 100%;

    @media(max-width: $md) {
        gap: 16px;
    }

    @media(max-width: $sm) {
        gap: 24px;
    }
}

.blog-article__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.blog-article__icon {
    width: 24px;
    height: 24px;
}

.blog-article__count,
.blog-article__date,
.blog-article__tag-text {
    font-size: 16px;
    line-height: 1.5;
    color: $gray
}
</style>