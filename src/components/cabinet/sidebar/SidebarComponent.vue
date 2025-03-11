<template>
    <div class="sidebar">
        <div class="sidebar__link-wrapper">
            <div
                v-for="(link, index) in links"
                :key="index"
                class="sidebar__link"
                @click="handleLinkClick(index, link.link)"
            >
                <div
                    class="w-12 h-12 p-[3px] border border-px rounded-lg border-gray"
                    :class="{ 'link-active ': isActiveLink(link.link) }"
                >
                    <component :is="link.component" class="sidebar__link-img"></component>
                </div>
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
import Case from '@/assets/icons/case/sidebar/sidebar-icon1.svg?component'
import MyCase from '@/assets/icons/case/sidebar/sidebar-icon2.svg?component'
import MyArticle from '@/assets/icons/case/sidebar/sidebar-icon3.svg?component'
import Profile from '@/assets/icons/case/sidebar/sidebar-icon4.svg?component'

const links = [
    {
        icon: '/icons/cabinet/sidebar/sidebar-icon1.svg',
        description: 'ВИТРИНА КЕЙСОВ',
        link: '/cabinet/showcase',
        component: Case
    },
    {
        icon: '/icons/cabinet/sidebar/sidebar-icon2.svg',
        description: 'МОИ КЕЙСЫ',
        link: '/cabinet/my-cases',
        component: MyCase
    },
    {
        icon: '/icons/cabinet/sidebar/sidebar-icon3.svg',
        description: 'МОИ СТАТЬИ',
        link: '/cabinet/my-article',
        component: MyArticle
    },
    {
        icon: '/icons/cabinet/sidebar/sidebar-icon4.svg',
        description: 'ПРОФИЛЬ',
        link: '/cabinet/profile',
        component: Profile
    }
]

const activeLinkIndex = ref(null)
const route = useRoute()
const router = useRouter()

function handleLinkClick(index, link) {
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

.link-active {
    border: 1px solid #e05704 !important;
    .sidebar__link-img {
        color: $orange;
    }
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
    color: $gray;
    transition: filter 0.3s;
    width: 100%;
    height: 100%;
}

.sidebar__link-description {
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #656d75;
}
</style>
