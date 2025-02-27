<template>
    <div class="card-page__right">
        <div class="card-page__right-options">
            <div class="card-page__right-btns">
                <div
                    class="card-page__right-btns-img"
                    @mouseenter="isHovered = true"
                    @mouseleave="isHovered = false"
                >
                    <img
                        v-if="isHovered"
                        class="card-page__right-btn card-page__right-btn--orange"
                        src="/images/cabinet/card-page/button-hovered.png"
                        @click="toggleModal"
                    />
                    <img
                        v-else
                        class="card-page__right-btn card-page__right-btn--orange"
                        src="/images/cabinet/card-page/button.png"
                        alt=""
                    />
                </div>

                <BtnComponentOrange class="card-page__right-btn card-page__right-btn--white">
                    <div class="card-page__right-btn-wrapper">
                        <svg
                            width="23"
                            height="23"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.5 21.0117C17.0475 21.0117 21.5 16.6039 21.5 11.0564C21.5 5.50886 17.0475 1.01172 11.5 1.01172C5.9525 1.01172 1.5 5.50886 1.5 11.0564C1.5 16.6039 5.9525 21.0117 11.5 21.0117Z"
                                stroke="#DE4700"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M6.5 11.0117H16.5"
                                stroke="#DE4700"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M11.5 16.0822V6.01172"
                                stroke="#DE4700"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <span>Добавить в мои кейсы</span>
                    </div>
                </BtnComponentOrange>
            </div>
            <div class="card-page__right-info">
                <div class="card-page__right-rules">
                    <div class="card-page__right-rules-texts">
                        <h3 class="card-page__right-rules-title">Изучите правила</h3>
                        <p class="card-page__right-rules-subtitle">
                            Для проведения данного квеста вам понадобится изучить правила
                        </p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <img
                            src="/icons/cabinet/card-page/rules-icon1.svg"
                            alt=""
                            class="card-page__right-rules-img"
                        />
                        <span>Скачать</span>
                    </div>
                </div>
                <div class="card-page__right-rules">
                    <div class="card-page__right-rules-texts">
                        <h3 class="card-page__right-rules-title">Требуется подготовка</h3>
                        <p class="card-page__right-rules-subtitle">
                            Для проведения данного квеста вам понадобится распечатать материалы
                        </p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <img
                            src="/icons/cabinet/card-page/rules-icon2.svg"
                            alt=""
                            class="card-page__right-rules-img"
                        />
                        <span>Скачать</span>
                    </div>
                </div>
                <div class="card-page__right-rules-author">
                    <span>Автор</span>
                    <span>Александр Войнов</span>
                </div>
            </div>
        </div>
        <slot />
        <Teleport to="body">
            <ModalComponent :visible="isModalVisible">
                <template #header>
                    <div>
                        <ModalHeader @close-modal="toggleModal">
                            Оставьте отзыв, это помогает улучшить разминку
                        </ModalHeader>
                    </div>
                </template>
                <template #form>
                    <StartActivitiesModal />
                </template>
            </ModalComponent>
        </Teleport>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import BtnComponentOrange from '@/components/ui/btns/BtnComponentOrange.vue'
import ModalComponent from '/src/components/modal/ModalComponent.vue'
import ModalHeader from '/src/components/modal/ModalHeader.vue'
import StartActivitiesModal from '/src/components/modal/cabinet/StartActivitiesModal.vue'
const isHovered = ref(false)
const isModalVisible = ref(false)

function toggleModal() {
    isModalVisible.value = !isModalVisible.value
}
</script>
<style lang="scss" scoped>
.card-page__right-options {
    border-bottom: 1px solid $gray;
    padding: 0px 0px 16px 0px;
    box-sizing: border-box;
}
.card-page__right-btns {
    @include flex-col-gap(16px);
    align-items: center;
}
.card-page__right-btn {
    cursor: pointer;

    &--white {
        text-align: center;
        max-width: 284px;
        font-weight: 500;
        font-size: 20px;
        line-height: 150%;
        color: $orange;
    }
}
.card-page__right-btn-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    width: max-content;

    &:hover {
        & svg {
            fill: $white;
        }
    }
}
.card-page__right-info {
    @include flex-col-gap(8px);
}
.card-page__right-rules {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-page__right-rules-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
    color: $gray;
}
.card-page__right-rules-subtitle {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;
}
.card-page__right-rules-img {
    border: 2px solid $orange;
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
}
.card-page__right-rules-author {
    display: flex;
    align-items: center;
    gap: 16px;
    span {
        &:first-child {
            font-weight: 600;
            font-size: 16px;
            line-height: 150%;
            text-decoration: underline;
            text-decoration-skip-ink: none;
            text-align: right;
            color: $orange;
        }
        &:last-child {
            font-weight: 400;
            font-size: 16px;
            line-height: 150%;
            text-align: right;
            color: $gray;
        }
    }
}
</style>
