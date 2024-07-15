<template>
    <section class="project">
        <div class="project__container container">
            <h2 class="project__title">Динамично развивающийся проект</h2>
            <div class="project__wrapper">
                <div class="project__cards">
                    <div class="project__card">
                        <div class="project__card-wrapper">
                            <img
                                src="../../assets/images/main/project/project-card1.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем к соавторству </span>
                        </div>
                        <div class="project__card-wrapper">
                            <img
                                src="../../assets/images/main/project/project-card4.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем к соавторству </span>
                        </div>
                    </div>
                    <div class="project__card">
                        <div class="project__card-wrapper">
                            <img
                                src="../../assets/images/main/project/project-card2.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем к соавторству </span>
                        </div>
                        <div class="project__card-wrapper">
                            <img
                                src="../../assets/images/main/project/project-card5.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем к соавторству </span>
                        </div>
                    </div>
                    <div class="project__card">
                        <div class="project__card-wrapper">
                            <img
                                src="../../assets/images/main/project/project-card3.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем к соавторству </span>
                        </div>
                        <div class="project__card-wrapper">
                            <img
                                src="../../assets/images/main/project/project-card6.png"
                                alt=""
                                class="project__card-img"
                            />
                            <span>Приглашаем к соавторству </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup></script>
<style lang="scss">
.project {
    padding: 100px 0px 0px 0px;

    @media (max-width: $lg) {
        padding: 48px 0px 0px 0px;
    }
}

.container {
    max-width: 1440px;
    margin: 0 auto;
}

.project__title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 36px;
    line-height: 1.3;
    text-align: center;
    color: $orange;
    margin-bottom: 48px;

    @media (max-width: $lg) {
        font-size: 32px;
    }
    @media (max-width: $sm) {
        font-size: 24px;
        margin-bottom: 16px;
    }
}
.project__wrapper {
    padding: 48px 64px;
    background: $fonLight;

    @media (max-width: $lg) {
        padding: 48px 16px;
    }
    @media (max-width: $sm) {
        padding: 24px 16px 0px 16px;
    }
}
.project__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    row-gap: 16px;

    @media (max-width: $lg) {
        display: flex;
        flex-direction: column;
    }

    @media (max-width: $sm) {
        grid-template-columns: repeat(1, 1fr);
    }
}
.project__card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;

    @media (max-width: $lg) {
        flex-direction: row;
    }
    @media (max-width: $sm) {
        flex-direction: column;
    }

    img {
        width: 168px;

        @media(max-width: $sm){
            width: 116px;
        }
    }

    &::after {
        content: '';
        width: 1px;
        height: 80%;
        background: $gray;
        position: absolute;
        right: 0;
        top: 10%;
    }

    &:last-child::after {
        content: none;
    }

    span {
        font-family: "CenturyGothic";
        font-weight: 700;
        font-size: 24px;
        line-height: 1.5;
        text-align: center;
        color: $gray;
        margin-bottom: 48px;
        padding: 16px;

        @media (max-width: $lg) {
            font-size: 20px;
            padding: 16px 0;
        }
    }
}

@media (max-width: $lg) {
    .project__card::after {
        top: 270px;
        right: auto;
        left: 50%;
        width: 100%;
        height: 1px;
        transform: translateX(-50%);
    }
}

@media (max-width: $sm) {
    .project__card::after {
        content: none;
    }
}

.project__card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: $lg) {
        display: flex;
    }
    @media (max-width: $sm) {
        flex-direction: row;
        align-items: center;
    }
}
</style>
