<template>
    <div class="nl-textarea">
        <textarea
            ref="textarea"
            :class="NlTextareaClasses"
            :rows="rows"
            :value="modelValue"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="disabled"
            @focus="focusHandler"
            @blur="blurHandler"
            @input="inputHandler"></textarea>
        <textarea
            v-if="autosize"
            class="backend-textarea"
            ref="backendTextarea"
            :value="modelValue"
            :readonly="readonly"
            :disabled="disabled"></textarea>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

/**
 * Define options
 */
defineOptions({ name: "NlTextarea" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description Model-value of textarea (two-way value mapping)
     */
    modelValue: [String, Number],
    /**
     * @description text formatter
     */
    formatter: {
        type: Function,
        default: (v) => v,
    },
    /**
     * @description input placeholder
     */
    placeholder: String,
    /**
     * @description Textarea rows (Native attribute mappint)
     */
    rows: [String, Number],
    /**
     * @description Theme of textarea
     */
    theme: {
        type: String,
        default: "default",
    },
    /**
     * @description Shape of textarea
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => ["square", "no-border"].includes(v),
    },
    /**
     * @description Textarea diable state (Native attribute mappint)
     */
    disabled: Boolean,
    /**
     * @description Textarea readonly state (Native attribute mappint)
     */
    readonly: Boolean,
    /**
     * @description Textarea css property resize mapping
     */
    resize: {
        type: String,
        default: "none",
        validator: (v) => ["none", "both", "vertical", "horizontal"].includes(v),
    },
    /**
     * @description Textarea autosize state
     */
    autosize: {
        type: [Boolean, Object],
        default: false,
    },
});

/**
 * Define emits
 */
const emit = defineEmits([
    /**
     * @description Calling when textarea value is changed (Model-value)
     */
    "update:modelValue",
    /**
     * @description Calling when textarea was focused
     */
    "focused",
    /**
     * @description Calling when textarea was blured
     */
    "blured",
    /**
     * @description Calling when textarea value was inputed
     */
    "inputted",
    /**
     * @description Calling when textarea value was changed
     */
    "changed",
]);

/**
 * Define refs
 */
const textarea = ref();
const backendTextarea = ref();
const isFocused = ref(false);
// console.log(rawLineHeight.value)

/**
 * Calculate nl-textarea classes
 */
const NlTextareaClasses = computed(() => {
    let classArray = [];
    if (props.theme) classArray.push("nl-textarea--" + props.theme);
    if (props.shape) classArray.push("nl-textarea--" + props.shape);
    if (props.disabled) classArray.push("nl-textarea--disabled");
    if (isFocused.value) classArray.push("nl-textarea--focused");
    return classArray;
});

/**
 * Textarea on focus event handler
 * @param {object} e Focus event object
 */
function focusHandler(e) {
    isFocused.value = !props.disabled && !props.readonly;
    emit("focused", e);
}

/**
 * Handling function for the textarea was blured.
 * @param {object} e blur event object
 */
function blurHandler(e) {
    isFocused.value = false;
    emit("blured", e);
}

/**
 * Handling function for the textarea was inputing.
 * @param {object} e inputing event object
 */
function inputHandler(e) {
    calculateTextareaHeight();
    emit("update:modelValue", e.target.value);
}

/**
 * Calculate the height of textarea element
 * @param {object} element native html element object
 * @return {string} css height string for textarea element
 */
function calculateTextareaHeight() {
    if (!props.autosize) return;
    textarea.value.style.height = backendTextarea.value.scrollHeight + "px";
}
</script>

<style scoped>
.nl-textarea {
    --background-color: transparent;
    --border-color: #cccccc;

    --focused-background-color: transparent;
    --focused-border-color: #6d94dd;
    --focused-shadow-color: #6d94dd;

    --disabled-background-color: #f0f0f0;

    transition: all 0.16s ease-in;

    display: flex;
    flex-direction: column;
    align-items: start;

    flex: none;

    & > textarea {
        box-sizing: border-box;
        transition: all 0.16s ease-in;

        width: 100%;
        margin: 0;
        resize: v-bind(resize);

        outline: none;
        background-color: transparent;

        color: inherit;
        font-size: inherit;
        word-break: break-all;
        font-family: "Consolas";
    }

    & > .backend-textarea {
        opacity: 0;
        padding: 0;
        margin: 0;
        border: none;
        height: 0px;
    }
}

.nl-textarea--default {
    box-sizing: border-box;

    padding: 8px;

    border: 1px solid #ccc;
    border-radius: 6px;
}

.nl-textarea--no-border {
    border: none !important;
}

.nl-textarea--focused {
    background-color: var(--focused-background-color);
    border: 1px solid var(--focused-border-color);
    box-shadow: 0 0 4px 1px var(--focused-shadow-color);
}

.nl-textarea--disabled {
    background-color: var(--disabled-background-color);

    cursor: not-allowed;

    &:deep(*) {
        color: #969696;
        cursor: not-allowed;
    }
}
</style>
