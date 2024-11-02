<template>
    <div class="modal__header">
        <div class="modal-close-wrapper">
            <span @click="closeModal" class="modal-close">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.92969 5L19.0718 19.1421"
                        stroke="#0E0806"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <path
                        d="M5 19.4102L19.1421 5.26802"
                        stroke="#0E0806"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </span>
        </div>
        <div class="modal__header-info">
            <p class="modal__header-info-text">
                <slot>Заполните форму, и команда Клеппи свяжется с вами</slot>
            </p>
        </div>
        <div class="modal__header-hero">
            <img
                src="../../assets/images/form/form-hero-img.png"
                alt=""
                class="modal__header-hero-img"
            />
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['closeModal'])

function closeModal() {
    emit('closeModal')
}
</script>

<style lang="scss" scoped>
.modal__header {
    padding: 16px 64px 0px 64px;
    box-sizing: border-box;
    background: url('../../assets/images/modal/modalHeader/modal-header-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    position: relative;
    border-radius: 25px 25px 0 0;
    margin-bottom: -5px;

    @media (max-width: $lg) {
        padding: 24px;
        width: 100%;
    }
}

.modal__header-info {
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    max-width: 490px;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.6);
}
.modal__header-info-text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    text-align: center;
    color: $orange;
}

.modal__header-hero {
    @media (max-width: $lg) {
        display: none;
    }
}
.modal__header-hero-img {
    width: 226px;
    transform: translate(0, -3px);
}

.modal-close-wrapper {
    position: absolute;
    top: 24px;
    right: 24px;

    @media (max-width: $lg) {
        top: 10px;
        right: 10px;
    }
}
.modal-close {
    cursor: pointer;
}
</style>
