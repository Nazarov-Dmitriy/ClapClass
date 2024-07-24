<template>
    <section class="footer">
        <div class="footer__container">
            <div class="footer__contact">
                <img
                    src="@/assets/icons/footer/footer-logo.png"
                    alt="logo"
                    class="footer__logo"
                    @click="mainLink()"
                >
                <div class="footer__contact-networks">
                    <img
                        src="@/assets/icons/footer/youtube.svg"
                        alt="logo"
                        class="footer__youtube"
                    >
                    <img
                        src="@/assets/icons/footer/vk.svg"
                        alt="logo"
                        class="footer__vk"
                    >
                    <img
                        src="@/assets/icons/footer/telegram.svg"
                        alt="logo"
                        class="footer__telegram"
                    >
                </div>
            </div>
            <div class="footer__menu">
                <div
                    v-for="(section, index) in sections"
                    :key="index"
                    class="footer__menu-section"
                >
                    <div class="footer__list-top">
                        <h3 class="footer__list-header">
                            {{ section.header }}
                        </h3>
                        <img
                            src="@/assets/icons/footer/menu-arrow.svg"
                            alt="logo"
                            class="footer__menu-arrow"
                        >
                    </div>
                    <ul class="footer__list">
                        <li
                            v-for="(item, number) in section.items"
                            :key="number"
                            class="footer__list-item"
                        >
                            <router-link
                                to="/"
                                class="footer__link"
                            >
                                {{ item.description }}
                            </router-link>                            
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer__copyright">               
                <a
                    href="https://grant.obr.so/"
                    target="_blank"
                    class="footer__copyright-cot"
                >                
                    <img
                        src="@/assets/icons/footer/cot.svg"
                        alt="cot"
                        class="footer__cot"
                    >
                    <div>
                        <p class="footer__cot-text">
                            Победитель конкурса СОТ-2023»
                        </p>
                        <p class="footer__cot-text">
                            Номинация: «Особые образовательные потребности»
                        </p>
                    </div>
                </a>
                <a
                    href="#"
                    target="_blank"
                    class="footer__copyright-sosh"
                >                
                    <img
                        src="@/assets/icons/footer/sosh34.svg"
                        alt="cot"
                        class="footer__sosh"
                    >
                    <div>
                        <p class="footer__cot-text footer__cot-firsttext">
                            МАОУ СОШ №34 им. героя СССР Кожевникова А.Л., г. Красноярск»
                        </p>
                        <p class="footer__cot-subtext">
                            МАОУ СОШ №34, г. Красноярск
                        </p>
                        <p class="footer__cot-text">
                            Автор проекта: Войнов Александр Витальевич»
                        </p>
                    </div>
                </a>

                <div class="footer__copyright-madein">
                    <p class="footer__madein-text">
                        Сделано в:
                    </p>
                    <a
                        href="https://xn--g1ani7c.xn--p1ai/"
                        target="_blank"
                        class="footer__1t"
                    >
                        <img
                            src="@/assets/icons/footer/logo1t.svg"
                            alt="1T"
                        >
                    </a>
                    <a
                        href="https://bitwizarts.smartspecs.nl/"
                        target="_blank"
                        class="footer__logobwa"
                    >
                        <img
                            src="@/assets/icons/footer/logoBWA.svg"
                            alt="logoBWA"
                        >
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue'
document.addEventListener("DOMContentLoaded", function () {
    let btns = document.querySelectorAll(".footer__menu-arrow");
    let menus = document.querySelectorAll(".footer__list");

    btns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            menus[index].classList.toggle("footer__list-active");
            btn.classList.toggle("arrow_ative");
        });
    });
});

const sections = ref([
    {
        header: 'О проекте',
        items: [
            {description: 'О проекте'},
            {description: 'Блог'}
        ]
    },
    {
        header: 'Сервисы',
        items: [
            {description: 'Подвижные разминки'},
            {description: 'Ритм-разминки'},
            {description: 'Конгитивные разминки'},
            {description: 'Витрина кейсов'},
        ]
    },
    {
        header: 'Сотрудничество',
        items: [
            {description: 'Партнерская программа'},
            {description: 'Поддержать проект'}

        ]
    },
    {
        header: 'Документы',
        items: [
            {description: 'Пользовательское соглашение'},
            {description: 'Политика обработки данных'},
            {description: 'Разработано Freepic'},
        ]
    }
])
</script>
<style lang="scss">

.footer {
    width: 100%;
    background-color: $fonLight;
}

.footer__container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 100px 64px 100px 64px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: $md) {
        padding: 24px 16px 24px 16px;
    }
}

.footer__contact{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @media (max-width: $lg) {
        flex-direction: column;
    }
}

.footer__contact-networks {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.footer__logo,
.footer__youtube,
.footer__vk,
.footer__telegram {
    cursor: pointer;
}

.footer__logo {
    @media (max-width: $sm) {
        width: 100%;
    }
}

.footer__menu {
    display: flex;
    justify-content: space-between;
    padding-bottom: 24px;
    @media (max-width: $md) {
        flex-direction: column;
        padding: 0;
        gap: 20px;
    }
}

.footer__menu-arrow {
    display: none;
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
    @media (max-width: $md) {
        display: block;
        cursor: pointer;
    }
}

.arrow_ative {
    transform: rotate(180deg)
}

.footer__menu-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.footer__list-top {
    @media (max-width: $md) {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $gray
    }
}

.footer__list-header {
    font-family: "CenturyGothic";
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: $orange;
    text-align: center;
}

.footer__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: $md) {
        display: none;
    }
}

.footer__list-active {
    display: flex;
}

.footer__list-item {
    text-align: center;
    @media (max-width: $md) {
        text-align: start;
    }
}

.footer__link {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $gray;

    @media (max-width: $lg) {
        font-size: 14px;
        line-height: 20px;
    }

    &:hover {
        color: $red;
        text-decoration: underline;
        text-decoration-color: $red;
        text-underline-offset: 5px;
        transition-duration: 0.3s;
    }

    &:active {
        color: $orange;
        text-decoration: underline;
        text-decoration-color: $orange;
        text-underline-offset: 5px;
    }
}

.footer__copyright {
    padding-top: 16px;
    border-top: solid $gray 1px;
    display: grid;
    gap: 16px;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
        'cot madein'
        'sosh sosh';
        @media (max-width: $md) {
            grid-template-areas:
            'cot'
            'sosh'
            'madein';
            border: none;
    }   
}

.footer__copyright-cot,
.footer__copyright-sosh {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 16px;
    cursor: pointer;
}

.footer__copyright-cot {
    grid-area: cot
}

.footer__copyright-sosh {
    grid-area: sosh
}

.footer__cot,
.footer__sosh {
    @media (max-width: 390px) {
        display: none;
    }
}

.footer__cot-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $gray;
}

.footer__cot-firsttext {
    @media (max-width: $md) {
        display: none;
    }
    @media (max-width: 390px) {
        display: inline;
    }
}

.footer__cot-subtext {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $gray;
    display: none;
    @media (max-width: $md) {
        display: inline;
        content: "666";
    }
    @media (max-width: 390px) {
        display: none;
    }
}

.footer__copyright-madein{
    grid-area: madein;
    display: flex;
    justify-content: flex-end;
    height: 24px;
    align-items: center;
    gap: 8px;
    @media (max-width: $md) {
        justify-content: flex-start;
    }
}
.footer__madein-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: $gray;
    text-align: center;
}

.footer__1t {
    display: flex;
    text-align: center;
    cursor: pointer;
}

.footer__logobwa {
    display: flex;
    text-align: center;
    cursor: pointer;
}

.footer__logobwa {
    padding-left: 8px;
    border-left: solid $gray 1px;
}
</style>