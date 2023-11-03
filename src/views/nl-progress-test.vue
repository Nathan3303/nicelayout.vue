<template>
    <div class="nl-progress-test-wrapper">
        <h1>nl-progress</h1>
        <div class="flex">
            <p>Type=line(default)</p>
            <nl-progress :percentage="percentage" />
        </div>
        <div class="flex">
            <p>Type=line & stroke-width=12</p>
            <nl-progress :percentage="percentage" :stroke-width="12" />
        </div>
        <div class="flex">
            <p>Type=line & stroke-width=18 & show-inner-text</p>
            <nl-progress :percentage="percentage" :stroke-width="18" show-inner-text />
        </div>
        <div class="flex">
            <p>Type=circle</p>
            <nl-progress :percentage="percentage" type="circle" />
        </div>
        <div class="flex">
            <p>Type=circle & scale=0.6|1.4</p>
            <nl-progress :percentage="percentage" type="circle" :scale="0.6" />
            <nl-progress :percentage="percentage" type="circle" :scale="1.4" />
        </div>
        <div class="flex">
            <p>Type=circle & scale=1.4 & stroke-width=18</p>
            <nl-progress :percentage="percentage" type="circle" :scale="1.8" :stroke-width="18" />
        </div>
        <div class="flex">
            <p>Type=circle & emit:full</p>
            <nl-progress :percentage="percentage" type="circle" @full="() => console.log('full')" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import NlProgress from "../components/progress/src/progress.vue";

/**
 * Define options
 */
defineOptions({ name: "NlProgressTest" });

/**
 * Define ref
 */
const percentage = ref(0);
setInterval(() => (percentage.value = (percentage.value + 1) % 101), 100);
</script>

<style scoped>
.nl-progress-test-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-family: "Consolas";

    & > .flex {
        display: flex;
        align-items: center;
        gap: 12px;
    }
}
</style>
