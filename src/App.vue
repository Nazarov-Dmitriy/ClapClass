<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script setup>
import { useUserStore } from './stores/userStore'
const userStore = useUserStore()
userStore.autoLogin()
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin: 0 auto;
    height: 100%;
}
</style>
