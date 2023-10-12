<template>
    <button class="nl-button" ref="button" :class="NlButtonClasses" @click="clickHandler" :disabled="disabled">
        <i v-if="loading" class="nl-button__loading-icon iconfont" :class="loadingIcon"></i>
        <i v-else-if="icon" class="iconfont" :class="icon"></i>
        <span v-if="$slots.default" class="nl-button__text">
            <slot></slot>
        </span>
    </button>
</template>

<script setup>
import { ref, computed, watch } from "vue";
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
    theme: String,
    /**
     * @description Shape of button
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => validateShape(v),
    },
    /**
     * @description button icon (Only iconfont so far)
     */
    icon: String,
    /**
     * @description button disable state
     */
    disabled: Boolean,
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
    /**
     * @description Button loading state
     */
    loading: Boolean,
    /**
     * @description Button loading icon (Only iconfont so far)
     */
    loadingIcon: {
        type: String,
        default: "icon-loading",
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
const button = ref();

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

/**
 * Button click event handler
 * @param {object} e click event object
 */
function clickHandler(e) {
    emit("clicked", e);
}

/**
 * Button change event handler
 */
function changeHandler() {
    emit("changed", button.value);
}

/**
 * Watch button loading state
 * @description When loading state was changed from true to false, call changeHandler
 */
watch(
    () => props.loading,
    (newValue, oldValue) => !newValue && newValue === !oldValue && changeHandler()
);
</script>

<style scoped>
.nl-button {
    --font-color: #555555;
    --background-color: transparent;
    --border-color: #b9b9b9;

    --hovered-background-color: #f3f3f3;

    transition: all 0.16s ease-in-out;

    display: flex;
    align-items: center;
    justify-content: start;
    gap: 6px;

    width: v-bind(widthStyle);
    height: v-bind(heightStyle);
    background-color: var(--background-color);
    flex: none;

    box-sizing: border-box;

    user-select: none;
    cursor: pointer;
    font-family: "Consolas";
    color: var(--font-color);

    &:hover {
        background-color: var(--hovered-background-color);
    }

    & > .nl-button__loading-icon {
        -webkit-animation: rotation 1.2s ease-in-out infinite;
        animation: rotation 1.2s ease-in-out infinite;
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
    padding: 0 calc(v-bind(heightStyle) / 4);
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

.nl-button--disabled {
    cursor: not-allowed;
    opacity: 0.8;
    color: #b9b9b9;
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
