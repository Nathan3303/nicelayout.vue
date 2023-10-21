<template>
    <div :class="`nl-avatar nl-avatar--${shape}`" @click="clickHandler">
        <img v-if="src && !hasError" class="nl-avatar__image" :src="src" :alt="alt" :title="title" @error="errorHandler" />
        <div v-else-if="$slots.default" class="nl-avatar__text">
            <slot></slot>
        </div>
        <i v-else-if="icon" class="nl-avatar__icon iconfont" :class="icon"></i>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { validateSize, validateFit } from "./validators";
import { parseSize } from "./parsers";

/**
 * Defien options
 */
defineOptions({ name: "NlAvatar" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description avatar image source
     */
    src: String,
    /**
     * @description Avatar icon (Only iconfont)
     */
    icon: {
        type: String,
        default: "icon-tupian",
    },
    /**
     * @description Avatar size
     */
    size: {
        type: [String, Number],
        default: "normal",
        validator: (v) => validateSize(v),
    },
    /**
     * @description Avatar shape
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => ["square", "round"].includes(v),
    },
    /**
     * @description avatar whtie border width
     */
    borderWidth: {
        type: Number,
        default: 0,
    },
    /**
     * @description avatar image alternate
     */
    alt: String,
    /**
     * @description avatar image title
     */
    title: String,
    /**
     * @description avatar image fit mode
     */
    fit: {
        type: String,
        default: "cover",
        validator: (v) => validateFit(v),
    },
});

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description when image load failed
     */
    "error",
    /**
     * @description when avatar clicked
     */
    "clicned",
]);

/**
 * Define refs
 */
const hasError = ref(false); // Error flag

/**
 * Define computed
 */
const size = computed(() => parseSize(props.size));
const borderWidth = computed(() => `${props.borderWidth}px`);

/**
 * Avatar image error handler
 * @param { object } e error event object
 */
function errorHandler(e) {
    hasError.value = true;
    emit("error", e);
}

/**
 * Avatar image click handler
 * @param { object } e error event object
 */
function clickHandler(e) {
    emit("clicked", e);
}
</script>

<style scoped>
.nl-avatar {
    aspect-ratio: 1;

    flex: none;
    width: v-bind(size);
    height: v-bind(size);
    overflow: hidden;

    border: v-bind(borderWidth) solid transparent;
    background-color: #c4c4c4;

    color: rgb(255, 255, 255);

    & > .nl-avatar__image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: v-bind(fit);
    }

    & > .nl-avatar__text {
        display: flex;
        align-items: center;
        justify-content: center;

        flex: 1 1 auto;
        width: 100%;
        height: 100%;
        overflow: hidden;

        font-size: 16px;
    }

    & > .nl-avatar__icon {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;

        color: inherit;
        font-size: inherit;
        font-weight: inherit;
    }

    &.nl-avatar--square {
        border-radius: 4px;
    }

    &.nl-avatar--round {
        border-radius: 50%;
    }
}
</style>
