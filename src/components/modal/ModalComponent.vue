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

function activateEmit () {
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
    overflow: auto;
    height: 100%;
    width: 100%;
    position: fixed;
    inset: 0;
    background: rgba(31, 42, 62, 0.75);
}

.modal {
    overflow: auto;
    max-width: 868px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;

    @media (max-width: $xxl) {
        transform: translate(-50%, -25%);
    }

    @media (max-width: $sm) {
        transform: translate(-50%, -20%);
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
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
}
</style>
