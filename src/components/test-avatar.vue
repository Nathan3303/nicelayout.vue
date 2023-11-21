<template>
    <nl-div align-items="center">
        <nl-avatar-group :data="avatars" :indentation="10" :size="48" addable />
        <nl-avatar shape="round" icon="icon-search" />
        <nl-avatar shape="round">N</nl-avatar>
    </nl-div>
</template>

<script setup>
import { ref } from "vue";

const avatars = ref([
    {
        src: "/images/users/nathan.png",
        alt: "nathan",
    },
    {
        src: "/images/users/aleksander.png",
        alt: "aleksander",
    },
]);
</script>
