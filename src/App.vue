<template>
    <div id="app">
        <nl-div>
            <nl-button icon="icon-search">Search</nl-button>
            <nl-button icon="icon-search" shape="round">Search</nl-button>
            <nl-button icon="icon-search" theme="icon-only">Search</nl-button>
            <nl-button icon="icon-search" theme="icon-only" shape="round">Search</nl-button>
        </nl-div>
        <nl-div>
            <nl-button @clicked="buttinClicked"> Click {{ num }} </nl-button>
            <nl-button @clicked="buttinClicked" shape="round"> Click {{ num }} </nl-button>
            <nl-button @clicked="buttinClicked" disabled> Click {{ num }} </nl-button>
        </nl-div>
        <nl-div>
            <nl-button loading>Loading</nl-button>
            <nl-button loading loading-icon="icon-target" shape="round">Loading</nl-button>
        </nl-div>
        <nl-div>
            <nl-button
                :theme="isLiked ? 'liked' : ''"
                :icon="isLiked ? `icon-heart-fill` : `icon-heart`"
                :loading="LikeButtonLoadingState"
                @clicked="LikeButtonClicked">
                {{ isLiked ? "Unlike" : "Like" }}
            </nl-button>
            <nl-button
                :theme="[isChecked ? 'checked' : '', 'icon-only']"
                shape="round"
                :icon="isChecked ? `icon-checked-fill` : `icon-unchecked`"
                :loading="checkButtonLoadingState"
                @clicked="checkButtonClicked">
            </nl-button>
        </nl-div>
        <nl-div>
            <nl-button theme="text">Target: 0 / 2</nl-button>
            <nl-button theme="text" shape="round">Target: 0 / 2</nl-button>
        </nl-div>
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import components
 */
import NlDiv from "./components/NlDiv.vue";
import NlButton from "./components/NlButton.vue";

/**
 * Define refs
 */
const LikeButtonLoadingState = ref(false);
const checkButtonLoadingState = ref(false);
const isLiked = ref(false);
const isChecked = ref(false);
const num = ref(0);

/**
 * Define emit functions
 */
function LikeButtonClicked() {
    LikeButtonLoadingState.value = true;
    setTimeout(() => {
        isLiked.value = !isLiked.value;
        LikeButtonLoadingState.value = false;
    }, 1000);
}
function checkButtonClicked() {
    checkButtonLoadingState.value = true;
    setTimeout(() => {
        isChecked.value = !isChecked.value;
        checkButtonLoadingState.value = false;
    }, 1000);
}
const buttinClicked = () => num.value++;
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &:deep(.nl-button--liked) {
        border-color: pink;
        background-color: pink;
    }

    &:deep(.nl-button--checked) {
        border-color: rgb(192, 242, 255);
        background-color: rgb(192, 242, 255);
    }
}
</style>
