<template>
    <section class="acquaint">
        <div class="acquaint__container">
            <div class="acquaint__wrapper">
                <div class="acquaint__info">
                    <div class="acquaint__info-titles">
                        <h2 class="acquaint__title acquaint__title--white">Знакомьтесь</h2>
                        <h2 class="acquaint__title acquaint__title--orange">Clapp Class</h2>
                    </div>
                    <img
                        src="/images/about/acquaint/hero-img.png"
                        alt=""
                        class="acquaint__hero-img acquaint__hero-img--mobile"
                    />
                    <p class="acquaint__text">
                        Сервис, способный наполнить ваш класс весельем, движением и аплодисментами
                    </p>
                </div>
                <div class="acquaint__hero">
                    <img
                        src="/images/about/acquaint/hero-img.png"
                        alt=""
                        class="acquaint__hero-img"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.acquaint {
    padding: 48px 64px;
    box-sizing: border-box;
    background-image: url('/images/about/acquaint/bg-img.png');
    background-position: 0 0;
    background-size: cover;
    background-repeat: no-repeat;

    @media (max-width: $lg) {
        padding: 24px 16px;
    }
    @media (max-width: $sm) {
        padding: 16px;
    }
}
.acquaint__container {
    max-width: 1440px;
    margin: 0 auto;
}
.acquaint__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 48px;

    @media (max-width: $lg) {
        grid-template-columns: auto;
        gap: 0;
        justify-content: center;
        align-items: center;
    }
}
.acquaint__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 590px;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-left: auto;

    @media (max-width: $lg) {
        margin-left: 0;
    }
}
.acquaint__info-titles {
    @media (max-width: $lg) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: $lg) {
        height: 192px;
        justify-content: flex-end;
    }

    @media (max-width: $sm) {
        height: 140px;
        justify-content: flex-end;

    }
}
.acquaint__title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 60px;
    line-height: 150%;
    text-align: center;

    @media (max-width: $lg) {
        font-size: 40px;
    }
    @media (max-width: $sm) {
        font-size: 26px;
    }
}
.acquaint__title--white {
    font-family: 'CenturyGothic';
    border: 4px solid $orange;
    padding: 12px 20px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.8);
    transform: rotate(-6deg);
    color: $orange;
    max-width: 461px;
    width: 100%;

    @media (max-width: $lg) {
        max-width: 323px;
    }
    @media (max-width: $sm) {
        max-width: 227px;
        transform: translate(5px, 15px) rotate(-6deg);
    }
}
.acquaint__title--orange {
    font-family: 'CenturyGothic';
    border: 4px solid $white;
    padding: 12px 20px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $orange;
    transform: rotate(-2deg) translate(30px, 0);
    color: $white;
    max-width: 412px;
    width: 100%;

    @media (max-width: $lg) {
        max-width: 290px;
        transform: translate(5px, 0);
    }
    @media (max-width: $sm) {
        max-width: 211px;
    }
}
.acquaint__text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: $orange;

    @media (max-width: $sm) {
        font-size: 20px;
    }
}
.acquaint__hero-img {
    border-radius: 24px;
    max-width: 528px;
    width: 100%;

    @media (max-width: $sm) {
        display: none;
    }

    &--mobile {
        display: none;

        @media (max-width: $sm) {
            display: block;
        }
    }
}
</style>
