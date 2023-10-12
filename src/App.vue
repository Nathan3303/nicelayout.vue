<template>
    <div id="app">
        <nl-button icon="icon-heart">Like</nl-button>
        <nl-button icon="icon-heart-fill">Unlike</nl-button>
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import components
 */
// import NlDiv from "./components/NlDiv.vue";
// import NlTextarea from "./components/NlTextarea.vue";
// import NlInput from "./components/NlInput.vue";
import NlButton from "./components/NlButton.vue";

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
    /* flex-direction: column; */
    gap: 16px;
}
</style>
