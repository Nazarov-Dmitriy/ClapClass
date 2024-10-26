<template>
    <h2 class="title"><slot /></h2>
</template>

<style lang="scss" scoped>
.title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: $orange;

    @media (max-width: $lg) {
        font-size: 32px;
        line-height: 150%;
    }
    @media (max-width: $sm) {
        font-size: 24px;
    }
}
</style>
