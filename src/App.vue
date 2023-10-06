<script setup>
import { ref } from "vue";

/**
 * Import components
 */
import NlTextarea from "./components/NlTextarea.vue";

/**
 * Define refs
 */
const textareaValue = ref("");
</script>

<template>
    <div id="app">
        <nl-textarea :size="18" :value="textareaValue" placeholder="Input something"></nl-textarea>
    </div>
</template>

<style scoped></style>
