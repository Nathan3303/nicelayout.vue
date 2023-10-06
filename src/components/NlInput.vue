<template>
    <div ref="wrapper" class="nl-input" :class="NlInputClasses" @click="wrapperClickHandler">
        <!-- nl-input__icon -->
        <i v-if="icon" class="nl-input__icon iconfont" :class="icon"></i>
        <slot v-else name="icon"></slot>
        <!-- nl-input__prefix -->
        <slot name="prefix">{{ prefix }}</slot>
        <!-- nl-input__input -->
        <input
            ref="input"
            :type="type"
            :placeholder="placeholder"
            :name="name"
            :maxlength="maxlength"
            :minlength="minlength"
            :value="modelValue"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :readonly="!disabled && readonly"
            @input="inputHandler"
            @focus="focusHandler"
            @blur="blurHandler"
            @change="changeHandler"
        />
        <!-- nl-input__suffix -->
        <slot name="suffix">{{ suffix }}</slot>
        <!-- nl-input__clear-buttons -->
        <i
            class="nl-input__button iconfont icon-clear"
            v-show="modelValue"
            @click="clearHandler"
        ></i>
    </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import { validateShape, validateWidthAndHeight } from './validators'
import { parseWidthAndHeight } from './parsers'

/**
 * Define options
 */
defineOptions({ name: 'NlInput' })

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description input id
     */
    id: String,
    /**
     * @description input theme
     */
    theme: {
        type: String,
        default: 'default'
    },
    /**
     * @description input shape
     */
    shape: {
        type: String,
        default: 'circle',
        validator: (v) => validateShape(v)
    },
    /**
     * @description input type
     */
    type: {
        type: String,
        default: 'text',
        validator: (v) => ['text', 'password', 'file', 'number'].includes(v)
    },
    /**
     * @description input label
     */
    label: String,
    /**
     * @description input icon (Only iconfont class)
     */
    icon: String,
    /**
     * @description input prefix
     */
    prefix: String,
    /**
     * @description input suffix
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
     * @description input minlength
     */
    minlength: Number,
    /**
     * @description input value (v-model)
     */
    modelValue: {
        type: [String, Number],
        default: ''
    },
    /**
     * @description input name
     */
    name: String,
    /**
     * @description input autocomplete
     */
    autocomplete: {
        type: String,
        default: 'off'
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
     * @description input format function
     */
    formatter: {
        type: Function,
        default: (value) => value
    },
    /**
     * @description input width
     */
    width: {
        type: String,
        default: 'auto',
        validator: (v) => validateWidthAndHeight(v)
    },
    /**
     * @description input height
     */
    height: {
        type: String,
        default: '36px',
        validator: (v) => validateWidthAndHeight(v)
    }
})

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description when update modelValue
     */
    'update:modelValue',
    /**
     * @description when focused
     */
    'onFocused',
    /**
     * @description when blured
     */
    'onBlured',
    /**
     * @description when value changed
     */
    'onChanged'
])

/**
 * Define refs
 */
const wrapper = ref()
const input = ref()
const isFocused = ref(false) // Focus flag
const widthStyle = ref(parseWidthAndHeight(props.width))
const heightStyle = ref(parseWidthAndHeight(props.height))
// console.log(input)

/**
 * Calculate nl-input classes
 */
const NlInputClasses = computed(() => {
    let classArray = []
    if (props.theme) classArray.push('nl-input--' + props.theme)
    if (props.shape) classArray.push('nl-input--' + props.shape)
    if (props.disabled) classArray.push('nl-input--disabled')
    if (isFocused.value && !props.disabled) classArray.push('nl-input--focused')
    return classArray
})

/**
 * nl-input input handle function
 * @param {object} e input event object
 */
function inputHandler(e) {
    emit('update:modelValue', e.target.value)
}

/**
 * nl-input focus handle function
 * @param {object} e focus event object
 */
function focusHandler(e) {
    isFocused.value = true
    emit('onFocused', e)
}

/**
 * nl-input blur handle function
 * @param {object} e blur event object
 */
function blurHandler(e) {
    isFocused.value = false
    emit('onBlured', e)
}

/**
 * nl-input change handle function
 * @param {object} e change event object
 */
function changeHandler(e) {
    emit('onChanged', e)
}

/**
 * Handle nl-input clear event
 */
function clearHandler() {
    input.value.value = ''
    emit('update:modelValue', '')
    nextTick(() => input.value.focus())
}

/**
 * Wrapper click handler
 * @description When wrapper div was clicked, make inner input element on focus
 * @param {object} e The click event object
 */
function wrapperClickHandler(e) {
    if (!isFocused.value) input.value.focus()
}
</script>

<style scoped>
.nl-input--default {
    --primary-bg-color: transparent;
    --focus-bg-color: white;
    --border-color: #bacfbc;

    transition: all 0.3s ease;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: 8px;

    min-width: 96px;
    width: v-bind(widthStyle);
    height: v-bind(heightStyle);
    line-height: v-bind(heightStyle);
    padding: 0 calc(v-bind(heightStyle) / 3);
    position: relative;

    border: 1px solid var(--border-color);
    background: var(--primary-bg-color);

    font-size: 15px;
    user-select: none;

    & > input {
        flex: 1 1 auto;
        min-width: 64px;
        height: 100%;
        padding: 0;
        border: none;
        outline: none;
        background: none;
        font-size: 13px;
        cursor: default;
    }

    & > .nl-input__button {
        flex: none;
        scale: 0.86;

        color: #6f6f6f;
        font-size: 12px !important;
        line-height: initial;

        &:hover {
            color: rgba(255, 39, 39, 0.7);
            cursor: pointer;
        }
    }
}

.nl-input--square {
    border-radius: 6px;
}

.nl-input--circle {
    border-radius: v-bind(heightStyle);
}

.nl-input--focused {
    background-color: white;
    box-shadow: 0 0 3px 1px var(--border-color);
}

.nl-input--disabled {
    cursor: not-allowed;

    &:deep(*) {
        color: #969696;
        cursor: not-allowed;
    }
}
</style>
