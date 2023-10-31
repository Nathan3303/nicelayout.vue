<template>
    <span class="nl-tag" :class="`nl-tag--${theme}`"><slot></slot></span>
</template>

<script setup>
import { ref } from 'vue'
import { validateSize } from './validators'
import { parseSize } from './parsers'

/**
 * Define options
 */
defineOptions({ name: 'NlTag' })

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description tag theme
     */
    theme: {
        type: String,
        default: 'default'
    },
    /**
     * @description tag size
     */
    size: {
        type: String,
        default: 'normal',
        validator: (v) => validateSize(v)
    }
})

/**
 * Defien refs
 */
const sizeStyle = ref(parseSize(props.size))
</script>

<style scoped>
.nl-tag {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 14px;
    font-weight: bold;
    cursor: default;
    user-select: none;
}

.nl-tag--default {
    background: #cfcfcf;
    color: #666666;
}

.nl-tag--orange {
    background: #ffecc8;
    color: #7a3137;
}

.nl-tag--blue {
    background: #d9e6ff;
    color: #06235b;
}

.nl-tag--sky-blue {
    background: #bcecfe;
    color: #414f55;
}

.nl-tag--light-purple {
    background: #fee5ff;
    color: #605298;
}
</style>
