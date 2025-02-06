<template>
    <div class="skeleton-article__card">
        <div class="skeleton-article__cover animate-pulse bg-amber-400"></div>

        <div class="skeleton-article__contnent">
            <h3 class="skeleton-article__title animate-pulse rounded-full bg-amber-400">
                props.data.title
            </h3>
            <div class="skeleton-article__footer">
                <div class="skeleton-article__btns">
                    <div class="skeleton-article__btn animate-pulse rounded-full bg-amber-400">
                        <p class="w-6 h-6"></p>
                        <div class="skeleton-article__count">1</div>
                    </div>
                    <div class="skeleton-article__btn animate-pulse rounded-full bg-amber-400">
                        <div class="skeleton-article__btn">
                            <p class="w-6 h-6"></p>
                            <div class="skeleton-article__count">1</div>
                        </div>
                    </div>
                    <p class="skeleton-article__date">22.04.2024</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.skeleton-article__card {
    display: flex;
    flex-direction: column;
    border: 2px solid $gray;
    border-radius: 24px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    position: relative;
}

.skeleton-article__cover {
    min-width: 0%;
    max-width: 100%;
    height: 220px;
    position: relative;
    margin: 16px;
    border-radius: 12px;
    box-sizing: border-box;
}

.skeleton-article__contnent {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;
    flex-grow: 1;
}

.skeleton-article__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    color: transparent;
    max-height: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    width: 100%;
}

.skeleton-article__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.skeleton-article__btns {
    display: flex;
    align-items: center;
    gap: 24px;
    width: 100%;

    @media (max-width: $md) {
        gap: 16px;
    }

    @media (max-width: $sm) {
        gap: 24px;
    }
}

.skeleton-article__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.skeleton-article__count,
.skeleton-article__date,
.skeleton-article__tag-text {
    font-size: 16px;
    line-height: 1.5;
    color: transparent;
}
</style>
