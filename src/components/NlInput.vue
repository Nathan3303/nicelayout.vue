<template>
    <div class="nl-input" :class="NlInputClasses">
        <i v-if="icon" class="nl-input__icon iconfont" :class="icon"></i>
        <slot name="prefix">{{ prefix }}</slot>
        <input
            ref="input"
            :type="type"
            :value="formatter(modelValue)"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :readonly="!disabled && readonly"
            @focus="focusHandler"
            @blur="blurHandler"
            @input="inputHandler"
            @change="changeHandler"
            @keydown.enter="() => input.blur()" />
        <slot name="suffix">{{ suffix }}</slot>
        <div class="nl-input__button-group">
            <i
                class="iconfont icon-clear2"
                v-if="type !== 'file' && clearable"
                v-show="modelValue"
                @click.stop="clearHandler"></i>
            <i
                class="iconfont icon-eye"
                v-if="type === 'password' && showPassword"
                v-show="modelValue"
                @click.stop="showPasswordHandler"></i>
        </div>
        <div v-if="wordCounterText" class="nl-input__word-counter">{{ wordCounterText }}</div>
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
     * @description Type of input (Native attribute mapping)
     */
    type: {
        type: String,
        default: "text",
        validator: (v) => ["text", "password", "file", "number"].includes(v),
    },
    /**
     * @description Model-value of input (two-way value mapping)
     */
    modelValue: [String, Number],
    /**
     * @description Input value formatter (Format value when updated)
     */
    formatter: {
        type: Function,
        default: (value) => value,
    },
    /**
     * @description Input value parser (Parse value when updated)
     */
    parser: {
        type: Function,
        default: (value) => value,
    },
    /**
     * @description Theme of input
     */
    theme: {
        type: String,
        default: "default",
    },
    /**
     * @description Border shape of input (circle, square or no-border)
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => validateShape(v),
    },
    /**
     * @description Prefix icon of input (Only iconfont so far)
     */
    icon: String,
    /**
     * @description Prefix text of input
     */
    prefix: String,
    /**
     * @description Suffix text of input
     */
    suffix: String,
    /**
     * @description Input placeholder
     */
    placeholder: String,
    /**
     * @description Max length of input value (Native attribute mapping)
     */
    maxlength: {
        type: [String, Number],
        default: -1,
    },
    /**
     * @description Autocomplete state (Native attribute mapping)
     */
    autocomplete: {
        type: String,
        default: "off",
    },
    /**
     * @description Disabled state (Native attribute mapping)
     */
    disabled: Boolean,
    /**
     * @description Readonly state (Native attribute mapping)
     */
    readonly: Boolean,
    /**
     * @description Clearable state (Control delete button)
     */
    clearable: Boolean,
    /**
     * @description Show password state (Effective when input type is password)
     */
    showPassword: Boolean,
    /**
     * @description Lazy state (Control model-value update way)
     */
    lazy: Boolean,
    /**
     * @description Word counter controller (show word limit)
     */
    counter: {
        type: String,
        default: "off",
        validator: (v) => ["off", "word-limit", "word-left", "both"].includes(v),
    },
    /**
     * @description Input width (Quick set)
     */
    width: {
        type: String,
        default: "100%",
        validator: (v) => validateWidthAndHeight(v),
    },
    /**
     * @description Input height (Quick set)
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
     * @description Calling when input value is changed (Model-value)
     */
    "update:modelValue",
    /**
     * @description Calling when input was focused
     */
    "focused",
    /**
     * @description Calling when input was blured
     */
    "blured",
    /**
     * @description Calling when input value was inputed
     */
    "inputted",
    /**
     * @description Calling when input value was changed
     */
    "changed",
    /**
     * @description Calling when input was cleared
     */
    "cleared",
]);

/**
 * Define refs
 */
const input = ref();
const isFocused = ref(false); // Focus flag
const textLength = ref(props.modelValue?.length || 0);
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
    if (isFocused.value) classArray.push("nl-input--focused");
    return classArray;
});

/**
 * Input word counter text
 */
const wordCounterText = computed(() => {
    if (props.counter === "off") return false;
    let result = "";
    const maxlength = props.maxlength !== -1 && parseInt(props.maxlength);
    if (props.counter !== "word-left") result += `${textLength.value} / ${maxlength || "-"}`;
    if (props.counter === "both") result += " , ";
    if (props.counter !== "word-limit") result += maxlength ? maxlength - textLength.value : "-";
    return result;
});

/**
 * Input on focus event handler
 * @param {object} e Focus event object
 */
function focusHandler(e) {
    isFocused.value = !props.disabled && !props.readonly;
    emit("focused", e);
}

/**
 * Input on blur event handler
 * @param {object} e Blur event object
 */
function blurHandler(e) {
    isFocused.value = false;
    emit("blured", e);
}

/**
 * Input on input event handler
 * @param {object} e Input event object
 */
function inputHandler(e) {
    emit("inputted", e);
    const value = props.parser(e.target.value);
    textLength.value = value.length;
    if (props.lazy) {
        e.target.value = props.formatter(value);
    } else {
        emit("update:modelValue", value);
    }
}

/**
 * Input on change event handler
 * @description This handle function should be executed when props.lazy is true
 * @param {object} e Change event object
 */
function changeHandler(e) {
    emit("changed", e);
    if (props.lazy) emit("update:modelValue", props.parser(e.target.value));
}

/**
 * Input on clear event handler
 * @description Click event handler of clear button
 */
function clearHandler() {
    emit("update:modelValue", "");
    textLength.value = 0;
    nextTick(() => input.value.focus());
}

/**
 * Input show password event handler
 * @description Click event handler of show password button
 */
function showPasswordHandler() {
    const isShowed = input.value.type === "text";
    input.value.type = isShowed ? "password" : "text";
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

        & > i {
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

    & > .nl-input__word-counter {
        flex: none;

        font-size: 12px;
        color: #8f8f8f;
        user-select: none;
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

    & > .nl-input__button-group > i {
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

.nl-input--no-border {
    border: none !important;
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
