<template>
    <div class="timeline-test-wrapper">
        <nl-div width="100%" justify-content="space-between">
            <nl-div>
                <nl-button shape="round-no-border" icon="icon-arrow-left" @click="() => timeline.moveLeft()" />
                <nl-button shape="round-no-border" icon="icon-arrow-right" @click="() => timeline.moveRight()" />
                <nl-button shape="round-no-border" icon="icon-dingwei" @click="() => timeline.findPointer()" />
            </nl-div>
            <nl-div>
                <nl-button shape="round-no-border" icon="icon-filter">过滤</nl-button>
                <nl-button shape="round-no-border" icon="icon-setting" />
            </nl-div>
        </nl-div>
        <div class="timeline-wrapper">
            <nl-timeline ref="timeline" :lines="lines" show-pointer-text show-scroll-x-bar />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

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
                dueTime: ["9:30", "10:00"],
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
                dueTime: ["11:00", "14:00"],
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
                dueTime: ["14:00", "18:00"],
                avatars: [{ src: "/images/users/nathan.png" }, { src: "/images/users/aleksander.png" }],
                backgroundColor: "#ddf5fe",
            },
        ],
    },
    {
        title: "FOCUS",
        cards: [
            {
                name: "Project design",
                dueTime: ["21:00"],
                avatars: [{ src: "/images/users/nathan.png" }, { src: "/images/users/aleksander.png" }],
                backgroundColor: "#dde7ee",
            },
        ],
    },
]);
</script>

<style scoped>
.timeline-test-wrapper {
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 24px;

    overflow: hidden;
}
</style>
