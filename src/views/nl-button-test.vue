<template>
    <div class="nl-button-test-wrapper">
        <h1>nl-button & nl-badge</h1>
        <div class="flex">
            <p>Shape</p>
            <nl-button shape="square">square</nl-button>
            <nl-button shape="round">round</nl-button>
            <nl-button shape="no-border">no-border</nl-button>
            <nl-button shape="round-no-border">round-no-border</nl-button>
            <nl-button shape="no-shape">no-shape</nl-button>
        </div>
        <div class="flex">
            <p>Icon</p>
            <nl-button icon="icon-theme" shape="round"></nl-button>
            <nl-button icon="icon-search" shape="round">Search</nl-button>
            <nl-button icon="icon-search" shape="round">
                Search
                <i class="iconfont icon-arrow-right"></i>
            </nl-button>
        </div>
        <div class="flex">
            <p>Disabled</p>
            <nl-button icon="icon-search" disabled>Search</nl-button>
        </div>
        <div class="flex">
            <p>Loading & LoadingIcon</p>
            <nl-button loading>Loading</nl-button>
            <nl-button loading loading-icon="icon-target">Loading</nl-button>
        </div>
        <div class="flex">
            <p>Theme:text(build-in)</p>
            <nl-button theme="text">Calendar</nl-button>
            <nl-button theme="text" icon="icon-calendar">Calendar</nl-button>
            <nl-button theme="text" shape="round">Calendar</nl-button>
            <nl-button theme="text" shape="no-shape">Calendar</nl-button>
            <nl-button theme="text" disabled>Calendar</nl-button>
        </div>
        <div class="flex">
            <p>Theme:icon-only(build-in)</p>
            <nl-button theme="icon-only" icon="icon-mail" shape="no-border" />
            <nl-button theme="icon-only" icon="icon-search" shape="no-shape" />
        </div>
        <hr style="width: 100%" />
        <div class="flex">
            <p>Value</p>
            <nl-badge :value="2">
                <nl-button icon="icon-filter">Filter</nl-button>
            </nl-badge>
            <nl-badge :value="2">
                <nl-button theme="icon-only" icon="icon-mail" shape="no-shape" />
            </nl-badge>
        </div>
        <div class="flex">
            <p>Value & Max</p>
            <nl-badge :value="1000" :max="999">
                <nl-button icon="icon-filter">Filter</nl-button>
            </nl-badge>
        </div>
        <div class="flex">
            <p>Dot</p>
            <nl-badge dot>
                <nl-button icon="icon-theme" />
            </nl-badge>
        </div>
        <hr style="width: 100%" />
        <div class="flex">
            <p>Special:switch-button</p>
            <nl-button
                :theme="likeButton.state ? 'liked' : 'unliked'"
                :icon="likeButton.state ? 'icon-heart-fill' : 'icon-heart'"
                :loading="likeButton.loading"
                @click="likeButtonHandler">
                {{ likeButton.state ? "Unlike" : "Like" }}
            </nl-button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

/**
 * Import components
 */
import NlButton from "../components/button/src/button.vue";
import NlBadge from "../components/button/src/badge.vue";

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
