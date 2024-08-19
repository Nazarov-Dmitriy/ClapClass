<template>
    <Teleport to="body">
        <div class="modal-wrapper" @click="activateEmit">
            <div class="modal" @click.stop>
                <slot name="header" />
                <slot name="form" />
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['closeModal'])

function activateEmit() {
    emit('closeModal')
}

onMounted(() => {
    document.body.classList.add('no-scroll')
})

onBeforeUnmount(() => {
    document.body.classList.remove('no-scroll')
})
</script>

<style lang="scss">
.modal-wrapper {
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
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.no-scroll {
    overflow: hidden;
}
</style>
