<template>
    <div class="nl-avatar-group" :class="`nl-avatar-group--${direction}`">
        <template v-for="(item, idx) in data">
            <nl-avatar
                v-if="item"
                :icon="item.icon"
                :size="parseInt(size)"
                :shape="shape"
                :src="item.src"
                :alt="item.alt"
                :title="item.title"
                :fit="item.fit"
                :border-width="borderWidth"
                :border-color="borderColor"
                :style="{ zIndex: data.length - idx }" />
        </template>
        <button v-if="addable" class="nl-avatar-group__add-button" @click="addButtonClickHandler">
            <i class="iconfont icon-plus"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { validateSize, validateShape } from "./validators";
import { parseSize } from "./parsers";

/**
 * Import nl-avatar
 */
import NlAvatar from "./NlAvatar.vue";

/**
 * Define options
 */
defineOptions({ name: "AvatarGroup" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description avatar group data (avatars)
     */
    data: Array,
    /**
     * @description avatar size
     */
    size: {
        type: [String, Number],
        default: "normal",
        validator: (v) => validateSize(v),
    },
    /**
     * @description avatar shape
     */
    shape: {
        type: String,
        default: "round",
        validator: (v) => validateShape(v),
    },
    /**
     * @description Border width of avatar (Avatar prop mapping)
     */
    borderWidth: {
        type: Number,
        default: 3,
    },
    /**
     * @description Border color of avatar (Avatar prop mapping)
     */
    borderColor: {
        type: String,
        default: "white",
    },
    /**
     * @description Direction of avatar group
     */
    direction: {
        type: String,
        default: "horizontal",
        validator: (v) => ["horizontal", "vertical"].includes(v),
    },
    /**
     * @description avatar group is addable or not
     */
    addable: Boolean,
});

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description when add button clicked
     */
    "add",
    /**
     * @description when data edited
     */
    "edited",
]);

/**
 * Define refs
 */
const timer = ref(null); // Throttle flag

/**
 * Define computed
 */
const size = computed(() => parseSize(props.size));

/**
 * Add button click handler
 * @param {object} e click event object
 */
function addButtonClickHandler(e) {
    if (timer.value) return;
    emit("add", e);
    timer.value = setTimeout(function () {
        timer.value = null;
    }, 1000);
}
</script>

<style scoped>
.nl-avatar-group {
    display: flex;
    align-items: center;

    &.nl-avatar-group--horizontal {
        flex-direction: row;

        &:deep(.nl-avatar) {
            margin: 0;
            margin-right: -12px !important;

            &:first-of-type {
                margin-left: -2px;
            }

            &:nth-last-child(1) {
                margin-right: 0px !important;
            }
        }
    }

    &.nl-avatar-group--vertical {
        flex-direction: column;

        &:deep(.nl-avatar) {
            margin: 0;
            margin-bottom: -12px;

            &:first-of-type {
                margin-top: -2px;
            }

            &:nth-last-child(1) {
                margin-bottom: 0px;
            }
        }
    }

    & > .nl-avatar-group__add-button {
        aspect-ratio: 1;
        box-sizing: border-box;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        width: v-bind(size);
        height: v-bind(size);

        border: 2px solid #e1e1e1;
        border-radius: 50%;
        background-color: transparent;

        &:hover {
            filter: brightness(0.8);
        }

        & > .iconfont {
            color: #8e8e96;
            font-size: calc(v-bind(size) / 2);
            font-weight: bold;
        }
    }
}
</style>
