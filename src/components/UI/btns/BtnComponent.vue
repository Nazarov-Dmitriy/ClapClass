<template>
    <button
        class="btn-orange"
        :class="{ active: value }"
        :disabled="props.disable"
        @click="submitEmit"
    >
        <span class="btn-orange__text" :class="props.currentClass">
            <slot />
        </span>
    </button>
</template>

<script setup>
const props = defineProps({
    emitName: {
        type: String,
        default: null
    },
    value: {
        type: Boolean
    },
    currentClass: {
        type: String,
        default: ''
    },
    disable: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['action'])

function submitEmit() {
    emit(props.emitName)
}
</script>

<style lang="scss" scoped>
.btn-orange {
    box-shadow:
        0 2px 4px 0 rgba(21, 15, 13, 0.1),
        0 8px 8px 0 rgba(21, 15, 13, 0.09);
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid $white;
    border-radius: 24px;
    padding: 6px 16px;
    background: $orange;
    cursor: pointer;
    transition: 0.4s;
    display: block;

    &:active,
    &.active {
        border: 2px solid $black;
        background: $red;

        .btn-orange__text {
            color: $black;
        }
    }

    &:hover {
        border: 2px solid $white;
        box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
        background: $red;
        transform: translateY(-5px);
    }

    &:disabled {
        border: 2px solid $gray;
        background: $gray;
        box-shadow: none;

        .btn-orange__text {
            color: $white;
        }

        &:hover {
            border: 2px solid $gray;
            transform: none;
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
