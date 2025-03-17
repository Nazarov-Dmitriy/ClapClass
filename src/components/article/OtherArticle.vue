<template>
    <div class="article__other">
        <h2 class="article__other-title">Это интересно</h2>
        <div class="article__other-container">
            <div class="article__other-list">
                <CardComponent
                    v-for="item in props.otherAtricle"
                    :key="item.id"
                    class="article__other-item"
                    :data="item"
                    @link="article(item.id)"
                />
            </div>
            <Subcribe class="article__other-subscribe" />
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import CardComponent from '../blog/CardComponent.vue'
import Subcribe from '../subscribe/SubcribeComponent.vue'

const router = useRouter()

const props = defineProps({
    otherAtricle: {
        type: Array,
        default: () => []
    }
})

function article(id) {
    router.push({ path: `/blog/${id}` })
}
</script>
<style lang="scss">
.article__other {
    width: 100%;
    display: flex;
    gap: 48px;
    flex-direction: column;
}

.article__other-title {
    font-family: 'CenturyGothic';
    font-size: 36px;
    line-height: 48px;
    color: $gray;
    margin-top: 148px;

    @media (max-width: $xl) {
        margin-top: 0;
    }

    @media (max-width: $lg) {
        font-size: 32px;
    }

    @media (max-width: $sm) {
        font-size: 24px;
        line-height: 36px;
    }
}

.article__other-container {
    display: flex;
    gap: 48px;
    flex-direction: column;
    align-items: center;

    @media (max-width: $sm) {
        gap: 24px;
    }
}

.article__other-list {
    display: flex;
    gap: 16px;
    flex-direction: column;
    width: 100%;

    @media (max-width: $xl) {
        flex-direction: row;
        flex-wrap: wrap;
    }
}

.article__other-item {
    @media (max-width: $xl) {
        flex-direction: row;
        flex-wrap: wrap;
        width: calc(100% / 2 - 8px);
    }

    @media (max-width: $md) {
        width: 100%;
    }
}

.article__other-item:nth-child(4) {
    display: none;

    @media (max-width: $xl) {
        display: block;
    }

    @media (max-width: $md) {
        display: none;
    }
}

.article__other-subscribe {
    width: 100%;
}
</style>
