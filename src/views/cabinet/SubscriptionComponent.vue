<template>
    <div class="subscribe">
        <div class="subscribe__img-container">
            <TitleComponent class="text-center"> Подписка на новости ClapClass </TitleComponent>
            <p class="font-normal text-base leading-[150%] text-center text-gray">
                Узнавай первым о новых кейсах, статьсях и обновлениях платформы
            </p>

            <img class="subscribe__hero" src="../../assets/images/article/hero.png" alt="hero" />
        </div>
        <div class="subscribe__form">
            <div class="subscribe__info">
                <BtnComponentWhite
                    emit-name="subscribe"
                    class="subscribe__btn"
                    :color="subscribe__btn"
                    @subscribe="validateForm()"
                >
                    <span>Подписаться</span>
                </BtnComponentWhite>
                <p class="subscribe__text">
                    Нажимая кнопку “Подписаться” вы соглашаетесь с
                    <span
                        ><a class="subscribe__text-link" href="#"
                            >политикой обработки персональных данных</a
                        ></span
                    >
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import BtnComponentWhite from '/src/components/btns/BtnComponentWhite.vue'
import TitleComponent from '/src/components/UI/TitleComponent.vue'
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
    width: 315px;
    height: 211px;
    display: block;
}

.subscribe__form {
    background: $gray;
    border-radius: 24px;
    padding: 32px 16px;
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
    gap: 36px;
    align-items: center;
}

.subscribe__text {
    font-size: 12px;
    line-height: 1.5;
    color: $white;
    text-align: center;
}

.subscribe__text-link {
    color: $white;
    text-decoration: underline;
}
</style>
