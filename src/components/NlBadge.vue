<template>
    <div class="nl-badge" :class="NlBadgeClasses">
        <slot></slot>
        <sup v-if="!hidden && (content || dot)" v-text="content"></sup>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { isString } from "./utils";

/**
 * Define options
 */
defineOptions({ name: "NlBadge" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description badge theme
     */
    theme: {
        type: String,
        default: "default",
    },
    /**
     * @description badge value
     */
    value: {
        type: [String, Number],
        default: "",
    },
    /**
     * @description badge max value (Only effective when value is type of number)
     */
    max: {
        type: Number,
        default: 99,
    },
    /**
     * @description if is hide badge
     */
    hidden: Boolean,
    /**
     * @description display dot instead value
     */
    dot: Boolean,
});

/**
 * Calculate classes of the badge
 */
const NlBadgeClasses = computed(() => {
    let classArray = [];
    classArray.push("nl-badge--" + props.theme);
    if (props.dot) classArray.push("nl-badge--dot");
    return classArray;
});

/**
 * Calculate value of content
 */
const content = computed(() => {
    if (props.dot) return "";
    if (isString(props.value)) return props.value;
    if (props.value > props.max) return `${props.max}+`;
    return props.value;
});
</script>

<style scoped>
.nl-badge {
    --color: white;
    --font-size: 12px;
    --font-weight: normal;
    --font-family: "Consolas";

    transition: all 0.16s ease-in;
    user-select: none;
    -webkit-user-select: none;

    display: flex;
    align-items: center;
    justify-content: start;

    /* margin-top: 14px; */
    margin-right: 8px;
    position: relative;

    & > sup {
        user-select: none;

        display: flex;
        align-items: center;
        justify-content: center;

        scale: 0.9;
        padding: 2px 6px;
        position: absolute;
        right: -8px;
        top: -12px;

        background: #e96b36;
        border: 1px solid #e35011;
        border-radius: 8px;

        color: var(--color);
        font-size: var(--font-size);
        font-weight: var(--font-weight);
        font-family: var(--font-family);
    }
}

.nl-badge--dot {
    /* margin-top: 4px; */
    margin-right: 4px;

    & > sup {
        width: 8px;
        height: 8px;
        padding: 0px;
        right: -4px;
        top: -4px;
        scale: 1;

        border-radius: 8px;
        border: 2px solid white;
    }
}
</style>
