<script setup lang="ts">
import BtnComponent from '../btns/BtnComponent.vue'
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
                                эмоциональная нестабильность класса. Возник вопрос: "Как сделать
                                преподавание увлекательным, и одновременно полезным для успеваемости
                                и здоровья?
                            </p>
                            <p class="info__texts-subtitle">
                                Я заметил, как легко дети игнорируют утомление переключаясь на
                                мобильные игры, танцевальные тренды и групповые интерактивы на
                                переменах. Включение подобных мини-игр в занятие помогло ребятам
                                настроиться на урок, сохраняя мотивацию и хорошее настроение даже
                                при интенсивном обучении.  Сегодня «Clap Class» делится этим опытом,
                                создавая, тестируя и оцифровывая методики, одобренные детской
                                аудиторией. Мы понимаем трудности педагогов и разрабатываем удобный
                                продукт, позволяющий коллегам по всей стране использовать передовые
                                инструменты геймификации и здоровьесбережения.
                            </p>
                        </div>
                    </div>
                    <BtnComponent
                        emit-name="action"
                        @action="$router.push('/blog')"
                        class="info__texts-btn"
                        >Блог проекта</BtnComponent
                    >
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.info {
    padding: 48px 64px;
    box-sizing: border-box;

    @media (max-width: $lg) {
        padding: 24px 16px;
    }
    @media (max-width: $sm) {
        padding: 16px;
    }
}
.info__container {
    max-width: 1307px;
    margin: 0 auto;
}
.info__wrapper {
    border-radius: 24px;
    border: 4px solid #fff;
    border-radius: 24px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 48px;
    background-image: url('/images/about/information/information-img.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 0;
    overflow: hidden;
    padding: 48px 24px;
    box-sizing: border-box;
    @media (max-width: $sm) {
        grid-template-columns: 1fr;
    }
}
.info__video {
    width: 100%;
    max-width: 307px;
    min-width: 288px;
    background-color: grey;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    height: calc(100% + 24px);
    border-radius: 24px;
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
.info__info {
    display: flex;
    flex-direction: column;
    gap: 48px;
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
}
.info__texts-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $orange;
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
}
.info__texts-btn {
    width: max-content;
    margin-top: -24px;
}
</style>
