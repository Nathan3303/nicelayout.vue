<template>
    <div class="line">
        <div class="line__title">
            <p>{{ lines.title }}</p>
        </div>
        <div class="line__cards">
            <card v-for="card in lines.cards" :card="card" />
        </div>
    </div>
</template>

<script setup>
import card from "./card.vue";
import "../style/line.css";

defineProps({ lines: Object });
</script>
