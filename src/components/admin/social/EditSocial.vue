<template>
    <div class="flex flex-col relative">
        <div class="social-admin__cards">
            <div v-for="card in getSocial" :key="card.name" class="social-admin__card">
                <div class="social-admin__card-header relative">
                    <p>{{ card.name }}</p>

                    <div class="social-admin__header-btns">
                        <div
                            class="flex gap-4 justify-start flex-wrap top-2 right-2 sm:right-0 sm:top-0 sm:!justify-end absolute  sm:relative"
                        >
                            <button
                                class="p-2 px-4 bg-white rounded-xl btn"
                                @click="card.name !== edit ? editSocial(card) : saveSocial()"
                            >
                                <p class="hidden sm:block" :class="card.name === edit && '!block'">
                                    {{ card.name === edit ? 'сохранить' : 'редактировать' }}
                                </p>
                                <EditSvg
                                    class="w-5 h-5 sm:hidden"
                                    :class="card.name === edit && 'hidden'"
                                />
                            </button>
                            <button
                                v-if="card.name === edit"
                                class="p-2 px-4 bg-white rounded-xl btn"
                                @click="resetEditSocial"
                            >
                                <p>Отменить</p>
                            </button>
                            <button
                                v-if="card.name !== edit"
                                class="p-2 px-4 bg-white rounded-xl btn"
                                @click="toggleDialog(card.name)"
                            >
                                <p class="hidden sm:block">удалить</p>
                                <RemoveSvg class="w-6 h-6 sm:hidden" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <InputField
                        v-if="card.name === edit"
                        v-model="link"
                        type="text"
                        :error="getErrors?.link"
                        :error-text="getErrors?.link || 'Обязательное поле'"
                    ></InputField>
                    <p v-else class="social-admin__header-person-text">
                        {{ card.link }}
                    </p>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <ModalConfirm :show="modalShow" @remove="remove" @close="toggleDialog(null)">
                <template #body> <p class="text-xl font-medium">Удалить cсылку ?</p> </template>
            </ModalConfirm>
        </Teleport>
        <Teleport to="body">
            <Loader v-if="!isLoad" />
        </Teleport>
    </div>
</template>
<script setup>
import EditSvg from '@/assets/icons/blog/edit.svg?component'
import RemoveSvg from '@/assets/icons/blog/remove.svg?component'
import { computed, onMounted, ref, watch } from 'vue'
import ModalConfirm from '@/components/modal/ModalConfirm.vue'
import InputField from '@/components/ui/form/input/InputField.vue'
import { useSocialStore } from '@/stores/socialStore'
import Loader from '@/components/ui/loader/Loader.vue'

const socialStore = useSocialStore()
const isLoad = ref(true)
const edit = ref(null)
const modalShow = ref(false)
const removeId = ref(null)
const link = ref(null)

const getSocial = computed(() => {
    return socialStore.getSocial
})

const getIsSuccess = computed(() => {
    return socialStore.getIsSuccess
})

function toggleDialog(id) {
    modalShow.value = !modalShow.value
    id ? (removeId.value = id) : (removeId.value = null)
}

function remove() {
    modalShow.value = !modalShow.value
    socialStore.remove(removeId.value)
}

onMounted(() => {
    isLoad.value = false
    socialStore.getListDb()
})

function saveSocial() {
    socialStore.edit({ name: edit.value, link: link.value })
}

function editSocial(item) {
    edit.value = item.name
    link.value = item.link
}

function resetEditSocial() {
    edit.value = null
    link.value = null
}

watch(getSocial, () => {
    isLoad.value = true
})

watch(getIsSuccess, (val) => {
    if (val === 'remove') {
        socialStore.getListDb()
    }
    resetEditSocial()
})
</script>
<style lang="scss" scoped>
.social-admin__cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;

    @media (max-width: $lg) {
        grid-template-columns: 100%;
    }
}
.social-admin__card {
    border: 2px solid $orange;
    border-radius: 32px;
    width: 100%;
    min-width: 0;

    @media (max-width: $sm) {
        border-radius: 32px;
    }
}
.social-admin__card-header {
    display: flex;
    justify-content: space-between;
    border-radius: 30px 30px 0 0;
    padding: 2px 2px 2px 2px;
    background: $yellowy;
    padding: 16px;
    align-items: center;

    @media (max-width: $sm) {
        padding: 20px 16px;
    }
}

.social-admin__header-btns {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.social-admin__header-person-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: $orange;
    @media (max-width: $lg) {
        font-size: 20px;
        line-height: 1.2;
    }
    span {
        display: block;
    }
}

.social-admin__card-header-date {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: $orange;
    @media (max-width: $lg) {
        font-size: 14px;
        line-height: 1.4;
    }
    @media (max-width: $sm) {
    }

    &.edit {
        color: $black;
        padding-right: 10px;
    }
}

.social-admin__card-footer-text {
    padding: 16px;
    @media (max-width: $sm) {
        font-size: 14px;
        line-height: 20px;
    }
}

.btn {
    box-shadow:
        0 2px 4px 0 rgba(21, 15, 13, 0.1),
        0 8px 8px 0 rgba(21, 15, 13, 0.09);
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #ffffff;
    border-radius: 24px;
    padding: 6px 24px;
    background: $orange;
    cursor: pointer;
    transition: 0.4s;
    display: block;
    width: fit-content;
    color: white;

    @media (max-width: $md) {
        padding: 6px 12px;
    }
}
</style>
