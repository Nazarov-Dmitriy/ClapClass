<template>
    <button
        class="btn-orange"
        :class="{ active: value }"
        :style="{ borderColor: props.color }"
        :disabled="props.disable"
        @click="submitEmit"
    >
        <span class="btn-orange__text" :style="{ color: props.color }">
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
    color: {
        type: String,
        default: null
    },
    disable: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['action', 'click'])

function submitEmit() {
    emit(props.emitName)
}
</script>

<style lang="scss" scoped>
.btn-orange {
    box-shadow:
        0 2px 4px 0 rgba(21, 15, 13, 0.1),
        0 8px 8px 0 rgba(21, 15, 13, 0.09);
    border: 2px solid $orange;
    border-radius: 24px;
    padding: 6px 16px;
    background: none;
    cursor: pointer;
    transition: 0.4s;
    display: block;
    background: $white;

    &:hover {
        border: 2px solid $white;
        box-shadow: 0 16px 2px 0 rgba(14, 8, 6, 0.15);
        background: $red;
        transform: translateY(-5px);

        .btn-orange__text {
            color: $white;
        }
    }

    &:active,
    &.active {
        border: 2px solid $white;
        background: $red;

        .btn-orange__text {
            color: $white;
        }
    }
    &:disabled {
        border: 2px solid $gray;

        .btn-orange__text {
            color: $gray;
        }
    }
}

.btn-orange__text {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
    color: $orange;
    transform: 0.4s;
}
</style>
