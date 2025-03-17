<template>
    <div class="panel">
        <div class="panel__links">
            <ul class="panel__links-list">
                <li
                    v-for="(crumb, index) in breadcrumbs"
                    :key="index"
                    class="panel__links-list-item"
                >
                    <router-link v-if="crumb.title" :to="crumb.url && crumb.url">{{
                        crumb.title
                    }}</router-link>
                    <span v-else> {{ crumb }}</span>
                    <span v-if="index < breadcrumbs.length - 1">/</span>
                </li>
            </ul>
        </div>
        <div class="panel__search">
            <div class="blog__search">
                <input
                    :value="props.search"
                    type="text"
                    class="blog__search-input"
                    placeholder="Поиск"
                    @input="emit('update:search', $event.target.value)"
                    @keypress.enter="$emit('search')"
                    @blur="$emit('search')"
                />
                <SearchIcon class="blog__search-icon"></SearchIcon> 
            </div>
        </div>
    </div>
</template>

<script setup>
import SearchIcon from '@/assets/icons/search.svg?component'
import { onMounted, ref, watchEffect, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    search: {
        type: String,
        default: ''
    }
})

const translations = {
    cabinet: { title: 'Кабинет', url: '/cabinet/profile' },
    showcase: { title: 'Витрина кейсов', url: '/cabinet/showcase' },
    'my-cases': { title: 'Мои кейсы', url: '/cabinet/my-cases' },
    'my-article': { title: 'Мои статьи', url: '/cabinet/my-article' },
    profile: { title: 'Профиль', url: '/cabinet/profile' }
}

const emit = defineEmits(['update:search', 'search'])

const breadcrumbs = ref([])
const route = useRoute()

onMounted(async () => {
    await nextTick()
    updateBreadcrumbs()
})

function updateBreadcrumbs() {
    const path = route.path
        .split('/')
        .filter((p) => p)
        .map((segment) => {
            const decodedSegment = decodeURIComponent(segment)
            return translations[decodedSegment] || decodedSegment
        })

    breadcrumbs.value = path
}

watchEffect(() => {
    updateBreadcrumbs()
})
</script>

<style scoped lang="scss">
.panel {
    padding: 8px 64px 8px 8px;
    background: #e6eaed;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.panel__links {
    display: flex;
}
.panel__links-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    span {
        font-family: 'CenturyGothic';
        font-weight: 700;
        font-size: 20px;
        line-height: 150%;
        color: #656d75;
    }
}
.panel__links-list-item {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
    color: #656d75;
}

.blog__search-input {
    max-width: 192px;
}
</style>
