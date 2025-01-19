<template>
    <CabinetLayout>
        <div class="page">
            <PanelComponent />
            <div class="flex">
                <SidebarComponent />
                <div v-if="cardsInfo.length">
                    Нужно написать, если список "Мои статья" не пустой
                </div>
                <div v-else class="article-container">
                    <div class="flex flex-col gap-14">
                        <div class="flex justify-center">
                            <h3
                                class="w-[564px] text-center font-bold text-[24px] leading-[150%] text-[#DE4700]"
                                style="font-family: 'CenturyGothic'"
                            >
                                Здесь будут отображаться добавленные в избранное статьи из блога
                            </h3>
                        </div>
                        <div class="flex justify-center">
                            <div class="w-max">
                                <img
                                    src="/public/images/cabinet/article/article-hero.png"
                                    alt="hero"
                                />
                            </div>
                            <div class="relative z-[1]">
                                <div
                                    class="shadow-[0_16px_2px_rgba(14,8,6,0.15)] w-[458px] p-[16px] bg-white rounded-[16px]"
                                >
                                    <p
                                        class="font-normal text-[20px] leading-[150%] text-center text-black relative z-[3]"
                                    >
                                        Перейдите в верхнем меню в раздел
                                        <span
                                            class="text-orange underline underline-offset-4 decoration-1"
                                            >«Блог»</span
                                        >
                                        откройте понравившуюся статью и нажмите внизу статьи кнопку
                                        «Добавить в избранное»
                                    </p>
                                </div>
                                <img
                                    class="absolute top-[87px] left-[-21px] z-[2]"
                                    src="/public/images/cabinet/article/article-hero-text.png"
                                    alt=""
                                />
                            </div>
                        </div>
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

const cardsInfo = []
</script>

<style lang="scss" scoped>
.page {
    max-width: 1920px;
    margin: 0 auto;
    height: 100%;
}

.article-container {
    padding: 114px 0 194px 0;
    display: flex;
    justify-content: center;
    width: 100%;
    background-image: url(/images/servecies/warm-up/bg-img.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
}
</style>
