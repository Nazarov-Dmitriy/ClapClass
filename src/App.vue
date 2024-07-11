<script setup>
import {  RouterView } from 'vue-router'
</script>

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  height: 100%;
}
</style>
