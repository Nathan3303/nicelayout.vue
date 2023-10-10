<template>
    <div id="app">
        <nl-textarea v-model="inputValue" placeholder="nl-textarea" counter="word-limit" />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

/**
 * Import components
 */
// import NlDiv from "./components/NlDiv.vue";
import NlTextarea from "./components/NlTextarea.vue";
import NlInput from "./components/NlInput.vue";

/**
 * Define refs
 */
const inputValue = ref("");

/**
 * Watch input value
 */
watch(
    () => inputValue.value,
    (newValue) => console.log(newValue)
);
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
