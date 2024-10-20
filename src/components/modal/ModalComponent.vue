<template>
    <Transition name="modal">
        <div v-if="props.visible" class="modal-wrapper" @click="activateEmit" v-esc="activateEmit">
            <div class="modal" @click.stop>
                <slot name="header" />
                <slot name="form" />
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['closeModal'])

function activateEmit() {
    emit('closeModal')
}

function updateBodyScroll() {
    if (props.visible) {
        document.body.classList.add('no-scroll')
    } else {
        document.body.classList.remove('no-scroll')
    }
}

onMounted(() => {
    updateBodyScroll()
})
watch(() => props.visible, updateBodyScroll)

onBeforeUnmount(() => {
    document.body.classList.remove('no-scroll')
})
</script>

<style lang="scss">
.modal-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    inset: 0;
    background: rgba(31, 42, 62, 0.75);
    overflow: auto;
    z-index: 1000;
    padding: 20px;
}

.modal {
    max-width: 868px;
    width: 100%;
    max-height: 90vh;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: auto;
    transform: translateY(0);
    margin: auto;

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    & {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    @media (max-width: $lg) {
        max-height: 80vh;
    }
}

.no-scroll {
    overflow: hidden;
}

.modal-enter-active,
.modal-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
