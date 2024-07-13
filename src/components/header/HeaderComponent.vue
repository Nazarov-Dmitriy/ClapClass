<template>
    <header class="header">
        <div class="header-mobile" :class="{ 'is-active': btnMenu }">
            <div class="header-mobile__wrapper">
                <nav class="header__nav header__nav--mobile" :class="{ 'is-active': btnMenu }">
                    <ul class="header__list">
                        <li class="header__list-item">
                            <router-link to="/services" class="header__list-link"
                                >Сервисы</router-link
                            >
                        </li>
                        <li class="header__list-item">
                            <router-link class="header__list-link" to="/about"
                                >О проекте</router-link
                            >
                        </li>
                        <li class="header__list-item">
                            <router-link to="/cooperation" class="header__list-link"
                                >Сотрудничество</router-link
                            >
                        </li>
                        <li class="header__list-item">
                            <router-link to="/blog" class="header__list-link">Блог</router-link>
                        </li>
                    </ul>
                </nav>
                <div
                    class="header__btn-wrapper header__btn-wrapper--mobile"
                    :class="{ 'is-active': btnMenu }"
                >
                    <BtnComponent class="header__btn">Вход</BtnComponent>
                </div>
            </div>
        </div>
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
                            <router-link to="/services" class="header__list-link"
                                >Сервисы</router-link
                            >
                        </li>
                        <li class="header__list-item">
                            <router-link class="header__list-link" to="/about"
                                >О проекте</router-link
                            >
                        </li>
                        <li class="header__list-item">
                            <router-link to="/cooperation" class="header__list-link"
                                >Сотрудничество</router-link
                            >
                        </li>
                        <li class="header__list-item">
                            <router-link to="/blog" class="header__list-link">Блог</router-link>
                        </li>
                    </ul>
                </nav>
                <div class="header__btn-wrapper">
                    <BtnComponent class="header__btn">Вход</BtnComponent>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import BtnComponent from '../btns/BtnComponent.vue'

import { ref } from 'vue'

const btnMenu = ref(false)
const menuActive = ref(false)

function setMenuAcive() {
    btnMenu.value = !btnMenu.value
    menuActive.value = !menuActive.value
}
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
    }

    @media (max-width: $sm) {
        padding: 16px;
    }
}
.header {
    padding: 16px 64px;
    box-shadow:
        0 2px 4px 0 rgba(21, 15, 13, 0.1),
        0 8px 8px 0 rgba(21, 15, 13, 0.09);
    background: rgba(255, 255, 255, 0.8);
    position: relative;

    @media (max-width: $lg) {
        box-shadow: none;
    }

    @media (max-width: $sm) {
        padding: 16px;
    }
}

.header__container {
    max-width: 1440px;
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
    -webkit-transform: translateY(-7px) rotate(-45deg);
    -ms-transform: translateY(-7px) rotate(-45deg);
    -o-transform: translateY(-7px) rotate(-45deg);
    transform: translateY(-7px) rotate(-45deg);
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
</style>
