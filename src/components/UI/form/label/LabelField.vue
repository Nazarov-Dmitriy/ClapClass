<template>
    <label
        :for="props.for"
        class="field__label"
        :class="[{ error: props.error }, error && props.errorClass]"
    >
        <slot></slot>
    </label>
</template>
<script setup>
const props = defineProps({
    for: {
        type: String,
        default: ''
    },
    error: {
        type: Boolean,
        default: false
    },
    errorClass: {
        type: String,
        default: ''
    }
})
</script>
<style lang="scss" scoped>
.field__label {
    font-weight: 500;
    color: $gray;
    &.error {
        color: $red;
    }

    &.file {
        box-shadow:
            0 2px 4px 0 rgba(21, 15, 13, 0.1),
            0 8px 8px 0 rgba(21, 15, 13, 0.09);
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid #ffffff;
        border-radius: 24px;
        padding: 6px 24px;
        background: $orange;
        cursor: pointer;
        transition: 0.4s;
        display: block;
        width: fit-content;
        color: white;

        &.error {
            background: $red;
        }
    }

    &.btn-orange {
        box-shadow:
            0 2px 4px 0 rgba(21, 15, 13, 0.1),
            0 8px 8px 0 rgba(21, 15, 13, 0.09);
        border: 2px solid #e05704;
        border-radius: 24px;
        padding: 6px 16px;
        background: none;
        cursor: pointer;
        transition: 0.4s;
        display: block;
        color: $orange;

        &.error {
            background: $red;
            color: $white;
        }
    }
}
</style>
