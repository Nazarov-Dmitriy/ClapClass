<template>
    <div class="sidebar">
        <div class="sidebar__link-wrapper">
            <div
                v-for="(link, index) in links"
                :key="index"
                class="sidebar__link"
                @click="handleLinkClick(index, link.link)"
            >
                <img
                    :src="isActiveLink(link.link) ? link.activeIcon : link.icon"
                    :alt="link.description"
                    :class="{ 'link-active-border': isActiveLink(link.link) }"
                    class="sidebar__link-img"
                >
                <p
                    :class="{ 'link-active-text': isActiveLink(link.link) }"
                    class="sidebar__link-description"
                >
                    {{ link.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const links = [
    {
        icon: '/icons/cabinet/sidebar/sidebar-icon1.svg',
        activeIcon: '/icons/cabinet/sidebar/sidebar-active-icon1.svg',
        description: 'ВИТРИНА КЕЙСОВ',
        link: '/cabinet/showcase'
    },
    {
        icon: '/icons/cabinet/sidebar/sidebar-icon2.svg',
        activeIcon: '/icons/cabinet/sidebar/sidebar-active-icon1.svg',
        description: 'МОИ КЕЙСЫ',
        link: '/cabinet/my-cases'
    },
    {
        icon: '/icons/cabinet/sidebar/sidebar-icon3.svg',
        activeIcon: '/icons/cabinet/sidebar/sidebar-active-icon1.svg',
        description: 'МОИ СТАТЬИ',
        link: '/cabinet/my-article'
    },
    {
        icon: '/icons/cabinet/sidebar/sidebar-icon4.svg',
        activeIcon: '/icons/cabinet/sidebar-active-icon1.svg',
        description: 'ПРОФИЛЬ',
        link: '/cabinet/profile'
    }
]

const activeLinkIndex = ref(null)
const route = useRoute()
const router = useRouter()

function handleLinkClick (index, link) {
    if (route.path !== link) {
        router.push(link)
    }
    activeLinkIndex.value = index
}

const isActiveLink = (link) => route.path === link
</script>

<style lang="scss" scoped>
.link-active-text {
    color: #e05704 !important;
}

.link-active-border {
    border: 1px solid #e05704 !important;
}

.sidebar {
    padding: 12px 8px;
    box-sizing: border-box;
    max-width: 64px;
    background-color: #e6eaed;
}

.sidebar__link-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
}

.sidebar__link {
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
}

.sidebar__link-img {
    border: 1px solid #656d75;
    border-radius: 8px;
    padding: 4px;
    max-width: 48px;
    transition: filter 0.3s;
}

.sidebar__link-description {
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #656d75;
}
</style>
