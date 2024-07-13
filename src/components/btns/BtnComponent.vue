<template>
    <button class="btn-orange">
        <span class="btn-orange__text">
            <slot />
        </span>
    </button>
</template>

<style lang="scss">
.btn-orange {
    box-shadow:
        0 2px 4px 0 rgba(21, 15, 13, 0.1),
        0 8px 8px 0 rgba(21, 15, 13, 0.09);
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid $white;
    border-radius: 24px;
    padding: 8px 16px;
    background: $orange;
    cursor: pointer;
    transition: 0.4s;

    &:hover {
        border: 2px solid $white;
        box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
        background: $red;
        transform: translateY(-5px);
    }

    &:active {
        border: 2px solid $black;

        .btn-orange__text {
            color: $black;
        }
    }
}

.btn-orange__text {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
    color: $white;
    transform: 0.4s;
}
</style>
