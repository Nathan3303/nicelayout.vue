<template>
    <div :class="`nl-avatar nl-avatar--${shape}`">
        <img v-if="src && !hasError" :src="src" :alt="alt" :title="title" :style="{ objectFit: fit }" @error="errorHandler" />
        <i v-else-if="icon" class="iconfont" :class="icon"></i>
        <slot v-else></slot>
    </div>
</template>

<script setup>
import { ref } from "vue";
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
     * @description avatar image source
     */
    src: String,
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
    /**
     * @description avatar whtie border width
     */
    whiteBorder: {
        type: Number,
        default: 0,
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
const sizeStyle = ref(parseSize(props.size));
const whtieBorderStyle = ref(props.whiteBorder + "px");

/**
 * Avatar image error handler
 * @param { object } e error event object
 */
function errorHandler(e) {
    hasError.value = true;
    emit("error", e);
}
</script>

<style scoped>
.nl-avatar {
    aspect-ratio: 1;

    flex: none;
    width: v-bind(sizeStyle);
    /* height: v-bind(sizeStyle); */
    overflow: hidden;

    border: v-bind(whtieBorderStyle) solid white;
    background-color: #c4c4c4;

    color: rgb(255, 255, 255);

    & > img {
        display: block;
        width: 100%;
        height: 100%;
    }

    & > .iconfont {
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
