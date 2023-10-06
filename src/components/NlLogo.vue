<template>
    <a :href="href" class="nl-logo">
        <i class="iconfont" :class="icon"></i>
        <slot></slot>
    </a>
</template>

<script setup>
import { ref } from 'vue'
import { validateWidthAndHeight } from './validators'
import { parseWidthAndHeight } from './parsers'

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description nl-logo width
     */
    width: {
        type: [String, Number],
        default: 'auto',
        validator: (v) => validateWidthAndHeight(v)
    },
    /**
     * @description nl-logo href
     */
    href: {
        type: String,
        default: '/'
    },
    /**
     * @description nl-logo icon (Only iconfont)
     */
    icon: String
})

/**
 * Define refs
 */
const widthStyle = ref(parseWidthAndHeight(props.width))
</script>

<style scoped>
.nl-logo {
    --primary-color: #090048;

    width: v-bind(widthStyle);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    /* gap: 6px; */
    flex: none;

    text-decoration: none;
    color: var(--primary-color);
    font-size: 12px;
    font-weight: bold;
    text-shadow: 1px 1px white;

    & > i {
        font-size: 24px;
    }
}
</style>
