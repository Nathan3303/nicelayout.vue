<template>
    <div class="nl-div"><slot></slot></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { validateWidthAndHeight } from './validators'
import { parseWidthAndHeight } from './parsers'

/**
 * Define options
 */
defineOptions({ name: 'NlDiv' })

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description div direction
     */
    direction: {
        type: String,
        default: 'horizontal',
        validator: (v) => ['horizontal', 'vertical'].includes(v)
    },
    /**
     * @description div flex attribute: align-items
     */
    alignItems: {
        type: String,
        default: 'center'
    },
    /**
     * @description div flex attribute: justify-content
     */
    justifyContent: {
        type: String,
        default: 'start'
    },
    /**
     * @description div flex attribute: flex
     */
    flex: {
        type: String,
        default: 'none'
    },
    /**
     * @description div flex attribute: flex-wrap
     */
    flexWrap: {
        type: String,
        default: 'no-wrap'
    },
    /**
     * @description div flex attribute: gap
     */
    gap: {
        type: Number,
        default: 8
    },
    /**
     * @description div margin
     */
    margin: {
        type: [Number, String, Array],
        default: 0
    },
    /**
     * @description div direction padding
     */
    directionPadding: {
        type: Number,
        default: 0
    },
    /**
     * @description div width
     */
    width: {
        type: [String, Number],
        default: 'auto',
        validator: (v) => validateWidthAndHeight(v)
    },
    /**
     * @description div height
     */
    height: {
        type: [String, Number],
        default: 'auto',
        validator: (v) => validateWidthAndHeight(v)
    }
})

/**
 * Define refs
 */
const directionStyle = ref(props.direction == 'horizontal' ? 'row' : 'column')
const gapStyle = ref(props.gap + 'px')
const widthStyle = ref(parseWidthAndHeight(props.width))
const heightStyle = ref(parseWidthAndHeight(props.height))

/**
 * Calculate the css padding value from prop directionPadding
 */
const paddingStyle = computed(() => {
    let str = ''
    str += props.direction === 'vertical' ? props.directionPadding + 'px' : '0px'
    str += ' '
    str += props.direction === 'horizontal' ? props.directionPadding + 'px' : '0px'
    return str
})
</script>

<style scoped>
.nl-div {
    display: flex;
    flex-direction: v-bind(directionStyle);
    align-items: v-bind(alignItems);
    justify-content: v-bind(justifyContent);
    flex-wrap: v-bind(flexWrap);
    gap: v-bind(gapStyle);

    flex: v-bind(flex);
    width: v-bind(widthStyle);
    height: v-bind(heightStyle);
    padding: v-bind(paddingStyle);
}
</style>
