<template>
    <div class="cs-card">
        <div class="cs-card__img animate-pulse bg-amber-400"></div>

        <div class="cs-card__info">
            <h2 class="cs-card__info-title animate-pulse rounded-full bg-amber-400">
                Скейтер в городе
            </h2>
            <p class="cs-card__info-text animate-pulse rounded-full bg-amber-400">
                Записывайте великие формулы магистра
            </p>
        </div>
        <div class="cs-card__footer">
            <div class="cs-card__footer-btns">
                <div class="cs-card__footer-btn-views animate-pulse rounded-full bg-amber-400">
                    <img src="#" alt="" class="cs-card__footer-btn-img" />
                    <span>100</span>
                </div>
                <div class="cs-card__footer-btn-rating animate-pulse rounded-full bg-amber-400">
                    <img src="#" alt="" class="cs-card__footer-btn-img" />
                    <span>100</span>
                </div>
            </div>
            <div class="cs-card__footer-btn-time animate-pulse rounded-full bg-amber-400">
                <img src="#" alt="" class="cs-card__footer-btn-img" />
                <span>2-5 мин</span>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
.cs-card {
    border: 2px solid $gray;
    border-radius: 24px;
    max-width: 600px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        border: 2px solid $orange;
        box-shadow: 0 0 20px 0 $orange;
    }
}
.cs-card__img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    max-height: 300px;
    border-radius: 24px 24px 0 0;
}
.cs-card__info {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: $white;
}
.cs-card__info-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    color: $black;
    overflow: hidden;
    color: transparent;
}
.cs-card__info-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: $black;
    overflow: hidden;
    color: transparent;
}
.cs-card__footer {
    padding: 8px 16px;
    box-sizing: border-box;
    background: $fonLight;
    width: 100%;
    border-radius: 0 0 24px 24px;
    display: flex;
    justify-content: space-between;
}
.cs-card__footer-btns {
    display: flex;
    gap: 16px;
    align-items: center;

    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: transparent;
    }
}

.cs-card__footer-btn-img {
    width: 15px;
}
.cs-card__footer-btn-views {
    display: flex;
    gap: 10px;
    align-items: center;
}
.cs-card__footer-btn-rating {
    display: flex;
    gap: 10px;
    align-items: center;
}
.cs-card__footer-btn-time {
    display: flex;
    gap: 10px;
    align-items: center;

    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: transparent;
    }
}
</style>
