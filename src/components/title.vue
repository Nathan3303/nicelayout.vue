<template>
    <div class="title-bar">
        <h1 v-if="title" class="title-bar__title">{{ title }}</h1>
        <p v-if="subTitle" class="title-bar__sub-title">{{ subTitle }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Define options
 */
defineOptions({ name: 'TitleBar' })

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description Title
     */
    title: String,
    /**
     * @description Sub title (Forexample description)
     */
    subTitle: String,
    /**
     * @description Font size of title
     */
    size: {
        type: String,
        default: 'normal',
        validator: (v) => ['large', 'medium', 'normal', 'small', 'tiny'].includes(v)
    }
})

/**
 * Define computed
 */
const fontSize = computed(
    () => ({ large: 42, medium: 32, normal: 24, small: 18, tiny: 14}[props.size] + 'px')
)
</script>

<style scoped>
.title-bar {
    --title-font-color: #090048;
    --sub-title-font-color: #9998b1;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 4px;

    /* flex: 1 1 auto; */
    width: 100%;

    font-size: v-bind(fontSize);
    font-weight: bold;
    user-select: none;

    & > .title-bar__title {
        margin: 0;
        font-size: inherit;
        color: var(--title-font-color);
        font-weight: inherit;
    }

    & > .title-bar__sub-title {
        margin: 0;
        font-size: 12px;
        color: var(--sub-title-font-color);
        font-weight: inherit;
    }
}
</style>
