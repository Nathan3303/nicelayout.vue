<template>
    <div class="nl-avatar" :class="`nl-avatar--${shape}`" @click="clickHandler" :title="title">
        <img v-if="src && !hasError" class="nl-avatar__image" :src="src" :alt="alt" @error="errorHandler" />
        <div v-else-if="alt || $slots.default" class="nl-avatar__text">
            <slot>{{ alt }}</slot>
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
     * @description Image source address of avatar
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
     * @description Size of avatar
     */
    size: {
        type: [String, Number],
        default: "normal",
        validator: (v) => validateSize(v),
    },
    /**
     * @description Shape of avatar
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => ["square", "round"].includes(v),
    },
    /**
     * @description Border width of avatar
     */
    borderWidth: {
        type: Number,
        default: 0,
    },
    /**
     * @description Border color of avatar
     */
    borderColor: {
        type: String,
        default: "white",
    },
    /**
     * @description Alternating text of Avatar's image
     */
    alt: String,
    /**
     * @description Title of avata
     */
    title: {
        type: String,
        default: "nl-avatar",
    },
    /**
     * @description Fit mode of avatar (Effetivating when avatar is image type)
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
    "clicked",
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

    border: v-bind(borderWidth) solid v-bind(borderColor);

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
        background-color: #c4c4c4;

        color: inherit;
        font-size: calc(v-bind(size) / 2);
        font-weight: inherit;
    }

    & > .nl-avatar__icon {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
        background-color: #c4c4c4;

        color: inherit;
        font-size: calc(v-bind(size) / 2);
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
