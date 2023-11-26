<template>
    <div class="test">
        <nl-button icon="icon-plus" @click="goEditing">Add to do</nl-button>
        <nl-textarea ref="descInputer" v-model="description" autosize></nl-textarea>
    </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const isEditing = ref(false);
const description = ref("");
const descInputer = ref();

function goEditing() {
    isEditing.value = true;
    nextTick(() => descInputer.value.$refs.textarea.focus());
}
</script>

<style scoped>
.test {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>
