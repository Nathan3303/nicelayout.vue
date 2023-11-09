<template>
    <component
        :is="disabled ? 'a' : tag"
        :class="classList"
        :href="disabled || !href ? undefined : href"
        :to="to || href || undefined"
        active-class="nl-link--actived">
        <i v-if="icon" class="nl-link__icon" :class="icon && `iconfont ${icon}`"></i>
        <slot v-else name="icon"></slot>
        <slot></slot>
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
    classList = ["nl-link", ...parseTheme(props.theme, "nl-link")];
    if (props.actived) classList.push("nl-link--actived");
    if (props.disabled) classList.push("nl-link--disabled");
    // console.log(classList)
    return classList;
});
</script>
