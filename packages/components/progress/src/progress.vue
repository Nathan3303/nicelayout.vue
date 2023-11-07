<template>
    <div class="nl-progress" :style="progressStyle">
        <template v-if="type === 'line'">
            <div class="nl-progress--line">
                <div class="nl-progress__outer-bar">
                    <div class="nl-progress__inner-bar" :style="{ width: percentage }">
                        <span v-if="showInnerText">{{ percentage }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="type === 'circle'">
            <svg class="nl-progress--circle" viewBox="0 0 100 100" :style="circleStyles">
                <circle class="nl-progress__outer-path" r="50" cx="50" cy="50"></circle>
                <circle class="nl-progress__inner-path" r="50" cx="50" cy="50"></circle>
            </svg>
        </template>
        <slot v-if="!showInnerText">
            <span class="nl-progress__text">{{ formatter(percentage) }}</span>
        </slot>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { progressProps, progressEmits } from "./progress";
import { addUnit } from "@nice-layout/utils/parsers";
import "../style/progress.css";

/**
 * Define options
 */
defineOptions({ name: "NlProgress" });
const props = defineProps(progressProps);
const emit = defineEmits(progressEmits);

/**
 * Parse props.percentage
 */
const percentage = computed(() => {
    if (props.percentage < 0) return "0%";
    if (props.percentage === 100) emit("full");
    if (props.percentage > 100) return "100%";
    return props.percentage + "%";
});

/**
 * Define styles
 */
const strokeWidth = computed(() => addUnit(props.strokeWidth / props.scale));
const progressStyle = computed(() => {
    return {
        "--stroke-width": strokeWidth.value,
        "--flex": props.type === "line" ? "auto" : "none",
    };
});
const strokeDashArray = computed(() => Math.ceil(2 * Math.PI * 50));
const circleStyles = computed(() => {
    return {
        "--circle-size": `${props.scale * 100}px`,
        "--stroke-dash-array": strokeDashArray.value,
        "--stroke-dash-offset": Math.ceil((1 - parseInt(percentage.value) / 100) * strokeDashArray.value),
    };
});
</script>
