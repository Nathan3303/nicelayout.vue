<template>
    <div id="app">
        <nl-button
            :theme="isLiked && 'liked'"
            :icon="isLiked ? `icon-heart-fill` : `icon-heart`"
            :loading="LikeButtonLoadingState"
            @clicked="LikeButtonClicked">
            {{ isLiked ? "Unlike" : "Like" }}
        </nl-button>
        <nl-button
            :theme="isChecked && 'liked'"
            :icon="isChecked ? `icon-checked-fill` : `icon-unchecked`"
            :loading="checkButtonLoadingState"
            @clicked="checkButtonClicked">
            {{ isChecked ? "Uncheck" : "check" }}
        </nl-button>
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import components
 */
// import NlDiv from "./components/NlDiv.vue";
// import NlTextarea from "./components/NlTextarea.vue";
// import NlInput from "./components/NlInput.vue";
import NlButton from "./components/NlButton.vue";

/**
 * Define refs
 */
const LikeButtonLoadingState = ref(false);
const checkButtonLoadingState = ref(false);
const isLiked = ref(false);
const isChecked = ref(false);

function LikeButtonClicked() {
    LikeButtonLoadingState.value = true;
    setTimeout(() => {
        isLiked.value = !isLiked.value;
        LikeButtonLoadingState.value = false;
    }, 300);
}

function checkButtonClicked() {
    checkButtonLoadingState.value = true;
    setTimeout(() => {
        isChecked.value = !isChecked.value;
        checkButtonLoadingState.value = false;
    }, 300);
}

/**
 * Watch input value
 */
// watch(
//     () => textareaValue.value,
//     (newValue) => console.log(newValue)
// );
</script>

<style scoped>
#app {
    display: flex;
    /* flex-direction: column; */
    gap: 16px;

    & >>> .nl-button--liked {
        border-color: pink;
        background-color: pink;
    }
}
</style>
