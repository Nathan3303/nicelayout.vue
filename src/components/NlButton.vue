<template>
    <button class="nl-button" :class="NlButtonClasses" @click="clickHandler" :disabled="disabled">
        <i v-if="loading" class="nl-button__loading-icon iconfont" :class="loadingIcon"></i>
        <i v-else-if="icon" class="iconfont" :class="icon"></i>
        <span v-if="$slots.default" class="nl-button__text">
            <slot></slot>
        </span>
    </button>
</template>

<script setup>
import { computed, watch } from "vue";
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
     * @description Button icon (Only iconfont was supported so far)
     */
    icon: String,
    /**
     * @description Button disable state
     */
    disabled: Boolean,
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
    /**
     * @description Button width
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
 * Define computed
 */
const width = computed(() => parseWidthAndHeight(props.width));
const height = computed(() => parseWidthAndHeight(props.height));
const NlButtonClasses = computed(() => {
    let classArray = [...parseTheme(props.theme, "nl-button")];
    classArray.push(`nl-button--${props.shape}`);
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
    emit("changed");
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
    --border-color: #b9b9b9;
    --background-color: transparent;

    --font-size: 12px;
    --font-color: inherit;
    --font-family: "Consolas";
    --font-weight: normal;

    --icon-color: var(--font-color);
    --icon-size: inherit;
    --icon-weight: normal;

    --hover-background-color: rgb(243, 243, 243);
    --active-background-color: rgba(243, 243, 243, 0.36);

    transition: all 0.24s ease-out;
    user-select: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    flex: none;
    box-sizing: border-box;
    width: v-bind(width);
    height: v-bind(height);
    padding: 0 calc(v-bind(height) / 3 - 1px);

    border: 1px solid var(--border-color);
    background-color: var(--background-color);

    color: var(--font-color);
    font-size: var(--font-size);
    font-family: var(--font-family);

    &:deep(*) {
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
    }

    & > .iconfont {
        color: var(--icon-color);
        font-size: var(--icon-size);
        font-weight: var(--icon-weight);
    }

    &:hover {
        background-color: var(--hover-background-color);
    }

    &:active {
        background-color: var(--active-background-color);
    }

    & > .nl-button__loading-icon {
        -webkit-animation: 1.2s ease-in-out 0.16s infinite rotation;
        animation: 1.2s ease-in-out 0.16s infinite rotation;
    }

    &.nl-button--square {
        border-radius: 6px;
    }

    &.nl-button--round {
        border-radius: v-bind(height);
    }

    &.nl-button--no-border {
        border: none;
        border-radius: 6px;
    }

    &.nl-button--round-no-border {
        border: none;
        border-radius: v-bind(height);
    }

    &.nl-button--disabled {
        --font-color: #8e8e8e;
        --background-color: var(--hover-background-color);
        cursor: not-allowed;
        opacity: 0.78;

        &:active {
            background-color: var(--hover-background-color);
        }
    }
}

/* Built-in themes */

.nl-button--icon-only {
    --icon-size: 24px;

    aspect-ratio: 1;
    padding: 0;

    & > .nl-button__text {
        display: none;
    }
}

.nl-button--text {
    width: auto;
    height: auto;
    padding: 4px 10px;
    border: none;

    &.nl-button--no-shape {
        padding: 0;
        border-radius: none;
        line-height: none;
        /* background-color: transparent; */
    }
}
</style>
