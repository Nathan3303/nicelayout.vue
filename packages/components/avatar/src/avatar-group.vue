<template>
    <div class="nl-avatar-group">
        <template v-for="(avatar, idx) in avatars">
            <nl-avatar
                v-if="avatar"
                shape="round"
                :size="size"
                :icon="avatar.icon"
                :src="avatar.src"
                :alt="avatar.alt"
                :fit="avatar.fit"
                :style="{ zIndex: avatars.length - idx }" />
        </template>
        <nl-avatar v-if="addable" theme="add" :size="size" icon="icon-plus" shape="round" @click.stop="addAvatarHandler" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { avatarGroupProps, avatarGroupEmits } from "./avatar-group";
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
