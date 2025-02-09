<template>
    <div class="flex flex-col gap-2">
        <textarea
            :id="inputId"
            v-model="model"
            :placeholder="props.placeholder"
            :type="props.type"
            class="field__textarea"
            :class="{ error: props.error }"
            rows="5"
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
        type: String,
        default: ''
    },
    errorText: {
        type: String,
        default: ''
    }
})

const model = defineModel({ type: String })
</script>
<style lang="scss">
.field__textarea {
    display: flex;
    resize: none;
    overflow: hidden;
    outline: none;
    border: 2px solid $gray;
    border-radius: 24px;
    background: $white;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    padding: 12px 16px 12px;
    box-sizing: border-box;
    min-height: 100px;
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
