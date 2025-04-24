<template>
    <div class="subscribe mt-2">
        <div class="subscribe__img-container">
            <TitleComponent
                class="text-center text-center !text-[24px]/[36px] max-w-[272px] mx-auto"
            >
                Подписка на новости ClapClass
            </TitleComponent>
            <p class="font-normal text-base leading-[150%] text-center text-gray">
                Узнавай первым о новых кейсах, статьсях и обновлениях платформы
            </p>
            <img class="subscribe__hero" src="../../assets/images/article/hero.png" alt="hero" />
        </div>
        <div class="subscribe__form grow">
            <TransitionGroup name="list">
                <div v-if="!subscribe" class="flex items-center justify-center h-full">
                    <p class="subscribe__card-text">Вы уже подписаны</p>
                </div>
                <div v-else class="subscribe__info">
                    <BtnComponentWhite
                        emit-name="subscribe"
                        class="subscribe__btn"
                        @subscribe="addSubscribe()"
                    >
                        <span>Подписаться</span>
                    </BtnComponentWhite>
                    <p class="subscribe__text">
                        Нажимая кнопку “Подписаться” вы соглашаетесь с
                        <span
                            ><a
                                class="subscribe__text-link"
                                href="/documents/privat_policy.pdf"
                                target="_blank"
                                >политикой обработки персональных данных</a
                            ></span
                        >
                    </p>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/userStore'
import BtnComponentWhite from '@/components/ui/btns/BtnComponentWhite.vue'
import TitleComponent from '/src/components/ui/TitleComponent.vue'
import { computed, onMounted, ref, watch } from 'vue'
const userStore = useUserStore()

const getUser = computed(() => {
    return userStore.getUser
})

const isSuccess = computed(() => {
    return userStore.isSuccess
})

const subscribe = ref(false)

function addSubscribe() {
    userStore.addSubscribe({ email: getUser.value.email })
}

onMounted(() => {
    if (getUser.value) {
        subscribe.value = getUser.value.subscribe
    }
})

watch(
    getUser,
    (val) => {
        if (val) {
            subscribe.value = getUser.value.subscribe
        }
    },
    { deep: true }
)

watch(isSuccess, (val) => {
    if (val == 'subscribe') {
        subscribe.value = true
    }
})
</script>
<style lang="scss" scoped>
.subscribe {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.subscribe__img-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.subscribe__slogan {
    position: absolute;
    top: 0;
    left: 0;
    width: 229px;
    height: 156px;
}

.subscribe__hero {
    margin: 0 auto;
    width: 232px;
    height: 155px;
    display: block;
}

.subscribe__form {
    background: $gray;
    border-radius: 24px;
    padding: 16px;
    gap: 36px;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0px 16px 4px 0 rgba(14, 8, 6, 0.25);
}

.subscribe__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
}

.subscribe__text {
    font-size: 12px;
    line-height: 1.5;
    color: $white;
    text-align: center;
    max-width: 512px;
}

.subscribe__text-link {
    color: $white;
    text-decoration: underline;
}

.subscribe__card-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    color: white;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
    opacity: 1;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
}
</style>
