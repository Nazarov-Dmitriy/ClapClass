<template>
    <div
        ref="dropDown"
        class="dropdown-wrapper"
        :class="{ active: isDropDownVisible, erorr: props.error }"
        @click="isDropDownVisible = !isDropDownVisible"
    >
        <div class="dropdown-selected">
            <p class="dropdown-selected-text truncate">
                {{ selectedOption || defaultValue }}
            </p>
            <svg
                class="dropdown-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.6215 10.7801C18.3596 10.1895 17.942 8.99927 16.9968 8.99927H7.00027C6.05504 8.99927 5.63745 10.1895 6.3755 10.7801L11.3737 14.7795C11.739 15.0717 12.258 15.0717 12.6233 14.7795L17.6215 10.7801Z"
                    fill="#656D75"
                />
            </svg>
        </div>
        <transition name="slide-fade">
            <div v-if="isDropDownVisible" class="option-wrapper" :class="optionsClass">
                <template v-for="(option, ind) in props.options" :key="ind">
                    <div class="option" @click="toggleOptionSelect(option)">
                        {{ option.label }}
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, ref, computed, defineEmits, onMounted, onBeforeUnmount, watch } from 'vue'

const dropDown = ref(null)

const props = defineProps({
    options: {
        type: Array,
        default: () => []
    }, 
    placeholder: {
        type: String,
        default: 'Выберите'
    },
    error: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String,
        default: ''
    },
    optionsClass: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue', 'select'])

const selectedOption = ref(null)

const isDropDownVisible = ref(false)

const toggleOptionSelect = (option) => {
    selectedOption.value = option.label
    emit('select', option)
    emit('update:modelValue', option.value)

    setTimeout(() => {
        isDropDownVisible.value = false
    }, 100)
}

const closeDropDown = (element) => {
    if (!dropDown.value.contains(element.target)) {
        isDropDownVisible.value = false
    }
}

const defaultValue = computed(() => {
    return props.options[0]?.label
})

onMounted(() => {
    window.addEventListener('click', closeDropDown)
    selectedOption.value = props.options?.filter((el) => el.value === props.modelValue)[0]?.label
})

onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropDown)
})

watch(
    () => props.modelValue,
    () => {
        selectedOption.value = props.options?.filter(
            (el) => el.value === props.modelValue
        )[0]?.label
    }
)
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
    cursor: pointer;
    position: relative;
    padding: 10px 16px;
    border: 2px solid $gray;
    box-sizing: border-box;
    height: 46px;
    border-radius: 24px;
    background: $white;
    width: 100%;

    &.active {
        border-radius: 24px 24px 0 0;
    }

    &:hover {
        .dropdown-selected-text {
            color: $orange;
        }

        .dropdown-icon path {
            fill: $orange;
        }
    }

    &.erorr {
        border: 1px solid $red;
    }
}

.dropdown-selected {
    width: 100%;
    background: $white;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dropdown-selected-text {
    min-width: 150px;
    color: $black;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    outline: none;
}

.option-wrapper {
    position: absolute;
    width: calc(100% + 4px);
    background-color: $white;
    border: 1px solid $gray;
    top: 43px;
    left: -2px;
    z-index: 10;
    border-radius: 0 0 24px 24px;
}

.option {
    padding: 8px 16px;
    color: $gray;
    border-top: 1px solid $gray;

}

.option:first-child {
    border-top: none;
}

.option:last-child {
    border-radius: 0 0 24px 24px;
}

.dropdown-icon {
    width: 24px;
    height: 24px;
}

.option:hover {
    color: $orange;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-4px);
    opacity: 0;
}
</style>
