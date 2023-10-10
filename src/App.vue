<template>
    <div id="app">
        <nl-input v-model="inputValue" placeholder="nl-input" />
        <nl-textarea v-model="textareaValue" placeholder="nl-textarea" rows="12" resize />
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
const textareaValue = ref("123123");

/**
 * Watch input value
 */
// watch(
//     () => textareaValue.value,
//     (newValue) => console.log(newValue)
// );
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
