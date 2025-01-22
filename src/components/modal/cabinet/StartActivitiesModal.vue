<template>
    <div class="wrapper">
        <div class="wrapper-btns">
            <button class="active-btn"></button>
            <p class="font-bold text-2xl leading-[150%] text-[#e05704] text-center">
                Посмотрите правила
            </p>
            <div>
                <span class="font-normal text-xl leading-[150%] text-black text-center"
                    >Видео инструкция как проводить этот квест в классе и выбрать подходящий
                    уровень</span
                >
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    background: #e6eaed;
    padding: 48px 24px;
}
.wrapper-btns {
    border: 2px solid #e05704;
    border-radius: 16px;
    padding: 16px;
    background: #fff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    
    &:hover {
        background-color: #fff7ac;
    }
}

.active-btn {
    width: 64px;
    height: 64px;
    background-image: url('/icons/cabinet/start-activities/start.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 64px;
    height: 64px;

    &:hover {
        background-image: url('/icons/cabinet/start-activities/start-active.svg');
    }
}
</style>
