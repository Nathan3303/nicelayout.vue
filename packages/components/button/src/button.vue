<template>
    <button :class="classList" :disabled="disabled" :title="title">
        <i v-if="loading" class="nl-button__loading-icon iconfont" :class="loadingIcon"></i>
        <i v-else-if="icon" class="iconfont" :class="icon"></i>
        <span v-if="$slots.default" class="nl-button__text">
            <slot></slot>
        </span>
    </button>
</template>

<script setup>
import { computed } from "vue";
import { buttonProps } from "./button";
import { parseTheme } from "@nice-layout/utils/parsers";
import "../style/button.css";

/**
 * Define options
 */
defineOptions({ name: "NlButton" });
const props = defineProps(buttonProps);

/**
 * Define classList
 */
const classList = computed(() => {
    let list = [];
    list = ["nl-button", ...parseTheme(props.theme, "nl-button")];
    list.push(`nl-button--${props.shape}`);
    if (props.disabled) list.push("nl-button--disabled");
    return list;
});
</script>
