<script setup>
import BtnComponent from '@/components/ui/btns/BtnComponent.vue'
</script>

<template>
    <section class="info">
        <div class="info__container">
            <div class="info__video info__video--mobile">ЗАГЛУШКА</div>

            <div class="info__wrapper">
                <div class="info__video">ЗАГЛУШКА</div>
                <div class="info__info">
                    <h2 class="info__texts-title">Как появились разминки?</h2>
                    <div class="info__texts">
                        <div class="info__texts-subtitles">
                            <p class="info__texts-subtitle">
                                Все началось, когда я столкнулся с растущим скепсисом
                                младшеклассников на курсе программирования. Несмотря на методически
                                выверенную программу и соблюдение СанПин, росла усталость и
                                эмоциональная нестабильность класса.
                            </p>
                            <p class="info__texts-subtitle">
                                Возник вопрос: "Как сделать преподавание увлекательным, и
                                одновременно полезным для успеваемости и здоровья?
                            </p>
                            <p class="info__texts-subtitle">
                                Я заметил, как легко дети игнорируют утомление переключаясь на
                                мобильные игры, танцевальные тренды и групповые интерактивы на
                                переменах. Включение подобных мини-игр в занятие помогло ребятам
                                настроиться на урок, сохраняя мотивацию и хорошее настроение даже
                                при интенсивном обучении.
                            </p>
                            <p class="info__texts-subtitle">
                                Сегодня Clap Class делится этим опытом, создавая, тестируя и
                                оцифровывая методики, одобренные детской аудиторией. Мы понимаем
                                трудности педагогов и разрабатываем удобный продукт, позволяющий
                                коллегам по всей стране использовать передовые инструменты
                                геймификации и здоровьесбережения.
                            </p>
                            <p class="info__texts-subtitle text-end">
                                Войнов Александр 
                                <br>
                                Автор проекта
                            </p>
                        </div>
                    </div>
                    <BtnComponent
                        emit-name="action"
                        class="info__texts-btn"
                        @action="$router.push('/blog')"
                        >Блог проекта</BtnComponent
                    >
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.info {
    padding: 100px 64px 100px;
    box-sizing: border-box;

    @media (max-width: $lg) {
        padding: 80px 64px 100px;
    }

    @media (max-width: $md) {
        padding: 80px 16px 56px;
    }
    @media (max-width: $sm) {
        padding: 48px 16px 32px;
    }
}
.info__container {
    max-width: 1307px;
    margin: 0 auto;

    @media (max-width: $sm) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 48px;
    }
}
.info__wrapper {
    border-radius: 24px;
    border: 4px solid #fff;
    border-radius: 24px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 48px;
    background-image: url('/images/about/information/information-img.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 0;
    overflow: hidden;
    box-sizing: border-box;
    min-height: 545px;

    @media (max-width: $lg) {
        gap: 16px;
        align-items: center;
    }

    @media (max-width: $sm) {
        grid-template-columns: 1fr;
        min-height: auto;
    }
}

.info__video {
    width: 100%;
    max-width: 307px;
    background-color: grey;
    object-fit: cover;
    aspect-ratio: 1 / 1.56;
    border-radius: 24px;
    height: 100%;
    max-height: 545px;

    @media (max-width: $lg) {
        max-width: 266px;
        max-height: 464px;
    }

    @media (max-width: $md) {
        max-width: 247px;
        max-height: 430px;
    }

    @media (max-width: $sm) {
        display: none;
    }

    &--mobile {
        display: none;
        @media (max-width: $sm) {
            display: block;

            max-width: 288px;
            max-height: 503px;
        }
    }
}

.info__info {
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding: 52px 24px;

    @media (max-width: $lg) {
        padding: 24px 24px;
        gap: 24px;
    }

    @media (max-width: $sm) {
        padding: 32px 16px;
    }
}
.info__texts {
    padding: 0 24px;
    padding-left: 0;
    box-sizing: border-box;
    display: grid;
    gap: 48px;
    max-height: 274px;
    height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 8px;
        height: 100%;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background: #fff7ac;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #f57c00;
        border-radius: 4px;
        border-radius: 4px;
    }

    scrollbar-width: thin;
    scrollbar-color: #f57c00 #fff7ac;
    border-radius: 4px;
}

@supports (-ms-overflow-style: none) {
    .info__texts {
        -ms-overflow-style: scrollbar;
    }
}

.info__texts-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $orange;

    @media (max-width: $md) {
        font-size: 33px;
        line-height: 48px;
    }

    @media (max-width: $sm) {
        font-size: 24px;
        line-height: 36px;
    }
}
.info__texts-subtitles {
    display: grid;
    gap: 24px;
}
.info__texts-subtitle {
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: $black;

    @media (max-width: $lg) {
        font-size: 16px;
    }
}
.info__texts-btn {
    width: max-content;
    margin-top: -24px;
    @media (max-width: $lg) {
        margin-top: 0;
    }

    @media (max-width: $sm) {
        margin: 0 auto;
    }
}
</style>
