<template>
    <nl-div>
        <nl-input type="number" v-model="inputValue" clearable></nl-input>
        <nl-button @click="clickHandler">Go</nl-button>
    </nl-div>
</template>

<script setup>
import { ref } from "vue";
// import { NlDiv, NlInput, NlButton } from "@nice-layout/components";

/**
 * Define refs
 */
const inputValue = ref();

/**
 * Go button click handler
 */
function clickHandler() {
    const totalPages = parseInt(inputValue.value);
    const countResult = countTimesOf0To9(totalPages);
    console.log(countResult);
}

/**
 * Count times of 0 to 9
 * @param {Number} totalPages total pages
 * @returns {Array} times of 0 to 9
 */
function countTimesOf0To9(totalPages) {
    let n,
        result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 1; i <= totalPages; i++) {
        n = i;
        while (n) {
            result[n % 10] += 1;
            n = parseInt(n / 10);
        }
    }
    return result;
}
</script>

<style scoped></style>
