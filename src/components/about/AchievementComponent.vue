<template>
    <section class="achievements">
        <div class="achievements__container">
            <h2 class="achievements__title">Ачивки Clap Class</h2>
            <div class="achievements__img-wrapper">
                <img
                    src="/public/images/about/achievement/img1.svg"
                    alt="image 1"
                    class="achievements__img"
                />
                <img
                    src="/public/images/about/achievement/img2.png"
                    alt="image 2"
                    class="achievements__img"
                />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.achievements {
    padding: 48px 64px;
    @media (max-width: $lg) {
        padding: 24px 16px;
    }
    @media (max-width: $sm) {
        padding: 16px;
    }
}
.achievements__container {
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    gap: 48px;

    @media (max-width: $sm) {
        gap: 16px;
    }
}
.achievements__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: $orange;

    @media (max-width: $sm) {
        font-size: 24px;
        line-height: 1.5;
    }
}
.achievements__img-wrapper {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: center;
    align-items: center;
    gap: 48px;
    @media (max-width: $sm) {
        gap: 16px;
    }
}
</style>
