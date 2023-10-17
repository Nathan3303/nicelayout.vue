<template>
    <div id="app">
        <nl-progress :percentage="percentage" />
        <nl-div>
            <nl-progress type="circle" :percentage="percentage" :scale="0.5" />
            <nl-progress type="circle" :percentage="percentage" />
            <nl-progress type="circle" :percentage="percentage" :scale="1.2" stroke-width="8px" />
        </nl-div>
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import components
 */
import NlDiv from "./components/NlDiv.vue";
import NlProgress from "./components/NlProgress.vue";

/**
 * Define refs
 */
const percentage = ref(0);

setInterval(() => (percentage.value = (percentage.value + 1) % 101), 240);
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &:deep(.nl-button--liked) {
        border-color: pink;
        background-color: pink;
    }

    &:deep(.nl-button--checked) {
        border-color: rgb(192, 242, 255);
        background-color: rgb(192, 242, 255);
    }
}
</style>
