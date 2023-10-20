<template>
    <div id="app">
        <nl-input-test></nl-input-test>
        <!-- <nl-textarea-test></nl-textarea-test> -->
        <!-- <nl-button-test></nl-button-test> -->
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import components
 */
import NlInputTest from "./views/NlInputTest.vue";
import NlTextareaTest from "./views/NlTextareaTest.vue";
import NlButtonTest from "./views/NlButtonTest.vue";

</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
