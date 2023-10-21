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
            @change="changeHandler" />
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
        <div v-if="counter !== 'off'" class="nl-input__word-counter">{{ wordCounterText }}</div>
    </div>
</template>

<script setup>
import { ref, nextTick, computed, watch } from "vue";
import { validateShape, validateWidthAndHeight } from "./validators";
import { parseWidthAndHeight, parseTheme } from "./parsers";

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
        validator: (v) => ["text", "password", "number"].includes(v),
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
     * @description Theme(s) of input (Allow custom style)
     */
    theme: {
        type: [Array, String],
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
     * @description Allow show password state (Effective when input type is password)
     */
    allowShowPassword: Boolean,
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
const isFocused = ref(false);
const textLength = ref(props.modelValue?.length || 0);
// console.log(input)

/**
 * Define computed
 */
const width = computed(() => parseWidthAndHeight(props.width));
const height = computed(() => parseWidthAndHeight(props.height));
const NlInputClasses = computed(() => {
    let classArray = [];
    classArray = [...parseTheme(props.theme, "nl-input")];
    classArray.push("nl-input--" + props.shape);
    if (props.disabled) classArray.push("nl-input--disabled");
    if (isFocused.value) classArray.push("nl-input--focused");
    return classArray;
});
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
    const inputValue = props.parser(e.target.value);
    emit("update:modelValue", inputValue);
    textLength.value = inputValue.length;
    emit("inputted", e);
}

/**
 * Input on change event handler
 * @description This handle function should be executed when props.lazy is true
 * @param {object} e Change event object
 */
function changeHandler(e) {
    emit("changed", e);
}

/**
 * Input on clear event handler
 * @description Click event handler of clear button
 */
function clearHandler() {
    const inputValue = input.value.value;
    emit("update:modelValue", "");
    textLength.value = 0;
    nextTick(() => input.value.focus());
    emit("cleared", inputValue);
}

/**
 * Input show password event handler
 * @description Click event handler of show password button
 */
function showPasswordHandler() {
    const isShowed = input.value.type === "text";
    input.value.type = isShowed ? "password" : "text";
}

/**
 * Watch props.modelValue
 * @description
 *  Fix bug of when props.modelValue was changed, textLength reference
 *  dose not updated, cause the word counter miss re-calculating.
 */
watch(
    () => props.modelValue,
    () => (textLength.value = props.modelValue.length)
);
</script>

<style scoped>
.nl-input {
    --background-color: transparent;
    --border-color: #cccccc;

    --icon-size: inherit;
    --icon-color: inherit;
    --icon-weight: inherit;

    --button-size: 22px;
    --button-color: #8d8d8d;
    --button-border-color: #cccccc;

    --focus-background-color: transparent;
    --focus-border-color: #6d94dd;
    --focus-shadow-color: #6d94dd;

    --disable-background-color: #f0f0f0;

    --hover-button-color: #ff2727b3;
    --hover-button-border-color: #ff2727b3;

    transition: all 0.16s ease;
    box-sizing: border-box;
    user-select: none;

    display: flex;
    align-items: center;
    gap: 8px;

    min-width: 96px;
    width: v-bind(width);
    height: v-bind(height);
    line-height: v-bind(height);
    padding: 6px calc(v-bind(height) / 3);
    position: relative;
    overflow: hidden;

    border: 1px solid var(--border-color);
    background: var(--background-color);

    color: black;
    font-size: 16px;
    font-family: "Consolas";
    font-weight: normal;

    & > .nl-input__icon {
        color: var(--icon-color);
        font-size: var(--icon-size);
        font-weight: var(--icon-weight);
    }

    & > input {
        flex: auto;
        min-width: 24px;
        height: 100%;
        padding: 0;
        margin: 0;

        outline: none;
        border: none;
        background: none;

        color: inherit;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;

        &::-ms-reveal {
            display: none;
        }

        &::-ms-clear {
            display: none;
        }

        &::placeholder {
            color: inherit;
            opacity: 0.48;
        }
    }

    & > .nl-input__button-group {
        display: flex;
        align-items: center;
        gap: 4px;

        & > .iconfont {
            transition: all 0.16s ease;
            box-sizing: border-box;
            aspect-ratio: 1;
            cursor: pointer;

            scale: 0.84;
            height: var(--button-size);
            line-height: var(--button-size);

            border-radius: 50%;
            border: 1px solid var(--button-border-color);

            color: var(--button-color);
            font-size: 12px;
            text-align: center;

            &:hover {
                color: var(--hover-button-color);
                border-color: var(--hover-button-border-color);
            }
        }
    }

    & > .nl-input__word-counter {
        flex: none;
        opacity: 0.48;
        font-size: 12px;
    }

    &.nl-input--square {
        border-radius: 6px;
    }

    &.nl-input--round {
        border-radius: v-bind(height);
    }

    &.nl-input--no-border {
        border: none;
        border-radius: 6px;
    }

    &.nl-input--round-no-border {
        border: none;
        border-radius: v-bind(height);
    }

    &.nl-input--focused {
        border: 1px solid var(--focus-border-color);
        box-shadow: 0 0 4px 1px var(--focus-shadow-color);
        background-color: var(--focus-background-color);
    }

    &.nl-input--disabled {
        cursor: not-allowed;
        user-select: none;
        background-color: var(--disabl-background-color);

        &:deep(*) {
            color: #969696;
            cursor: not-allowed;
        }
    }
}
</style>
