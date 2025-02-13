<template>
    <header ref="headerMobile" class="header">
        <Transition name="slide-fade">
            <div v-if="isVisible" class="header-mobile" :class="{ 'is-active': isVisible }">
                <div class="header-mobile__wrapper">
                    <nav class="header__nav header__nav--mobile">
                        <ul class="header__list">
                            <li class="header__list-item">
                                <router-link to="/services" class="header__list-link">
                                    Сервисы
                                </router-link>
                            </li>
                            <li class="header__list-item">
                                <router-link class="header__list-link" to="/about">
                                    О проекте
                                </router-link>
                            </li>
                            <li class="header__list-item">
                                <router-link to="/cooperation" class="header__list-link">
                                    Сотрудничество
                                </router-link>
                            </li>
                            <li class="header__list-item">
                                <router-link to="/blog" class="header__list-link">
                                    Блог
                                </router-link>
                            </li>
                            <li v-if="getUser" class="header__list-item">
                                <router-link to="/admin" class="header__list-link">
                                    Админстрирование
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                    <div
                        class="header__btn-wrapper header__btn-wrapper--mobile"
                        :class="{ 'is-active': isVisible }"
                    >
                        <BtnComponent
                            emit-name="action"
                            class="header__btn"
                            @action="setModal('login')"
                        >
                            Вход
                        </BtnComponent>
                    </div>
                </div>
            </div>
        </Transition>
        <div class="header__container">
            <div class="header__wrapper">
                <div class="header__logo">
                    <router-link to="/">
                        <img
                            src="../../assets/images/header/header-logo.png"
                            alt=""
                            class="header__logo-img"
                        />
                    </router-link>
                </div>

                <div class="hamburger" :class="{ 'is-active': btnMenu }" @click="setMenuAcive()">
                    <span class="line" />
                    <span class="line" />
                    <span class="line" />
                </div>
                <nav class="header__nav">
                    <ul class="header__list">
                        <li class="header__list-item">
                            <router-link to="/services" class="header__list-link">
                                Сервисы
                            </router-link>
                        </li>
                        <li class="header__list-item">
                            <router-link class="header__list-link" to="/about">
                                О проекте
                            </router-link>
                        </li>
                        <li class="header__list-item">
                            <router-link to="/cooperation" class="header__list-link">
                                Сотрудничество
                            </router-link>
                        </li>
                        <li class="header__list-item">
                            <router-link to="/blog" class="header__list-link"> Блог </router-link>
                        </li>
                        <li v-if="getUser" class="header__list-item">
                            <router-link to="/admin" class="header__list-link">
                                Админстрирование
                            </router-link>
                        </li>
                    </ul>
                </nav>
                <div class="header__btn-wrapper">
                    <BtnComponent
                        v-if="!getUser"
                        emit-name="action"
                        class="header__btn"
                        @action="() => setModal('login')"
                    >
                        Вход
                    </BtnComponent>
                    <button
                        v-if="getAutotizationBtn === 'page'"
                        class="btn__profile"
                        @click="$router.push('/cabinet/profile')"
                    >
                        <img
                            v-if="getUser?.avatar"
                            :src="getUrl"
                            alt="user"
                            class="btn__profile-img w-12 h-12 rounded-full"
                        />
                        <img
                            v-else
                            src="@/assets/icons/header/user.svg"
                            alt="user"
                            class="btn__profile-img"
                        />
                    </button>

                    <div
                        v-if="getAutotizationBtn === 'cabinet'"
                        class="flex gap-4 items-center px-2 py-1 cursor-pointer"
                        @click="logout()"
                    >
                        <span :class="{ cabinet: activeLkClass }">Выход</span>
                        <img class="w-5 h-5" src="@/assets/icons/header/exit.svg" alt="" />
                    </div>
                </div>
            </div>
            <Teleport to="body">
                <AuthComponent :modal="modal" @close="() => setModal('')" />
            </Teleport>
        </div>
    </header>
</template>
<script setup>
import BtnComponent from '../btns/BtnComponent.vue'
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import AuthComponent from '../modal/auth/AuthComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'

const isVisible = ref(false)
const btnMenu = ref(false)
const headerMobile = ref(null)
const modal = ref('')
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const getUser = computed(() => {
    return userStore.getUser
})

const getAutotizationBtn = computed(() => {
    let path = route.path
    if (userStore.getUser) {
        return path.includes('/cabinet/') ? 'cabinet' : 'page'
    } else {
        return false
    }
})

const getIsSuccess = computed(() => userStore.getIsSuccess)

onMounted(() => {
    window.addEventListener('click', closeHeader)
})

onBeforeUnmount(() => {
    window.removeEventListener('click', closeHeader)
})

function setMenuAcive() {
    btnMenu.value = !btnMenu.value
    isVisible.value = !isVisible.value
}

const closeHeader = (element) => {
    if (!headerMobile.value.contains(element.target)) {
        isVisible.value = false
        btnMenu.value = false
    }
}

const getUrl = computed(() => {
    return getUser.value?.avatar ? import.meta.env.VITE_S3_URL + getUser.value?.avatar : null
})

function setModal(value) {
    modal.value = value
}

function logout() {
    userStore.logout()
}

watch(getIsSuccess, (val) => {
    if (val === 'logout') {
        router.push('/')
    }
})
</script>
<style lang="scss">
.header-mobile {
    display: none;

    @media (max-width: $lg) {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        padding: 16px 64px;
        top: 80px;
        height: max-content;
        left: 0;
        bottom: 0;
        box-shadow:
            0 2px 4px 0 rgba(21, 15, 13, 0.1),
            0 8px 8px 0 rgba(21, 15, 13, 0.09);
        background: white;
        z-index: 9999;
    }

    @media (max-width: $sm) {
        padding: 16px;
    }
}

.header {
    padding: 16px 64px;
    box-sizing: border-box;
    top: 0;
    z-index: 999;
    box-shadow:
        0 2px 4px 0 rgba(21, 15, 13, 0.1),
        0 8px 8px 0 rgba(21, 15, 13, 0.09);
    background: rgba(255, 255, 255, 0.8);
    position: sticky;
    width: 100%;
    background-color: $white;

    @media (max-width: $lg) {
        box-shadow: none;
        padding: 16px;
    }
}

.header__container {
    max-width: 1920px;
    margin: 0 auto;
}

.header__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: $lg) {
        display: grid;
        grid-template-areas:
            'logo hamburger'
            'nav nav'
            'btn btn';
        align-items: center;
    }
}

.header__logo-img {
    cursor: pointer;
}

.hamburger {
    display: none;

    @media (max-width: $lg) {
        display: flex;
        flex-direction: column;
        gap: 8px;
        cursor: pointer;

        grid-area: hamburger;
        align-items: end;
    }
}

.hamburger .line {
    width: 22px;
    height: 2px;
    background-color: $black;
    display: block;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.is-active {
    display: none;

    @media (max-width: $lg) {
        display: grid !important;
    }
}

.hamburger.is-active .line:nth-child(2) {
    opacity: 0;
}

.hamburger.is-active .line:nth-child(1) {
    -webkit-transform: translateY(12px) rotate(45deg);
    -ms-transform: translateY(12px) rotate(45deg);
    -o-transform: translateY(12px) rotate(45deg);
    transform: translateY(12px) rotate(45deg);
}

.hamburger.is-active .line:nth-child(3) {
    -webkit-transform: translateY(-8px) rotate(-45deg);
    -ms-transform: translateY(-8px) rotate(-45deg);
    -o-transform: translateY(-8px) rotate(-45deg);
    transform: translateY(-8px) rotate(-45deg);
}

.header__nav {
    @media (max-width: $lg) {
        grid-area: nav;
        display: none;
    }

    &--mobile {
        display: block;
    }
}

.header__list {
    display: flex;
    gap: 48px;

    @media (max-width: $lg) {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        gap: 16px;
    }
}

.header__list-link {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    color: $gray;

    &:hover {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 20px;
        line-height: 150%;
        color: $red;
        border-bottom: 1px solid $red;
    }

    &:active {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 20px;
        line-height: 150%;
        color: $orange;
        border-bottom: 1px solid $orange;
    }
}

.header__btn-wrapper {
    @media (max-width: $lg) {
        grid-area: btn;
        display: grid;
        justify-content: flex-end;
        align-items: flex-end;
        display: none;
        margin-top: 16px;
    }

    &--mobile {
        display: grid;
    }
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-4px);
    opacity: 0;
}
</style>
