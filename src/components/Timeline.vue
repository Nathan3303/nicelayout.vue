<template>
    <div class="timeline" ref="timeline" @scroll="scrollHandler">
        <div class="timeline__time-scale">
            <template v-for="num in 25">
                <span v-if="num === 1 || num === 25">|</span>
                <span v-else>{{ num - 1 }}:00</span>
                <span v-if="num !== 25" v-for="num0 in timelineInfo.scaleLevel - 1">
                    {{ num - 1 }}:{{ (60 / timelineInfo.scaleLevel) * num0 }}
                </span>
            </template>
            <div class="pointer" ref="pointer" :style="{ left: timelineInfo.pointer.left + 'px' }">
                <span v-if="showPointerText">&lt;&nbsp;{{ timelineInfo.pointer.text }}</span>
            </div>
        </div>
        <div class="timeline__line-wrapper" ref="lineWrapper">
            <div class="line" v-for="(line, idx) in lines" :key="idx">
                <div class="line__title">
                    <p>{{ line.title }}</p>
                </div>
                <div class="line__cards">
                    <template v-for="card in line.cards">
                        <div
                            v-if="card"
                            class="card"
                            :style="{
                                width: calculateWidthByDueTime(card.dueTime.start, card.dueTime.end) + 'px',
                                left: calculateLeftByTimeString(card.dueTime.start) + 'px',
                                backgroundColor: card.backgroundColor,
                            }"
                            :title="card.name + ' , ' + `${card.dueTime.start} - ${card.dueTime.end}`">
                            <nl-avatar-group :data="card.avatars" />
                            <title-bar
                                :title="card.name"
                                :sub-title="`${card.dueTime.start} - ${card.dueTime.end}`"
                                size="tiny" />
                            <nl-button icon="icon-checked" theme="icon-only" shape="round-no-border" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from "vue";

/**
 * Define options
 */
defineOptions({ name: "Timeline" });

/**
 * Import components
 */
import NlAvatarGroup from "./NlAvatarGroup.vue";
import TitleBar from "./TitleBar.vue";
import NlButton from "./NlButton.vue";

/**
 * Define props
 */
const props = defineProps({
    /**
     * @description Data of timeline
     */
    lines: Array,
    /**
     * @description Scale of timeline
     */
    scale: {
        type: Number,
        default: 2,
        validator: (v) => v >= 1 && v <= 6,
    },
    /**
     * @description Update time (second)
     */
    updateTime: {
        type: Number,
        default: 0,
        validator: (v) => v >= 0 && v <= 60,
    },
    /**
     * @description Pointer text display state
     */
    showPointerText: Boolean,
});

/**
 * Define refs
 */
const timeline = ref();
const lineWrapper = ref();
const pointer = ref();
const date = ref(new Date());

/**
 * Define reactives
 */
const timelineInfo = reactive({
    hoursGap: 60,
    width: 1440,
    scaleLevel: 1,
    timeScaleGap: 60,
    secondsPerPixel: 60,
    timeScalePaddingLeft: 24,
    updateTime: 1000,
    pointer: {
        left: 0,
        text: "0:00",
    },
    scrollFactor: 0.3,
});
const controlState = reactive({
    freeMode: false,
    onStart: false,
    onEnd: false,
});

/**
 * Define computed
 */
const timelineWidth = computed(() => timelineInfo.width + "px");
const timelineOverflowX = computed(() => (props.showScrollXBar ? "auto" : "hidden"));
const timeScaleGap = computed(() => timelineInfo.timeScaleGap + "px");
const timeScalePaddingLeft = computed(() => timelineInfo.timeScalePaddingLeft + "px");

/**
 * Define watchers
 */
watch(
    /**
     * @description
     *  scroll timeline viewer to the pointer
     *  when timelineInfo.pointer.left was out.
     */
    () => timelineInfo.pointer.left,
    () => !controlState.freeMode && findPointer()
);
watch(
    /**
     * @description
     *  Recalculate the timeline information
     *  when props.scale was changed.
     */
    () => props.scale,
    () => calculateTimelineInfo()
);

/**
 * Define on-mounted code
 */
onMounted(() => {
    /**
     * @description Set height of pointer
     */
    pointer.value.style.height = lineWrapper.value.clientHeight + 20 + "px";
    /**
     * @description Move pointer, update pointer text immediately
     */
    movePointer();
    updatePointerText();
    /**
     * @description
     *  Start two timers,
     *  one for the pointer movement and one for the pointer text update.
     */
    setInterval(() => movePointer(), timelineInfo.updateTime);
    setInterval(() => updatePointerText(), 1000);
});

/**
 * Calculates timeline informations
 * @description excution inmmediately
 */
function calculateTimelineInfo() {
    if (props.scale !== 1) {
        timelineInfo.hoursGap = props.scale * 60;
        timelineInfo.width = timelineInfo.hoursGap * 24;
        timelineInfo.scaleLevel = parseInt(props.scale / 3) + 1;
        timelineInfo.timeScaleGap = timelineInfo.hoursGap / timelineInfo.scaleLevel;
        timelineInfo.secondsPerPixel = parseInt(60 / props.scale);
    }
    timelineInfo.updateTime = 1000 * (props.updateTime || timelineInfo.secondsPerPixel);
    timelineInfo.scrollFactor = 0.3 * props.scale;
    // console.log(timelineInfo)
}
calculateTimelineInfo();

/**
 * Calculate css left value by time string
 * @param {string} time time string (hh:mm:ss)
 * @return {string} css left value (px)
 */
function calculateLeftByTimeString(timeString) {
    const splitRes = timeString.split(":");
    return (
        splitRes[0] * timelineInfo.hoursGap +
        splitRes[1] * (timelineInfo.hoursGap / 60) +
        parseInt((splitRes[2] || 0) / timelineInfo.secondsPerPixel) +
        timelineInfo.timeScalePaddingLeft
    );
}

/**
 * Calculate left value for pointer
 * @return {object} css left value (px)
 */
function calculatePointerLeft() {
    const timeString = date.value.toLocaleTimeString();
    const res = calculateLeftByTimeString(timeString) - 2;
    // console.log(res)
    return res;
}

/**
 * Move pointer (set left of pointer)
 */
function movePointer() {
    const left = calculatePointerLeft();
    // console.log(left)
    timelineInfo.pointer.left = left;
}

/**
 * Update pointer text
 */
function updatePointerText() {
    date.value = new Date();
    const text = date.value.toLocaleTimeString();
    // console.log(text)
    timelineInfo.pointer.text = text;
}

/**
 * Calculate css width value by due time
 * @param {string} start start time without seconds (xx:xx)
 * @param {string} end end time without seconds (xx:xx)
 * @return {string} css left value (px)
 */
function calculateWidthByDueTime(start, end) {
    const startLeftValue = calculateLeftByTimeString(start);
    const endLeftValue = calculateLeftByTimeString(end);
    return endLeftValue - startLeftValue;
}

/**
 * Set the timeline view to the pointer
 */
function findPointer() {
    const { scrollLeft: viewerStart, clientWidth } = timeline.value;
    const { left: pointerLeft } = timelineInfo.pointer;
    const viewerEnd = viewerStart + clientWidth;
    const isOut = pointerLeft < viewerStart || pointerLeft > viewerEnd;
    if (isOut || controlState.freeMode) {
        const newScrollLeft = pointerLeft - parseInt(clientWidth * 0.3);
        timeline.value.scrollLeft = newScrollLeft;
        checkScrollIsEnded(newScrollLeft);
        controlState.freeMode = false;
    }
}

/**
 * Move timline view to the right
 */
function moveRight() {
    if (controlState.onEnd) return;
    const { scrollLeft, clientWidth } = timeline.value;
    const newScrollLeft = scrollLeft + parseInt(clientWidth * timelineInfo.scrollFactor);
    timeline.value.scrollLeft = newScrollLeft;
    checkScrollIsEnded(newScrollLeft);
    controlState.freeMode = true;
}

/**
 * Move timline view to the right
 */
function moveLeft() {
    if (controlState.onStart) return;
    const { scrollLeft, clientWidth } = timeline.value;
    const newScrollLeft = scrollLeft - parseInt(clientWidth * timelineInfo.scrollFactor);
    timeline.value.scrollLeft = newScrollLeft;
    checkScrollIsEnded(newScrollLeft);
    controlState.freeMode = true;
}

/**
 * Check current timeline viewer is end or not
 * @param {number} scrollLeft timeline scroll left
 * @return {boolean}
 */
function checkScrollIsEnded(scrollLeft) {
    controlState.onEnd = scrollLeft >= timelineInfo.width - timeline.value.clientWidth;
    controlState.onStart = scrollLeft <= 0;
}

/**
 * Expose functions
 */
defineExpose({
    findPointer,
    moveRight,
    moveLeft,
    controlState,
});
</script>

<style scoped>
.timeline {
    --full-width: v-bind(timelineWidth);
    --padding-left: v-bind(timeScalePaddingLeft);
    --time-scale-height: 36px;
    --line-height: 70px;
    --pointer-top-offset: 18px;

    box-sizing: border-box;
    transition: all 3s ease-in-out;
    scroll-behavior: smooth;
    user-select: none;

    height: 100%;
    overflow-y: auto;
    overflow-x: v-bind(timelineOverflowX);

    position: relative;

    color: #838383;
    font-size: 14px;
    font-weight: normal;
    font-family: "Consolas";

    & > .timeline__time-scale {
        display: flex;
        align-items: start;
        justify-content: start;
        gap: v-bind(timeScaleGap);

        width: var(--full-width);
        height: var(--time-scale-height);
        padding-left: var(--padding-left);

        position: sticky;
        top: 0px;
        z-index: 5;

        background-color: white;
        border-bottom: 2px solid #e5e5e7;

        & > span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 0px;
        }

        & > .pointer {
            transition: left 1s ease;

            width: 3px;
            position: absolute;
            top: var(--pointer-top-offset);
            left: var(--padding-left);
            z-index: 6;

            background: #7e74ff;
            border-left: 1px solid white;
            border-right: 1px solid white;
            border-radius: 6px;

            & > span {
                position: absolute;
                left: 10px;

                color: #7e74ff;
                font-size: 12px;
                font-weight: bold;
                font-family: "Consolas";
            }
        }
    }

    & > .timeline__line-wrapper {
        width: var(--full-width);

        & > .line {
            --title-color: #8683ad;
            --title-font-size: 13px;
            --title-font-weight: bold;
            --title-font-family: "Consolas";

            user-select: none;

            display: flex;
            align-items: center;
            justify-content: start;
            gap: 0;

            width: 100%;
            height: var(--line-height);

            position: relative;

            border-bottom: 1px solid #e5e5e7;

            & > .line__title {
                transform: rotate(-90deg);

                display: flex;
                align-items: center;
                justify-content: center;

                width: var(--padding-left);

                position: sticky;
                left: 0px;
                z-index: 4;

                & > p {
                    flex: none;
                    width: calc(var(--line-height) - 10px);
                    height: var(--padding-left);
                    line-height: var(--padding-left);
                    text-align: center;
                    margin: 0;

                    background-color: white;
                    /* box-shadow: 0 0 6px 3px white; */
                    /* border-bottom: 1px solid; */

                    color: var(--title-color);
                    font-size: var(--title-font-size);
                    font-weight: var(--title-font-weight);
                    font-family: var(--title-font-family);
                }
            }

            & > .line__cards {
                display: flex;
                align-items: center;

                & > .card {
                    box-sizing: border-box;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;

                    height: calc(var(--line-height) - 12px);
                    padding: 0 14px;
                    overflow: hidden;

                    position: absolute;
                    left: 0px;

                    border-radius: calc(var(--line-height) - 12px);
                }
            }
        }
    }
}
</style>
