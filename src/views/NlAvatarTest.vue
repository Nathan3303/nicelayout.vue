<template>
    <div class="nl-avatar-test-wrapper">
        <h1>nl-avatar</h1>
        <div class="flex">
            <nl-avatar size="small" />
            <nl-avatar size="normal" />
            <nl-avatar size="medium" />
            <nl-avatar size="large" />
            <nl-avatar shape="round" size="small" />
            <nl-avatar shape="round" size="normal" />
            <nl-avatar shape="round" size="medium" />
            <nl-avatar shape="round" size="large" />
        </div>
        <div class="flex">
            <nl-avatar size="small">N</nl-avatar>
            <nl-avatar size="normal">N</nl-avatar>
            <nl-avatar size="medium" alt="N"></nl-avatar>
            <nl-avatar size="large" alt="N"></nl-avatar>
            <nl-avatar shape="round" size="small">A</nl-avatar>
            <nl-avatar shape="round" size="normal">A</nl-avatar>
            <nl-avatar shape="round" size="medium" alt="A"></nl-avatar>
            <nl-avatar shape="round" size="large" alt="A"></nl-avatar>
        </div>
        <div class="flex">
            <nl-avatar src="/images/users/nathan.png" size="small" />
            <nl-avatar src="/images/users/nathan.png" size="normal" />
            <nl-avatar src="/images/users/nathan.png" size="medium" />
            <nl-avatar src="/images/users/nathan.png" size="large" />
            <nl-avatar src="/images/users/aleksander.png" shape="round" size="small" />
            <nl-avatar src="/images/users/aleksander.png" shape="round" size="normal" />
            <nl-avatar src="/images/users/aleksander.png" shape="round" size="medium" />
            <nl-avatar src="/images/users/aleksander.png" shape="round" size="large" />
        </div>
        <div class="flex">
            <nl-avatar-group :data="avatars" size="small" addable />
            <nl-avatar-group :data="avatars" size="normal" addable />
            <nl-avatar-group :data="avatars" size="medium" addable />
            <nl-avatar-group :data="avatars" size="large" addable />
        </div>
        <div class="flex">
            <nl-avatar-group :data="avatars" direction="vertical" size="small" addable />
            <nl-avatar-group :data="avatars" direction="vertical" size="normal" addable />
            <nl-avatar-group :data="avatars" direction="vertical" size="medium" addable />
            <nl-avatar-group :data="avatars" direction="vertical" size="large" addable />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

/**
 * Import component
 */
import NlAvatar from "../components/NlAvatar.vue";
import NlAvatarGroup from "../components/NlAvatarGroup.vue";

/**
 * Define options
 */
defineOptions({ name: "NlAvatarTest" });

/**
 * Define refs
 */
const avatars = ref([
    {
        src: "/images/users/nathan.png",
        alt: "N",
        title: "nathan",
    },
    {
        src: "/images/users/aleksander.png",
        alt: "A",
        title: "aleksander",
    },
]);
</script>

<style scoped>
.nl-avatar-test-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-family: "Consolas";

    & > .flex {
        display: flex;
        align-items: center;
        gap: 12px;
    }
}
</style>
