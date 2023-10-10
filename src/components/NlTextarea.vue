<template>
    <div class="nl-textarea" :class="`nl-textarea--${theme}`">
        <textarea
            ref="textarea"
            :value="modelValue"
            :placeholder="placeholder"
            :readonly="readonly"
            :title="title"
            @blur="blurHandler"
            @input="inputHandler"></textarea>
        <textarea class="hidden-textarea" ref="backendTextarea" rows="1" :value="modelValue"></textarea>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

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
     * @description Theme of textarea
     */
    theme: {
        type: String,
        default: "default",
    },
    /**
     * @description readonly state
     */
    readonly: Boolean,
    /**
     * @description text size
     */
    resize: Boolean,
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
     * @description input title
     */
    title: String,
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
     * @description Calling when textarea was blured
     */
    "blured",
]);

/**
 * Define refs
 */
const textarea = ref();
const backendTextarea = ref();
// console.log(rawLineHeight.value)

/**
 * Handling function for the textarea was blured.
 * @param {object} e blur event object
 */
function blurHandler(e) {
    emit("blured", props.formatter(e.target.value));
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
    textarea.value.style.height = backendTextarea.value.scrollHeight + "px";
}

/**
 * Handle something when the component just mounted
 */
onMounted(() => {
    calculateTextareaHeight();
});
</script>

<style scoped>
.nl-textarea {
    display: flex;
    flex-direction: column;
    align-items: start;

    position: relative;
    overflow: hidden;

    & > textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
        resize: v-bind(resize);

        border: none;
        outline: none;
        background-color: transparent;

        color: inherit;
        font-size: inherit;
        word-break: break-all;
        font-family: "Consolas";

        /* transition: all .16s ease-in; */
    }

    & > .hidden-textarea {
        opacity: 0;
        height: 0px;
    }
}

.nl-textarea--default {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #ccc;
    padding: 6px;
    border-radius: 6px;
}
</style>
