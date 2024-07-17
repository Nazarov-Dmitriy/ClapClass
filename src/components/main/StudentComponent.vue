<template>
    <section class="student">
        <div class="student__container container">
            <h2 class="student__title">Clap class для учеников</h2>
            <div class="student__cards">
                <div class="student__card">
                    <div class="student__card-header">
                        <img
                            src="../../assets/images/main/student/student-hero1.png"
                            alt=""
                            class="student__card-img"
                        />
                    </div>
                    <div class="student__card-body">
                        <h3 class="student__card-title">Крепкое <span>здоровье</span></h3>
                        <p class="student__card-text">
                            Регулярная двигательная активность улучшает показатели психофизического
                            здоровья
                        </p>
                    </div>
                    <div class="student__card-footer">
                        <div class="student__card-footer-info">
                            <span>100%</span>
                            <span>больше</span>
                            <span>движения</span>
                        </div>
                        <div class="student__card-footer-img student__card-footer-img-1"></div>
                    </div>
                </div>
                <div class="student__card">
                    <div class="student__card-header">
                        <img
                            src="../../assets/images/main/student/student-hero2.png"
                            alt=""
                            class="student__card-img"
                        />
                    </div>
                    <div class="student__card-body">
                        <h3 class="student__card-title">Благоприятная <span>атмосфера</span></h3>
                        <p class="student__card-text">
                            Кратно улучшает показатели академической успеваемости, вовлеченности и
                            счастья
                        </p>
                    </div>
                    <div class="student__card-footer">
                        <div class="student__card-footer-info">
                            <span>100%</span>
                            <span>лучше</span>
                            <span>концентрация</span>
                        </div>
                        <div class="student__card-footer-img student__card-footer-img-2"></div>
                    </div>
                </div>
                <div class="student__card">
                    <div class="student__card-header">
                        <img
                            src="../../assets/images/main/student/student-hero3.png"
                            alt=""
                            class="student__card-img"
                        />
                    </div>
                    <div class="student__card-body">
                        <h3 class="student__card-title">Эффективное <span>обучение</span></h3>
                        <p class="student__card-text">
                            Игровой формат является естественным способом быстрого усвоения
                            информации
                        </p>
                    </div>
                    <div class="student__card-footer">
                        <div class="student__card-footer-info">
                            <span>80%</span>
                            <span>больше</span>
                            <span>движения</span>
                        </div>
                        <div class="student__card-footer-img student__card-footer-img-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup></script>
<style lang="scss">
.student {
    padding: 100px 64px 0px 64px;
    overflow-y: hidden;

    @media (max-width: $lg) {
        padding: 48px 0;
    }
    @media (max-width: $sm) {
        padding: 24px 0;
    }
}
.student__container {
    display: flex;
    flex-direction: column;
    gap: 128px;

    @media (max-width: $lg) {
        gap: 10px;
    }
}
.student__title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 36px;
    line-height: 1.3;
    text-align: center;
    color: $orange;

    @media (max-width: $lg) {
        font-size: 36px;
        line-height: 1.5;
    }
    @media (max-width: $sm) {
        font-size: 24px;
    }
}
.student__cards {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;

    @media (max-width: $lg) {
        display: flex;
        justify-content: start;
        flex-wrap: nowrap;
        justify-content: start;
        overflow-x: scroll;
        padding-top: 71px;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
.student__card {
    border: 2px solid #656d75;
    border-radius: 24px;
    padding: 128px 0px 0px 0px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: $white;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 424px;
    width: 100%;
    min-width: 300px;
    cursor: pointer;
    justify-content: space-between;

    &:hover {
        border: 2px solid $orange;
        background: $yellowy;
    }

    &:hover .student__card-footer {
        background: $orange;
        color: $white;
    }

    &:hover .student__card-footer-info span {
        color: $white;
    }

    @media (max-width: $lg) {
        min-width: 420px;
    }
    @media (max-width: $sm) {
        min-width: 240px;
    }
}
.student__card-header {
    display: flex;
    justify-content: center;
    position: relative;
}
.student__card-img {
    position: absolute;
    top: -200px;
}
.student__card-body {
}
.student__card-title {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: $orange;
    margin-bottom: 24px;

    span {
        display: block;
        text-align: center;
    }

    @media (max-width: $lg) {
        font-size: 20px;
    }
}
.student__card-text {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: $black;
    @media (max-width: $lg) {
        font-size: 16px;
    }
}
.student__card-footer {
    border-radius: 24px;
    padding: 16px;
    background: $fonLight;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition:
        background 0.3s,
        color 0.3s;

    @media (max-width: $sm) {
        gap: 0;
    }

    .student__card-footer-info {
        display: flex;
        flex-direction: column;
        gap: 8px;

        span {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 20px;
            line-height: 1.5;
            color: $gray;
            transition: color 0.3s;

            @media (max-width: $sm) {
                font-size: 16px;
            }
        }

        span:nth-child(1) {
            font-family: var(--second-family);
            font-weight: 700;
            font-size: 36px;
            line-height: 1.3;
            color: $gray;
        }
    }
}

.student__card:hover .student__card-footer-info span {
    color: $white;
}
.student__card-footer-img-1 {
    background: url('../../assets/images/main/student/student-card-svg1.svg') no-repeat right;
    width: 100%;
    height: 100%;
}
.student__card-footer-img-2 {
    background: url('../../assets/images/main/student/student-card-svg2.svg') no-repeat right;
    width: 100%;
    height: 100%;
}
.student__card-footer-img-3 {
    background: url('../../assets/images/main/student/student-card-svg3.svg') no-repeat right;
    width: 100%;
    height: 100%;
}

.student__card:hover .student__card-footer-img-1 {
    background: url('../../assets/images/main/student/student-svg-active1.svg') no-repeat right;
}
.student__card:hover .student__card-footer-img-2 {
    background: url('../../assets/images/main/student/student-svg-active2.svg') no-repeat right;
}
.student__card:hover .student__card-footer-img-3 {
    background: url('../../assets/images/main/student/student-svg-active3.svg') no-repeat right;
}
</style>
