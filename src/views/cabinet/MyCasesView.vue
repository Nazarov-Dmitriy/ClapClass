<template>
    <CabinetLayout>
        <PanelComponent v-model:search="panel.search" @search="search()" />
        <div class="flex grow">
            <SidebarComponent />
            <div v-if="data" class="flex flex-col gap-6 grow">
                <CabinetTabsComponent v-model:type="panel.type" />
                <div class="cards-container">
                    <CaseList :data="data" />
                </div>
            </div>
            <div
                v-else
                class="w-full flex justify-center bg-[url('/images/servecies/warm-up/bg-img.png')] bg-no-repeat bg-cover bg-center p-[41px_17px_72px_17px]"
            >
                <div class="p-[100px_0_0_0]">
                    <img
                        src="/images/cabinet/case/case-paw-mark.png"
                        class="max-[1439px]:hidden"
                        alt="case-paw-mark"
                    />
                </div>
                <div class="flex gap-[64px] max-[995px]:gap-[24px]">
                    <div class="flex flex-col gap-[48px] w-[537px]">
                        <div
                            class="flex flex-col items-center shadow-[16px_16px_2px_rgba(14,8,6,0.15)] w-full p-[16px] bg-[rgba(255,255,255,0.8)] rounded-[24px] gap-[16px] relative"
                        >
                            <h3
                                class="not-italic font-bold text-[24px] leading-[150%] text-center text-[#FB0F0F]"
                                style="font-family: 'CenturyGothic'"
                            >
                                В библиотеке нет закладок
                            </h3>
                            <p
                                class="font-normal text-[20px] leading-[150%] text-center text-black"
                            >
                                Перейдите во вкладку
                                <router-link
                                    to="/cabinet/showcase"
                                    class="text-orange underline underline-offset-4 decoration-1"
                                    >«Витрина кейсов»</router-link
                                >

                                откройте понравившийся кейс и нажмите кнопку «Добавить в мои кейсы»
                            </p>
                            <img
                                class="absolute top-0 left-[28px]"
                                src="/images/cabinet/case/case-flag-heart.png"
                                alt="hero"
                            />
                        </div>
                        <div>
                            <img
                                class="max-w-none"
                                src="/images/cabinet/case/case-cards.png"
                                alt="hero"
                            />
                        </div>
                        <div
                            class="sflex flex-col items-center shadow-[16px_16px_2px_rgba(14,8,6,0.15)] w-full p-[16px] bg-[rgba(255,255,255,0.8)] rounded-[24px] relative"
                        >
                            <p
                                class="font-normal text-[20px] leading-[150%] text-center text-black"
                            >
                                1. Используйте быстрый доступ
                            </p>
                            <p
                                class="font-normal text-[20px] leading-[150%] text-center text-black"
                            >
                                2. Формируйте личную подборку
                            </p>
                            <p
                                class="font-normal text-[20px] leading-[150%] text-center text-black"
                            >
                                3. Делитесь избранным с коллегами
                            </p>
                            <img
                                class="absolute top-0 left-[28px]"
                                src="/images/cabinet/case/case-flag-lightning.png"
                                alt="hero"
                            />
                        </div>
                    </div>
                    <div class="relative flex justify-center items-center">
                        <img src="/images/cabinet/case/case-hero-think.png" alt="hero" />
                        <img
                            class="absolute bottom-[96px] left-[-64px] max-[995px]:left-[-24px]"
                            src="/images/cabinet/case/case-paw-mark-right.png"
                            alt="hero"
                        />
                    </div>
                </div>
            </div>
        </div>
    </CabinetLayout>
</template>

<script setup>
import PanelComponent from '/src/components/cabinet/panel/PanelComponent.vue'
import CabinetLayout from '/src/layouts/CabinetLayout.vue'
import SidebarComponent from '/src/components/cabinet/sidebar/SidebarComponent.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import CabinetTabsComponent from '@/components/cabinet/case/tabs/CabinetTabsComponent.vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import CaseList from '@/components/cabinet/case/list/CaseList.vue'
import { useUserStore } from '@/stores/userStore'

const briefcaseStore = useBriefcaseStore()
const userStore = useUserStore()
const data = ref()
const panel = reactive({
    search: '',
    type: ''
})

const getUser = computed(() => {
    return userStore.getUser
})

const getListBriefcase = computed(() => {
    return briefcaseStore.getListBriefcase
})

onMounted(() => {
    if (getUser.value) {
        briefcaseStore.getCaseFavoriteListDb({
            search: panel.search,
            type: panel.type,
            user_id: getUser?.value.id
        })
    }
})

function search() {
    briefcaseStore.getCaseFavoriteListDb({
        search: panel.search,
        type: panel.type,
        user_id: getUser?.value.id
    })
}

watch(
    () => panel.search,
    (newVal) => {
        if (newVal.trim() == '') {
            briefcaseStore.getCaseFavoriteListDb({
                search: panel.search,
                type: panel.type,
                user_id: getUser?.value.id
            })
        }
    },
    { deep: true }
)

watch([() => panel.type], () => {
    briefcaseStore.getCaseFavoriteListDb({
        search: panel.search,
        type: panel.type,
        user_id: getUser?.value.id
    })
})

watch(getListBriefcase, () => {
    data.value = getListBriefcase.value
})

watch(getUser, () => {
    briefcaseStore.getCaseFavoriteListDb({
        search: panel.search,
        type: panel.type,
        user_id: getUser?.value.id
    })
})
</script>

<style lang="scss" scoped>
.cards-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
    width: 100%;
}
</style>
