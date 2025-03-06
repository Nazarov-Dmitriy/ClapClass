<template>
    <section class="blog__panel">
        <div class="blog__search">
            <input
                :value="search"
                type="text"
                class="blog__search-input"
                placeholder="Поиск"
                @input="emit('update:search', $event.target.value)"
                @keypress.enter="$emit('search')"
                @blur="$emit('search')"
            />
            <SearchIcon class="blog__search-icon"></SearchIcon>
        </div>
        <div class="blog__btns" :class="{ active: showMenu }">
            <DropdownComponent :options="props.option" class="blog__dropdown z-100" @select="change" />
            <DropdownComponent
                :sort="props.type"
                :options="props.optionCaseType"
                emit-name="action"
                class="blog__dropdown"
                @select="changeType"
            />
            <button class="btn border-2 border-gray rounded-full px-4" @click="emit('reset')">
                сбросить
            </button>
        </div>

        <button class="blog__btn-menu">
            <img
                src="../../assets/icons/blog/menu.svg"
                alt="menu-icon"
                @click="showMenu = !showMenu"
            />
        </button>
    </section>
</template>
<script setup>
import { ref } from 'vue'
import DropdownComponent from '../ui/dropdown/DropdownComponent.vue'
import SearchIcon from '../../assets/icons/search.svg?component'

const emit = defineEmits(['update:search', 'update:sort', 'update:type', 'search', 'reset'])

const props = defineProps({
    option: {
        type: Array,
        default: () => []
    },
    optionCaseType: {
        type: Array,
        default: () => []
    },
    search: {
        type: String,
        default: ''
    },
    sort: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    }
})

const showMenu = ref(false)

function change(select) {
    emit('update:sort', select.value)
}

function changeType(select) {
    emit('update:type', select.value)
}
</script>
<style lang="scss">
.blog__panel {
    display: flex;
    gap: 16px;
    align-items: center;
    position: relative;

    @media (max-width: $lg) {
        gap: 24px;
    }
}

.blog__search {
    position: relative;
    flex-basis: 192px;

    @media (max-width: $lg) {
        flex-basis: 100%;
    }
}

.blog__btns {
    display: flex;
    gap: 16px;
    width: 100%;

    @media (max-width: $lg) {
        display: none;

        &.active {
            position: absolute;
            top: 64px;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            background: rgba($color: #ffffff, $alpha: 0.8);
            z-index: 10;
        }
    }
}

.blog__dropdown {
    max-width: 256px;

    @media (max-width: $lg) {
        max-width: 208px;
    }
}

.blog__btn-panel {
    @media (max-width: $lg) {
        min-width: 173px;
    }
}

.blog__search-input {
    padding: 6px 56px 6px 16px;
    border: 2px solid $gray;
    border-radius: 24px;
    color: $gray;
    width: 100%;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;

    &::placeholder {
        color: $fonLight;
    }

    &:hover,
    &:focus {
        background: $yellowy;

        & + .blog__search-icon path {
            fill: $orange;
            stroke: $orange;
        }
    }
}

.blog__search-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 11px;
    right: 16px;
}

.blog__btn-menu {
    display: none;
    width: 48px;
    height: 48px;
    border: none;
    background: none;
    cursor: pointer;

    @media (max-width: $lg) {
        display: block;
    }
}
</style>
