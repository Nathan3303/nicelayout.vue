<template>
    <div :class="classList" :style="textareaStyles">
        <textarea
            ref="textarea"
            :rows="rows"
            :value="modelValue"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="disabled"
            :maxlength="maxlength"
            @focus="focusHandler"
            @blur="blurHandler"
            @input="inputHandler"
            @change="changeHandler"></textarea>
        <textarea
            v-if="autosize && !props.disabled && !props.readonly"
            class="backend-textarea"
            ref="backendTextarea"
            :value="modelValue"></textarea>
        <word-counter v-if="counter !== 'off'" :mode="counter" :maxlength="maxlength" :length="textLength" />
    </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { textareaProps, textareaEmits } from "./textarea";
import { parseTheme } from "@/utils/parsers";
import wordCounter from "./word-counter.vue";
import "../style/textarea.css";

/**
 * Define options, props and emit
 */
defineOptions({ name: "NlTextarea" });
const props = defineProps(textareaProps);
const emit = defineEmits(textareaEmits);

/**
 * Define refs
 */
const textarea = ref();
const backendTextarea = ref();
const isFocused = ref(false);
const textLength = ref(props.modelValue?.length || 0);
// console.log(rawLineHeight.value)

/**
 * Define class list
 */
const classList = computed(() => {
    let classArray = [];
    classArray = ["nl-textarea", ...parseTheme(props.theme, "nl-textarea")];
    classArray.push("nl-textarea--" + props.shape);
    if (props.disabled) classArray.push("nl-textarea--disabled");
    if (isFocused.value) classArray.push("nl-textarea--focused");
    return classArray;
});

/**
 * Define styles
 */
const textareaStyles = computed(() => {
    const { autosize, resize, rows } = props;
    return {
        "--rows": rows,
        "--overflow": autosize ? "hidden" : "auto",
        "--resize": resize ? "vertical" : "none",
    };
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
    textLength.value = e.target.textLength;
    if (props.autosize)
        nextTick(() => {
            textarea.value.style.height = backendTextarea.value.scrollHeight + "px";
        });
    emit("inputted", e);
}

/**
 * Textarea on change event handler
 * @param {object} e change event object
 */
function changeHandler(e) {
    emit("changed", e);
}
</script>
