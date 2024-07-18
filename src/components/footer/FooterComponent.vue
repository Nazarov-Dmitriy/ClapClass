<template>
    <section class="footer">
        <div class="footer__container">
            <div class="footer__contact">
                <div>
                    Логотип
                </div>
                <div>
                    Соцсети
                </div>
            </div>
            <div class="footer__menu">
                <div class="footer__menu-section">
                    <p class="footer__list-header">
                        О проекте
                    </p>
                    
                    <svg 
                        width="32" 
                        height="32" 
                        viewBox="0 0 32 32" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M22 20L16 14L10 20" 
                            stroke="#656D75" 
                            stroke-width="4" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"
                        />
                    </svg>
                    <ul class="footer__list">
                        <li class="footer__list-item">
                            <router-link
                                to="/"
                                class="footer__link"
                            >
                                О проекте
                            </router-link>
                        </li>
                        <li class="footer__list-item">
                            <router-link
                                to="/"
                                class="footer__link"
                            >
                                Блог
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="footer__menu-section">
                    <p class="footer__list-header">
                        Сервисы
                    </p>
                    <ul class="footer__list">
                        <li class="footer__list-item">
                            <router-link
                                to="/"
                                class="footer__link"
                            >
                                Подвижные разминки
                            </router-link>
                        </li>
                        <li class="footer__list-item">
                            <router-link
                                to="/"
                                class="footer__link"
                            >
                                Ритм-разминки
                            </router-link>
                        </li>
                        <li class="footer__list-item">
                            <router-link
                                to="/"
                                class="footer__link"
                            >
                                Конгитивные разминки
                            </router-link>
                        </li>
                        <li class="footer__list-item">
                            <router-link
                                to="/"
                                class="footer__link"
                            >
                                Витрина кейсов                    
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer__partner">
                Копирайт
            </div>
        </div>
    </section>
</template>
<script setup>

</script>
<style lang="scss">
.footer {
    background-color: $fonLight;
}

.footer__footer__container {
    max-width: 1440px;
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

</style>