<template>
    <nl-div style="margin-bottom: 16px">
        <nl-button
            shape="round"
            icon="icon-arrow-left"
            @click="() => timeline.moveLeft()"
            :disabled="timeline?.onStart"></nl-button>
        <nl-button
            shape="round"
            icon="icon-arrow-right"
            @click="() => timeline.moveRight()"
            :disabled="timeline?.onEnd"></nl-button>
        <nl-button
            shape="round"
            icon="icon-dingwei"
            @click="() => timeline.findPointer()"
            :disabled="!timeline?.freeMode"></nl-button>
    </nl-div>
    <nl-timeline ref="timeline" :data="timelineData" show-pointer-text />
</template>

<script setup>
import { onMounted, ref } from "vue";
import timelineData from "../data/activities";

const timeline = ref();

onMounted(() => {
    console.log(timeline.value);
});
</script>

<style scoped></style>
