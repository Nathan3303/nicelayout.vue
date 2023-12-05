<template>
    <div class="nl-title" :style="titleStyles">
        <div v-if="title || $slots.title" class="nl-title__title">
            <slot name="beforeTitle"></slot>
            <slot name="title">
                <span>{{ title }}</span>
            </slot>
            <slot name="afterTitle"></slot>
        </div>
        <div v-if="subTitle || $slots.subTitle" class="nl-title__sub-title">
            <slot name="subTitle">
                {{ subTitle }}
            </slot>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { isNumber } from "@nice-layout/utils/utils";
import "../style/title.css";

defineOptions({ name: "NlTitle" });
const props = defineProps({
    title: String,
    subTitle: String,
    size: {
        type: String,
        default: "normal",
        validator: (v) =>
            ["huge", "large", "medium", "normal", "small", "tiny"].includes(v),
    },
    gap: Number,
    keepSubtitleSize: [Boolean, Number],
});

const fontSize = computed(() => {
    return { huge: 48, large: 42, medium: 36, normal: 30, small: 24, tiny: 18 }[
        props.size
    ];
});

const titleStyles = computed(() => {
    const { gap, keepSubtitleSize } = props;
    let subTitleSize = 12;
    if (keepSubtitleSize) {
        if (isNumber(keepSubtitleSize)) subTitleSize = keepSubtitleSize;
    } else {
        subTitleSize = fontSize.value / 3 + 8;
    }
    return {
        "--gap": gap && gap + "px",
        "--title-font-size": fontSize.value + "px",
        "--sub-title-font-size": subTitleSize + "px",
    };
});
</script>
