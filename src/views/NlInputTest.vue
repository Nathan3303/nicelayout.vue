<template>
    <h3>nl-input</h3>
    <nl-input v-model="inputValues.iv1" />
    <nl-input v-model="inputValues.iv2" placeholder="Input something" />
    <nl-input v-model="inputValues.iv3" icon="icon-search" placeholder="Search" />
    <nl-input v-model="inputValues.iv4" prefix="Http://" suffix="/" />
    <nl-input
        v-model="inputValues.iv5"
        type="password"
        maxlength="16"
        show-password
        placeholder="Your password (maxlength 16)" />
    <nl-input v-model="inputValues.iv6" disabled />
    <nl-input v-model="inputValues.iv7" readonly />
    <nl-input v-model="inputValues.iv8" prefix="#" clearable placeholder="Input with clear button" />
    <nl-input v-model="inputValues.iv9" counter="word-limit" maxlength="32" placeholder="Input with word counter" />
    <nl-input v-model="inputValues.iv9" counter="both" maxlength="32" placeholder="Input with word counter" />
</template>

<script setup>
import { reactive } from "vue";

/**
 * Import components
 */
import NlInput from "../components/NlInput.vue";

/**
 * Define options
 */
defineOptions({ name: "NlInputTest" });

/**
 * Define reactives
 */
const inputValues = reactive({
    iv1: "",
    iv2: "",
    iv3: "",
    iv4: "",
    iv5: "",
    iv6: "Disabled input",
    iv7: "Readonly input",
    iv8: "",
    iv9: "",
});
</script>
.
