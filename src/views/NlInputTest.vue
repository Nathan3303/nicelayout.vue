<template>
    <div class="nl-input-test-wrapper">
        <h1>nl-input</h1>
        <!-- <nl-input v-model="inputValues.iv1" /> -->
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
        <nl-input v-model="inputValues.iv9" counter="both" maxlength="32" placeholder="Input with word counter" />
        <nl-input v-model="inputValues.iv0" :theme="['default', 'search']" icon="icon-search" placeholder="Search" />
    </div>
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
    iv1: "123",
    iv2: "",
    iv3: "",
    iv4: "www.baidu.com",
    iv5: "123456",
    iv6: "Disabled input",
    iv7: "Readonly input",
    iv8: "Clearable",
    iv9: "Counter:both",
    iv0: "",
});
</script>

<style scoped>
.nl-input-test-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-family: "Consolas";

    &:deep(.nl-input--search) {
        --border-color: #b3c9b6;

        --icon-size: 18px;
        --icon-color: #6d8b80;
        --icon-weight: bold;

        --focused-border-color: #b3c9b6;
        --focused-shadow-color: #b3c9b6;

        height: 42px;

        border-radius: 12px;
        border-width: 2px;

        font-size: 16px;
        color: #6d8b80;
        font-weight: bold;
    }
}
</style>
