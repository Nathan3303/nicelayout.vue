<template>
    <div :class="classes" @click="clickHandler" :style="wrapperStyle">
        <img v-if="src && !loadError" :src="src" :alt="alt" @error="errorHandler" :style="imageStyle" />
        <i v-else-if="icon" class="iconfont" :class="icon" :style="iconStyle"></i>
        <slot v-else />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { avatarProps, avatarEmits } from "./avatar";
import { parseSize, parseTheme } from "@/utils/parsers";
import "../style/avatar.css";

/**
 * Define options, props and emit
 */
defineOptions({ name: "NlAvatar" });
const props = defineProps(avatarProps);
const emit = defineEmits(avatarEmits);

/**
 * Define reactive variables
 */
const loadError = ref(false);
const size = computed(() => parseSize(props.size));

/**
 * Define styles
 */
const wrapperStyle = computed(() => ({ "--size": size.value }));
const imageStyle = computed(() => ({ objectFit: props.fit }));
const iconStyle = computed(() => ({ fontSize: `calc(${size.value} / 2.5)` }));

/**
 * Define classes
 */
const classes = computed(() => {
    const { theme, shape } = props;
    let classArray = [];
    classArray = ["nl-avatar", ...parseTheme(theme, "nl-avatar")];
    classArray.push("nl-avatar--" + shape);
    // console.log(classArray);
    return classArray;
});

/**
 * Avatar image error handler
 * @param { object } e error event object
 */
function errorHandler(e) {
    loadError.value = true;
    emit("error", e);
}
</script>
