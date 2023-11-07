<template>
    <component :is="tag" :class="classList" :href="disabled || !href ? undefined : href">
        <i v-if="icon" class="nl-link__icon" :class="icon && `iconfont ${icon}`"></i>
        <slot v-else name="icon"></slot>
        <span class="nl-link__text"><slot></slot></span>
    </component>
</template>

<script setup>
import { computed } from "vue";
import { linkProps } from "./link";
import { parseTheme } from "@nice-layout/utils/parsers";
import "../style/link.css";

defineOptions({ name: "NlLink" });
const props = defineProps(linkProps);

/**
 * Define class list
 */
const classList = computed(() => {
    let classList = [];
    classList = ["nl-link", ...parseTheme(props.theme)];
    if (props.actived) classList.push("nl-link--actived");
    if (props.disabled) classList.push("nl-link--disabled");
    // console.log(classList)
    return classList;
});
</script>
