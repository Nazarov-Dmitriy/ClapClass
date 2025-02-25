<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script setup>
import { useSocialStore } from './stores/socialStore';
import { useUserStore } from './stores/userStore'
const userStore = useUserStore()
const socialStore = useSocialStore()
userStore.autoLogin()
socialStore.getListDb()
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
