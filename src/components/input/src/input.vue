<template>
    <div :class="classList" :style="inputStyle">
        <i v-if="icon" class="iconfont" :class="icon"></i>
        <slot name="prefix">{{ prefix }}</slot>
        <input
            ref="input"
            :type="isPasswordVisible ? 'text' : type"
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
        <div class="button-group">
            <i
                class="iconfont"
                :class="isPasswordVisible ? 'icon-eye' : 'icon-eye-off'"
                v-if="type === 'password' && allowShowPassword"
                v-show="modelValue"
                @click.stop="showPasswordHandler"></i>
            <i
                class="iconfont icon-clear"
                v-if="type !== 'file' && clearable"
                v-show="modelValue"
                @click.stop="clearHandler"></i>
        </div>
        <wordCounter v-if="counter !== 'off'" :mode="counter" :length="textLength" :maxlength="maxlength" />
    </div>
</template>

<script setup>
import { ref, nextTick, computed, watch } from "vue";
import { inputProps, inputEmits } from "./input";
import { parseWidthAndHeight, parseTheme } from "@/utils/parsers";
import wordCounter from "./word-counter.vue";
import "../style/input.css";

/**
 * Define options, props and emit
 */
defineOptions({ name: "NlInput" });
const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

/**
 * Define refs
 */
const input = ref();
const isFocused = ref(false);
const isPasswordVisible = ref(false);
const textLength = ref(props.modelValue?.length || 0);

/**
 * Define classes list
 */
const classList = computed(() => {
    let classArray = ["nl-input"];
    classArray = [...classArray, ...parseTheme(props.theme, "nl-input")];
    classArray.push("nl-input--" + props.shape);
    if (props.disabled) classArray.push("nl-input--disabled");
    if (isFocused.value) classArray.push("nl-input--focused");
    return classArray;
});

/**
 * Define styles
 */
const inputStyle = computed(() => ({
    "--input-width": parseWidthAndHeight(props.width),
    "--input-height": parseWidthAndHeight(props.height),
}));

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
    isPasswordVisible.value = !isPasswordVisible.value;
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
