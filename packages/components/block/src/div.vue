<template>
    <div class="nl-div" :style="styles">
        <slot></slot>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { divProps } from "./div";
import { addUnit } from "@nice-layout/utils/parsers";
import "../style/div.css";

/**
 * Define options, props
 */
defineOptions({ name: "NlDiv" });
const props = defineProps(divProps);

/**
 * Define computed
 */
const styles = computed(() => {
    return {
        "--flex-direction": props.vertical ? "column" : undefined,
        "--align-items": props.alignItems,
        "--justify-content": props.justifyContent,
        "--flex-wrap": props.flexWrap,
        "--gap": addUnit(props.gap),
        "--flex": props.flex,
        "--width": addUnit(props.width),
        "--height": addUnit(props.height),
    };
});
</script>
