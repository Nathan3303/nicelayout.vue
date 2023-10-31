<template>
    <div class="nl-div">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { validateWidthAndHeight } from "./validators";
import { parseWidthAndHeight } from "./parsers";

/**
 * Define options
 */
defineOptions({ name: "NlDiv" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description div direction
     */
    direction: {
        type: String,
        default: "horizontal",
        validator: (v) => ["horizontal", "vertical"].includes(v),
    },
    /**
     * @description Vertical state of the div
     */
    vertical: Boolean,
    /**
     * @description div flex attribute: align-items
     */
    alignItems: {
        type: String,
        default: "start",
    },
    /**
     * @description div flex attribute: justify-content
     */
    justifyContent: {
        type: String,
        default: "start",
    },
    /**
     * @description div flex attribute: flex
     */
    flex: {
        type: String,
        default: "none",
    },
    /**
     * @description div flex attribute: flex-wrap
     */
    flexWrap: {
        type: String,
        default: "no-wrap",
    },
    /**
     * @description div flex attribute: gap
     */
    gap: {
        type: Number,
        default: 8,
    },
    /**
     * @description div margin
     */
    margin: {
        type: [Number, String, Array],
        default: 0,
    },
    /**
     * @description div direction padding
     */
    directionPadding: {
        type: Number,
        default: 0,
    },
    /**
     * @description div width
     */
    width: {
        type: [String, Number],
        default: "auto",
        validator: (v) => validateWidthAndHeight(v),
    },
    /**
     * @description div height
     */
    height: {
        type: [String, Number],
        default: "auto",
        validator: (v) => validateWidthAndHeight(v),
    },
});

/**
 * Define computed
 */
const flexDirection = computed(() => (props.direction === "vertical" || props.vertical ? "column" : "row"));
const gap = computed(() => `${props.gap}px`);
const width = computed(() => parseWidthAndHeight(props.width));
const height = computed(() => parseWidthAndHeight(props.height));
const padding = computed(() => {
    const value = `${props.directionPadding}px`;
    let str = "";
    str += props.direction === "vertical" ? value : "0px";
    str += " ";
    str += props.direction === "horizontal" ? value : "0px";
    return str;
});
</script>

<style scoped>
.nl-div {
    display: flex;
    flex-direction: v-bind(flexDirection);
    align-items: v-bind(alignItems);
    justify-content: v-bind(justifyContent);
    flex-wrap: v-bind(flexWrap);
    gap: v-bind(gap);

    flex: v-bind(flex);
    width: v-bind(width);
    height: v-bind(height);
    padding: v-bind(padding);
}
</style>
