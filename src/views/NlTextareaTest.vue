<template>
    <div class="nl-textarea-test-wrapper">
        <h1>nl-textarea</h1>
        <div class="flex">
            <p>Placeholder</p>
            <nl-textarea v-model="textareaValues.tv2" placeholder="Input something" />
        </div>
        <div class="flex">
            <p>Rows(min-height)</p>
            <nl-textarea v-model="textareaValues.tv3" rows="4" />
        </div>
        <div class="flex">
            <p>Disabled</p>
            <nl-textarea v-model="textareaValues.tv4" disabled />
        </div>
        <div class="flex">
            <p>Readonly</p>
            <nl-textarea v-model="textareaValues.tv5" readonly />
        </div>
        <div class="flex">
            <p>Resize(resize:vertical)</p>
            <nl-textarea v-model="textareaValues.tv6" resize />
        </div>
        <div class="flex">
            <p>Autosize & rows(min-height)</p>
            <nl-textarea v-model="textareaValues.tv8" autosize rows="2" />
        </div>
        <div class="flex">
            <p>WordCounter & Maxlength & Autosize</p>
            <nl-textarea v-model="textareaValues.tv9" autosize counter="both" maxlength="240" />
        </div>
        <div class="flex">
            <p>Custom themes</p>
            <nl-textarea v-model="textareaValues.tv0" :theme="['default', 'custom']" />
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

/**
 * Import components
 */
import NlTextarea from "../components/input/src/textarea.vue";

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
    tv8: "autosize, rows=2",
    tv9: "autosize, counter=both, maxlength=240",
    tv0: "",
});
</script>

<style scoped>
.nl-textarea-test-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-family: "Consolas";

    & .flex {
        display: flex;
        flex-direction: column;
        gap: 8px;

        & p {
            margin: 0;
        }
    }

    &:deep(.nl-textarea--custom) {
        --border-color: #b3c9b6;

        --hover-border-color: #b3c9b6;

        --focus-border-color: #b3c9b6;
        --focus-shadow-color: #b3c9b6;

        /* padding-left: 12px; */
        /* padding-right: 12px; */
        /* border-radius: 12px; */
        /* border-width: 2px; */

        font-size: 16px;
        color: #6d8b80;
        font-weight: bold;
    }
}
</style>
