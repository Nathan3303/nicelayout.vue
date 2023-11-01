<template>
    <div class="word-counter">{{ wordCounterText }}</div>
</template>

<script setup>
import { computed } from "vue";
import { wordCounterProps } from "./word-counter";

/**
 * Define options, props
 */
defineOptions({ name: "WordCounter" });
const props = defineProps(wordCounterProps);

/**
 * Define computed
 */
const wordCounterText = computed(() => {
    const { mode, maxlength, length } = props;
    // console.log(mode, maxlength, length);
    if (mode === "off") return false;
    let result = "";
    const max = maxlength !== -1 && parseInt(maxlength);
    if (mode !== "word-left") result += `${length} / ${max || "-"}`;
    if (mode === "both") result += " , ";
    if (mode !== "word-limit") result += max ? max - length : "-";
    return result;
});
</script>
