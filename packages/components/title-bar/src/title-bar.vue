<template>
    <div class="title-bar">
        <h1 v-if="title" class="title-bar__title">
            <span>{{ title }}</span>
            <nl-button icon="icon-chuangzuo" theme="text" shape="no-shape" />
        </h1>
        <p v-if="subTitle" class="title-bar__sub-title">{{ subTitle }}</p>
    </div>
</template>

<script setup>
import { computed } from "vue";
import "./style/title-bar.css";

defineOptions({ name: "TitleBar" });
const props = defineProps({
    title: String,
    subTitle: String,
    size: {
        type: String,
        default: "normal",
        validator: (v) => ["large", "medium", "normal", "small", "tiny"].includes(v),
    },
});

const fontSize = computed(() => ({ large: 42, medium: 34, normal: 28, small: 20, tiny: 16 }[props.size] + "px"));
</script>
