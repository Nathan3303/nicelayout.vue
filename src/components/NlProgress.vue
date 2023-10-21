<template>
    <div class="nl-progress">
        <template v-if="type === 'line'">
            <div class="nl-progress--line">
                <div class="nl-progress__outer-bar">
                    <div class="nl-progress__inner-bar">
                        <span v-if="showInnerText">{{ percentage }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="type === 'circle'">
            <svg class="nl-progress--circle" viewBox="0 0 100 100">
                <defs>
                    <radialGradient id="barGradient" cx="0.5" cy="0.5" r="1" fx="0.6" fy="0">
                        <stop offset="0%" stop-color="rgb(122, 221, 122)" />
                        <stop offset="30%" stop-color="rgb(122, 221, 122)" />
                        <stop offset="100%" stop-color="blue" />
                    </radialGradient>
                </defs>
                <circle class="nl-progress__outer-path" :r="radius" cx="50" cy="50"></circle>
                <circle class="nl-progress__inner-path" :r="radius" cx="50" cy="50"></circle>
            </svg>
        </template>
        <slot v-if="!showInnerText">
            <span class="nl-progress__text">{{ formatter(percentage) }}</span>
        </slot>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { validateWidthAndHeight } from "./validators";
import { parseWidthAndHeight } from "./parsers";

/**
 * Define options
 */
defineOptions({ name: "NlProgressBar" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description Type of progress bar
     */
    type: {
        type: String,
        default: "line",
        validator: (v) => ["line", "circle", "dashboard"].includes(v),
    },
    /**
     * @description Percentage of progress
     */
    percentage: {
        type: Number,
        default: 0,
        validator: (v) => v >= 0 && v <= 100,
    },
    /**
     * @description Color of inner bar
     */
    color: {
        type: [Array, String],
    },
    /**
     * @description Progress bar width
     */
    strokeWidth: {
        type: [String, Number],
        default: "6px",
        validator: (v) => validateWidthAndHeight(v),
    },
    /**
     * @description Progress text formatter
     */
    formatter: {
        type: Function,
        default: (value) => value,
    },
    /**
     * @description Inner text display state
     */
    showInnerText: Boolean,
    /**
     * @description SVG size scale (Effective when props.type is circle or dashboard)
     */
    scale: {
        type: Number,
        default: 1,
        validator: (v) => v >= 0.3,
    },
});

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description Call when percentage changed
     */
    "changed",
    /**
     * @description Call when progress was hundred percent
     */
    "fulled",
]);

/**
 * Define computed
 */
const percentage = computed(() => {
    if (props.percentage < 0) return "0%";
    if (props.percentage > 100) return "100%";
    return props.percentage + "%";
});
const size = computed(() => `${props.scale * 100}px`);
const radius = computed(() => 50 - parseInt(props.strokeWidth));
const strokeWidth = computed(() => parseWidthAndHeight(parseInt(props.strokeWidth) / props.scale));
const strokeDashArray = computed(() => Math.ceil(2 * Math.PI * radius.value));
const strokeDashOffset = computed(() => Math.ceil((1 - parseInt(percentage.value) / 100) * strokeDashArray.value));
const innerTextLeft = computed(() => (props.percentage <= 3 ? `calc(${strokeWidth.value} / 2)` : "none"));
</script>

<style scoped>
.nl-progress {
    display: flex;
    align-items: center;
    justify-content: start;
    /* gap: 6px; */

    position: relative;

    & > .nl-progress__text {
        user-select: none;
    }

    & > .nl-progress--line {
        flex: auto;

        & > .nl-progress__outer-bar {
            flex: auto;

            background: #f1f1f1;
            border-radius: v-bind(strokeWidth);
            overflow: hidden;

            & > .nl-progress__inner-bar {
                display: flex;
                align-items: center;

                flex: auto;
                width: v-bind(percentage);
                height: v-bind(strokeWidth);
                position: relative;

                background: linear-gradient(to right, blue, 30%, rgb(122, 221, 122));
                border-radius: v-bind(strokeWidth);

                transition: width 0.24s linear;

                & > span {
                    position: absolute;
                    left: v-bind(innerTextLeft);
                    right: calc(v-bind(strokeWidth) / 2);
                    color: white;
                    font-size: calc(v-bind(strokeWidth) - 3px);
                }
            }
        }

        & + .nl-progress__text {
            text-align: center;
            min-width: 48px;
        }
    }

    & > .nl-progress--circle {
        width: v-bind(size);
        height: v-bind(size);

        & > circle {
            stroke-width: v-bind(strokeWidth);
            fill: transparent;
            transform-origin: center;
            transform: rotate(-90deg);
            transition: stroke-dashoffset 0.24s linear;
        }

        & > .nl-progress__outer-path {
            stroke: #f3f3f3;
        }

        & > .nl-progress__inner-path {
            stroke: url(#barGradient);
            stroke-dasharray: v-bind(strokeDashArray);
            stroke-dashoffset: v-bind(strokeDashOffset);
            stroke-linecap: round;
        }

        & + .nl-progress__text {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 1px;
            height: 1px;
            position: absolute;
            top: 50%;
            left: 50%;
        }
    }
}
</style>
