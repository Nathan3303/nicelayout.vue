<template>
    <div class="nl-textarea" :class="NlTextareaClasses">
        <textarea
            ref="textarea"
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
            :rows="rows"
            :value="modelValue"
            :readonly="readonly"
            :disabled="disabled"></textarea>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

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
    rows: {
        type: [String, Number],
        default: 1,
    },
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
     * @description Textarea resize state
     */
    resize: Boolean,
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
 * Define computed
 */
const overflow = computed(() => (props.autosize ? "hidden" : "auto"));
const minHeight = computed(() => !props.autosize && props.rows * 22 + "px");
const resize = computed(() => (props.resize ? "vertical" : "none"));
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
    emit("update:modelValue", e.target.value);
    if (props.autosize) {
        nextTick(() => {
            textarea.value.style.height = backendTextarea.value.scrollHeight + "px";
        });
    }
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

    & > textarea {
        width: 100%;
        min-height: v-bind(minHeight);
        line-height: 22px;
        margin: 0;
        padding: 0;
        resize: v-bind(resize);

        overflow: v-bind(overflow);
        outline: none;
        border: none;
        background-color: transparent;

        color: inherit;
        font-size: inherit;
        font-family: inherit;
        word-break: break-all;
    }

    & > .backend-textarea {
        opacity: 0;
        height: 0px;
    }
}

.nl-textarea--default {
    box-sizing: border-box;
    padding: 6px 8px;

    border: 1px solid #ccc;
    border-radius: 6px;

    font-size: 16px;
    font-family: "Consolas";
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
    user-select: none !important;

    &:deep(*) {
        color: #969696;
        cursor: not-allowed;
    }
}
</style>
