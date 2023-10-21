<template>
    <div class="nl-textarea-test-wrapper">
        <h1>nl-textarea</h1>
        <nl-textarea v-model="textareaValues.tv1" />
        <nl-textarea v-model="textareaValues.tv2" placeholder="Input something" />
        <nl-textarea v-model="textareaValues.tv3" rows="4" />
        <nl-textarea v-model="textareaValues.tv4" disabled />
        <nl-textarea v-model="textareaValues.tv5" readonly />
        <nl-textarea v-model="textareaValues.tv6" resize />
        <nl-textarea v-model="textareaValues.tv7" autosize />
        <nl-textarea v-model="textareaValues.tv8" rows="2" autosize />
        <nl-textarea v-model="textareaValues.tv9" autosize counter="both" maxlength="240" />
        <nl-textarea v-model="textareaValues.tv0" :theme="['default', 'custom']" />
    </div>
</template>

<script setup>
import { reactive } from "vue";

/**
 * Import components
 */
import NlTextarea from "../components/NlTextarea.vue";

/**
 * Define options
 */
defineOptions({ name: "NlTextareaTest" });

/**
 * Define reactives
 */
const textareaValues = reactive({
    tv1: "123456",
    tv2: "",
    tv3: "rows=4",
    tv4: "disabled",
    tv5: "readonly",
    tv6: "resize",
    tv7: "autosize",
    tv8: "rows=2, autosize",
    tv9: "autosize, counter=both, maxlength=240",
    tv0: "theme=[default, custom]",
});
</script>

<style scoped>
.nl-textarea-test-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-family: "Consolas";

    &:deep(.nl-textarea--custom) {
        --border-color: #b3c9b6;

        --focused-border-color: #b3c9b6;
        --focused-shadow-color: #b3c9b6;

        border-radius: 12px;
        border-width: 2px;

        font-size: 16px;
        color: #6d8b80;
        font-weight: bold;
    }
}
</style>
