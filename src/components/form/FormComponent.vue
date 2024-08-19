<template>
    <div class="form">
        <div class="form__container container">
            <h2 class="form__hero-title form__hero-title--mobile">Остались вопросы?</h2>
            <div class="form__wrapper">
                <div class="form__hero">
                    <h2 class="form__hero-title">Остались вопросы?</h2>
                    <div class="form__hero-img-wrapper">
                        <img
                            class="form__hero-question-img"
                            src="../../assets/images/form/form-question-img.png"
                            alt=""
                        />
                        <img
                            class="form__hero-question-img form__hero-question-img--center"
                            src="../../assets/images/form/form-question-img.png"
                            alt=""
                        />
                        <img
                            class="form__hero-question-img form__hero-question-img--right"
                            src="../../assets/images/form/form-question-img.png"
                            alt=""
                        />
                        <img
                            src="../../assets/images/form/form-hero-img.png"
                            alt=""
                            class="form__hero-img"
                        />
                    </div>
                </div>
                <UiFom />
            </div>
        </div>
    </div>
</template>

<script setup>
import UiFom from './UiFom.vue'
</script>

<style lang="scss">
.form {
    background: $gray;
}
.form__container {
    padding: 48px 64px 0px 64px;
    box-sizing: border-box;

    @media (max-width: $lg) {
        padding: 48px 16px 0px 16px;
    }
    @media (max-width: $lg) {
        padding: 24px 16px 0 16px;
    }
}

.form__wrapper {
    display: flex;
    align-items: end;
    justify-content: space-around;
    gap: 16px;
    @media (max-width: $xl) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
.form__hero {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 546px;
    max-width: 546px;
    width: 100%;
    @media (max-width: $xl) {
        order: 2;
        height: 100%;
    }
    @media (max-width: $sm) {
        display: none;
    }
}
.form__hero-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $white;
    @media (max-width: $xl) {
        display: none;
    }
    &--mobile {
        display: none;
        @media (max-width: $xl) {
            display: block;
            text-align: center;
            margin-bottom: 48px;
        }
        @media (max-width: $sm) {
            font-size: 24px;
            line-height: 1.5;
            margin-bottom: 16px;
        }
    }
}
.form__hero-img-wrapper {
    display: flex;
    flex-direction: column;
    align-items: end;
    position: relative;
}
.form__hero-question-img {
    position: absolute;
    top: 110px;
    left: 20px;
    &--center {
        top: 30px;
        left: 60%;
        transform: translate(-50%) rotate(45deg);
    }
    &--right {
        top: 260px;
        left: 85%;
        transform: translate(-50%) rotate(60deg);
    }
}
.form__hero-img {
    width: 100%;
    max-width: 654px;
    @media (max-width: $lg) {
        max-width: 604px;
    }
}
</style>
