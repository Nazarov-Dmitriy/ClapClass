<template>
    <LevelCaseItemAdd :id="props.id"></LevelCaseItemAdd>
    <div class="flex flex-col gap-4">
        <LevelCaseItem
            v-for="level in data"
            :id="props.id"
            :key="level.id"
            :level="level"
        ></LevelCaseItem>
    </div>
</template>
<script setup>
import LevelCaseItem from './LevelCaseItem.vue'
import LevelCaseItemAdd from './LevelCaseItemAdd.vue'

const props = defineProps({
    id: {
        type: Number,
        default: null
    },
    data: {
        type: Array,
        default: new Array()
    }
})
</script>
<style lang="scss"></style>
