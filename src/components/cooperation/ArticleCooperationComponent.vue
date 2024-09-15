<template>
    <section class="article-cooperation">
        <div class="article-cooperation__container">
            <div class="article-cooperation__wrapper">
                <div class="article-cooperation__hero">
                    <div class="article-cooperation__hero-img-wrapper">
                        <img
                            src="../../assets/images/cooperation/article/article-hero-bg.png"
                            alt=""
                            class="article-cooperation__hero-img"
                        />
                    </div>
                </div>
                <div class="article-cooperation__info">
                    <h2
                        class="article-cooperation__info-title article-cooperation__info-title--white"
                    >
                        Присоединяйтесь
                    </h2>
                    <h2
                        class="article-cooperation__info-title article-cooperation__info-title--orange"
                    >
                        к нашей команде!
                    </h2>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.article-cooperation {
    padding: 48px 64px;
    box-sizing: border-box;
    background:
        url('../../assets/images/cooperation/article/article-bg.png'),
        url('/public/images/cooperation/article/bg-img.png') no-repeat;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;

    @media (max-width: $lg) {
        padding: 48px 16px;
    }
    @media (max-width: $sm) {
        padding: 24px 0px 0px 0px;
    }
}
.article-cooperation__container {
    max-width: 1312px;
    margin: 0 auto;
}
.article-cooperation__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    gap: 61px;

    @media (max-width: $lg) {
        flex-direction: column;
        gap: 0;
    }
}

.article-cooperation__hero-img {
    @media (max-width: $sm) {
        width: 288px;
    }
}
.article-cooperation__info {
    position: absolute;
    right: 0;

    @media (max-width: $lg) {
        display: block;
        position: static;
        transform: translate(0, -50px);
    }
}
.article-cooperation__info-title {
    border: 4px solid #fff;
    padding: 16px 20px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);

    max-width: 606px;

    &--white {
        border: 4px solid #e05704;
        padding: 16px 24px;
        width: 598px;
        height: 122px;
        box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
        background: rgba(255, 255, 255, 0.8);
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 60px;
        line-height: 150%;
        text-align: center;
        color: #e05704;
        transform: rotate(-6deg) translate(-13px, -10px);
        font-family: "CenturyGothic";

        @media (max-width: $lg) {
            width: 420px;
            height: 92px;
            font-size: 40px;
            transform: rotate(-6deg) translate(-13px, 0px);
        }
        @media (max-width: $sm) {
            width: 287px;
            font-size: 26px;
            height: 71px;
        }
    }

    &--orange {
        background: #e05704;
        transform: rotate(-2deg) translateX(20px);
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 60px;
        line-height: 150%;
        text-align: center;
        color: #fff;
        font-family: "CenturyGothic";

        @media (max-width: $lg) {
            width: 420px;
            height: 92px;
            font-size: 40px;
            transform: rotate(0) translate(0);
        }
        @media (max-width: $sm) {
            font-size: 26px;
            width: 290px;
            font-size: 26px;
            height: 71px;
        }
    }
}
</style>
