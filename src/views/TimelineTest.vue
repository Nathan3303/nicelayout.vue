<template>
    <div class="timeline-test-wrapper">
        <nl-div width="100%" justify-content="space-between">
            <nl-div>
                <nl-button
                    shape="round-no-border"
                    icon="icon-arrow-left"
                    @clicked="() => timeline.moveLeft()"
                    :disabled="timeline?.controlState.onStart" />
                <nl-button
                    shape="round-no-border"
                    icon="icon-arrow-right"
                    @clicked="() => timeline.moveRight()"
                    :disabled="timeline?.controlState.onEnd" />
                <nl-button
                    shape="round-no-border"
                    icon="icon-dingwei"
                    @clicked="() => timeline.findPointer()"
                    :disabled="!timeline?.controlState.freeMode" />
            </nl-div>
            <nl-div>
                <nl-button shape="round-no-border" icon="icon-filter">过滤</nl-button>
                <nl-button shape="round-no-border" icon="icon-setting" />
            </nl-div>
        </nl-div>
        <div class="timeline-wrapper">
            <timeline ref="timeline" :lines="lines" :scale="4" show-pointer-text show-scroll-x-bar />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import component
 */
import NlDiv from "../components/NlDiv.vue";
import Timeline from "../components/Timeline.vue";
import NlButton from "../components/NlButton.vue";

/**
 * Define options
 */
defineOptions({ name: "TimelineTest" });

/**
 * Define refs
 */
const timeline = ref();
const lines = ref([
    {
        title: "MEETS",
        cards: [
            {
                name: "Project overview",
                dueTime: {
                    start: "9:30",
                    end: "10:30",
                },
                avatars: [{ src: "/images/users/nathan.png" }, { src: "/images/users/aleksander.png" }],
                backgroundColor: "#fef4ec",
            },
        ],
    },
    {
        title: "UX",
        cards: [
            {
                name: "Dashboard feedback",
                dueTime: {
                    start: "11:00",
                    end: "14:00",
                },
                avatars: [{ src: "/images/users/nathan.png" }, { src: "/images/users/aleksander.png" }],
                backgroundColor: "#f1f0ff",
            },
        ],
    },
    {
        title: "UI",
        cards: [],
    },
    {
        title: "BIZ",
        cards: [
            {
                name: "Project design",
                dueTime: {
                    start: "14:00",
                    end: "18:00",
                },
                avatars: [{ src: "/images/users/nathan.png" }, { src: "/images/users/aleksander.png" }],
                backgroundColor: "#ddf5fe",
            },
        ],
    },
    {
        title: "FOCUS",
        cards: [],
    },
]);
</script>

<style scoped>
.timeline-test-wrapper {
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;

    overflow: hidden;

    .timeline-wrapper {
        width: 100%;
        height: 100%;
    }
}
</style>
