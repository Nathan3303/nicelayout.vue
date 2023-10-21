<template>
    <div class="nl-progress-test-wrapper">
        <h1>nl-progress</h1>
        <nl-progress :percentage="percentage" />
        <nl-progress :percentage="percentage" stroke-width="12px" />
        <nl-progress :percentage="percentage" stroke-width="18px" show-inner-text />
        <div class="flex">
            <nl-progress :percentage="percentage" type="circle" />
            <nl-progress :percentage="percentage" type="circle" :scale="1.4" stroke-width="12px" />
            <nl-progress :percentage="percentage" type="circle" :scale="1.8" stroke-width="18px" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import components
 */
import NlProgress from "../components/NlProgress.vue";

/**
 * Define options
 */
defineOptions({ name: "NlProgressTest" });

/**
 * Define ref
 */
const percentage = ref(0);

setInterval(() => (percentage.value = (percentage.value + 1) % 101), 1000);
</script>

<style scoped>
.nl-progress-test-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-family: "Consolas";

    & > .flex {
        display: flex;
        gap: 12px;
    }
}
</style>
