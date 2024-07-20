<template>
    <section class="footer">
        <div class="footer__container">
            <div class="footer__contact">
                <img
                    src="@/assets/icons/footer/footer-logo.svg"
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
                    <h3 class="footer__list-header">
                        {{ section.header }}
                    </h3>
                    <img
                        src="@/assets/icons/footer/menu-arrow.svg"
                        alt="logo"
                        class="footer__menu-arrow"
                    >
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
                <div class="footer__copyright-left">
                    <a
                        href="https://grant.obr.so/"
                        target="_blank"
                        class="footer__copyright-block"
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
                        class="footer__copyright-block"
                    >                
                        <img
                            src="@/assets/icons/footer/sosh34.svg"
                            alt="cot"
                            class="footer__sosh"
                        >
                        <div>
                            <p class="footer__cot-text">
                                МАОУ СОШ №34 им. героя СССР Кожевникова А.Л., г. Красноярск»
                            </p>
                            <p class="footer__cot-text">
                                Автор проекта: Войнов Александр Витальевич»
                            </p>
                        </div>
                    </a>
                </div>

                <div class="footer__copyright-madein">
                    <p class="footer__madein-text">
                        Сделано в:
                    </p>
                    <a
                        href="https://xn--g1ani7c.xn--p1ai/"
                        target="_blank"
                    >
                        <img
                            src="@/assets/icons/footer/logo1t.svg"
                            alt="1T"
                            class="footer__1t"
                        >
                    </a>
                    <a
                        href="https://bitwizarts.smartspecs.nl/"
                        target="_blank"
                    >
                        <img
                            src="@/assets/icons/footer/logoBWA.svg"
                            alt="logoBWA"
                            class="footer__logobwa"
                        >
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue'

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
    background-color: $fonLight;
}

.footer__container {
    max-width: 1920px;
    margin: 0 auto;
    padding: 100px 64px 100px 64px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: $lg) {
    }

    @media (max-width: $sm) {
    }
}

.footer__contact{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer__contact-networks {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.footer__menu {
    display: flex;
    justify-content: space-between;
    padding-bottom: 24px;
}

.footer__menu-arrow {
    display: none;
}

.footer__menu-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
}

.footer__list-item {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $gray;
    text-align: center;
}

.footer__link {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $gray;
    text-align: center;

    @media (max-width: $lg) {
        font-size: 14px;
        line-height: 20px;
    }

    &:hover {
        color: $red;
        text-decoration: underline;
        text-decoration-color: $red;
        text-underline-offset: 5px;
        transition-duration: 0.5s;
    }

    &:active {
        color: $orange;
        text-decoration: underline;
        text-decoration-color: $orange;
        text-underline-offset: 5px;
    }
}

.footer__copyright {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
    border-top: solid $gray 1px;
}

.footer__copyright-left {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer__copyright-block {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 16px;
}

.footer__copyright-madein{
    display: flex;
    justify-content: space-between;
    height: 24px;
    align-items: center;
    gap: 8px;
}

.footer__logobwa {
    padding-left: 8px;
    border-left: solid $gray 1px;
}
</style>