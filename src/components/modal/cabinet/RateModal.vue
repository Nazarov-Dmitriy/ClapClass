<template>
    <div
        class="rate-wrapper border-4 border-white rounded-[48px] p-5 px-[80px] max-w-[655px] min-h-[581px] w-full relative overflow-hidden"
    >
        <div class="modal-close-wrapper absolute top-4 right-4 z-30 cursor-pointer">
            <span class="modal-close" @click="closeModal">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.92969 5L19.0718 19.1421"
                        stroke="#0E0806"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <path
                        d="M5 19.4102L19.1421 5.26802"
                        stroke="#0E0806"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </span>
        </div>

        <img
            v-if="isSubmit || props.currentRating !== rating || rating !== 0"
            src="/images/cabinet/rate-modal/stars-bg.png"
            class="absolute inset-0 w-full h-[104%] -mt-1 object-cover z-10 opacity-80 pointer-events-none "
            alt="Stars Background"
        />

        <div class="flex flex-col gap-4 relative z-20">
            <h2
                v-if="!isSubmit"
                class="font-bold text-[36px] leading-[48px] text-center text-orange"
            >
                Понравилась разминка?
            </h2>
            <h2 v-else class="font-bold text-[36px] leading-[48px] text-center text-orange">
                Спасибо!
            </h2>
            <img
                src="/images/cabinet/rate-modal/rate-modal-hero.png"
                class="max-w-[321px] w-full mx-auto"
                alt="modal hero"
            />
            <span
                v-if="!isSubmit"
                class="font-bold text-[20px] leading-[150%] text-center text-[#413e3d]"
            >
                Оцените кейс – это поможет другим пользователям сделать эффективный выбор
            </span>
            <span v-else class="font-bold text-[20px] leading-[150%] text-center text-[#413e3d]">
                Ваша оценка очень важна для нас, это поможет нам стать еще лучше!
            </span>
            <div class="flex justify-center gap-4">
                <img
                    v-for="index in 5"
                    :key="index"
                    :src="index <= rating ? activeStar : inactiveStar"
                    class="max-w-[50px] w-full aspect-square object-cover cursor-pointer"
                    alt="rate star"
                    @click="setRating(index)"
                />
            </div>
            <div v-if="rating !== 0 && !isSubmit && props.currentRating !== rating" class="mx-auto">
                <BtnComponent emit-name="action" @action="ratingSubmit">
                    Оценить кейс
                </BtnComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'

const props = defineProps({
    currentRating: {
        type: Number,
        default: () => 0
    }
})

const emit = defineEmits(['closeModal', 'setRating'])

function closeModal() {
    emit('closeModal')
}
const rating = ref(0)
const isSubmit = ref(false)

onMounted(() => {
    rating.value = props.currentRating
})

const activeStar = '/icons/cabinet/rate-modal/star-active.svg'
const inactiveStar = '/icons/cabinet/rate-modal/star.svg'

function setRating(index) {
    isSubmit.value = false
    rating.value = index
}
function ratingSubmit() {
    isSubmit.value = true
    emit('setRating', rating.value)
}
</script>

<style lang="scss" scoped>
.rate-wrapper {
    background: url('/images/cabinet/rate-modal/bg-img.png');
    background-repeat: no-repeat;
    background-size: 104% 104%;
    background-position: -4px -4px;
}
</style>
