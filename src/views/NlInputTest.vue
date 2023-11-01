<template>
    <div class="nl-input-test-wrapper">
        <h1>nl-input</h1>
        <div class="flex">
            <p>Shape</p>
            <nl-input v-model="inputValues.iv1" />
            <nl-input v-model="inputValues.iv2" shape="round" />
        </div>
        <div class="flex">
            <p>Icon & Placeholder</p>
            <nl-input v-model="inputValues.iv3" icon="icon-search" placeholder="Search" />
        </div>
        <div class="flex">
            <p>Show password</p>
            <nl-input
                v-model="inputValues.iv5"
                type="password"
                maxlength="16"
                allow-show-password
                placeholder="Your password (maxlength 16)" />
        </div>
        <div class="flex">
            <p>Prefix & Suffix</p>
            <nl-input v-model="inputValues.iv4" prefix="Http://" suffix="/" />
        </div>
        <div class="flex">
            <p>Disabled</p>
            <nl-input v-model="inputValues.iv6" disabled />
        </div>
        <div class="flex">
            <p>Readonly</p>
            <nl-input v-model="inputValues.iv7" readonly />
        </div>
        <div class="flex">
            <p>Clearable & Prefix</p>
            <nl-input v-model="inputValues.iv8" prefix="#" clearable />
        </div>
        <div class="flex">
            <p>WordCounter & Maxlength</p>
            <nl-input v-model="inputValues.iv9" counter="both" maxlength="32" placeholder="Input with word counter" />
        </div>
        <div class="flex">
            <p>Custom themes</p>
            <nl-input v-model="inputValues.iv0" :theme="['default', 'search']" icon="icon-search" placeholder="Search" />
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

/**
 * Import components
 */
import NlInput from "../components/input/src/input.vue";

/**
 * Define options
 */
defineOptions({ name: "NlInputTest" });

/**
 * Define reactives
 */
const inputValues = reactive({
    iv1: "shape=square",
    iv2: "shape=round",
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

    & .flex {
        display: flex;
        flex-direction: column;
        gap: 8px;

        & p {
            margin: 0;
        }
    }

    &:deep(.nl-input--search) {
        --border-color: #b3c9b6;

        --icon-size: 18px;
        --icon-color: #6d8b80;
        --icon-weight: bold;

        --focus-border-color: #b3c9b6;
        --focus-shadow-color: #b3c9b6;

        height: 42px;

        border-radius: 12px;
        border-width: 2px;

        font-size: 16px;
        color: #6d8b80;
        font-weight: bold;
    }
}
</style>
