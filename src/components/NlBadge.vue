<template>
    <div class="nl-badge" :class="NlBadgeClasses">
        <slot></slot>
        <sup v-if="!hidden && (content || dot)" v-text="content"></sup>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { isString } from './utils'

/**
 * Define options
 */
defineOptions({ name: 'NlBadge' })

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description badge theme
     */
    theme: {
        type: String,
        default: 'default'
    },
    /**
     * @description badge value
     */
    value: {
        type: [String, Number],
        default: ''
    },
    /**
     * @description badge max value (Only effective when value is type of number)
     */
    max: {
        type: Number,
        default: 99
    },
    /**
     * @description if is hide badge
     */
    hidden: Boolean,
    /**
     * @description display dot instead value
     */
    dot: Boolean
})

/**
 * Calculate classes of the badge
 */
const NlBadgeClasses = computed(() => {
    let classArray = []
    if (props.theme) classArray.push('nl-badge--' + props.theme)
    if (props.dot) classArray.push('nl-badge--dot')
    return classArray
})

/**
 * Calculate value of content
 */
const content = computed(() => {
    // If props.dot is true, return a empty string
    if (props.dot) return ''
    // If props.value is type of string, just return it
    if (isString(props.value)) return props.value
    // If props.value is type of number, need to check if is overflowed and return
    if (props.value > props.max) return `${props.max}+`
    return props.value
})
</script>

<style scoped>
.nl-badge {
    display: flex;
    align-items: center;
    justify-content: start;
    position: relative;

    & > sup {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 2px 6px;
        position: absolute;
        right: -8px;
        top: -8px;
        scale: 0.9;

        border-radius: 8px;
        user-select: none;
    }
}

.nl-badge--default > sup {
    background: #e96b36;
    border: 1px solid #e35011;
    color: white;
}

.nl-badge--dot > sup {
    width: 8px !important;
    height: 8px !important;
    padding: 0px !important;
    right: -4px !important;
    top: -4px !important;
    scale: 1 !important;

    border-radius: 8px !important;
    border: 2px solid white !important;
}
</style>
