<template>
    <div v-if="card" class="card" :title="title" :style="cardStyles">
        <nl-avatar-group :data="card.avatars" />
        <div class="card__info">
            <h2>{{ card.name }}</h2>
            <p>{{ dueTimeString }}</p>
        </div>
        <nl-button icon="icon-checked" theme="icon-only" shape="round-no-border" />
    </div>
</template>

<script setup>
import { computed, inject } from "vue";
import NlAvatarGroup from "@/components/avatar/src/avatar-group.vue";
import NlButton from "@/components/button/src/button.vue";
import "../style/card.css";

const props = defineProps({ card: Object });
const timeline = inject("timeline");

/**
 * Define computed
 */
const dueTime = computed(() => {
    const { dueTime } = props.card;
    return dueTime.length === 1 ? ["00:00", ...dueTime] : dueTime;
});
const dueTimeString = computed(() => `${dueTime.value[0]} - ${dueTime.value[1]}`);
const title = computed(() => props.card.name + "," + dueTimeString.value);
const cardProperties = computed(() => {
    let leftStart, leftEnd;
    leftStart = timeline.calcLeftValueByTimeString(dueTime.value[0]);
    leftEnd = timeline.calcLeftValueByTimeString(dueTime.value[1]);
    // console.log(leftStart, leftEnd);
    return [leftStart, leftEnd];
});

/**
 * Define styles
 */
const cardStyles = computed(() => {
    return {
        width: cardProperties.value[1] - cardProperties.value[0] + "px",
        left: cardProperties.value[0] + "px",
        backgroundColor: props.card.backgroundColor,
    };
});
</script>
