<template>
    <p>{{ list }}</p>
    <nl-div>
        <nl-input type="number" v-model="inputValue"></nl-input>
        <nl-button @click="clickHandler">Go</nl-button>
    </nl-div>
</template>

<script setup>
import { ref } from "vue";
const inputValue = ref(0);
const list = [1, 3, 5, 7, 10, 14, 16, 18, 21, 23, 28];

function clickHandler() {
    const searchResult = binarySearch(list, parseInt(inputValue.value));
    console.log(searchResult);
}

function binarySearch(list, value) {
    let low = 0,
        high = list.length - 1,
        mid,
        res;
    while (low <= high) {
        mid = parseInt((low + high) / 2);
        if (value === list[mid]) return mid;
        if (value < list[mid]) {
            high = mid - 1;
            res = [high, mid];
        } else {
            low = mid + 1;
            res = [mid, low];
        }
    }
    return res;
}
</script>
