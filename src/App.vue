<template>
    <div id="app">
        <nl-input-test />
        <nl-button-test />
        <nl-progress-test />
        <nl-avatar-test />
        <nl-timeline-test />
    </div>
</template>

<script setup>
import NlInputTest from "./views/nl-input-test.vue";
import NlButtonTest from "./views/nl-button-test.vue";
import NlProgressTest from "./views/nl-progress-test.vue";
import NlAvatarTest from "./views/nl-avatar-test.vue";
import NlTimelineTest from "./views/nl-timeline-test.vue";
</script>

<style scoped>
#app {
    box-sizing: border-box;
    padding: 12px;
}
</style>
