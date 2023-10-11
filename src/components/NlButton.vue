<template>
    <button class="nl-button" :class="NlButtonClasses" @click="clickHandler">
        <i v-if="loading" class="iconfont icon-loading"></i>
        <i v-else-if="icon" class="iconfont" :class="icon"></i>
        <span v-if="$slots.default" class="nl-button__text">
            <slot></slot>
        </span>
    </button>
</template>

<script setup>
import { ref, computed } from "vue";
import { validateWidthAndHeight, validateShape } from "./validators";
import { parseWidthAndHeight } from "./parsers";
/**
 * Define options
 */
defineOptions({ name: "NlButton" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description Theme of button
     */
    theme: {
        type: String,
        default: "default",
    },
    /**
     * @description Shape of button
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => validateShape(v),
    },
    /**
     * @description button icon (Only iconfont)
     */
    icon: String,
    /**
     * @description button superior (Number flag)
     */
    superior: String,
    /**
     * @description button disable state
     */
    disabled: Boolean,
    /**
     * @description button loading state
     */
    loading: Boolean,
    /**
     * @description button width
     */
    width: {
        type: [String, Number],
        default: "auto",
        validator: (v) => validateWidthAndHeight(v),
    },
    /**
     * @description button height
     */
    height: {
        type: [String, Number],
        default: 36,
        validator: (v) => validateWidthAndHeight(v),
    },
});

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description Calling when button was clicked
     */
    "clicked",
    /**
     * @description Calling when button was changed
     */
    "changed",
]);

/**
 * Define refs
 */
const isLoading = ref(props.loading);
// console.log(widthStyle, heightStyle)

/**
 * nl-button clicking handle function
 * @param {object} e clicking event object
 */
function clickHandler(e) {
    isLoading.value = true;
    emit("clicked", e);
}

/**
 * Define computed
 */
const widthStyle = computed(() => parseWidthAndHeight(props.width));
const heightStyle = computed(() => parseWidthAndHeight(props.height));
const NlButtonClasses = computed(() => {
    let classArray = [];
    if (props.theme) classArray.push("nl-button--" + props.theme);
    if (props.shape) classArray.push("nl-button--" + props.shape);
    if (props.disabled) classArray.push("nl-button--disabled");
    return classArray;
});
</script>

<style scoped>
.nl-button {
    --font-color: #53516e;
    --background-color: transparent;
    --icon-color: #83819f;
    --actived-background-color: var(--header-active-color);
    --actived-icon-color: var(--primary-font-color);
    --superior-bg-color: #ff6d2f;
    --border-color: #b9b9b9;

    user-select: none;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: v-bind(widthStyle);
    height: v-bind(heightStyle);
    padding: 0 calc(v-bind(heightStyle) / 2.4);
    background-color: var(--background-color);
    flex: none;

    font-size: 13px;
    color: var(--font-color);

    & > i {
        color: var(--icon-color);
    }

    & > .icon-loading {
        -webkit-animation: rotation 1s ease-in-out infinite;
        animation: rotation 1s ease-in-out infinite;
    }

    & > .nl-button__text {
        font-family: "Consolas";
        font-weight: bold;
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.nl-button--square {
    border: 1px solid var(--border-color);
    border-radius: 6px;
}

.nl-button--circle {
    border: 1px solid var(--border-color);
    border-radius: v-bind(heightStyle);
}

.nl-button--no-border {
    border: none;
}

.nl-button--icon-only {
    aspect-ratio: 1;
    min-width: 32px;
    min-height: 32px;
    padding: 0;

    & > i {
        font-size: 22px;
        color: #618076;
    }
}

.nl-button--pure {
    padding: 0px;
    /* padding-right: 8px; */
    border: none;
    min-height: auto;
    height: auto;
}
</style>
