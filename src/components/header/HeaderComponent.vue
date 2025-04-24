<template>
    <header ref="headerMobile" class="header">
        <Transition name="slide-fade">
            <div v-if="isVisible" class="header-mobile" :class="{ 'is-active': isVisible }">
                <div class="header-mobile__wrapper">
                    <nav class="header__nav header__nav--mobile">
                        <ul class="header__list">
                            <li class="header__list-item">
                                <router-link
                                    active-class="active"
                                    to="/services"
                                    class="header__list-link"
                                >
                                    Сервисы
                                </router-link>
                            </li>
                            <li class="header__list-item">
                                <router-link
                                    active-class="active"
                                    class="header__list-link"
                                    to="/about"
                                >
                                    О проекте
                                </router-link>
                            </li>
                            <li class="header__list-item">
                                <router-link
                                    active-class="active"
                                    to="/cooperation"
                                    class="header__list-link"
                                >
                                    Сотрудничество
                                </router-link>
                            </li>
                            <li class="header__list-item">
                                <router-link
                                    active-class="active"
                                    to="/blog"
                                    class="header__list-link"
                                >
                                    Блог
                                </router-link>
                            </li>
                            <li v-if="getUser" class="header__list-item">
                                <router-link
                                    active-class="active"
                                    to="/admin"
                                    class="header__list-link"
                                >
                                    Админстрирование
                                </router-link>
                            </li>
                            <li v-if="getUser" class="header__list-item">
                                <router-link
                                    active-class="active"
                                    to="/cabinet/profile"
                                    class="header__list-link"
                                >
                                    Кабинет
                                </router-link>
                            </li>
                            <li v-if="getUser" class="header__list-item">
                                <button
                                    class="header__list-link"
                                    @click="() => router.push({ name: 'showcase' })"
                                >
                                    Личный кабинет
                                </button>
                            </li>
                            <li v-if="getUser" class="header__list-item">
                                <button class="header__list-link" @click="logout()">Выход</button>
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
                <div class="header__logo shrink-0">
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
                <nav class="header__nav min-w-0">
                    <ul class="header__list">
                        <li class="header__list-item shrink-0">
                            <router-link
                                to="/services"
                                class="header__list-link"
                                active-class="active"
                            >
                                Сервисы
                            </router-link>
                        </li>
                        <li class="header__list-item shrink-0">
                            <router-link
                                class="header__list-link"
                                to="/about"
                                active-class="active"
                            >
                                О проекте
                            </router-link>
                        </li>
                        <li class="header__list-item shrink-0">
                            <router-link
                                to="/cooperation"
                                class="header__list-link"
                                active-class="active"
                            >
                                Сотрудничество
                            </router-link>
                        </li>
                        <li class="header__list-item shrink-0">
                            <router-link to="/blog" class="header__list-link" active-class="active">
                                Блог
                            </router-link>
                        </li>

                        <li
                            v-if="
                                getUser &&
                                (getUser.role === 'admin' || getUser.role === 'moderator')
                            "
                            class="header__list-item truncate"
                        >
                            <router-link
                                to="/admin"
                                class="header__list-link"
                                active-class="active"
                            >
                                Администрирование
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
                    <button v-else ref="refMenu" class="btn__profile">
                        <div
                            class="flex w-12 h-12 items-center justify-center"
                            @click="$router.push('/cabinet/profile')"
                        >
                            <img
                                v-if="getUser?.avatar"
                                :src="getUrl"
                                alt="user"
                                class="btn__profile-img rounded-full w-full h-full"
                            />
                            <p v-else-if="getName !== ''" class="btn__profile-text">
                                {{ getName }}
                            </p>
                            <img
                                v-else
                                src="@/assets/icons/header/user.svg"
                                alt="user"
                                class="btn__profile-img"
                                :class="getName == '' && '!border-none'"
                            />
                        </div>

                        <ArrowSvg
                            class="hover:text-red duration-300 ease-in-out"
                            :class="openUserMenu && 'text-orange rotate-180'"
                            @click="openUserMenu = !openUserMenu"
                        ></ArrowSvg>

                        <Transition name="menu">
                            <div v-if="openUserMenu" class="btn__profile-menu">
                                <p
                                    class="btn__profile-menu-item"
                                    @click="() => router.push({ name: 'showcase' })"
                                >
                                    Личный кабинет
                                </p>
                                <p class="btn__profile-menu-item" @click="logout()">Выход</p>
                            </div>
                        </Transition>
                    </button>
                </div>
            </div>
            <Teleport to="body">
                <AuthComponent :modal="modal" @close="() => setModal('')" />
            </Teleport>
        </div>
    </header>
</template>
<script setup>
import ArrowSvg from '@/assets/icons/arrow.svg?component'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AuthComponent from '../modal/auth/AuthComponent.vue'

const isVisible = ref(false)
const btnMenu = ref(false)
const headerMobile = ref(null)
const modal = ref('')
const userStore = useUserStore()
const router = useRouter()
const openUserMenu = ref(false)
const refMenu = ref(null)

const getUser = computed(() => {
    return userStore.getUser
})

const getName = computed(() => {
    if (userStore.getUser && userStore.getUser?.name) {
        let nameData = userStore.getUser?.name?.split(' ')
        return (
            nameData[0]?.slice(0, 1).toUpperCase() +
            (nameData[1] ? nameData[1]?.slice(0, 1).toUpperCase() : '')
        )
    }
    return ''
})

const closeMenu = (element) => {
    if (!refMenu.value?.contains(element.target)) {
        openUserMenu.value = false
    }
}

const getIsSuccess = computed(() => userStore.getIsSuccess)

onMounted(() => {
    window.addEventListener('click', closeHeader)
    window.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
    window.removeEventListener('click', closeHeader)
    window.removeEventListener('click', closeMenu)
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
    gap: 16px;

    @media (max-width: $lg) {
        gap: 0;
        display: grid;
        grid-template-areas:
            'logo hamburger'
            'nav nav'
            'btn btn';
        align-items: center;
    }
}

.header__logo-img {
    width: 140px;
    height: 48px;
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

    @media (max-width: $xl) {
        gap: 32px;
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

    &:active,
    &.active {
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

.btn__profile {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
}

.btn__profile-text {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;
    font-family: 'Inter';
    color: $gray;
    padding: 12px;
    border-radius: 100%;
    border: 1px solid gray;
    width: 100%;
    height: 100%;
    text-align: center;

    &:hover {
        border-color: $red;
    }
}

.btn__profile-img {
    object-fit: cover;
    border: 1px solid $gray;
    border-radius: 100%;

    &:hover {
        border-color: $red;
    }
}

.btn__profile-menu {
    position: absolute;
    top: 52px;
    right: 0;
    width: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.btn__profile-menu-item {
    font-size: 14px;
    line-height: 21px;
    border-bottom: 1px solid $gray;
    text-align: right;
    color: $gray;

    &:hover {
        color: $red;
        border-color: $red;
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

.menu-enter-active {
    transition: all 0.3s ease-out;
}

.menu-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
}

.menu-enter-to,
.menu-leave-from {
    opacity: 1;
}
</style>
