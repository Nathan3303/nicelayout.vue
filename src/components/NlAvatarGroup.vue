<template>
    <div class="nl-avatar-group">
        <template v-for="(item, idx) in data">
            <nl-avatar
                v-if="item"
                :icon="item.icon"
                :size="size"
                :shape="shape"
                :src="item.src"
                :alt="item.alt"
                :title="item.title"
                :fit="item.fit"
                :white-border="2"
                :style="{ zIndex: data.length - idx }"
            ></nl-avatar>
        </template>
        <button v-if="addable" class="nl-avatar-group__add-button" @click="addButtonClickHandler">
            <i class="iconfont icon-plus"></i>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { validateSize, validateShape } from './validators'
import { parseSize } from './parsers'

/**
 * Import nl-avatar
 */
import NlAvatar from './NlAvatar.vue'

/**
 * Define options
 */
defineOptions({ name: 'AvatarGroup' })

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description avatar size
     */
    size: {
        type: [String, Number],
        default: 'normal',
        validator: (v) => validateSize(v)
    },
    /**
     * @description avatar shape
     */
    shape: {
        type: String,
        default: 'circle',
        validator: (v) => validateShape(v)
    },
    /**
     * @description avatar group is addable or not
     */
    addable: Boolean,
    /**
     * @description avatar group data (avatars)
     */
    data: Array
})

/**
 * Define emit
 */
const emit = defineEmits([
    /**
     * @description when add button clicked
     */
    'onAdd',
    /**
     * @description when data edited
     */
    'onEdited'
])

/**
 * Define refs
 */
const timer = ref(null) // Throttle flag
const sizeStyle = ref(parseSize(props.size))

/**
 * Add button click handler
 * @param {object} e click event object
 */
function addButtonClickHandler(e) {
    if (timer.value) return
    emit('onAdd', e)
    timer.value = setTimeout(function () {
        timer.value = null
    }, 1000)
}
</script>

<style scoped>
.nl-avatar-group {
    display: flex;
    align-items: center;

    & > .nl-avatar-group__add-button {
        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;
        width: v-bind(sizeStyle);
        height: v-bind(sizeStyle);

        border: 1px dashed #c3c4d0;
        border-radius: 50%;
        background-color: transparent;
        color: #8e8e96;
        cursor: pointer;

        &:hover {
            filter: brightness(0.8);
        }

        & > i {
            font-size: 14px;
            font-weight: bold;
        }
    }

    &:deep(.nl-avatar) {
        margin-right: -12px !important;

        &:first-of-type {
            margin-left: -2px;
        }

        &:nth-last-child(1) {
            margin-right: 0px !important;
        }
    }
}
</style>
