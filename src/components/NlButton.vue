<template>
    <button class="nl-button" :class="NlButtonClasses" @click="clickHandler">
        <!-- nl-button__loading-icon -->
        <i v-if="loading" class="iconfont icon-loading"></i>
        <!-- nl-button__icon -->
        <i v-else-if="icon" class="iconfont" :class="icon"></i>
        <!-- nl-button__text -->
        <span v-if="$slots.default" class="nl-button__text"><slot></slot></span>
        <!-- nl-button__superior -->
        <span v-if="superior" class="nl-button__superior">{{ superior }}</span>
    </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { isString } from './utils'

/**
 * Define options
 */
defineOptions({ name: 'NlButton' })

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description button theme
     */
    theme: {
        type: String,
        default: 'default'
    },
    /**
     * @description button shape
     */
    shape: {
        type: String,
        default: 'circle',
        validator: (v) => ['square', 'circle', 'no-border'].includes(v)
    },
    /**
     * @description button icon (Only iconfont)
     */
    icon: String,
    /**
     * @description button superior (Number flag)
     */
    superior: String,
    /**
     * @description button disable state
     */
    disabled: Boolean,
    /**
     * @description button loading state
     */
    loading: Boolean,
    /**
     * @description button width
     */
    width: {
        type: [String, Number],
        default: 'auto',
        validator: (v) => (isString(v) ? ['auto', 'max-content', 'min-content'].includes(v) : v)
    },
    /**
     * @description button height
     */
    height: {
        type: [String, Number],
        default: 36,
        validator: (v) => (isString(v) ? ['auto', 'max-content', 'min-content'].includes(v) : v)
    }
})

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description when clicked
     */
    'onClicked'
])

/**
 * Define refs
 */
const isLoading = ref(props.loading)
const widthStyle = ref(isString(props.width) ? props.width : props.width + 'px')
const heightStyle = ref(isString(props.height) ? props.height : props.height + 'px')
// console.log(widthStyle, heightStyle)

/**
 * nl-button clicking handle function
 * @param {object} e clicking event object
 */
function clickHandler(e) {
    isLoading.value = true
    emit('onClicked', e)
}

/**
 * Calculate button classes
 */
const NlButtonClasses = computed(() => {
    let classArray = []
    if (props.theme) classArray.push('nl-button--' + props.theme)
    if (props.shape) classArray.push('nl-button--' + props.shape)
    if (props.disabled) classArray.push('nl-button--disabled')
    // console.log(classArray)
    return classArray
})
</script>

<style scoped>
.nl-button {
    --font-color: #53516e;
    --background-color: transparent;
    --icon-color: #83819f;
    --actived-background-color: var(--header-active-color);
    --actived-icon-color: var(--primary-font-color);
    --superior-bg-color: #ff6d2f;
    --border-color: #dfdfe6;

    user-select: none;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: v-bind(widthStyle);
    height: v-bind(heightStyle);
    padding: 0 calc(v-bind(heightStyle) / 2.4);
    background-color: var(--background-color);
    flex: none;

    font-size: 13px;
    color: var(--font-color);

    & > i {
        color: var(--icon-color);
    }

    & > .icon-loading {
        -webkit-animation: rotation 1s ease-in-out infinite;
        animation: rotation 1s ease-in-out infinite;
    }

    & > .nl-button__text {
        font-family: 'Consolas';
        font-weight: bold;
    }

    & > .nl-button__superior {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 6px;
        border-radius: 6px;
        background: var(--superior-bg-color);
        color: white;
        font-size: 12px;
        scale: 0.86;
        font-weight: bold;
        border: 1px solid #e14c0d;
        font-size: 12px;
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.nl-button--square {
    border: 1px solid var(--border-color);
    border-radius: 12px;
}

.nl-button--circle {
    border: 1px solid var(--border-color);
    border-radius: v-bind(heightStyle);
}

.nl-button--no-border {
    border: none;
}

.nl-button--icon-only {
    aspect-ratio: 1;
    min-width: 32px;
    min-height: 32px;
    padding: 0;

    & > i {
        font-size: 22px;
        color: #618076;
    }
}

.nl-button--pure {
    padding: 0px;
    /* padding-right: 8px; */
    border: none;
    min-height: auto;
    height: auto;
}
</style>
