<template>
    <div class="timeline" ref="timelineElement" :style="timelineStyles">
        <div class="timeline__scale-bar">
            <template v-for="num in 25">
                <span v-if="num === 1 || num === 25">|</span>
                <span v-else>{{ num - 1 }}:00</span>
                <span
                    v-if="num !== 25"
                    v-for="num0 in timeline.scaleLevel.value - 1">
                    {{ num - 1 }}:{{ (60 / timeline.scaleLevel.value) * num0 }}
                </span>
            </template>
            <div class="pointer">
                <span v-if="showPointerText">
                    &lt;&nbsp;{{ timeline.pointer.text }}
                </span>
            </div>
        </div>
        <div class="timeline__lines-container">
            <div class="line" v-for="(l, idx) in data" :key="idx">
                <div class="line__title">
                    <p>{{ l.title }}</p>
                </div>
                <div class="line__cards">
                    <Card
                        v-for="(c, idx) in l.cards"
                        :key="idx"
                        :data="c"
                        :left-calculator="timeline.calcLeftValueByTimeString" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { timelineProps, useTimeline } from "./timeline";
import { useScrollController } from "@nice-layout/hooks/use-scroll-controller";
import Card from "./card.vue";
import "../style/timeline.css";

defineOptions({ name: "NlTimeline" });
const props = defineProps(timelineProps);

const timeline = useTimeline(props.scale);
const scrollController = useScrollController();
const timelineElement = ref();
const timeString = ref(new Date().toLocaleTimeString());

const timelineStyles = computed(() => {
    return {
        "--width": timeline.width.value + "px",
        "--scale-bar-gap": timeline.timeScaleGap.value + "px",
        "--pointer-left": timeline.pointer.left + "px",
        "--line-wrapper-height":
            props.data.length * (timeline.lineHeight.value + 1) + "px",
        "--line-height": timeline.lineHeight.value + "px",
    };
});

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

defineExpose({
    findPointer: () => scrollController.moveTo(timeline.pointer.left),
    ...scrollController,
});
</script>
