<script setup lang="ts">
import HeaderComponent from '../components/header/HeaderComponent.vue'
import FooterComponent from '../components/main/FooterComponent.vue'
</script>

<template>
    <HeaderComponent />
    <slot />
    <FooterComponent />
</template>
