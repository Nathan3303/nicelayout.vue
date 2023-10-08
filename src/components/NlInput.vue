<template>
    <div class="nl-input" :class="NlInputClasses" @click="wrapperClickHandler">
        <i v-if="icon" class="nl-input__icon iconfont" :class="icon"></i>
        <slot v-else name="icon"></slot>
        <slot name="prefix">{{ prefix }}</slot>
        <input
            ref="input"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :name="name"
            :maxlength="maxlength"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :readonly="!disabled && readonly"
            @input="inputHandler"
            @focus="focusHandler"
            @blur="blurHandler"
            @change="changeHandler" />
        <slot name="suffix">{{ suffix }}</slot>
        <div class="nl-input__button-group">
            <i class="nl-input__button iconfont icon-clear2" v-show="clearable && modelValue" @click.stop="clearHandler"></i>
            <i
                class="nl-input__button iconfont icon-eye"
                v-show="type === 'password' && showPassword && modelValue"
                @click.stop="showPasswordHandler"></i>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, computed } from "vue";
import { validateShape, validateWidthAndHeight } from "./validators";
import { parseWidthAndHeight } from "./parsers";

/**
 * Define options
 */
defineOptions({ name: "NlInput" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description input id
     */
    id: String,
    /**
     * @description input type
     */
    type: {
        type: String,
        default: "text",
        validator: (v) => ["text", "password", "file", "number"].includes(v),
    },
    /**
     * @description input value (v-model)
     */
    modelValue: {
        type: [String, Number],
        default: "",
    },
    /**
     * @description input format function
     */
    formatter: {
        type: Function,
        default: (value) => value,
    },
    /**
     * @description input theme
     */
    theme: {
        type: String,
        default: "default",
    },
    /**
     * @description input shape
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => validateShape(v),
    },
    /**
     * @description input icon (Only iconfont class so far)
     */
    icon: String,
    /**
     * @description input prefix text ($___)
     */
    prefix: String,
    /**
     * @description input suffix text (___$)
     */
    suffix: String,
    /**
     * @description input placeholder
     */
    placeholder: String,
    /**
     * @description input maxlength
     */
    maxlength: Number,
    /**
     * @description input name
     */
    name: String,
    /**
     * @description input autocomplete
     */
    autocomplete: {
        type: String,
        default: "off",
    },
    /**
     * @description input disabled state
     */
    disabled: Boolean,
    /**
     * @description input readonly state
     */
    readonly: Boolean,
    /**
     * @description input clearable state
     */
    clearable: Boolean,
    /**
     * @description show password button state (Effective when input type is password)
     */
    showPassword: Boolean,
    /**
     * @description input width
     */
    width: {
        type: String,
        default: "auto",
        validator: (v) => validateWidthAndHeight(v),
    },
    /**
     * @description input height
     */
    height: {
        type: String,
        default: "36px",
        validator: (v) => validateWidthAndHeight(v),
    },
});

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description when update modelValue
     */
    "update:modelValue",
    /**
     * @description when focused
     */
    "onFocused",
    /**
     * @description when blured
     */
    "onBlured",
    /**
     * @description when value changed
     */
    "onChanged",
]);

/**
 * Define refs
 */
const input = ref();
const isFocused = ref(false); // Focus flag
const widthStyle = ref(parseWidthAndHeight(props.width));
const heightStyle = ref(parseWidthAndHeight(props.height));
// console.log(input)

/**
 * Calculate nl-input classes
 */
const NlInputClasses = computed(() => {
    let classArray = [];
    if (props.theme) classArray.push("nl-input--" + props.theme);
    if (props.shape) classArray.push("nl-input--" + props.shape);
    if (props.disabled) classArray.push("nl-input--disabled");
    if (isFocused.value && !props.disabled) classArray.push("nl-input--focused");
    return classArray;
});

/**
 * nl-input input handle function
 * @param {object} e input event object
 */
function inputHandler(e) {
    emit("update:modelValue", props.formatter(e.target.value));
}

/**
 * nl-input focus handle function
 * @param {object} e focus event object
 */
function focusHandler(e) {
    isFocused.value = !props.readonly && true;
    emit("onFocused", e);
}

/**
 * nl-input blur handle function
 * @param {object} e blur event object
 */
function blurHandler(e) {
    isFocused.value = false;
    emit("onBlured", e);
}

/**
 * nl-input change handle function
 * @param {object} e change event object
 */
function changeHandler(e) {
    emit("onChanged", e);
}

/**
 * Handle nl-input clear event
 */
function clearHandler() {
    input.value.value = "";
    emit("update:modelValue", "");
    nextTick(() => input.value.focus());
}

/**
 * Handle nl-input show password event
 */
function showPasswordHandler() {
    const isShowed = input.value.type === "text";
    input.value.type = isShowed ? "password" : "text";
}

/**
 * Wrapper click handler
 * @description When wrapper div was clicked, make inner input element on focus
 * @param {object} e The click event object
 */
function wrapperClickHandler() {
    if (!isFocused.value) input.value.focus();
}
</script>

<style scoped>
.nl-input {
    --background-color: transparent;
    --border-color: #cccccc;

    --focused-background-color: transparent;
    --focused-border-color: #6d94dd;
    --focused-shadow-color: #6d94dd;

    --disabled-background-color: #f0f0f0;

    --button-size: 22px;
    --button-color: #8d8d8d;
    --button-border-color: #cccccc;

    --hovered-button-color: #ff2727b3;
    --hovered-button-border-color: #ff2727b3;

    transition: all 0.16s ease;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: start;
    gap: 8px;

    position: relative;

    user-select: none;
    overflow: hidden;

    & > input {
        min-width: 24px;
        height: 100%;
        flex: 1 1 auto;
        outline: none;

        &::-ms-reveal {
            display: none;
        }

        &::-ms-clear {
            display: none;
        }
    }

    & > .nl-input__button-group {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 4px;

        & > .nl-input__button {
            transition: all 0.16s ease;
            box-sizing: border-box;

            scale: 0.78;
            min-width: var(--button-size);
            height: var(--button-size);
            line-height: calc(var(--button-size) - 1px);

            border-radius: var(--button-size);
            font-size: 13px;
            text-align: center;
            cursor: pointer;
        }
    }
}

.nl-input--default {
    min-width: 96px;
    width: v-bind(widthStyle);
    height: v-bind(heightStyle);
    line-height: v-bind(heightStyle);
    padding: 6px 8px;

    border: 1px solid var(--border-color);
    background: var(--background-color);

    font-size: 16px;
    font-family: "Consolas";

    & > input {
        padding: 0;
        border: none;
        background: none;
        font-size: inherit;
        font-family: inherit;
    }

    & .nl-input__button {
        border: 1px solid var(--button-border-color);
        color: var(--button-color);

        &:hover {
            color: var(--hovered-button-color);
            border-color: var(--hovered-button-border-color);
        }
    }
}

.nl-input--square {
    border-radius: 6px;
}

.nl-input--circle {
    padding: 0 calc(v-bind(heightStyle) / 3);
    border-radius: v-bind(heightStyle);
}

.nl-input--focused {
    background-color: var(--focused-background-color);
    border: 1px solid var(--focused-border-color);
    box-shadow: 0 0 4px 1px var(--focused-shadow-color);
}

.nl-input--disabled {
    background-color: var(--disabled-background-color);

    cursor: not-allowed;

    &:deep(*) {
        color: #969696;
        cursor: not-allowed;
    }
}
</style>
