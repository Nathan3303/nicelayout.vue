<template>
    <div class="nl-avatar-test">
        <h1>nl-avatar</h1>
        <div class="flex">
            <p>Shape</p>
            <nl-avatar icon="icon-tupian" />
            <nl-avatar icon="icon-tupian" shape="round" />
        </div>
        <div class="flex">
            <p>Size</p>
            <nl-avatar icon="icon-tupian" shape="round" />
            <nl-avatar icon="icon-tupian" shape="round" size="medium" />
            <nl-avatar icon="icon-tupian" shape="round" size="large" />
            <nl-avatar icon="icon-tupian" shape="round" size="64px" />
        </div>
        <div class="flex">
            <p>Icon / Text / Image</p>
            <nl-avatar icon="icon-theme" shape="round" />
            <nl-avatar shape="round">A</nl-avatar>
            <nl-avatar src="/images/users/nathan.png" shape="round" />
        </div>
        <div class="flex">
            <p>Group</p>
            <nl-avatar-group :avatars="avatars" addable />
            <nl-avatar-group :avatars="avatars" size="medium" addable />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

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
.nl-avatar-test {
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
