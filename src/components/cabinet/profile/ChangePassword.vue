<script setup lang="ts">
import BtnComponentOrange from '../../btns/BtnComponentOrange.vue'
import TitleComponent from '../../UI/TitleComponent.vue'
</script>

<template>
    <div class="rounded-3xl p-4 bg-fonLight flex flex-col gap-4 h-full">
        <TitleComponent class="text-center">
            Сменить пароль
        </TitleComponent>
        <form class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <label
                    class="font-medium text-base leading-[150%] text-gray"
                    for=""
                >Старый пароль</label>
                <input
                    class="border-2 border-fonLight rounded-[24px] p-4"
                    type="text"
                    placeholder="Введите старый пароль "
                >
            </div>
            <div class="flex flex-col gap-2">
                <label
                    class="font-medium text-base leading-[150%] text-gray"
                    for=""
                >Новый пароль</label>
                <input
                    class="border-2 border-fonLight rounded-[24px] p-4"
                    type="text"
                    placeholder="Введите новый пароль"
                >
            </div>
            <div class="flex flex-col gap-2">
                <label
                    class="font-medium text-base leading-[150%] text-gray"
                    for=""
                >Подтверждение пароля</label>
                <input
                    class="border-2 border-fonLight rounded-[24px] p-4"
                    type="text"
                    placeholder="Введите новый пароль еще раз"
                >
            </div>
        </form>
        <BtnComponentOrange class="text-center max-w-[220px] mx-auto">
            Сохранить пароль
        </BtnComponentOrange>
    </div>
</template>
