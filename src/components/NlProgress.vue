<template>
    <div class="nl-progress">
        <div v-if="type === 'line'" class="nl-progress--line">
            <div class="nl-progress__outer-bar">
                <div class="nl-progress__inner-bar">
                    <span v-if="showInnerText">{{ percentage }}</span>
                </div>
            </div>
        </div>
        <svg v-else-if="type === 'circle'" class="nl-progress--circle" viewBox="0 0 100 100">
            <defs>
                <radialGradient id="barGradient" cx="0.5" cy="0.5" r="1" fx="0.5" fy="0">
                    <stop offset="0%" stop-color="rgb(122, 221, 122)" />
                    <stop offset="30%" stop-color="rgb(122, 221, 122)" />
                    <stop offset="100%" stop-color="blue" />
                </radialGradient>
            </defs>
            <circle class="nl-progress__outer-path" r="50" cx="50" cy="50"></circle>
            <circle class="nl-progress__inner-path" r="50" cx="50" cy="50"></circle>
        </svg>
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
});

/**
 * Define computed
 */
const percentage = computed(() => props.percentage + "%");
const strokeWidth = computed(() => parseWidthAndHeight(props.strokeWidth));
const strokeDashOffset = computed(() => (1 - props.percentage / 100) * 314);
const innerTextLeft = computed(() => (props.percentage <= 3 ? `calc(${strokeWidth.value} / 2)` : "none"));
</script>

<style scoped>
.nl-progress {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 6px;

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
                    font-size: calc(v-bind(strokeWidth) / 2);
                }
            }
        }
    }

    & > .nl-progress--circle {
        width: 200px;
        height: 200px;

        & > circle {
            stroke-width: calc(v-bind(strokeWidth) / 2);
            fill: transparent;
            transform-origin: center;
            transform: scale(0.9) rotate(-90deg);
            transition: stroke-dashoffset 0.24s linear;
        }

        & > .nl-progress__outer-path {
            stroke: #f3f3f3;
        }

        & > .nl-progress__inner-path {
            /* fill: url(#barGradient); */
            stroke: url(#barGradient);
            stroke-dasharray: 314;
            stroke-dashoffset: v-bind(strokeDashOffset);
            stroke-linecap: round;
        }
    }
}
</style>
