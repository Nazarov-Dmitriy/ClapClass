<script setup lang="ts">
import BtnComponentOrange from '/src/components/btns/BtnComponentOrange.vue'
</script>

<template>
    <div class="card-page__right">
        <div class="card-page__right-options">
            <div class="card-page__right-btns">
                <img
                    class="card-page__right-btn card-page__right-btn--orange"
                    src="/public/images/cabinet/card-page/button.png"
                    alt=""
                />

                <BtnComponentOrange class="card-page__right-btn card-page__right-btn--white"
                    ><img src="" alt="" /> <span>Добавить в мои кейсы</span></BtnComponentOrange
                >
            </div>
            <div class="card-page__right-info">
                <div class="card-page__right-rules">
                    <div class="card-page__right-rules-texts">
                        <h3 class="card-page__right-rules-title">Изучите правила</h3>
                        <p class="card-page__right-rules-subtitle">
                            Для проведения данного квеста вам понадобится изучить правила
                        </p>
                    </div>
                    <div>
                        <img
                            src="/public/icons/cabinet/card-page/rules-icon1.svg"
                            alt=""
                            class="card-page__right-rules-img"
                        />
                    </div>
                </div>
                <div class="card-page__right-rules">
                    <div class="card-page__right-rules-texts">
                        <h3 class="card-page__right-rules-title">Требуется подготовка</h3>
                        <p class="card-page__right-rules-subtitle">
                            Для проведения данного квеста вам понадобится распечатать материалы
                        </p>
                    </div>
                    <img
                        src="/public/icons/cabinet/card-page/rules-icon2.svg"
                        alt=""
                        class="card-page__right-rules-img"
                    />
                </div>
                <div class="card-page__right-rules-author">
                    <span>Автор</span>
                    <span>Александр Войнов</span>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>

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
    &--orange {
    }
    &--white {
        text-align: center;
        max-width: 284px;
        font-weight: 500;
        font-size: 20px;
        line-height: 150%;
        color: #e05704;
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
