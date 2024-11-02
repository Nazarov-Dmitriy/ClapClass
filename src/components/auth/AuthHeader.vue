<template>
    <div class="auth__header">
        <div class="auth-close-wrapper">
            <span @click="closeAuth" class="auth-close">
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
        
        <div class="auth__header-info">
            <p class="auth__header-info-text">
                <slot />
            </p>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['closeAuth'])

function closeAuth() {
    emit('closeAuth')
}
</script>

<style lang="scss" scoped>
.auth__header {
    padding: 48px 48px 24px 47px;
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
}

.auth__header-info {
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    box-shadow: 16px 16px 2px 0 rgba(14, 8, 6, 0.15);
    background: rgba(255, 255, 255, 0.6);
}

.auth__header-info-text {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    text-align: center;
    color: $orange;
}

.auth__header-hero {
    @media (max-width: $lg) {
        display: none;
    }
}

.auth-close-wrapper {
    position: absolute;
    top: 12px;
    right: 12px;
}

.auth-close {
    cursor: pointer;
}
</style>
