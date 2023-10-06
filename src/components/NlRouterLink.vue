<template>
    <router-link
        class="nl-router-link"
        :class="nlLinkClasses"
        :to="disabled || !to ? undefined : to"
        active-class="nl-router-link--actived"
    >
        <i v-if="icon" class="nl-router-link__icon" :class="['iconfont', icon]"></i>
        <slot v-else-if="$slots.icon" name="icon"></slot>
        <span v-if="$slots.default" class="nl-router-link__text">
            <slot></slot>
        </span>
    </router-link>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * Define options
 */
defineOptions({ name: 'NlLink' })

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description nl-router-link theme
     */
    theme: {
        type: String,
        default: 'default'
    },
    /**
     * @description nl-router-link to
     */
    to: {
        type: String,
        default: '/'
    },
    /**
     * @description nl-router-link initial diabled state
     */
    disabled: Boolean,
    /**
     * @description nl-router-link icon (Only iconfont)
     */
    icon: String
})

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description when nav-link clicked
     */
    'onClicked'
])

/**
 * Define refs
 */

/**
 * Calculate nav-link class
 */
const nlLinkClasses = computed(() => {
    let classAray = []
    props.theme && classAray.push('nl-router-link--' + props.theme)
    props.disabled && classAray.push('nl-router-link--disabled')
    // console.log(classAray)
    return classAray
})
</script>

<style scoped>
.nl-router-link {
    --font-color: #012c2c;
    --icon-color: #6d8b80;
    --background-color: none;
    --hover-background-color: #b9e6a664;

    transition: all 0.16s ease-in-out;
    user-select: none;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: 8px;

    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    position: relative;
    border-radius: 10px;

    text-decoration: none;
    font-size: 12px;
    font-weight: bold;

    &:hover {
        background-color: var(--hover-background-color);
    }

    & > .nl-router-link__icon {
        font-size: 14px;
        color: var(--icon-color);
    }

    & > .nl-router-link__text {
        color: var(--font-color);
    }
}

.nl-router-link--actived {
    --actived-font-color: #012c2c;
    --actived-icon-color: #1f4641;
    --actived-background-color: #b9e6a6;

    background: var(--actived-background-color);

    &:hover {
        background-color: var(--actived-background-color);
    }

    & > .nl-router-link__icon {
        color: var(--actived-icon-color);
    }
    & > .nl-router-link__text {
        color: var(--actived-font-color);
    }
}

.nl-router-link--disabled {
    cursor: not-allowed !important;

    &:hover {
        background-color: transparent !important;
    }

    & > .nl-router-link__icon {
        color: #ccc;
        cursor: not-allowed !important;
    }

    & > .nl-router-link__text {
        color: #ccc;
        cursor: not-allowed !important;
    }
}
</style>
