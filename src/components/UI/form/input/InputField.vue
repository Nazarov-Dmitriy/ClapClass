<template>
    <div class="flex flex-col gap-2">
        <input
            :id="props.inputId"
            v-model="model"
            :placeholder="props.placeholder"
            :type="props.type"
            class="field__input"
            :class="[{ error: props.error }, props.class, `border-${props.errorColor}`]"
        />
        <p v-if="props.error" class="error-text" :class="props.error && props.errorClass">
            <ErrorSvg clip="w-5 h-5"></ErrorSvg> {{ props.errorText }}
        </p>
    </div>
</template>
<script setup>
import ErrorSvg from '@/assets/icons/error.svg?component'

const props = defineProps({
    inputId: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    error: {
        type: Boolean,
        default: false
    },
    errorText: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    },
    errorClass: {
        type: String,
        default: ''
    }
})

const model = defineModel({ type: String })
</script>
<style lang="scss" scoped>
.field__input {
    border: 2px solid $gray;
    border-radius: 24px;
    padding: 10px 16px;
    background: $white;
    font-size: 16px;
    line-height: 24px;
    width: 100%;

    &.error {
        border: 2px solid red;
        font-size: 16px;
        line-height: 24px;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-box-shadow:0 0 0 50px white inset; /* Change the color to your own background color */
    }
}

.error-text {
    color: $red;
    display: flex;
    gap: 4px;
}
</style>
