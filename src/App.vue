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
        <nl-div direction="vertical" :gap="24">
            <nl-input
                type="text"
                width="100%"
                icon="icon-search"
                placeholder="xxx.xxx.xxx"
                v-model="inputValue"
                prefix="Http://"
                suffix="/"
                :maxlength="22"
                :minlength="10"
                clearable
                show-password
            />
            <nl-textarea :value="textareaValue" placeholder="Input something" />
        </nl-div>
    </div>
</template>

<style scoped></style>
