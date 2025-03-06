<template>
    <div class="cabinet-card relative" @click="(e) => linkCard(e, props.data.id)">
        <div
            v-if="editing"
            class="flex justify-between p-2 bg-white absolute top-0 w-full !bg-transparent z-[1]"
        >
            <button
                class="ml-2 border border-[#656d75] hover:border-[#e05704] hover:text-[#e05704] rounded-xl px-4 py-2 bg-white"
                @click="(e) => edit(e, props.data.id)"
            >
                <span class="hidden sm:block"> Редактировать</span>
                <EditSvg class="w-6 h-6 sm:hidden" />
            </button>
            <button
                class="mr-2 border border-[#656d75] hover:border-[#e05704] hover:text-[#e05704] rounded-xl px-4 py-2 bg-white"
                @click.stop="toggleDialog(props.data.id)"
            >
                <span class="hidden sm:block"> Удалить</span>
                <RemoveSvg class="w-6 h-6 sm:hidden" />
            </button>
        </div>

        <div class="cabinet-card__img relative">
            <img
                v-if="props.data.preview_img?.path && validUrl(data.preview_img.path)"
                :src="getUrl(props.data.preview_img.path)"
                alt=""
                class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full cabinet-card__img-empty"></div>
            <div v-if="!editing" class="absolute left-4 bottom-3 flex gap-2">
                <CaseCardIcon
                    v-if="props.data.type"
                    :type="props.data.type"
                    class="w-16 h-16"
                ></CaseCardIcon>
                <CaseCardIcon
                    v-if="props.data.material"
                    type="material"
                    class="w-16 h-16"
                ></CaseCardIcon>
      
                
            </div>
        </div>

        <div class="cabinet-card__info">
            <h2 class="cabinet-card__info-title">
                {{ props.data.title }}
            </h2>
            <p class="cabinet-card__info-text">
                {{ props.data.annotation }}
            </p>
        </div>
        
        <div class="cabinet-card__footer">
            <div class="cabinet-card__footer-btns">
                <div class="cabinet-card__footer-btn-views">
                    <ViewSvg class="cabinet-card__footer-btn-img"></ViewSvg>
                    <span>{{ props.data.views || 0 }}</span>
                </div>
                <div class="cabinet-card__footer-btn-rating">
                    <RaitingSvg class="cabinet-card__footer-btn-img"></RaitingSvg>
                    <span>{{ props.data.rating || 0 }}</span>
                </div>
            </div>
            <div class="cabinet-card__footer-btn-time">
                <TimeSvg class="cabinet-card__footer-btn-img"></TimeSvg>
                <span>{{ props.data.duration }}</span>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <ModalConfirm :show="modalShow" @remove="removeCase" @close="toggleDialog(null)">
            <template #body> <p class="text-xl font-medium">Удалить кейс ?</p> </template>
        </ModalConfirm>
    </Teleport>
</template>

<script setup>
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EditSvg from '../../../../assets/icons/blog/edit.svg?component'
import RemoveSvg from '../../../../assets/icons/blog/remove.svg?component'
import ViewSvg from '../../../../assets/icons/case/view.svg?component'
import RaitingSvg from '../../../../assets/icons/case/raiting.svg?component'
import TimeSvg from '../../../../assets/icons/case/time-icon.svg?component'
import ModalConfirm from '@/components/modal/ModalConfirm.vue'
import CaseCardIcon from './CaseCardIcon.vue'
const router = useRouter()

const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    },
    editing: {
        type: Boolean,
        default: false
    }
})

defineEmits(['link'])
const briefcaseStore = useBriefcaseStore()
const modalShow = ref(false)
const removeId = ref(null)

function validUrl(url) {
    try {
        new URL(getUrl(url))
        return true
    } catch (e) {
        return false
    }
}

function getUrl(url) {
    return import.meta.env.VITE_S3_URL + url
}

const edit = (e, id) => {
    e.stopPropagation()
    router.push({ name: 'edit-case', params: { id: id } })
}

function toggleDialog(id) {
    modalShow.value = !modalShow.value
    id ? (removeId.value = id) : (removeId.value = null)
}

function removeCase() {
    modalShow.value = !modalShow.value
    briefcaseStore.remove(removeId.value)
}

function linkCard(e, id) {
    e.stopPropagation()
    router.push({ name: 'card-page', params: { id: id } })
}
</script>

<style scoped lang="scss">
.cabinet-card {
    border: 2px solid $gray;
    border-radius: 24px;
    max-width: 600px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    overflow: hidden;

    &:hover {
        border: 2px solid $orange;
        box-shadow: 0 0 20px 0 $orange;
    }
}
.cabinet-card__img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    max-height: 300px;
    border-radius: 24px 24px 0 0;

    &-empty {
        background: $yellowy;
    }
}

.cabinet-card__info {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: $white;
}
.cabinet-card__info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    color: $black;
}
.cabinet-card__info-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;
}
.cabinet-card__footer {
    padding: 8px 16px;
    box-sizing: border-box;
    background: $fonLight;
    width: 100%;
    border-radius: 0 0 24px 24px;
    display: flex;
    justify-content: space-between;
}
.cabinet-card__footer-btns {
    display: flex;
    gap: 16px;
    align-items: center;

    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: $gray;
    }
}
.cabinet-card__footer-btn-views {
    display: flex;
    gap: 10px;
    align-items: center;
}
.cabinet-card__footer-btn-rating {
    display: flex;
    gap: 10px;
    align-items: center;
}
.cabinet-card__footer-btn-time {
    display: flex;
    gap: 10px;
    align-items: center;

    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: $gray;
    }
}
</style>
