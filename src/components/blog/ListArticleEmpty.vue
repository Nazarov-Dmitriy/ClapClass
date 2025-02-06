<template>
    <div class="blog-article__container">
        <div class="blog-article__list">
            <CardEmptyComponent v-for="el in items" :key="el.id" />
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import CardEmptyComponent from './CardEmptyComponent.vue'

const props = defineProps({
    size: {
        type: Number,
        default: 6
    }
})

const items = ref(new Array(props.size).fill(null).map((_, idx) => idx + 1))

watch(props.size, (val) => {
    items.value = ref(new Array(val).fill(null).map((_, idx) => idx + 1))
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

    @media (max-width: $lg) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $sm) {
        grid-template-columns: 1fr;
    }
}
</style>
