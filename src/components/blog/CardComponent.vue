<template>
    <div class="blog-article__card" @click="$emit('link')">
        <div v-if="editing" class="flex justify-between p-2 bg-white">
            <button
                class="ml-2 border border-[#656d75] hover:border-[#e05704] hover:text-[#e05704] rounded-xl px-4 py-2"
                @click="(e) => edit(e, props.data.id)"
            >
                <span class="hidden sm:block"> Редактировать</span>
                <EditSvg class="w-6 h-6 sm:hidden" />
            </button>
            <button
                class="mr-2 border border-[#656d75] hover:border-[#e05704] hover:text-[#e05704] rounded-xl px-4 py-2"
                @click.stop="toggleDialog(props.data.id)"
            >
                <span class="hidden md:block"> Удалить</span>
                <RemoveSvg class="w-6 h-6 md:hidden" />
            </button>
        </div>
        <div
            v-if="props.data.file && props.data.type === 'article' && validUrl(props.data.file)"
            class="blog-article__cover"
        >
            <img :src="getUrl(props.data.file)" alt="image article" class="blog-article__img" />
        </div>
        <div v-else class="blog-article__cover default">
            <img src="/images/stub.png" alt="image article" class="blog-article__img" />
        </div>
        <div class="blog-article__tag" :class="props.editing && '!top-[60px] !left-[18px]'">
            <p v-if="props.data.type === 'article'" class="blog-article__tag-text">Статья</p>
            <p v-else class="blog-article__tag-text video">Видео</p>
        </div>
        <div class="blog-article__contnent">
            <h3 class="blog-article__title">
                {{ props.data.title }}
            </h3>
            <div class="blog-article__footer">
                <div class="blog-article__btns">
                    <div class="blog-article__btn">
                        <img
                            src="@/assets/icons/blog/like.svg"
                            alt="like"
                            class="blog-article__icon"
                        />
                        <div class="blog-article__count">
                            {{ props.data.likes }}
                        </div>
                    </div>
                    <div class="blog-article__btns">
                        <div class="blog-article__btn">
                            <img
                                src="@/assets/icons/blog/show.svg?url"
                                alt="like"
                                class="blog-article__icon"
                            />
                            <div class="blog-article__count">
                                {{ props.data.shows }}
                            </div>
                        </div>
                    </div>
                    <p class="blog-article__date">
                        {{ props.data.createdAt }}
                    </p>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <ModalConfirm :show="modalShow" @remove="removeArticle" @close="toggleDialog(null)">
                <template #body> <p class="text-xl font-medium">Удалить статью ?</p> </template>
            </ModalConfirm>
        </Teleport>
    </div>
</template>

<script setup>
import { useArticleStore } from '@/stores/articleStore'
import EditSvg from '@/assets/icons/blog/edit.svg?component'
import RemoveSvg from '@/assets/icons/remove.svg?component'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ModalConfirm from '../modal/ModalConfirm.vue'

const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    },
    editing: {
        type: Boolean,
        default: false
    }
})

defineEmits(['link'])

const articleStore = useArticleStore()
const modalShow = ref(false)
const removeId = ref(null)
const router = useRouter()

function validUrl(url) {
    try {
        new URL(getUrl(url))
        return true
    } catch (e) {
        return false
    }
}

function getUrl(url) {
    return import.meta.env.VITE_S3_URL + url
}

const edit = (e, id) => {
    e.stopPropagation()
    router.push({ name: 'edit-article', params: { id: id } })
}

function toggleDialog(id) {
    modalShow.value = !modalShow.value
    id ? (removeId.value = id) : (removeId.value = null)
}

function removeArticle() {
    modalShow.value = !modalShow.value
    articleStore.remove(removeId.value)
}
</script>
<style lang="scss">
.blog-article__card {
    display: flex;
    flex-direction: column;
    border: 2px solid $gray;
    border-radius: 24px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    .blog-article__cover::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
    }

    &:hover {
        background: $yellowy;
        border-color: $orange;
        box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
        .blog-article__cover::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: none;
        }
    }
}

.blog-article__cover {
    width: 100%;
    height: 220px;
    position: relative;
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
        background: $yellowy;
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
    margin: 0 16px;

    @media (max-width: $md) {
        gap: 16px;
    }

    @media (max-width: $sm) {
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
    color: $gray;
}
</style>
