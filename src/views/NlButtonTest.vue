<template>
    <div class="nl-button-test-wrapper">
        <h1>nl-button</h1>
        <div class="flex">
            <nl-button shape="square">shape=square</nl-button>
            <nl-button shape="round">shape=round</nl-button>
            <nl-button shape="no-border">shape=no-border</nl-button>
            <nl-button shape="round-no-border">shape=round-no-border</nl-button>
        </div>
        <div class="flex">
            <nl-button>Search</nl-button>
            <nl-button icon="icon-search">Search</nl-button>
            <nl-button icon="icon-search" shape="round">
                Search
                <i class="iconfont icon-arrow-right"></i>
            </nl-button>
        </div>
        <div class="flex">
            <nl-button theme="text">theme=text</nl-button>
            <nl-button theme="text" icon="icon-calendar">theme=text, with-icon</nl-button>
            <nl-button theme="text" icon="icon-calendar" shape="round">theme=text, with-iconm, round</nl-button>
        </div>
        <div class="flex">
            <nl-button icon="icon-search" disabled>Disabled</nl-button>
            <nl-button icon="icon-search" shape="round" loading>Loading</nl-button>
        </div>
        <div class="flex">
            <nl-button
                :theme="['default', likeButton.state ? 'liked' : 'unliked']"
                :icon="likeButton.state ? 'icon-heart-fill' : 'icon-heart'"
                :loading="likeButton.loading"
                @clicked="likeButtonHandler">
                {{ likeButton.state ? "Unlike" : "Like" }}
            </nl-button>
            <nl-button
                shape="round"
                :theme="['default', likeButton.state ? 'liked' : 'unliked']"
                :icon="likeButton.state ? 'icon-heart-fill' : 'icon-heart'"
                :loading="likeButton.loading"
                @clicked="likeButtonHandler">
                {{ likeButton.state ? "Unlike" : "Like" }}
            </nl-button>
            <nl-button
                shape="round"
                :theme="['icon-only', likeButton.state ? 'liked' : 'unliked']"
                :icon="likeButton.state ? 'icon-heart-fill' : 'icon-heart'"
                :loading="likeButton.loading"
                @clicked="likeButtonHandler">
                {{ likeButton.state ? "Unlike" : "Like" }}
            </nl-button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

/**
 * Import NlButton.vue
 */
import NlButton from "../components/NlButton.vue";

/**
 * Define options
 */
defineOptions({ name: "NlButtonTest" });

/**
 * Define reactives
 */
const likeButton = reactive({
    timer: null,
    state: false,
    loading: false,
});

/**
 * Define emit functions
 */
function likeButtonHandler() {
    likeButton.loading = true;
    if (likeButton.timer) return;
    likeButton.timer = setTimeout(function () {
        likeButton.state = !likeButton.state;
        likeButton.loading = false;
        likeButton.timer = null;
    }, 1600);
}
</script>

<style scoped>
.nl-button-test-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-family: "Consolas";

    & > .flex {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 12px;
    }

    &:deep(.nl-button--liked) {
        background: pink;
        border-color: pink;

        color: rgb(226, 93, 115);
    }
}
</style>
