<template>
    <div class="flex flex-col gap-2">
        <input
            :id="props.inputId"
            v-model="model"
            :placeholder="props.placeholder"
            :type="props.type"
            class="field__input"
            :class="{ error: props.error }"
        />
        <p v-if="props.error" class="error-text">{{ props.errorText }}</p>
    </div>
</template>
<script setup>
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
}

.error-text {
    color: $red;
}
</style>
