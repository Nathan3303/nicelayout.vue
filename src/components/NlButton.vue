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
import { parseWidthAndHeight, parseTheme } from "./parsers";

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
        type: [Array, String],
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
    /**
     * @description Button background color
     */
    backgroundColor: {
        type: String,
        default: "transparent",
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
    classArray = [...parseTheme(props.theme, "nl-button")];
    classArray.push("nl-button--" + props.shape);
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
@-webkit-keyframes rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.nl-button {
    --font-color: #555555;
    --background-color: transparent;
    --border-color: #b9b9b9;

    --hover-background-color: #f3f3f3;
    --active-background-color: #f3f3f3aa;

    display: flex;
    align-items: center;
    justify-content: start;
    gap: 6px;

    box-sizing: border-box;
    width: v-bind(widthStyle);
    height: v-bind(heightStyle);
    padding: 0 calc(v-bind(heightStyle) / 4);
    flex: none;

    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--background-color);

    color: var(--font-color);
    font-family: "Consolas";
    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: var(--hover-background-color);
    }

    &:active {
        background-color: var(--active-background-color);
        filter: brightness(0.96);
    }

    & > .nl-button__loading-icon {
        -webkit-animation: 1.2s ease-in-out 0.16s infinite rotation;
        animation: 1.2s ease-in-out 0.16s infinite rotation;
    }

    &.nl-button--no-border {
        border: none;
    }

    &.nl-button--disabled {
        cursor: not-allowed;
        opacity: 0.8;
        color: #b9b9b9;
        background-color: var(--hover-background-color);
    }
}

.nl-button--default {
    &.nl-button--round {
        padding: 0 calc(v-bind(heightStyle) / 3);
        border-radius: v-bind(heightStyle);
    }
}

.nl-button--icon-only {
    justify-content: center;

    aspect-ratio: 1;
    padding: 0;

    & > .nl-button__text {
        display: none;
    }

    &.nl-button--round {
        border-radius: 50%;
    }
}
</style>
