<template>
    <section class="reviews__contaner">
        <div class="flex gap-2">
            <div class="flex gap-2">
                <input id="two" v-model="type" class="btn-radio" type="radio" value="edit" />
                <label for="two">Редактировать</label>
            </div>
            <div class="flex gap-2">
                <input id="one" v-model="type" class="btn-radio" type="radio" value="add" />
                <label for="one">Добавить</label>
            </div>
        </div>
        <AddSocial v-if="type === 'add'" />
        <EditSocial v-else />
    </section>
</template>
<script setup>
import { ref } from 'vue'
import EditSocial from './EditSocial.vue';
import AddSocial from './AddSocial.vue';

const type = ref('edit')
</script>
<style lang="scss" scoped>
.reviews__contaner {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.btn-radio {
    accent-color: $orange;
}
</style>
