<template>
    <div class="word-counter">{{ wordCounterText }}</div>
</template>

<script setup>
import { computed } from "vue";

/**
 * Define options, props
 */
defineOptions({ name: "WordCounter" });
const props = defineProps({
    /**
     * @description display mode of word counter
     */
    mode: {
        type: String,
        default: "word-limit",
        validator: (v) => ["word-limit", "word-left", "both"].includes(v),
    },
    /**
     * @description text length
     */
    length: Number,
    /**
     * @description max length
     */
    maxlength: [String, Number],
});

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
