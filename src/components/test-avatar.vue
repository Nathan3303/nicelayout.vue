<template>
    <nl-div>
        <nl-avatar-group :avatars="avatars"></nl-avatar-group>
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
