<template>
    <div id="app">
        <nl-div>
            <nl-button @clicked="increasePercentage">增加百分比</nl-button>
            <nl-button @clicked="decreasePercentage">减小百分比</nl-button>
        </nl-div>
        <nl-progress :percentage="percentage" />
        <nl-div>
            <nl-progress type="circle" :percentage="percentage" :scale="0.5" />
            <nl-progress type="circle" :percentage="percentage" />
            <nl-progress type="circle" :percentage="percentage" :scale="1.5" />
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
import NlButton from "./components/NlButton.vue";

/**
 * Define refs
 */
const percentage = ref(0);

// setInterval(() => (percentage.value = (percentage.value + 1) % 101), 240);

const increasePercentage = () => (percentage.value += 10);
const decreasePercentage = () => (percentage.value -= 10);
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
