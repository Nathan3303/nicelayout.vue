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
            <nl-button icon="icon-search" shape="round"></nl-button>
            <nl-button icon="icon-search" shape="round">
                Search
                <i class="iconfont icon-arrow-right"></i>
            </nl-button>
            <nl-button icon="icon-search" disabled>Search(disabled)</nl-button>
        </div>
        <div class="flex">
            <nl-button theme="text">Text button</nl-button>
            <nl-button theme="text" icon="icon-calendar">Text button</nl-button>
            <nl-button theme="text" icon="icon-calendar" shape="round">Text button</nl-button>
            <nl-button theme="text" icon="icon-calendar" shape="no-shape">Text button</nl-button>
            <nl-button theme="text" icon="icon-calendar" disabled>Text button</nl-button>
        </div>
        <div class="flex">
            <nl-button theme="icon-only" icon="icon-mail" shape="no-border" />
            <nl-button theme="icon-only" icon="icon-search" shape="no-shape" />
        </div>
        <div class="flex">
            <nl-button loading>Loading</nl-button>
            <nl-button loading loading-icon="icon-target">Loading</nl-button>
        </div>
        <div class="flex">
            <nl-button
                :theme="likeButton.state ? 'liked' : 'unliked'"
                :icon="likeButton.state ? 'icon-heart-fill' : 'icon-heart'"
                :loading="likeButton.loading"
                @clicked="likeButtonHandler">
                {{ likeButton.state ? "Unlike" : "Like" }}
            </nl-button>
            <nl-button
                shape="round"
                :theme="likeButton.state ? 'liked' : 'unliked'"
                :icon="likeButton.state ? 'icon-heart-fill' : 'icon-heart'"
                :loading="likeButton.loading"
                @clicked="likeButtonHandler">
                {{ likeButton.state ? "Unlike" : "Like" }}
            </nl-button>
            <nl-button
                shape="round"
                :theme="likeButton.state ? 'liked' : 'unliked'"
                :icon="likeButton.state ? 'icon-heart-fill' : 'icon-heart'"
                :loading="likeButton.loading"
                @clicked="likeButtonHandler">
            </nl-button>
        </div>
        <div class="flex" style="align-items: end">
            <nl-badge :value="2">
                <nl-button icon="icon-filter">Filter</nl-button>
            </nl-badge>
            <nl-badge :value="1000" :max="999">
                <nl-button icon="icon-filter">Filter</nl-button>
            </nl-badge>
            <nl-badge dot>
                <nl-button icon="icon-filter">Filter</nl-button>
            </nl-badge>
            <nl-badge :value="2">
                <nl-button theme="icon-only" icon="icon-mail" shape="no-shape" />
            </nl-badge>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

/**
 * Import components
 */
import NlButton from "../components/NlButton.vue";
import NlBadge from "../components/NlBadge.vue";

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
