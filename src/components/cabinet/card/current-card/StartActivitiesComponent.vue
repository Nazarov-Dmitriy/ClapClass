<template>
    <div class="card-page__right">
        <div class="card-page__right-options">
            <div class="card-page__right-btns">
                <div
                    class="card-page__right-btns-img h-[84px]"
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

                <BtnComponentOrange
                    class="card-page__right-btn card-page__right-btn--white"
                    emit-name="click"
                    @click="changeFavorite()"
                >
                    <div class="card-page__right-btn-wrapper">
                        <AddSvg></AddSvg>
                        <span
                            >{{
                                props.data?.favorite ? 'Удалить из кейсов' : 'Добавить в мои кейсы'
                            }}
                        </span>
                    </div>
                </BtnComponentOrange>
            </div>
            <div class="card-page__right-info">
                <div v-if="props.data?.rules?.path" class="card-page__right-rules">
                    <div class="card-page__right-rules-texts">
                        <h3 class="card-page__right-rules-title">Изучите правила</h3>
                        <p class="card-page__right-rules-subtitle">
                            Для проведения данного квеста вам понадобится изучить правила
                        </p>
                    </div>
                    <div
                        class="flex flex-col cursor-pointer text-base items-center"
                        @click="downloadFile(props.data?.rules?.path, props.data?.rules.name)"
                    >
                        <RulesSvg class="card-page__right-rules-img w-[56px] h-[56px]"></RulesSvg>

                        <span>Скачать</span>
                    </div>
                </div>
                <div v-if="props.data?.material?.path" class="card-page__right-rules">
                    <div class="card-page__right-rules-texts">
                        <h3 class="card-page__right-rules-title">Требуется подготовка</h3>
                        <p class="card-page__right-rules-subtitle">
                            Для проведения данного квеста вам понадобится распечатать материалы
                        </p>
                    </div>
                    <div
                        class="flex flex-col cursor-pointer text-base items-center"
                        @click="downloadFile(props.data?.material.path, props.data?.material.name)"
                    >
                        <MaterialSvg
                            class="card-page__right-rules-img w-[56px] h-[56px]"
                        ></MaterialSvg>

                        <span>Скачать</span>
                    </div>
                </div>
                <div class="card-page__right-rules-author">
                    <span>Автор</span>
                    <span>{{ props.data?.author }}</span>
                </div>
            </div>
        </div>
        <slot />
        <Teleport to="body">
            <ModalComponent :visible="isModalVisible">
                <template #header>
                    <div>
                        <ModalHeader class="modal-header__start" @close-modal="toggleModal">
                            Выберите необходимый уровень, посмотрите правила и запустите разминку
                        </ModalHeader>
                    </div>
                </template>
                <template #form>
                    <StartActivitiesModal :data="props.data" />
                </template>
            </ModalComponent>
        </Teleport>
    </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import AddSvg from '@/assets/icons/add.svg?component'
import RulesSvg from '@/assets/icons/case/rules.svg?component'
import MaterialSvg from '@/assets/icons/case/materail-download.svg?component'
import BtnComponentOrange from '@/components/ui/btns/BtnComponentOrange.vue'
import ModalComponent from '/src/components/modal/ModalComponent.vue'
import ModalHeader from '/src/components/modal/ModalHeader.vue'
import StartActivitiesModal from '/src/components/modal/cabinet/StartActivitiesModal.vue'
import axiosFileS3 from '@/api/httpS3'
import { useBriefcaseStore } from '@/stores/briefcaseStore'

const briefcaseStore = useBriefcaseStore()
const isHovered = ref(false)
const isModalVisible = ref(false)

const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    },
    user: {
        type: Object,
        default: () => {}
    }
})

const getIsSuccess = computed(() => {
    return briefcaseStore.getIsSuccess
})

const favoritesDisable = ref(false)

async function downloadFile(path, name) {
    axiosFileS3
        .get(path)
        .then((res) => res.data)
        .then((data) => {
            const url = URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href = url
            link.download = name
            link.target = '_blank'
            link.click()

            setTimeout(() => {
                link.remove()
                URL.revokeObjectURL(url)
            }, 100)
        })
        .catch((err) => {
            this.error = err.data
        })
}

function toggleModal() {
    isModalVisible.value = !isModalVisible.value
}

function changeFavorite() {
    if (favoritesDisable.value) {
        return
    }
    favoritesDisable.value = true
    let params = { briefcase_id: props.data?.id, user_id: props.user?.id }
    props.data?.favorite
        ? briefcaseStore.removeFavorite(params)
        : briefcaseStore.addFavorite(params)
}

watch(getIsSuccess, (val) => {
    if (val === 'favorite-change') {
        favoritesDisable.value = false
    }
})
</script>
<style lang="scss" scoped>
.card-page__right {
    min-height: 0;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.card-page__right-options {
    border-bottom: 1px solid $gray;
    padding: 0px 0px 16px 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
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

.modal-header__start {
    padding: 16px 24px 0px 24px;
    justify-content: space-between;
    height: 187px;
}

:deep(.modal__header-info) {
    max-width: 670px;
    width: 100%;
}
</style>
