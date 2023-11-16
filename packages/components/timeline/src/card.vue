<template>
    <div v-if="data" :class="['card', simple && 'card--simple']" :title="title" :style="cardStyles">
        <nl-avatar-group class="card__avatar-group" :data="data.avatars" :size="36" />
        <div class="card__info">
            <h2>{{ data.name }}</h2>
            <p>{{ dueTimeString }}</p>
        </div>
        <nl-button icon="icon-checked" theme="icon-only" shape="round-no-border" />
    </div>
</template>

<script setup>
import { computed } from "vue";
import "../style/card.css";

defineOptions({ name: "timelineCard" });
const props = defineProps({
    /**
     * @description Card data
     */
    data: Object,
    /**
     * @description Simple state of card
     */
    simple: Boolean,
    /**
     * @description Card left value calculator
     */
    leftCalculator: Function,
});

const dueTime = computed(() => (props.data.dueTime.length === 1 ? ["00:00", ...props.data.dueTime] : props.data.dueTime));
const dueTimeString = computed(() => `${dueTime.value[0]} - ${dueTime.value[1]}`);
const title = computed(() => props.data.name + "," + dueTimeString.value);
const cardProperties = computed(() => [props.leftCalculator(dueTime.value[0]), props.leftCalculator(dueTime.value[1])]);
const cardWidth = computed(() => cardProperties.value[1] - cardProperties.value[0]);
const simple = computed(() => props.simple || cardWidth.value < 300);
const cardStyles = computed(() => {
    return {
        width: cardWidth.value + "px",
        left: cardProperties.value[0] + "px",
        backgroundColor: props.data.backgroundColor,
    };
});
</script>
