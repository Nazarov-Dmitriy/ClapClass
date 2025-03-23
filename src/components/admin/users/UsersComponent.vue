<template>
    <section class="user__contaner">
        <div v-if="getUserList" class="flex gap-4 flex-col">
            <div v-for="user in renderList" :key="user.id" class="user__card">
                <div class="flex w-full justify-between">
                    <p class="font-medium">{{ user.name || 'поле незаполненно' }}</p>
                    <div class="flex gap-4 items-center">
                        <ArrowSvg
                            class="w-6 h-6 p-1transition-all duration-300 cursor-pointer"
                            alt="icon-appearance"
                            :class="{ 'rotate-180': activeUser !== user.id }"
                            @click="changeActiveUser((activeUser = user.id))"
                        ></ArrowSvg>

                        <button>
                            <EditSvg
                                alt="icon"
                                class="p-1 w-6 h-6"
                                @click="changeEditUser(user)"
                            ></EditSvg>
                        </button>
                        <button @click="toggleDialog(user.id)">
                            <RemoveSvg
                                alt="icon"
                                class="p-1 w-7 h-7"
                                @click="changeEditUser(user)"
                            ></RemoveSvg>
                        </button>
                    </div>
                </div>
                <transition name="slide-fade">
                    <div
                        v-if="activeUser == user.id || editUser == user.id"
                        class="grid grid-cols-3 gap-4 transition-all duration-300"
                    >
                        <div class="flex gap-2">
                            <p class="font-medium">Дата рождений:</p>
                            <p>{{ user.date_birth || 'нет данных' }}</p>
                        </div>
                        <div class="flex gap-2">
                            <p class="font-medium">Email:</p>
                            <p>{{ user.email || 'нет данных' }}</p>
                        </div>
                        <div class="flex gap-2">
                            <p class="font-medium">Телефон:</p>
                            <p>{{ user.phone || 'нет данных' }}</p>
                        </div>
                        <div class="flex gap-2">
                            <p class="font-medium">Место работы:</p>
                            <p>{{ user.place_work || 'нет данных' }}</p>
                        </div>
                        <div class="flex gap-2">
                            <p class="font-medium">Должность:</p>
                            <p>{{ user.position || 'нет данных' }}</p>
                        </div>
                        <div class="flex gap-2 items-center">
                            <p class="font-medium">Роль:</p>
                            <DropdownComponent
                                v-if="editUser && user.role !== 'admin'"
                                v-model:model-value="role"
                                :options="options"
                                :error="getErrors?.category"
                                class="!p-0 !border-none !h-auto !w-fit"
                                contnent-class="flex gap-2 w-fit"
                            />
                            <p v-else>{{ getRole(user.role) }}</p>
                        </div>
                    </div>
                </transition>

                <div v-if="editUser == user.id && user.role !== 'admin'" class="">
                    <BtnComponentOrange
                        emit-name="action"
                        :disabled="user.role === role"
                        @action="changeRole"
                        >Сохранить</BtnComponentOrange
                    >
                </div>
            </div>
            <PaginationComponent
                v-if="getUserList"
                :perpage="12"
                :data="getUserList"
                @set-list="getRenderList"
            />
        </div>
    </section>
    <Teleport to="body">
        <ModalConfirm :show="modalShow" @remove="removeUser" @close="toggleDialog(null)">
            <template #body> <p class="text-xl font-medium">Удалить пользователя ?</p> </template>
        </ModalConfirm>
    </Teleport>
    <Teleport to="body">
        <Loader v-if="!isLoad" />
    </Teleport>
</template>
<script setup>
import ModalConfirm from '@/components/modal/ModalConfirm.vue'
import PaginationComponent from '@/components/pagination/PaginationComponent.vue'
import BtnComponentOrange from '@/components/ui/btns/BtnComponentOrange.vue'
import DropdownComponent from '@/components/ui/dropdown/DropdownComponent.vue'
import Loader from '@/components/ui/loader/Loader.vue'
import { useAdminStore } from '@/stores/adminStore'
import { computed, onMounted, ref, watch } from 'vue'
import EditSvg from '@/assets/icons/blog/edit.svg?component'
import RemoveSvg from '@/assets/icons/remove.svg?component'
import ArrowSvg from '@/assets/icons/arrow.svg?component'
const adminStore = useAdminStore()

const isLoad = ref(false)
const editUser = ref(null)
const modalShow = ref(false)
const activeUser = ref(null)
const role = ref(null)
const renderList = ref([])
const removeId = ref(null)

const options = [
    { id: 1, label: 'Пользователь', value: 'user' },
    { id: 2, label: 'Модератор', value: 'moderator' }
]

const getUserList = computed(() => {
    return adminStore.getUserList
})

const getSuccess = computed(() => {
    return adminStore.getSuccess
})

function getRole(role) {
    if (role === 'user') {
        return 'Пользователь'
    } else if (role === 'moderator') {
        return 'Модератор'
    } else {
        return 'Администратор'
    }
}

function changeEditUser(user) {
    activeUser.value = null
    editUser.value = user.id
    role.value = user.role 
}

function changeActiveUser(id) {
    activeUser.value = id
    editUser.value = null
}

function getRenderList(list) {
    renderList.value = list
}

function changeRole() {
    adminStore.changeRole({
        role: role.value,
        user_id: editUser.value
    })
    isLoad.value = false
}

function toggleDialog(id) {
    modalShow.value = !modalShow.value
    id ? (removeId.value = id) : (removeId.value = null)
}

function removeUser() {
    adminStore.removeUser(removeId.value)
    isLoad.value = false
    modalShow.value = !modalShow.value
}

onMounted(() => {
    adminStore.getListDb()
})

watch(
    getUserList,
    () => {
        isLoad.value = true
    },
    { deep: true }
)

watch(getSuccess, () => {
    return adminStore.getListDb()
})

</script>
<style lang="scss" scoped>
.user__contaner {
    padding: 20px 80px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: $lg) {
        padding: 20px 40px;
    }
    @media (max-width: $sm) {
        padding: 16px;
    }
}

.user__card {
    display: grid;
    grid-template-rows: 1fr;
    border-bottom: 1px solid #5b94ea;
    padding: 4px 0;
    gap: 12px;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-4px);
    opacity: 0;
}

:deep(.dropdown-icon) {
    margin-top: 2px;
    position: unset;
}
:deep(.dropdown-selected-text) {
    min-width: 0;
}
:deep(.option-wrapper) {
    width: max-content;
    top: 25px;
}
</style>
