/**
 * Define props
 */
export const progressProps = {
    /**
     * @description Type of progress bar
     */
    type: {
        type: String,
        default: "line",
        validator: (v) => ["line", "circle", "dashboard"].includes(v),
    },
    /**
     * @description Percentage of progress
     */
    percentage: {
        type: Number,
        default: 0,
        validator: (v) => v >= 0 && v <= 100,
    },
    /**
     * @description Color of inner bar
     */
    color: {
        type: [Array, String],
    },
    /**
     * @description Progress bar width
     */
    strokeWidth: {
        type: Number,
        default: 6,
    },
    /**
     * @description Progress text formatter
     */
    formatter: {
        type: Function,
        default: (value) => value,
    },
    /**
     * @description Inner text display state
     */
    showInnerText: Boolean,
    /**
     * @description SVG size scale (Effective when props.type is circle or dashboard)
     */
    scale: {
        type: Number,
        default: 1,
        validator: (v) => v >= 0.6 && v <= 2.0,
    },
};

/**
 * Define emit
 */
export const progressEmits = [
    /**
     * @description Call when progress was hundred percent
     */
    "full",
];
