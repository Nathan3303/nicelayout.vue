<template>
    <div class="timeline" ref="timelineElement" :style="timeScaleStyles">
        <div class="timeline__scale-bar">
            <template v-for="num in 25">
                <span v-if="num === 1 || num === 25">|</span>
                <span v-else>{{ num - 1 }}:00</span>
                <span v-if="num !== 25" v-for="num0 in timeline.scaleLevel.value - 1">
                    {{ num - 1 }}:{{ (60 / timeline.scaleLevel.value) * num0 }}
                </span>
            </template>
            <div class="pointer">
                <span v-if="showPointerText"> &lt;&nbsp;{{ timeline.pointer.text }} </span>
            </div>
        </div>
        <div class="timeline__lines-container">
            <Line v-for="(item, idx) in lines" :key="idx" :lines="item" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, provide } from "vue";
import { timelineProps, useTimeline } from "./timeline";
import { useScrollController } from "./scroll-controller";
import Line from "./line.vue";
import "../style/timeline.css";

defineOptions({ name: "NlTimeline" });
const props = defineProps(timelineProps);

/**
 * Use hooks
 */
const timeline = useTimeline(props.scale);
const scrollController = useScrollController();
console.log(timeline);

/**
 * Define refs
 */
const timelineElement = ref();
const timeString = ref(new Date().toLocaleTimeString());

/**
 * Expose and provide
 */
provide("timeline", timeline);
defineExpose({
    findPointer: () => scrollController.moveTo(timeline.pointer.left),
    moveRight: scrollController.moveRight,
    moveLeft: scrollController.moveLeft,
});

/**
 * Define styles
 */
const timeScaleStyles = computed(() => {
    return {
        "--width": timeline.width.value + "px",
        "--scale-bar-gap": timeline.timeScaleGap.value + "px",
        "--scale-bar-pointer-left": timeline.pointer.left + "px",
        "--scale-bar-pointer-height": props.lines.length * 71 + "px",
    };
});

/**
 * On-mounted handler
 */
onMounted(() => {
    /**
     * Update element of scroll controller
     */
    scrollController.setTarget(timelineElement.value);
    timeline.updatePointerLeft(timeString.value);
    scrollController.moveTo(timeline.pointer.left);
    /**
     * Update pointer left (when pointer truly need to move)
     */
    setInterval(() => {
        timeline.updatePointerLeft(timeString.value);
        scrollController.moveTo(timeline.pointer.left);
    }, timeline.updateTime.value);
    /**
     * Update time string and pointer text (each second)
     */
    setInterval(() => {
        timeString.value = new Date().toLocaleTimeString();
        timeline.pointer.text = timeString.value;
    }, 1000);
});
</script>
