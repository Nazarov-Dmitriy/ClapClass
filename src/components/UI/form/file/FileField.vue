<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-2 items-center">
            <LabelField class="file" for="input_file" :error="props.error">{{
                props.label
            }}</LabelField>
            <div v-if="props.fileName && !fileLoad" class="flex gap-2">
                <p>{{ getFileName }}</p>
                <button
                    v-if="typeof props.fileName == 'object'"
                    class="w-5 h-5 hover:text-[#e05704]"
                    @click="removeFile()"
                >
                    <CloseSvg></CloseSvg>
                </button>
            </div>
            <div v-else class="">
                <PulseLoader
                    :loading="fileLoad"
                    :color="'#e05704'"
                    :size="'24px'"
                    class=""
                ></PulseLoader>
            </div>
        </div>
        <input
            id="input_file"
            ref="inputFile"
            type="file"
            class="visuallyhidden"
            :accept="props.acceptMaterial"
            @change="onFileChange"
        />

        <p v-if="props.error" class="error-text">
            {{ props.errorText }}
        </p>
    </div>
</template>
<script setup>
import LabelField from '../label/LabelField.vue'
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'
import CloseSvg from '@/assets/icons/close.svg?component'
import { computed, ref, watch } from 'vue'

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    acceptMaterial: {
        type: String,
        default: 'article'
    },
    pageType: {
        type: String,
        default: 'add'
    },
    fileName: {
        type: [File, String] ,
        default: 'article'
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

const inputFile = ref(null)
const fileLoad = ref(false)
const emit = defineEmits(['file-change'])

const getFileName = computed(() => {
    if (typeof props.fileName == 'object') {
        return props.fileName.name
    }
    return props.fileName.split('/')[props.fileName.split('/').length - 1]
})

function onFileChange(e) {
    const file = e.target.files[0]
    let reader = new FileReader()
    if (file) {
        fileLoad.value = true
        reader.onload = () => {
            fileLoad.value = false
            emit('file-change', file)
        }
        reader.readAsArrayBuffer(file)
    }
}

function removeFile() {
    emit('file-change', null)
    inputFile.value.value = ''
}

watch(
    () => props,
    () => {}
)
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

.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}
</style>
