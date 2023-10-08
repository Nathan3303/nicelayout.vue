<script setup>
import { ref } from "vue";

/**
 * Import components
 */
import NlDiv from "./components/NlDiv.vue";
import NlTextarea from "./components/NlTextarea.vue";
import NlInput from "./components/NlInput.vue";

/**
 * Define refs
 */
const textareaValue = ref("");
const inputValue = ref("");
</script>

<template>
    <div id="app">
        <nl-div :gap="24">
            <nl-input
                width="100%"
                placeholder="Input something"
                v-model="inputValue"
                prefix="^"
                suffix="$"
                :maxlength="22"
                :minlength="10"
                clearable
            />
            <nl-textarea :value="textareaValue" placeholder="Input something" />
        </nl-div>
    </div>
</template>

<style scoped></style>
