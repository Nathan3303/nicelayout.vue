<template>
    <ul class="nl-breadcrumb">
        <li v-for="(item, idx) in data" :key="idx">
            <a :href="item.href || undefined">{{ item.name }}</a>
        </li>
    </ul>
</template>

<script setup>
import { ref } from "vue";

/**
 * Defien options
 */
defineOptions({ name: "NlBreadcrumb" });

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description breadcrumb data
     */
    data: {
        type: Array,
        default: [],
    },
    /**
     * @description breadcrumb seperator
     */
    seperator: {
        type: String,
        default: "/",
    },
});

/**
 * Define refs
 */
const seperatorStyle = ref("'" + props.seperator + "'");
</script>

<style scoped>
.nl-breadcrumb {
    --link-font-color: black;
    --current-font-color: gray;

    --color: black;
    --font-size: 14px;
    --font-weight: normal;
    --font-family: "Consolas";

    user-select: none;
    list-style: none;

    display: flex;
    flex-wrap: wrap;

    & > li {
        display: flex;
        align-items: center;

        font-weight: bold;

        & > a {
            color: var(--link-font-color);
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        &:not(:last-child)::after {
            margin: 0 6px;
            content: v-bind(seperatorStyle);
            font-family: "Consolas";
        }
    }

    & > li:last-of-type {
        & > a {
            color: var(--current-font-color);

            &:hover {
                text-decoration: none;
                cursor: default;
            }
        }
    }
}
</style>
