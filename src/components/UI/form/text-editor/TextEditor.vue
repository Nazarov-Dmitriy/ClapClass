<template>
    <div class="ck-editor-wrapper" :class="{ error: props.error }">
        <ckeditor v-model="model" :editor="editor" :config="editorConfig" />
        <p v-if="props.error" class="error-text mt-2">
            <ErrorSvg clip="w-5 h-5"></ErrorSvg> {{ props.errorText }}
        </p>
    </div>
</template>
<script setup>
import ErrorSvg from '@/assets/icons/error.svg?component'

import coreTranslations from 'ckeditor5/translations/ru.js'
import {
    ClassicEditor,
    Bold,
    Essentials,
    Italic,
    Mention,
    Paragraph,
    Undo,
    FontSize,
    FontColor,
    Heading,
    FontBackgroundColor,
    List,
    ListProperties,
    Image,
    PictureEditing,
    ImageUpload,
    CKBox,
    CKBoxImageEdit,
    CKBoxEditing,
    LinkEditing,
    CloudServices,
    Base64UploadAdapter,
    ImageTextAlternative,
    ImageToolbar,
    ImageResize,
    ImageStyle
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import { watch } from 'vue'
const editor = ClassicEditor
const editorConfig = {
    fontSize: {
        options: [12, 14, 16, 18, 20, 22, 24]
    },
    paragraph: {
        options: {
            classes: 'article-text'
        }
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageResize',
            'imageCaption',
            'imageStyle',
            '|',
            'imageStyle:block',
            'imageStyle:inline',
            'imageStyle:side'
        ]
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            {
                model: 'heading1',
                view: { name: 'h1', classes: 'article-h1' },
                title: 'Heading 1',
                class: 'ck-heading_heading1'
            },
            {
                model: 'heading2',
                view: { name: 'h2', classes: 'article-h2' },
                title: 'Heading 2',
                class: 'ck-heading_heading2'
            },
            {
                model: 'heading3',
                view: { name: 'h3', classes: 'article-h3' },
                title: 'Heading 3',
                class: 'ck-heading_heading3    '
            }
        ]
    },
    plugins: [
        Bold,
        Essentials,
        Italic,
        Mention,
        Paragraph,
        Undo,
        FontSize,
        FontColor,
        Heading,
        FontBackgroundColor,
        List,
        ListProperties,
        Image,
        PictureEditing,
        ImageUpload,
        CKBox,
        CKBoxImageEdit,
        CKBoxEditing,
        LinkEditing,
        CloudServices,
        Base64UploadAdapter,
        ImageTextAlternative,
        ImageToolbar,
        ImageResize,
        ImageStyle
    ],
    toolbar: {
        items: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'fontsize',
            'fontcolor',
            'fontBackgroundColor',
            '|',
            'bulletedList',
            'numberedList',
            'imageUpload',
            'ckbox'
        ],
        shouldNotGroupWhenFull: true
    },
    translations: [coreTranslations]
}
const model = defineModel({ type: String })
const props = defineProps({
    placeholder: {
        type: String,
        default: 'Выберите'
    },
    error: {
        type: Boolean,
        default: null
    },
    errorText: {
        type: String,
        default: null
    }
})

watch(props, () => {}, { deep: true })
</script>
<style lang="scss" scoped>
.ck-editor-wrapper {
    :deep(.ck-toolbar__items) {
        padding: 16px;
        box-sizing: border-box;
        background: $orange;
        width: 100%;
        border-radius: 32px 32px 0 0;
    }

    :deep(.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused)) {
        border-radius: 0 0 32px 32px;
        height: 500px;
        padding: 10px;
        box-sizing: border-box;
        border: 2px solid $orange;
    }

    :deep(
        .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content,
        .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content.ck-rounded-corners
    ) {
        position: relative;
    }
    :deep(.ck.ck-editor__editable_inline) {
        border-radius: 0 0 32px 32px;
        padding: 10px;
        box-sizing: border-box;
        height: 500px;
        margin: 0 4px;
    }
    :deep(.ck.ck-toolbar) {
        background: transparent;
    }
    :deep(.ck-sticky-panel__content) {
        border: transparent !important;
    }

    :deep(.ck.ck-editor__editable) {
        border: 2px solid $orange;
    }

    :deep(.ck.ck.ck-button:hover) {
        border-radius: 8px;
    }
    :deep(.ck.ck-dropdown__button:hover) {
        .ck-splitbutton__arrow {
            border-radius: 0 8px 8px 0;
        }
        .ck-splitbutton__action {
            border-radius: 8px 0 0 8px;
        }
    }

    .ck {
        --tw-ring-color: red;
        .ck-powered-by {
            display: none;
        }

        ul,
        ol {
            padding-inline-start: 40px;
        }
    }

    &.error {
        .ck-editor {
            border: 1px solid $red;
        }

        :deep(.ck.ck-editor__editable) {
            border: 2px solid $red !important;
        }

        :deep(.ck-toolbar__items) {
            background: $red;
        }
    }
}


.error-text {
    color: $red;
    display: flex;
    gap: 4px;
}
</style>
