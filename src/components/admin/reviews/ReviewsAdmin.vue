<template>
    <section class="reviews__contaner">
        <div class="flex gap-2">
            <div class="flex gap-2">
                <input id="one" v-model="type" class="btn-radio" type="radio" value="add" />
                <label for="one">Добавить</label>
            </div>
            <div class="flex gap-2">
                <input id="two" v-model="type" class="btn-radio" type="radio" value="edit" />
                <label for="two">Редактировать</label>
            </div>
        </div>
        <AddReviews v-if="type === 'add'" />
        <EditReviews v-else />
    </section>
</template>
<script setup>
import { ref } from 'vue'
import AddReviews from './AddReviews.vue'
import EditReviews from './EditReviews.vue'

const type = ref('add')
</script>
<style lang="scss" scoped>
.reviews__contaner {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.btn-radio{
accent-color: $orange;
}

</style>
