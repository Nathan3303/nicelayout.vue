<template>
    <div id="app">
        <nl-input-test></nl-input-test>
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import components
 */
import NlInputTest from "./views/NlInputTest.vue";

/**
 * Define refs
 */
const inputValue = ref('');
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
