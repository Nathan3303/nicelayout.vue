<template>
    <div class="nl-input-test">
        <div>
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
        <div>
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
                <nl-textarea v-model="textareaValues.tv9" autosize counter="both" maxlength="240" rows="3" />
            </div>
            <div class="flex">
                <p>Custom themes</p>
                <nl-textarea v-model="textareaValues.tv0" :theme="['default', 'custom']" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

/**
 * Define reactives
 */
const inputValues = reactive({
    iv1: "square",
    iv2: "round",
    iv3: "",
    iv4: "www.baidu.com",
    iv5: "123456",
    iv6: "Disabled input",
    iv7: "Readonly input",
    iv8: "Clearable",
    iv9: "Counter:both",
    iv0: "",
});
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
.nl-input-test {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 24px;

    & > h1 {
        grid-column: 1 / 3;
    }

    font-family: "Consolas";

    & .flex {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 8px;

        margin: 6px 0;

        & p {
            margin: 0;
        }
    }

    &:deep(.nl-input),
    &:deep(.nl-textarea) {
        width: 100%;
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

    &:deep(.nl-textarea--custom) {
        --border-color: #b3c9b6;

        --hover-border-color: #b3c9b6;

        --focus-border-color: #b3c9b6;
        --focus-shadow-color: #b3c9b6;

        font-size: 16px;
        color: #6d8b80;
        font-weight: bold;
    }
}
</style>
