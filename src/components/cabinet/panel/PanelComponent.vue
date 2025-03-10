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
                <svg
                    class="blog__search-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_3001_8774)">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M24.0008 9.6C24.0008 14.9019 19.7027 19.2 14.4008 19.2C9.09885 19.2 4.80078 14.9019 4.80078 9.6C4.80078 4.29807 9.09885 0 14.4008 0C19.7027 0 24.0008 4.29807 24.0008 9.6ZM15.1178 3.5366C14.548 3.47987 13.9727 3.55039 13.4335 3.74306C12.8943 3.93573 12.4046 4.24574 11.9998 4.65071C11.6093 5.04131 11.6095 5.67448 12.0001 6.06493C12.3907 6.45537 13.0238 6.45525 13.4143 6.06465C13.6097 5.86913 13.8461 5.71946 14.1065 5.62644C14.3668 5.53342 14.6446 5.49937 14.9196 5.52676C15.1947 5.55415 15.4603 5.6423 15.6972 5.78482C15.9341 5.92735 16.1363 6.1207 16.2894 6.35092C16.5952 6.81084 17.2159 6.93581 17.6758 6.63004C18.1357 6.32428 18.2607 5.70357 17.9549 5.24365C17.6379 4.76681 17.2189 4.36632 16.7283 4.07111C16.2377 3.7759 15.6876 3.59334 15.1178 3.5366Z"
                            fill="#656D75"
                        />
                        <path
                            d="M3 22.0338L9 16.0332"
                            stroke="#656D75"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_3001_8774">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
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
