<template>
    <a
        class="nl-link"
        :class="nlLinkClasses"
        :href="disabled || !href ? undefined : href"
        @click="clickHandler"
    >
        <i v-if="icon" class="nl-link__icon" :class="icon && `iconfont ${icon}`"></i>
        <slot v-else name="icon"></slot>
        <span class="nl-link__text"><slot></slot></span>
    </a>
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
     * @description nav-link theme
     */
    theme: {
        type: String,
        default: 'default'
    },
    /**
     * @description nav-link href
     */
    href: {
        type: String,
        default: '/'
    },
    /**
     * @description nav-link initial active state
     */
    actived: Boolean,
    /**
     * @description nav-link initial diabled state
     */
    disabled: Boolean,
    /**
     * @description nav-link icon (Only iconfont)
     */
    icon: String,
    /**
     * @description nav-link underline
     */
    underline: Boolean
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
const clickTimer = ref(null) // Throttle flag

/**
 * Calculate nav-link class
 */
const nlLinkClasses = computed(() => {
    let classAray = []
    props.theme && classAray.push('nav-link--' + props.theme)
    props.actived && classAray.push('nav-link--actived')
    props.disabled && classAray.push('nav-link--disabled')
    props.underline && classAray.push('nav-link--underline')
    // console.log(classAray)
    return classAray
})

/**
 * Link click handler
 */
function clickHandler(e) {
    if (clickTimer.value || props.disabled) return
    emit('onClicked', e)
    clickTimer.value = setTimeout(function () {
        clickTimer.value = null
    }, 1000)
}
</script>

<style scoped>
.nl-link {
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

    & > .nl-link__icon {
        font-size: 14px;
        color: var(--icon-color);
    }

    & > .nl-link__text {
        color: var(--font-color);
    }
}

.nav-link--actived {
    --actived-font-color: #012c2c;
    --actived-icon-color: #1f4641;
    --actived-background-color: #b9e6a6;

    background: var(--actived-background-color);

    &:hover {
        background-color: var(--actived-background-color);
    }

    & > .nl-link__icon {
        color: var(--actived-icon-color);
    }
    & > .nl-link__text {
        color: var(--actived-font-color);
    }
}

.nav-link--disabled {
    cursor: not-allowed !important;

    &:hover {
        background-color: transparent !important;
    }

    & > .nl-link__icon {
        color: #ccc;
        cursor: not-allowed !important;
    }

    & > .nl-link__text {
        color: #ccc;
        cursor: not-allowed !important;
    }
}

.nav-link--underline {
    &:hover {
        /* Create underline element on hover if underline prop was defined */
        &::after {
            content: '';
            display: block;
            width: calc(100% - 28px);
            height: 2px;
            position: absolute;
            bottom: 4px;
            border-radius: 50%;
            background-color: var(--font-color);
        }
    }
}
</style>
