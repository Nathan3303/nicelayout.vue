<template>
    <div id="app">
        <nl-button @clicked="buttinClicked"> Click {{ num }} </nl-button>
        <nl-button
            :theme="isLiked ? 'liked' : ''"
            :icon="isLiked ? `icon-heart-fill` : `icon-heart`"
            :loading="LikeButtonLoadingState"
            @clicked="LikeButtonClicked">
            {{ isLiked ? "Unlike" : "Like" }}
        </nl-button>
        <nl-button
            :theme="isChecked ? 'checked' : ''"
            :icon="isChecked ? `icon-checked-fill` : `icon-unchecked`"
            :loading="checkButtonLoadingState"
            @clicked="checkButtonClicked">
            {{ isChecked ? "Uncheck" : "check" }}
        </nl-button>

        <nl-button icon="icon-search" theme="round"></nl-button>
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
const num = ref(0);

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

function buttinClicked() {
    num.value++;
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

    & >>> .nl-button--checked {
        border-color: rgb(192, 242, 255);
        background-color: rgb(192, 242, 255);
    }
}
</style>
