<template>
    <div class="nl-avatar-group" :style="styles">
        <template v-for="(item, idx) in data">
            <nl-avatar
                v-if="item"
                shape="round"
                :size="size"
                :icon="item.icon"
                :src="item.src"
                :alt="item.alt"
                :fit="item.fit"
                :style="{ zIndex: data.length - idx }" />
        </template>
        <slot />
        <nl-avatar v-if="addable" theme="add" :size="size" icon="icon-plus" shape="round" @click.stop="addAvatarHandler" />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { avatarGroupProps, avatarGroupEmits } from "./avatar-group";
import { addUnit } from "@nice-layout/utils/parsers";
import "../style/avatar-group.css";

/**
 * Define options, props and emit
 */
defineOptions({ name: "NlAvatarGroup" });
const props = defineProps(avatarGroupProps);
const emit = defineEmits(avatarGroupEmits);

/**
 * Define refs
 */
const timer = ref(null); // Throttle flag

/**
 * Define styles
 */
const styles = computed(() => {
    return {
        "--avatar-indentation": addUnit(props.indentation),
    };
});

/**
 * Add button click handler
 * @param {object} e click event object
 */
function addAvatarHandler(e) {
    if (timer.value) return;
    emit("add", e);
    timer.value = setTimeout(function () {
        timer.value = null;
    }, 1000);
}
</script>
