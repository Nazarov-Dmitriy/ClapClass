<template>
    <div class="auth">
        <AuthHeader>
            Регистрируйся и получи
            доступ к витрине кейсов
        </AuthHeader>
        <AuthLogin/>
    </div>
</template>

<script setup>
import AuthHeader from '@/components/auth/AuthHeader.vue'
import AuthLogin from '@/components/auth/AuthLogin.vue'
</script>

<style lang="scss" scoped>
.auth {
    max-width: 480px;
    margin: auto;
}
</style>
