<template>
    <div id="app">
        <test-avatar></test-avatar>
        <test-link></test-link>
    </div>
</template>

<script setup>
import testAvatar from "./components/test-avatar.vue";
import testLink from "./components/test-link.vue";
</script>

<style scoped>
#app {
    box-sizing: border-box;
    padding: 12px;
}
</style>
