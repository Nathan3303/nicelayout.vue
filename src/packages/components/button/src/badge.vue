<template>
    <div :class="classList">
        <slot></slot>
        <sup v-if="!hidden && (content || dot)" v-text="content"></sup>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { badgeProps } from "./badge";
import { parseTheme } from "@nice-layout/utils/parsers";
import { isString } from "@nice-layout/utils/utils";
import "../style/badge.css";

/**
 * Define options
 */
defineOptions({ name: "NlBadge" });
const props = defineProps(badgeProps);

/**
 * Define classList
 */
const classList = computed(() => {
    let list = [];
    list = ["nl-badge", ...parseTheme(props.theme)];
    if (props.dot) list.push("nl-badge--dot");
    return list;
});

/**
 * Define content
 */
const content = computed(() => {
    if (props.dot) return "";
    if (isString(props.value)) return props.value;
    if (props.value > props.max) return `${props.max}+`;
    return props.value;
});
</script>
