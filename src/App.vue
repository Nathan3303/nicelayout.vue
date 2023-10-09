<script setup>
import { ref } from "vue";

/**
 * Import components
 */
// import NlDiv from "./components/NlDiv.vue";
// import NlTextarea from "./components/NlTextarea.vue";
import NlInput from "./components/NlInput.vue";

/**
 * Define refs
 */
const inputValue = ref("");
</script>

<template>
    <div id="app">
        <nl-input :model-value="inputValue" />
    </div>
</template>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
