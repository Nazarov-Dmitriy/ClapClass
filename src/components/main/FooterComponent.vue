<template>
    <section class="footer">
        <div class="footer__container">
            <div class="footer__contact">
                <img
                    src="@/assets/icons/footer/footer-logo.png"
                    alt="logo"
                    class="footer__logo"
                    @click="$router.push('/')"
                />
                <div class="footer__contact-networks">
                    <a
                        v-if="getLinkSocial('youtube')"
                        :href="getLinkSocial('youtube')"
                        class="w-[60px]"
                        target="_blank"
                    >
                        <img
                            src="@/assets/icons/social/youtube.svg"
                            alt="logo"
                            class="footer__youtube"
                        />
                    </a>
                    <a
                        v-if="getLinkSocial('rutube')"
                        :href="getLinkSocial('rutube')"
                        class="w-[40px]"
                        target="_blank"
                    >
                        <img src="@/assets/icons/social/rutube.svg" alt="logo" class="footer__vk" />
                    </a>
                    <a
                        v-if="getLinkSocial('vk')"
                        :href="getLinkSocial('vk')"
                        class="w-[40px]"
                        target="_blank"
                    >
                        <img src="@/assets/icons/social/vk.svg" alt="logo" class="footer__vk" />
                    </a>
                    <a
                        v-if="getLinkSocial('telegram')"
                        :href="getLinkSocial('telegram')"
                        class="w-[40px]"
                        target="_blank"
                    >
                        <img
                            src="@/assets/icons/social/tg.svg"
                            alt="logo"
                            class="footer__telegram"
                        />
                    </a>
                </div>
            </div>
            <div class="footer__menu">
                <div v-for="(section, index) in sections" :key="index" class="footer__menu-section">
                    <div class="footer__list-top">
                        <h3 class="footer__list-header">
                            {{ section.header }}
                        </h3>
                        <img
                            src="@/assets/icons/footer/menu-arrow.svg"
                            alt="logo"
                            class="footer__menu-arrow"
                            :class="{ active: menuIndex.includes(index) }"
                            @click="activeMenu(index)"
                        />
                    </div>
                    <ul
                        class="footer__list"
                        :class="{ 'footer__list-active': menuIndex.includes(index) }"
                    >
                        <li
                            v-for="(item, number) in section.items"
                            :key="number"
                            class="footer__list-item"
                        >
                            <router-link
                                v-if="!item.target && item.url"
                                :to="item.url"
                                class="footer__link"
                            >
                                {{ item.description }}
                            </router-link>
                            <a
                                v-else
                                :href="item.url"
                                :target="item.target"
                                class="footer__link cursor-pointer"
                                @click="item.function ? item.function() : null"
                            >
                                {{ item.description }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer__copyright">
                <a href="https://grant.obr.so/" target="_blank" class="footer__copyright-cot">
                    <img src="@/assets/icons/footer/cot.svg" alt="cot" class="footer__cot" />
                    <div>
                        <p class="footer__cot-text">Победитель конкурса СОТ-2023»</p>
                        <p class="footer__cot-text">
                            Номинация: «Особые образовательные потребности»
                        </p>
                    </div>
                </a>
                <a href="https://sch34krsk.gosuslugi.ru" target="_blank" class="footer__copyright-sosh">
                    <img src="@/assets/icons/footer/sosh34.svg" alt="cot" class="footer__sosh" />
                    <div>
                        <p class="footer__cot-text footer__cot-firsttext">
                            МАОУ СОШ №34 им. героя СССР Кожевникова А.Л., г. Красноярск
                        </p>
                        <p class="footer__cot-subtext">МАОУ СОШ №34, г. Красноярск</p>
                        <p class="footer__cot-text">Автор проекта: Войнов Александр Витальевич</p>
                    </div>
                </a>

                <div class="footer__copyright-madein">
                    <p class="footer__madein-text">Сделано в:</p>
                    <a href="https://xn--g1ani7c.xn--p1ai/" target="_blank" class="footer__1t">
                        <img src="@/assets/icons/footer/logo1t.svg" alt="1T" />
                    </a>
                    <a
                        href="https://bitwizarts.smartspecs.nl/"
                        target="_blank"
                        class="footer__logobwa"
                    >
                        <img src="@/assets/icons/footer/logoBWA.svg" alt="logoBWA" />
                    </a>
                </div>
            </div>
        </div>
    </section>
    <Teleport to="body">
        <AuthComponent :modal="modal" @close="() => (modal = '')" />
    </Teleport>
</template>
<script setup>
import { useSocialStore } from '@/stores/socialStore'
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted, ref, watch } from 'vue'
import AuthComponent from '../modal/auth/AuthComponent.vue'

const menuIndex = ref([])
const socialStore = useSocialStore()
const userStore = useUserStore()
const modal = ref('')

onMounted(()=>{
    if (getUser.value) {
        sections.value[1].items[3].url = '/cabinet/showcase'
        sections.value[1].items[3].function = null
    }
})
const getUser = computed(() => {
    return userStore.getUser
})

function activeMenu(index) {
    if (!menuIndex.value.includes(index)) {
        menuIndex.value.push(index)
    } else {
        menuIndex.value.splice(menuIndex.value.indexOf(index), 1)
    }
}

const getSocial = computed(() => {
    return socialStore.getSocial
})

function caseUrl() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    modal.value = 'login'
}

const sections = ref([
    {
        header: 'О проекте',
        items: [
            { description: 'О проекте', url: '/about' },
            { description: 'Блог', url: '/blog' }
        ]
    },
    {
        header: 'Сервисы',
        items: [
            { description: 'Подвижные разминки', url: '/services#moving' },
            { description: 'Ритм-разминки', url: '/services#rhythm' },
            { description: 'Конгитивные разминки', url: '/services#cognitive' },
            { description: 'Витрина кейсов', url: null, function: caseUrl }
        ]
    },
    {
        header: 'Сотрудничество',
        items: [
            { description: 'Партнерская программа', url: '/cooperation' },
            {
                description: 'Поддержать проект',
                url: 'https://yoomoney.ru/fundraise/18LATS4B2TM.250226',
                target: '_blank'
            }
        ]
    },
    {
        header: 'Документы',
        items: [
            {
                description: 'Пользовательское соглашение',
                url: '/documents/user_agreement.pdf',
                target: '_blank'
            },
            {
                description: 'Политика обработки данных',
                url: '/documents/privat_policy.pdf',
                target: '_blank'
            },
            { description: 'Разработано Freepic', url: 'https://ru.freepik.com/', target: '_blank' }
        ]
    }
])

function getLinkSocial(name) {
    return getSocial.value?.filter((el) => el.name === name)[0]?.link
}

watch(getUser, (val) => {
    if (val) {
        sections.value[1].items[3].url = '/cabinet/showcase'
        sections.value[1].items[3].function = null
    }
})
</script>
<style lang="scss">
.footer {
    width: 100%;
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
        padding: 24px 16px 24px 16px;
    }
}

.footer__contact {
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

    &.active {
        transform: rotate(180deg);
    }
}

.arrow_ative {
    transform: rotate(180deg);
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
        border-bottom: 1px solid $gray;
    }
}

.footer__list-header {
    font-family: 'CenturyGothic';
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
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $gray;

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
    grid-area: cot;
}

.footer__copyright-sosh {
    grid-area: sosh;
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
        content: '666';
    }
    @media (max-width: 390px) {
        display: none;
    }
}

.footer__copyright-madein {
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
