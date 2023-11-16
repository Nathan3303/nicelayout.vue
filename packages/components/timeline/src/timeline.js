import { ref, reactive } from "vue";

export const timelineProps = {
    /**
     * @description Data of timeline
     */
    data: Array,
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
    /**
     * @description Line height of timeline
     */
    lineHeight: {
        type: Number,
        default: 72,
        validator: (v) => v >= 66 && v <= 96,
    },
};

export function useTimeline(scale = 1, options = {}) {
    const hoursGap = ref(scale * 60);
    const width = ref(hoursGap.value * 24);
    const scaleLevel = ref(parseInt(scale / 3) + 1);
    const timeScaleGap = ref(hoursGap.value / scaleLevel.value);
    const secondsPerPixel = ref(parseInt(60 / scale));
    const updateTime = ref(1000 * secondsPerPixel.value);
    const pointer = reactive({ left: 0, text: "0:00" });
    const lineHeight = ref(options?.lineHeight || 72);

    /**
     * Calculate css left value by time string
     * @param {string} time time string (hh:mm:ss)
     * @return {string} css left value (px)
     */
    function calcLeftValueByTimeString(timeString) {
        if (typeof timeString !== "string") return;
        const splitRes = timeString.split(":");
        const h = splitRes[0] * hoursGap.value;
        const m = splitRes[1] * (hoursGap.value / 60);
        const s = (splitRes[2] || 0) / secondsPerPixel.value;
        return parseInt(h + m + s + 24);
    }

    /**
     * Update pointer left by time string
     * @param {String} timeString time string (hh:mm:ss)
     */
    function updatePointerLeft(timeString) {
        pointer.left = calcLeftValueByTimeString(timeString) - 2;
    }

    /**
     * Update pointer text
     * @param {String} timeString time string
     */
    function updatePointerText(timeString) {
        pointer.text = timeString;
    }

    /**
     * Return
     */
    return {
        width,
        scaleLevel,
        timeScaleGap,
        updateTime,
        pointer,
        lineHeight,
        calcLeftValueByTimeString,
        updatePointerLeft,
        updatePointerText,
    };
}
